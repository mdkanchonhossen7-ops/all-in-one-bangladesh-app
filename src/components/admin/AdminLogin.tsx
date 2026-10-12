import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, ShieldAlert, KeyRound, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { loginAdmin, language, t } = useApp();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (!success) {
      setError(true);
      setAttempts((a) => a + 1);
    } else {
      setError(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Top Security Banner */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 text-white p-7 text-center relative">
          <div className="w-16 h-16 rounded-2xl bg-white p-1 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-3 shadow-lg">
            <img src="/logo.png" alt="ALL IN ONE BANGLADESH" className="w-full h-full object-contain" />
          </div>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-bold tracking-wider uppercase border border-rose-500/30 mb-1">
            Restricted System Zone
          </span>
          <h2 className="text-xl font-black tracking-tight">{t.adminPanelTitle}</h2>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            HOST: admin.allinonebangladesh.com
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleLogin} className="p-7 space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-bold flex items-center gap-2 animate-shake">
              <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
              <div>
                <p>{t.wrongPassword}</p>
                <p className="text-[10px] text-rose-600 mt-0.5">
                  {language === 'bn' ? `ব্যর্থ চেষ্টা: ${attempts}/৫` : `Failed attempts: ${attempts}/5`}
                </p>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span>{t.masterPasswordLabel}</span>
              <span className="text-[10px] text-slate-400 font-normal">Required: Dexdark342156</span>
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder={t.masterPasswordPlaceholder}
                className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white font-mono transition-all"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {language === 'bn'
                ? 'অননুমোদিত আইপি এবং একাধিক অসফল পাসওয়ার্ড প্রচেষ্টা সিস্টেমে সংরক্ষিত হচ্ছে।'
                : 'Unauthorized IP attempts are strictly logged with multi-layer token security.'}
            </span>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-700 hover:to-red-800 text-white font-bold text-sm shadow-lg shadow-rose-600/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>{t.loginBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
