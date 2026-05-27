import type {
  AssessmentResponses,
  AssessmentResult,
  AssessmentTrack,
} from '@/types/assessment';
import {
  BUSINESS_MODEL_OPTIONS,
  BUSINESS_STAGE_OPTIONS,
  INDUSTRY_OPTIONS,
  MARKETS_OPTIONS,
  TEAM_SIZE_OPTIONS,
} from '@/data/leadFormOptions';
import { z } from 'zod';

export const leadCaptureSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  businessName: z.string().min(1, 'Business name is required').max(200),
  email: z.string().email('Enter a valid email address'),
  industry: z.enum(INDUSTRY_OPTIONS, { required_error: 'Select an industry' }),
  businessModel: z.enum(BUSINESS_MODEL_OPTIONS, { required_error: 'Select a business model' }),
  businessStage: z.enum(BUSINESS_STAGE_OPTIONS, { required_error: 'Select a business stage' }),
  teamSize: z.enum(TEAM_SIZE_OPTIONS, { required_error: 'Select team size' }),
  markets: z.enum(MARKETS_OPTIONS, { required_error: 'Select a market' }),
  businessDescription: z
    .string()
    .min(10, 'Please describe your business in at least a few words')
    .max(200, 'Keep your description to one sentence (200 characters max)'),
  website: z.string().max(0).optional(),
});

export type LeadCaptureFormData = z.infer<typeof leadCaptureSchema>;

export type ResponseDetail = {
  section?: string;
  question: string;
  answer: string;
};

export type AssessmentSubmissionPayload = {
  /** Honeypot — must be empty; bots are silently accepted without email */
  website?: string;
  lead: Omit<LeadCaptureFormData, 'website'>;
  assessment: {
    track: AssessmentTrack;
    responses: AssessmentResponses;
    strategicResponses?: AssessmentResponses;
    operationalResponses?: AssessmentResponses;
    responseDetails: ResponseDetail[];
    result: AssessmentResult;
  };
  submittedAt: string;
};
