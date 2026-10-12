import React from 'react';
import { useApp } from '../context/AppContext';
import { CategoryId } from '../types';
import {
  PhoneCall,
  HeartPulse,
  Hammer,
  GraduationCap,
  Briefcase,
  Layers,
  MapPin,
  Sparkles,
  ChevronRight,
  Radio,
  Share2,
  CheckCircle,
} from 'lucide-react';

interface CoreServicesBannerProps {
  onOpenBloodAlert?: () => void;
}

export const CoreServicesBanner: React.FC<CoreServicesBannerProps> = ({ onOpenBloodAlert }) => {
  const {
    activeCategory,
    setActiveCategory,
    language,
    bloodDonors,
    tuitionPosts,
    jobs,
    directoryItems,
    selectedDivision,
    selectedDistrict,
    selectedUpazila,
    setSelectedDivision,
    setSelectedDistrict,
    setSelectedUpazila,
    setIsBloodAlertModalOpen,
  } = useApp();

  // 1-Click Switch to Fulbaria Model Upazila
  const switchToFulbaria = () => {
    setSelectedDivision('Mymensingh');
    setSelectedDistrict('Mymensingh');
    setSelectedUpazila('Fulbaria');
  };

  // 1-Click Reset to All Bangladesh
  const switchToAllBangladesh = () => {
    setSelectedDivision('');
    setSelectedDistrict('');
    setSelectedUpazila('');
  };

  const isFulbaria =
    selectedDivision === 'Mymensingh' &&
    selectedDistrict === 'Mymensingh' &&
    selectedUpazila === 'Fulbaria';

  const emergencyCount = directoryItems.filter(
    (i) => i.category === 'emergency' || i.category === 'police' || i.category === 'health' || i.category === 'utilities'
  ).length;

  const dailyLaborCount = directoryItems.filter((i) => i.category === 'labor').length;

  // The 5 Core Pillars defined by user
  const serviceCards: {
    id: CategoryId | 'all';
    emoji: string;
    titleBn: string;
    titleEn: string;
    descBn: string;
    descEn: string;
    count: number;
    countLabelBn: string;
    countLabelEn: string;
    badgeBn: string;
    badgeEn: string;
    colorClasses: {
      border: string;
      bgActive: string;
      badge: string;
      ring: string;
    };
  }[] = [
    {
      id: 'emergency',
      emoji: '🚨',
      titleBn: 'জরুরি ডিরেক্টরি',
      titleEn: 'Emergency Directory',
      descBn: 'হাসপাতাল, থানা, ফায়ার সার্ভিস, পল্লী বিদ্যুৎ ও সরকারি কর্মকর্তা',
      descEn: 'Hospitals, Thana Police, Fire Service, Electricity & Officials',
      count: emergencyCount,
      countLabelBn: 'টি জরুরি সেবা',
      countLabelEn: 'hotlines & units',
      badgeBn: '২৪/৭ হটলাইন',
      badgeEn: '24/7 Hotlines',
      colorClasses: {
        border: 'border-red-300 hover:border-red-500',
        bgActive: 'bg-red-50/80 border-red-500 shadow-red-500/20',
        badge: 'bg-red-100 text-red-800 border-red-200',
        ring: 'focus:ring-red-500',
      },
    },
    {
      id: 'health',
      emoji: '🩸',
      titleBn: 'রক্তের তথ্য ও অ্যালার্ট',
      titleEn: 'Blood Info & Alert',
      descBn: 'A+, B+, O+, AB+ রক্তদাতা তালিকা ও তাৎক্ষণিক রক্তের রিকোয়েস্ট পুশ অ্যালার্ট',
      descEn: 'Verified donors & instant emergency blood request broadcast',
      count: bloodDonors.length,
      countLabelBn: 'জন রক্তদাতা',
      countLabelEn: 'donors listed',
      badgeBn: 'লাইভ পুশ অ্যালার্ট',
      badgeEn: 'Live Push Alert',
      colorClasses: {
        border: 'border-rose-300 hover:border-rose-500',
        bgActive: 'bg-rose-50/80 border-rose-500 shadow-rose-500/20',
        badge: 'bg-rose-100 text-rose-800 border-rose-200',
        ring: 'focus:ring-rose-500',
      },
    },
    {
      id: 'labor',
      emoji: '🛠️',
      titleBn: 'দিনমজুর ও কারিগর',
      titleEn: 'Laborers & Artisans',
      descBn: 'রাজমিস্ত্রি, কাঠমিস্ত্রি, ইলেকট্রিশিয়ান, রংমিস্ত্রি ও কৃষি দিনমজুর',
      descEn: 'Masons, Carpenters, Electricians, Painters with wage rates',
      count: dailyLaborCount,
      countLabelBn: 'জন কারিগর',
      countLabelEn: 'skilled workers',
      badgeBn: 'সরাসরি কল ও মজুরি',
      badgeEn: 'Direct Wages',
      colorClasses: {
        border: 'border-amber-300 hover:border-amber-500',
        bgActive: 'bg-amber-50/80 border-amber-500 shadow-amber-500/20',
        badge: 'bg-amber-100 text-amber-800 border-amber-200',
        ring: 'focus:ring-amber-500',
      },
    },
    {
      id: 'education',
      emoji: '🎓',
      titleBn: 'টিউশন ম্যাচমেকিং',
      titleEn: 'Tuition Matchmaking',
      descBn: 'যাচাইকৃত গৃহশিক্ষক ও অভিভাবকদের সরাসরি যোগাযোগ (জিরো ব্রোকার ফি)',
      descEn: 'Verified home tutors & guardians direct contact with zero broker fee',
      count: tuitionPosts.length,
      countLabelBn: 'টি টিউশন এন্ট্রি',
      countLabelEn: 'active tuitions',
      badgeBn: 'অভিভাবক ও শিক্ষক',
      badgeEn: 'Zero Commission',
      colorClasses: {
        border: 'border-indigo-300 hover:border-indigo-500',
        bgActive: 'bg-indigo-50/80 border-indigo-500 shadow-indigo-500/20',
        badge: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        ring: 'focus:ring-indigo-500',
      },
    },
    {
      id: 'jobs',
      emoji: '💼',
      titleBn: 'চাকরি পোর্টাল',
      titleEn: 'Job Circular Portal',
      descBn: 'সরকারি (BCS, প্রাইমারি শিক্ষক) ও বেসরকারি চাকরির সার্কুলার ও AI সামারি',
      descEn: 'Govt & private recruitment notices with AI bullet summaries',
      count: jobs.length,
      countLabelBn: 'টি সার্কুলার',
      countLabelEn: 'job circulars',
      badgeBn: 'AI সারসংক্ষেপ',
      badgeEn: 'AI Summary',
      colorClasses: {
        border: 'border-emerald-300 hover:border-emerald-500',
        bgActive: 'bg-emerald-50/80 border-emerald-500 shadow-emerald-500/20',
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        ring: 'focus:ring-emerald-500',
      },
    },
  ];

  const handleCardClick = (id: CategoryId | 'all') => {
    setActiveCategory(id);
    // Smooth scroll down to the content area
    const el = document.getElementById('core-service-content-view');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Exact Header Banner requested with #006a4e Bangladesh Green styling */}
      <section
        style={{ backgroundColor: '#006a4e' }}
        className="text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden text-center border-2 border-emerald-700/60 transition-all"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-xs font-bold text-emerald-100 backdrop-blur-xs border border-white/20">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span>
              {language === 'bn'
                ? 'বাংলাদেশের সমন্বিত ডিজিটাল সেবা ও জরুরি হটলাইন'
                : 'Bangladesh Integrated Digital Service & Emergency Platform'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-sm uppercase">
            ALL IN ONE BANGLADESH
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-emerald-100 font-medium">
            {language === 'bn'
              ? 'আপনার এলাকার সকল সেবা এখন এক প্ল্যাটফর্মে!'
              : 'All your local emergency & daily services now on one single platform!'}
          </p>

          {/* Quick Model Selector Pills: Fulbaria Model Upazila vs All Bangladesh */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
            <button
              onClick={switchToFulbaria}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold transition-all shadow-xs ${
                isFulbaria
                  ? 'bg-amber-400 text-slate-900 ring-2 ring-white scale-105'
                  : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-amber-900" />
              <span>
                {language === 'bn' ? '📍 ফুলবাড়ীয়া মডেল উপজেলা ভিউ' : '📍 Fulbaria Model Upazila'}
              </span>
            </button>

            <button
              onClick={switchToAllBangladesh}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold transition-all shadow-xs ${
                !isFulbaria && !selectedDivision
                  ? 'bg-white text-emerald-900 ring-2 ring-white scale-105'
                  : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>
                {language === 'bn' ? '🌐 সমগ্র বাংলাদেশ (৬৪ জেলা)' : '🌐 All Bangladesh (64 Districts)'}
              </span>
            </button>

            {/* Quick Blood Emergency Button */}
            <button
              onClick={() => setIsBloodAlertModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold bg-red-600 hover:bg-red-700 text-white transition-all shadow-md animate-pulse border border-red-400"
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'জরুরি রক্ত চাই (পুশ অ্যালার্ট)' : 'Request Blood (Push Alert)'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. "আমাদের সেবাসমূহ" (Our Core Services) - 5 Pillars interactive cards */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600" />
              <span>{language === 'bn' ? 'আমাদের সেবাসমূহ' : 'Our Core Services'}</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {language === 'bn'
                ? 'যেকোনো সেবায় ক্লিক করে সরাসরি তথ্য দেখুন, ডায়াল করুন অথবা তথ্য পোস্ট করুন'
                : 'Click any service below to explore verified listings, dial hotlines, or add posts'}
            </p>
          </div>

          {/* Reset / All Services Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'সকল সেবা প্রদর্শন' : 'Show All Services'}</span>
            </button>
          </div>
        </div>

        {/* 5 Prominent Cards in Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {serviceCards.map((service) => {
            const isActive = activeCategory === service.id;
            return (
              <div
                key={service.id}
                onClick={() => handleCardClick(service.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(service.id);
                  }
                }}
                className={`relative rounded-2xl p-4 sm:p-5 flex flex-col justify-between text-left cursor-pointer transition-all border-2 bg-white group shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                  isActive
                    ? `${service.colorClasses.bgActive} shadow-lg ring-2 ring-emerald-600/30`
                    : `${service.colorClasses.border}`
                }`}
              >
                {/* Top Emoji & Badge */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <span className="text-2xl sm:text-3xl p-1.5 rounded-xl bg-slate-100/80 group-hover:scale-110 transition-transform">
                      {service.emoji}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${service.colorClasses.badge}`}
                    >
                      {language === 'bn' ? service.badgeBn : service.badgeEn}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {language === 'bn' ? service.titleBn : service.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {language === 'bn' ? service.descBn : service.descEn}
                  </p>
                </div>

                {/* Bottom stats and action indicator */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 text-[11px]">
                    <strong className="text-slate-900 font-extrabold">{service.count}</strong>{' '}
                    {language === 'bn' ? service.countLabelBn : service.countLabelEn}
                  </span>

                  <span
                    className={`flex items-center text-[11px] font-bold transition-all ${
                      isActive ? 'text-emerald-700' : 'text-slate-400 group-hover:text-emerald-600'
                    }`}
                  >
                    <span>{language === 'bn' ? 'প্রবেশ করুন' : 'View'}</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Anchor for smooth scroll */}
      <div id="core-service-content-view" className="scroll-mt-24" />
    </div>
  );
};
