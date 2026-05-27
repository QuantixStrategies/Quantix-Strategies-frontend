import type { AssessmentSubmissionPayload } from '@/types/leadCapture';

export class AssessmentSubmitError extends Error {
  constructor(
    message: string,
    public readonly status?: number
  ) {
    super(message);
    this.name = 'AssessmentSubmitError';
  }
}

export async function submitAssessment(
  payload: AssessmentSubmissionPayload
): Promise<void> {
  const response = await fetch('/.netlify/functions/submit-assessment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = 'Unable to submit your details. Please try again.';
    try {
      const data = (await response.json()) as { error?: string };
      if (data.error) message = data.error;
    } catch {
      // use default message
    }
    throw new AssessmentSubmitError(message, response.status);
  }
}
