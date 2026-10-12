import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Globe,
  Lock,
  ShieldCheck,
  Smartphone,
  Monitor,
  ExternalLink,
  KeyRound,
  Copy,
  Check,
  Share2,
  X,
  Link,
  Sparkles,
} from 'lucide-react';

export const DomainBar: React.FC = () => {
  const { domainMode, setDomainMode, isMobileFrame, setIsMobileFrame, isAdminLoggedIn, language } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);
  const [showDomainModal, setShowDomainModal] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const getLiveBaseUrl = () => {
    if (typeof window !== 'undefined' && window.location.origin) {
      return window.location.origin;
    }
    return 'https://ais-pre-hf7agb2se74pg6hmo3ausk-569758607576.asia-southeast1.run.app';
  };

  const liveBase = getLiveBaseUrl();
  const publicLiveUrl = liveBase;
  const adminLiveUrl = `${liveBase}/?mode=admin`;
  const vercelDomainUrl = 'https://v0-allinonebangladesh.vercel.app/';

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleCopyLiveLink = () => {
    const url = domainMode === 'admin' ? adminLiveUrl : publicLiveUrl;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <>
      <div className="bg-slate-900 border-b border-slate-800 text-slate-200 text-xs px-3 py-2 select-none">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Domain switch tabs */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setDomainMode('public')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
                domainMode === 'public'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
              title="Public Service & Directory Portal (Read-only System Configs)"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Public Web (allinonebangladesh.com)</span>
            </button>

            <button
              onClick={() => setDomainMode('admin')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
                domainMode === 'admin'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
              title="Ultra-Secure Personal Admin Panel (Password Protected)"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Portal (admin.allinonebangladesh.com)</span>
              {isAdminLoggedIn && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Admin Active" />
              )}
            </button>
          </div>

          {/* Center: Simulated Browser Address Bar */}
          <div className="flex-1 min-w-[260px] max-w-md hidden md:flex items-center gap-2 bg-slate-950/80 px-3 py-1 rounded-full border border-slate-700/60 font-mono text-[11px] text-slate-300">
            <img src="/logo.png" alt="Logo" className="w-3.5 h-3.5 rounded-full object-contain shrink-0" />
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-emerald-400 font-semibold">https://</span>
            <span className="truncate text-slate-100 font-medium">
              {domainMode === 'public' ? 'allinonebangladesh.com' : 'admin.allinonebangladesh.com'}
            </span>
            <span className="text-slate-500 text-[10px] ml-auto shrink-0 flex items-center gap-1 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
              {domainMode === 'public' ? 'Public Read-Only Mode' : 'Admin Secure Zone'}
            </span>
          </div>

          {/* Right: Domain links modal button + Mobile App simulator view toggle & status */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDomainModal(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-700/80 hover:bg-emerald-600 border border-emerald-500/60 text-white font-medium text-[11px] transition-colors shadow-sm"
              title="View live links and custom domain connection info"
            >
              <Link className="w-3.5 h-3.5 text-emerald-200" />
              <span>{language === 'bn' ? '🌐 ডোমেইন ও লাইভ লিংক' : '🌐 Domain & Live Links'}</span>
            </button>

            <button
              onClick={handleCopyLiveLink}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md border text-[11px] transition-colors ${
                copiedLink
                  ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300 font-bold'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
              title="Copy current live link to clipboard"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedLink ? (language === 'bn' ? 'লিংক কপি হয়েছে!' : 'Link Copied!') : (language === 'bn' ? 'লিংক কপি' : 'Copy Link')}</span>
            </button>

            <button
              onClick={() => setIsMobileFrame(!isMobileFrame)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md border text-[11px] transition-colors ${
                isMobileFrame
                  ? 'bg-blue-600/30 border-blue-500 text-blue-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
              title="Preview Mobile App Interface (Flutter Android/iOS Frame)"
            >
              {isMobileFrame ? <Smartphone className="w-3.5 h-3.5 text-blue-400" /> : <Monitor className="w-3.5 h-3.5 text-slate-400" />}
              <span className="hidden sm:inline">{isMobileFrame ? 'Mobile App View' : 'Web View'}</span>
            </button>

            <span className="text-[11px] text-slate-400 hidden xl:inline">
              {language === 'bn' ? 'মাস্টার পাসওয়ার্ড: Dexdark342156' : 'Master Key: Dexdark342156'}
            </span>
          </div>
        </div>
      </div>

      {/* Domain & URL Manager Modal */}
      {showDomainModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 text-slate-100 shadow-2xl relative space-y-5">
            <button
              onClick={() => setShowDomainModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {language === 'bn' ? 'ওয়েবসাইট লিংক ও ডোমেইন সংযোগ' : 'Website Links & Domain Connection'}
                </h3>
                <p className="text-xs text-slate-400">
                  {language === 'bn'
                    ? 'আপনার পাবলিক ওয়েবসাইট, অ্যাডমিন প্যানেল এবং Vercel ডোমেইন লিংক'
                    : 'Your live public portal, admin panel, and Vercel domain links'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* 1. Public Website Live URL */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" />
                    {language === 'bn' ? '১. পাবলিক ওয়েবসাইট (সাধারণ ব্যবহারকারী)' : '1. Public Website (All Users)'}
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                    Live Active
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={publicLiveUrl}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-200 select-all"
                  />
                  <button
                    onClick={() => handleCopy(publicLiveUrl, 'public')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1 transition-colors"
                  >
                    {copiedKey === 'public' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'public' ? 'Copied' : 'Copy'}</span>
                  </button>
                  <a
                    href={publicLiveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-medium text-white flex items-center gap-1 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open</span>
                  </a>
                </div>
              </div>

              {/* 2. Admin Panel Live URL */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    {language === 'bn' ? '২. অ্যাডমিন প্যানেল (মাস্টার পাসওয়ার্ড সুরক্ষিত)' : '2. Ultra-Secure Admin Panel'}
                  </span>
                  <span className="text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800">
                    Master Protected
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={adminLiveUrl}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-200 select-all"
                  />
                  <button
                    onClick={() => handleCopy(adminLiveUrl, 'admin')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1 transition-colors"
                  >
                    {copiedKey === 'admin' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'admin' ? 'Copied' : 'Copy'}</span>
                  </button>
                  <a
                    href={adminLiveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-medium text-white flex items-center gap-1 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open</span>
                  </a>
                </div>
                <p className="text-[11px] text-amber-300/90 flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5" />
                  {language === 'bn'
                    ? 'মাস্টার পাসওয়ার্ড: Dexdark342156'
                    : 'Master Password: Dexdark342156'}
                </p>
              </div>

              {/* 3. Vercel Free Custom Domain */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-900/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {language === 'bn' ? '৩. আপনার Vercel ডোমেইন' : '3. Your Vercel Domain'}
                  </span>
                  <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">
                    Vercel Linked
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={vercelDomainUrl}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-200 select-all"
                  />
                  <button
                    onClick={() => handleCopy(vercelDomainUrl, 'vercel')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1 transition-colors"
                  >
                    {copiedKey === 'vercel' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'vercel' ? 'Copied' : 'Copy'}</span>
                  </button>
                  <a
                    href={vercelDomainUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white flex items-center gap-1 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Visit</span>
                  </a>
                </div>
                <p className="text-[11px] text-slate-400">
                  {language === 'bn'
                    ? 'vercel.json কনফিগার করা হয়েছে। আপনার Vercel প্রোজেক্টে এই কোড ডেপ্লয় থাকলে ডোমেইনটি স্বয়ংক্রিয়ভাবে লাইভ সাইট রিডাইরেক্ট করবে।'
                    : 'vercel.json is configured with full proxy routing so your Vercel deployment routes directly to this live app.'}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowDomainModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
              >
                {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
