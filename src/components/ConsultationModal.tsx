import React, { useState } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { saveLeadSubmission } from '../data/academyData';
import { X, CheckCircle2, ShieldCheck, Send } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultCategory = '두바이 이민·정착 종합 상담',
}) => {
  const { t, language } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    familyCount: '',
    targetDate: '',
    category: defaultCategory,
    inquiry: '',
    privacyAgreed: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

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
        category: formData.category,
        questionOrNotes: formData.inquiry,
        privacyAgreed: true,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#111114] border border-[#c5a880]/35 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#17171c] via-[#1f1e24] to-[#17171c] border-b border-[#2a2930] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#c5a880]/15 text-[#c5a880]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#c5a880] uppercase">
                ILAC 1:1 PRIVATE ADVISORY
              </div>
              <h2 className="text-xl font-bold font-editorial-serif text-[#fbf9f5]">
                {language === 'ko' ? '두바이 이민 · 정착지원 상담 신청' : 'Dubai Settlement Advisory'}
              </h2>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-full text-[#8e877a] hover:text-[#fbf9f5] hover:bg-[#25242a] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSubmitted ? (
          <div className="p-10 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950/70 border border-emerald-500 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-editorial-serif text-[#fbf9f5]">
                {language === 'ko' ? '상담 신청이 완료되었습니다' : 'Consultation Registered'}
              </h3>
              <p className="text-sm text-[#a8a193] leading-relaxed">
                {language === 'ko'
                  ? '접수해 주신 내용을 기반으로 두바이 전담 어드바이저가 신속하게 연락드리겠습니다.'
                  : 'An ILAC Senior Advisor will contact you via email/phone shortly.'}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="px-8 py-3 text-xs font-bold uppercase tracking-wider text-[#0d0d10] bg-[#c5a880] hover:bg-[#d8be96] rounded"
            >
              {language === 'ko' ? '확인 및 닫기' : 'Done & Close'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  className="w-full px-3 py-2 bg-[#0e0e11] border border-[#2d2c33] rounded text-xs text-white placeholder-[#5a564e] focus:border-[#c5a880] focus:outline-none"
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
                  className="w-full px-3 py-2 bg-[#0e0e11] border border-[#2d2c33] rounded text-xs text-white placeholder-[#5a564e] focus:border-[#c5a880] focus:outline-none"
                />
              </div>
            </div>

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
                className="w-full px-3 py-2 bg-[#0e0e11] border border-[#2d2c33] rounded text-xs text-white placeholder-[#5a564e] focus:border-[#c5a880] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-[#b5aea2]">
                  {language === 'ko' ? '가족 구성' : 'Family Members'}
                </label>
                <input
                  type="text"
                  placeholder={language === 'ko' ? '예: 부부 + 자녀 2명' : 'e.g. Couple + 2 Kids'}
                  value={formData.familyCount}
                  onChange={(e) => setFormData({ ...formData, familyCount: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0e0e11] border border-[#2d2c33] rounded text-xs text-white placeholder-[#5a564e] focus:border-[#c5a880] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-[#b5aea2]">
                  {language === 'ko' ? '상담 희망 분야' : 'Topic Area'}
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0e0e11] border border-[#2d2c33] rounded text-xs text-white focus:border-[#c5a880] focus:outline-none"
                >
                  <option value="두바이 이민·정착 종합 상담">두바이 이민·정착 종합 상담</option>
                  <option value="골든비자 취득 및 비자 수속">골든비자 취득 및 비자 수속</option>
                  <option value="국제학교 입학 및 거주지 매칭">국제학교 입학 및 거주지 매칭</option>
                  <option value="부동산 매입 및 자산 투자">부동산 매입 및 자산 투자</option>
                  <option value="자산 해외 이전 및 세무 자문">자산 해외 이전 및 세무 자문</option>
                  <option value="두바이 법인 설립 및 사업 확장">두바이 법인 설립 및 사업 확장</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-[#b5aea2]">
                {language === 'ko' ? '상담 요청 내용 / 현재 상황' : 'Consultation Details'}
              </label>
              <textarea
                rows={3}
                placeholder={language === 'ko' ? '현재 이주/투자 준비 단계 및 가장 궁금한 점을 적어주세요.' : 'Your current preparation timeline.'}
                value={formData.inquiry}
                onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                className="w-full px-3 py-2 bg-[#0e0e11] border border-[#2d2c33] rounded text-xs text-white placeholder-[#5a564e] focus:border-[#c5a880] focus:outline-none resize-none"
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
                    ? '[필수] 개인정보 수집 및 이용에 동의합니다.'
                    : '[Required] I accept the collection and processing of personal data.'}
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-[#0d0d10] bg-[#c5a880] hover:bg-[#d8be96] rounded transition-all flex items-center justify-center gap-2 shadow-lg mt-2"
            >
              {isSubmitting ? (
                <span>{t.common.submitting}</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>{language === 'ko' ? '상담 신청 완료하기' : 'Submit Consultation Request'}</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
