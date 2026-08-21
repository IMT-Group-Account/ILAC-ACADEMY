import React, { useState } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { saveLeadSubmission } from '../data/academyData';
import { Compass, CheckCircle2, Calendar, MapPin, Users, Send, ArrowLeft, ShieldCheck, Sparkles, Building, Landmark, Utensils, Mountain, ArrowRight } from 'lucide-react';

interface TatLandingViewProps {
  onBackToHome: () => void;
  onOpenConsultationModal: () => void;
}

export const TatLandingView: React.FC<TatLandingViewProps> = ({ onBackToHome, onOpenConsultationModal }) => {
  const { t, language } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    familyCount: '',
    targetDate: '',
    interests: '주거지 실사 & 학교 탐방',
    inquiry: '',
    privacyAgreed: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert(language === 'ko' ? '이름, 연락처, 이메일을 입력해주세요.' : 'Please fill in required contact fields.');
      return;
    }
    if (!formData.privacyAgreed) {
      alert(language === 'ko' ? '개인정보 수집 및 이용에 동의해주세요.' : 'Please accept the privacy terms.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      saveLeadSubmission({
        type: 'TAT_APPLICATION',
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        familyMembers: formData.familyCount,
        targetVisitDate: formData.targetDate,
        category: 'TAT두바이 사전답사 투어',
        questionOrNotes: `관심분야: ${formData.interests} / 문의사항: ${formData.inquiry}`,
        privacyAgreed: true,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const scrollToForm = () => {
    const el = document.getElementById('tat-cpa-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="tat-landing-view" className="min-h-screen bg-[#0b0b0d] text-[#ede8df] pt-24 pb-24 font-sans">
      {/* Top Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#c5a880] hover:text-[#fbf9f5] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'ko' ? 'ILAC ACADEMY 메인으로 돌아가기' : 'Return to Academy Main'}</span>
        </button>

        <button
          onClick={() => {
            window.location.hash = 'settlement';
          }}
          className="inline-flex items-center gap-1 text-xs text-[#dcd6ca] hover:text-[#c5a880] transition-colors"
        >
          <span>{t.nav.settlementCta}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* TAT HERO */}
      <section className="relative py-16 sm:py-24 overflow-hidden border-b border-[#c5a880]/15">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-[#c5a880]/10 rounded-full blur-[150px]" />
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80"
            alt="Dubai Arabian luxury architecture and city"
            className="w-full h-full object-cover object-center opacity-25 filter contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0d] via-[#0b0b0d]/70 to-[#0b0b0d]/90" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c5a880]/40 bg-[#17161b] text-[11px] font-mono tracking-[0.25em] text-[#d4c5ae] uppercase">
            <Compass className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>{t.tatPage.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#fbf9f5] leading-[1.15] whitespace-pre-line font-sans">
            {t.tatPage.heroTitle}
          </h1>

          <p className="text-base sm:text-lg text-[#b8b2a5] max-w-2xl mx-auto leading-relaxed font-sans">
            {t.tatPage.heroDesc}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={scrollToForm}
              className="px-8 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-[#0d0d10] bg-gradient-to-r from-[#c5a880] to-[#b39263] hover:from-[#d6ba94] hover:to-[#c5a880] rounded shadow-[0_4px_30px_rgba(197,168,128,0.3)] transition-all transform hover:-translate-y-0.5"
            >
              {t.tatPage.applyBtn}
            </button>
          </div>
        </div>
      </section>

      {/* WHY TAT (속성 두바이 정복) */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#c5a880]">
            DISTINCT VALUE
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#fbf9f5] font-sans">
            {t.tatPage.whyTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#a8a193] leading-relaxed font-sans">
            {t.tatPage.whyDesc}
          </p>
        </div>

        {/* Townhouse & Community Photos Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-xl overflow-hidden border border-[#2b2a30] group">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Dubai Luxury Townhouse Community"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-xs font-semibold text-[#FAF9F6]">
                {language === 'ko' ? '타운하우스 & 패밀리 빌라 커뮤니티' : 'Townhouses & Family Villa Enclaves'}
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-[#2b2a30] group">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80"
                alt="Dubai Modern Architecture & Residences"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-xs font-semibold text-[#FAF9F6]">
                {language === 'ko' ? '다운타운 & 마리나 럭셔리 레지던스' : 'Downtown & Marina Luxury Residences'}
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-[#2b2a30] group">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=800&q=80"
                alt="Dubai International School & Family Life"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-xs font-semibold text-[#FAF9F6]">
                {language === 'ko' ? '국제학교 캠퍼스 & 생활 인프라' : 'International Schools & Daily Living'}
              </div>
            </div>
          </div>
        </div>

        {/* WHAT YOU WILL SEE */}
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#c5a880]">
              {t.tatPage.whatSeeTitle}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.tatPage.whatSeeItems.map((item, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-[#121216] border border-[#2b2a30] space-y-2 hover:border-[#c5a880]/40 transition-all">
                <div className="text-xs font-mono font-bold text-[#c5a880]">0{idx + 1}</div>
                <h3 className="text-base font-bold text-[#fbf9f5] font-sans">{item.label}</h3>
                <p className="text-xs text-[#9b9487] leading-relaxed font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4 CORE THEMED MODULES ITINERARY */}
        <div className="space-y-8 pt-8 border-t border-[#c5a880]/15">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono tracking-[0.2em] text-[#c5a880] uppercase">PROGRAM ITINERARY</span>
            <h2 className="text-3xl font-bold text-[#fbf9f5] font-sans">{t.tatPage.itineraryTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.tatPage.steps.map((step) => (
              <div key={step.num} className="p-7 rounded-2xl bg-[#131317] border border-[#28272f] hover:border-[#c5a880]/40 transition-all space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#c5a880] tracking-widest">{step.num} · {step.tag}</span>
                  {step.num === '01' && <Landmark className="w-4 h-4 text-[#c5a880]" />}
                  {step.num === '02' && <Mountain className="w-4 h-4 text-[#c5a880]" />}
                  {step.num === '03' && <Utensils className="w-4 h-4 text-[#c5a880]" />}
                  {step.num === '04' && <Building className="w-4 h-4 text-[#c5a880]" />}
                </div>
                <h3 className="text-xl font-bold text-[#fbf9f5] font-sans">{step.title}</h3>
                <p className="text-xs text-[#a39c90] leading-relaxed font-sans">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TAT CPA 신청 폼 */}
        <div id="tat-cpa-form" className="p-8 sm:p-12 rounded-3xl bg-[#131318] border border-[#c5a880]/40 shadow-2xl max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2 border-b border-[#292830] pb-6">
            <span className="text-xs font-mono tracking-[0.2em] text-[#c5a880] uppercase">CPA APPLICATION</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#fbf9f5] font-sans">
              {t.tatPage.formTitle}
            </h3>
            <p className="text-xs text-[#a39c90] font-sans">
              {t.tatPage.formDesc}
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950/70 border border-emerald-500 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-[#fbf9f5] font-sans">
                {language === 'ko' ? 'TAT 사전답사 프로그램 신청이 접수되었습니다.' : 'TAT Application Successfully Received.'}
              </h4>
              <p className="text-xs text-[#a39c90] max-w-md mx-auto leading-relaxed font-sans">
                {language === 'ko'
                  ? '희망 방문 시기와 가족 구성에 맞춘 프라이빗 일정 안내서 및 예상 견적을 기재해주신 이메일로 안내해 드립니다.'
                  : 'A bespoke itinerary proposal and quotation will be dispatched to your contact coordinates shortly.'}
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2.5 text-xs font-bold uppercase text-[#0d0d10] bg-[#c5a880] rounded hover:bg-[#d8be96]"
              >
                {language === 'ko' ? '추가 문의하기' : 'Submit Another Request'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-[#b5aea2]">
                    {t.common.fullName} <span className="text-[#c5a880]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'ko' ? '홍길동' : 'John Doe'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0e0e11] border border-[#2d2c33] rounded text-xs text-white placeholder-[#5a564e] focus:border-[#c5a880] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-[#b5aea2]">
                    {t.common.phone} <span className="text-[#c5a880]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="010-0000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0e0e11] border border-[#2d2c33] rounded text-xs text-white placeholder-[#5a564e] focus:border-[#c5a880] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-[#b5aea2]">
                    {t.common.email} <span className="text-[#c5a880]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="example@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0e0e11] border border-[#2d2c33] rounded text-xs text-white placeholder-[#5a564e] focus:border-[#c5a880] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-[#b5aea2]">
                    {t.common.familyCount}
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'ko' ? '예: 부부 + 자녀 2명' : 'e.g. 2 Adults, 2 Kids'}
                    value={formData.familyCount}
                    onChange={(e) => setFormData({ ...formData, familyCount: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0e0e11] border border-[#2d2c33] rounded text-xs text-white placeholder-[#5a564e] focus:border-[#c5a880] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-[#b5aea2]">
                    {t.common.targetDate}
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'ko' ? '예: 2026년 9월 또는 10월 중' : 'e.g. Sept / Oct 2026'}
                    value={formData.targetDate}
                    onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0e0e11] border border-[#2d2c33] rounded text-xs text-white placeholder-[#5a564e] focus:border-[#c5a880] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-[#b5aea2]">
                    {t.common.interests}
                  </label>
                  <select
                    value={formData.interests}
                    onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0e0e11] border border-[#2d2c33] rounded text-xs text-white focus:border-[#c5a880] focus:outline-none"
                  >
                    <option value="타운하우스 실사 & 학교 탐방">타운하우스 실사 & 명문 국제학교 탐방</option>
                    <option value="부동산 투자 & 다운타운/힐스">부동산 투자 매물 실사 (Downtown/Hills)</option>
                    <option value="법인 설립 & 비즈니스 미팅">법인 설립 & 현지 비즈니스 인프라</option>
                    <option value="골든비자 & 종합 정착 패키지">골든비자 취득 & 종합 정착 시뮬레이션</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-[#b5aea2]">
                  {t.common.inquiry}
                </label>
                <textarea
                  rows={3}
                  placeholder={language === 'ko' ? '특별히 방문하고 싶은 학교, 주거 단지 또는 사전 요청사항이 있다면 기재해 주세요.' : 'Specific institutions or requests.'}
                  value={formData.inquiry}
                  onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#0e0e11] border border-[#2d2c33] rounded text-xs text-white placeholder-[#5a564e] focus:border-[#c5a880] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2 text-[11px] text-[#938c7f] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.privacyAgreed}
                    onChange={(e) => setFormData({ ...formData, privacyAgreed: e.target.checked })}
                    className="mt-0.5 rounded border-[#38373e] text-[#c5a880] focus:ring-[#c5a880]"
                  />
                  <span>
                    {language === 'ko'
                      ? '[필수] TAT 사전답사 상담 및 일정 안내를 위한 개인정보 수집·이용에 동의합니다.'
                      : '[Required] I consent to the processing of personal details for TAT coordination.'}
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#0d0d10] bg-gradient-to-r from-[#c5a880] to-[#b39263] hover:from-[#d6ba94] hover:to-[#c5a880] rounded shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>{t.common.submitting}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t.tatPage.applyBtn}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
