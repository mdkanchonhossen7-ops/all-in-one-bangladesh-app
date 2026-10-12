import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JobCircular } from '../../types';
import {
  Briefcase,
  Sparkles,
  ExternalLink,
  Calendar,
  Building,
  DollarSign,
  Bot,
  Filter,
} from 'lucide-react';

export const JobPortalSection: React.FC = () => {
  const { jobs, language, t } = useApp();
  const [jobType, setJobType] = useState<'all' | 'govt' | 'private'>('all');

  const filtered = jobs.filter((j) => (jobType === 'all' ? true : j.type === jobType));

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white rounded-2xl p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold text-emerald-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'bn' ? 'AI অটো-স্ক্র্যাপার ও সারসংক্ষেপ' : 'AI Automated Job Scraper & Summarizer'}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
              {language === 'bn' ? 'সরকারি ও বেসরকারি চাকরির নিয়োগ পোর্টাল' : 'Govt & Private Career Vacancy Portal'}
            </h3>
            <p className="text-xs text-emerald-100 max-w-xl">
              {language === 'bn'
                ? 'দৈনিক বিসিএস, প্রাথমিক শিক্ষক ও শীর্ষ প্রতিষ্ঠানের সার্কুলারগুলো Gemini AI দ্বারা সংক্ষিপ্ত আকারে প্রকাশিত।'
                : 'Daily scraping of public gazettes and private career notices summarized into key applicant bullets.'}
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setJobType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                jobType === 'all' ? 'bg-white text-emerald-900 shadow-xs' : 'bg-white/10 text-white'
              }`}
            >
              {language === 'bn' ? 'সকল চাকরি' : 'All Jobs'}
            </button>
            <button
              onClick={() => setJobType('govt')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                jobType === 'govt' ? 'bg-white text-emerald-900 shadow-xs' : 'bg-white/10 text-white'
              }`}
            >
              🏛️ {language === 'bn' ? 'সরকারি' : 'Govt'}
            </button>
            <button
              onClick={() => setJobType('private')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                jobType === 'private' ? 'bg-white text-emerald-900 shadow-xs' : 'bg-white/10 text-white'
              }`}
            >
              🏢 {language === 'bn' ? 'বেসরকারি' : 'Private'}
            </button>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span
                  className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                    job.type === 'govt'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : 'bg-blue-100 text-blue-800 border border-blue-200'
                  }`}
                >
                  {job.type === 'govt'
                    ? language === 'bn'
                      ? 'সরকারি বিজ্ঞপ্তি'
                      : 'Govt Circular'
                    : language === 'bn'
                    ? 'বেসরকারি প্রতিষ্ঠান'
                    : 'Private Company'}
                </span>

                {job.isAiScraped && (
                  <span className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
                    <Bot className="w-3 h-3 text-emerald-600" />
                    <span>AI Scraped</span>
                  </span>
                )}
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {language === 'bn' ? job.titleBn : job.title}
                </h4>
                <p className="text-xs font-semibold text-slate-500 flex items-center gap-1 mt-1">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>{language === 'bn' ? job.organizationBn : job.organization}</span>
                </p>
              </div>

              {/* Meta details */}
              <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-1.5 border border-slate-100">
                <div className="flex items-center justify-between text-slate-600">
                  <span>{language === 'bn' ? 'পদসংখ্যা:' : 'Vacancies:'}</span>
                  <strong className="text-slate-900">{job.vacancies}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>{language === 'bn' ? 'বেতন স্কেল:' : 'Salary:'}</span>
                  <span className="font-bold text-emerald-700">{job.salary}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-200">
                  <span className="flex items-center gap-1 text-rose-600 font-semibold">
                    <Calendar className="w-3 h-3" />
                    {language === 'bn' ? 'আবেদনের শেষ তারিখ:' : 'Deadline:'}
                  </span>
                  <span className="font-extrabold text-rose-700">{job.deadline}</span>
                </div>
              </div>

              {/* AI Summary */}
              <div className="text-xs text-slate-600 leading-relaxed bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                <span className="font-bold text-emerald-800 block mb-0.5 text-[11px]">
                  {language === 'bn' ? '💡 এআই সংক্ষেপ:' : '💡 AI Brief:'}
                </span>
                {language === 'bn' ? job.summaryBn : job.summary}
              </div>
            </div>

            {/* Apply Button */}
            <div className="pt-2">
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-xs transition-colors"
              >
                <span>{language === 'bn' ? 'আবেদন ও বিস্তারিত সার্কুলার' : 'Apply & Full Circular'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
