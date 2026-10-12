import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DomainBar } from './components/DomainBar';
import { Header } from './components/Header';
import { DeveloperProfileModal } from './components/DeveloperProfileModal';
import { PopUpAdModal } from './components/PopUpAdModal';
import { BannerAds } from './components/BannerAds';
import { LocationFilter } from './components/LocationFilter';
import { LeaderboardSection } from './components/LeaderboardSection';
import { SelfPostModal } from './components/SelfPostModal';
import { BloodPushAlertModal } from './components/BloodPushAlertModal';
import { AIChatWidget } from './components/AIChatWidget';
import { DirectoryCard } from './components/directory/DirectoryCard';
import { CoreServicesBanner } from './components/CoreServicesBanner';
import { DailyLaborSection } from './components/directory/DailyLaborSection';
import { TuitionSection } from './components/directory/TuitionSection';
import { BloodDonorSection } from './components/directory/BloodDonorSection';
import { JobPortalSection } from './components/directory/JobPortalSection';
import { UpazilaEmergencyHero } from './components/directory/UpazilaEmergencyHero';
import { EmergencyPrintModal } from './components/directory/EmergencyPrintModal';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CategoryId } from './types';
import {
  ShieldAlert,
  Search,
  PhoneCall,
  Flame,
  Hammer,
  GraduationCap,
  Briefcase,
  HeartPulse,
  Bus,
  Shield,
  ShoppingBag,
  Tractor,
  Lightbulb,
  Scale,
  Calendar,
  Layers,
  Facebook,
  Mail,
  Phone,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

const PublicApp: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    selectedDivision,
    selectedDistrict,
    selectedUpazila,
    directoryItems,
    isMobileFrame,
    setIsDevProfileOpen,
    language,
    t,
  } = useApp();

  const [isPrintModalOpen, setIsPrintModalOpen] = React.useState(false);

  const categoriesList: { id: CategoryId | 'all'; name: string; icon: React.ReactNode }[] = [
    { id: 'all', name: t.categories.all, icon: <Layers className="w-4 h-4" /> },
    { id: 'labor', name: t.categories.labor, icon: <Hammer className="w-4 h-4" /> },
    { id: 'education', name: t.categories.education, icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'health', name: t.categories.health, icon: <HeartPulse className="w-4 h-4" /> },
    { id: 'jobs', name: t.categories.jobs, icon: <Briefcase className="w-4 h-4" /> },
    { id: 'police', name: t.categories.police, icon: <Shield className="w-4 h-4" /> },
    { id: 'emergency', name: t.categories.emergency, icon: <PhoneCall className="w-4 h-4" /> },
    { id: 'transport', name: t.categories.transport, icon: <Bus className="w-4 h-4" /> },
    { id: 'shopping', name: t.categories.shopping, icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'agriculture', name: t.categories.agriculture, icon: <Tractor className="w-4 h-4" /> },
    { id: 'utilities', name: t.categories.utilities, icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'legal', name: t.categories.legal, icon: <Scale className="w-4 h-4" /> },
    { id: 'events', name: t.categories.events, icon: <Calendar className="w-4 h-4" /> },
  ];

  // Filtering directory items
  const filteredItems = directoryItems.filter((item) => {
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    if (selectedDivision && item.division.toLowerCase() !== selectedDivision.toLowerCase()) return false;
    if (selectedDistrict && item.district.toLowerCase() !== selectedDistrict.toLowerCase()) return false;
    if (selectedUpazila && !item.upazila.toLowerCase().includes(selectedUpazila.toLowerCase())) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q) || item.titleBn.toLowerCase().includes(q);
      const matchSub = item.subcategory.toLowerCase().includes(q) || item.subcategoryBn.toLowerCase().includes(q);
      const matchAddress = item.address.toLowerCase().includes(q) || item.addressBn.toLowerCase().includes(q);
      const matchPhone = item.phone.includes(q);
      if (!matchTitle && !matchSub && !matchAddress && !matchPhone) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full space-y-6">
        {/* Top Google AdSense / Local Banner */}
        <BannerAds placement="top" />

        {/* 5 Core Pillars Banner (ALL IN ONE BANGLADESH - আমাদের সেবাসমূহ) */}
        <CoreServicesBanner />

        {/* Signature Upazila Emergency Service Hero (Fulbaria Model & National Hotlines) */}
        <UpazilaEmergencyHero onOpenPrintModal={() => setIsPrintModalOpen(true)} />

        {/* Global Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-900 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categoriesList.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-[1.02]'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Hierarchical Location Filter */}
        <LocationFilter />

        {/* Dynamic Category Views */}
        {activeCategory === 'labor' ? (
          <DailyLaborSection />
        ) : activeCategory === 'education' ? (
          <TuitionSection />
        ) : activeCategory === 'health' ? (
          <BloodDonorSection />
        ) : activeCategory === 'jobs' ? (
          <JobPortalSection />
        ) : (
          <div className="space-y-6">
            {/* Show Highlights when "All" is active */}
            {activeCategory === 'all' && (
              <>
                {/* Gamified Contributor Leaderboard */}
                <LeaderboardSection />

                {/* Quick Section Jump Banners */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div
                    onClick={() => setActiveCategory('labor')}
                    className="p-4 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-white cursor-pointer hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <Hammer className="w-6 h-6" />
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">Explore</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-extrabold mt-2">
                      {language === 'bn' ? 'দিনমজুর ও দক্ষ কারিগর' : 'Daily Labor & Skilled Workers'}
                    </h4>
                    <p className="text-xs text-amber-100 mt-0.5">
                      {language === 'bn' ? 'রাজমিস্ত্রি, কাঠমিস্ত্রি, ইলেকট্রিশিয়ানদের ফোন নম্বর' : 'Masons, Carpenters & Electricians with daily wages'}
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveCategory('education')}
                    className="p-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white cursor-pointer hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <GraduationCap className="w-6 h-6" />
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">Matchmaking</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-extrabold mt-2">
                      {language === 'bn' ? 'গৃহশিক্ষক ও টিউশন ম্যাচিং' : 'Tuition & Teacher Matchmaking'}
                    </h4>
                    <p className="text-xs text-indigo-100 mt-0.5">
                      {language === 'bn' ? 'শিক্ষক ও অভিভাবকদের সরাসরি যোগাযোগ' : 'Connect verified tutors with guardians'}
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveCategory('health')}
                    className="p-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white cursor-pointer hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <HeartPulse className="w-6 h-6" />
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">Emergency</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-extrabold mt-2">
                      {language === 'bn' ? 'জরুরি রক্তদাতা ও পুশ অ্যালার্ট' : 'Emergency Blood Donors'}
                    </h4>
                    <p className="text-xs text-red-100 mt-0.5">
                      {language === 'bn' ? 'A+, B+, O+, AB+ রক্তদাতাদের সরাসরি কল' : 'Direct donor contacts & push alerts'}
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Standard Directory Cards Grid */}
            <div id="directory-listings-section" className="space-y-4 scroll-mt-20">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-bold text-slate-800">
                  {language === 'bn'
                    ? `ডিরেক্টরি ও সেবা তালিকা (${filteredItems.length} টি পাওয়া গেছে)`
                    : `Verified Directory Listings (${filteredItems.length} found)`}
                </h3>
              </div>

              {filteredItems.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                  <p className="text-slate-500 text-sm">
                    {language === 'bn'
                      ? 'নির্বাচিত এলাকায় কোনো তালিকা পাওয়া যায়নি। দয়া করে ফিল্টার পরিবর্তন করুন অথবা প্রথম পোস্টকারী হিসেবে নতুন এন্ট্রি যোগ করুন।'
                      : 'No directory listings found in selected area. Try resetting filters or add a self-service post.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredItems.map((item) => (
                    <DirectoryCard key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* In-Feed Banner Ad */}
        <BannerAds placement="feed" />

        {/* PUBLIC DEVELOPER PROFILE SECTION (SECTION 2 IN SPEC) */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
                  alt="Md kanchon Hossen"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                    Lead Developer & System Architect
                  </span>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  Md kanchon Hossen
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {language === 'bn'
                    ? 'প্রতিষ্ঠাতা ও ডেভেলপার • ALL IN ONE BANGLADESH'
                    : 'Founder & Full-Stack Developer • ALL IN ONE BANGLADESH'}
                </p>
              </div>
            </div>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <a
                href="tel:01642240176"
                className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>01642240176</span>
              </a>

              <a
                href="mailto:mdkanchonhossen7@gmail.com"
                className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>mdkanchonhossen7@gmail.com</span>
              </a>

              <a
                href="https://www.facebook.com/share/18Ls5y3LWu/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 text-xs font-bold transition-colors"
              >
                <Facebook className="w-3.5 h-3.5 text-indigo-600" />
                <span>Facebook Profile</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 mt-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white p-1 border-2 border-emerald-500/80 flex items-center justify-center shrink-0 shadow-md">
              <img src="/logo.png" alt="ALL IN ONE BANGLADESH Logo" className="w-full h-full object-contain" />
            </div>
            <div className="space-y-0.5">
              <div className="font-extrabold text-slate-200 text-sm">ALL IN ONE BANGLADESH</div>
              <p className="text-[11px] text-slate-400">
                {language === 'bn'
                  ? 'বাংলাদেশের ৬৪ জেলার সাধারণ নাগরিক, দিনমজুর ও শিক্ষার্থীদের সমন্বিত প্ল্যাটফর্ম।'
                  : 'Production-ready All-in-One Local Directory, Service, Daily Labor & Tuition Portal for Bangladesh.'}
              </p>
            </div>
          </div>

          <div className="text-center md:text-right text-[11px] space-y-1">
            <p className="font-semibold text-slate-200">
              Developer: <strong className="text-emerald-400">Md Kanchon Hossen</strong> | Contact: <a href="mailto:mdkanchonhossen7@gmail.com" className="text-slate-300 hover:text-white underline">mdkanchonhossen7@gmail.com</a>
            </p>
            <p className="text-slate-400">
              Hotline: <a href="tel:01642240176" className="text-emerald-300 font-bold hover:underline">01642240176</a> | Facebook: <a href="https://www.facebook.com/share/18Ls5y3LWu/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Profile</a>
            </p>
            <div className="text-slate-500 pt-0.5">
              All Rights Reserved © 2026 ALL IN ONE BANGLADESH
            </div>
          </div>
        </div>
      </footer>

      {/* Emergency Directory Card Print / Offline Modal */}
      <EmergencyPrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
      />
    </div>
  );
};

const MainContent: React.FC = () => {
  const { domainMode, isAdminLoggedIn, isMobileFrame } = useApp();

  return (
    <div className={isMobileFrame ? 'min-h-screen bg-slate-800 p-4 sm:p-8 flex items-center justify-center' : ''}>
      <div
        className={
          isMobileFrame
            ? 'w-full max-w-[420px] h-[880px] bg-white rounded-[45px] shadow-2xl border-[12px] border-slate-900 overflow-y-auto relative flex flex-col'
            : ''
        }
      >
        {/* Domain Bar Simulator */}
        <DomainBar />

        {/* Content based on Domain Mode */}
        {domainMode === 'admin' ? (
          isAdminLoggedIn ? (
            <AdminDashboard />
          ) : (
            <AdminLogin />
          )
        ) : (
          <PublicApp />
        )}

        {/* Persistent Global Modals & Widgets */}
        <DeveloperProfileModal />
        <PopUpAdModal />
        <SelfPostModal />
        <BloodPushAlertModal />
        <AIChatWidget />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
