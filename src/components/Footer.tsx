import React from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { AppRoute } from '../types';
import { MapPin, Mail, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  setCurrentRoute: (route: AppRoute) => void;
  onOpenScheduleModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentRoute,
  onOpenScheduleModal,
}) => {
  const { t, language } = useTranslation();

  const handleLinkClick = (route: AppRoute, sectionId?: string) => {
    setCurrentRoute(route);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="main-footer" className="bg-[#070709] border-t border-[#c5a880]/20 text-[#a8a193] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-14">
        {/* Top Funnel Motto Banner */}
        <div className="p-8 rounded-2xl bg-[#111115] border border-[#c5a880]/25 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="text-[11px] font-mono tracking-[0.2em] text-[#c5a880] uppercase">
              {t.brand.slogan}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-editorial-serif text-[#fbf9f5]">
              {language === 'ko'
                ? '두바이를 알아가는 것부터 두바이에서 살아가는 것까지'
                : 'From Understanding Dubai to Living Flourishingly'}
            </h3>
            <p className="text-xs text-[#8e877a]">
              {language === 'ko'
                ? '두바이 배우기 → 두바이 일주일살이 → ILAC이민·정착지원'
                : 'Learn Dubai → 1-Week Dubai Immersion → ILAC Settlement Services'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenScheduleModal}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0d0d10] bg-[#c5a880] hover:bg-[#d8be96] rounded transition-all"
            >
              {t.nav.freeCta}
            </button>
            <button
              onClick={() => handleLinkClick('tat')}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#fbf9f5] bg-[#1a1a1f] border border-[#c5a880]/30 hover:border-[#c5a880] rounded transition-all"
            >
              {t.nav.tatCta}
            </button>
            <button
              onClick={() => handleLinkClick('settlement')}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#fbf9f5] bg-[#1a1a1f] border border-[#c5a880]/30 hover:border-[#c5a880] rounded transition-all"
            >
              {t.nav.settlementCta}
            </button>
          </div>
        </div>

        {/* Footer Info Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 text-xs">
          {/* Brand Info & Address (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-[0.18em] font-brand-display text-[#f6f4ee]">
                ILAC
              </span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium border-l border-[#c5a880]/40 pl-2">
                ACADEMY
              </span>
            </div>

            <p className="text-xs text-[#9b9487] leading-relaxed max-w-md">
              {language === 'ko'
                ? '두바이 이민, 자녀 교육, 정착, 부동산, 투자 및 자산 이전을 위한 실전 프리미엄 아카데미 플랫폼입니다.'
                : 'Premium education and consulting platform for Dubai immigration, schooling, real estate, and asset reallocation.'}
            </p>

            <div className="space-y-2 pt-2 text-[#dcd6ca]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                <span>{t.brand.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#c5a880] shrink-0" />
                <span>{t.brand.email}</span>
              </div>
            </div>
          </div>

          {/* Academy Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-[11px] font-bold tracking-widest text-[#fbf9f5] uppercase">
              {language === 'ko' ? '두바이 배우기' : 'LEARN DUBAI'}
            </h4>
            <ul className="space-y-2.5 text-[#b5aea2]">
              <li>
                <button
                  onClick={() => handleLinkClick('home', 'curriculum-section')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  {t.nav.curriculum}
                </button>
              </li>
              <li>
                <button onClick={onOpenScheduleModal} className="hover:text-[#c5a880] transition-colors">
                  {t.nav.schedule}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('home', 'qna-section')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  {t.nav.qna}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('home', 'stories-section')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  {language === 'ko' ? '리얼 스토리' : 'Real Stories'}
                </button>
              </li>
            </ul>
          </div>

          {/* Discovery & Services Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-[11px] font-bold tracking-widest text-[#fbf9f5] uppercase">
              {language === 'ko' ? '현장 & 정착 서비스' : 'FIELD & SERVICES'}
            </h4>
            <ul className="space-y-2.5 text-[#b5aea2]">
              <li>
                <button onClick={() => handleLinkClick('tat')} className="hover:text-[#c5a880] transition-colors">
                  {t.nav.tatCta}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('settlement')} className="hover:text-[#c5a880] transition-colors">
                  {t.nav.settlementCta}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-[#1e1d23] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6d685e]">
          <div>{t.brand.copyright}</div>
          <div className="text-center sm:text-right">
            {language === 'ko'
              ? '본 웹사이트의 모든 콘텐츠는 ILAC ACADEMY 및 IMT GROUP의 지적 재산입니다.'
              : 'All content is the intellectual property of ILAC ACADEMY & IMT GROUP.'}
          </div>
        </div>
      </div>
    </footer>
  );
};
