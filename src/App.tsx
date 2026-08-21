import React, { useState, useEffect } from 'react';
import { LanguageProvider, useTranslation } from './i18n/LanguageContext';
import { AppRoute, AcademySession } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { WhySection } from './components/WhySection';
import { EducationFieldsSection } from './components/EducationFieldsSection';
import { LiveAcademySection } from './components/LiveAcademySection';
import { QnASection } from './components/QnASection';
import { RealStoriesSection } from './components/RealStoriesSection';
import { LearnToFieldSection } from './components/LearnToFieldSection';
import { DubaiVisualBreak } from './components/DubaiVisualBreak';
import { TatLandingView } from './components/TatLandingView';
import { SettlementLandingView } from './components/SettlementLandingView';
import { Footer } from './components/Footer';
import { AcademyScheduleModal } from './components/AcademyScheduleModal';
import { ConsultationModal } from './components/ConsultationModal';
import { AdminLeadsDrawer } from './components/AdminLeadsDrawer';

const MainAppContent: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('home');
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [selectedSessionForRsvp, setSelectedSessionForRsvp] = useState<AcademySession | null>(null);
  const [preselectedQnaCategory, setPreselectedQnaCategory] = useState<string>('ALL');

  // Handle URL hash / path state synchronization
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'tat') {
        setCurrentRoute('tat');
      } else if (hash === 'settlement') {
        setCurrentRoute('settlement');
      } else if (hash === 'home' || hash === '') {
        setCurrentRoute('home');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const changeRoute = (route: AppRoute) => {
    setCurrentRoute(route);
    window.location.hash = route === 'home' ? '' : route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenScheduleModalWithSession = (session: AcademySession) => {
    setSelectedSessionForRsvp(session);
    setScheduleModalOpen(true);
  };

  const handleSelectFieldForQnA = (categoryKo: string) => {
    if (currentRoute !== 'home') {
      setCurrentRoute('home');
    }
    setPreselectedQnaCategory(categoryKo);
    setTimeout(() => {
      const qnaEl = document.getElementById('qna-section');
      if (qnaEl) {
        qnaEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#0d0d10] text-[#ede8df] flex flex-col justify-between selection:bg-[#c5a880] selection:text-black">
      {/* Editorial Header */}
      <Header
        currentRoute={currentRoute}
        setCurrentRoute={changeRoute}
        onOpenScheduleModal={() => {
          setSelectedSessionForRsvp(null);
          setScheduleModalOpen(true);
        }}
        onOpenConsultationModal={() => setConsultationModalOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <div className="space-y-0 animate-in fade-in duration-300">
            {/* 02. HERO */}
            <HeroSection
              onOpenScheduleModal={() => {
                setSelectedSessionForRsvp(null);
                setScheduleModalOpen(true);
              }}
              onOpenConsultationModal={() => setConsultationModalOpen(true)}
              onNavigateToTat={() => changeRoute('tat')}
              onNavigateToSettlement={() => changeRoute('settlement')}
            />

            {/* 03. WHY ILAC ACADEMY */}
            <WhySection />

            {/* Visual Break 1: Dubai Downtown & Skyline */}
            <DubaiVisualBreak variant="skyline" />

            {/* 04. ILAC ACADEMY 교육 분야 */}
            <EducationFieldsSection
              onSelectFieldForQnA={handleSelectFieldForQnA}
              onOpenScheduleModal={() => {
                setSelectedSessionForRsvp(null);
                setScheduleModalOpen(true);
              }}
            />

            {/* 05. LIVE ACADEMY */}
            <LiveAcademySection
              onOpenScheduleModal={() => {
                setSelectedSessionForRsvp(null);
                setScheduleModalOpen(true);
              }}
              onSelectSessionToApply={handleOpenScheduleModalWithSession}
            />

            {/* Visual Break 2: Dubai Night Cityscape */}
            <DubaiVisualBreak variant="night" />

            {/* 06 & 07. Q&A and 1:1 Question Submission */}
            <QnASection initialCategory={preselectedQnaCategory} />

            {/* 09. REAL DUBAI STORIES */}
            <RealStoriesSection onOpenConsultationModal={() => setConsultationModalOpen(true)} />

            {/* Visual Break 3: Dubai Marina & Waterfront */}
            <DubaiVisualBreak variant="marina" />

            {/* 10. LEARN -> FIELD */}
            <LearnToFieldSection
              onNavigateToTat={() => changeRoute('tat')}
              onNavigateToSettlement={() => changeRoute('settlement')}
            />
          </div>
        )}

        {/* 11. TAT 랜딩페이지 (Total Arabian Tour) */}
        {currentRoute === 'tat' && (
          <div className="animate-in fade-in duration-300">
            <TatLandingView
              onBackToHome={() => changeRoute('home')}
              onOpenConsultationModal={() => setConsultationModalOpen(true)}
            />
          </div>
        )}

        {/* 12 & 13. ILAC SETTLEMENT 랜딩페이지 */}
        {currentRoute === 'settlement' && (
          <div className="animate-in fade-in duration-300">
            <SettlementLandingView onBackToHome={() => changeRoute('home')} />
          </div>
        )}
      </main>

      {/* Editorial Footer */}
      <Footer
        setCurrentRoute={changeRoute}
        onOpenScheduleModal={() => {
          setSelectedSessionForRsvp(null);
          setScheduleModalOpen(true);
        }}
        onOpenConsultationModal={() => setConsultationModalOpen(true)}
      />

      {/* Global Modals */}
      <AcademyScheduleModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        preselectedSession={selectedSessionForRsvp}
      />

      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
      />

      {/* Discreet Real-time Leads and Google Sheet sync drawer */}
      <AdminLeadsDrawer />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <MainAppContent />
    </LanguageProvider>
  );
}
