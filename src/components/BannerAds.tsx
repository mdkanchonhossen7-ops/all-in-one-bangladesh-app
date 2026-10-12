import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

interface BannerAdProps {
  placement: 'top' | 'feed' | 'bottom';
}

export const BannerAds: React.FC<BannerAdProps> = ({ placement }) => {
  const { googleAds, localBanners, language } = useApp();

  // Find active local banner for this placement
  const activeLocalBanner = localBanners.find(
    (b) => b.active && (b.placement === placement || (placement === 'bottom' && b.placement === 'sidebar'))
  );

  // If local banner is available, render local sponsored banner
  if (activeLocalBanner) {
    return (
      <div className="w-full my-4 overflow-hidden rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 shadow-sm">
        <div className="px-3 py-1 bg-amber-100/80 border-b border-amber-200 text-[10px] font-bold text-amber-900 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            {language === 'bn' ? 'স্পন্সরড স্থানীয় বিজ্ঞাপন' : 'SPONSORED LOCAL BANNER'}
          </span>
          <span>{activeLocalBanner.sponsorName}</span>
        </div>
        <a
          href={activeLocalBanner.targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative group overflow-hidden max-h-36 sm:max-h-44"
        >
          <img
            src={activeLocalBanner.imageUrl}
            alt={activeLocalBanner.sponsorName}
            className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-300"
          />
          <div className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 shadow">
            <span>{language === 'bn' ? 'বিজ্ঞাপন দেখুন' : 'Visit'}</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </div>
        </a>
      </div>
    );
  }

  // Otherwise, if Google AdSense is enabled, render AdSense banner slot
  if (googleAds.adsenseEnabled) {
    return (
      <div className="w-full my-3 p-3 rounded-xl border border-dashed border-slate-300 bg-slate-100/90 text-center font-mono text-xs text-slate-500 shadow-inner">
        <div className="flex items-center justify-center gap-2 mb-1 text-[11px] font-semibold text-slate-600">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
          <span>Google AdSense Slot ({placement === 'top' ? '728x90 Leaderboard' : placement === 'feed' ? 'Responsive In-Feed' : '320x50 Banner'})</span>
        </div>
        <div className="text-[10px] text-slate-400">
          Pub-ID: <span className="font-semibold text-slate-600">{googleAds.publisherId}</span> | Slot: {placement === 'top' ? googleAds.topBannerSlot : placement === 'feed' ? googleAds.inFeedSlot : googleAds.bottomBannerSlot}
        </div>
      </div>
    );
  }

  return null;
};
