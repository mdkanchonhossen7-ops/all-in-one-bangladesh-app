import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TuitionPost } from '../../types';
import { LegalDisclaimerWidget } from '../LegalDisclaimerWidget';
import {
  GraduationCap,
  BookOpen,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle,
  Plus,
  Users,
  Building,
} from 'lucide-react';

export const TuitionSection: React.FC = () => {
  const { tuitionPosts, selectedDistrict, selectedUpazila, setIsSelfPostModalOpen, language, t } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'teacher_available' | 'tutor_needed'>('all');

  const filtered = tuitionPosts.filter((item) => {
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (selectedDistrict && item.district.toLowerCase() !== selectedDistrict.toLowerCase()) return false;
    if (selectedUpazila && !item.upazila.toLowerCase().includes(selectedUpazila.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Controls & Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-800 text-white rounded-2xl p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold text-blue-100">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'দ্বিমুখী টিউশন প্ল্যাটফর্ম' : 'Two-Way Tuition Marketplace'}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
              {language === 'bn'
                ? 'শিক্ষক ও অভিভাবক গৃহশিক্ষক ম্যাচমেকিং পোর্টাল'
                : 'Teacher & Student Tuition Matchmaking Portal'}
            </h3>
            <p className="text-xs text-blue-100 max-w-xl">
              {language === 'bn'
                ? 'অভিভাবকগণ সহজে বিশ্বস্ত গৃহশিক্ষক খুঁজে নিন এবং যোগ্য টিউটরগণ সরাসরি টিউশন পোস্ট করুন।'
                : 'Connecting verified university tutors with guardians across all Bangladesh districts.'}
            </p>
          </div>

          <button
            onClick={() => setIsSelfPostModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-indigo-900 font-extrabold text-xs sm:text-sm hover:bg-blue-50 shadow-md transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4 text-indigo-700" />
            <span>{language === 'bn' ? 'টিউশন পোস্ট দিন' : 'Post Tuition Requirement'}</span>
          </button>
        </div>

        {/* Filter sub-tabs */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/20">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'all'
                ? 'bg-white text-indigo-900 shadow-xs'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {language === 'bn' ? 'সকল পোস্ট' : 'All Listings'} ({tuitionPosts.length})
          </button>
          <button
            onClick={() => setFilterType('teacher_available')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'teacher_available'
                ? 'bg-white text-indigo-900 shadow-xs'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {language === 'bn' ? 'টিউশন দিতে চাই (শিক্ষক)' : 'Tutors Offering'}
          </button>
          <button
            onClick={() => setFilterType('tutor_needed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'tutor_needed'
                ? 'bg-white text-indigo-900 shadow-xs'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {language === 'bn' ? 'শিক্ষক চাই (অভিভাবক)' : 'Guardians Seeking'}
          </button>
        </div>
      </div>

      {/* Tuition Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((post) => {
          const isTeacher = post.type === 'teacher_available';

          return (
            <div
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4 flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                {/* Header Badge & Name */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span
                      className={`inline-block text-[11px] font-extrabold px-2.5 py-0.5 rounded-full mb-1 ${
                        isTeacher
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                      }`}
                    >
                      {isTeacher
                        ? language === 'bn'
                          ? 'শিক্ষক টিউশন অফার'
                          : 'Teacher Offering'
                        : language === 'bn'
                        ? 'অভিভাবকের গৃহশিক্ষক প্রয়োজন'
                        : 'Guardian Looking for Tutor'}
                    </span>
                    <h4 className="text-base font-bold text-slate-900">{post.name}</h4>
                    {post.institute && (
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        <span>{post.institute}</span>
                      </p>
                    )}
                  </div>

                  {post.nidVerified && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{language === 'bn' ? 'NID ভেরিফায়েড' : 'ID Verified'}</span>
                    </span>
                  )}
                </div>

                {/* Details Breakdown */}
                <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 text-xs text-slate-700 border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">{language === 'bn' ? 'শ্রেণি / লেভেল:' : 'Classes:'}</span>
                    <span className="font-bold text-slate-900">{post.classes.join(', ')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">{language === 'bn' ? 'বিষয়সমূহ:' : 'Subjects:'}</span>
                    <span className="font-bold text-slate-900">{post.subjects.join(', ')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">{language === 'bn' ? 'মাধ্যম:' : 'Medium:'}</span>
                    <span className="font-semibold text-indigo-700">{post.medium} Version</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                    <span className="text-slate-500">{language === 'bn' ? 'প্রত্যাশিত পারিশ্রমিক:' : 'Remuneration:'}</span>
                    <span className="font-extrabold text-emerald-700">{post.salary}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400">
                  {language === 'bn' ? 'এলাকা:' : 'Area:'} {post.upazila}, {post.district}
                </div>
              </div>

              {/* Action Buttons & MANDATORY LEGAL DISCLAIMER */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${post.phone}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{t.callNow}</span>
                  </a>

                  {post.whatsapp ? (
                    <a
                      href={`https://wa.me/88${post.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  ) : (
                    <div className="flex items-center justify-center py-2.5 rounded-xl bg-slate-100 text-slate-400 text-xs">
                      {post.phone}
                    </div>
                  )}
                </div>

                {/* MANDATORY LEGAL DISCLAIMER IN RED/BOLD (SECTION 6) */}
                <LegalDisclaimerWidget compact />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
