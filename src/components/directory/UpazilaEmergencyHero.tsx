import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CategoryId } from '../../types';
import {
  PhoneCall,
  Flame,
  Shield,
  HeartPulse,
  Building2,
  Zap,
  Tractor,
  GraduationCap,
  Hammer,
  Briefcase,
  Layers,
  MapPin,
  Printer,
  PlusCircle,
  Copy,
  Check,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Radio,
  FileText,
  Ambulance,
  LifeBuoy,
} from 'lucide-react';

interface UpazilaEmergencyHeroProps {
  onOpenPrintModal: () => void;
}

export const UpazilaEmergencyHero: React.FC<UpazilaEmergencyHeroProps> = ({ onOpenPrintModal }) => {
  const {
    language,
    selectedDivision,
    setSelectedDivision,
    selectedDistrict,
    setSelectedDistrict,
    selectedUpazila,
    setSelectedUpazila,
    activeCategory,
    setActiveCategory,
    setIsSelfPostModalOpen,
    setIsBloodAlertModalOpen,
    directoryItems,
  } = useApp();

  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const copyNumber = (num: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

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

  const isFulbariaActive =
    selectedDivision === 'Mymensingh' &&
    selectedDistrict === 'Mymensingh' &&
    selectedUpazila === 'Fulbaria';

  // National 24/7 hotlines with Bengali & English
  const nationalHotlines = [
    {
      number: '999',
      titleBn: 'জাতীয় জরুরি সেবা',
      titleEn: 'National Emergency',
      subBn: 'পুলিশ, এম্বুলেন্স, ফায়ার',
      subEn: 'Police, Amb, Fire',
      bgClass: 'from-red-600 to-rose-700 text-white',
      badgeBn: 'টোল-ফ্রি ২৪/৭',
      badgeEn: 'Toll-Free 24/7',
      icon: <PhoneCall className="w-4 h-4" />,
    },
    {
      number: '333',
      titleBn: 'সরকারি সেবা হেল্পলাইন',
      titleEn: 'Citizen Information',
      subBn: 'তথ্য ও নাগরিক সেবা',
      subEn: 'Public Service Desk',
      bgClass: 'from-emerald-600 to-teal-700 text-white',
      badgeBn: '২৪ ঘণ্টা',
      badgeEn: '24 Hours',
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      number: '16263',
      titleBn: 'স্বাস্থ্য বাতায়ন',
      titleEn: 'Shastho Batayon',
      subBn: 'ফ্রি ডাক্তার পরামর্শ',
      subEn: 'Free Telemedicine',
      bgClass: 'from-cyan-600 to-blue-700 text-white',
      badgeBn: 'ফ্রি ডাক্তারি কল',
      badgeEn: 'Free Doctor',
      icon: <HeartPulse className="w-4 h-4" />,
    },
    {
      number: '16163',
      titleBn: 'ফায়ার সার্ভিস নিয়ন্ত্রণ',
      titleEn: 'Fire Service Control',
      subBn: 'অগ্নি নির্বাপণ ও উদ্ধার',
      subEn: 'Fire & Rescue',
      bgClass: 'from-amber-600 to-orange-700 text-white',
      badgeBn: 'জরুরি উদ্ধার',
      badgeEn: 'Emergency Rescue',
      icon: <Flame className="w-4 h-4" />,
    },
    {
      number: '16575',
      titleBn: 'বিদ্যুৎ জরুরি সেবা',
      titleEn: 'Power Helpline',
      subBn: 'পল্লী বিদ্যুৎ ও লাইন',
      subEn: 'Electricity & Complain',
      bgClass: 'from-yellow-600 to-amber-700 text-white',
      badgeBn: 'সার্বক্ষণিক',
      badgeEn: '24/7 Support',
      icon: <Zap className="w-4 h-4" />,
    },
    {
      number: '109',
      titleBn: 'নারী ও শিশু সহায়তা',
      titleEn: 'Women & Child',
      subBn: 'নির্যাতন প্রতিরোধ সেল',
      subEn: 'Abuse Helpline',
      bgClass: 'from-purple-600 to-indigo-700 text-white',
      badgeBn: 'টোল-ফ্রি',
      badgeEn: 'Toll-Free',
      icon: <Shield className="w-4 h-4" />,
    },
    {
      number: '16123',
      titleBn: 'কৃষি কল সেন্টার',
      titleEn: 'Krishi Call Center',
      subBn: 'ফসল ও সার পরামর্শ',
      subEn: 'Farmer Helpline',
      bgClass: 'from-lime-700 to-green-800 text-white',
      badgeBn: 'কৃষক সেবা',
      badgeEn: 'Agro Desk',
      icon: <Tractor className="w-4 h-4" />,
    },
    {
      number: '105',
      titleBn: 'জাতীয় পরিচয়পত্র (NID)',
      titleEn: 'Smart NID Helpline',
      subBn: 'স্মার্ট কার্ড ও ভোটার',
      subEn: 'Voter & NID Desk',
      bgClass: 'from-slate-700 to-slate-900 text-white',
      badgeBn: 'নির্বাচন কমিশন',
      badgeEn: 'EC Helpline',
      icon: <FileText className="w-4 h-4" />,
    },
  ];

  // Upazila Emergency Service Category Cards
  const emergencyCategoryTiles = [
    {
      id: 'health' as CategoryId,
      nameBn: 'হাসপাতাল ও এম্বুলেন্স',
      nameEn: 'Hospitals & Ambulance',
      descBn: 'উপজেলা স্বাস্থ্য কমপ্লেক্স, ক্লিনিক ও ২৪/৭ এম্বুলেন্স ড্রাইভার',
      descEn: 'Upazila health complex, clinics & 24/7 ambulance drivers',
      icon: <HeartPulse className="w-5 h-5 text-red-500" />,
      accent: 'border-red-200 bg-red-50/50 hover:border-red-400',
    },
    {
      id: 'police' as CategoryId,
      nameBn: 'থানা ও পুলিশ প্রশাসন',
      nameEn: 'Police & Security',
      descBn: 'মডেল থানা, ওসি নম্বর, ডিউটি অফিসার ও জিডি সহায়তা',
      descEn: 'Thana police, OC direct phone & 24/7 duty desk',
      icon: <Shield className="w-5 h-5 text-indigo-500" />,
      accent: 'border-indigo-200 bg-indigo-50/50 hover:border-indigo-400',
    },
    {
      id: 'emergency' as CategoryId,
      nameBn: 'ফায়ার সার্ভিস ও প্রশাসন',
      nameEn: 'Fire Service & UNO',
      descBn: 'ফায়ার স্টেশন, ইউএনও অফিস, এসি ল্যান্ড ও প্রেস ক্লাব',
      descEn: 'Fire station, UNO office, AC Land & journalists',
      icon: <Building2 className="w-5 h-5 text-amber-500" />,
      accent: 'border-amber-200 bg-amber-50/50 hover:border-amber-400',
    },
    {
      id: 'utilities' as CategoryId,
      nameBn: 'বিদ্যুৎ ও পল্লী বিদ্যুৎ',
      nameEn: 'Palli Bidyut & Power',
      descBn: 'অভিযোগ কেন্দ্র, ট্রান্সফরমার মেরামত ও লাইনম্যানের নম্বর',
      descEn: 'Zonal complain center, lineman contact & emergency',
      icon: <Zap className="w-5 h-5 text-yellow-600" />,
      accent: 'border-yellow-200 bg-yellow-50/50 hover:border-yellow-400',
    },
    {
      id: 'agriculture' as CategoryId,
      nameBn: 'কৃষি, মৎস্য ও প্রাণিসম্পদ',
      nameEn: 'Agro & Livestock',
      descBn: 'উপজেলা কৃষি কর্মকর্তা, সার-বীজ ও পশু হাসপাতাল',
      descEn: 'Upazila agro officer, seed dealers & veterinary clinic',
      icon: <Tractor className="w-5 h-5 text-emerald-600" />,
      accent: 'border-emerald-200 bg-emerald-50/50 hover:border-emerald-400',
    },
    {
      id: 'transport' as CategoryId,
      nameBn: 'পরিবহন ও বাস কাউন্টার',
      nameEn: 'Transport & Buses',
      descBn: 'আন্তঃজেলা বাস কাউন্টার, রেন্ট-এ-কার ও টিকিট কাউন্টার',
      descEn: 'Inter-district bus counters, tickets & car rental',
      icon: <Ambulance className="w-5 h-5 text-blue-500" />,
      accent: 'border-blue-200 bg-blue-50/50 hover:border-blue-400',
    },
    {
      id: 'education' as CategoryId,
      nameBn: 'গৃহশিক্ষক ও টিউশন',
      nameEn: 'Tuition & Education',
      descBn: 'অভিভাবক ও শিক্ষকদের সরাসরি গৃহশিক্ষক ম্যাচমেকিং',
      descEn: 'Direct teacher & guardian tuition matchmaking',
      icon: <GraduationCap className="w-5 h-5 text-cyan-600" />,
      accent: 'border-cyan-200 bg-cyan-50/50 hover:border-cyan-400',
    },
    {
      id: 'labor' as CategoryId,
      nameBn: 'দিনমজুর ও দক্ষ কারিগর',
      nameEn: 'Daily Labor & Workers',
      descBn: 'রাজমিস্ত্রি, কাঠমিস্ত্রি, ইলেকট্রিশিয়ান ও কৃষি দিনমজুর',
      descEn: 'Masons, electricians, carpenters & field laborers',
      icon: <Hammer className="w-5 h-5 text-orange-600" />,
      accent: 'border-orange-200 bg-orange-50/50 hover:border-orange-400',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Breaking Emergency Marquee Ticker */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-md overflow-hidden text-xs">
        <div className="flex items-center gap-1.5 font-black uppercase shrink-0 bg-black/20 px-2 py-0.5 rounded-lg border border-white/20">
          <Radio className="w-3.5 h-3.5 animate-pulse text-amber-300" />
          <span>{language === 'bn' ? 'জরুরি বিজ্ঞপ্তি' : 'Emergency Alert'}</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="whitespace-nowrap animate-marquee flex items-center gap-8 font-semibold">
            <span>
              🚨 {language === 'bn'
                ? 'জাতীয় জরুরি সেবা পুলিশ, ফায়ার ও এম্বুলেন্সের জন্য টোল-ফ্রি ৯৯৯ ডায়াল করুন'
                : 'Dial Toll-Free 999 for National Police, Fire & Ambulance response 24/7'}
            </span>
            <span>•</span>
            <span>
              🩺 {language === 'bn'
                ? '২৪ ঘণ্টা বিনামূল্যে সরকারি ডাক্তার পরামর্শ পেতে ১৬২৬৩ তে কল করুন'
                : 'Call 16263 for 24/7 Free Telemedicine Medical Consultation'}
            </span>
            <span>•</span>
            <span>
              📍 {language === 'bn'
                ? 'ফুলবাড়ীয়া উপজেলা স্বাস্থ্য কমপ্লেক্স, থানা, ফায়ার সার্ভিস ও পল্লী বিদ্যুতের সকল নম্বর সংযুক্ত'
                : 'Fulbaria Upazila Hospital, Thana Police, Fire Station & Palli Bidyut numbers live!'}
            </span>
            <span>•</span>
            <span>
              🩸 {language === 'bn'
                ? 'জরুরি রক্তের প্রয়োজনে রক্তের অ্যালার্ট পাঠান অথবা ডোনার তালিকায় সরাসরি কল করুন'
                : 'Send instant Blood Alert or browse verified blood donors in your upazila'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Flagship Upazila Emergency Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-6 sm:p-8 shadow-xl border border-slate-700/80">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Top Badge & Upazila Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/40 tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {language === 'bn'
                    ? 'ফুলবাড়ীয়া মডেল ও জাতীয় জরুরি সেবা ডিরেক্টরি'
                    : 'Fulbaria Model & National Emergency Directory'}
                </span>
              </span>
              <span className="text-[11px] font-bold text-slate-400 bg-white/10 px-2 py-0.5 rounded-full">
                {language === 'bn' ? '৬৪ জেলা • ৪৯৫ উপজেলা' : '64 Districts • 495 Upazilas'}
              </span>
            </div>

            {/* Quick Action Buttons: Print Card & Add Listing */}
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenPrintModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-bold transition-all border border-white/20"
                title="View & Print Emergency Contact Card"
              >
                <Printer className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'bn' ? 'জরুরি কার্ড প্রিন্ট' : 'Print Directory Card'}</span>
              </button>

              <button
                onClick={() => setIsSelfPostModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-bold transition-all shadow-md shadow-emerald-500/20"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'সেবা যোগ করুন' : 'Add Local Service'}</span>
              </button>
            </div>
          </div>

          {/* Hero Titles */}
          <div className="max-w-3xl space-y-2">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              {language === 'bn'
                ? 'ALL IN ONE BANGLADESH - সার্বিক উপজেলা ও জাতীয় জরুরি সেবা'
                : 'ALL IN ONE BANGLADESH - Upazila & National Emergency Directory'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              {language === 'bn'
                ? 'ফুলবাড়ীয়া উপজেলা সহ বাংলাদেশের সকল উপজেলার থানা পুলিশ, ফায়ার সার্ভিস, সরকারি হাসপাতাল, এম্বুলেন্স, রক্তদাতা, পল্লী বিদ্যুৎ ও প্রশাসনিক কর্মকর্তাদের সরাসরি ১-ক্লিকে কল করার ডিজিটাল প্ল্যাটফর্ম।'
                : 'Instant 1-click dial directory for Thana Police, Fire Service, Hospitals, 24/7 Ambulance, Blood Donors, Palli Bidyut & Administrative Officers across Fulbaria and all 495 upazilas.'}
            </p>
          </div>

          {/* Model Upazila Switcher Strip */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400">
                  {language === 'bn' ? 'বর্তমান প্রদর্শনী এলাকা:' : 'Currently Displaying Area:'}
                </div>
                <div className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                  <span>
                    {isFulbariaActive
                      ? (language === 'bn' ? 'ফুলবাড়ীয়া উপজেলা, ময়মনসিংহ (মডেল ভিউ)' : 'Fulbaria Upazila, Mymensingh (Model View)')
                      : selectedUpazila
                      ? `${selectedUpazila}, ${selectedDistrict}`
                      : selectedDistrict
                      ? `${selectedDistrict} জেলা`
                      : (language === 'bn' ? 'সমগ্র বাংলাদেশ (সকল উপজেলা)' : 'All Bangladesh (National View)')}
                  </span>
                  {isFulbariaActive && (
                    <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded-full">
                      ACTIVE MODEL
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick 1-Click Filter Chips */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
              <button
                onClick={switchToFulbaria}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  isFulbariaActive
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? '🎯 ফুলবাড়ীয়া উপজেলা (মডেল)' : '🎯 Fulbaria Upazila (Model)'}</span>
              </button>

              <button
                onClick={switchToAllBangladesh}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  !selectedDivision && !selectedDistrict && !selectedUpazila
                    ? 'bg-white text-slate-900 shadow-md'
                    : 'bg-white/10 hover:bg-white/20 text-slate-300 border border-white/10'
                }`}
              >
                <span>{language === 'bn' ? '🌐 সারা বাংলাদেশ' : '🌐 All Bangladesh'}</span>
              </button>

              <button
                onClick={() => setIsBloodAlertModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold transition-all border border-red-500/50"
              >
                <Flame className="w-3.5 h-3.5 text-red-300" />
                <span>{language === 'bn' ? 'জরুরি রক্ত' : 'Blood Alert'}</span>
              </button>
            </div>
          </div>

          {/* 3. National 24/7 Emergency Hotlines Grid (1-Touch Calling) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-300 tracking-wider">
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>
                  {language === 'bn'
                    ? 'এক ক্লিকে জরুরি হটলাইন ডায়াল করুন (টোল-ফ্রি ও সার্বক্ষণিক)'
                    : '1-Touch National Emergency Hotlines (24/7 Toll-Free)'}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                {language === 'bn' ? 'সরাসরি কল করতে ট্যাপ করুন' : 'Tap number to dial immediately'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2.5">
              {nationalHotlines.map((hotline) => (
                <a
                  key={hotline.number}
                  href={`tel:${hotline.number}`}
                  className={`group relative overflow-hidden rounded-2xl p-3 bg-gradient-to-r ${hotline.bgClass} shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col justify-between`}
                >
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <span className="text-[10px] font-bold bg-black/25 px-1.5 py-0.5 rounded backdrop-blur-xs">
                      {language === 'bn' ? hotline.badgeBn : hotline.badgeEn}
                    </span>
                    <button
                      onClick={(e) => copyNumber(hotline.number, e)}
                      className="p-1 rounded bg-black/20 hover:bg-black/40 text-white/90 transition-colors"
                      title="Copy Number"
                    >
                      {copiedNumber === hotline.number ? (
                        <Check className="w-3 h-3 text-emerald-300" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>

                  <div>
                    <div className="text-xl sm:text-2xl font-black tracking-tight leading-none">
                      {hotline.number}
                    </div>
                    <div className="text-xs font-bold text-white mt-1 leading-tight truncate">
                      {language === 'bn' ? hotline.titleBn : hotline.titleEn}
                    </div>
                    <div className="text-[10px] text-white/80 font-medium truncate mt-0.5">
                      {language === 'bn' ? hotline.subBn : hotline.subEn}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Emergency Directory Category Tiles (Visual Grid) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm sm:text-base font-extrabold text-slate-800">
              {language === 'bn' ? 'জরুরি সেবাসমূহ ও বিভাগ' : 'Emergency Service Departments'}
            </h3>
          </div>
          <button
            onClick={() => setActiveCategory('all')}
            className="text-xs text-emerald-700 hover:text-emerald-800 font-bold"
          >
            {language === 'bn' ? 'সকল সেবা দেখুন →' : 'View All Categories →'}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {emergencyCategoryTiles.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  // Scroll smoothly to directory results
                  const el = document.getElementById('directory-listings-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  cat.accent
                } ${
                  isActive
                    ? 'ring-2 ring-emerald-500 shadow-md scale-[1.02] bg-white'
                    : 'bg-white shadow-2xs hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-xl bg-slate-100/80">{cat.icon}</div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                    {language === 'bn' ? cat.nameBn : cat.nameEn}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {language === 'bn' ? cat.descBn : cat.descEn}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-emerald-700 font-bold">
                  <span>{language === 'bn' ? 'সেবা দেখুন' : 'Explore'}</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
