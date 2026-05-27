import type {
  AssessmentResponses,
  AssessmentResult,
  AssessmentTrack,
  PendingAssessment,
  Question,
} from '@/types/assessment';
import type { AssessmentSubmissionPayload, LeadCaptureFormData, ResponseDetail } from '@/types/leadCapture';
import { calculateComprehensiveScore, calculateScore } from '@/utils/assessmentScoring';
import { operationalQuestions, strategicQuestions } from '@/utils/assessmentQuestions';

function formatAnswer(question: Question, value: number | undefined): string {
  if (value === undefined) return 'Not answered';
  if (question.type === 'binary') {
    return value === 1 ? 'Yes' : 'No';
  }
  return `${value}/5`;
}

function buildResponseDetails(
  questions: Question[],
  responses: AssessmentResponses,
  section?: string
): ResponseDetail[] {
  return questions.map((q) => ({
    section,
    question: q.question,
    answer: formatAnswer(q, responses[q.id]),
  }));
}

export function computeAssessmentResult(pending: PendingAssessment): AssessmentResult {
  if (pending.track === 'comprehensive' && pending.operationalResponses) {
    return calculateComprehensiveScore(pending.strategicResponses, pending.operationalResponses);
  }
  if (pending.track === 'operational' && pending.operationalResponses) {
    return calculateScore(pending.operationalResponses, 'operational');
  }
  return calculateScore(pending.strategicResponses, 'strategic');
}

export function buildResponseDetailsForPending(pending: PendingAssessment): ResponseDetail[] {
  if (pending.track === 'comprehensive' && pending.operationalResponses) {
    return [
      ...buildResponseDetails(strategicQuestions, pending.strategicResponses, 'Strategic Focus Audit'),
      ...buildResponseDetails(operationalQuestions, pending.operationalResponses, 'Operational Excellence'),
    ];
  }
  if (pending.track === 'operational' && pending.operationalResponses) {
    return buildResponseDetails(operationalQuestions, pending.operationalResponses);
  }
  return buildResponseDetails(strategicQuestions, pending.strategicResponses);
}

function mergeResponses(pending: PendingAssessment): AssessmentResponses {
  if (pending.track === 'comprehensive' && pending.operationalResponses) {
    return { ...pending.strategicResponses, ...pending.operationalResponses };
  }
  return pending.operationalResponses ?? pending.strategicResponses;
}

export function buildAssessmentSubmission(
  lead: LeadCaptureFormData,
  pending: PendingAssessment
): AssessmentSubmissionPayload {
  const { website: _honeypot, ...leadFields } = lead;
  const result = computeAssessmentResult(pending);
  const responseDetails = buildResponseDetailsForPending(pending);

  return {
    website: _honeypot ?? '',
    lead: leadFields,
    assessment: {
      track: pending.track,
      responses: mergeResponses(pending),
      ...(pending.track === 'comprehensive'
        ? {
            strategicResponses: pending.strategicResponses,
            operationalResponses: pending.operationalResponses,
          }
        : {}),
      responseDetails,
      result,
    },
    submittedAt: new Date().toISOString(),
  };
}

export function getTrackDisplayName(track: AssessmentTrack): string {
  switch (track) {
    case 'strategic':
      return 'Strategic Focus Audit';
    case 'operational':
      return 'Operational Excellence';
    case 'comprehensive':
      return 'Comprehensive Assessment';
    default:
      return track;
  }
}

export function formatSubmissionPlainText(payload: AssessmentSubmissionPayload): string {
  const { lead, assessment, submittedAt } = payload;
  const lines: string[] = [
    'NEW ASSESSMENT LEAD',
    '===================',
    '',
    'CONTACT & BUSINESS',
    `Name: ${lead.name}`,
    `Business: ${lead.businessName}`,
    `Email: ${lead.email}`,
    `Industry: ${lead.industry}`,
    `Business Model: ${lead.businessModel}`,
    `Business Stage: ${lead.businessStage}`,
    `Team Size: ${lead.teamSize}`,
    `Markets: ${lead.markets}`,
    `Description: ${lead.businessDescription}`,
    '',
    'ASSESSMENT RESULTS',
    `Track: ${getTrackDisplayName(assessment.track)}`,
    `Score: ${assessment.result.score}`,
    `Interpretation: ${assessment.result.interpretation.label}`,
    `Range: ${assessment.result.interpretation.range}`,
    `Recommended Action: ${assessment.result.interpretation.action}`,
    '',
    'VALUE PROPOSITIONS',
    ...assessment.result.valuePropositions.map((p, i) => `${i + 1}. ${p}`),
    '',
    'ASSESSMENT RESPONSES',
  ];

  let currentSection: string | undefined;
  for (const detail of assessment.responseDetails) {
    if (detail.section && detail.section !== currentSection) {
      currentSection = detail.section;
      lines.push('', `--- ${currentSection} ---`);
    }
    lines.push(`Q: ${detail.question}`);
    lines.push(`A: ${detail.answer}`);
    lines.push('');
  }

  lines.push(`Submitted at: ${submittedAt}`);
  return lines.join('\n');
}
