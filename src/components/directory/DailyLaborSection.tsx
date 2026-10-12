import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DirectoryCard } from './DirectoryCard';
import { LegalDisclaimerWidget } from '../LegalDisclaimerWidget';
import {
  Wrench,
  Hammer,
  Paintbrush,
  Zap,
  Droplets,
  Tractor,
  PlusCircle,
  ShieldCheck,
  Search,
} from 'lucide-react';

export const DailyLaborSection: React.FC = () => {
  const { directoryItems, selectedDistrict, selectedUpazila, setIsSelfPostModalOpen, language, t } = useApp();
  const [tradeFilter, setTradeFilter] = useState('all');

  const laborItems = directoryItems.filter((i) => i.category === 'labor');

  const filtered = laborItems.filter((item) => {
    if (tradeFilter !== 'all') {
      const match =
        item.subcategory.toLowerCase().includes(tradeFilter) ||
        item.subcategoryBn.toLowerCase().includes(tradeFilter);
      if (!match) return false;
    }
    if (selectedDistrict && item.district.toLowerCase() !== selectedDistrict.toLowerCase()) return false;
    if (selectedUpazila && !item.upazila.toLowerCase().includes(selectedUpazila.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-amber-700 via-orange-700 to-amber-800 text-white rounded-2xl p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold text-amber-100">
              <Hammer className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'দিনমজুর ও দক্ষ কারিগর হাব' : 'Daily Labor & Craftsmen Hub'}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
              {language === 'bn'
                ? 'রাজমিস্ত্রি, কাঠমিস্ত্রি, রংমিস্ত্রি, ইলেকট্রিশিয়ান ও কৃষি দিনমজুর'
                : 'Masons, Carpenters, Electricians, Plumbers & Agro Workers'}
            </h3>
            <p className="text-xs text-amber-100 max-w-xl">
              {language === 'bn'
                ? 'সরাসরি শ্রমিকের সাথে কথা বলে দৈনিক চুক্তিতে কাজ করান। কোনো মধ্যস্বত্বভোগী বা দালাল ছাড়া সরাসরি কল করুন।'
                : 'Direct contact with skilled daily wage labor across your Upazila with authentic ratings.'}
            </p>
          </div>

          <button
            onClick={() => setIsSelfPostModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-amber-900 font-extrabold text-xs sm:text-sm hover:bg-amber-50 shadow-md transition-all hover:scale-105"
          >
            <PlusCircle className="w-4 h-4 text-amber-700" />
            <span>{language === 'bn' ? 'শ্রমিক হিসেবে রেজিস্ট্রেশন' : 'Register as Worker'}</span>
          </button>
        </div>

        {/* Quick Trade Pills */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/20 overflow-x-auto pb-1">
          <button
            onClick={() => setTradeFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
              tradeFilter === 'all'
                ? 'bg-white text-amber-900 shadow-xs'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {language === 'bn' ? 'সকল কারিগর' : 'All Craftsmen'} ({laborItems.length})
          </button>
          <button
            onClick={() => setTradeFilter('mason')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
              tradeFilter === 'mason'
                ? 'bg-white text-amber-900 shadow-xs'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            🔨 {language === 'bn' ? 'রাজমিস্ত্রি (Mason)' : 'Mason'}
          </button>
          <button
            onClick={() => setTradeFilter('carpenter')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
              tradeFilter === 'carpenter'
                ? 'bg-white text-amber-900 shadow-xs'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            🪚 {language === 'bn' ? 'কাঠমিস্ত্রি (Carpenter)' : 'Carpenter'}
          </button>
          <button
            onClick={() => setTradeFilter('electric')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
              tradeFilter === 'electric'
                ? 'bg-white text-amber-900 shadow-xs'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            ⚡ {language === 'bn' ? 'ইলেকট্রিশিয়ান' : 'Electrician'}
          </button>
          <button
            onClick={() => setTradeFilter('agro')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
              tradeFilter === 'agro'
                ? 'bg-white text-amber-900 shadow-xs'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            🌾 {language === 'bn' ? 'কৃষি দিনমজুর' : 'Agro Labor'}
          </button>
        </div>
      </div>

      {/* Grid of Labor items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <DirectoryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
