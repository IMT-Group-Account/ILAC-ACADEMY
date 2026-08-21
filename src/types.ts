export type Language = 'ko' | 'en';

export type AppRoute = 'home' | 'tat' | 'settlement';

export interface EducationField {
  id: string;
  number: string;
  category: string;
  titleKo: string;
  titleEn: string;
  subtitleKo: string;
  subtitleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  itemsKo: string[];
  itemsEn: string[];
  highlightKo: string;
  highlightEn: string;
  iconName: string;
}

export interface AcademySession {
  id: string;
  date: string;
  dayKo: string;
  dayEn: string;
  time: string;
  category: string;
  categoryEn: string;
  topicNumber: string;
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  targetAudienceKo: string;
  targetAudienceEn: string;
  status: 'OPEN' | 'CLOSING_SOON' | 'FULL';
  speakerKo: string;
  speakerEn: string;
  locationKo: string;
  locationEn: string;
}

export interface QnAItem {
  id: string;
  categoryKo: string;
  categoryEn: string;
  questionKo: string;
  questionEn: string;
  answerSummaryKo: string;
  answerSummaryEn: string;
  detailPointsKo: string[];
  detailPointsEn: string[];
  isPopular?: boolean;
}

export interface RealStoryCase {
  id: string;
  caseNumber: string;
  badgeKo: string;
  badgeEn: string;
  titleKo: string;
  titleEn: string;
  summaryKo: string;
  summaryEn: string;
  clientProfileKo: string;
  clientProfileEn: string;
  challengeKo: string;
  challengeEn: string;
  solutionKo: string;
  solutionEn: string;
  resultKo: string;
  resultEn: string;
  timelineKo: string;
  timelineEn: string;
  tagKo: string;
  tagEn: string;
}

export interface LeadSubmission {
  id: string;
  type: 'ACADEMY_RSVP' | 'QUESTION' | 'TAT_APPLICATION' | 'SETTLEMENT_CONSULTATION';
  timestamp: string;
  name: string;
  phone: string;
  email: string;
  location?: string;
  age?: string;
  gender?: string;
  category?: string;
  questionOrNotes?: string;
  sessionId?: string;
  targetVisitDate?: string;
  familyMembers?: string;
  privacyAgreed: boolean;
}
