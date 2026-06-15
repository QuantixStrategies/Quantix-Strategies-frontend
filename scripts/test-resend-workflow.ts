/**
 * Integration test: loads .env and invokes submit-assessment handler with Resend.
 * Usage: npx tsx scripts/test-resend-workflow.ts [recipient-email]
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildAssessmentSubmission } from '../src/utils/formatAssessmentSubmission.ts';
import { handler } from '../netlify/functions/submit-assessment.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const envPath = resolve(root, '.env');

function loadEnvFile(path: string) {
  if (!existsSync(path)) {
    throw new Error(`Missing ${path}, create it from .env.example`);
  }
  const content = readFileSync(path, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(envPath);

const testRecipient = process.argv[2] ?? process.env.TEST_ASSESSMENT_EMAIL;
if (!testRecipient) {
  console.error('Provide test email: npx tsx scripts/test-resend-workflow.ts you@example.com');
  process.exit(1);
}

if (!process.env.RESEND_API_KEY) {
  console.error('RESEND_API_KEY not set in .env');
  process.exit(1);
}

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
    name: 'Resend Workflow Test',
    businessName: 'Quantix Test Submission',
    email: testRecipient,
    industry: 'Technology / SaaS',
    businessModel: 'B2B SaaS or Subscriptions',
    businessStage: 'Scaling',
    teamSize: '11–50',
    markets: 'India',
    businessDescription: 'Automated integration test for Founder Bandwidth Audit email delivery.',
    website: '',
  },
  {
    track: 'strategic',
    strategicResponses: perfectStrategic,
  }
);

payload.submittedAt = new Date().toISOString();

console.log('Sending test assessment emails via Resend...');
console.log(`  Team notify: ${process.env.ASSESSMENT_NOTIFY_EMAIL ?? 'inquiries@quantixstrategies.com'}`);
console.log(`  User confirm: ${testRecipient}`);
console.log(`  Score: ${payload.assessment.result.score}`);

const response = await handler(
  {
    httpMethod: 'POST',
    body: JSON.stringify(payload),
  } as Parameters<typeof handler>[0],
  {} as Parameters<typeof handler>[1]
);

console.log('HTTP status:', response.statusCode);
console.log('Body:', response.body);

if (response.statusCode !== 200) {
  process.exit(1);
}

console.log('Resend workflow test passed.');
