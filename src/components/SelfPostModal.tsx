import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BANGLADESH_DIVISIONS, DIVISION_DISTRICTS_MAP, MANDATORY_LEGAL_AGREEMENT } from '../data/bangladeshData';
import { LegalDisclaimerWidget } from './LegalDisclaimerWidget';
import {
  X,
  Send,
  ShieldCheck,
  AlertCircle,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Store,
  CheckSquare,
  Square,
} from 'lucide-react';

export const SelfPostModal: React.FC = () => {
  const {
    isSelfPostModalOpen,
    setIsSelfPostModalOpen,
    language,
    addDirectoryItem,
    addTuitionPost,
    addBloodDonor,
    t,
  } = useApp();

  const [postType, setPostType] = useState<
    'labor' | 'tuition_teacher' | 'tuition_student' | 'blood' | 'service'
  >('labor');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [division, setDivision] = useState('Dhaka');
  const [district, setDistrict] = useState('Dhaka');
  const [upazila, setUpazila] = useState('Mirpur');
  const [details, setDetails] = useState('');
  const [rateOrSalary, setRateOrSalary] = useState('');
  const [bloodGroup, setBloodGroup] = useState<'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-'>('O+');
  const [classes, setClasses] = useState('');
  const [subjects, setSubjects] = useState('');
  const [medium, setMedium] = useState<'Bangla' | 'English' | 'Both' | 'Madrasa'>('Bangla');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isSelfPostModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !phone.trim() || !district.trim() || !upazila.trim()) {
      setErrorMsg(t.fillRequired);
      return;
    }

    if (!agreedToTerms) {
      setErrorMsg(t.agreeRequiredWarning);
      return;
    }

    const now = new Date().toISOString().split('T')[0];

    if (postType === 'labor') {
      addDirectoryItem({
        id: `post_lbr_${Date.now()}`,
        title: `${name} (${details.slice(0, 30) || 'কারিগর/দিনমজুর'})`,
        titleBn: `${name} (${details.slice(0, 30) || 'কারিগর/দিনমজুর'})`,
        category: 'labor',
        subcategory: 'Skilled Daily Labor',
        subcategoryBn: 'দক্ষ দিনমজুর ও কারিগর',
        division,
        district,
        upazila,
        address: `${upazila}, ${district}`,
        addressBn: `${upazila}, ${district}`,
        phone,
        whatsapp: whatsapp || phone,
        rating: 5.0,
        reviewCount: 1,
        verified: false,
        dailyRate: rateOrSalary || '৳ 800 / Day',
        dailyRateBn: rateOrSalary || '৳ ৮০০ / দিন',
        description: details,
        descriptionBn: details,
        badge: 'Self-Posted',
        badgeBn: 'স্ব-পোস্টকৃত',
        isSelfPost: true,
        status: 'active',
        createdAt: now,
      });
    } else if (postType === 'tuition_teacher' || postType === 'tuition_student') {
      addTuitionPost({
        id: `post_tui_${Date.now()}`,
        type: postType === 'tuition_teacher' ? 'teacher_available' : 'tutor_needed',
        name,
        phone,
        whatsapp: whatsapp || phone,
        division,
        district,
        upazila,
        classes: classes ? classes.split(',').map((c) => c.trim()) : ['Class 1-10'],
        subjects: subjects ? subjects.split(',').map((s) => s.trim()) : ['General'],
        medium,
        salary: rateOrSalary || '৳ 6,000 / Month',
        institute: details || 'Local University/College',
        nidVerified: false,
        status: 'active',
        createdAt: now,
      });
    } else if (postType === 'blood') {
      addBloodDonor({
        id: `post_bld_${Date.now()}`,
        name,
        bloodGroup,
        phone,
        whatsapp: whatsapp || phone,
        division,
        district,
        upazila,
        isAvailable: true,
        donationCount: 1,
        verified: false,
        createdAt: now,
      });
    } else {
      addDirectoryItem({
        id: `post_srv_${Date.now()}`,
        title: name,
        titleBn: name,
        category: 'shopping',
        subcategory: 'Local Service & Business',
        subcategoryBn: 'স্থানীয় সেবা ও ব্যবসা',
        division,
        district,
        upazila,
        address: `${upazila}, ${district}`,
        addressBn: `${upazila}, ${district}`,
        phone,
        whatsapp: whatsapp || phone,
        rating: 5.0,
        reviewCount: 1,
        verified: false,
        badge: 'Local Business',
        badgeBn: 'স্থানীয় প্রতিষ্ঠান',
        description: details,
        descriptionBn: details,
        isSelfPost: true,
        status: 'active',
        createdAt: now,
      });
    }

    setSuccessMsg(
      language === 'bn'
        ? 'আপনার বিজ্ঞাপনটি কোনো পূর্ব অনুমোদন ছাড়াই তাৎক্ষণিকভাবে সফলভাবে প্রকাশিত হয়েছে!'
        : 'Your post has been published instantly without requiring prior approval!'
    );

    setTimeout(() => {
      setIsSelfPostModalOpen(false);
      setSuccessMsg('');
    }, 1500);
  };

  const districtsList = DIVISION_DISTRICTS_MAP[division] || ['Dhaka'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-emerald-700 to-teal-800 text-white p-5 flex items-center justify-between border-b border-emerald-600">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
              <span>{t.postModalTitle}</span>
            </h2>
            <p className="text-xs text-emerald-100 mt-0.5">{t.postModalDesc}</p>
          </div>
          <button
            onClick={() => setIsSelfPostModalOpen(false)}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-300 text-red-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Post Type Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {t.postType}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPostType('labor')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                  postType === 'labor'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-xs'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Briefcase className="w-4 h-4 text-emerald-600" />
                <span className="text-center">{language === 'bn' ? 'দিনমজুর/কারিগর' : 'Daily Labor'}</span>
              </button>

              <button
                type="button"
                onClick={() => setPostType('tuition_teacher')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                  postType === 'tuition_teacher'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-xs'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span className="text-center">{language === 'bn' ? 'টিউশন পড়াবো' : 'Teach Tuition'}</span>
              </button>

              <button
                type="button"
                onClick={() => setPostType('tuition_student')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                  postType === 'tuition_student'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-xs'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <span className="text-center">{language === 'bn' ? 'টিচার চাই' : 'Need Tutor'}</span>
              </button>

              <button
                type="button"
                onClick={() => setPostType('blood')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                  postType === 'blood'
                    ? 'border-rose-600 bg-rose-50 text-rose-800 shadow-xs'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <HeartPulse className="w-4 h-4 text-rose-600" />
                <span className="text-center">{language === 'bn' ? 'রক্তের আবেদন' : 'Blood Request'}</span>
              </button>
            </div>
          </div>

          {/* Basic User Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {t.fullName} *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={language === 'bn' ? 'যেমন: মোঃ রফিকুল ইসলাম' : 'e.g. Md. Rafiqul Islam'}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {t.phoneNumber} *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="017XXXXXXXX"
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Location Cascading Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {t.division} *
              </label>
              <select
                value={division}
                onChange={(e) => {
                  setDivision(e.target.value);
                  const firstDist = DIVISION_DISTRICTS_MAP[e.target.value]?.[0] || 'Dhaka';
                  setDistrict(firstDist);
                }}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {BANGLADESH_DIVISIONS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {t.district} *
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {districtsList.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {t.upazila} *
              </label>
              <input
                type="text"
                required
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                placeholder={language === 'bn' ? 'যেমন: মিরপুর / সদর' : 'e.g. Mirpur / Sadar'}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Conditional Fields based on Post Type */}
          {postType === 'blood' ? (
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {t.bloodGroupLabel}
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value as any)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {t.dailyRateLabel}
              </label>
              <input
                type="text"
                value={rateOrSalary}
                onChange={(e) => setRateOrSalary(e.target.value)}
                placeholder={
                  postType === 'labor'
                    ? language === 'bn'
                      ? 'যেমন: ৳ ৮৫০ / দিন'
                      : 'e.g. ৳ 850 / Day'
                    : language === 'bn'
                    ? 'যেমন: ৳ ৮,০০০ / মাস'
                    : 'e.g. ৳ 8,000 / Month'
                }
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          )}

          {postType.startsWith('tuition') && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  {t.classesLabel}
                </label>
                <input
                  type="text"
                  value={classes}
                  onChange={(e) => setClasses(e.target.value)}
                  placeholder="Class 9, Class 10, HSC"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  {t.subjectsLabel}
                </label>
                <input
                  type="text"
                  value={subjects}
                  onChange={(e) => setSubjects(e.target.value)}
                  placeholder="Math, Physics, English"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              {t.description}
            </label>
            <textarea
              rows={2}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={
                language === 'bn'
                  ? 'কাজের বিবরণ বা আপনার অভিজ্ঞতা লিখুন...'
                  : 'Provide detailed requirements or experience...'
              }
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* MANDATORY LEGAL PROTECTION CHECKBOX */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
              />
              <span className="text-xs font-bold text-slate-800 leading-snug">
                {language === 'bn' ? MANDATORY_LEGAL_AGREEMENT.bn : MANDATORY_LEGAL_AGREEMENT.en}
              </span>
            </label>
          </div>

          {/* PERMANENT LEGAL DISCLAIMER WIDGET */}
          <LegalDisclaimerWidget compact />

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsSelfPostModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              {t.close}
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{t.publishNowBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
