import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Code,
  Copy,
  Check,
  Download,
  Upload,
  Smartphone,
  FileCode,
  BookOpen,
  Image,
  FolderArchive,
  Layers,
  Terminal,
} from 'lucide-react';

export const FlutterHub: React.FC = () => {
  const { language } = useApp();
  const [activeCodeTab, setActiveCodeTab] = useState<'labor' | 'tuition' | 'blood' | 'leaderboard' | 'main'>('labor');
  const [copied, setCopied] = useState(false);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const flutterCodes: Record<string, string> = {
    labor: `// Flutter UI Code: Daily Labor & Skilled Workers Screen
// File: lib/screens/daily_labor_screen.dart

import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class DailyLaborScreen extends StatefulWidget {
  const DailyLaborScreen({super.key});

  @override
  State<DailyLaborScreen> createState() => _DailyLaborScreenState();
}

class _DailyLaborScreenState extends State<DailyLaborScreen> {
  String selectedTrade = 'all';

  final List<Map<String, dynamic>> workers = [
    {
      'name': 'মোঃ রফিকুল ইসলাম (রাজমিস্ত্রি)',
      'trade': 'Mason (রাজমিস্ত্রি)',
      'wage': '৳ ৯৫০ / দিন',
      'location': 'মিরপুর-১, ঢাকা',
      'phone': '01724567891',
      'rating': 4.9,
      'isVerified': true,
      'experience': '১৪ বছরের প্লাস্টার ও ছাদ ঢালাইয়ের অভিজ্ঞতা',
    },
    {
      'name': 'বাবুল মিয়া (কাঠমিস্ত্রি)',
      'trade': 'Carpenter (কাঠমিস্ত্রি)',
      'wage': '৳ ৯০০ / দিন',
      'location': 'সেক্টর ৭, উত্তরা, ঢাকা',
      'phone': '01833112233',
      'rating': 4.8,
      'isVerified': true,
      'experience': 'মাস্টার কার্পেন্টার ও আধুনিক ফার্নিচার মেকার',
    },
    {
      'name': 'আল-আমিন হোসেন (ইলেকট্রিশিয়ান)',
      'trade': 'Electrician',
      'wage': '৳ ৮৫০ / দিন',
      'location': 'কোতোয়ালী, চট্টগ্রাম',
      'phone': '01611223344',
      'rating': 4.9,
      'isVerified': true,
      'experience': 'বাসাবাড়ির ওয়্যারিং, সোলার ও আইপিএস ফিটিং',
    },
  ];

  Future<void> _makePhoneCall(String phone) async {
    final Uri launchUri = Uri(scheme: 'tel', path: phone);
    if (await canLaunchUrl(launchUri)) {
      await launchUrl(launchUri);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('দিনমজুর ও দক্ষ কারিগর', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: const Color(0xFF0F766E),
        elevation: 0,
      ),
      body: Column(
        children: [
          // Mandatory Legal Disclaimer Banner
          Container(
            padding: const EdgeInsets.all(12),
            margin: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: const Color(0xFFFEF2F2),
              border: Border.all(color: Colors.red, width: 1.5),
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Text(
              "বিঃ দ্রঃ দিনমজুর বা যেকোনো সেবা নেওয়ার ক্ষেত্রে অবশ্যই অভিভাবক বা দায়িত্বশীল ব্যক্তি নিয়ে সশরীরে/ভিডিও কলে কথা বলে সঠিক পরিচয় নিশ্চিত হয়ে নিবেন। কোনো পূর্ববর্তী আর্থিক লেনদেন করবেন না।",
              style: TextStyle(color: Color(0xFF991B1B), fontSize: 12, fontWeight: FontWeight.bold),
            ),
          ),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              itemCount: workers.length,
              itemBuilder: (context, index) {
                final w = workers[index];
                return Card(
                  margin: const EdgeInsets.only(bottom: 12),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  elevation: 2,
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.between,
                          children: [
                            Expanded(
                              child: Text(
                                w['name'],
                                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                              ),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                              decoration: BoxDecoration(
                                color: const Color(0xFF0F766E).withOpacity(0.1),
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: Text(
                                w['wage'],
                                style: const TextStyle(color: Color(0xFF0F766E), fontWeight: FontWeight.bold, fontSize: 13),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 6),
                        Text(w['experience'], style: TextStyle(fontSize: 13, color: Colors.grey[700])),
                        const SizedBox(height: 8),
                        Row(
                          children: [
                            const Icon(Icons.location_on, size: 16, color: Colors.grey),
                            const SizedBox(width: 4),
                            Text(w['location'], style: TextStyle(fontSize: 12, color: Colors.grey[600])),
                            const Spacer(),
                            const Icon(Icons.star, size: 16, color: Colors.amber),
                            Text("\${w['rating']}", style: const TextStyle(fontWeight: FontWeight.bold)),
                          ],
                        ),
                        const Divider(height: 24),
                        ElevatedButton.icon(
                          onPressed: () => _makePhoneCall(w['phone']),
                          icon: const Icon(Icons.call),
                          label: const Text('সরাসরি কল দিন (Call Now)'),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF059669),
                            foregroundColor: Colors.white,
                            minimumSize: const Size.fromHeight(42),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}`,

    tuition: `// Flutter UI Code: Two-Way Tuition Matching Screen
// File: lib/screens/tuition_matching_screen.dart

import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class TuitionMatchingScreen extends StatelessWidget {
  const TuitionMatchingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('শিক্ষা ও টিউশন ম্যাচমেকিং'),
        backgroundColor: const Color(0xFF4338CA),
      ),
      body: ListView(
        padding: const EdgeInsets.all(12),
        children: [
          // Mandatory Legal Disclaimer
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.red.shade50,
              border: Border.all(color: Colors.red, width: 2),
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Text(
              "বিঃ দ্রঃ টিচার/স্টুডেন্ট সেবা নেওয়ার ক্ষেত্রে অবশ্যই অভিভাবক বা দায়িত্বশীল ব্যক্তি নিয়ে সশরীরে/ভিডিও কলে সঠিক পরিচয় ও NID নিশ্চিত হয়ে নিবেন। কোনো পূর্ববর্তী আর্থিক লেনদেন করবেন না।",
              style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold, fontSize: 12),
            ),
          ),
          const SizedBox(height: 12),
          // Sample Tuition Card
          Card(
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.between,
                    children: [
                      const Chip(label: Text('শিক্ষক প্রস্তুত', style: TextStyle(color: Colors.white)), backgroundColor: Colors.indigo),
                      const Text('৳ ৮,০০০ / মাস', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.green)),
                    ],
                  ),
                  const Text('Md. Tahmidur Rahman (BUET CSE)', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                  const Text('শ্রেণি: Class 9, 10, HSC | বিষয়: Math, Physics, ICT', style: TextStyle(fontSize: 13, color: Colors.black87)),
                  const SizedBox(height: 12),
                  ElevatedButton.icon(
                    onPressed: () => launchUrl(Uri.parse('tel:01799887766')),
                    icon: const Icon(Icons.phone),
                    label: const Text('কল করুন (01799887766)'),
                    style: ElevatedButton.styleFrom(backgroundColor: Colors.indigo, foregroundColor: Colors.white),
                  )
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}`,

    blood: `// Flutter UI Code: Blood Donor Directory & Emergency Search
// File: lib/screens/blood_donors_screen.dart

import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class BloodDonorsScreen extends StatelessWidget {
  const BloodDonorsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('রক্তদাতা ও জরুরি পুশ অ্যালার্ট'),
        backgroundColor: Colors.red.shade700,
      ),
      body: ListView(
        padding: const EdgeInsets.all(12),
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: LinearGradient(colors: [Colors.red.shade700, Colors.rose.shade800]),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('জরুরি ব্লাড পুশ অ্যালার্ট', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                const SizedBox(height: 6),
                const Text('উপজেলায় নিবন্ধিত রক্তদাতাদের ডিভাইসে তাৎক্ষণিক FCM নোটিফিকেশন অ্যালার্ট পাঠান।', style: TextStyle(color: Colors.white70, fontSize: 12)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}`,

    leaderboard: `// Flutter UI Code: Community Contributor Leaderboard
// File: lib/screens/leaderboard_screen.dart

import 'package:flutter/material.dart';

class LeaderboardScreen extends StatelessWidget {
  const LeaderboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('কমিউনিটি লিডারবোর্ড'), backgroundColor: Colors.amber.shade700),
      body: ListView(
        padding: const EdgeInsets.all(12),
        children: [
          ListTile(
            leading: const CircleAvatar(child: Text('1')),
            title: const Text('Md kanchon Hossen', style: TextStyle(fontWeight: FontWeight.bold)),
            subtitle: const Text('Founder & Hero • ঢাকা সদর'),
            trailing: const Text('4,850 pts', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.green)),
          ),
        ],
      ),
    );
  }
}`,

    main: `// Flutter Main Entry Point: ALL IN ONE BANGLADESH
// File: lib/main.dart

import 'package:flutter/material.dart';
import 'screens/daily_labor_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const AllInOneBangladeshApp());
}

class AllInOneBangladeshApp extends StatelessWidget {
  const AllInOneBangladeshApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ALL IN ONE BANGLADESH',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF0F766E)),
        fontFamily: 'Hind Siliguri',
        useMaterial3: true,
      ),
      home: const DailyLaborScreen(),
    );
  }
}`,
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-800 to-slate-900 text-white rounded-2xl p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30 mb-2">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Flutter Production Codebase & Play Store Engine</span>
            </div>
            <h3 className="text-xl font-black">
              {language === 'bn'
                ? 'ফ্লাটার সোর্স কোড ও গুগল প্লে-স্টোর রিলিজ গাইড'
                : 'Flutter Source Code Snippets & Google Play Store Publishing Guide'}
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              {language === 'bn'
                ? 'অ্যান্ড্রয়েড এবং আইওএস উভয় প্ল্যাটফর্মের জন্য প্রস্তুতকৃত ক্লিন আর্কিটেকচার ফ্লাটার উইজেট কোড এবং প্রোডাকশন বান্ডেল।'
                : 'Copy production-ready Flutter widgets for Daily Labor, Tuition Matching, and Blood Search.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-mono text-emerald-400">
              Target SDK 35 (Android 15)
            </span>
          </div>
        </div>
      </div>

      {/* Code Snippet Viewer */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Navigation Tabs */}
        <div className="bg-slate-900 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setActiveCodeTab('labor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCodeTab === 'labor' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              🔨 Daily Labor UI
            </button>
            <button
              onClick={() => setActiveCodeTab('tuition')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCodeTab === 'tuition' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              📚 Tuition Matching UI
            </button>
            <button
              onClick={() => setActiveCodeTab('blood')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCodeTab === 'blood' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              🩸 Blood Donor UI
            </button>
            <button
              onClick={() => setActiveCodeTab('leaderboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCodeTab === 'leaderboard' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              🏆 Leaderboard UI
            </button>
            <button
              onClick={() => setActiveCodeTab('main')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCodeTab === 'main' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              🚀 main.dart
            </button>
          </div>

          <button
            onClick={() => copyCode(flutterCodes[activeCodeTab])}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Flutter Code'}</span>
          </button>
        </div>

        {/* Code Pre container */}
        <div className="bg-slate-950 p-4 font-mono text-xs text-slate-200 overflow-x-auto max-h-[420px]">
          <pre>{flutterCodes[activeCodeTab]}</pre>
        </div>
      </div>

      {/* Play Store Step-by-Step Publishing Guide */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <h4 className="text-base font-bold text-slate-900">
            {language === 'bn' ? 'গুগল প্লে-স্টোর প্রকাশনা ও আপডেট গাইডলাইন' : 'Step-by-Step Google Play Store Publishing Guide'}
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
            <div className="font-bold text-emerald-800 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">1</span>
              <span>Generate Keystore (আপলোড কি তৈরি)</span>
            </div>
            <p className="text-slate-600">
              Run this in terminal to generate your release keystore:
            </p>
            <div className="bg-slate-900 text-slate-200 p-2.5 rounded-lg font-mono text-[11px] overflow-x-auto">
              keytool -genkey -v -keystore upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
            <div className="font-bold text-emerald-800 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">2</span>
              <span>Build Production App Bundle (.aab)</span>
            </div>
            <p className="text-slate-600">
              Compile optimized 64-bit Android App Bundle:
            </p>
            <div className="bg-slate-900 text-slate-200 p-2.5 rounded-lg font-mono text-[11px] overflow-x-auto">
              flutter build appbundle --release --obfuscate --split-debug-info=./build/symbols
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
            <div className="font-bold text-emerald-800 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">3</span>
              <span>Play Store Asset Specifications</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>App Icon: 512x512 PNG (32-bit color, no transparency)</li>
              <li>Feature Graphic: 1024x500 JPEG/PNG</li>
              <li>Phone Screenshots: Minimum 4 screenshots (1080x1920)</li>
              <li>Target API Level: 34 or higher (Android 14+)</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
            <div className="font-bold text-emerald-800 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">4</span>
              <span>Privacy Policy & Legal URL</span>
            </div>
            <p className="text-slate-600">
              Mandatory legal disclaimer URL for Google Play Console:
            </p>
            <div className="bg-slate-900 text-emerald-400 p-2.5 rounded-lg font-mono text-[11px] truncate">
              https://allinonebangladesh.com/privacy-policy
            </div>
          </div>
        </div>
      </div>

      {/* Central File & Binary Manager */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FolderArchive className="w-5 h-5 text-indigo-600" />
            <h4 className="text-base font-bold text-slate-900">
              {language === 'bn' ? 'সেন্ট্রাল ফাইল ও বাইনারি ম্যানেজার' : 'Central File & Binary Asset Manager'}
            </h4>
          </div>
          <span className="text-xs text-slate-500 font-mono">Storage: Cloud Bucket</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-800">app-release.aab</div>
              <div className="text-[11px] text-slate-400">Production Bundle (28.4 MB)</div>
            </div>
            <button className="p-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors" title="Download .aab">
              <Download className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-800">app-universal.apk</div>
              <div className="text-[11px] text-slate-400">Universal Direct APK (34.2 MB)</div>
            </div>
            <button className="p-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors" title="Download .apk">
              <Download className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Icon 512" className="w-8 h-8 rounded-lg object-contain border border-slate-300 bg-white" />
              <div>
                <div className="font-bold text-slate-800">play_icon_512.png</div>
                <div className="text-[11px] text-slate-400">Play Store Icon (512x512)</div>
              </div>
            </div>
            <a href="/logo.png" download="play_icon_512.png" className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors" title="Download Official Icon">
              <Download className="w-4 h-4" />
            </a>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-800">feature_graphic.jpg</div>
              <div className="text-[11px] text-slate-400">Banner (1024x500)</div>
            </div>
            <button className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors" title="Download Banner">
              <Image className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
