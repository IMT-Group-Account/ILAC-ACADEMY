import React, { useState } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { REAL_STORIES } from '../data/academyData';
import { Sparkles, ChevronDown, CheckCircle2, Clock, User, AlertCircle, ArrowRight } from 'lucide-react';

interface RealStoriesSectionProps {
  onOpenConsultationModal: () => void;
}

export const RealStoriesSection: React.FC<RealStoriesSectionProps> = ({
  onOpenConsultationModal,
}) => {
  const { t, language } = useTranslation();
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>('case-1');

  return (
    <section id="stories-section" className="py-20 bg-[#09090B] relative border-t border-[#222127] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A059]/30 bg-[#141418] text-[11px] font-mono tracking-[0.2em] text-[#C5A059] uppercase">
            {t.stories.subtitle}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FAF9F6]">
            {t.stories.title}
          </h2>
          <p className="text-sm text-[#9E978A] leading-relaxed">
            {t.stories.desc}
          </p>
        </div>

        {/* Real Stories Accordion Cards */}
        <div className="space-y-3 max-w-4xl mx-auto">
          {REAL_STORIES.map((story) => {
            const isExpanded = expandedCaseId === story.id;
            const badge = language === 'ko' ? story.badgeKo : story.badgeEn;
            const title = language === 'ko' ? story.titleKo : story.titleEn;
            const summary = language === 'ko' ? story.summaryKo : story.summaryEn;
            const profile = language === 'ko' ? story.clientProfileKo : story.clientProfileEn;
            const challenge = language === 'ko' ? story.challengeKo : story.challengeEn;
            const solution = language === 'ko' ? story.solutionKo : story.solutionEn;
            const result = language === 'ko' ? story.resultKo : story.resultEn;
            const timeline = language === 'ko' ? story.timelineKo : story.timelineEn;
            const tag = language === 'ko' ? story.tagKo : story.tagEn;

            return (
              <div
                key={story.id}
                className={`rounded-xl border transition-all overflow-hidden ${
                  isExpanded
                    ? 'bg-[#121217] border-[#C5A059]/50'
                    : 'bg-[#101014] border-[#222127] hover:border-[#C5A059]/30'
                }`}
              >
                {/* Header Summary Row */}
                <button
                  onClick={() => setExpandedCaseId(isExpanded ? null : story.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#C5A059]/20 text-[#C5A059] text-[10px] font-mono font-bold">
                        {story.caseNumber}
                      </span>
                      <span className="text-xs text-[#9E978A] font-medium border-l border-[#2B2A30] pl-2">
                        {badge}
                      </span>
                      <span className="text-[11px] font-mono text-[#7A7468] hidden sm:inline">
                        {tag}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#FAF9F6] leading-snug">
                      {title}
                    </h3>

                    <p className="text-xs text-[#9E978A]">
                      {summary}
                    </p>
                  </div>

                  <div className="p-1.5 rounded-full bg-[#18181F] border border-[#2B2A30] text-[#C5A059] shrink-0 mt-1 sm:mt-0">
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Expanded Deep Dive Details */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-[#1E1D24] space-y-4 animate-in fade-in">
                    {/* Profile & Timeline Bar */}
                    <div className="flex flex-wrap gap-4 p-3 rounded-lg bg-[#16161D] border border-[#222127] text-xs">
                      <div className="flex items-center gap-2 text-[#FAF9F6]">
                        <User className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span className="font-semibold">{language === 'ko' ? '고객 프로필:' : 'Client:'}</span>
                        <span className="text-[#9E978A]">{profile}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#FAF9F6] sm:ml-auto">
                        <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span className="font-semibold">{language === 'ko' ? '소요 기간:' : 'Timeline:'}</span>
                        <span className="text-[#C5A059] font-mono">{timeline}</span>
                      </div>
                    </div>

                    {/* 3 Step Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      {/* Challenge */}
                      <div className="p-3.5 rounded-lg bg-[#15151B] border border-[#222127] space-y-1.5">
                        <div className="flex items-center gap-1.5 text-rose-400 font-semibold font-mono text-[10px]">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>01. INITIAL CHALLENGE</span>
                        </div>
                        <p className="text-[#9E978A] leading-relaxed">
                          {challenge}
                        </p>
                      </div>

                      {/* Solution */}
                      <div className="p-3.5 rounded-lg bg-[#17171E] border border-[#C5A059]/30 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[#C5A059] font-semibold font-mono text-[10px]">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>02. ILAC SOLUTION</span>
                        </div>
                        <p className="text-[#D8D2C7] leading-relaxed">
                          {solution}
                        </p>
                      </div>

                      {/* Result */}
                      <div className="p-3.5 rounded-lg bg-[#111A15] border border-emerald-500/30 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold font-mono text-[10px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>03. OUTCOME</span>
                        </div>
                        <p className="text-[#C7E5D2] leading-relaxed">
                          {result}
                        </p>
                      </div>
                    </div>

                    {/* Consultation trigger banner inside story */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-lg bg-[#141418] border border-[#222127]">
                      <span className="text-xs text-[#9E978A]">
                        {language === 'ko'
                          ? '비슷한 조건과 고민을 가지고 계신가요? 1:1 맞춤 진단을 시작하세요.'
                          : 'Facing similar considerations? Schedule a private 1:1 diagnostic session.'}
                      </span>
                      <button
                        onClick={onOpenConsultationModal}
                        className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0A0A0C] bg-[#C5A059] hover:bg-[#D4B06A] rounded transition-all shrink-0 flex items-center gap-1.5"
                      >
                        <span>{language === 'ko' ? '정착 상담 신청' : 'Request Consultation'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

