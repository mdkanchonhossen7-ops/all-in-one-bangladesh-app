import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BloodDonor } from '../../types';
import {
  HeartPulse,
  Flame,
  Phone,
  MessageSquare,
  ShieldCheck,
  Calendar,
  Plus,
  Users,
  Search,
} from 'lucide-react';

export const BloodDonorSection: React.FC = () => {
  const {
    bloodDonors,
    selectedDistrict,
    selectedUpazila,
    setIsBloodAlertModalOpen,
    setIsSelfPostModalOpen,
    language,
    t,
  } = useApp();

  const [selectedGroup, setSelectedGroup] = useState<string>('all');

  const groups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const filtered = bloodDonors.filter((donor) => {
    if (selectedGroup !== 'all' && donor.bloodGroup !== selectedGroup) return false;
    if (selectedDistrict && donor.district.toLowerCase() !== selectedDistrict.toLowerCase()) return false;
    if (selectedUpazila && !donor.upazila.toLowerCase().includes(selectedUpazila.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Red Alert Action Header */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white rounded-2xl p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold text-red-100">
              <HeartPulse className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'জরুরি রক্তদাতা নেটওয়ার্ক' : 'Emergency Blood Donor Grid'}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
              {language === 'bn' ? 'লাইভ রক্তদাতা অনুসন্ধান ও পুশ নোটিফিকেশন' : 'Live Blood Donors & Upazila Push Alerts'}
            </h3>
            <p className="text-xs text-red-100 max-w-xl">
              {language === 'bn'
                ? 'আপনার উপজেলার রক্তদাতাদের সরাসরি কল করুন অথবা এক ক্লিকে তাদের মোবাইলে জরুরি অ্যালার্ট পাঠান।'
                : 'Instantly search registered donors by blood group & Upazila or broadcast push alerts.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBloodAlertModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-extrabold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
            >
              <Flame className="w-4 h-4 text-red-400 animate-pulse" />
              <span>{language === 'bn' ? 'ব্লাড পুশ অ্যালার্ট' : 'Send Push Alert'}</span>
            </button>

            <button
              onClick={() => setIsSelfPostModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white text-red-700 font-bold text-xs sm:text-sm hover:bg-red-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'bn' ? 'রক্তদাতা হোন' : 'Join as Donor'}</span>
            </button>
          </div>
        </div>

        {/* Blood Group Filter Buttons */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/20 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedGroup('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
              selectedGroup === 'all'
                ? 'bg-white text-red-800 shadow-xs'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {language === 'bn' ? 'সকল গ্রুপ' : 'All Groups'} ({bloodDonors.length})
          </button>
          {groups.map((grp) => (
            <button
              key={grp}
              onClick={() => setSelectedGroup(grp)}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold shrink-0 transition-all ${
                selectedGroup === grp
                  ? 'bg-white text-red-800 shadow-xs scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              🩸 {grp}
            </button>
          ))}
        </div>
      </div>

      {/* Donors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((donor) => (
          <div
            key={donor.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 space-y-3 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-100 text-red-700 font-black text-lg flex items-center justify-center border-2 border-red-300 shadow-xs shrink-0">
                  {donor.bloodGroup}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{donor.name}</span>
                    {donor.verified && (
                      <span title="Verified Donor">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {donor.upazila}, {donor.district}
                  </p>
                </div>
              </div>

              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  donor.isAvailable
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {donor.isAvailable
                  ? language === 'bn'
                    ? 'প্রস্তুত'
                    : 'Available'
                  : language === 'bn'
                  ? 'বিশ্রামে'
                  : 'Resting'}
              </span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl text-xs text-slate-600 flex items-center justify-between">
              <span>{language === 'bn' ? 'মোট রক্তদান:' : 'Donations:'} <strong className="text-slate-900">{donor.donationCount} বার</strong></span>
              {donor.lastDonationDate && (
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{donor.lastDonationDate}</span>
                </span>
              )}
            </div>

            {/* Direct Call & WhatsApp buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`tel:${donor.phone}`}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{t.callNow}</span>
              </a>

              {donor.whatsapp ? (
                <a
                  href={`https://wa.me/88${donor.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              ) : (
                <div className="flex items-center justify-center py-2 px-3 rounded-xl bg-slate-100 text-slate-400 text-xs">
                  {donor.phone}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
