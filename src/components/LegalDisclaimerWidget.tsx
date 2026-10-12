import React from 'react';
import { useApp } from '../context/AppContext';
import { AlertTriangle, ShieldAlert } from 'lucide-react';
import { LEGAL_DISCLAIMER_TEXT } from '../data/bangladeshData';

interface LegalDisclaimerWidgetProps {
  compact?: boolean;
}

export const LegalDisclaimerWidget: React.FC<LegalDisclaimerWidgetProps> = ({ compact = false }) => {
  const { language } = useApp();

  return (
    <div className={`rounded-xl border-2 border-red-600 bg-red-50/95 p-3.5 shadow-sm text-red-900 ${compact ? 'text-xs' : 'text-xs sm:text-sm'}`}>
      <div className="flex items-start gap-2.5">
        <div className="p-1 rounded-md bg-red-600 text-white shrink-0 mt-0.5 animate-pulse">
          <ShieldAlert className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <div className="font-extrabold text-red-700 tracking-wide uppercase flex items-center gap-1.5 text-xs">
            <span>{language === 'bn' ? 'আইনি সতর্কতা ও জালিয়াতি প্রতিরোধ নোটিশ' : 'MANDATORY LEGAL DISCLAIMER'}</span>
          </div>
          <p className="font-bold text-red-800 leading-snug">
            {LEGAL_DISCLAIMER_TEXT.bn}
          </p>
          {language === 'en' && (
            <p className="text-[11px] font-semibold text-red-700/90 pt-1 border-t border-red-200 mt-1">
              {LEGAL_DISCLAIMER_TEXT.en}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
