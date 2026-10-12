import React from 'react';
import { useApp } from '../context/AppContext';
import {
  BANGLADESH_DIVISIONS,
  DIVISION_DISTRICTS_MAP,
  POPULAR_UPAZILAS_MAP,
} from '../data/bangladeshData';
import { MapPin, RotateCcw, Filter, ChevronRight } from 'lucide-react';

export const LocationFilter: React.FC = () => {
  const {
    selectedDivision,
    setSelectedDivision,
    selectedDistrict,
    setSelectedDistrict,
    selectedUpazila,
    setSelectedUpazila,
    language,
    t,
  } = useApp();

  const districtsList = selectedDivision
    ? DIVISION_DISTRICTS_MAP[selectedDivision] || []
    : [];

  const upazilasList = selectedDistrict
    ? POPULAR_UPAZILAS_MAP[selectedDistrict] || ['Sadar', 'North', 'South']
    : [];

  const handleDivisionChange = (div: string) => {
    setSelectedDivision(div);
    setSelectedDistrict('');
    setSelectedUpazila('');
  };

  const handleDistrictChange = (dis: string) => {
    setSelectedDistrict(dis);
    setSelectedUpazila('');
  };

  const resetAll = () => {
    setSelectedDivision('');
    setSelectedDistrict('');
    setSelectedUpazila('');
  };

  const selectQuickArea = (div: string, dis: string, upz: string) => {
    setSelectedDivision(div);
    setSelectedDistrict(dis);
    setSelectedUpazila(upz);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 mb-6 space-y-3">
      {/* Quick Model & Hub Selection Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-[11px] font-bold text-slate-400 shrink-0">
          {language === 'bn' ? 'দ্রুত নির্বাচন:' : 'Quick Select:'}
        </span>
        <button
          onClick={() => selectQuickArea('Mymensingh', 'Mymensingh', 'Fulbaria')}
          className={`shrink-0 px-2.5 py-1 rounded-lg font-bold border transition-all flex items-center gap-1 ${
            selectedUpazila === 'Fulbaria'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
          }`}
        >
          <span>🎯 {language === 'bn' ? 'ফুলবাড়ীয়া (মডেল)' : 'Fulbaria (Model)'}</span>
        </button>
        <button
          onClick={() => selectQuickArea('Dhaka', 'Dhaka', 'Dhanmondi')}
          className={`shrink-0 px-2.5 py-1 rounded-lg font-semibold border transition-all ${
            selectedUpazila === 'Dhanmondi'
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          {language === 'bn' ? 'ধানমন্ডি (ঢাকা)' : 'Dhanmondi'}
        </button>
        <button
          onClick={() => selectQuickArea('Dhaka', 'Dhaka', 'Mirpur')}
          className={`shrink-0 px-2.5 py-1 rounded-lg font-semibold border transition-all ${
            selectedUpazila === 'Mirpur'
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          {language === 'bn' ? 'মিরপুর (ঢাকা)' : 'Mirpur'}
        </button>
        <button
          onClick={() => selectQuickArea('Dhaka', 'Dhaka', 'Uttara')}
          className={`shrink-0 px-2.5 py-1 rounded-lg font-semibold border transition-all ${
            selectedUpazila === 'Uttara'
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          {language === 'bn' ? 'উত্তরা (ঢাকা)' : 'Uttara'}
        </button>
        <button
          onClick={() => selectQuickArea('Chattogram', 'Chattogram', 'Kotwali')}
          className={`shrink-0 px-2.5 py-1 rounded-lg font-semibold border transition-all ${
            selectedUpazila === 'Kotwali'
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          {language === 'bn' ? 'কোতোয়ালী (চট্টগ্রাম)' : 'Kotwali'}
        </button>
        <button
          onClick={() => selectQuickArea('Rajshahi', 'Bogura', 'Sherpur')}
          className={`shrink-0 px-2.5 py-1 rounded-lg font-semibold border transition-all ${
            selectedUpazila === 'Sherpur'
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          {language === 'bn' ? 'শেরপুর (বগুড়া)' : 'Sherpur'}
        </button>
        <button
          onClick={resetAll}
          className={`shrink-0 px-2.5 py-1 rounded-lg font-semibold border transition-all ${
            !selectedDivision && !selectedDistrict && !selectedUpazila
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
          }`}
        >
          {language === 'bn' ? '🌐 সারা বাংলাদেশ' : '🌐 All Bangladesh'}
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span>{language === 'bn' ? 'এলাকা অনুযায়ী ফিল্টার (বিভাগ > জেলা > উপজেলা)' : 'Geographic Location Filter (Division > District > Upazila)'}</span>
        </div>

        {(selectedDivision || selectedDistrict || selectedUpazila) && (
          <button
            onClick={resetAll}
            className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.resetFilters}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Division Selector */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 mb-1">
            ১. {t.division}
          </label>
          <select
            value={selectedDivision}
            onChange={(e) => handleDivisionChange(e.target.value)}
            className="w-full text-xs sm:text-sm font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          >
            <option value="">{t.allDivisions}</option>
            {BANGLADESH_DIVISIONS.map((div) => (
              <option key={div} value={div}>
                {div} {language === 'bn' ? 'বিভাগ' : 'Division'}
              </option>
            ))}
          </select>
        </div>

        {/* District Selector */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 mb-1">
            ২. {t.district}
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => handleDistrictChange(e.target.value)}
            disabled={!selectedDivision}
            className={`w-full text-xs sm:text-sm font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all ${
              !selectedDivision ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <option value="">{t.allDistricts}</option>
            {districtsList.map((dis) => (
              <option key={dis} value={dis}>
                {dis} {language === 'bn' ? 'জেলা' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Upazila Selector */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 mb-1">
            ৩. {t.upazila}
          </label>
          <select
            value={selectedUpazila}
            onChange={(e) => setSelectedUpazila(e.target.value)}
            disabled={!selectedDistrict}
            className={`w-full text-xs sm:text-sm font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all ${
              !selectedDistrict ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <option value="">{t.allUpazilas}</option>
            {upazilasList.map((upz) => (
              <option key={upz} value={upz}>
                {upz} {language === 'bn' ? 'উপজেলা/থানা' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Breadcrumb Indicator */}
      {(selectedDivision || selectedDistrict || selectedUpazila) && (
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-600 font-semibold overflow-x-auto">
          <span className="text-emerald-700">{language === 'bn' ? 'নির্বাচিত এলাকা:' : 'Selected:'}</span>
          <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
            {selectedDivision || t.allDivisions}
          </span>
          {selectedDistrict && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                {selectedDistrict}
              </span>
            </>
          )}
          {selectedUpazila && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                {selectedUpazila}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};
