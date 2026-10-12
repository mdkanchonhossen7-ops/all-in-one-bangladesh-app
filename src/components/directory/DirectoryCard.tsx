import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DirectoryItem } from '../../types';
import { LegalDisclaimerWidget } from '../LegalDisclaimerWidget';
import {
  Phone,
  MessageSquare,
  MapPin,
  Star,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  Tag,
  Briefcase,
  Copy,
  Check,
  Flame,
} from 'lucide-react';

interface DirectoryCardProps {
  item: DirectoryItem;
}

export const DirectoryCard: React.FC<DirectoryCardProps> = ({ item }) => {
  const { language, t } = useApp();
  const [copied, setCopied] = useState(false);

  const isLabor = item.category === 'labor';
  const shouldShowDisclaimer = isLabor || item.isSelfPost;
  const isEmergency = item.category === 'police' || item.category === 'emergency' || item.phone === '999' || item.phone === '16263' || item.phone === '333';

  const copyPhoneNumber = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(item.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`bg-white rounded-2xl border transition-all overflow-hidden flex flex-col justify-between ${
      isEmergency ? 'border-red-200 shadow-xs hover:border-red-400' : 'border-slate-200/90 shadow-sm hover:shadow-md'
    }`}>
      <div>
        {/* Card Header image or banner if available */}
        {item.imageUrl && (
          <div className="relative w-full h-40 bg-slate-100 overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            {item.dailyRate && (
              <div className="absolute top-3 right-3 bg-slate-900/90 text-amber-400 font-extrabold text-xs px-2.5 py-1 rounded-full shadow-md">
                {language === 'bn' ? item.dailyRateBn || item.dailyRate : item.dailyRate}
              </div>
            )}
            <div className="absolute bottom-2 left-2 bg-emerald-800/90 text-white text-[11px] font-semibold px-2 py-0.5 rounded">
              {language === 'bn' ? item.subcategoryBn || item.subcategory : item.subcategory}
            </div>
          </div>
        )}

        <div className="p-4 space-y-2.5">
          {/* Subcategory & Badges */}
          {!item.imageUrl && (
            <div className="flex items-center justify-between gap-2">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                isEmergency
                  ? 'text-red-700 bg-red-50 border-red-200'
                  : 'text-emerald-800 bg-emerald-50 border-emerald-200'
              }`}>
                {language === 'bn' ? item.subcategoryBn || item.subcategory : item.subcategory}
              </span>
              {item.dailyRate && (
                <span className="text-xs font-black text-emerald-700">
                  {language === 'bn' ? item.dailyRateBn || item.dailyRate : item.dailyRate}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <div>
            <div className="flex items-start justify-between gap-1.5">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                {language === 'bn' ? item.titleBn || item.title : item.title}
              </h4>
              {item.verified && (
                <span className="shrink-0 text-emerald-600" title="Verified by Platform">
                  <CheckCircle className="w-4 h-4" />
                </span>
              )}
            </div>

            {/* Address */}
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">
                {language === 'bn' ? item.addressBn || item.address : item.address}
              </span>
            </p>
          </div>

          {/* Phone Display with 1-Click Copy */}
          <div className="flex items-center justify-between bg-slate-50 border border-slate-200/80 rounded-xl px-2.5 py-1.5 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Phone className={`w-3.5 h-3.5 ${isEmergency ? 'text-red-600' : 'text-emerald-600'}`} />
              <span className="tracking-wide font-mono text-[13px]">{item.phone}</span>
            </div>
            <button
              onClick={copyPhoneNumber}
              className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 px-2 py-0.5 rounded hover:bg-white transition-all border border-transparent hover:border-slate-200"
              title="Copy Phone Number"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">{language === 'bn' ? 'কপি!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>{language === 'bn' ? 'কপি' : 'Copy'}</span>
                </>
              )}
            </button>
          </div>

          {/* Rating & Review */}
          <div className="flex items-center gap-3 text-xs text-slate-600 pt-1">
            <div className="flex items-center gap-1 font-bold text-amber-600">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{item.rating.toFixed(1)}</span>
            </div>
            <span>•</span>
            <span>{item.reviewCount} {language === 'bn' ? 'মতামত' : 'reviews'}</span>
            {item.badge && (
              <>
                <span>•</span>
                <span className={`font-semibold px-1.5 py-0.5 rounded text-[10px] ${
                  isEmergency ? 'text-red-700 bg-red-50' : 'text-emerald-700 bg-emerald-50'
                }`}>
                  {language === 'bn' ? item.badgeBn || item.badge : item.badge}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          {(item.description || item.descriptionBn) && (
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
              {language === 'bn' ? item.descriptionBn || item.description : item.description}
            </p>
          )}
        </div>
      </div>

      {/* Footer Actions & Legal Disclaimer */}
      <div className="p-4 pt-0 space-y-3">
        {/* Action Buttons: Call, WhatsApp, Maps */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {/* Direct Call Button */}
          <a
            href={`tel:${item.phone}`}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-white font-bold text-xs shadow-xs transition-colors ${
              isEmergency
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{t.callNow}</span>
          </a>

          {/* WhatsApp Button */}
          {item.whatsapp ? (
            <a
              href={`https://wa.me/88${item.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          ) : (
            <button
              disabled
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 text-slate-400 font-medium text-xs cursor-not-allowed"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          )}

          {/* Google Maps Pin Button */}
          {item.mapUrl ? (
            <a
              href={item.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>{t.mapLocation}</span>
            </a>
          ) : (
            <div className="col-span-2 sm:col-span-1 flex items-center justify-center py-2 px-3 rounded-xl bg-slate-50 text-slate-500 font-medium text-xs truncate">
              <span>{item.upazila}</span>
            </div>
          )}
        </div>

        {/* Mandatory Permanent Legal Disclaimer on Daily Labor or Self Posts */}
        {shouldShowDisclaimer && (
          <LegalDisclaimerWidget compact />
        )}
      </div>
    </div>
  );
};

