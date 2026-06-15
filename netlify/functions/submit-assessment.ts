import type { Handler } from '@netlify/functions';
import { Resend } from 'resend';

type ResponseDetail = {
  section?: string;
  question: string;
  answer: string;
};

type ScoreInterpretation = {
  range: string;
  label: string;
  description: string;
  action: string;
  recommendations?: string;
  bandColor?: string;
};

type AssessmentResult = {
  score: number;
  scoreLabel?: string;
  interpretation: ScoreInterpretation;
  strategicScore?: number;
  operationalScore?: number;
  strategicValuePropositions?: string[];
  operationalValuePropositions?: string[];
  valuePropositions: string[];
  cumulativeRoadmap?: string[];
  chartInsight?: string;
};

type SubmissionPayload = {
  website?: string;
  lead: {
    name: string;
    businessName: string;
    email: string;
    industry: string;
    businessModel: string;
    businessStage: string;
    teamSize: string;
    markets: string;
    businessDescription: string;
  };
  assessment: {
    track: string;
    result: AssessmentResult;
    responseDetails: ResponseDetail[];
  };
  submittedAt: string;
};

const TRACK_LABELS: Record<string, string> = {
  strategic: 'Strategic Focus Audit',
  operational: 'Operational Excellence',
  comprehensive: 'Comprehensive Assessment',
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function jsonResponse(statusCode: number, body: Record<string, unknown>) {
  return {
    statusCode,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function listItems(items: string[] | undefined): string {
  if (!items?.length) return '<p style="font-size:13px;color:#666;">None</p>';
  return `<ul style="font-size:13px;padding-left:20px;margin:0;">${items.map((p) => `<li>${escapeHtml(p)}</li>`).join('')}</ul>`;
}

function buildTeamEmailHtml(payload: SubmissionPayload): string {
  const { lead, assessment, submittedAt } = payload;
  const trackLabel = TRACK_LABELS[assessment.track] ?? assessment.track;
  const { result } = assessment;

  let responsesHtml = '';
  let currentSection: string | undefined;
  for (const detail of assessment.responseDetails) {
    if (detail.section && detail.section !== currentSection) {
      currentSection = detail.section;
      responsesHtml += `<h3 style="margin:24px 0 8px;color:#386FA4;">${escapeHtml(currentSection)}</h3>`;
    }
    responsesHtml += `
      <div style="margin-bottom:12px;padding:12px;background:#f8f9fa;border-radius:6px;">
        <p style="margin:0 0 4px;font-size:13px;color:#555;"><strong>Q:</strong> ${escapeHtml(detail.question)}</p>
        <p style="margin:0;font-size:13px;"><strong>A:</strong> ${escapeHtml(detail.answer)}</p>
      </div>`;
  }

  const scoreLabel = result.scoreLabel ?? trackLabel;

  return `
<!DOCTYPE html>
<html>
<body style="font-family:Georgia,serif;color:#0D1B2A;max-width:640px;margin:0 auto;padding:24px;">
  <h1 style="color:#386FA4;font-size:22px;border-bottom:3px solid #B8962E;padding-bottom:12px;">
    New Assessment Lead
  </h1>
  <p style="color:#666;font-size:13px;">Submitted: ${escapeHtml(submittedAt)}</p>

  <h2 style="color:#386FA4;font-size:16px;margin-top:28px;">Contact &amp; Business</h2>
  <table style="width:100%;font-size:14px;border-collapse:collapse;">
    <tr><td style="padding:6px 0;color:#666;width:140px;">Name</td><td>${escapeHtml(lead.name)}</td></tr>
    <tr><td style="padding:6px 0;color:#666;">Business</td><td>${escapeHtml(lead.businessName)}</td></tr>
    <tr><td style="padding:6px 0;color:#666;">Email</td><td><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td></tr>
    <tr><td style="padding:6px 0;color:#666;">Industry</td><td>${escapeHtml(lead.industry)}</td></tr>
    <tr><td style="padding:6px 0;color:#666;">Business Model</td><td>${escapeHtml(lead.businessModel)}</td></tr>
    <tr><td style="padding:6px 0;color:#666;">Business Stage</td><td>${escapeHtml(lead.businessStage)}</td></tr>
    <tr><td style="padding:6px 0;color:#666;">Team Size</td><td>${escapeHtml(lead.teamSize)}</td></tr>
    <tr><td style="padding:6px 0;color:#666;">Markets</td><td>${escapeHtml(lead.markets)}</td></tr>
    <tr><td style="padding:6px 0;color:#666;vertical-align:top;">Description</td><td>${escapeHtml(lead.businessDescription)}</td></tr>
  </table>

  <h2 style="color:#386FA4;font-size:16px;margin-top:28px;">Assessment Results</h2>
  <div style="background:#0D1B2A;color:#fff;padding:20px;border-radius:8px;text-align:center;margin:12px 0;">
    <div style="font-size:48px;color:#B8962E;font-weight:normal;">${result.score}</div>
    <div style="font-size:16px;margin-top:8px;">${escapeHtml(result.interpretation.label)}</div>
    <div style="font-size:12px;color:#aaa;margin-top:4px;">${escapeHtml(scoreLabel)} · Range ${escapeHtml(result.interpretation.range)}</div>
  </div>
  <p style="font-size:14px;"><strong>Strategic Component:</strong> ${result.strategicScore ?? 'N/A'}%</p>
  <p style="font-size:14px;"><strong>Operational Component:</strong> ${result.operationalScore ?? 'N/A'}%</p>
  <p style="font-size:14px;"><strong>Recommended Action:</strong> ${escapeHtml(result.interpretation.action)}</p>
  <p style="font-size:13px;color:#666;">${escapeHtml(result.interpretation.description)}</p>
  ${result.interpretation.recommendations ? `<p style="font-size:13px;"><strong>Recommendations:</strong> ${escapeHtml(result.interpretation.recommendations)}</p>` : ''}
  ${result.chartInsight ? `<p style="font-size:13px;color:#666;"><strong>Chart Insight:</strong> ${escapeHtml(result.chartInsight)}</p>` : ''}

  <h3 style="color:#386FA4;font-size:14px;margin-top:20px;">Strategic Value Propositions</h3>
  ${listItems(result.strategicValuePropositions)}

  <h3 style="color:#386FA4;font-size:14px;margin-top:16px;">Operational Value Propositions</h3>
  ${listItems(result.operationalValuePropositions)}

  <h3 style="color:#386FA4;font-size:14px;margin-top:16px;">Cumulative Roadmap</h3>
  ${listItems(result.cumulativeRoadmap)}

  <h2 style="color:#386FA4;font-size:16px;margin-top:28px;">Assessment Responses</h2>
  ${responsesHtml}
</body>
</html>`;
}

function buildTeamPlainText(payload: SubmissionPayload): string {
  const { lead, assessment, submittedAt } = payload;
  const trackLabel = TRACK_LABELS[assessment.track] ?? assessment.track;
  const { result } = assessment;
  const lines = [
    'NEW ASSESSMENT LEAD',
    '',
    `Name: ${lead.name}`,
    `Business: ${lead.businessName}`,
    `Email: ${lead.email}`,
    `Industry: ${lead.industry}`,
    `Business Model: ${lead.businessModel}`,
    `Stage: ${lead.businessStage}`,
    `Team Size: ${lead.teamSize}`,
    `Markets: ${lead.markets}`,
    `Description: ${lead.businessDescription}`,
    '',
    `Track: ${trackLabel}`,
    `Score: ${result.score}`,
    `Score Label: ${result.scoreLabel ?? trackLabel}`,
    `Interpretation: ${result.interpretation.label}`,
    `Strategic Component: ${result.strategicScore ?? 'N/A'}`,
    `Operational Component: ${result.operationalScore ?? 'N/A'}`,
    `Action: ${result.interpretation.action}`,
    '',
    'Strategic Value Propositions:',
    ...(result.strategicValuePropositions ?? []).map((p) => `- ${p}`),
    '',
    'Operational Value Propositions:',
    ...(result.operationalValuePropositions ?? []).map((p) => `- ${p}`),
    '',
    'Cumulative Roadmap:',
    ...(result.cumulativeRoadmap ?? []).map((p) => `- ${p}`),
    '',
    'Responses:',
  ];

  for (const d of assessment.responseDetails) {
    if (d.section) lines.push(`\n[${d.section}]`);
    lines.push(`Q: ${d.question}`);
    lines.push(`A: ${d.answer}`);
  }

  lines.push(`\nSubmitted: ${submittedAt}`);
  return lines.join('\n');
}

function buildUserConfirmationHtml(
  name: string,
  websiteUrl: string,
  linkedinUrl: string
): string {
  return `
<!DOCTYPE html>
<html>
<body style="font-family:Georgia,serif;color:#0D1B2A;max-width:560px;margin:0 auto;padding:32px 24px;line-height:1.7;">
  <p style="font-size:16px;">Hi ${escapeHtml(name)},</p>
  <p style="font-size:15px;">
    Thank you for taking Quantix Strategies' Leader Bandwidth Audit. We shall get back to you with your scores and curated recommendations, within the next 48 hours.
  </p>
  <p style="font-size:15px;">
    In the meantime, please check out our
    <a href="${escapeHtml(websiteUrl)}" style="color:#386FA4;">Website</a>
    and
    <a href="${escapeHtml(linkedinUrl)}" style="color:#386FA4;">LinkedIn</a>.
  </p>
  <p style="font-size:15px;">Let's build something credible together!</p>
  <p style="font-size:15px;margin-top:32px;">
    Quantix Strategies<br>
    <em style="color:#666;">Turning Data into Direction</em>
  </p>
</body>
</html>`;
}

function buildUserConfirmationText(
  name: string,
  websiteUrl: string,
  linkedinUrl: string
): string {
  return `Hi ${name},

Thank you for taking Quantix Strategies' Leader Bandwidth Audit. We shall get back to you with your scores and curated recommendations, within the next 48 hours.

In the meantime, please check out our Website ${websiteUrl} and LinkedIn ${linkedinUrl}.

Let's build something credible together!

Quantix Strategies
Turning Data into Direction`;
}

function isValidPayload(body: unknown): body is SubmissionPayload {
  if (!body || typeof body !== 'object') return false;
  const p = body as SubmissionPayload;
  const lead = p.lead;
  const assessment = p.assessment;
  if (!lead?.email || !lead?.name || !lead?.businessName) return false;
  if (!assessment?.result || !Array.isArray(assessment.responseDetails)) return false;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email);
  return emailOk;
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed' });
  }

  let body: unknown;
  try {
    body = JSON.parse(event.body ?? '{}');
  } catch {
    return jsonResponse(400, { error: 'Invalid JSON body' });
  }

  const payload = body as SubmissionPayload;

  if (payload.website) {
    return jsonResponse(200, { success: true });
  }

  if (!isValidPayload(payload)) {
    return jsonResponse(400, { error: 'Missing or invalid submission data' });
  }

  try {
    await sendAssessmentEmails(payload);
    return jsonResponse(200, { success: true });
  } catch (err) {
    console.error('Assessment email delivery failed:', err);
    return jsonResponse(500, {
      error: 'Unable to send your assessment. Please try again or contact inquiries@quantixstrategies.com.',
    });
  }
};

async function sendAssessmentEmails(payload: SubmissionPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.ASSESSMENT_NOTIFY_EMAIL ?? 'inquiries@quantixstrategies.com';
  const fromEmail = process.env.ASSESSMENT_FROM_EMAIL ?? 'onboarding@resend.dev';
  const websiteUrl = process.env.QUANTIX_WEBSITE_URL ?? 'https://www.quantixstrategies.com';
  const linkedinUrl =
    process.env.QUANTIX_LINKEDIN_URL ?? 'https://www.linkedin.com/company/quantix-strategies';

  if (!apiKey) {
    console.warn(
      'RESEND_API_KEY is not configured, submission accepted but emails skipped'
    );
    return;
  }

  const resend = new Resend(apiKey);
  const trackLabel = TRACK_LABELS[payload.assessment.track] ?? payload.assessment.track;
  const teamSubject = `New Assessment Lead, ${payload.lead.businessName} (${trackLabel}), Score ${payload.assessment.result.score}`;

  const teamResult = await resend.emails.send({
    from: fromEmail,
    to: [notifyEmail],
    replyTo: payload.lead.email,
    subject: teamSubject,
    html: buildTeamEmailHtml(payload),
    text: buildTeamPlainText(payload),
  });

  if (teamResult.error) {
    throw new Error(`Team notification failed: ${teamResult.error.message}`);
  }

  const userResult = await resend.emails.send({
    from: fromEmail,
    to: [payload.lead.email],
    replyTo: notifyEmail,
    subject: 'Thank you for completing the Leader Bandwidth Audit',
    html: buildUserConfirmationHtml(payload.lead.name, websiteUrl, linkedinUrl),
    text: buildUserConfirmationText(payload.lead.name, websiteUrl, linkedinUrl),
  });

  if (userResult.error) {
    console.error('User confirmation email failed:', userResult.error);
  }
}
