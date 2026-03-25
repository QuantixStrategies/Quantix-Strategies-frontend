import { Link } from 'react-router-dom';
import { AssessmentResult } from '@/types/assessment';

interface AssessmentResultsProps {
  result: AssessmentResult;
  onRestart?: () => void;
}

export function AssessmentResults({ result, onRestart }: AssessmentResultsProps) {
  const assessmentName =
    result.track === 'strategic'
      ? 'Strategic Focus Assessment'
      : result.track === 'operational'
        ? 'Operational Excellence Assessment'
        : 'Comprehensive Assessment';

  return (
    <div className="w-full bg-[var(--bg-primary)] px-4 pb-16 pt-0">
      {/* Hero */}
      <header className="px-4 py-10 text-center sm:py-[60px] sm:pb-10">
        <p className="mb-2 text-[11px] uppercase tracking-[3px] text-[#386FA4]">
          Assessment Complete · Results
        </p>
        <h2 className="font-playfair text-[32px] font-normal text-[var(--text-primary)] sm:text-4xl">
          Assessment Results
        </h2>
        <p className="mt-2 text-[15px] text-[var(--text-muted)]">{assessmentName}</p>
      </header>

      {/* Score card */}
      <div
        className="mx-auto mb-10 max-w-[680px] rounded-xl border border-[rgba(184,150,46,0.25)] border-t-4 border-t-[#B8962E] bg-[var(--bg-secondary)] px-6 py-8 text-center sm:px-[52px] sm:py-12"
      >
        <div className="font-playfair text-[56px] font-normal leading-none text-[#B8962E] sm:text-[72px]">
          {result.score}
        </div>
        <p className="font-playfair mt-4 text-xl text-[var(--text-primary)]">
          {result.interpretation.label}
        </p>
        <p className="mb-8 mt-2 text-[13px] text-[var(--text-muted)]">
          Score Range: {result.interpretation.range} — {result.interpretation.description}
        </p>

        <div className="w-full">
          <div className="h-1.5 w-full overflow-hidden rounded-md bg-[rgba(56,111,164,0.15)]">
            <div
              className="h-full rounded-md bg-gradient-to-r from-[#386FA4] to-[#B8962E] transition-[width] duration-1000 ease-out"
              style={{ width: `${result.score}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[11px] text-[var(--text-muted)]">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      </div>

      {/* Recommended action */}
      <div className="mx-auto mb-5 max-w-[680px] rounded-lg border border-[rgba(56,111,164,0.2)] border-l-4 border-l-[#386FA4] bg-[rgba(56,111,164,0.08)] px-6 py-6 sm:px-7">
        <p className="mb-2 text-[10px] uppercase tracking-[2.5px] text-[#386FA4]">
          Recommended Action
        </p>
        <p className="text-[15px] leading-relaxed text-[var(--text-primary)]">
          {result.interpretation.action}
        </p>
      </div>

      {/* Strategic value propositions */}
      <div className="mx-auto mb-10 max-w-[680px]">
        <h3 className="font-playfair text-lg text-[var(--text-primary)]">
          Where Quantix Strategies Can Help
        </h3>
        <p className="mb-6 mt-2 text-[13px] text-[var(--text-muted)]">
          Based on your assessment, here are the key areas where Quantix Strategies can help:
        </p>
        <ul className="space-y-0">
          {result.valuePropositions.map((proposition, index) => (
            <li
              key={index}
              className="flex gap-3.5 border-b border-[rgba(56,111,164,0.1)] py-3.5 first:pt-0 last:border-b-0"
            >
              <span className="mt-0.5 flex-shrink-0 text-sm text-[#B8962E]" aria-hidden>
                ✦
              </span>
              <span className="text-sm leading-relaxed text-[var(--text-muted)]">{proposition}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="mx-auto max-w-[680px] rounded-xl border border-[rgba(56,111,164,0.15)] bg-[var(--bg-secondary)] px-8 py-10 text-center sm:px-12">
        <h3 className="font-playfair text-2xl text-[var(--text-primary)]">
          Ready to Act on These Insights?
        </h3>
        <p className="mb-7 mt-3 text-sm text-[var(--text-muted)]">
          Every engagement begins with a confidential conversation.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-[#386FA4] px-8 py-3.5 text-[13px] uppercase tracking-[1.5px] text-[var(--text-primary)] transition-all duration-[250ms] hover:bg-[#954F72]"
          >
            Start a Conversation
          </Link>
          {onRestart && (
            <button
              type="button"
              onClick={onRestart}
              className="inline-flex items-center justify-center rounded-md border border-[rgba(56,111,164,0.4)] bg-transparent px-8 py-3.5 text-[13px] uppercase tracking-[1.5px] text-[var(--text-muted)] transition-all duration-[250ms] hover:border-[#386FA4] hover:text-[var(--text-primary)]"
            >
              Retake Assessment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
