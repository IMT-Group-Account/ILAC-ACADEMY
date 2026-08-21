import React, { useState, useId } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { INITIAL_QNA, saveLeadSubmission } from '../data/academyData';
import { QnAItem } from '../types';
import { Search, HelpCircle, ChevronDown, Check, Send, CheckCircle2, MessageSquareText, ShieldAlert } from 'lucide-react';

interface QnASectionProps {
  initialCategory?: string;
}

export const QnASection: React.FC<QnASectionProps> = ({ initialCategory }) => {
  const { t, language } = useTranslation();
  const searchInputId = useId();
  const qnaNameId = useId();
  const qnaPhoneId = useId();
  const qnaEmailId = useId();
  const qnaLocationId = useId();
  const qnaAgeId = useId();
  const qnaGenderId = useId();
  const qnaCategoryId = useId();
  const qnaQuestionId = useId();
  const qnaPrivacyId = useId();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'ALL');
  const [expandedQnaId, setExpandedQnaId] = useState<string | null>('qna-1');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    age: '40대',
    gender: '남성',
    email: '',
    category: '이민·비자',
    question: '',
    privacyAgreed: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { key: 'ALL', labelKo: '전체 분야', labelEn: 'All Categories' },
    { key: '이민·비자', labelKo: '이민 · 비자', labelEn: 'Immigration & Visas' },
    { key: '자녀교육', labelKo: '자녀교육 · 학교', labelEn: 'Children Education' },
    { key: '주거·생활', labelKo: '주거 · 생활', labelEn: 'Housing & Living' },
    { key: '부동산', labelKo: '부동산', labelEn: 'Real Estate' },
    { key: '자산 이전', labelKo: '자산 이전 · 외환', labelEn: 'Asset Transfer' },
    { key: '법인·비즈니스', labelKo: '법인 · 금융 · 비즈니스', labelEn: 'Corporate & Business' },
  ];

  const filteredQna = INITIAL_QNA.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.categoryKo.includes(selectedCategory) || item.categoryEn.toLowerCase().includes(selectedCategory.toLowerCase());
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch =
      item.questionKo.toLowerCase().includes(query) ||
      item.questionEn.toLowerCase().includes(query) ||
      item.answerSummaryKo.toLowerCase().includes(query) ||
      item.answerSummaryEn.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.question) {
      alert(language === 'ko' ? '필수 입력 항목(이름, 연락처, 이메일, 질문내용)을 모두 작성해 주세요.' : 'Please fill in all required fields.');
      return;
    }
    if (!formData.privacyAgreed) {
      alert(language === 'ko' ? '개인정보 수집 및 이용에 동의해 주세요.' : 'Please agree to the privacy policy.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      saveLeadSubmission({
        type: 'QUESTION',
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        location: formData.location,
        age: formData.age,
        gender: formData.gender,
        category: formData.category,
        questionOrNotes: formData.question,
        privacyAgreed: true,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        location: '',
        age: '40대',
        gender: '남성',
        email: '',
        category: '이민·비자',
        question: '',
        privacyAgreed: true,
      });
    }, 600);
  };

  return (
    <section id="qna-section" className="py-20 bg-[#0C0C0E] relative border-t border-[#222127] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A059]/30 bg-[#141418] text-[11px] font-mono tracking-[0.2em] text-[#C5A059] uppercase">
            {t.qna.subtitle}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FAF9F6]">
            {t.qna.title}
          </h2>
          <p className="text-sm text-[#9E978A] leading-relaxed">
            {t.qna.desc}
          </p>
        </div>

        {/* Search Bar & Instant Category Filter */}
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="relative">
            <label htmlFor={searchInputId} className="sr-only">
              {t.qna.searchPlaceholder}
            </label>
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C5A059]">
              <Search className="w-4 h-4" />
            </div>
            <input
              id={searchInputId}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.qna.searchPlaceholder}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#121216] border border-[#222127] text-xs sm:text-sm text-[#FAF9F6] placeholder-[#666055] focus:border-[#C5A059] focus:outline-none transition-all"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {categories.map((cat) => {
              const label = language === 'ko' ? cat.labelKo : cat.labelEn;
              const isSelected = selectedCategory === cat.key;

              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3 py-1 rounded-full text-xs transition-all ${
                    isSelected
                      ? 'bg-[#C5A059] text-[#0A0A0C] font-bold'
                      : 'bg-[#141418] text-[#9E978A] border border-[#222127] hover:text-[#FAF9F6] hover:border-[#C5A059]/40'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Grid: Left is Q&A Knowledgebase, Right is 1:1 Direct Question Registration Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: QnA Accordion List (7 Cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#1E1D24]">
              <span className="text-xs font-mono tracking-wider text-[#C5A059] uppercase font-bold">
                {t.qna.popularTitle} ({filteredQna.length})
              </span>
              <span className="text-[11px] text-[#7A7468]">ILAC Advisory Answers</span>
            </div>

            <div className="space-y-2.5">
              {filteredQna.map((item) => {
                const isExpanded = expandedQnaId === item.id;
                const question = language === 'ko' ? item.questionKo : item.questionEn;
                const category = language === 'ko' ? item.categoryKo : item.categoryEn;
                const answer = language === 'ko' ? item.answerSummaryKo : item.answerSummaryEn;
                const points = language === 'ko' ? item.detailPointsKo : item.detailPointsEn;

                return (
                  <div
                    key={item.id}
                    className={`rounded-xl border transition-all ${
                      isExpanded
                        ? 'bg-[#141419] border-[#C5A059]/50'
                        : 'bg-[#101014] border-[#222127] hover:border-[#C5A059]/30'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedQnaId(isExpanded ? null : item.id)}
                      className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 focus:outline-none"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[11px] font-mono text-[#C5A059]">
                          <span>{category}</span>
                          {item.isPopular && (
                            <span className="px-1.5 py-0.2 bg-[#C5A059]/20 text-[#C5A059] rounded text-[9px] font-bold">
                              BEST
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-[#FAF9F6] leading-snug">
                          {question}
                        </h4>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-[#7A7468] shrink-0 mt-1 transition-transform ${
                          isExpanded ? 'rotate-180 text-[#C5A059]' : ''
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="px-4 sm:px-5 pb-4 pt-1 border-t border-[#1E1D24] space-y-3 text-xs animate-in fade-in">
                        <div className="p-3 rounded bg-[#17171D] border-l-2 border-[#C5A059] text-[#D8D2C7] leading-relaxed">
                          {answer}
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono text-[#7A7468] uppercase tracking-wider">
                            {language === 'ko' ? '세부 실행 지침 & 핵심 포인트' : 'Actionable Guidelines'}
                          </span>
                          <ul className="space-y-1 text-[#9E978A]">
                            {points.map((pt, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                                <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Q&A 질문 등록 폼 (5 Cols) */}
          <div className="lg:col-span-5 bg-[#111115] p-5 sm:p-6 rounded-xl border border-[#222127]">
            <div className="space-y-1.5 pb-4 border-b border-[#1E1D24]">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold">
                <MessageSquareText className="w-3.5 h-3.5" />
                <span>{t.qnaForm.badge}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#FAF9F6]">
                {t.qnaForm.title}
              </h3>
              <p className="text-xs text-[#9E978A] leading-relaxed">
                {t.qnaForm.desc}
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-10 h-10 mx-auto rounded-full bg-emerald-950/40 border border-emerald-500/50 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-[#FAF9F6]">
                    {language === 'ko' ? '질문이 정상 접수되었습니다.' : 'Inquiry Submitted'}
                  </h4>
                  <p className="text-xs text-[#9E978A] leading-relaxed max-w-xs mx-auto">
                    {t.qnaForm.successMessage}
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-1.5 text-xs font-semibold text-[#0A0A0C] bg-[#C5A059] rounded hover:bg-[#D4B06A]"
                >
                  {language === 'ko' ? '추가 질문 작성' : 'Submit Another'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="mt-4 space-y-3">
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label htmlFor={qnaNameId} className="text-[11px] font-medium text-[#9E978A]">
                      {t.qnaForm.name} <span className="text-[#C5A059]">*</span>
                    </label>
                    <input
                      id={qnaNameId}
                      type="text"
                      required
                      placeholder={language === 'ko' ? '홍길동' : 'John Doe'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0C0C0E] border border-[#222127] rounded text-xs text-[#FAF9F6] placeholder-[#555] focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor={qnaPhoneId} className="text-[11px] font-medium text-[#9E978A]">
                      {t.qnaForm.phone} <span className="text-[#C5A059]">*</span>
                    </label>
                    <input
                      id={qnaPhoneId}
                      type="tel"
                      required
                      placeholder="010-0000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0C0C0E] border border-[#222127] rounded text-xs text-[#FAF9F6] placeholder-[#555] focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label htmlFor={qnaEmailId} className="text-[11px] font-medium text-[#9E978A]">
                    {t.qnaForm.email} <span className="text-[#C5A059]">*</span>
                  </label>
                  <input
                    id={qnaEmailId}
                    type="email"
                    required
                    placeholder="example@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0C0C0E] border border-[#222127] rounded text-xs text-[#FAF9F6] placeholder-[#555] focus:border-[#C5A059] focus:outline-none"
                  />
                </div>

                {/* Location, Age, Gender */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label htmlFor={qnaLocationId} className="text-[10px] font-medium text-[#9E978A]">
                      {language === 'ko' ? '거주지' : 'Location'}
                    </label>
                    <input
                      id={qnaLocationId}
                      type="text"
                      placeholder={language === 'ko' ? '서울 강남구' : 'Seoul'}
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-2 py-2 bg-[#0C0C0E] border border-[#222127] rounded text-xs text-[#FAF9F6] placeholder-[#555] focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor={qnaAgeId} className="text-[10px] font-medium text-[#9E978A]">
                      {t.qnaForm.age}
                    </label>
                    <select
                      id={qnaAgeId}
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-1.5 py-2 bg-[#0C0C0E] border border-[#222127] rounded text-xs text-[#FAF9F6] focus:border-[#C5A059] focus:outline-none"
                    >
                      <option value="20대">20대</option>
                      <option value="30대">30대</option>
                      <option value="40대">40대</option>
                      <option value="50대">50대</option>
                      <option value="60대 이상">60대 이상</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor={qnaGenderId} className="text-[10px] font-medium text-[#9E978A]">
                      {t.qnaForm.gender}
                    </label>
                    <select
                      id={qnaGenderId}
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-1.5 py-2 bg-[#0C0C0E] border border-[#222127] rounded text-xs text-[#FAF9F6] focus:border-[#C5A059] focus:outline-none"
                    >
                      <option value="남성">남성</option>
                      <option value="여성">여성</option>
                    </select>
                  </div>
                </div>

                {/* Question Category */}
                <div className="space-y-1">
                  <label htmlFor={qnaCategoryId} className="text-[11px] font-medium text-[#9E978A]">
                    {t.qnaForm.category}
                  </label>
                  <select
                    id={qnaCategoryId}
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0C0C0E] border border-[#222127] rounded text-xs text-[#FAF9F6] focus:border-[#C5A059] focus:outline-none"
                  >
                    <option value="이민·비자">이민 · 비자 (Golden Visa, 거주권)</option>
                    <option value="교육">자녀 교육 · 국제학교 배정</option>
                    <option value="주거">주거 · 생활 인프라</option>
                    <option value="부동산">부동산 투자 및 실거주</option>
                    <option value="자산 이전">자산 해외 이전 · 외환 세무</option>
                    <option value="금융">금융 · 현지 은행 계좌</option>
                    <option value="법률">법률 및 계약 검토</option>
                    <option value="비즈니스">법인 설립 · 무역 · 비즈니스</option>
                  </select>
                </div>

                {/* Question Content */}
                <div className="space-y-1">
                  <label htmlFor={qnaQuestionId} className="text-[11px] font-medium text-[#9E978A]">
                    {t.qnaForm.question} <span className="text-[#C5A059]">*</span>
                  </label>
                  <textarea
                    id={qnaQuestionId}
                    rows={3}
                    required
                    placeholder={
                      language === 'ko'
                        ? '가족 구성, 희망 시기, 가장 고민되는 내용을 편하게 남겨주시면 실무 어드바이저가 직접 검토 후 답변드립니다.'
                        : 'Please provide details on your current family situation, target timeline, and primary question.'
                    }
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0C0C0E] border border-[#222127] rounded text-xs text-[#FAF9F6] placeholder-[#555] focus:border-[#C5A059] focus:outline-none resize-none"
                  />
                </div>

                {/* Privacy agreement */}
                <div className="pt-1">
                  <label htmlFor={qnaPrivacyId} className="flex items-start gap-2 text-[10px] text-[#7A7468] cursor-pointer">
                    <input
                      id={qnaPrivacyId}
                      type="checkbox"
                      checked={formData.privacyAgreed}
                      onChange={(e) => setFormData({ ...formData, privacyAgreed: e.target.checked })}
                      className="mt-0.5 rounded border-[#222127] text-[#C5A059] focus:ring-[#C5A059]"
                    />
                    <span>{t.qnaForm.privacyAgree}</span>
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-[#0A0A0C] bg-[#C5A059] hover:bg-[#D4B06A] rounded transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>{t.common.submitting}</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{t.qnaForm.submitBtn}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
