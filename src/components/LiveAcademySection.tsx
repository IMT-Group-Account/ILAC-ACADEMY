import React from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { ACADEMY_SESSIONS } from '../data/academyData';
import { Clock, Users, ArrowUpRight, Video } from 'lucide-react';
import { AcademySession } from '../types';

interface LiveAcademySectionProps {
  onOpenScheduleModal: () => void;
  onSelectSessionToApply: (session: AcademySession) => void;
}

export const LiveAcademySection: React.FC<LiveAcademySectionProps> = ({
  onOpenScheduleModal,
  onSelectSessionToApply,
}) => {
  const { t, language } = useTranslation();

  return (
    <section id="live-academy-section" className="py-20 bg-[#09090B] relative border-t border-[#222127] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A059]/30 bg-[#141418] text-[11px] font-mono tracking-[0.2em] text-[#C5A059] uppercase">
            {t.liveAcademy.subtitle}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FAF9F6] leading-tight">
            {t.liveAcademy.title}
          </h2>
          <p className="text-sm text-[#9E978A] leading-relaxed">
            {t.liveAcademy.desc}
          </p>
        </div>

        {/* 4 Next Scheduled Sessions Clean Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ACADEMY_SESSIONS.slice(0, 4).map((session) => {
            const title = language === 'ko' ? session.titleKo : session.titleEn;
            const description = language === 'ko' ? session.descriptionKo : session.descriptionEn;
            const target = language === 'ko' ? session.targetAudienceKo : session.targetAudienceEn;
            const speaker = language === 'ko' ? session.speakerKo : session.speakerEn;
            const day = language === 'ko' ? session.dayKo : session.dayEn;

            return (
              <div
                key={session.id}
                className="p-6 rounded-xl bg-[#111115] border border-[#222127] hover:border-[#C5A059]/40 transition-all flex flex-col justify-between space-y-5 group"
              >
                {/* Top Bar: Date & Status Badge */}
                <div className="flex items-center justify-between border-b border-[#1E1D24] pb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="px-2.5 py-1 rounded bg-[#181820] border border-[#2B2A32] text-center">
                      <div className="text-xs font-mono font-bold text-[#C5A059]">{session.date.split('.')[1]}.{session.date.split('.')[2]}</div>
                      <div className="text-[10px] text-[#8C8578] uppercase font-mono">{day}</div>
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[#C5A059] tracking-wider uppercase">
                        TOPIC {session.topicNumber} · {session.category}
                      </div>
                      <div className="text-[11px] text-[#7A7468] flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3 h-3 text-[#C5A059]" />
                        <span>{session.time}</span>
                      </div>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase font-semibold ${
                    session.status === 'CLOSING_SOON'
                      ? 'bg-amber-950/40 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {session.status === 'CLOSING_SOON' ? (language === 'ko' ? '마감 임박' : 'Closing Soon') : (language === 'ko' ? '신청 가능' : 'Open')}
                  </span>
                </div>

                {/* Session Main Body */}
                <div className="space-y-2.5">
                  <h3 className="text-base sm:text-lg font-bold text-[#FAF9F6] group-hover:text-[#C5A059] transition-colors leading-snug">
                    {title}
                  </h3>
                  <p className="text-xs text-[#9E978A] leading-relaxed">
                    {description}
                  </p>

                  <div className="pt-2 space-y-1 text-[11px] text-[#7A7468]">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      <span className="text-[#C8C2B7] font-medium">{language === 'ko' ? '추천 대상:' : 'Target:'}</span>
                      <span className="text-[#9E978A]">{target}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      <span className="text-[#C8C2B7] font-medium">{language === 'ko' ? '방식:' : 'Format:'}</span>
                      <span className="text-[#9E978A]">현장 라운지 직강 & 실시간 줌 라이브 Q&A</span>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-3.5 border-t border-[#1E1D24] flex items-center justify-between">
                  <div className="text-[11px] text-[#8C8578]">
                    <span className="text-[#C8C2B7] font-medium">{speaker}</span>
                  </div>

                  <button
                    onClick={() => onSelectSessionToApply(session)}
                    className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0A0A0C] bg-[#C5A059] hover:bg-[#D4B06A] rounded transition-all flex items-center gap-1.5"
                  >
                    <span>{t.scheduleModal.reserveBtn}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center CTA Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={onOpenScheduleModal}
            className="px-6 py-3 text-xs font-bold uppercase tracking-[0.1em] text-[#0A0A0C] bg-[#C5A059] hover:bg-[#D4B06A] rounded shadow-md transition-all"
          >
            {t.liveAcademy.viewScheduleBtn}
          </button>
        </div>
      </div>
    </section>
  );
};

