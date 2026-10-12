import express from 'express';
import type { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Enable CORS for Vercel domain and external client proxies
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Initialize Gemini client if API key is provided
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// In-memory store for live handover chat sessions and admin synchronization
interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'agent';
  text: string;
  timestamp: number;
}

interface ChatSession {
  sessionId: string;
  userName: string;
  userPhone?: string;
  language: 'bn' | 'en';
  status: 'ai' | 'handover_requested' | 'agent_connected' | 'closed';
  messages: ChatMessage[];
  updatedAt: number;
}

const chatSessions = new Map<string, ChatSession>();

// API: AI Live Chat endpoint with Fallback & Handover Detection
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { sessionId, message, language = 'bn', history = [] } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const currentSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    let session = chatSessions.get(currentSessionId);
    if (!session) {
      session = {
        sessionId: currentSessionId,
        userName: 'User',
        language: language === 'en' ? 'en' : 'bn',
        status: 'ai',
        messages: [],
        updatedAt: Date.now()
      };
      chatSessions.set(currentSessionId, session);
    }

    // Add user message to session
    session.messages.push({
      id: `msg_${Date.now()}_user`,
      sender: 'user',
      text: message,
      timestamp: Date.now()
    });

    // Check if session is already connected to a human agent
    if (session.status === 'agent_connected' || session.status === 'handover_requested') {
      session.updatedAt = Date.now();
      return res.json({
        sessionId: currentSessionId,
        reply: language === 'en'
          ? "Your message has been sent to our live human agent (Md kanchon Hossen / Support Team). Please wait for a reply."
          : "আপনার বার্তাটি আমাদের লাইভ হিউম্যান এজেন্টের কাছে পাঠানো হয়েছে। অনুগ্রহ করে অপেক্ষা করুন, শীঘ্রই উত্তর দেওয়া হবে।",
        handoverTriggered: true,
        status: session.status
      });
    }

    // Check for explicit user request for human agent
    const lowerMsg = message.toLowerCase();
    const wantsAgent = 
      lowerMsg.includes('agent') || 
      lowerMsg.includes('human') || 
      lowerMsg.includes('admin') || 
      lowerMsg.includes('মানবধর্মী') || 
      lowerMsg.includes('এজেন্ট') || 
      lowerMsg.includes('এডমিন') || 
      lowerMsg.includes('অ্যাডমিন') ||
      lowerMsg.includes('মানুষ') ||
      lowerMsg.includes('সরাসরি কথা');

    if (wantsAgent) {
      session.status = 'handover_requested';
      session.updatedAt = Date.now();
      const handoverReply = language === 'en'
        ? "Sorry, I am unable to understand your query completely. Transferring you to a live human agent, please wait a moment."
        : "দুঃখিত, আপনার প্রশ্নটি আমি পুরোপুরি বুঝতে পারছি না। আপনার সুবিধার্থে একজন এজেন্টের সাথে সংযুক্ত করা হচ্ছে, অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন।";

      session.messages.push({
        id: `msg_${Date.now()}_bot`,
        sender: 'bot',
        text: handoverReply,
        timestamp: Date.now()
      });

      return res.json({
        sessionId: currentSessionId,
        reply: handoverReply,
        handoverTriggered: true,
        status: 'handover_requested'
      });
    }

    // If Gemini client is available, generate smart contextual answer
    let botReply = '';
    let shouldHandover = false;

    if (aiClient) {
      try {
        const systemPrompt = `You are the official AI Live Support Assistant for "ALL IN ONE BANGLADESH" - the premier All-in-One Local Directory, Service, Education, Daily Labor & Job Portal Mobile App & Web Platform founded by Md kanchon Hossen.
Languages: You must reply fluently in ${language === 'en' ? 'English' : 'Bangla (বাংলা)'}.
Key Information to provide:
1. Emergency Hotlines: National Emergency (999), Fire Service (16163), Women & Children Helpline (109), Legal Aid (16430), Dudok (106).
2. Directory Categories: Police & Thana OC contacts, Blood Donors (search by Blood Group & Upazila), Daily Labor & Skilled Workers (Rajmistri, Kathmistri, Rangmistri, Electrician, Plumber), Tuition Matching (Teachers & Parents), Govt & Private Jobs, Bus counters, Hospitals.
3. Developer & Founder: Md kanchon Hossen (Email: mdkanchonhossen7@gmail.com, Phone: 01642240176, Facebook: https://www.facebook.com/share/18Ls5y3LWu/).
4. Important Rule: If the user asks an obscure, highly complex complaint, legal dispute, or request that cannot be answered safely, or asks for human support, respond with the exact fallback token "[TRIGGER_HANDOVER]".
Keep responses concise, helpful, polite, and well-formatted with bullet points if listing steps.`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }]
            }
          ]
        });

        const textOutput = response.text?.trim() || '';
        if (textOutput.includes('[TRIGGER_HANDOVER]') || !textOutput) {
          shouldHandover = true;
        } else {
          botReply = textOutput;
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed, using intelligent local engine:', geminiError);
        shouldHandover = false;
      }
    }

    // Fallback rule if no API key or handover triggered
    if (shouldHandover) {
      session.status = 'handover_requested';
      session.updatedAt = Date.now();
      botReply = language === 'en'
        ? "Sorry, I am unable to understand your query completely. Transferring you to a live human agent, please wait a moment."
        : "দুঃখিত, আপনার প্রশ্নটি আমি পুরোপুরি বুঝতে পারছি না। আপনার সুবিধার্থে একজন এজেন্টের সাথে সংযুক্ত করা হচ্ছে, অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন।";
    } else if (!botReply) {
      // Local Bangladesh knowledgebase matching
      if (lowerMsg.includes('blood') || lowerMsg.includes('রক্ত') || lowerMsg.includes('রক্তদাতা')) {
        botReply = language === 'en'
          ? "🩸 For Blood Donors: Navigate to the 'Medical & Health' -> 'Blood Donors' tab in our app. You can filter by blood group (A+, B+, O+, AB+, etc.) and Upazila, or post an urgent blood request with one click."
          : "🩸 রক্তদাতার জন্য: অ্যাপের 'স্বাস্থ্য ও চিকিৎসা' -> 'রক্তদাতা' ট্যাবে যান। আপনার রক্তের গ্রুপ (A+, B+, O+, AB+) ও উপজেলা নির্বাচন করে সরাসরি রক্তদাতাদের ফোন করতে পারবেন অথবা 'জরুরি রক্তের আবেদন' পোস্ট করতে পারবেন।";
      } else if (lowerMsg.includes('labor') || lowerMsg.includes('দিনমজুর') || lowerMsg.includes('কারিগর') || lowerMsg.includes('রাজমিস্ত্রি')) {
        botReply = language === 'en'
          ? "🔨 Daily Labor & Skilled Workers: Visit the 'Daily Labor' section. You will find verified Rajmistri (Mason), Kathmistri (Carpenter), Electricians, Plumbers, and Agriculture workers with daily wage rates and direct call buttons."
          : "🔨 দিনমজুর ও দক্ষ কারিগর: আমাদের 'দিনমজুর ও কারিগর' বিভাগে যান। রাজমিস্ত্রি, কাঠমিস্ত্রি, রংমিস্ত্রি, ইলেকট্রিশিয়ান, প্লাম্বার ও কৃষি শ্রমিকদের ছবি, দৈনিক রেট ও সরাসরি কল বাটন পাবেন।";
      } else if (lowerMsg.includes('tuition') || lowerMsg.includes('টিউটর') || lowerMsg.includes('টিচার') || lowerMsg.includes('পড়াতে')) {
        botReply = language === 'en'
          ? "📚 Tuition Matchmaking: Visit the 'Education & Tuition' tab. Teachers can post profiles offering tuition across Class 1-12 and university subjects, and guardians can post tutor requirements directly."
          : "📚 টিউটর ও টিউশন: 'শিক্ষা ও টিউশন' ট্যাবে যান। শিক্ষকরা টিউশন অফার করে পোস্ট দিতে পারেন এবং অভিভাবকগণ কাঙ্ক্ষিত শিক্ষক চেয়ে ফ্রি পোস্ট করতে পারেন।";
      } else if (lowerMsg.includes('police') || lowerMsg.includes('পুলিশ') || lowerMsg.includes('থানা') || lowerMsg.includes('oc')) {
        botReply = language === 'en'
          ? "👮 Police & Security: Check the 'Police & Security' tab for Thana OC contacts, duty officer numbers, and exact Google Maps pins across all 64 districts. In an emergency, dial 999 directly."
          : "👮 পুলিশ ও নিরাপত্তা: 'পুলিশ ও নিরাপত্তা' ট্যাবে আপনার জেলা ও থানার ওসি (OC) এবং ডিউটি অফিসারের সরাসরি ফোন নম্বর এবং ম্যাপ লোকেশন পাবেন। যেকোনো জরুরি প্রয়োজনে সরাসরি ৯৯৯ ডায়াল করুন।";
      } else if (lowerMsg.includes('developer') || lowerMsg.includes('মালিক') || lowerMsg.includes('ডেভেলপার') || lowerMsg.includes('kanchon') || lowerMsg.includes('কাঞ্চন')) {
        botReply = language === 'en'
          ? "👨‍💻 Developer Profile: Md kanchon Hossen | Email: mdkanchonhossen7@gmail.com | WhatsApp/Phone: 01642240176 | Facebook: https://www.facebook.com/share/18Ls5y3LWu/"
          : "👨‍💻 ডেভেলপার প্রোফাইল: মোঃ কাঞ্চন হোসেন (Md kanchon Hossen) | ইমেইল: mdkanchonhossen7@gmail.com | ফোন/হোয়াটসঅ্যাপ: 01642240176 | ফেসবুক: https://www.facebook.com/share/18Ls5y3LWu/";
      } else {
        // Trigger handover for complex or unrecognized query
        session.status = 'handover_requested';
        session.updatedAt = Date.now();
        botReply = language === 'en'
          ? "Sorry, I am unable to understand your query completely. Transferring you to a live human agent, please wait a moment."
          : "দুঃখিত, আপনার প্রশ্নটি আমি পুরোপুরি বুঝতে পারছি না। আপনার সুবিধার্থে একজন এজেন্টের সাথে সংযুক্ত করা হচ্ছে, অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন।";
        shouldHandover = true;
      }
    }

    session.messages.push({
      id: `msg_${Date.now()}_bot`,
      sender: 'bot',
      text: botReply,
      timestamp: Date.now()
    });

    session.updatedAt = Date.now();

    return res.json({
      sessionId: currentSessionId,
      reply: botReply,
      handoverTriggered: session.status === 'handover_requested',
      status: session.status
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API: Get Handover Chat Sessions (For Admin Live Chat Dashboard)
app.get('/api/admin/chat-sessions', (req: Request, res: Response) => {
  const token = req.headers.authorization;
  // Basic validation or return active sessions
  const sessionsList = Array.from(chatSessions.values()).sort((a, b) => b.updatedAt - a.updatedAt);
  res.json({ sessions: sessionsList });
});

// API: Admin reply to user session
app.post('/api/admin/reply-chat', (req: Request, res: Response) => {
  const { sessionId, text } = req.body;
  if (!sessionId || !text) {
    return res.status(400).json({ error: 'sessionId and text are required' });
  }

  const session = chatSessions.get(sessionId);
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  session.status = 'agent_connected';
  const newMsg: ChatMessage = {
    id: `msg_${Date.now()}_agent`,
    sender: 'agent',
    text,
    timestamp: Date.now()
  };
  session.messages.push(newMsg);
  session.updatedAt = Date.now();

  res.json({ success: true, message: newMsg, session });
});

// API: Fetch session messages (polling for user client)
app.get('/api/chat-session/:id', (req: Request, res: Response) => {
  const session = chatSessions.get(req.params.id);
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  res.json({ session });
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', app: 'ALL IN ONE BANGLADESH', timestamp: new Date().toISOString() });
});

// Serve frontend with Vite in dev mode or static files in production
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ALL IN ONE BANGLADESH] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
