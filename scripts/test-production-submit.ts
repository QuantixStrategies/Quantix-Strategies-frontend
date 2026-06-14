/**
 * POST a test assessment to the live Netlify function.
 * Usage: npx tsx scripts/test-production-submit.ts [site-url]
 */
import { buildAssessmentSubmission } from '../src/utils/formatAssessmentSubmission.ts';

const siteUrl = (process.argv[2] ?? 'https://www.quantixstrategies.com').replace(/\/$/, '');
const endpoint = `${siteUrl}/.netlify/functions/submit-assessment`;

const perfectStrategic = {
  time_split: 5,
  planning_consistency: 5,
  vision_docs: 1,
  delegation_rate: 5,
  decision_delays: 5,
  decision_matrix: 1,
  sustainability: 5,
  scalability: 5,
  succession_planning: 1,
  calendar_discipline: 5,
};

const payload = buildAssessmentSubmission(
  {
    name: 'Production E2E Test',
    businessName: 'Quantix Netlify Verification',
    email: 'inquiries@quantixstrategies.com',
    industry: 'Technology / SaaS',
    businessModel: 'B2B SaaS or Subscriptions',
    businessStage: 'Scaling',
    teamSize: '11–50',
    markets: 'India',
    businessDescription: 'Automated production verification of assessment submission on Netlify.',
    website: '',
  },
  { track: 'strategic', strategicResponses: perfectStrategic }
);

payload.submittedAt = new Date().toISOString();

console.log('POST', endpoint);

const response = await fetch(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});

const body = await response.text();
console.log('Status:', response.status);
console.log('Body:', body);

if (response.status !== 200) {
  process.exit(1);
}

console.log('Production submit-assessment test passed.');
