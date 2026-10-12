import React from 'react';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/logo.png';
import {
  Globe,
  PlusCircle,
  PhoneCall,
  User,
  Shield,
  Award,
  Sparkles,
  Search,
  SlidersHorizontal,
  Flame,
  LifeBuoy,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    currentUser,
    setIsDevProfileOpen,
    setIsSelfPostModalOpen,
    setIsBloodAlertModalOpen,
    domainMode,
    setDomainMode,
    t,
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      {/* Top emergency & quick announcement stripe */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
          <span className="hidden sm:inline">
            {language === 'bn'
              ? 'সারাদেশের ৬৪ জেলা ও সকল উপজেলার সমন্বিত ডিজিটাল সেবা ও হটলাইন'
              : 'Integrated Directory, Daily Labor & Emergency Hotlines for all 64 Districts'}
          </span>
          <span className="sm:hidden font-bold">ALL IN ONE BANGLADESH</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Emergency 999 Call */}
          <a
            href="tel:999"
            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-2.5 py-0.5 rounded-full font-bold shadow-xs transition-colors text-[11px]"
            title="National Emergency Service 999"
          >
            <PhoneCall className="w-3 h-3" />
            <span>{t.emergency999}</span>
          </a>

          {/* Developer Profile Trigger Button */}
          <button
            onClick={() => setIsDevProfileOpen(true)}
            className="flex items-center gap-1 hover:text-emerald-200 font-semibold text-[11px] transition-colors"
          >
            <User className="w-3.5 h-3.5 text-emerald-300" />
            <span>{t.developerProfile}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Logo & Brand Name */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setDomainMode('public')}>
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white p-1 flex items-center justify-center shadow-md border-2 border-emerald-500/80 group-hover:border-emerald-600 transition-all shrink-0 overflow-hidden group-hover:scale-105">
            <img
              src={logoImg}
              alt="ALL IN ONE BANGLADESH"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight leading-none group-hover:text-emerald-800 transition-colors">
                ALL IN ONE BANGLADESH
              </h1>
              <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                PROD v2.4
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate max-w-[220px] sm:max-w-md">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dynamic Language Switcher Toggle (বাংলা | English) */}
          <button
            onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 font-bold text-xs text-slate-800 transition-colors shadow-xs"
            title="Toggle Language / ভাষা পরিবর্তন করুন"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-extrabold">{language === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>

          {/* Urgent Blood Alert Button */}
          <button
            onClick={() => setIsBloodAlertModalOpen(true)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-bold transition-colors"
            title="Send Emergency Blood Push Notification"
          >
            <Flame className="w-3.5 h-3.5 text-red-600" />
            <span>{language === 'bn' ? 'রক্তের অ্যালার্ট' : 'Blood Alert'}</span>
          </button>

          {/* Self-Service Direct Post Button */}
          <button
            onClick={() => setIsSelfPostModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.selfServicePost}</span>
          </button>

          {/* User Profile Badge */}
          <div
            onClick={() => setIsDevProfileOpen(true)}
            className="flex items-center gap-2 pl-2 border-l border-slate-200 cursor-pointer hover:opacity-85"
            title={`${currentUser.name} (${currentUser.points} pts)`}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-emerald-400 bg-slate-100 shrink-0">
              <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
            </div>
            <div className="hidden xl:block text-left text-xs leading-tight">
              <div className="font-bold text-slate-800 truncate max-w-[100px]">{currentUser.name}</div>
              <div className="text-[10px] text-emerald-700 font-semibold">{currentUser.points} pts • {currentUser.badge}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
