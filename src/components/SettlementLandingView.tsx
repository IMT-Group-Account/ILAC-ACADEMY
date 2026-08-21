import React, { useState } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { saveLeadSubmission } from '../data/academyData';
import { ShieldCheck, CheckCircle2, ArrowLeft, Send, Check, Sparkles, Building, Landmark, Award, PhoneCall } from 'lucide-react';

interface SettlementLandingViewProps {
  onBackToHome: () => void;
}

export const SettlementLandingView: React.FC<SettlementLandingViewProps> = ({ onBackToHome }) => {
  const { t, language } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    familyCount: '',
    targetDate: '',
    servicePillars: '종합 정착 원스톱 풀패키지',
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
        type: 'SETTLEMENT_CONSULTATION',
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        familyMembers: formData.familyCount,
        targetVisitDate: formData.targetDate,
        category: 'ILAC이민·정착지원 서비스',
        questionOrNotes: `선택분야: ${formData.servicePillars} / 문의내용: ${formData.inquiry}`,
        privacyAgreed: true,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const scrollToForm = () => {
    const el = document.getElementById('settlement-cpa-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="settlement-landing-view" className="min-h-screen bg-[#0b0b0d] text-[#ede8df] pt-24 pb-24 font-sans">
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#c5a880] hover:text-[#fbf9f5] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'ko' ? 'ILAC ACADEMY 메인으로 돌아가기' : 'Return to Academy Main'}</span>
        </button>
      </div>

      {/* HERO */}
      <section className="relative py-16 sm:py-24 overflow-hidden border-b border-[#c5a880]/15">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/3 w-[600px] h-[500px] bg-[#c5a880]/8 rounded-full blur-[160px]" />
          <img
            src="https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=1600&q=80"
            alt="Dubai executive skyline"
            className="w-full h-full object-cover object-center opacity-20 filter contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0d] via-[#0b0b0d]/70 to-[#0b0b0d]/90" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c5a880]/40 bg-[#17161b] text-[11px] font-mono tracking-[0.25em] text-[#d4c5ae] uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>{t.settlementPage.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#fbf9f5] leading-[1.15] whitespace-pre-line font-sans">
            {t.settlementPage.heroTitle}
          </h1>

          <p className="text-base sm:text-lg text-[#b8b2a5] max-w-2xl mx-auto leading-relaxed font-sans">
            {t.settlementPage.heroDesc}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={scrollToForm}
              className="px-8 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-[#0d0d10] bg-gradient-to-r from-[#c5a880] to-[#b39263] hover:from-[#d6ba94] hover:to-[#c5a880] rounded shadow-[0_4px_30px_rgba(197,168,128,0.3)] transition-all transform hover:-translate-y-0.5"
            >
              {t.settlementPage.applyBtn}
            </button>
          </div>
        </div>
      </section>

      {/* 5 SERVICE PILLARS */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#c5a880]">
            END-TO-END SERVICE SUITE
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#fbf9f5] font-sans">
            {t.settlementPage.pillarsTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#a8a193] leading-relaxed font-sans">
            {t.settlementPage.pillarsDesc}
          </p>
        </div>

        {/* Dubai Living & Investment Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-xl overflow-hidden border border-[#28272e] bg-[#121216]">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
              alt="Dubai luxury villa and townhouse"
              className="w-full h-44 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-4 space-y-1">
              <h4 className="text-sm font-bold text-[#fbf9f5] font-sans">프리미엄 타운하우스 & 빌라</h4>
              <p className="text-xs text-[#9e978a]">두바이 힐스, 다막 힐스, 틸랄 알 가프 등 패밀리 단지 실사 및 계약</p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-[#28272e] bg-[#121216]">
            <img
              src="https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=800&q=80"
              alt="Dubai top tier international schools"
              className="w-full h-44 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-4 space-y-1">
              <h4 className="text-sm font-bold text-[#fbf9f5] font-sans">최상위 국제학교 입학 전형</h4>
              <p className="text-xs text-[#9e978a]">NLCS, 브라이튼 칼리지, DAA, 킹스 등 맞춤형 입학 매칭</p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-[#28272e] bg-[#121216]">
            <img
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80"
              alt="Dubai financial corporate center"
              className="w-full h-44 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-4 space-y-1">
              <h4 className="text-sm font-bold text-[#fbf9f5] font-sans">법인 설립 · 골든비자 · 프라이빗 뱅킹</h4>
              <p className="text-xs text-[#9e978a]">DIFC/DMCC/Meydan 프리존 법인 설립 및 Emirates NBD 계좌 개설</p>
            </div>
          </div>
        </div>

        {/* 5 Service Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.settlementPage.pillars.map((pillar, idx) => (
            <div
              key={pillar.num}
              className={`p-7 rounded-2xl bg-[#121216] border border-[#28272e] hover:border-[#c5a880]/50 transition-all flex flex-col justify-between space-y-5 ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#c5a880] tracking-widest">{pillar.num}</span>
                  {idx === 0 && <Building className="w-4 h-4 text-[#c5a880]" />}
                  {idx === 1 && <ShieldCheck className="w-4 h-4 text-[#c5a880]" />}
                  {idx === 2 && <Sparkles className="w-4 h-4 text-[#c5a880]" />}
                  {idx === 3 && <Landmark className="w-4 h-4 text-[#c5a880]" />}
                  {idx === 4 && <Award className="w-4 h-4 text-[#c5a880]" />}
                </div>

                <h3 className="text-xl font-bold text-[#fbf9f5] font-sans">{pillar.title}</h3>
                <p className="text-xs text-[#a39c90] leading-relaxed font-sans">{pillar.desc}</p>

                <div className="pt-3 border-t border-[#232228] space-y-2">
                  {pillar.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-2 text-xs text-[#dcd6ca] font-sans">
                      <Check className="w-3.5 h-3.5 text-[#c5a880] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SETTLEMENT CPA APPLICATION FORM */}
        <div id="settlement-cpa-form" className="p-8 sm:p-12 rounded-3xl bg-[#131318] border border-[#c5a880]/40 shadow-2xl max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2 border-b border-[#292830] pb-6">
            <span className="text-xs font-mono tracking-[0.2em] text-[#c5a880] uppercase">SETTLEMENT CONSULTATION</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#fbf9f5] font-sans">
              {t.settlementPage.applyBtn}
            </h3>
            <p className="text-xs text-[#a39c90] font-sans">
              {language === 'ko'
                ? '이민·정착 전문가가 귀하의 상황을 정밀 진단 후 최적의 실행 로드맵을 제안드립니다.'
                : 'Our relocation directors will configure a bespoke settlement timeline for your family.'}
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950/70 border border-emerald-500 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-[#fbf9f5] font-sans">
                {language === 'ko' ? '정착 지원 상담 신청이 완료되었습니다.' : 'Consultation Request Registered.'}
              </h4>
              <p className="text-xs text-[#a39c90] max-w-md mx-auto leading-relaxed font-sans">
                {language === 'ko'
                  ? '담당 시니어 어드바이저가 접수 내용을 확인한 후 24시간 이내에 1:1 상담 일정을 조율해 드립니다.'
                  : 'An ILAC Senior Relocation Director will reach out within 24 hours to schedule your preliminary audit.'}
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
                    placeholder={language === 'ko' ? '예: 부부 + 초등 자녀 2명' : 'e.g. Couple + 2 Children'}
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
                    placeholder={language === 'ko' ? '예: 2026년 하반기' : 'e.g. Q4 2026'}
                    value={formData.targetDate}
                    onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0e0e11] border border-[#2d2c33] rounded text-xs text-white placeholder-[#5a564e] focus:border-[#c5a880] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-[#b5aea2]">
                    {language === 'ko' ? '희망 서비스 영역' : 'Service Modules'}
                  </label>
                  <select
                    value={formData.servicePillars}
                    onChange={(e) => setFormData({ ...formData, servicePillars: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0e0e11] border border-[#2d2c33] rounded text-xs text-white focus:border-[#c5a880] focus:outline-none"
                  >
                    <option value="종합 정착 원스톱 풀패키지">종합 정착 원스톱 풀패키지</option>
                    <option value="비자 & 행정 및 은행 계좌">비자(골든비자) & 행정 / 은행 계좌</option>
                    <option value="국제학교 입학 & 주거지 매칭">국제학교 입학 & 주거지 매칭</option>
                    <option value="부동산 매입 & 임대 관리">부동산 매입 & 임대 수익 관리</option>
                    <option value="법인 설립 & 비즈니스 셋업">법인 설립 & 비즈니스 셋업</option>
                    <option value="VVIP 컨시어지 & 자산 이전">VVIP 컨시어지 & 자산 해외 이전</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-[#b5aea2]">
                  {t.common.inquiry}
                </label>
                <textarea
                  rows={3}
                  placeholder={language === 'ko' ? '현재 진행 상황 및 가장 우선적으로 해결하고 싶은 사항을 적어주세요.' : 'Current timeline & key priorities.'}
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
                      ? '[필수] 정착 지원 상담 및 서비스 안내를 위한 개인정보 수집·이용에 동의합니다.'
                      : '[Required] I consent to the processing of personal information for settlement advisory.'}
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
                    <span>{t.settlementPage.applyBtn}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FINAL SLOGAN */}
      <section className="py-16 text-center space-y-3 border-t border-[#c5a880]/15">
        <h3 className="text-2xl sm:text-3xl font-bold text-[#fbf9f5] font-sans">
          {t.settlementPage.finalTitle}
        </h3>
        <p className="text-base font-mono text-[#c5a880] tracking-widest uppercase">
          {t.settlementPage.finalSlogan}
        </p>
      </section>
    </div>
  );
};
