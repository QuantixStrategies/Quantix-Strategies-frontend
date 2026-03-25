import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { AssessmentForm } from '@/components/AssessmentForm';
import { AssessmentResults } from '@/components/AssessmentResults';
import { AssessmentTrack, AssessmentResponses, AssessmentResult } from '@/types/assessment';
import { strategicQuestions, operationalQuestions } from '@/utils/assessmentQuestions';
import { calculateScore, calculateComprehensiveScore } from '@/utils/assessmentScoring';
import { Crosshair, Gauge, Layers } from 'lucide-react';

function getFlowTitle(
  selectedTrack: AssessmentTrack,
  comprehensiveStep: 'strategic' | 'operational' | null
): string {
  if (selectedTrack === 'comprehensive' && comprehensiveStep === 'strategic') {
    return 'Strategic Focus Audit · Step 1 of 2';
  }
  if (selectedTrack === 'comprehensive' && comprehensiveStep === 'operational') {
    return 'Operational Excellence · Step 2 of 2';
  }
  if (selectedTrack === 'strategic') return 'Strategic Focus Audit · Step 1 of 1';
  if (selectedTrack === 'operational') return 'Operational Excellence · Step 1 of 1';
  return '';
}

export default function Assessment() {
  const [selectedTrack, setSelectedTrack] = useState<AssessmentTrack | null>(null);
  const [isAssessing, setIsAssessing] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [comprehensiveStep, setComprehensiveStep] = useState<'strategic' | 'operational' | null>(null);
  const [strategicResponses, setStrategicResponses] = useState<AssessmentResponses>({});

  const startAssessment = (track: AssessmentTrack) => {
    setSelectedTrack(track);
    setIsAssessing(true);
    if (track === 'comprehensive') {
      setComprehensiveStep('strategic');
    }
  };

  const handleAssessmentComplete = (responses: AssessmentResponses) => {
    if (selectedTrack === 'comprehensive' && comprehensiveStep === 'strategic') {
      setStrategicResponses(responses);
      setComprehensiveStep('operational');
    } else if (selectedTrack === 'comprehensive' && comprehensiveStep === 'operational') {
      const comprehensiveResult = calculateComprehensiveScore(strategicResponses, responses);
      setResult(comprehensiveResult);
      setIsAssessing(false);
    } else if (selectedTrack) {
      const assessmentResult = calculateScore(responses, selectedTrack);
      setResult(assessmentResult);
      setIsAssessing(false);
    }
  };

  const resetAssessment = () => {
    setSelectedTrack(null);
    setIsAssessing(false);
    setResult(null);
    setComprehensiveStep(null);
    setStrategicResponses({});
  };

  if (result) {
    return (
      <div className="animate-fade-in">
        <Navigation />
        <main className="min-h-screen bg-[var(--bg-primary)] pt-20">
          <AssessmentResults result={result} onRestart={resetAssessment} />
        </main>
        <Footer />
      </div>
    );
  }

  if (isAssessing && selectedTrack) {
    const questions =
      selectedTrack === 'strategic' || comprehensiveStep === 'strategic'
        ? strategicQuestions
        : operationalQuestions;

    const flowTitle = getFlowTitle(selectedTrack, comprehensiveStep);

    return (
      <div className="animate-fade-in">
        <Navigation />
        <main className="bg-[var(--bg-primary)] pt-20">
          <AssessmentForm
            key={`${selectedTrack}-${comprehensiveStep ?? 'single'}`}
            questions={questions}
            flowTitle={flowTitle}
            onComplete={handleAssessmentComplete}
            submitButtonLabel={
              selectedTrack === 'comprehensive' && comprehensiveStep === 'strategic'
                ? 'Next'
                : 'Submit Assessment'
            }
            submitButtonHint={
              selectedTrack === 'comprehensive' && comprehensiveStep === 'strategic'
                ? 'Part 2: 11 operational questions.'
                : undefined
            }
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <Navigation />
      <main className="min-h-screen bg-[var(--bg-primary)] pt-20">
        {/* Hero */}
        <header
          className="bg-[var(--bg-primary)] text-center"
          style={{ padding: '80px 0 48px' }}
        >
          <p
            className="mb-4 text-[11px] font-normal uppercase tracking-[3px] text-[#386FA4]"
          >
            Founder Diagnostic · Strategic Assessment
          </p>
          <h1
            className="font-playfair text-[40px] font-normal leading-tight text-[var(--text-primary)]"
          >
            Founder Strategic Assessment
          </h1>
          <div
            className="mx-auto my-5 h-0.5 w-14 bg-[#B8962E]"
            aria-hidden
          />
          <p className="mx-auto max-w-[560px] px-4 text-[15px] leading-[1.8] text-[var(--text-muted)]">
            Identify key leadership challenges and unlock strategic bandwidth with our data-driven
            assessment framework
          </p>
        </header>

        {/* Assessment type cards */}
        <div
          className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 px-[max(32px,6vw)] max-[899px]:grid-cols-1 min-[900px]:grid-cols-3"
          style={{ marginTop: '48px' }}
        >
          {/* Card 1 — Strategic Focus Audit */}
          <article className="group relative flex flex-col overflow-hidden rounded-xl border border-[rgba(56,111,164,0.15)] bg-[var(--bg-secondary)] px-8 py-9 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(56,111,164,0.35)] hover:shadow-[0_16px_48px_rgba(56,111,164,0.15)]">
            <div className="absolute left-0 right-0 top-0 h-[3px] bg-[#386FA4]" />
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[10px] border border-[rgba(56,111,164,0.25)] bg-[rgba(56,111,164,0.1)] text-[#386FA4]">
              <Crosshair className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <h2 className="mb-2.5 text-lg font-semibold text-[var(--text-primary)]">
              Strategic Focus Audit
            </h2>
            <div className="mb-3.5 h-0.5 w-8 bg-[#B8962E]" />
            <p className="mb-6 flex-1 text-[13px] leading-[1.7] text-[var(--text-muted)]">
              Evaluate your bandwidth, planning consistency, delegation effectiveness, and
              organizational alignment
            </p>
            <div className="mb-7 flex flex-wrap gap-2">
              {['7 scaled questions', '3 binary questions', '10-15 minutes'].map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-[rgba(56,111,164,0.2)] bg-[rgba(56,111,164,0.08)] px-3 py-1 text-[11px] tracking-wide text-[var(--text-muted)]"
                >
                  {pill}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => startAssessment('strategic')}
              className="w-full cursor-pointer rounded-md border-none bg-[#386FA4] py-3.5 text-[13px] font-normal uppercase tracking-[1.5px] text-[var(--text-primary)] transition-all duration-[250ms] hover:bg-[#954F72]"
            >
              Start Assessment
            </button>
          </article>

          {/* Card 2 — Operational Excellence */}
          <article className="group relative flex flex-col overflow-hidden rounded-xl border border-[rgba(56,111,164,0.15)] bg-[var(--bg-secondary)] px-8 py-9 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(56,111,164,0.35)] hover:shadow-[0_16px_48px_rgba(56,111,164,0.15)]">
            <div className="absolute left-0 right-0 top-0 h-[3px] bg-[#954F72]" />
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[10px] border border-[rgba(149,79,114,0.25)] bg-[rgba(149,79,114,0.1)] text-[#954F72]">
              <Gauge className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <h2 className="mb-2.5 text-lg font-semibold text-[var(--text-primary)]">
              Operational Excellence
            </h2>
            <div className="mb-3.5 h-0.5 w-8 bg-[#B8962E]" />
            <p className="mb-6 flex-1 text-[13px] leading-[1.7] text-[var(--text-muted)]">
              Systems, structure & execution - Evaluate role clarity, communication, stakeholder
              management
            </p>
            <div className="mb-7 flex flex-wrap gap-2">
              {['7 scaled questions', '4 binary questions', '10-15 minutes'].map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-[rgba(56,111,164,0.2)] bg-[rgba(56,111,164,0.08)] px-3 py-1 text-[11px] tracking-wide text-[var(--text-muted)]"
                >
                  {pill}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => startAssessment('operational')}
              className="w-full cursor-pointer rounded-md border-none bg-[#386FA4] py-3.5 text-[13px] font-normal uppercase tracking-[1.5px] text-[var(--text-primary)] transition-all duration-[250ms] hover:bg-[#954F72]"
            >
              Start Assessment
            </button>
          </article>

          {/* Card 3 — Comprehensive */}
          <article className="group relative flex flex-col overflow-hidden rounded-xl border border-[rgba(56,111,164,0.15)] bg-[var(--bg-secondary)] px-8 py-9 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(56,111,164,0.35)] hover:shadow-[0_16px_48px_rgba(56,111,164,0.15)]">
            <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-[#386FA4] to-[#954F72]" />
            <span
              className="absolute right-6 top-[18px] z-10 rounded-full border border-[rgba(184,150,46,0.45)] bg-[rgba(184,150,46,0.14)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B8962E]"
              aria-label="Recommended option"
            >
              Recommended
            </span>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[10px] border border-[rgba(184,150,46,0.25)] bg-[rgba(184,150,46,0.1)] text-[#B8962E]">
              <Layers className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <h2 className="mb-2.5 text-lg font-semibold text-[var(--text-primary)]">
              Comprehensive Assessment
            </h2>
            <div className="mb-3.5 h-0.5 w-8 bg-[#B8962E]" />
            <p className="mb-6 flex-1 text-[13px] leading-[1.7] text-[var(--text-muted)]">
              Complete strategic and operational assessment for holistic insights and
              recommendations
            </p>
            <div className="mb-7 flex flex-wrap gap-2">
              {['All questions combined', '21 total questions', '20-30 minutes'].map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-[rgba(56,111,164,0.2)] bg-[rgba(56,111,164,0.08)] px-3 py-1 text-[11px] tracking-wide text-[var(--text-muted)]"
                >
                  {pill}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => startAssessment('comprehensive')}
              className="w-full cursor-pointer rounded-md border-none bg-[#B8962E] py-3.5 text-[13px] font-semibold uppercase tracking-[1.5px] text-[#0D1B2A] transition-all duration-[250ms] hover:bg-[#CFA83A]"
            >
              Start Full Assessment
            </button>
          </article>
        </div>

        {/* Why this assessment */}
        <section
          className="mx-auto my-10 max-w-[1100px] rounded-xl border-l-4 border-[#B8962E] bg-[var(--bg-secondary)] px-12 py-10 max-sm:px-6"
          style={{ marginTop: '40px', marginBottom: '40px' }}
        >
          <h3 className="font-playfair mb-4 text-xl text-[var(--text-primary)]">
            Why This Assessment?
          </h3>
          <div className="space-y-4 text-sm leading-[1.9] text-[var(--text-muted)]">
            <p>
              After working with 145+ founders across family offices, fund managers, and corporates,
              we&apos;ve identified a consistent pattern:{' '}
              <strong className="font-semibold text-[var(--text-primary)]">
                founder bandwidth and operational excellence are the #1 bottlenecks to scaling.
              </strong>
            </p>
            <p>
              This assessment quantifies where you are on critical dimensions of strategic focus and
              operational effectiveness, providing you with a data-driven roadmap to reclaim 15-25
              hours per week and improve execution velocity by 40-70%.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
