import { useState } from 'react';
import { Question, AssessmentResponses } from '@/types/assessment';

interface AssessmentFormProps {
  questions: Question[];
  onComplete: (responses: AssessmentResponses) => void;
  /** e.g. "Strategic Focus Audit · Step 1 of 2" */
  flowTitle: string;
  /** Bottom CTA label (default: submit / final step) */
  submitButtonLabel?: string;
  /** Optional hint under the CTA (e.g. part 2 length) */
  submitButtonHint?: string;
}

export function AssessmentForm({
  questions,
  onComplete,
  flowTitle,
  submitButtonLabel = 'Submit Assessment',
  submitButtonHint,
}: AssessmentFormProps) {
  const [responses, setResponses] = useState<AssessmentResponses>({});

  const handleResponse = (questionId: string, value: number) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    onComplete(responses);
  };

  const answeredCount = Object.keys(responses).length;
  const progress = (answeredCount / questions.length) * 100;
  const allAnswered = answeredCount === questions.length;

  let lastSection: string | null = null;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-28 pt-0">
      <div
        className="sticky top-20 z-40 border-b border-[rgba(56,111,164,0.15)] bg-[var(--bg-secondary)]"
        style={{ padding: '14px max(32px, 6vw)' }}
      >
        <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4">
          <p className="hidden min-w-0 shrink text-[12px] tracking-wide text-[var(--text-muted)] min-[640px]:block">
            {flowTitle}
          </p>
          <div className="h-1 min-h-[4px] w-full min-w-[120px] flex-1 rounded bg-[rgba(56,111,164,0.15)] min-[640px]:w-[40%]">
            <div
              className="h-full rounded bg-gradient-to-r from-[#386FA4] to-[#954F72] transition-[width] duration-[400ms] ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="hidden shrink-0 text-[12px] tracking-wide text-[#386FA4] min-[640px]:block">
            {answeredCount} of {questions.length} questions answered
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[720px] px-[max(24px,4vw)] pb-[120px] pt-12">
        <div className="space-y-5">
          {questions.map((question, index) => {
            const num = String(index + 1).padStart(2, '0');
            const answered = responses[question.id] !== undefined;
            const showSection = question.section !== lastSection;
            if (showSection) lastSection = question.section;

            return (
              <div key={question.id}>
                {showSection && (
                  <div className="mb-5 mt-8 first:mt-0 rounded-lg bg-[#0D1B2A] px-5 py-4 text-[15px] font-semibold text-[var(--text-primary)] border border-[rgba(56,111,164,0.25)]">
                    {question.section}
                  </div>
                )}

                <div
                  className={`rounded-[10px] border bg-[var(--bg-secondary)] p-8 transition-[border-color] duration-200 sm:px-9 ${
                    answered
                      ? 'border-[rgba(56,111,164,0.4)]'
                      : 'border-[rgba(56,111,164,0.12)]'
                  }`}
                >
                  <p className="mb-2.5 text-[12px] tracking-[2px] text-[#B8962E]">{num} -</p>
                  <p className="mb-1.5 text-base font-semibold leading-normal text-[var(--text-primary)]">
                    {question.title}
                  </p>
                  <p className="mb-6 text-[13px] leading-relaxed text-[var(--text-muted)]">
                    {question.subtitle}
                  </p>

                  <div className="flex flex-col gap-2.5">
                    {question.options.map((option) => {
                      const selected = responses[question.id] === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleResponse(question.id, option.value)}
                          className={`w-full rounded-lg border px-4 py-3.5 text-left text-[13px] leading-snug transition-all duration-200 ${
                            selected
                              ? question.type === 'binary' && option.value === 0
                                ? 'border-2 border-[#954F72] bg-[rgba(149,79,114,0.1)] text-[var(--text-primary)]'
                                : 'border-2 border-[#386FA4] bg-[rgba(56,111,164,0.15)] text-[var(--text-primary)]'
                              : 'border border-[rgba(56,111,164,0.2)] bg-[rgba(13,27,42,0.6)] text-[var(--text-muted)] hover:border-[#386FA4] hover:bg-[rgba(56,111,164,0.1)] hover:text-[var(--text-primary)]'
                          }`}
                        >
                          {question.type === 'scaled' && (
                            <span
                              className={`mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                                selected
                                  ? 'bg-[#386FA4] text-white'
                                  : 'bg-[rgba(56,111,164,0.2)] text-[var(--text-muted)]'
                              }`}
                            >
                              {option.value}
                            </span>
                          )}
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-[rgba(56,111,164,0.15)] bg-[var(--bg-secondary)]"
        style={{ padding: '16px max(32px, 6vw)' }}
      >
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xl font-semibold text-[#B8962E]">{Math.round(progress)}%</div>
            <div className="text-[12px] text-[var(--text-muted)]">
              {answeredCount} of {questions.length} questions completed
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            {submitButtonHint ? (
              <p className="max-w-[280px] text-right text-[11px] leading-snug text-[var(--text-muted)]">
                {submitButtonHint}
              </p>
            ) : null}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!allAnswered}
              className={`rounded-md border-none px-9 py-3 text-[13px] uppercase tracking-[1.5px] transition-all duration-[250ms] ${
                allAnswered
                  ? 'cursor-pointer bg-[#386FA4] text-[var(--text-primary)] hover:bg-[#954F72]'
                  : 'cursor-not-allowed bg-[rgba(56,111,164,0.3)] text-[rgba(240,237,232,0.4)]'
              }`}
            >
              {submitButtonLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
