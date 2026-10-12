import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FlutterHub } from './FlutterHub';
import {
  BarChart3,
  Smartphone,
  Megaphone,
  ShieldCheck,
  Headphones,
  LogOut,
  Sliders,
  Trash2,
  CheckCircle,
  Flag,
  Send,
  Eye,
  Plus,
  TrendingUp,
  Users,
  Layers,
  Sparkles,
  ExternalLink,
  DollarSign,
  AlertTriangle,
  FileSpreadsheet,
  Download,
  Database,
  FileJson,
  Check,
  Filter,
  Globe,
  Link2,
  Copy,
} from 'lucide-react';
import { LocalBannerAd } from '../../types';
import {
  exportDirectoryListingsToCsv,
  exportTuitionsToCsv,
  exportBloodDonorsToCsv,
  exportFullPlatformBackup,
} from '../../utils/exportCsv';

export const AdminDashboard: React.FC = () => {
  const {
    logoutAdmin,
    popupAd,
    updatePopupAd,
    googleAds,
    updateGoogleAds,
    localBanners,
    toggleLocalBanner,
    deleteLocalBanner,
    addLocalBanner,
    directoryItems,
    deleteDirectoryItem,
    verifyDirectoryItem,
    flagDirectoryItem,
    tuitionPosts,
    deleteTuitionPost,
    bloodDonors,
    deleteBloodDonor,
    chatSessions,
    adminReplyToSession,
    handoverUnreadCount,
    language,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'analytics' | 'flutter' | 'monetization' | 'moderation' | 'handover' | 'domains'
  >('analytics');

  // Monetization form states
  const [popupTitle, setPopupTitle] = useState(popupAd.titleBn);
  const [popupImage, setPopupImage] = useState(popupAd.imageUrl);
  const [popupTarget, setPopupTarget] = useState(popupAd.targetUrl);
  const [popupCta, setPopupCta] = useState(popupAd.ctaTextBn);

  const [pubId, setPubId] = useState(googleAds.publisherId);
  const [topSlot, setTopSlot] = useState(googleAds.topBannerSlot);
  const [inFeedSlot, setInFeedSlot] = useState(googleAds.inFeedSlot);
  const [bottomSlot, setBottomSlot] = useState(googleAds.bottomBannerSlot);
  const [admobAppId, setAdmobAppId] = useState(googleAds.admobAppId);
  const [admobBanner, setAdmobBanner] = useState(googleAds.admobBannerId);

  // New local banner form
  const [sponsorName, setSponsorName] = useState('');
  const [bannerImg, setBannerImg] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [bannerPlacement, setBannerPlacement] = useState<'top' | 'feed' | 'sidebar'>('feed');

  // Live Handover Chat Active Session
  const [selectedChatSessionId, setSelectedChatSessionId] = useState<string>(
    chatSessions[0]?.sessionId || ''
  );
  const [adminReplyText, setAdminReplyText] = useState('');

  const activeChat = chatSessions.find((s) => s.sessionId === selectedChatSessionId) || chatSessions[0];

  const handleSavePopup = (e: React.FormEvent) => {
    e.preventDefault();
    updatePopupAd({
      titleBn: popupTitle,
      imageUrl: popupImage,
      targetUrl: popupTarget,
      ctaTextBn: popupCta,
    });
    alert(language === 'bn' ? 'পপ-আপ বিজ্ঞাপন সেটিংস সফলভাবে সংরক্ষিত!' : 'Pop-up settings saved successfully!');
  };

  const handleSaveGoogle = (e: React.FormEvent) => {
    e.preventDefault();
    updateGoogleAds({
      publisherId: pubId,
      topBannerSlot: topSlot,
      inFeedSlot,
      bottomBannerSlot: bottomSlot,
      admobAppId,
      admobBannerId: admobBanner,
    });
    alert(language === 'bn' ? 'Google AdSense ও AdMob সেটিংস সংরক্ষিত!' : 'AdSense & AdMob settings saved!');
  };

  const handleAddBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sponsorName || !bannerImg) return;
    const newBanner: LocalBannerAd = {
      id: `lb_${Date.now()}`,
      sponsorName,
      imageUrl: bannerImg,
      targetUrl: bannerUrl || 'https://allinonebangladesh.com',
      placement: bannerPlacement,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-12-31',
      clicks: 0,
      impressions: 0,
      active: true,
    };
    addLocalBanner(newBanner);
    setSponsorName('');
    setBannerImg('');
    setBannerUrl('');
  };

  // CSV Export Filter & Feedback states
  const [exportCategory, setExportCategory] = useState<string>('all');
  const [exportStatus, setExportStatus] = useState<string>('all');
  const [exportSuccessMessage, setExportSuccessMessage] = useState<string>('');
  const [tableSearchQuery, setTableSearchQuery] = useState<string>('');

  const triggerExportDirectoryCsv = (categoryOverride?: string) => {
    const targetCat = categoryOverride !== undefined ? categoryOverride : exportCategory;
    let itemsToExport = directoryItems;

    if (targetCat !== 'all') {
      itemsToExport = itemsToExport.filter((item) => item.category === targetCat);
    }
    if (exportStatus !== 'all') {
      itemsToExport = itemsToExport.filter((item) =>
        exportStatus === 'verified' ? item.verified : item.status === exportStatus
      );
    }

    const titleSlug = targetCat === 'all' ? 'directory_listings_all' : `directory_${targetCat}`;
    exportDirectoryListingsToCsv(itemsToExport, titleSlug);

    setExportSuccessMessage(
      language === 'bn'
        ? `সফলভাবে ${itemsToExport.length} টি ডিরেক্টরি এন্ট্রি CSV (Excel) ফাইলে এক্সপোর্ট করা হয়েছে!`
        : `Successfully exported ${itemsToExport.length} directory listings to CSV (Excel)!`
    );
    setTimeout(() => setExportSuccessMessage(''), 4000);
  };

  const triggerExportTuitionsCsv = () => {
    exportTuitionsToCsv(tuitionPosts);
    setExportSuccessMessage(
      language === 'bn'
        ? `সফলভাবে ${tuitionPosts.length} টি টিউশন পোস্ট CSV ফাইলে ডাউনলোড হয়েছে!`
        : `Successfully exported ${tuitionPosts.length} tuition posts to CSV!`
    );
    setTimeout(() => setExportSuccessMessage(''), 4000);
  };

  const triggerExportBloodDonorsCsv = () => {
    exportBloodDonorsToCsv(bloodDonors);
    setExportSuccessMessage(
      language === 'bn'
        ? `সফলভাবে ${bloodDonors.length} জন রক্তদাতার তথ্য CSV ফাইলে ডাউনলোড হয়েছে!`
        : `Successfully exported ${bloodDonors.length} blood donors to CSV!`
    );
    setTimeout(() => setExportSuccessMessage(''), 4000);
  };

  const triggerExportFullBackup = () => {
    exportFullPlatformBackup({
      metadata: {
        platform: 'ALL IN ONE BANGLADESH',
        exportDate: new Date().toISOString(),
        exportedBy: 'Md kanchon Hossen (Master Admin)',
        version: '2.4.0',
      },
      directoryItems,
      tuitionPosts,
      bloodDonors,
      localBanners,
      popupAd,
      googleAds,
    });
    setExportSuccessMessage(
      language === 'bn'
        ? 'সম্পূর্ণ প্ল্যাটফর্ম ব্যাকআপ JSON ফাইল সফলভাবে ডাউনলোড হয়েছে!'
        : 'Full platform database backup JSON successfully generated!'
    );
    setTimeout(() => setExportSuccessMessage(''), 4000);
  };

  const handleSendAdminReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminReplyText.trim() || !activeChat) return;
    adminReplyToSession(activeChat.sessionId, adminReplyText.trim());
    setAdminReplyText('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Top Admin Header */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white p-1 border-2 border-emerald-500 flex items-center justify-center shrink-0 shadow-md overflow-hidden">
            <img src="/logo.png" alt="ALL IN ONE BANGLADESH" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white">
                {t.welcomeAdmin}
              </h2>
              <span className="bg-rose-500/20 text-rose-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-rose-500/30">
                MASTER ADMIN
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              ALL IN ONE BANGLADESH • admin.allinonebangladesh.com
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={logoutAdmin}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-rose-300 hover:text-rose-200 border border-slate-700 text-xs font-bold transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.logout}</span>
          </button>
        </div>
      </div>

      {/* Main Admin Tab Navigation */}
      <div className="border-b border-slate-800 bg-slate-950/60 px-6 py-2 flex flex-wrap items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'analytics'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>{t.tabOverview}</span>
        </button>

        <button
          onClick={() => setActiveTab('flutter')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'flutter'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>{t.tabFlutterHub}</span>
        </button>

        <button
          onClick={() => setActiveTab('monetization')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'monetization'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>{t.tabMonetization}</span>
        </button>

        <button
          onClick={() => setActiveTab('moderation')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'moderation'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>{t.tabContentMod}</span>
          <span className="text-[10px] bg-slate-800 text-emerald-300 px-1.5 py-0.2 rounded-full">
            {directoryItems.length + tuitionPosts.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('handover')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all relative ${
            activeTab === 'handover'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Headphones className="w-4 h-4" />
          <span>{t.tabLiveHandover}</span>
          {chatSessions.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('domains')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'domains'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Globe className="w-4 h-4 text-cyan-300" />
          <span>{language === 'bn' ? 'ফ্রি ডোমেন ও কাস্টম URL হাব' : 'Free Domain & Custom URL Hub'}</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="max-w-7xl mx-auto p-6">
        {/* TAB 1: VISITOR ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Stat Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-bold uppercase">{language === 'bn' ? 'দৈনিক সক্রিয় মোবাইল অ্যাপ ব্যবহারকারী' : 'Daily Mobile App Users'}</span>
                  <Smartphone className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-white">48,920</div>
                <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" /> +14.2% from yesterday
                </div>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-bold uppercase">{language === 'bn' ? 'ওয়েবসাইট ভিজিটর (পাবলিক ওয়েব)' : 'Public Web Visitors'}</span>
                  <Eye className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-2xl font-black text-white">124,580</div>
                <div className="text-xs text-blue-400 flex items-center gap-1 mt-1 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" /> +28.5% weekly spike
                </div>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-bold uppercase">{language === 'bn' ? 'মোট ভেরিফায়েড ডিরেক্টরি এন্ট্রি' : 'Total Directory Entries'}</span>
                  <Layers className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-white">
                  {directoryItems.length + tuitionPosts.length + bloodDonors.length}
                </div>
                <div className="text-xs text-slate-400 mt-1">Across all 64 districts</div>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-bold uppercase">{language === 'bn' ? 'লাইভ হ্যান্ডওভার অপেক্ষমাণ' : 'Pending AI Handover Chats'}</span>
                  <Headphones className="w-5 h-5 text-rose-400 animate-pulse" />
                </div>
                <div className="text-2xl font-black text-rose-400">{chatSessions.length}</div>
                <div className="text-xs text-rose-300 mt-1 font-semibold">Requires human reply</div>
              </div>
            </div>

            {/* District Breakdown & Category Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-4">
                <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <span>{language === 'bn' ? 'শীর্ষ সক্রিয় জেলাসমূহ (Traffic by District)' : 'Top Active Districts (Traffic)'}</span>
                </h4>
                <div className="space-y-2.5 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-300 font-semibold mb-1">
                      <span>Dhaka (ঢাকা সদর ও মিরপুর)</span>
                      <span>44% (54,800)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '44%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 font-semibold mb-1">
                      <span>Chattogram (চট্টগ্রাম কোতোয়ালী)</span>
                      <span>23% (28,600)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full" style={{ width: '23%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 font-semibold mb-1">
                      <span>Sylhet (সিলেট সদর)</span>
                      <span>15% (18,680)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '15%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 font-semibold mb-1">
                      <span>Rajshahi & Bogura (বগুড়া ও রাজশাহী)</span>
                      <span>12% (14,950)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '12%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-4">
                <h4 className="text-sm font-bold text-slate-200">
                  {language === 'bn' ? 'জনপ্রিয় বিভাগসমূহ (Category Popularity)' : 'Popular Categories'}
                </h4>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-center justify-between">
                    <span>🔨 দিনমজুর ও কারিগর (Daily Labor & Workers)</span>
                    <strong className="text-emerald-400">38,400 hits</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-center justify-between">
                    <span>🩸 রক্তদাতা ও ব্লাড পুশ অ্যালার্ট (Blood Donors)</span>
                    <strong className="text-rose-400">29,150 hits</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-center justify-between">
                    <span>📚 শিক্ষা ও টিউশন ম্যাচমেকিং (Tuitions)</span>
                    <strong className="text-indigo-400">22,300 hits</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-center justify-between">
                    <span>👮 পুলিশ ওসি ও জরুরি ৯৯৯ (Police & Thana OC)</span>
                    <strong className="text-amber-400">18,200 hits</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* CSV / EXCEL DATA BACKUP & BUSINESS ANALYSIS HUB */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/80 p-6 rounded-2xl border border-emerald-500/30 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <span>{language === 'bn' ? 'CSV ও Excel ডেটা এক্সপোর্ট ও ব্যাকআপ হাব' : 'CSV & Excel Data Export & Backup Hub'}</span>
                      <span className="text-[10px] bg-emerald-900/80 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-700">
                        UTF-8 Unicode BOM
                      </span>
                    </h4>
                    <p className="text-xs text-slate-400">
                      Export all verified directory listings, daily labor contacts, tuition posts, and blood donors for Excel analysis or offline backups.
                    </p>
                  </div>
                </div>

                {exportSuccessMessage && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-900/90 text-emerald-200 border border-emerald-600 text-xs font-bold animate-in fade-in">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{exportSuccessMessage}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {/* 1. All Directory Listings */}
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-extrabold text-white text-xs sm:text-sm">
                        {language === 'bn' ? 'সকল ডিরেক্টরি তালিকা' : 'All Directory Listings'}
                      </span>
                      <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                        {directoryItems.length} Records
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Police stations, emergency hotlines, hospitals, bus counters, stores & utilities.
                    </p>
                  </div>
                  <button
                    onClick={() => triggerExportDirectoryCsv('all')}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'CSV এক্সপোর্ট (Excel)' : 'Export CSV (Excel)'}</span>
                  </button>
                </div>

                {/* 2. Daily Labor & Skilled Workers */}
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-extrabold text-white text-xs sm:text-sm">
                        {language === 'bn' ? 'দিনমজুর ও কারিগর' : 'Daily Labor & Workers'}
                      </span>
                      <span className="text-[10px] bg-amber-950 text-amber-400 px-1.5 py-0.5 rounded font-bold">
                        {directoryItems.filter((i) => i.category === 'labor').length} Workers
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Masons, carpenters, painters, electricians, plumbers & agro field laborers with daily rates.
                    </p>
                  </div>
                  <button
                    onClick={() => triggerExportDirectoryCsv('labor')}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'লেবার CSV ডাউনলোড' : 'Export Labor CSV'}</span>
                  </button>
                </div>

                {/* 3. Tuition Posts */}
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-extrabold text-white text-xs sm:text-sm">
                        {language === 'bn' ? 'টিউশন ম্যাচমেকিং' : 'Tuition Matching'}
                      </span>
                      <span className="text-[10px] bg-indigo-950 text-indigo-400 px-1.5 py-0.5 rounded font-bold">
                        {tuitionPosts.length} Posts
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Teachers offering tuitions and guardians requesting tutors with classes & subjects.
                    </p>
                  </div>
                  <button
                    onClick={triggerExportTuitionsCsv}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'টিউশন CSV ডাউনলোড' : 'Export Tuitions CSV'}</span>
                  </button>
                </div>

                {/* 4. Blood Donors & Full Backup */}
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 hover:border-rose-500/50 transition-all flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-extrabold text-white text-xs sm:text-sm">
                        {language === 'bn' ? 'রক্তদাতা ও ব্যাকআপ' : 'Blood Donors & Backup'}
                      </span>
                      <span className="text-[10px] bg-rose-950 text-rose-400 px-1.5 py-0.5 rounded font-bold">
                        {bloodDonors.length} Donors
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Registered blood donors across blood groups, or complete platform JSON archive.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={triggerExportBloodDonorsCsv}
                      className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] transition-colors"
                      title="Export Blood Donors CSV"
                    >
                      <Download className="w-3 h-3" />
                      <span>Blood CSV</span>
                    </button>
                    <button
                      onClick={triggerExportFullBackup}
                      className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-[11px] transition-colors"
                      title="Full Platform JSON Backup"
                    >
                      <Database className="w-3 h-3 text-emerald-400" />
                      <span>Full JSON</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FLUTTER CODE & PLAY STORE GUIDE HUB */}
        {activeTab === 'flutter' && <FlutterHub />}

        {/* TAB 3: POP-UP AD & MONETIZATION MANAGEMENT */}
        {activeTab === 'monetization' && (
          <div className="space-y-8">
            {/* 1. Modal Pop-up Banner Manager */}
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-700">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-amber-400" />
                    <span>{language === 'bn' ? 'পপ-আপ ব্যানার ও নোটিশ ম্যানেজার' : 'Pop-up Modal Banner Manager'}</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Full-screen/interstitial banner modal shown on app open with external target link & close button.
                  </p>
                </div>

                {/* Master ON/OFF Toggle */}
                <label className="flex items-center gap-2 cursor-pointer bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700 select-none">
                  <span className="text-xs font-bold text-slate-300">
                    {popupAd.enabled ? 'ACTIVE (চালু)' : 'DISABLED (বন্ধ)'}
                  </span>
                  <input
                    type="checkbox"
                    checked={popupAd.enabled}
                    onChange={(e) => updatePopupAd({ enabled: e.target.checked })}
                    className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-400"
                  />
                </label>
              </div>

              <form onSubmit={handleSavePopup} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {language === 'bn' ? 'বিজ্ঞাপন বা নোটিশ শিরোনাম' : 'Banner Title'}
                  </label>
                  <input
                    type="text"
                    value={popupTitle}
                    onChange={(e) => setPopupTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {language === 'bn' ? 'ব্যানার ইমেজ URL (ছবি লিংক)' : 'Banner Image URL'}
                  </label>
                  <input
                    type="url"
                    value={popupImage}
                    onChange={(e) => setPopupImage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {language === 'bn' ? 'ক্লিক করলে যে লিংকে যাবে (Target URL)' : 'Destination URL'}
                  </label>
                  <input
                    type="url"
                    value={popupTarget}
                    onChange={(e) => setPopupTarget(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {language === 'bn' ? 'অ্যাকশন বাটন টেক্সট (CTA)' : 'Button CTA Text'}
                  </label>
                  <input
                    type="text"
                    value={popupCta}
                    onChange={(e) => setPopupCta(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div className="md:col-span-2 pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-md"
                  >
                    {language === 'bn' ? 'পপ-আপ সেটিংস সেভ করুন' : 'Save Pop-up Changes'}
                  </button>
                </div>
              </form>
            </div>

            {/* 2. Google AdSense & AdMob Manager */}
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-700">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                    <span>Google AdSense & AdMob Integration Console</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Configure web banner units and mobile app ad slots dynamically.
                  </p>
                </div>

                <label className="flex items-center gap-2 cursor-pointer bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700 select-none">
                  <span className="text-xs font-bold text-slate-300">
                    {googleAds.adsenseEnabled ? 'ADSENSE ON' : 'ADSENSE OFF'}
                  </span>
                  <input
                    type="checkbox"
                    checked={googleAds.adsenseEnabled}
                    onChange={(e) => updateGoogleAds({ adsenseEnabled: e.target.checked })}
                    className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-400"
                  />
                </label>
              </div>

              <form onSubmit={handleSaveGoogle} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Google AdSense Publisher ID
                  </label>
                  <input
                    type="text"
                    value={pubId}
                    onChange={(e) => setPubId(e.target.value)}
                    placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Top Leaderboard Ad Slot (728x90)
                  </label>
                  <input
                    type="text"
                    value={topSlot}
                    onChange={(e) => setTopSlot(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    In-Feed Native Ad Slot
                  </label>
                  <input
                    type="text"
                    value={inFeedSlot}
                    onChange={(e) => setInFeedSlot(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    AdMob App ID (Android/iOS)
                  </label>
                  <input
                    type="text"
                    value={admobAppId}
                    onChange={(e) => setAdmobAppId(e.target.value)}
                    placeholder="ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    AdMob Banner Unit ID
                  </label>
                  <input
                    type="text"
                    value={admobBanner}
                    onChange={(e) => setAdmobBanner(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-md"
                  >
                    Save Google IDs
                  </button>
                </div>
              </form>
            </div>

            {/* 3. Custom Local Business Banner Manager */}
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>{language === 'bn' ? 'কাস্টম স্থানীয় বিজ্ঞাপন স্পন্সরশিপ' : 'Custom Local Banner Ad Manager'}</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Upload paid local business ads with expiration timer and impression metrics.
                  </p>
                </div>
              </div>

              {/* Form to add local banner */}
              <form onSubmit={handleAddBanner} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs bg-slate-900/80 p-4 rounded-xl border border-slate-700">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Sponsor / Business Name</label>
                  <input
                    type="text"
                    required
                    value={sponsorName}
                    onChange={(e) => setSponsorName(e.target.value)}
                    placeholder="e.g. Bengal Agro Mart"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Banner Image URL</label>
                  <input
                    type="url"
                    required
                    value={bannerImg}
                    onChange={(e) => setBannerImg(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target Website / Page</label>
                  <input
                    type="url"
                    value={bannerUrl}
                    onChange={(e) => setBannerUrl(e.target.value)}
                    placeholder="https://facebook.com/..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors"
                  >
                    + Add Local Banner
                  </button>
                </div>
              </form>

              {/* List of active local banners */}
              <div className="space-y-2">
                {localBanners.map((b) => (
                  <div
                    key={b.id}
                    className="bg-slate-900 p-3 rounded-xl border border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img src={b.imageUrl} alt={b.sponsorName} className="w-16 h-10 object-cover rounded-md" />
                      <div>
                        <div className="font-bold text-white">{b.sponsorName}</div>
                        <div className="text-[11px] text-slate-400">
                          {b.clicks} clicks • {b.impressions} impressions • Placement: {b.placement}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleLocalBanner(b.id)}
                        className={`px-3 py-1 rounded-lg font-bold text-[11px] ${
                          b.active ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {b.active ? 'Active' : 'Paused'}
                      </button>
                      <button
                        onClick={() => deleteLocalBanner(b.id)}
                        className="p-1.5 rounded-lg bg-rose-900/30 text-rose-400 hover:bg-rose-900/60"
                        title="Delete banner"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FULL CONTENT CONTROL & MODERATION */}
        {activeTab === 'moderation' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-emerald-400" />
                  <span>{language === 'bn' ? 'সরাসরি পোস্ট ও ডিরেক্টরি মডারেশন' : '1-Click Content Moderation Console'}</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Instantly approve, flag, or remove any public post or directory entry, and export clean CSV/Excel files.
                </p>
              </div>

              {/* Top Export Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => triggerExportDirectoryCsv()}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-950 transition-all"
                  title="Export currently filtered listings to Microsoft Excel / CSV format"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
                  <span>{language === 'bn' ? 'এক্সেল / CSV এক্সপোর্ট' : 'Export to CSV (Excel)'}</span>
                </button>

                <button
                  onClick={triggerExportTuitionsCsv}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 font-bold text-xs transition-colors"
                  title="Export Tuition Matchmaking posts to CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'টিউশন CSV' : 'Tuitions CSV'}</span>
                </button>

                <button
                  onClick={triggerExportBloodDonorsCsv}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/40 font-bold text-xs transition-colors"
                  title="Export Blood Donors to CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'রক্তদাতা CSV' : 'Blood CSV'}</span>
                </button>

                <button
                  onClick={triggerExportFullBackup}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-bold text-xs transition-colors"
                  title="Export Complete Full Platform Backup JSON"
                >
                  <Database className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'bn' ? 'ফুল ব্যাকআপ JSON' : 'Full Backup JSON'}</span>
                </button>
              </div>
            </div>

            {/* Export Success Notification */}
            {exportSuccessMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs font-bold flex items-center justify-between shadow-md animate-in fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{exportSuccessMessage}</span>
                </div>
                <span className="text-[10px] bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded font-mono">
                  UTF-8 BOM Ready
                </span>
              </div>
            )}

            {/* Filter and Search Bar for Moderation & Export Selection */}
            <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  {language === 'bn' ? 'ক্যাটেগরি অনুযায়ী ফিল্টার:' : 'Filter by Category:'}
                </label>
                <select
                  value={exportCategory}
                  onChange={(e) => setExportCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Categories ({directoryItems.length})</option>
                  <option value="labor">Daily Labor & Skilled Workers (দিনমজুর)</option>
                  <option value="police">Police & Security (পুলিশ ও ওসি)</option>
                  <option value="emergency">Emergency & Govt (জরুরি দপ্তর)</option>
                  <option value="transport">Transport & Bus Counters (পরিবহন)</option>
                  <option value="health">Medical & Hospitals (স্বাস্থ্য)</option>
                  <option value="shopping">Shopping & Banking (দোকান ও ব্যাংক)</option>
                  <option value="agriculture">Agriculture Support (কৃষি)</option>
                  <option value="utilities">Utilities & Hotlines (বিদ্যুৎ ও ওয়াসা)</option>
                  <option value="legal">Legal Aid & Lawyers (আইনি সহায়তা)</option>
                  <option value="events">Local Events & Notices (ইভেন্ট)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  {language === 'bn' ? 'স্ট্যাটাস অনুযায়ী ফিল্টার:' : 'Filter by Status:'}
                </label>
                <select
                  value={exportStatus}
                  onChange={(e) => setExportStatus(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Statuses (Active, Verified & Flagged)</option>
                  <option value="verified">Verified Only</option>
                  <option value="active">Active (Unverified)</option>
                  <option value="flagged">Flagged Only</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  {language === 'bn' ? 'তালিকায় সার্চ করুন:' : 'Search Listings:'}
                </label>
                <input
                  type="text"
                  value={tableSearchQuery}
                  onChange={(e) => setTableSearchQuery(e.target.value)}
                  placeholder="Search title, phone, or location..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Listings table */}
            <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 overflow-hidden text-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-700">
                    <tr>
                      <th className="p-3">Title & Category</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Admin Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60 font-medium">
                    {directoryItems
                      .filter((item) => {
                        if (exportCategory !== 'all' && item.category !== exportCategory) return false;
                        if (exportStatus !== 'all') {
                          if (exportStatus === 'verified' && !item.verified) return false;
                          if (exportStatus !== 'verified' && item.status !== exportStatus) return false;
                        }
                        if (tableSearchQuery.trim()) {
                          const q = tableSearchQuery.toLowerCase();
                          const matchTitle = item.title.toLowerCase().includes(q) || item.titleBn?.toLowerCase().includes(q);
                          const matchSub = item.subcategory.toLowerCase().includes(q) || item.subcategoryBn?.toLowerCase().includes(q);
                          const matchPhone = item.phone.includes(q);
                          const matchLoc = item.district.toLowerCase().includes(q) || item.upazila.toLowerCase().includes(q);
                          if (!matchTitle && !matchSub && !matchPhone && !matchLoc) return false;
                        }
                        return true;
                      })
                      .map((item) => (
                      <tr key={item.id} className="hover:bg-slate-750">
                        <td className="p-3">
                          <div className="font-bold text-white">{item.title}</div>
                          <div className="text-[11px] text-emerald-400">{item.subcategory}</div>
                        </td>
                        <td className="p-3 text-slate-400">
                          {item.upazila}, {item.district}
                        </td>
                        <td className="p-3 text-slate-300 font-mono">{item.phone}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.status === 'flagged'
                                ? 'bg-rose-900/60 text-rose-300 border border-rose-700'
                                : item.verified
                                ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                                : 'bg-slate-700 text-slate-300'
                            }`}
                          >
                            {item.status === 'flagged' ? 'FLAGGED' : item.verified ? 'VERIFIED' : 'ACTIVE'}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => verifyDirectoryItem(item.id)}
                              className="p-1.5 rounded-lg bg-emerald-900/40 hover:bg-emerald-900/80 text-emerald-300"
                              title="Mark Verified"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => flagDirectoryItem(item.id)}
                              className="p-1.5 rounded-lg bg-amber-900/40 hover:bg-amber-900/80 text-amber-300"
                              title="Flag / Unflag Post"
                            >
                              <Flag className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteDirectoryItem(item.id)}
                              className="p-1.5 rounded-lg bg-rose-900/40 hover:bg-rose-900/80 text-rose-300"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: LIVE CHAT & AGENT HANDOVER DASHBOARD */}
        {activeTab === 'handover' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left list of handover sessions */}
            <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-4 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center justify-between pb-2 border-b border-slate-700">
                <span className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-rose-400" />
                  <span>Incoming Live User Handover</span>
                </span>
                <span className="text-[10px] bg-rose-900 text-rose-200 px-2 py-0.5 rounded-full font-bold">
                  {chatSessions.length} Active
                </span>
              </h4>

              <div className="space-y-2 max-h-[500px] overflow-y-auto text-xs">
                {chatSessions.map((s) => (
                  <div
                    key={s.sessionId}
                    onClick={() => setSelectedChatSessionId(s.sessionId)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      activeChat?.sessionId === s.sessionId
                        ? 'border-emerald-500 bg-slate-900 text-white'
                        : 'border-slate-700 bg-slate-850 hover:bg-slate-900 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-white">{s.userName}</strong>
                      <span className="text-[10px] text-amber-400 font-semibold uppercase">
                        {s.status === 'handover_requested' ? 'Waiting' : 'Connected'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">
                      {s.messages[s.messages.length - 1]?.text || 'No message'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right two-way messaging window with the user */}
            <div className="lg:col-span-2 bg-slate-800/80 rounded-2xl border border-slate-700/80 flex flex-col h-[550px] overflow-hidden">
              {/* Header */}
              <div className="p-4 bg-slate-900 border-b border-slate-700 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Chatting with {activeChat?.userName || 'User'}</span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full">
                      Live Two-Way Sync
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Session ID: {activeChat?.sessionId || 'None'}
                  </p>
                </div>
                <div className="text-xs text-emerald-400 font-bold">
                  Agent: Md kanchon Hossen
                </div>
              </div>

              {/* Message History */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950 text-xs">
                {activeChat?.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                        m.sender === 'agent'
                          ? 'bg-rose-600 text-white rounded-br-none'
                          : m.sender === 'user'
                          ? 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                          : 'bg-emerald-900/60 text-emerald-200 border border-emerald-800 rounded-bl-none'
                      }`}
                    >
                      <div className="text-[9px] font-bold uppercase opacity-75 mb-0.5">
                        {m.sender === 'agent' ? 'Md kanchon Hossen (You)' : m.sender === 'bot' ? 'Gemini AI' : 'User'}
                      </div>
                      <p className="whitespace-pre-line">{m.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Input Form */}
              <form onSubmit={handleSendAdminReply} className="p-3 bg-slate-900 border-t border-slate-700 flex items-center gap-2">
                <input
                  type="text"
                  value={adminReplyText}
                  onChange={(e) => setAdminReplyText(e.target.value)}
                  placeholder={language === 'bn' ? 'ব্যবহারকারীকে সরাসরি লাইভ উত্তর লিখুন...' : 'Reply live to user as Support Agent...'}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <button
                  type="submit"
                  disabled={!adminReplyText.trim()}
                  className="p-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 6: FREE DOMAIN & CUSTOM URL HUB */}
        {activeTab === 'domains' && (
          <div className="space-y-6">
            {/* Top Banner */}
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 p-6 rounded-3xl border border-blue-500/30 text-white space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-bold border border-blue-400/30">
                <Globe className="w-3.5 h-3.5" />
                <span>100% Free Custom Domain & URL Redirection Guide</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black">
                {language === 'bn' ? 'কীভাবে ফ্রি ডোমেন (Free Domain) যুক্ত করবেন?' : 'How to Connect a Free Domain & Easy Custom URL'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                {language === 'bn'
                  ? 'Cloud Run এর লম্বা লিংকের পরিবর্তে সহজেই আপনার ভিজিটরদের জন্য একটি সহজ ও সুন্দর ফ্রি ডোমেন ব্যবহার করতে পারেন। নিচে ৪টি সম্পূর্ণ ফ্রি উপায় দেওয়া হলো:'
                  : 'Instead of sharing long Cloud Run URLs, you can connect memorable free domains or branded short links at zero cost. Here are the 4 recommended free methods:'}
              </p>

              {/* Current Working URL Box */}
              <div className="pt-2">
                <div className="bg-slate-950/90 border border-slate-700 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block text-[11px] mb-0.5">
                      {language === 'bn' ? 'আপনার বর্তমান লাইভ ক্লাউড রান লিংক:' : 'Your Official Live Cloud Run URL:'}
                    </span>
                    <span className="font-mono text-emerald-400 font-bold text-xs sm:text-sm break-all">
                      https://ais-pre-hf7agb2se74pg6hmo3ausk-569758607576.asia-southeast1.run.app
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('https://ais-pre-hf7agb2se74pg6hmo3ausk-569758607576.asia-southeast1.run.app');
                        alert(language === 'bn' ? 'লাইভ লিংক ক্লিপবোর্ডে কপি হয়েছে!' : 'Live link copied to clipboard!');
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'লিংক কপি করুন' : 'Copy URL'}</span>
                    </button>
                    <a
                      href="https://ais-pre-hf7agb2se74pg6hmo3ausk-569758607576.asia-southeast1.run.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-md"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'ব্রাউজারে খুলুন' : 'Open Live'}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 FREE DOMAIN METHODS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-slate-300">
              {/* Method 1: Free Branded Short Link */}
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                      Method 1 • Instant (30 Seconds)
                    </span>
                    <span className="text-emerald-400 font-bold">100% Free Forever</span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    {language === 'bn' ? 'ফ্রি শর্ট কাস্টম ডোমেন (যেমন: tinyurl.com/allinonebangladesh)' : 'Free Branded Short Alias (e.g. tinyurl.com/allinonebangladesh)'}
                  </h4>
                  <p className="text-slate-400 leading-relaxed">
                    {language === 'bn'
                      ? 'কোনো কোডিং বা ডিএনএস সেটআপ ছাড়াই ৩০ সেকেন্ডে তৈরি করুন একটি আকর্ষণীয় কাস্টম শর্ট লিংক যা সরাসরি আপনার এই পোর্টালে নিয়ে যাবে।'
                      : 'Create a branded alias instantly without any DNS or domain registration hassle.'}
                  </p>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-700 font-mono text-[11px] text-amber-300">
                    https://tinyurl.com/2366tv9n
                    <br />
                    <span className="text-emerald-400 font-bold text-[10px]">✓ Active Live Free Short Link (1-Click Open)</span>
                  </div>
                </div>

                <a
                  href="https://tinyurl.com/2366tv9n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold transition-all shadow-md"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'ফ্রি লিংকে সরাসরি প্রবেশ করুন' : 'Open Free Short URL'}</span>
                </a>
              </div>

              {/* Method 2: Free Firebase Hosting .web.app domain */}
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
                      Method 2 • Official Google
                    </span>
                    <span className="text-emerald-400 font-bold">Free .web.app Domain</span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Firebase Hosting (allinonebangladesh.web.app)
                  </h4>
                  <p className="text-slate-400 leading-relaxed">
                    {language === 'bn'
                      ? 'ফায়ারবেস হোস্টিং এর মাধ্যমে সম্পূর্ণ বিনামূল্যে .web.app ডোমেন পাওয়া যায়। আপনার জন্য ইতিমধ্যে firebase.json কনফিগার ফাইল তৈরি করা হয়েছে।'
                      : 'Firebase Hosting gives you a free Google-secured *.web.app domain with automated HTTPS SSL.'}
                  </p>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-700 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                    firebase deploy --only hosting
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-[11px] text-slate-300">
                  ✅ <span className="font-semibold text-white">firebase.json</span> is already created in your project!
                </div>
              </div>

              {/* Method 3: Free Vercel Subdomain */}
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded border border-teal-500/30">
                      Method 3 • Vercel Proxy
                    </span>
                    <span className="text-emerald-400 font-bold">Free .vercel.app Domain</span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Vercel Edge (allinonebangladesh.vercel.app)
                  </h4>
                  <p className="text-slate-400 leading-relaxed">
                    {language === 'bn'
                      ? 'Vercel এ একটি ফ্রি অ্যাকাউন্ট খুলে vercel.json ফাইলের মাধ্যমে আপনার ক্লাউড রান অ্যাপের রিভার্স প্রক্সি তৈরি করতে পারবেন।'
                      : 'Deploy your repository to Vercel to get a clean allinonebangladesh.vercel.app domain.'}
                  </p>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-700 font-mono text-[11px] text-teal-300 overflow-x-auto">
                    vercel.json configured with Cloud Run rewrites
                  </div>
                </div>

                <a
                  href="https://vercel.com/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-750 text-white font-bold border border-slate-700 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
                  <span>Open Vercel New Project</span>
                </a>
              </div>

              {/* Method 4: Free DNS Providers (DuckDNS / FreeDNS) */}
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30">
                      Method 4 • DuckDNS
                    </span>
                    <span className="text-emerald-400 font-bold">Free DuckDNS Subdomain</span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    DuckDNS (allinonebd.duckdns.org)
                  </h4>
                  <p className="text-slate-400 leading-relaxed">
                    {language === 'bn'
                      ? 'DuckDNS.org হলো একটি সম্পূর্ণ ফ্রি ডোমেন প্রোভাইডার। এখানে লগইন করে ফ্রিতে duckdns.org সাবডোমেন তৈরি করা যায়।'
                      : 'DuckDNS offers free *.duckdns.org subdomains with zero renewal fees.'}
                  </p>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-700 font-mono text-[11px] text-rose-300">
                    https://allinonebd.duckdns.org
                  </div>
                </div>

                <a
                  href="https://www.duckdns.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-750 text-white font-bold border border-slate-700 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
                  <span>Visit DuckDNS.org</span>
                </a>
              </div>
            </div>

            {/* Step-by-Step Custom .com Mapping Guide */}
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-700">
                <Globe className="w-5 h-5 text-emerald-400" />
                <h4 className="text-base font-bold text-white">
                  {language === 'bn' ? 'প্রফেশনাল .com বা .com.bd ডোমেন যুক্ত করার নিয়ম (Custom Domain Guide)' : 'Adding a Custom .com or .bd Domain (Google Cloud Run)'}
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 space-y-1">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">1</span>
                    <span>Domain Registration</span>
                  </div>
                  <p className="text-slate-400">
                    Purchase <code>allinonebangladesh.com</code> from Namecheap, Cloudflare, or BTCL (.bd).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 space-y-1">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">2</span>
                    <span>Google Cloud Run Mapping</span>
                  </div>
                  <p className="text-slate-400">
                    In Google Cloud Console → Cloud Run → "Manage Custom Domains" → Add Domain mapping.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 space-y-1">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">3</span>
                    <span>DNS CNAME Record</span>
                  </div>
                  <p className="text-slate-400">
                    Add CNAME record pointing to <code>ghs.googlehosted.com</code> with automated SSL certificate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
