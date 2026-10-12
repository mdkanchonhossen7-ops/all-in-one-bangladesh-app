export type Language = 'bn' | 'en';

export type DomainMode = 'public' | 'admin';

export type CategoryId =
  | 'police'
  | 'emergency'
  | 'transport'
  | 'health'
  | 'shopping'
  | 'labor'
  | 'education'
  | 'jobs'
  | 'agriculture'
  | 'utilities'
  | 'legal'
  | 'events';

export interface LocationHierarchy {
  division: string;
  district: string;
  upazila: string;
  union?: string;
  ward?: string;
}

export interface DirectoryItem {
  id: string;
  title: string;
  titleBn: string;
  category: CategoryId;
  subcategory: string;
  subcategoryBn: string;
  division: string;
  district: string;
  upazila: string;
  address: string;
  addressBn: string;
  phone: string;
  whatsapp?: string;
  mapUrl?: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  description?: string;
  descriptionBn?: string;
  imageUrl?: string;
  dailyRate?: string;
  dailyRateBn?: string;
  badge?: string;
  badgeBn?: string;
  isSelfPost?: boolean;
  status: 'active' | 'flagged' | 'pending';
  createdAt: string;
}

export interface TuitionPost {
  id: string;
  type: 'teacher_available' | 'tutor_needed';
  name: string;
  phone: string;
  whatsapp?: string;
  division: string;
  district: string;
  upazila: string;
  classes: string[];
  subjects: string[];
  medium: 'Bangla' | 'English' | 'Both' | 'Madrasa';
  salary: string;
  institute?: string;
  nidVerified?: boolean;
  gender?: string;
  status: 'active' | 'flagged';
  createdAt: string;
}

export interface BloodDonor {
  id: string;
  name: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  phone: string;
  whatsapp?: string;
  division: string;
  district: string;
  upazila: string;
  lastDonationDate?: string;
  isAvailable: boolean;
  donationCount: number;
  verified: boolean;
  createdAt: string;
}

export interface JobCircular {
  id: string;
  title: string;
  titleBn: string;
  organization: string;
  organizationBn: string;
  type: 'govt' | 'private';
  vacancies: string;
  salary: string;
  deadline: string;
  location: string;
  summary: string;
  summaryBn: string;
  applyUrl: string;
  isAiScraped: boolean;
  createdAt: string;
}

export interface PopUpAdConfig {
  enabled: boolean;
  title: string;
  titleBn: string;
  imageUrl: string;
  targetUrl: string;
  ctaText: string;
  ctaTextBn: string;
  showOnFirstVisit: boolean;
  frequencyMinutes: number;
  delaySeconds: number;
}

export interface GoogleAdConfig {
  adsenseEnabled: boolean;
  publisherId: string;
  topBannerSlot: string;
  bottomBannerSlot: string;
  inFeedSlot: string;
  admobAppId: string;
  admobBannerId: string;
  admobInterstitialId: string;
  showInFeedEveryN: number;
}

export interface LocalBannerAd {
  id: string;
  sponsorName: string;
  imageUrl: string;
  targetUrl: string;
  placement: 'top' | 'feed' | 'sidebar' | 'footer';
  startDate: string;
  endDate: string;
  clicks: number;
  impressions: number;
  active: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatarUrl?: string;
  division: string;
  district: string;
  points: number;
  badge: 'Citizen' | 'Top Contributor' | 'Community Hero' | 'Life Saver';
  contributionsCount: number;
  verified: boolean;
  joinedDate: string;
}

export interface ContributorLeaderboardItem {
  id: string;
  name: string;
  avatarUrl: string;
  location: string;
  points: number;
  contributions: number;
  badge: string;
  badgeBn: string;
  rank: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'agent';
  text: string;
  timestamp: number;
}

export interface LiveChatSession {
  sessionId: string;
  userName: string;
  userPhone?: string;
  language: Language;
  status: 'ai' | 'handover_requested' | 'agent_connected' | 'closed';
  messages: ChatMessage[];
  updatedAt: number;
}

export interface VisitorAnalytics {
  dailyVisitors: number;
  dailyAppUsers: number;
  totalListings: number;
  totalDonors: number;
  totalSelfPosts: number;
  activeHandoverChats: number;
  topDistricts: { name: string; visits: number }[];
  categoryHits: { category: string; count: number }[];
}
