import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  DomainMode,
  CategoryId,
  DirectoryItem,
  TuitionPost,
  BloodDonor,
  JobCircular,
  PopUpAdConfig,
  GoogleAdConfig,
  LocalBannerAd,
  ContributorLeaderboardItem,
  UserProfile,
  LiveChatSession,
} from '../types';
import {
  INITIAL_DIRECTORY_ITEMS,
  INITIAL_TUITION_POSTS,
  INITIAL_BLOOD_DONORS,
  INITIAL_JOBS,
  INITIAL_CONTRIBUTORS,
  INITIAL_USER,
  INITIAL_POPUP_AD,
  INITIAL_GOOGLE_ADS,
  INITIAL_LOCAL_BANNERS,
} from '../data/bangladeshData';
import { TRANSLATIONS } from '../translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  domainMode: DomainMode;
  setDomainMode: (mode: DomainMode) => void;
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  
  // Filters
  selectedDivision: string;
  setSelectedDivision: (div: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (dis: string) => void;
  selectedUpazila: string;
  setSelectedUpazila: (upz: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: CategoryId | 'all';
  setActiveCategory: (cat: CategoryId | 'all') => void;

  // Data
  directoryItems: DirectoryItem[];
  tuitionPosts: TuitionPost[];
  bloodDonors: BloodDonor[];
  jobs: JobCircular[];
  contributors: ContributorLeaderboardItem[];
  currentUser: UserProfile;

  // Content actions
  addDirectoryItem: (item: DirectoryItem) => void;
  deleteDirectoryItem: (id: string) => void;
  verifyDirectoryItem: (id: string) => void;
  flagDirectoryItem: (id: string) => void;

  addTuitionPost: (post: TuitionPost) => void;
  deleteTuitionPost: (id: string) => void;

  addBloodDonor: (donor: BloodDonor) => void;
  deleteBloodDonor: (id: string) => void;

  // Ads
  popupAd: PopUpAdConfig;
  updatePopupAd: (cfg: Partial<PopUpAdConfig>) => void;
  googleAds: GoogleAdConfig;
  updateGoogleAds: (cfg: Partial<GoogleAdConfig>) => void;
  localBanners: LocalBannerAd[];
  toggleLocalBanner: (id: string) => void;
  deleteLocalBanner: (id: string) => void;
  addLocalBanner: (banner: LocalBannerAd) => void;

  // Modals & view
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  isDevProfileOpen: boolean;
  setIsDevProfileOpen: (val: boolean) => void;
  isSelfPostModalOpen: boolean;
  setIsSelfPostModalOpen: (val: boolean) => void;
  isBloodAlertModalOpen: boolean;
  setIsBloodAlertModalOpen: (val: boolean) => void;

  // Chat & Handover
  chatSessions: LiveChatSession[];
  adminReplyToSession: (sessionId: string, text: string) => void;
  triggerNewHandoverNotice: (sessionId: string) => void;
  handoverUnreadCount: number;

  t: typeof TRANSLATIONS.bn;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Localization: Auto-detect device or default to Bangla
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('aio_bd_lang');
    if (saved === 'en' || saved === 'bn') return saved;
    // Auto-detect browser language
    return navigator.language.startsWith('bn') ? 'bn' : 'bn';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('aio_bd_lang', lang);
  };

  // Domain Mode: Public website or Admin portal (with automatic URL detection)
  const [domainMode, setDomainModeState] = useState<DomainMode>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const host = window.location.hostname.toLowerCase();
      if (
        path.includes('/admin') ||
        search.includes('admin') ||
        hash.includes('admin') ||
        host.startsWith('admin.')
      ) {
        return 'admin';
      }
    }
    return 'public';
  });

  const setDomainMode = (mode: DomainMode) => {
    setDomainModeState(mode);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (mode === 'admin') {
        url.searchParams.set('mode', 'admin');
      } else {
        url.searchParams.delete('mode');
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  useEffect(() => {
    const handleUrlChange = () => {
      if (typeof window === 'undefined') return;
      const search = window.location.search.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('/admin') || search.includes('admin') || hash.includes('admin')) {
        setDomainModeState('admin');
      } else {
        setDomainModeState('public');
      }
    };
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  // Master Password Authentication
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('aio_bd_admin_token') === 'AUTH_OK_Dexdark342156';
  });

  const loginAdmin = (password: string): boolean => {
    if (password === 'Dexdark342156') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('aio_bd_admin_token', 'AUTH_OK_Dexdark342156');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('aio_bd_admin_token');
  };

  // Filters
  const [selectedDivision, setSelectedDivision] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');

  // App Data with local storage persistence
  const [directoryItems, setDirectoryItems] = useState<DirectoryItem[]>(() => {
    const saved = localStorage.getItem('aio_bd_items');
    return saved ? JSON.parse(saved) : INITIAL_DIRECTORY_ITEMS;
  });

  const [tuitionPosts, setTuitionPosts] = useState<TuitionPost[]>(() => {
    const saved = localStorage.getItem('aio_bd_tuitions');
    return saved ? JSON.parse(saved) : INITIAL_TUITION_POSTS;
  });

  const [bloodDonors, setBloodDonors] = useState<BloodDonor[]>(() => {
    const saved = localStorage.getItem('aio_bd_donors');
    return saved ? JSON.parse(saved) : INITIAL_BLOOD_DONORS;
  });

  const [jobs, setJobs] = useState<JobCircular[]>(INITIAL_JOBS);
  const [contributors, setContributors] = useState<ContributorLeaderboardItem[]>(INITIAL_CONTRIBUTORS);
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USER);

  // Sync back to local storage
  useEffect(() => {
    localStorage.setItem('aio_bd_items', JSON.stringify(directoryItems));
  }, [directoryItems]);

  useEffect(() => {
    localStorage.setItem('aio_bd_tuitions', JSON.stringify(tuitionPosts));
  }, [tuitionPosts]);

  useEffect(() => {
    localStorage.setItem('aio_bd_donors', JSON.stringify(bloodDonors));
  }, [bloodDonors]);

  // Ads
  const [popupAd, setPopupAd] = useState<PopUpAdConfig>(() => {
    const saved = localStorage.getItem('aio_bd_popup_ad');
    return saved ? JSON.parse(saved) : INITIAL_POPUP_AD;
  });

  const [googleAds, setGoogleAds] = useState<GoogleAdConfig>(() => {
    const saved = localStorage.getItem('aio_bd_google_ads');
    return saved ? JSON.parse(saved) : INITIAL_GOOGLE_ADS;
  });

  const [localBanners, setLocalBanners] = useState<LocalBannerAd[]>(() => {
    const saved = localStorage.getItem('aio_bd_banners');
    return saved ? JSON.parse(saved) : INITIAL_LOCAL_BANNERS;
  });

  const updatePopupAd = (cfg: Partial<PopUpAdConfig>) => {
    setPopupAd((prev) => {
      const next = { ...prev, ...cfg };
      localStorage.setItem('aio_bd_popup_ad', JSON.stringify(next));
      return next;
    });
  };

  const updateGoogleAds = (cfg: Partial<GoogleAdConfig>) => {
    setGoogleAds((prev) => {
      const next = { ...prev, ...cfg };
      localStorage.setItem('aio_bd_google_ads', JSON.stringify(next));
      return next;
    });
  };

  const toggleLocalBanner = (id: string) => {
    setLocalBanners((prev) => {
      const next = prev.map((b) => (b.id === id ? { ...b, active: !b.active } : b));
      localStorage.setItem('aio_bd_banners', JSON.stringify(next));
      return next;
    });
  };

  const deleteLocalBanner = (id: string) => {
    setLocalBanners((prev) => {
      const next = prev.filter((b) => b.id !== id);
      localStorage.setItem('aio_bd_banners', JSON.stringify(next));
      return next;
    });
  };

  const addLocalBanner = (banner: LocalBannerAd) => {
    setLocalBanners((prev) => {
      const next = [banner, ...prev];
      localStorage.setItem('aio_bd_banners', JSON.stringify(next));
      return next;
    });
  };

  // Modals and display
  const [isMobileFrame, setIsMobileFrame] = useState(false);
  const [isDevProfileOpen, setIsDevProfileOpen] = useState(false);
  const [isSelfPostModalOpen, setIsSelfPostModalOpen] = useState(false);
  const [isBloodAlertModalOpen, setIsBloodAlertModalOpen] = useState(false);

  // Content moderation handlers
  const addDirectoryItem = (item: DirectoryItem) => {
    setDirectoryItems((prev) => [item, ...prev]);
    // Boost user contribution points
    setCurrentUser((prev) => ({
      ...prev,
      points: prev.points + 50,
      contributionsCount: prev.contributionsCount + 1,
    }));
  };

  const deleteDirectoryItem = (id: string) => {
    setDirectoryItems((prev) => prev.filter((i) => i.id !== id));
  };

  const verifyDirectoryItem = (id: string) => {
    setDirectoryItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, verified: true, status: 'active' } : i))
    );
  };

  const flagDirectoryItem = (id: string) => {
    setDirectoryItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: i.status === 'flagged' ? 'active' : 'flagged' } : i))
    );
  };

  const addTuitionPost = (post: TuitionPost) => {
    setTuitionPosts((prev) => [post, ...prev]);
    setCurrentUser((prev) => ({
      ...prev,
      points: prev.points + 30,
      contributionsCount: prev.contributionsCount + 1,
    }));
  };

  const deleteTuitionPost = (id: string) => {
    setTuitionPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const addBloodDonor = (donor: BloodDonor) => {
    setBloodDonors((prev) => [donor, ...prev]);
    setCurrentUser((prev) => ({
      ...prev,
      points: prev.points + 100,
      contributionsCount: prev.contributionsCount + 1,
    }));
  };

  const deleteBloodDonor = (id: string) => {
    setBloodDonors((prev) => prev.filter((d) => d.id !== id));
  };

  // Live Chat Sessions for Handover
  const [chatSessions, setChatSessions] = useState<LiveChatSession[]>([
    {
      sessionId: 'session_init_01',
      userName: 'Md. Kamrul (Mirpur-10)',
      userPhone: '01719882233',
      language: 'bn',
      status: 'handover_requested',
      messages: [
        {
          id: 'm1',
          sender: 'user',
          text: 'মিরপুর এলাকায় কি আজ কোনো ফ্রি মেডিকেল ক্যাম্প চলছে? জরুরি ডাক্তার দেখাতে হবে।',
          timestamp: Date.now() - 3600000,
        },
        {
          id: 'm2',
          sender: 'bot',
          text: 'দুঃখিত, আপনার প্রশ্নটি আমি পুরোপুরি বুঝতে পারছি না। আপনার সুবিধার্থে একজন এজেন্টের সাথে সংযুক্ত করা হচ্ছে, অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন।',
          timestamp: Date.now() - 3500000,
        },
      ],
      updatedAt: Date.now() - 3500000,
    },
  ]);

  const [handoverUnreadCount, setHandoverUnreadCount] = useState(1);

  const triggerNewHandoverNotice = (sessionId: string) => {
    setHandoverUnreadCount((c) => c + 1);
  };

  const adminReplyToSession = (sessionId: string, text: string) => {
    setChatSessions((prev) =>
      prev.map((s) => {
        if (s.sessionId === sessionId) {
          return {
            ...s,
            status: 'agent_connected',
            updatedAt: Date.now(),
            messages: [
              ...s.messages,
              {
                id: `msg_agent_${Date.now()}`,
                sender: 'agent',
                text,
                timestamp: Date.now(),
              },
            ],
          };
        }
        return s;
      })
    );

    // Call backend API if possible
    fetch('/api/admin/reply-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, text }),
    }).catch((err) => console.log('Backend sync note:', err));
  };

  const t = TRANSLATIONS[language];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        domainMode,
        setDomainMode,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        selectedDivision,
        setSelectedDivision,
        selectedDistrict,
        setSelectedDistrict,
        selectedUpazila,
        setSelectedUpazila,
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        directoryItems,
        tuitionPosts,
        bloodDonors,
        jobs,
        contributors,
        currentUser,
        addDirectoryItem,
        deleteDirectoryItem,
        verifyDirectoryItem,
        flagDirectoryItem,
        addTuitionPost,
        deleteTuitionPost,
        addBloodDonor,
        deleteBloodDonor,
        popupAd,
        updatePopupAd,
        googleAds,
        updateGoogleAds,
        localBanners,
        toggleLocalBanner,
        deleteLocalBanner,
        addLocalBanner,
        isMobileFrame,
        setIsMobileFrame,
        isDevProfileOpen,
        setIsDevProfileOpen,
        isSelfPostModalOpen,
        setIsSelfPostModalOpen,
        isBloodAlertModalOpen,
        setIsBloodAlertModalOpen,
        chatSessions,
        adminReplyToSession,
        triggerNewHandoverNotice,
        handoverUnreadCount,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
