import React, { useState } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { EDUCATION_FIELDS } from '../data/academyData';
import { ShieldCheck, Home, GraduationCap, Building2, TrendingUp, Briefcase, ChevronDown, Check, ArrowRight } from 'lucide-react';

interface EducationFieldsSectionProps {
  onSelectFieldForQnA: (categoryKo: string) => void;
  onOpenScheduleModal: () => void;
}

export const EducationFieldsSection: React.FC<EducationFieldsSectionProps> = ({
  onSelectFieldForQnA,
  onOpenScheduleModal,
}) => {
  const { t, language } = useTranslation();
  const [expandedId, setExpandedId] = useState<string | null>('immigration');

  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4" />;
      case 'Home': return <Home className="w-4 h-4" />;
      case 'GraduationCap': return <GraduationCap className="w-4 h-4" />;
      case 'Building2': return <Building2 className="w-4 h-4" />;
      case 'TrendingUp': return <TrendingUp className="w-4 h-4" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4" />;
      default: return <ShieldCheck className="w-4 h-4" />;
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="curriculum-section" className="py-20 bg-[#0C0C0E] relative border-t border-[#222127] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A059]/30 bg-[#141418] text-[11px] font-mono tracking-[0.2em] text-[#C5A059] uppercase">
            {t.fields.subtitle}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FAF9F6]">
            {t.fields.title}
          </h2>
          <p className="text-sm text-[#9E978A] leading-relaxed">
            {t.fields.desc}
          </p>
        </div>

        {/* 6 Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EDUCATION_FIELDS.map((field) => {
            const isExpanded = expandedId === field.id;
            const title = language === 'ko' ? field.titleKo : field.titleEn;
            const subtitle = language === 'ko' ? field.subtitleKo : field.subtitleEn;
            const description = language === 'ko' ? field.descriptionKo : field.descriptionEn;
            const items = language === 'ko' ? field.itemsKo : field.itemsEn;
            const highlight = language === 'ko' ? field.highlightKo : field.highlightEn;

            return (
              <div
                key={field.id}
                className={`rounded-xl transition-all flex flex-col justify-between overflow-hidden border ${
                  isExpanded
                    ? 'bg-[#141419] border-[#C5A059]/50 shadow-lg'
                    : 'bg-[#101014] border-[#222127] hover:border-[#C5A059]/30'
                }`}
              >
                <div className="p-5 sm:p-6 space-y-3.5">
                  {/* Card Top: Number & Category Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold tracking-widest text-[#C5A059]">
                      {field.number} · {field.category}
                    </span>
                    <div className="p-1.5 rounded bg-[#18181F] text-[#C5A059] border border-[#C5A059]/20">
                      {getIcon(field.iconName)}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-[#FAF9F6]">
                      {title}
                    </h3>
                    <p className="text-xs text-[#9E978A] leading-relaxed">
                      {subtitle}
                    </p>
                  </div>

                  {/* Summary description */}
                  <p className="text-xs text-[#7A7468] leading-relaxed line-clamp-2">
                    {description}
                  </p>

                  {/* Key Highlight Pill */}
                  <div className="p-2 rounded bg-[#17171E] border border-[#2B2A30] text-[11px] text-[#D8D2C7] flex items-start gap-2">
                    <span className="text-[#C5A059] font-bold text-[10px]">FOCUS</span>
                    <span className="leading-snug">{highlight}</span>
                  </div>

                  {/* Expanded Curriculum Checklist */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-[#222127] space-y-2 animate-in fade-in duration-200">
                      <div className="text-[10px] font-mono tracking-wider text-[#8C8578] uppercase">
                        {language === 'ko' ? '세부 교육 항목' : 'Curriculum Modules'}
                      </div>
                      <ul className="space-y-1.5 text-xs text-[#D8D2C7]">
                        {items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 leading-relaxed">
                            <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="px-5 py-3 bg-[#0C0C0E] border-t border-[#1C1B21] flex items-center justify-between">
                  <button
                    onClick={() => toggleExpand(field.id)}
                    className="text-xs font-medium text-[#C5A059] hover:text-[#FAF9F6] flex items-center gap-1 transition-colors"
                  >
                    <span>{isExpanded ? (language === 'ko' ? '접기' : 'Collapse') : (language === 'ko' ? '커리큘럼 보기' : 'View Details')}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  <button
                    onClick={() => onSelectFieldForQnA(field.titleKo)}
                    className="text-[11px] text-[#7A7468] hover:text-[#C5A059] flex items-center gap-1 transition-colors"
                  >
                    <span>{language === 'ko' ? '질문하기' : 'Ask Q&A'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="p-5 sm:p-6 rounded-xl bg-[#141418] border border-[#2B2A30] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center sm:text-left">
            <h4 className="text-base font-bold text-[#FAF9F6]">
              {language === 'ko' ? '모든 아카데미 교육 과정은 무료로 진행됩니다.' : 'All ILAC Academy Masterclasses are Complimentary.'}
            </h4>
            <p className="text-xs text-[#9E978A]">
              {language === 'ko' ? '매주 토요일 현직 전문가 직강 및 실시간 질의응답 참여 가능' : 'Live Saturday sessions with verified Dubai practitioners & instant Q&A'}
            </p>
          </div>

          <button
            onClick={onOpenScheduleModal}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0A0A0C] bg-[#C5A059] hover:bg-[#D4B06A] rounded transition-all shrink-0"
          >
            {t.liveAcademy.viewScheduleBtn}
          </button>
        </div>
      </div>
    </section>
  );
};

