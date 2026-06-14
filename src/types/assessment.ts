export type QuestionOption = {
  value: number;
  label: string;
};

type QuestionBase = {
  id: string;
  title: string;
  subtitle: string;
  section: string;
};

export type ScaledQuestion = QuestionBase & {
  type: 'scaled';
  options: QuestionOption[];
};

export type BinaryQuestion = QuestionBase & {
  type: 'binary';
  options: QuestionOption[];
};

export type Question = ScaledQuestion | BinaryQuestion;

export type AssessmentTrack = 'strategic' | 'operational' | 'comprehensive';

export type AssessmentResponses = {
  [key: string]: number;
};

export type ScoreInterpretation = {
  range: string;
  label: string;
  description: string;
  action: string;
  recommendations: string;
  bandColor: string;
};

export type AssessmentResult = {
  track: AssessmentTrack;
  score: number;
  scoreLabel: string;
  interpretation: ScoreInterpretation;
  strategicScore: number;
  operationalScore: number;
  strategicValuePropositions: string[];
  operationalValuePropositions: string[];
  /** Flat list for email/submission compatibility */
  valuePropositions: string[];
  cumulativeRoadmap: string[];
  chartInsight: string;
};

/** Raw responses held between assessment completion and lead form submit */
export type PendingAssessment = {
  track: AssessmentTrack;
  strategicResponses: AssessmentResponses;
  operationalResponses?: AssessmentResponses;
};

export type AssessmentPhase = 'select' | 'assessing' | 'leadCapture' | 'results';
