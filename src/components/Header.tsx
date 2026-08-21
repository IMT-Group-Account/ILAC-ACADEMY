import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { AppRoute } from '../types';
import { Menu, X, Globe, ArrowRight } from 'lucide-react';

interface HeaderProps {
  currentRoute: AppRoute;
  setCurrentRoute: (route: AppRoute) => void;
  onOpenScheduleModal: () => void;
  onOpenConsultationModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  setCurrentRoute,
  onOpenScheduleModal,
}) => {
  const { language, toggleLanguage, t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId?: string, route: AppRoute = 'home') => {
    setMobileMenuOpen(false);
    if (currentRoute !== route) {
      setCurrentRoute(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0E0E10]/95 backdrop-blur-md border-b border-[#C5A059]/25 py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-[#0E0E10]/95 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="btn-brand-logo"
          onClick={() => handleNavClick(undefined, 'home')}
          className="flex flex-col text-left group focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-bold tracking-[0.18em] font-brand-display text-[#FAF9F6] group-hover:text-[#C5A059] transition-colors">
              ILAC
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium border-l border-[#C5A059]/40 pl-2">
              ACADEMY
            </span>
          </div>
          <span className="text-[10px] tracking-[0.15em] text-[#9A9385] font-normal hidden sm:block">
            {language === 'ko' ? '두바이 이민 · 정착 · 투자 실전 교육' : 'Dubai Immigration · Settlement · Investment'}
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" className="hidden lg:flex items-center space-x-7 text-[13px] font-medium tracking-wide">
          <button
            id="nav-link-academy"
            onClick={() => handleNavClick('why-section', 'home')}
            className={`transition-colors duration-200 hover:text-[#C5A059] ${
              currentRoute === 'home' ? 'text-[#FAF9F6]' : 'text-[#A39C90]'
            }`}
          >
            {t.nav.academy}
          </button>

          <button
            id="nav-link-curriculum"
            onClick={() => handleNavClick('curriculum-section', 'home')}
            className="text-[#A39C90] hover:text-[#C5A059] transition-colors"
          >
            {t.nav.curriculum}
          </button>

          <button
            id="nav-link-schedule"
            onClick={onOpenScheduleModal}
            className="text-[#A39C90] hover:text-[#C5A059] transition-colors flex items-center gap-1.5"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse"></span>
            {t.nav.schedule}
          </button>

          <button
            id="nav-link-qna"
            onClick={() => handleNavClick('qna-section', 'home')}
            className="text-[#A39C90] hover:text-[#C5A059] transition-colors"
          >
            {t.nav.qna}
          </button>

          {/* TAT Landing Page Link */}
          <button
            id="nav-link-tat"
            onClick={() => handleNavClick(undefined, 'tat')}
            className={`transition-all duration-200 px-2.5 py-1 rounded text-[13px] font-semibold ${
              currentRoute === 'tat'
                ? 'text-[#FAF9F6] bg-[#C5A059]/25 border border-[#C5A059]/50'
                : 'text-[#D4C5AE] hover:text-[#FAF9F6] hover:bg-[#252422]/60'
            }`}
          >
            {t.nav.tat}
          </button>

          {/* Settlement Service Page Link */}
          <button
            id="nav-link-settlement"
            onClick={() => handleNavClick(undefined, 'settlement')}
            className={`transition-all duration-200 px-2.5 py-1 rounded text-[13px] font-semibold ${
              currentRoute === 'settlement'
                ? 'text-[#FAF9F6] bg-[#C5A059]/25 border border-[#C5A059]/50'
                : 'text-[#D4C5AE] hover:text-[#FAF9F6] hover:bg-[#252422]/60'
            }`}
          >
            {t.nav.settlement}
          </button>
        </nav>

        {/* Right Area: Language Toggle + CTA */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Minimalist i18n Switcher: KOR | ENG */}
          <button
            id="btn-language-toggle"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium tracking-wider text-[#DCD6CA] hover:text-[#FFFFFF] bg-[#1A1A1D] hover:bg-[#28272B] border border-[#C5A059]/30 rounded transition-all"
            aria-label="Toggle language between Korean and English"
          >
            <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className={language === 'ko' ? 'text-[#C5A059] font-bold' : 'opacity-60'}>KOR</span>
            <span className="opacity-40">|</span>
            <span className={language === 'en' ? 'text-[#C5A059] font-bold' : 'opacity-60'}>ENG</span>
          </button>

          {/* Fixed Gold CTA Button */}
          <button
            id="btn-header-free-cta"
            onClick={onOpenScheduleModal}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-[12px] tracking-[0.1em] font-semibold uppercase bg-[#C5A059] hover:bg-[#b59048] text-white rounded shadow-md transition-all transform hover:-translate-y-0.5"
          >
            <span>{t.nav.freeCta}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu trigger */}
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#DCD6CA] hover:text-white rounded border border-[#C5A059]/25 bg-[#161619]"
            aria-label="Open mobile navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden bg-[#0d0d10] border-b border-[#c5a880]/20 px-6 py-6 space-y-4 animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-3 text-sm font-medium">
            <button
              id="mobile-link-home"
              onClick={() => handleNavClick(undefined, 'home')}
              className={`text-left py-2 border-b border-[#262529] ${currentRoute === 'home' ? 'text-[#c5a880]' : 'text-[#dcd6ca]'}`}
            >
              {t.nav.academy}
            </button>
            <button
              id="mobile-link-curriculum"
              onClick={() => handleNavClick('curriculum-section', 'home')}
              className="text-left py-2 text-[#dcd6ca] border-b border-[#262529]"
            >
              {t.nav.curriculum}
            </button>
            <button
              id="mobile-link-schedule"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenScheduleModal();
              }}
              className="text-left py-2 text-[#c5a880] border-b border-[#262529] flex items-center justify-between"
            >
              <span>{t.nav.schedule}</span>
              <span className="text-xs bg-[#c5a880]/20 text-[#c5a880] px-2 py-0.5 rounded">Live Open</span>
            </button>
            <button
              id="mobile-link-qna"
              onClick={() => handleNavClick('qna-section', 'home')}
              className="text-left py-2 text-[#dcd6ca] border-b border-[#262529]"
            >
              {t.nav.qna}
            </button>
            <button
              id="mobile-link-tat"
              onClick={() => handleNavClick(undefined, 'tat')}
              className={`text-left py-2 border-b border-[#262529] ${currentRoute === 'tat' ? 'text-[#c5a880]' : 'text-[#dcd6ca]'}`}
            >
              {t.nav.tat}
            </button>
            <button
              id="mobile-link-settlement"
              onClick={() => handleNavClick(undefined, 'settlement')}
              className={`text-left py-2 border-b border-[#262529] ${currentRoute === 'settlement' ? 'text-[#c5a880]' : 'text-[#dcd6ca]'}`}
            >
              {t.nav.settlement}
            </button>
          </div>

          <div className="pt-2">
            <button
              id="mobile-btn-cta"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenScheduleModal();
              }}
              className="w-full py-3 text-center text-xs tracking-wider font-bold uppercase bg-[#c5a880] text-[#0d0d0f] rounded"
            >
              {t.nav.freeCta}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
