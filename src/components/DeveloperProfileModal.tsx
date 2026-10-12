import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Mail, Phone, MessageSquare, Facebook, ShieldCheck, Code, Award, CheckCircle } from 'lucide-react';

export const DeveloperProfileModal: React.FC = () => {
  const { isDevProfileOpen, setIsDevProfileOpen, language, t } = useApp();

  if (!isDevProfileOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        {/* Header with Green & Red banner */}
        <div className="relative bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 p-6 text-white">
          <button
            onClick={() => setIsDevProfileOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white/90 shadow-md bg-emerald-950 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
                alt="Md kanchon Hossen"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-400 border-2 border-white rounded-full flex items-center justify-center" title="Verified">
                <CheckCircle className="w-3.5 h-3.5 text-slate-900" />
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-md bg-white p-0.5 border border-emerald-400 shadow-xs shrink-0 overflow-hidden">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-400/30 text-[11px] font-semibold text-emerald-100 truncate">
                  <Code className="w-3 h-3 shrink-0" />
                  <span className="truncate">{language === 'bn' ? 'সফটওয়্যার স্থপতি ও প্রতিষ্ঠাতা' : 'Lead Architect & Founder'}</span>
                </div>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight truncate">Md kanchon Hossen</h2>
              <p className="text-emerald-100 text-sm">মোঃ কাঞ্চন হোসেন</p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 text-slate-700 text-sm">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-600 leading-relaxed">
            <p>
              {language === 'bn'
                ? 'Md kanchon Hossen হলেন "ALL IN ONE BANGLADESH" ডিজিটাল সেবা, দিনমজুর পোর্টাল, টিউশন ম্যাচমেকিং ও জরুরি ডিরেক্টরি প্ল্যাটফর্মের প্রধান প্রতিষ্ঠাতা ও নির্মাতা। বাংলাদেশের ৬৪ জেলার সাধারণ নাগরিকদের একটি সমন্বিত সুরক্ষিত প্ল্যাটফর্ম প্রদানের উদ্দেশ্যে তিনি এই ব্যবস্থা তৈরি করেছেন।'
                : 'Md kanchon Hossen is the Lead Architect and Founder of "ALL IN ONE BANGLADESH". He engineered this high-security multi-tenant directory, labor marketplace, and tuition portal to empower citizens across all 64 districts with instant self-service and emergency resources.'}
            </p>
          </div>

          {/* Contact Details List */}
          <div className="space-y-3 font-medium">
            <a
              href="tel:01642240176"
              className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/80 hover:bg-emerald-100 border border-emerald-200/80 text-emerald-900 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-600 text-white">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-emerald-700 font-semibold">{language === 'bn' ? 'সরাসরি মোবাইল নম্বর' : 'Primary Phone'}</div>
                  <div className="text-base font-bold text-slate-900">01642240176</div>
                </div>
              </div>
              <span className="text-xs font-semibold bg-emerald-600 text-white px-3 py-1.5 rounded-lg group-hover:bg-emerald-700">
                {language === 'bn' ? 'কল দিন' : 'Call'}
              </span>
            </a>

            <a
              href="https://wa.me/8801642240176"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-teal-50/80 hover:bg-teal-100 border border-teal-200/80 text-teal-900 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-teal-600 text-white">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-teal-700 font-semibold">{language === 'bn' ? 'অফিসিয়াল হোয়াটসঅ্যাপ' : 'WhatsApp Contact'}</div>
                  <div className="text-base font-bold text-slate-900">01642240176</div>
                </div>
              </div>
              <span className="text-xs font-semibold bg-teal-600 text-white px-3 py-1.5 rounded-lg group-hover:bg-teal-700">
                WhatsApp
              </span>
            </a>

            <a
              href="mailto:mdkanchonhossen7@gmail.com"
              className="flex items-center justify-between p-3 rounded-xl bg-blue-50/80 hover:bg-blue-100 border border-blue-200/80 text-blue-900 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-600 text-white">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-blue-700 font-semibold">{language === 'bn' ? 'অফিসিয়াল ইমেইল' : 'Email Address'}</div>
                  <div className="text-sm font-bold text-slate-900 truncate max-w-[200px] sm:max-w-none">
                    mdkanchonhossen7@gmail.com
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold bg-blue-600 text-white px-3 py-1.5 rounded-lg group-hover:bg-blue-700">
                Email
              </span>
            </a>

            <a
              href="https://www.facebook.com/share/18Ls5y3LWu/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-indigo-50/80 hover:bg-indigo-100 border border-indigo-200/80 text-indigo-900 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-600 text-white">
                  <Facebook className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-indigo-700 font-semibold">{language === 'bn' ? 'অফিসিয়াল ফেসবুক প্রোফাইল' : 'Facebook Profile'}</div>
                  <div className="text-sm font-bold text-slate-900">Md kanchon Hossen</div>
                </div>
              </div>
              <span className="text-xs font-semibold bg-indigo-600 text-white px-3 py-1.5 rounded-lg group-hover:bg-indigo-700">
                Facebook
              </span>
            </a>
          </div>

          {/* Badges footer */}
          <div className="flex items-center justify-center gap-4 pt-2 text-xs text-slate-500 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Verified Developer
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Award className="w-4 h-4 text-amber-500" /> All-in-One Bangladesh
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
