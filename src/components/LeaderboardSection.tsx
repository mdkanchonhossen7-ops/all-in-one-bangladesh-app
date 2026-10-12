import React from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Award, Medal, ShieldCheck, Heart, UserPlus, Flame } from 'lucide-react';

export const LeaderboardSection: React.FC = () => {
  const { contributors, currentUser, language, t } = useApp();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 mb-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500 text-white shadow-xs">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {t.leaderboard}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'bn'
                ? 'রক্তদাতা, পুলিশ নাম্বার, দিনমজুর ও বাস কাউন্টারের তথ্য প্রদানকারী শীর্ষ নাগরিক'
                : 'Top community heroes contributing verified emergency & local directory listings'}
            </p>
          </div>
        </div>

        {/* Current user mini status */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-1.5 flex items-center gap-2 text-xs">
          <span className="font-semibold text-emerald-800">
            {language === 'bn' ? 'আপনার স্কোর:' : 'Your Score:'}
          </span>
          <span className="font-extrabold text-emerald-700 bg-white px-2 py-0.5 rounded shadow-xs">
            {currentUser.points} Pts
          </span>
          <span className="text-emerald-900 font-bold">• {currentUser.badge}</span>
        </div>
      </div>

      {/* Leaderboard Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {contributors.map((c, index) => {
          const isTop3 = index < 3;
          const badgeColor =
            index === 0
              ? 'bg-amber-100 text-amber-900 border-amber-300'
              : index === 1
              ? 'bg-slate-200 text-slate-800 border-slate-300'
              : index === 2
              ? 'bg-amber-700/10 text-amber-800 border-amber-700/20'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200';

          return (
            <div
              key={c.id}
              className={`relative rounded-xl p-3.5 border transition-all hover:shadow-md ${
                index === 0
                  ? 'border-amber-400 bg-gradient-to-b from-amber-50/50 to-white'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {/* Rank Badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1">
                {index === 0 && <Medal className="w-4 h-4 text-amber-500" />}
                <span className="text-xs font-black text-slate-400">#{c.rank}</span>
              </div>

              <div className="flex items-center gap-3 mb-2.5">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-500 shrink-0">
                  <img src={c.avatarUrl} alt={c.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 pr-6">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{c.name}</h4>
                  <p className="text-[11px] text-slate-500 truncate">{c.location}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                <span className={`px-2 py-0.5 rounded-full font-bold border ${badgeColor}`}>
                  {language === 'bn' ? c.badgeBn : c.badge}
                </span>
                <span className="font-extrabold text-emerald-700">{c.points} pts</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
