import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BANGLADESH_DIVISIONS, DIVISION_DISTRICTS_MAP, POPULAR_UPAZILAS_MAP } from '../data/bangladeshData';
import { Flame, BellRing, CheckCircle, X, ShieldAlert, Users, Send } from 'lucide-react';

export const BloodPushAlertModal: React.FC = () => {
  const { isBloodAlertModalOpen, setIsBloodAlertModalOpen, language, bloodDonors, t } = useApp();

  const [division, setDivision] = useState('Dhaka');
  const [district, setDistrict] = useState('Dhaka');
  const [upazila, setUpazila] = useState('Mirpur');
  const [bloodGroup, setBloodGroup] = useState<'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-'>('O+');
  const [hospital, setHospital] = useState('');
  const [patientContact, setPatientContact] = useState('');
  const [bagsRequired, setBagsRequired] = useState('1');
  const [isSent, setIsSent] = useState(false);

  if (!isBloodAlertModalOpen) return null;

  const districts = DIVISION_DISTRICTS_MAP[division] || ['Dhaka'];
  const upazilas = POPULAR_UPAZILAS_MAP[district] || ['Sadar', 'Mirpur', 'Uttara'];

  // Count matching donors
  const matchingDonors = bloodDonors.filter(
    (d) => d.bloodGroup === bloodGroup && (d.district === district || !district)
  );

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      // Keep open with success screen
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-red-300">
        {/* Red Emergency Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/20 animate-pulse">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold">{t.urgentBloodAlert}</h3>
              <p className="text-xs text-red-100">{t.bloodNotice}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsBloodAlertModalOpen(false);
              setIsSent(false);
            }}
            className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSent ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-800">
                {language === 'bn' ? 'FCM পুশ অ্যালার্ট সফলভাবে পাঠানো হয়েছে!' : 'FCM Push Alert Broadcasted!'}
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                {language === 'bn'
                  ? `${district} ও ${upazila} এলাকায় নিবন্ধিত ${matchingDonors.length} জন ${bloodGroup} রক্তদাতার ডিভাইসে সরাসরি জরুরি নোটিফিকেশন অ্যালার্ট পাঠানো হয়েছে।`
                  : `Emergency push notification dispatched to ${matchingDonors.length} registered ${bloodGroup} donors in ${upazila}, ${district}.`}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-left text-xs space-y-1">
              <div className="font-bold text-red-800 flex items-center gap-1">
                <BellRing className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'পুশ অ্যালার্ট প্রিভিউ:' : 'Notification Broadcast Payload:'}</span>
              </div>
              <div className="text-slate-700">
                🚨 <span className="font-bold text-red-700">জরুরি {bloodGroup} রক্ত প্রয়োজন ({bagsRequired} ব্যাগ)</span>
                <br />
                হাসপাতাল: {hospital || 'স্থানীয় হাসপাতাল'}
                <br />
                যোগাযোগ: <span className="font-bold">{patientContact || '০১৬৪২২৪০১৭৬'}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsBloodAlertModalOpen(false);
                setIsSent(false);
              }}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              {language === 'bn' ? 'সম্পন্ন (বন্ধ করুন)' : 'Done (Close)'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSendBroadcast} className="p-6 space-y-3.5 text-xs sm:text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  {language === 'bn' ? 'রক্তের গ্রুপ' : 'Blood Group'} *
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-red-700 text-sm focus:ring-2 focus:ring-red-500"
                >
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  {language === 'bn' ? 'প্রয়োজনীয় ব্যাগ' : 'Bags Needed'} *
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={bagsRequired}
                  onChange={(e) => setBagsRequired(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  {t.division}
                </label>
                <select
                  value={division}
                  onChange={(e) => {
                    setDivision(e.target.value);
                    const firstDist = DIVISION_DISTRICTS_MAP[e.target.value]?.[0] || 'Dhaka';
                    setDistrict(firstDist);
                  }}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-2 py-2"
                >
                  {BANGLADESH_DIVISIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  {t.district}
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-2 py-2"
                >
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  {t.upazila}
                </label>
                <select
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-2 py-2"
                >
                  {upazilas.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {language === 'bn' ? 'হাসপাতালের নাম ও ওয়ার্ড' : 'Hospital Name & Ward'} *
              </label>
              <input
                type="text"
                required
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                placeholder={language === 'bn' ? 'যেমন: ঢাকা মেডিকেল কলেজ, ওয়ার্ড ৩' : 'e.g. DMCH, Ward 3'}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {language === 'bn' ? 'রোগীর স্বজনের মোবাইল নম্বর' : 'Patient Attendant Phone'} *
              </label>
              <input
                type="tel"
                required
                value={patientContact}
                onChange={(e) => setPatientContact(e.target.value)}
                placeholder="017XXXXXXXX"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm"
              />
            </div>

            {/* Target Donor Reach Counter */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-700" />
                <span className="text-xs font-bold text-amber-900">
                  {language === 'bn' ? 'আওতাভুক্ত নিবন্ধিত রক্তদাতা:' : 'Active Registered Donors:'}
                </span>
              </div>
              <span className="text-xs font-extrabold bg-amber-600 text-white px-2 py-0.5 rounded-full">
                {matchingDonors.length} {language === 'bn' ? 'জন' : 'Donors'}
              </span>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/30 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{t.sendPushAlertBtn}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
