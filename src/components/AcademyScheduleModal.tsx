import React, { useState } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { ACADEMY_SESSIONS, saveLeadSubmission } from '../data/academyData';
import { AcademySession } from '../types';
import { X, Calendar, Clock, MapPin, CheckCircle, Shield, Sparkles, Send } from 'lucide-react';

interface AcademyScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedSession?: AcademySession | null;
}

export const AcademyScheduleModal: React.FC<AcademyScheduleModalProps> = ({
  isOpen,
  onClose,
  preselectedSession,
}) => {
  const { t, language } = useTranslation();
  const [selectedSessionId, setSelectedSessionId] = useState<string>(
    preselectedSession ? preselectedSession.id : ACADEMY_SESSIONS[0].id
  );
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    familyCount: '',
    interests: '',
    privacyAgreed: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const currentSelectedSession = ACADEMY_SESSIONS.find((s) => s.id === selectedSessionId) || ACADEMY_SESSIONS[0];

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
        type: 'ACADEMY_RSVP',
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        sessionId: selectedSessionId,
        category: currentSelectedSession.category,
        familyMembers: formData.familyCount,
        questionOrNotes: formData.interests ? `관심사항: ${formData.interests} (세션: ${currentSelectedSession.titleKo})` : `세션: ${currentSelectedSession.titleKo}`,
        privacyAgreed: true,
      });

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#111114] border border-[#c5a880]/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden my-8">
        {/* Modal Top Banner */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#17171c] via-[#1f1e24] to-[#17171c] border-b border-[#2a2930] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#c5a880]/15 text-[#c5a880]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#c5a880] uppercase">
                {t.scheduleModal.badge}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-editorial-serif text-[#fbf9f5]">
                {t.scheduleModal.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#8e877a] hover:text-[#fbf9f5] hover:bg-[#25242a] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {isSuccess ? (
          <div className="p-10 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#c5a880]/20 border border-[#c5a880] text-[#c5a880] flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="text-2xl font-bold font-editorial-serif text-[#fbf9f5]">
                {language === 'ko' ? '아카데미 무료 참가 신청 완료' : 'Masterclass Seat Reserved'}
              </h3>
              <p className="text-sm text-[#a8a193] leading-relaxed">
                {language === 'ko'
                  ? `[${currentSelectedSession.titleKo}] 세션 참여가 접수되었습니다. 신청 확인 및 라이브 줌 링크 / 오프라인 라운지 안내가 기재해주신 연락처로 전송됩니다.`
                  : `Your complimentary seat for [${currentSelectedSession.titleEn}] is confirmed. Details have been sent to your email.`}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-8 py-3 text-xs font-bold uppercase tracking-wider text-[#0d0d10] bg-[#c5a880] hover:bg-[#d8be96] rounded"
            >
              {language === 'ko' ? '확인 및 닫기' : 'Done & Close'}
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Schedule Sessions Selector */}
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono tracking-wider text-[#9b9487] uppercase mb-2">
                {language === 'ko' ? '참여 희망 세션 선택 (복수 회차 순차 참여 가능)' : 'Select Target Masterclass'}
              </div>

              <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                {ACADEMY_SESSIONS.map((session) => {
                  const isSelected = session.id === selectedSessionId;
                  const title = language === 'ko' ? session.titleKo : session.titleEn;
                  const day = language === 'ko' ? session.dayKo : session.dayEn;

                  return (
                    <div
                      key={session.id}
                      onClick={() => setSelectedSessionId(session.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#1e1d23] border-[#c5a880] shadow-[0_0_20px_rgba(197,168,128,0.15)]'
                          : 'bg-[#141418] border-[#29282f] hover:border-[#c5a880]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <div className="font-mono font-bold text-[#c5a880]">
                          {session.date} ({day}) 11:00 AM
                        </div>
                        <span className="text-[10px] font-mono text-[#8f887b] uppercase">
                          TOPIC {session.topicNumber}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-[#fbf9f5] leading-snug">
                        {title}
                      </h4>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-[#8e877a]">
                        <span>{language === 'ko' ? session.speakerKo : session.speakerEn}</span>
                        {isSelected && (
                          <span className="text-[#c5a880] font-bold text-[10px] uppercase">
                            SELECTED ✓
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Quick RSVP Lead Form */}
            <div className="lg:col-span-6 bg-[#16161b] p-6 rounded-xl border border-[#2b2a32] flex flex-col justify-between">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-[#28272e] pb-3">
                  <div className="text-[11px] font-mono text-[#c5a880] uppercase tracking-wider">
                    {language === 'ko' ? '신청 세션 확인' : 'Selected Session'}
                  </div>
                  <div className="text-xs font-bold text-[#fbf9f5] mt-0.5 line-clamp-1">
                    {language === 'ko' ? currentSelectedSession.titleKo : currentSelectedSession.titleEn}
                  </div>
                </div>

                {/* Name & Phone */}
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

                {/* Email */}
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

                {/* Family Structure or Interests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-[#b5aea2]">
                      {language === 'ko' ? '가족 구성 / 동반 인원' : 'Accompanying Members'}
                    </label>
                    <input
                      type="text"
                      placeholder={language === 'ko' ? '예: 부부 + 자녀 1명' : 'e.g. 2 Adults, 1 Child'}
                      value={formData.familyCount}
                      onChange={(e) => setFormData({ ...formData, familyCount: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0e0e11] border border-[#2d2c33] rounded text-xs text-white placeholder-[#5a564e] focus:border-[#c5a880] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-[#b5aea2]">
                      {language === 'ko' ? '사전 질문 / 주요 관심사' : 'Key Question'}
                    </label>
                    <input
                      type="text"
                      placeholder={language === 'ko' ? '예: 골든비자, 영국학교' : 'e.g. Visas, Schooling'}
                      value={formData.interests}
                      onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                      className="w-full px-3 py-2 bg-[#0e0e11] border border-[#2d2c33] rounded text-xs text-white placeholder-[#5a564e] focus:border-[#c5a880] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Privacy Consent */}
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
                        ? '[필수] 아카데미 참가 안내 및 세미나 자료 수신을 위한 개인정보 수집·이용에 동의합니다.'
                        : '[Required] I consent to the collection of details for admission coordination.'}
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 text-xs font-bold uppercase tracking-wider text-[#0d0d10] bg-[#c5a880] hover:bg-[#d8be96] rounded transition-all flex items-center justify-center gap-2 shadow-md mt-2"
                >
                  {isSubmitting ? (
                    <span>{t.common.submitting}</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{t.scheduleModal.reserveBtn}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
