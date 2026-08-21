import React from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { ArrowUpRight, Calendar, Compass, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenScheduleModal: () => void;
  onOpenConsultationModal: () => void;
  onNavigateToTat: () => void;
  onNavigateToSettlement: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenScheduleModal,
  onOpenConsultationModal,
  onNavigateToTat,
  onNavigateToSettlement,
}) => {
  const { t, language } = useTranslation();

  return (
    <section id="hero-section" className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden bg-[#0A0A0C] font-sans">
      {/* Clean, Subtle Dark Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#C5A059]/5 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#C5A05908_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Clear & Focused Typography */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Minimalist Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C5A059]/30 bg-[#141418] text-[11px] font-mono tracking-[0.2em] text-[#C5A059] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Slogan & Title */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF9F6] leading-[1.2]">
                {language === 'ko' ? (
                  <>
                    두바이를 배우는 가장 확실한 시작,
                    <br />
                    <span className="text-[#C5A059]">ILAC ACADEMY</span>
                  </>
                ) : (
                  <>
                    Learn First,
                    <br />
                    <span className="text-[#C5A059]">Decide Better.</span>
                  </>
                )}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-[#C8C2B7] tracking-wide">
                {t.brand.subCopy}
              </p>
            </div>

            {/* Prominent Key Text 1: Emphasized Range */}
            <div className="p-4 sm:p-4.5 rounded-xl bg-[#121216] border-l-2 border-l-[#C5A059] border-y border-r border-[#26252C] shadow-md">
              <div className="text-xs font-mono text-[#C5A059] tracking-wider uppercase mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>ALL-IN-ONE EXPERTISE</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#FAF9F6] leading-snug">
                {language === 'ko'
                  ? '두바이 이민부터 정착, 자녀 교육, 부동산, 투자, 자산 해외 이전, 금융·법률·비즈니스까지.'
                  : 'From Dubai immigration, settlement, elite schooling, real estate, investment, cross-border asset transfer to finance, legal & enterprise.'}
              </p>
            </div>

            {/* Prominent Key Text 2: Emphasized 1% Information */}
            <div className="text-sm sm:text-base text-[#A8A193] leading-relaxed space-y-1.5">
              <p>
                {language === 'ko' ? (
                  <>
                    인터넷에 흩어져있는 누구나 아는 정보가 아니라{' '}
                    <span className="text-[#FAF9F6] font-bold border-b border-[#C5A059] pb-0.5 text-base sm:text-lg">
                      꼭 필요한 1%의 정보
                    </span>
                    를 배우고 직접 질문하세요.
                  </>
                ) : (
                  <>
                    Gain not ordinary web rumors, but the{' '}
                    <span className="text-[#FAF9F6] font-bold border-b border-[#C5A059] pb-0.5">
                      essential 1% verified intelligence
                    </span>{' '}
                    and consult certified experts directly.
                  </>
                )}
              </p>
              <p className="text-xs sm:text-sm text-[#8C8578] font-medium">
                {language === 'ko'
                  ? '※ ILAC의 모든 정기 아카데미 프로그램은 무료로 진행됩니다.'
                  : '※ All regular ILAC Academy sessions are complimentary.'}
              </p>
            </div>

            {/* 3 Clean Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                id="btn-hero-schedule"
                onClick={onOpenScheduleModal}
                className="px-6 py-3 text-xs font-bold tracking-[0.1em] uppercase text-[#0A0A0C] bg-[#C5A059] hover:bg-[#D4B06A] rounded shadow-md transition-all flex items-center gap-2 group"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t.hero.freeJoin}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                id="btn-hero-tat-tour"
                onClick={onNavigateToTat}
                className="px-6 py-3 text-xs font-semibold tracking-[0.1em] uppercase text-[#FAF9F6] bg-[#16161A] hover:bg-[#202026] border border-[#C5A059]/40 rounded hover:border-[#C5A059] transition-all flex items-center gap-2 group"
              >
                <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{t.hero.tatTour}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A059] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                id="btn-hero-settlement-service"
                onClick={onNavigateToSettlement}
                className="px-6 py-3 text-xs font-semibold tracking-[0.1em] uppercase text-[#DCD6CA] bg-[#111114] hover:bg-[#1A1A1F] border border-[#2B2A30] rounded hover:border-[#C5A059]/50 transition-all flex items-center gap-2 group"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{t.hero.settlementService}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A059] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Clean Editorial Session Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden bg-[#121216] border border-[#2B2A30] shadow-xl">
              {/* Clean Image */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-[#18181D]">
                <img
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80"
                  alt="Dubai skyline architectural prestige"
                  className="w-full h-full object-cover object-center filter contrast-105 brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent" />
                
                {/* Clean Status Badge */}
                <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0A0A0C]/90 backdrop-blur-md border border-[#C5A059]/30 text-[10px] font-mono uppercase tracking-widest text-[#FAF9F6]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>2026 ACADEMY OPEN</span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                  <span className="text-[#C5A059] font-medium tracking-wide">ILAC Advisory Council</span>
                  <span className="text-[#A39C90] text-[11px]">Seoul Gangnam Lounge</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs text-[#8C8578] border-b border-[#222127] pb-3 font-mono">
                  <span className="tracking-wider uppercase">UPCOMING SESSION</span>
                  <span className="text-[#C5A059] font-semibold">08.29 SAT 11:00 AM</span>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono text-[#C5A059] tracking-wider">TOPIC 01 · IMMIGRATION & HOUSING</div>
                  <h3 className="text-base font-bold text-[#FAF9F6] leading-snug">
                    {language === 'ko'
                      ? '두바이 이민의 시작: 비자 제도와 성공적인 이주 로드맵'
                      : 'The Genesis of Dubai Relocation: Visas & Strategic Master Plan'}
                  </h3>
                  <p className="text-xs text-[#9E978A] leading-relaxed">
                    {language === 'ko'
                      ? '골든비자 자격 요건, 가족 동반 절차 및 안전한 거주지 선택 실무 가이드'
                      : 'Essential visa classifications, Golden Visa qualifications, and timeline preparation.'}
                  </p>
                </div>

                <button
                  id="btn-hero-card-rsvp"
                  onClick={onOpenScheduleModal}
                  className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-[#0A0A0C] bg-[#C5A059] hover:bg-[#D4B06A] rounded transition-colors text-center block"
                >
                  {t.scheduleModal.reserveBtn}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Keywords Strip */}
        <div className="pt-6 border-t border-[#222127]">
          <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2 text-[11px] font-mono tracking-[0.2em] text-[#7A7468] uppercase">
            {t.hero.keywords.map((kw, idx) => (
              <React.Fragment key={kw}>
                <span className="hover:text-[#C5A059] transition-colors cursor-default">
                  {kw}
                </span>
                {idx < t.hero.keywords.length - 1 && (
                  <span className="text-[#3A383E] hidden sm:inline">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

