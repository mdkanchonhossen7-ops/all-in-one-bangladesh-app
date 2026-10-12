import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  UserCheck,
  Sparkles,
  PhoneCall,
  Loader2,
  ShieldAlert,
  Headphones,
} from 'lucide-react';
import { ChatMessage } from '../types';

export const AIChatWidget: React.FC = () => {
  const { language, triggerNewHandoverNotice, chatSessions, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text:
        language === 'bn'
          ? 'আসসালামু আলাইকুম! "ALL IN ONE BANGLADESH" লাইভ হেল্পডেস্কে আপনাকে স্বাগতম। রক্তদাতা, দিনমজুর, পুলিশ ওসি নাম্বার, টিউশন বা যেকোনো জরুরি সেবা নিয়ে কীভাবে সাহায্য করতে পারি?'
          : 'Welcome to ALL IN ONE BANGLADESH Live AI Support! How can I assist you with emergency services, blood donors, daily labor, or tuition matching today?',
      timestamp: Date.now(),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHandoverMode, setIsHandoverMode] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setUnreadCount(0);
    }
  }, [messages, isOpen]);

  // Periodic polling check for agent replies if in handover mode
  useEffect(() => {
    if (!isHandoverMode) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/chat-session/${sessionId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.session && data.session.messages) {
            setMessages(data.session.messages);
            if (data.session.status === 'agent_connected') {
              // Agent is active
            }
          }
        }
      } catch (err) {
        // Local fallback polling against AppContext chatSessions
        const currentSession = chatSessions.find((s) => s.sessionId === sessionId);
        if (currentSession && currentSession.messages.length > messages.length) {
          setMessages(currentSession.messages);
        }
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [isHandoverMode, sessionId, chatSessions, messages.length]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsgText = inputText.trim();
    setInputText('');

    const newMsg: ChatMessage = {
      id: `msg_user_${Date.now()}`,
      sender: 'user',
      text: userMsgText,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: userMsgText,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('Network error');
      }

      const data = await response.json();

      const botReply: ChatMessage = {
        id: `msg_bot_${Date.now()}`,
        sender: 'bot',
        text: data.reply,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, botReply]);

      if (data.handoverTriggered) {
        setIsHandoverMode(true);
        triggerNewHandoverNotice(sessionId);
      }
    } catch (err) {
      console.warn('API call fallback handled locally:', err);
      // Client-side fallback logic with exact prompt specifications:
      const lower = userMsgText.toLowerCase();
      let fallbackText = '';
      let triggerHandover = false;

      if (
        lower.includes('agent') ||
        lower.includes('human') ||
        lower.includes('admin') ||
        lower.includes('এজেন্ট') ||
        lower.includes('মানুষ') ||
        lower.includes('কথা')
      ) {
        triggerHandover = true;
      }

      if (triggerHandover) {
        fallbackText =
          language === 'bn'
            ? 'দুঃখিত, আপনার প্রশ্নটি আমি পুরোপুরি বুঝতে পারছি না। আপনার সুবিধার্থে একজন এজেন্টের সাথে সংযুক্ত করা হচ্ছে, অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন।'
            : 'Sorry, I am unable to understand your query completely. Transferring you to a live human agent, please wait a moment.';
        setIsHandoverMode(true);
        triggerNewHandoverNotice(sessionId);
      } else if (lower.includes('blood') || lower.includes('রক্ত')) {
        fallbackText =
          language === 'bn'
            ? '🩸 জরুরি রক্তের জন্য আমাদের "স্বাস্থ্য ও রক্তদাতা" ট্যাবে যান বা সরাসরি ৯৯৯ অথবা উপজেলা পুশ নোটিফিকেশন অ্যালার্ট পাঠান।'
            : '🩸 For urgent blood donation, visit the "Medical & Blood Donors" category or trigger an Upazila push alert.';
      } else if (lower.includes('labor') || lower.includes('দিনমজুর')) {
        fallbackText =
          language === 'bn'
            ? '🔨 দিনমজুর ও কারিগর বিভাগে রাজমিস্ত্রি, কাঠমিস্ত্রি, ইলেকট্রিশিয়ানদের ফোন নম্বর ও দৈনিক রেট দেওয়া আছে।'
            : '🔨 Daily Labor category provides verified contacts for masons, carpenters, and electricians.';
      } else {
        // Fallback handover per specification
        fallbackText =
          language === 'bn'
            ? 'দুঃখিত, আপনার প্রশ্নটি আমি পুরোপুরি বুঝতে পারছি না। আপনার সুবিধার্থে একজন এজেন্টের সাথে সংযুক্ত করা হচ্ছে, অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন।'
            : 'Sorry, I am unable to understand your query completely. Transferring you to a live human agent, please wait a moment.';
        setIsHandoverMode(true);
        triggerNewHandoverNotice(sessionId);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `msg_bot_${Date.now()}`,
          sender: 'bot',
          text: fallbackText,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-5 right-5 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2 p-3.5 sm:px-4 sm:py-3.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all border-2 border-white/60"
            title="Chat with AI or Human Agent"
          >
            <div className="relative">
              <MessageSquare className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-ping" />
              )}
            </div>
            <span className="hidden sm:inline text-xs font-extrabold tracking-wide">
              {language === 'bn' ? 'AI লাইভ চ্যাট ও সাপোর্ট' : 'AI Live Support'}
            </span>
          </button>
        )}
      </div>

      {/* Chat Window Drawer / Modal */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-full max-w-[370px] sm:max-w-[400px] h-[520px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white p-4 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white/20 relative">
                {isHandoverMode ? (
                  <Headphones className="w-5 h-5 text-amber-300 animate-pulse" />
                ) : (
                  <Bot className="w-5 h-5 text-emerald-100" />
                )}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold flex items-center gap-1.5">
                  <span>{t.aiChatTitle}</span>
                  <span className="text-[10px] bg-emerald-950/60 px-1.5 py-0.5 rounded text-emerald-200 font-normal">
                    Gemini API
                  </span>
                </h3>
                <p className="text-[11px] text-emerald-100">
                  {isHandoverMode ? t.talkingToHuman : t.aiChatSubtitle}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Handover Notice Banner if agent takeover is active */}
          {isHandoverMode && (
            <div className="bg-amber-500 text-slate-950 text-xs px-3 py-1.5 font-bold flex items-center justify-between shadow-inner">
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-slate-900" />
                {language === 'bn'
                  ? 'লাইভ এজেন্ট ডেস্ক (Md kanchon Hossen) প্রস্তুত'
                  : 'Live Agent Desk (Md kanchon Hossen) Active'}
              </span>
              <span className="text-[10px] bg-amber-900 text-white px-2 py-0.5 rounded-full">
                Live Handover
              </span>
            </div>
          )}

          {/* Message History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : m.sender === 'agent'
                      ? 'bg-amber-100 border border-amber-300 text-slate-900 rounded-bl-none font-medium'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                  }`}
                >
                  {m.sender === 'agent' && (
                    <div className="text-[10px] font-extrabold text-amber-800 mb-1 flex items-center gap-1">
                      <Headphones className="w-3 h-3" />
                      <span>{language === 'bn' ? 'সাপোর্ট এজেন্ট (Md kanchon Hossen):' : 'Support Agent:'}</span>
                    </div>
                  )}
                  <p className="whitespace-pre-line">{m.text}</p>
                  <div
                    className={`text-[9px] mt-1 text-right ${
                      m.sender === 'user' ? 'text-emerald-100' : 'text-slate-400'
                    }`}
                  >
                    {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none px-3.5 py-2.5 flex items-center gap-2 text-slate-500 shadow-xs">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                  <span>{language === 'bn' ? 'উত্তর তৈরি হচ্ছে...' : 'AI is typing...'}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.typeMessage}
              className="flex-1 text-xs bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white transition-colors shrink-0 shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
