export type ScaledQuestion = {
  id: string;
  question: string;
  type: 'scaled';
  scale: number[];
  labels?: { min: string; max: string };
};

export type BinaryQuestion = {
  id: string;
  question: string;
  type: 'binary';
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
  roiRange?: string;
};

export type AssessmentResult = {
  track: AssessmentTrack;
  score: number;
  interpretation: ScoreInterpretation;
  valuePropositions: string[];
};
