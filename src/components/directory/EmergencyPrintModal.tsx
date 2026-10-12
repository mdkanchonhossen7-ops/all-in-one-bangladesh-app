import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Printer,
  X,
  Phone,
  Copy,
  Check,
  ShieldAlert,
  HeartPulse,
  Flame,
  Zap,
  Building2,
  Share2,
} from 'lucide-react';

interface EmergencyPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyPrintModal: React.FC<EmergencyPrintModalProps> = ({ isOpen, onClose }) => {
  const { language, selectedUpazila, selectedDistrict, directoryItems } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const areaName = selectedUpazila
    ? `${selectedUpazila}, ${selectedDistrict}`
    : selectedDistrict
    ? selectedDistrict
    : language === 'bn'
    ? 'ফুলবাড়ীয়া উপজেলা ও সমগ্র বাংলাদেশ'
    : 'Fulbaria Upazila & All Bangladesh';

  // National emergency numbers
  const nationalHotlines = [
    { name: language === 'bn' ? 'জাতীয় জরুরি সেবা (পুলিশ, অ্যাম্বুলেন্স, ফায়ার)' : 'National Emergency (Police, Amb, Fire)', number: '999', tollFree: true },
    { name: language === 'bn' ? 'সরকারি তথ্য ও সেবা হেল্পলাইন' : 'Citizen Service Helpline', number: '333', tollFree: false },
    { name: language === 'bn' ? 'স্বাস্থ্য বাতায়ন (২৪ ঘণ্টা ফ্রি ডাক্তার পরামর্শ)' : 'Health Helpline (24/7 Telemedicine)', number: '16263', tollFree: true },
    { name: language === 'bn' ? 'ফায়ার সার্ভিস ও সিভিল ডিফেন্স' : 'Fire Service Control Room', number: '16163', tollFree: false },
    { name: language === 'bn' ? 'বিদ্যুৎ অভিযোগ ও সেবা' : 'Electricity Helpline', number: '16575', tollFree: false },
    { name: language === 'bn' ? 'নারী ও শিশু নির্যাতন প্রতিরোধ হেল্পলাইন' : 'Women & Child Helpline', number: '109', tollFree: true },
    { name: language === 'bn' ? 'কৃষি কল সেন্টার (বিনামূল্যে পরামর্শ)' : 'Agriculture Call Center', number: '16123', tollFree: true },
    { name: language === 'bn' ? 'জাতীয় পরিচয়পত্র ও ভোটার সেবা' : 'National ID (NID) Helpline', number: '105', tollFree: true },
    { name: language === 'bn' ? 'জাতীয় আইনি সহায়তা (লিগ্যাল এইড)' : 'Legal Aid Helpline', number: '16430', tollFree: true },
    { name: language === 'bn' ? 'শিশু সুরক্ষা হেল্পলাইন' : 'Child Helpline', number: '1098', tollFree: true },
  ];

  // Relevant emergency contacts
  const localContacts = directoryItems
    .filter((item) => {
      if (selectedUpazila) {
        return item.upazila.toLowerCase().includes(selectedUpazila.toLowerCase());
      }
      return item.upazila === 'Fulbaria' || item.category === 'police' || item.category === 'health' || item.category === 'emergency';
    })
    .slice(0, 10);

  const handlePrint = () => {
    window.print();
  };

  const copyAllText = () => {
    const lines = [
      `🚨 ALL IN ONE BANGLADESH - জরুরি সেবা ডিরেক্টরি কার্ড (${areaName})`,
      '----------------------------------------',
      'জাতীয় জরুরি হেল্পলাইনসমূহ:',
      ...nationalHotlines.map((h) => `• ${h.name}: ${h.number}`),
      '',
      'স্থানীয় জরুরি যোগাযোগ:',
      ...localContacts.map((c) => `• ${language === 'bn' ? c.titleBn : c.title}: ${c.phone}`),
      '----------------------------------------',
      'সংগ্রহে রাখুন ও বিপদে শেয়ার করুন।',
    ].join('\n');

    navigator.clipboard.writeText(lines);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {language === 'bn' ? 'জরুরি সেবা যোগাযোগ নির্দেশিকা ও কার্ড' : 'Emergency Directory Contact Card'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {areaName} • {language === 'bn' ? 'প্রিন্ট বা সেভ করে সাথে রাখুন' : 'Print or save offline'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-3 sm:p-4 text-xs">
          <span className="text-emerald-800 font-bold">
            {language === 'bn'
              ? '💡 এই কার্ডটি ঘরে প্রিন্ট করে রাখুন বা মোবাইলে স্ক্রিনশট নিয়ে রাখুন।'
              : 'Keep this emergency directory card handy offline or printed.'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={copyAllText}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-300 hover:bg-emerald-100 text-emerald-800 font-bold rounded-xl transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (language === 'bn' ? 'কপি হয়েছে!' : 'Copied!') : (language === 'bn' ? 'টেক্সট কপি' : 'Copy All')}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'প্রিন্ট / PDF' : 'Print / PDF'}</span>
            </button>
          </div>
        </div>

        {/* National Hotlines Grid */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-red-500" />
            <span>{language === 'bn' ? 'জাতীয় জরুরি হটলাইনসমূহ (National Helplines)' : 'National Emergency Hotlines'}</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {nationalHotlines.map((hotline, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white transition-all"
              >
                <div className="truncate mr-2">
                  <div className="font-bold text-slate-800 truncate">{hotline.name}</div>
                  {hotline.tollFree && (
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100 px-1.5 py-0.2 rounded">
                      {language === 'bn' ? 'টোল-ফ্রি' : 'Toll-Free'}
                    </span>
                  )}
                </div>
                <a
                  href={`tel:${hotline.number}`}
                  className="shrink-0 flex items-center gap-1 px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-lg shadow-2xs"
                >
                  <Phone className="w-3 h-3" />
                  <span>{hotline.number}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Local Emergency Directory */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>
              {language === 'bn'
                ? `স্থানীয় জরুরি নম্বর (${areaName})`
                : `Local Emergency Contacts (${areaName})`}
            </span>
          </h4>
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden text-xs">
            {localContacts.map((contact) => (
              <div key={contact.id} className="p-3 flex items-center justify-between gap-3 bg-white hover:bg-slate-50">
                <div>
                  <div className="font-bold text-slate-900">
                    {language === 'bn' ? contact.titleBn : contact.title}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <span className="text-emerald-700 font-semibold">{contact.upazila}</span>
                    <span>•</span>
                    <span className="truncate max-w-[200px] sm:max-w-xs">{language === 'bn' ? contact.addressBn : contact.address}</span>
                  </div>
                </div>
                <a
                  href={`tel:${contact.phone}`}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs"
                >
                  <Phone className="w-3 h-3" />
                  <span>{contact.phone}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>ALL IN ONE BANGLADESH • সার্বিক নাগরিক সেবা ডিরেক্টরি</span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
          >
            {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
