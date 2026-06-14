import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

interface AssessmentCompletionProps {
  email?: string;
  onRestart?: () => void;
}

export function AssessmentCompletion({ email, onRestart }: AssessmentCompletionProps) {
  return (
    <div className="w-full bg-[var(--bg-primary)] px-4 pb-16 pt-0">
      <header className="px-4 py-10 text-center sm:py-[60px] sm:pb-10">
        <p className="mb-2 text-[11px] uppercase tracking-[3px] text-[#386FA4]">
          Assessment Complete
        </p>
        <h2 className="font-playfair text-[32px] font-normal text-[var(--text-primary)] sm:text-4xl">
          Thank You
        </h2>
      </header>

      <div className="mx-auto max-w-[640px] rounded-xl border border-[rgba(184,150,46,0.35)] border-t-4 border-t-[#B8962E] bg-[var(--bg-secondary)] px-8 py-10 text-center sm:px-12 sm:py-12">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(56,111,164,0.3)] bg-[rgba(56,111,164,0.1)] text-[#386FA4]">
          <Mail className="h-7 w-7" strokeWidth={1.5} aria-hidden />
        </div>

        <p className="text-[17px] leading-relaxed text-[var(--text-primary)]">
          Please check your inbox, for detailed strategic and operational gaps and Quantix
          Strategies&apos; Recommendations
        </p>

        {email ? (
          <p className="mt-4 text-[13px] text-[var(--text-muted)]">
            A confirmation has been sent to{' '}
            <span className="font-medium text-[var(--text-primary)]">{email}</span>
          </p>
        ) : null}
      </div>

      <div className="mx-auto mt-10 max-w-[640px] rounded-xl border border-[rgba(56,111,164,0.15)] bg-[var(--bg-secondary)] px-8 py-10 text-center sm:px-12">
        <p className="mb-7 text-sm text-[var(--text-muted)]">
          Our team will follow up with your scores and curated recommendations within 48 hours.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-[#386FA4] px-8 py-3.5 text-[13px] uppercase tracking-[1.5px] text-[var(--text-primary)] transition-all duration-[250ms] hover:bg-[#954F72]"
          >
            Return Home
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
