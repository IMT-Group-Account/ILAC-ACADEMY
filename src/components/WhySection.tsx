import React from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { HelpCircle, ChevronRight, CheckCircle2 } from 'lucide-react';

export const WhySection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="why-section" className="py-20 bg-[#09090B] relative overflow-hidden border-t border-[#222127] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A059]/30 bg-[#121216] text-[11px] font-mono tracking-[0.2em] text-[#C5A059] uppercase">
            {t.why.subtitle}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FAF9F6] leading-tight whitespace-pre-line">
            {t.why.title}
          </h2>
          <p className="text-sm sm:text-base text-[#9E978A] leading-relaxed">
            {t.why.problemDesc}
          </p>
        </div>

        {/* 5 Real Dilemma Questions Grid (Clean, balanced) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {t.why.questions.map((q, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-xl bg-[#121216] border border-[#222127] hover:border-[#C5A059]/40 transition-colors group ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded bg-[#1A1A20] text-[#C5A059] border border-[#C5A059]/20 shrink-0">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-[#7A7468] uppercase">
                    QUESTION 0{idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-[#FAF9F6] leading-snug">
                    “{q}”
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Dilemma Summary Card */}
          <div className="p-5 rounded-xl bg-[#171613] border border-[#C5A059]/30 flex flex-col justify-center text-left">
            <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider mb-1 block">
              THE CORE GAP
            </span>
            <p className="text-xs sm:text-sm font-semibold text-[#FAF9F6] leading-relaxed">
              {t.why.conclusion}
            </p>
          </div>
        </div>

        {/* Solution: 5-Stage Decision Framework (Clean & Linear) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#111115] border border-[#2B2A30] space-y-6">
          <div className="text-center space-y-1 max-w-xl mx-auto">
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#C5A059]">
              THE ILAC SOLUTION
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#FAF9F6]">
              {t.why.solutionTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#9E978A]">
              {t.why.solutionSubtitle}
            </p>
          </div>

          {/* 5-Step Clean Process */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative pt-2">
            {t.why.steps.map((item, idx) => (
              <div
                key={item.step}
                className="p-4 rounded-xl bg-[#16161B] border border-[#222127] hover:border-[#C5A059]/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#C5A059]">
                      {item.step}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[#7A7468] group-hover:text-[#C5A059] transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold text-[#FAF9F6] mb-1">
                    {item.label}
                  </h4>
                  <p className="text-xs text-[#9E978A] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {idx < 4 && (
                  <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-[#C5A059]/40 pointer-events-none">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

