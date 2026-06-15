/**
 * Reference implementations copied from Founder Bandwidth Audit Scorecard.html
 * Used only for parity testing against assessmentScoring.ts
 */

import type { AssessmentResponses, AssessmentTrack } from '@/types/assessment';

type FormDataLike = { get: (key: string) => string | null };

const TRACK_QUESTIONS: Record<AssessmentTrack, readonly string[]> = {
  strategic: [
    'time_split',
    'planning_consistency',
    'vision_docs',
    'delegation_rate',
    'decision_delays',
    'decision_matrix',
    'sustainability',
    'scalability',
    'succession_planning',
    'calendar_discipline',
  ],
  operational: [
    'role_clarity',
    'coordination',
    'team_communication',
    'sops',
    'deep_work',
    'project_tracking',
    'performance_systems',
    'board_systems',
    'board_quality',
    'stakeholder_mgmt',
    'crisis_mgmt',
  ],
  comprehensive: [
    'time_split',
    'planning_consistency',
    'vision_docs',
    'delegation_rate',
    'decision_delays',
    'decision_matrix',
    'role_clarity',
    'coordination',
    'team_communication',
    'sops',
    'deep_work',
    'project_tracking',
    'performance_systems',
    'sustainability',
    'scalability',
    'succession_planning',
    'calendar_discipline',
    'board_systems',
    'board_quality',
    'stakeholder_mgmt',
    'crisis_mgmt',
  ],
};

export function toHtmlFormData(
  responses: AssessmentResponses,
  track: AssessmentTrack
): FormDataLike {
  const entries = new Map<string, string>();
  for (const field of TRACK_QUESTIONS[track]) {
    const value = responses[field];
    if (value !== undefined) {
      entries.set(field, String(value));
    }
  }
  return {
    get: (key: string) => (entries.has(key) ? entries.get(key)! : null),
  };
}

/** calculateTrackScore from HTML scorecard */
export function htmlCalculateTrackScore(formData: FormDataLike, track: AssessmentTrack): number {
  const scaledQuestions: Record<AssessmentTrack, string[]> = {
    strategic: [
      'time_split',
      'planning_consistency',
      'delegation_rate',
      'decision_delays',
      'sustainability',
      'scalability',
      'calendar_discipline',
    ],
    operational: [
      'role_clarity',
      'coordination',
      'team_communication',
      'deep_work',
      'project_tracking',
      'stakeholder_mgmt',
      'crisis_mgmt',
    ],
    comprehensive: [
      'time_split',
      'planning_consistency',
      'delegation_rate',
      'decision_delays',
      'role_clarity',
      'coordination',
      'team_communication',
      'deep_work',
      'project_tracking',
      'sustainability',
      'scalability',
      'calendar_discipline',
      'stakeholder_mgmt',
      'crisis_mgmt',
    ],
  };

  const binaryQuestions: Record<AssessmentTrack, string[]> = {
    strategic: ['vision_docs', 'decision_matrix', 'succession_planning'],
    operational: ['sops', 'performance_systems', 'board_systems', 'board_quality'],
    comprehensive: [
      'vision_docs',
      'decision_matrix',
      'sops',
      'performance_systems',
      'succession_planning',
      'board_systems',
      'board_quality',
    ],
  };

  let scaledSum = 0;
  scaledQuestions[track].forEach((field) => {
    scaledSum += parseInt(formData.get(field)!, 10);
  });
  const maxScaledScore = scaledQuestions[track].length * 5;

  let binarySum = 0;
  let binaryCount = 0;
  binaryQuestions[track].forEach((field) => {
    if (formData.get(field) === '1') {
      binarySum += 5;
    }
    binaryCount++;
  });
  const maxBinaryScore = binaryCount * 5;

  const totalScore = scaledSum + binarySum;
  const maxTotalScore = maxScaledScore + maxBinaryScore;
  const finalScore = Math.round((totalScore / maxTotalScore) * 100);
  return Math.min(100, Math.max(0, finalScore));
}

/** calculateStrategicComponent from HTML scorecard */
export function htmlCalculateStrategicComponent(formData: FormDataLike): number {
  const strategicQuestions = [
    'time_split',
    'planning_consistency',
    'vision_docs',
    'delegation_rate',
    'decision_delays',
    'decision_matrix',
    'sustainability',
    'scalability',
    'succession_planning',
    'calendar_discipline',
  ];

  let scaledSum = 0;
  let scaledCount = 0;
  let binarySum = 0;
  let binaryCount = 0;

  strategicQuestions.forEach((field) => {
    const value = formData.get(field);
    if (value !== null) {
      if (['vision_docs', 'decision_matrix', 'succession_planning'].includes(field)) {
        if (value === '1') binarySum += 5;
        binaryCount++;
      } else {
        scaledSum += parseInt(value, 10);
        scaledCount++;
      }
    }
  });

  if (scaledCount === 0 && binaryCount === 0) return 50;

  const totalSum = scaledSum + binarySum;
  const totalPossible = scaledCount * 5 + binaryCount * 5;
  return Math.round((totalSum / totalPossible) * 100);
}

/** calculateOperationalComponent from HTML scorecard */
export function htmlCalculateOperationalComponent(formData: FormDataLike): number {
  const operationalQuestions = [
    'role_clarity',
    'coordination',
    'team_communication',
    'sops',
    'deep_work',
    'project_tracking',
    'performance_systems',
    'board_systems',
    'board_quality',
    'stakeholder_mgmt',
    'crisis_mgmt',
  ];

  let scaledSum = 0;
  let scaledCount = 0;
  let binarySum = 0;
  let binaryCount = 0;

  operationalQuestions.forEach((field) => {
    const value = formData.get(field);
    if (value !== null) {
      if (['sops', 'performance_systems', 'board_systems', 'board_quality'].includes(field)) {
        if (value === '1') binarySum += 5;
        binaryCount++;
      } else {
        scaledSum += parseInt(value, 10);
        scaledCount++;
      }
    }
  });

  if (scaledCount === 0 && binaryCount === 0) return 50;

  const totalSum = scaledSum + binarySum;
  const totalPossible = scaledCount * 5 + binaryCount * 5;
  return Math.round((totalSum / totalPossible) * 100);
}

export function htmlInterpretationLabel(score: number): string {
  if (score >= 90) return 'Continuous Excellence';
  if (score >= 75) return 'Near-Optimal Zone';
  if (score >= 60) return 'High Potential Zone';
  if (score >= 40) return 'Moderate Challenges';
  if (score >= 20) return 'Significant Challenges';
  return 'Critical Challenges';
}

export const HTML_TRACK_FIELDS = TRACK_QUESTIONS;

export function randomResponsesForTrack(track: AssessmentTrack, seed: number): AssessmentResponses {
  const binaryFields = new Set([
    'vision_docs',
    'decision_matrix',
    'succession_planning',
    'sops',
    'performance_systems',
    'board_systems',
    'board_quality',
  ]);

  const responses: AssessmentResponses = {};
  TRACK_QUESTIONS[track].forEach((field, index) => {
    const roll = (seed + index * 17) % 100;
    if (binaryFields.has(field)) {
      responses[field] = roll % 2;
    } else {
      responses[field] = (roll % 5) + 1;
    }
  });
  return responses;
}
