import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, ExternalLink, Megaphone, Bell } from 'lucide-react';

export const PopUpAdModal: React.FC = () => {
  const { popupAd, language } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!popupAd.enabled) {
      setIsOpen(false);
      return;
    }

    const dismissedKey = 'aio_bd_popup_dismissed_until';
    const dismissedUntil = localStorage.getItem(dismissedKey);
    const now = Date.now();

    if (dismissedUntil && parseInt(dismissedUntil, 10) > now) {
      return;
    }

    // Delay trigger according to config
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, (popupAd.delaySeconds || 1.5) * 1000);

    return () => clearTimeout(timer);
  }, [popupAd]);

  const handleClose = () => {
    setIsOpen(false);
    // Dismiss according to frequency
    const expireTime = Date.now() + (popupAd.frequencyMinutes || 15) * 60 * 1000;
    localStorage.setItem('aio_bd_popup_dismissed_until', expireTime.toString());
  };

  if (!isOpen || !popupAd.enabled) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border-2 border-emerald-500 transform transition-all scale-100">
        {/* Top Announcement Bar */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-4 py-2.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wide">
            <span className="p-1 rounded bg-white/20">
              <Megaphone className="w-3.5 h-3.5" />
            </span>
            <span>{language === 'bn' ? 'জরুরি বিজ্ঞপ্তি ও পাবলিক নোটিশ' : 'OFFICIAL ANNOUNCEMENT'}</span>
          </div>

          {/* Close (X) Button Trigger */}
          <button
            onClick={handleClose}
            className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all transform hover:rotate-90"
            title="Close modal announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Banner Graphic Image */}
        <div className="relative w-full h-56 bg-slate-900 overflow-hidden">
          <img
            src={popupAd.imageUrl}
            alt={popupAd.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
            <div className="text-white">
              <span className="text-[11px] font-semibold bg-emerald-600 text-white px-2 py-0.5 rounded-full mb-1 inline-block">
                {language === 'bn' ? 'সরকারি ও নাগরিক সার্ভিস' : 'Civic & Portal Notice'}
              </span>
              <h3 className="text-base sm:text-lg font-bold line-clamp-2">
                {language === 'bn' ? popupAd.titleBn : popupAd.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-5 bg-white space-y-4">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {language === 'bn'
              ? 'বাংলাদেশের ৬৪ জেলার সাধারণ নাগরিক, দিনমজুর ও শিক্ষার্থীদের সেবায় পরিচালিত অল-ইন-ওয়ান পোর্টাল। জরুরি রক্তদাতা বা গৃহশিক্ষক খুঁজতে সরাসরি ব্রাউজ করুন।'
              : 'Empowering citizens across all 64 districts with verified emergency contacts, daily labor matchmaking, and blood requests.'}
          </p>

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              {language === 'bn' ? 'এখন না (বন্ধ করুন)' : 'Dismiss'}
            </button>

            <a
              href={popupAd.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all shadow-emerald-500/20"
            >
              <span>{language === 'bn' ? popupAd.ctaTextBn : popupAd.ctaText}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
