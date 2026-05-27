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

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-28 pt-0">
      {/* Sticky progress header  -  below navbar (page uses pt-20 on main) */}
      <div
        className="sticky top-20 z-40 border-b border-[rgba(56,111,164,0.15)] bg-[var(--bg-secondary)]"
        style={{ padding: '14px max(32px, 6vw)' }}
      >
        <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4">
          <p className="hidden min-[640px]:block min-w-0 shrink text-[12px] tracking-wide text-[var(--text-muted)]">
            {flowTitle}
          </p>
          <div className="h-1 min-h-[4px] w-full min-w-[120px] flex-1 rounded bg-[rgba(56,111,164,0.15)] min-[640px]:w-[40%]">
            <div
              className="h-full rounded bg-gradient-to-r from-[#386FA4] to-[#954F72] transition-[width] duration-[400ms] ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="hidden min-[640px]:block shrink-0 text-[12px] tracking-wide text-[#386FA4]">
            {answeredCount} of {questions.length} questions answered
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[720px] px-[max(24px,4vw)] pb-[120px] pt-12">
        <div className="space-y-5">
          {questions.map((question, index) => {
            const num = String(index + 1).padStart(2, '0');
            const answered = responses[question.id] !== undefined;

            return (
              <div
                key={question.id}
                className={`rounded-[10px] border bg-[var(--bg-secondary)] p-8 transition-[border-color] duration-200 sm:px-9 ${
                  answered
                    ? 'border-[rgba(56,111,164,0.4)]'
                    : 'border-[rgba(56,111,164,0.12)]'
                }`}
              >
                <p className="mb-2.5 text-[12px] tracking-[2px] text-[#B8962E]">
                  {num} -
                </p>
                <p className="mb-1.5 text-base font-medium leading-normal text-[var(--text-primary)]">
                  {question.question}
                </p>
                {question.type === 'scaled' && question.labels && (
                  <p className="mb-6 text-[12px] text-[var(--text-muted)]">
                    {question.labels.min} → {question.labels.max}
                  </p>
                )}
                {question.type === 'scaled' ? (
                  <div className="flex gap-2.5 max-[639px]:grid max-[639px]:grid-cols-3 max-[639px]:gap-2.5">
                    {question.scale.map((value) => {
                      const selected = responses[question.id] === value;
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => handleResponse(question.id, value)}
                          className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-lg border px-2 py-3.5 transition-all duration-200 max-[639px]:min-h-[52px] max-[639px]:w-full ${
                            selected
                              ? 'border-2 border-[#386FA4] bg-[rgba(56,111,164,0.15)]'
                              : 'border border-[rgba(56,111,164,0.2)] bg-[rgba(13,27,42,0.6)] hover:border-[#386FA4] hover:bg-[rgba(56,111,164,0.1)]'
                          }`}
                        >
                          <span
                            className={`text-lg font-semibold ${
                              selected ? 'text-[#386FA4]' : 'text-[var(--text-primary)]'
                            }`}
                          >
                            {value}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleResponse(question.id, 1)}
                      className={`flex-1 rounded-lg border px-4 py-3.5 text-center text-base font-medium transition-all duration-200 ${
                        responses[question.id] === 1
                          ? 'border-2 border-[#386FA4] bg-[rgba(56,111,164,0.15)] text-[var(--text-primary)]'
                          : 'border border-[rgba(56,111,164,0.2)] bg-[rgba(13,27,42,0.6)] text-[var(--text-primary)] hover:border-[#386FA4] hover:bg-[rgba(56,111,164,0.1)]'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleResponse(question.id, 0)}
                      className={`flex-1 rounded-lg border px-4 py-3.5 text-center text-base font-medium transition-all duration-200 ${
                        responses[question.id] === 0
                          ? 'border-2 border-[#954F72] bg-[rgba(149,79,114,0.1)] text-[var(--text-primary)]'
                          : 'border border-[rgba(56,111,164,0.2)] bg-[rgba(13,27,42,0.6)] text-[var(--text-primary)] hover:border-[#954F72] hover:bg-[rgba(149,79,114,0.08)]'
                      }`}
                    >
                      No
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed bottom bar */}
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
