import React from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { Compass, ArrowRight, ShieldCheck, MapPin, Building, GraduationCap } from 'lucide-react';

interface LearnToFieldSectionProps {
  onNavigateToTat: () => void;
  onNavigateToSettlement: () => void;
}

export const LearnToFieldSection: React.FC<LearnToFieldSectionProps> = ({
  onNavigateToTat,
  onNavigateToSettlement,
}) => {
  const { t, language } = useTranslation();

  return (
    <section id="learn-field-section" className="py-20 bg-[#0C0C0E] relative border-t border-[#222127] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Card */}
        <div className="p-6 sm:p-10 rounded-2xl bg-[#111115] border border-[#2B2A30] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A059]/30 bg-[#17171E] text-[11px] font-mono tracking-[0.2em] text-[#C5A059] uppercase font-bold">
                <Compass className="w-3.5 h-3.5" />
                <span>{t.learnToField.badge}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FAF9F6] leading-tight">
                {t.learnToField.title}
              </h2>

              <div className="text-base sm:text-lg font-bold text-[#C5A059]">
                {t.learnToField.highlight}
              </div>

              <p className="text-xs sm:text-sm text-[#9E978A] leading-relaxed max-w-2xl">
                {t.learnToField.subCopy}
              </p>

              {/* 4 Inspection Points Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                <div className="p-2.5 rounded bg-[#16161C] border border-[#222127] text-center space-y-1">
                  <Building className="w-3.5 h-3.5 mx-auto text-[#C5A059]" />
                  <div className="text-[11px] font-medium text-[#FAF9F6]">{language === 'ko' ? '타운하우스 & 주거' : 'Housing'}</div>
                </div>
                <div className="p-2.5 rounded bg-[#16161C] border border-[#222127] text-center space-y-1">
                  <GraduationCap className="w-3.5 h-3.5 mx-auto text-[#C5A059]" />
                  <div className="text-[11px] font-medium text-[#FAF9F6]">{language === 'ko' ? '국제학교 탐방' : 'Schools'}</div>
                </div>
                <div className="p-2.5 rounded bg-[#16161C] border border-[#222127] text-center space-y-1">
                  <MapPin className="w-3.5 h-3.5 mx-auto text-[#C5A059]" />
                  <div className="text-[11px] font-medium text-[#FAF9F6]">{language === 'ko' ? '생활권 검증' : 'Daily Life'}</div>
                </div>
                <div className="p-2.5 rounded bg-[#16161C] border border-[#222127] text-center space-y-1">
                  <ShieldCheck className="w-3.5 h-3.5 mx-auto text-[#C5A059]" />
                  <div className="text-[11px] font-medium text-[#FAF9F6]">{language === 'ko' ? '정착 로드맵' : 'Roadmap'}</div>
                </div>
              </div>

              {/* Funnel Next CTA Buttons */}
              <div className="flex flex-wrap gap-3 pt-3">
                <button
                  id="btn-learn-to-tat"
                  onClick={onNavigateToTat}
                  className="px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-[#0A0A0C] bg-[#C5A059] hover:bg-[#D4B06A] rounded transition-all flex items-center gap-2 group"
                >
                  <span>{t.learnToField.tatBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  id="btn-learn-to-settlement"
                  onClick={onNavigateToSettlement}
                  className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#FAF9F6] bg-[#17171E] hover:bg-[#202028] border border-[#2B2A30] hover:border-[#C5A059]/50 rounded transition-all flex items-center gap-2"
                >
                  <span>{t.learnToField.settlementBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Card */}
            <div className="lg:col-span-4">
              <div className="rounded-xl overflow-hidden border border-[#222127] bg-[#141418]">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                  alt="Dubai luxury residential living"
                  className="w-full h-44 object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4 space-y-1.5 bg-[#121216]">
                  <div className="text-[10px] font-mono text-[#C5A059] tracking-widest uppercase">
                    TAT DUBAI IMMERSION
                  </div>
                  <h4 className="text-sm font-bold text-[#FAF9F6]">
                    {language === 'ko' ? '두바이 7일간의 정착 시뮬레이션' : '7-Day Dubai Living Simulation'}
                  </h4>
                  <p className="text-xs text-[#9E978A] leading-relaxed">
                    {language === 'ko'
                      ? '전담 어드바이저가 밀착 동행하여 타운하우스 주거 단지, 학교, 인프라를 직접 검증하는 프리미엄 필드 트립.'
                      : 'A dedicated relocation due diligence expedition with verified local directors.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Step Funnel Diagram */}
        <div className="text-center space-y-4 pt-2">
          <div className="text-xs font-mono tracking-[0.2em] text-[#C5A059] uppercase font-bold">
            {t.funnelSummary.title}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#FAF9F6]">
            {t.funnelSummary.subtitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-[#111115] border border-[#222127] space-y-1.5">
              <div className="text-xs font-mono font-bold text-[#C5A059]">STEP 01 · LEARN</div>
              <h4 className="text-sm font-bold text-[#FAF9F6]">{language === 'ko' ? '두바이 배우기' : 'Learn Dubai'}</h4>
              <p className="text-xs text-[#9E978A]">무료 실전 세미나 & 1:1 Q&A로 핵심 1% 지식 습득</p>
            </div>

            <div className="p-4 rounded-xl bg-[#15151B] border border-[#C5A059]/40 space-y-1.5 shadow-sm">
              <div className="text-xs font-mono font-bold text-[#C5A059]">STEP 02 · FIELD</div>
              <h4 className="text-sm font-bold text-[#FAF9F6]">{language === 'ko' ? 'TAT 두바이 일주일살이' : 'TAT Dubai 1-Week'}</h4>
              <p className="text-xs text-[#9E978A]">타운하우스 살 곳과 학교를 현장 직접 검증</p>
            </div>

            <div className="p-4 rounded-xl bg-[#111115] border border-[#222127] space-y-1.5">
              <div className="text-xs font-mono font-bold text-[#C5A059]">STEP 03 · DECIDE</div>
              <h4 className="text-sm font-bold text-[#FAF9F6]">{language === 'ko' ? 'ILAC 이민·정착지원' : 'ILAC Settlement'}</h4>
              <p className="text-xs text-[#9E978A]">안전한 정착 · 부동산 매입 · 법인 설립 원스톱 실행</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

