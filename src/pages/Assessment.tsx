import { useEffect, useState } from 'react';
import { scrollToTop } from '@/lib/scrollToTop';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { AssessmentForm } from '@/components/AssessmentForm';
import { AssessmentLeadForm } from '@/components/AssessmentLeadForm';
import { AssessmentCompletion } from '@/components/AssessmentCompletion';
import {
  AssessmentTrack,
  AssessmentResponses,
  AssessmentPhase,
  PendingAssessment,
} from '@/types/assessment';
import { strategicQuestions, operationalQuestions } from '@/utils/assessmentQuestions';
import { ChevronDown, Crosshair, Gauge, Layers } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

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
  const [phase, setPhase] = useState<AssessmentPhase>('select');
  const [selectedTrack, setSelectedTrack] = useState<AssessmentTrack | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [pendingAssessment, setPendingAssessment] = useState<PendingAssessment | null>(null);
  const [comprehensiveStep, setComprehensiveStep] = useState<'strategic' | 'operational' | null>(
    null
  );
  const [strategicResponses, setStrategicResponses] = useState<AssessmentResponses>({});
  const [whyExpanded, setWhyExpanded] = useState(false);

  // Long assessment steps leave the user scrolled down, reset on every phase transition
  useEffect(() => {
    scrollToTop();
  }, [phase, comprehensiveStep]);

  const startAssessment = (track: AssessmentTrack) => {
    setSelectedTrack(track);
    setPhase('assessing');
    if (track === 'comprehensive') {
      setComprehensiveStep('strategic');
    }
  };

  const handleAssessmentComplete = (responses: AssessmentResponses) => {
    if (selectedTrack === 'comprehensive' && comprehensiveStep === 'strategic') {
      setStrategicResponses(responses);
      setComprehensiveStep('operational');
      return;
    }

    if (!selectedTrack) return;

    let pending: PendingAssessment;

    if (selectedTrack === 'comprehensive' && comprehensiveStep === 'operational') {
      pending = {
        track: 'comprehensive',
        strategicResponses,
        operationalResponses: responses,
      };
    } else if (selectedTrack === 'operational') {
      pending = {
        track: 'operational',
        strategicResponses: {},
        operationalResponses: responses,
      };
    } else {
      pending = {
        track: 'strategic',
        strategicResponses: responses,
      };
    }

    setPendingAssessment(pending);
    setPhase('leadCapture');
  };

  const handleLeadFormSuccess = (email: string) => {
    setSubmittedEmail(email);
    setPhase('results');
  };

  const resetAssessment = () => {
    setPhase('select');
    setSelectedTrack(null);
    setSubmittedEmail(null);
    setPendingAssessment(null);
    setComprehensiveStep(null);
    setStrategicResponses({});
  };

  if (phase === 'results') {
    return (
      <div className="animate-fade-in">
        <Navigation />
        <main className="min-h-screen bg-[var(--bg-primary)] pt-20">
          <AssessmentCompletion email={submittedEmail ?? undefined} onRestart={resetAssessment} />
        </main>
        <Footer />
      </div>
    );
  }

  if (phase === 'leadCapture' && pendingAssessment) {
    return (
      <div className="animate-fade-in">
        <Navigation />
        <main className="min-h-screen bg-[var(--bg-primary)] pt-20">
          <AssessmentLeadForm pending={pendingAssessment} onSuccess={handleLeadFormSuccess} />
        </main>
        <Footer />
      </div>
    );
  }

  if (phase === 'assessing' && selectedTrack) {
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
          style={{ padding: '56px 0 28px' }}
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

        {/* Why this assessment, on top, collapsed by default so cards stay visible */}
        <section
          className="mx-auto max-w-[1100px] px-[max(32px,6vw)]"
          style={{ marginTop: '24px', marginBottom: '32px' }}
        >
          <Collapsible open={whyExpanded} onOpenChange={setWhyExpanded}>
            <article className="overflow-hidden rounded-xl border border-[rgba(184,150,46,0.18)] bg-[var(--bg-secondary)] shadow-[0_4px_24px_rgba(13,27,42,0.04)]">
              <div className="border-l-4 border-[#B8962E]">
                <CollapsibleTrigger asChild>
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-[rgba(184,150,46,0.05)] max-sm:px-5"
                    aria-expanded={whyExpanded}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="font-playfair text-lg text-[var(--text-primary)]">
                          Why this assessment?
                        </h3>
                        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#B8962E]">
                          {whyExpanded ? 'Hide overview' : 'Read overview'}
                        </span>
                      </div>
                      {!whyExpanded && (
                        <p className="mt-2 line-clamp-2 text-[13px] leading-[1.75] text-[var(--text-muted)]">
                          Most Founders, CXOs, and MDs already sense something is off: decisions take
                          longer than they should, your calendar is full but the business isn&apos;t
                          moving, or you can feel a gap in your strategy without being able to name it.
                        </p>
                      )}
                    </div>
                    <ChevronDown
                      className={cn(
                        'mt-0.5 h-5 w-5 shrink-0 text-[#B8962E] transition-transform duration-300',
                        whyExpanded && 'rotate-180'
                      )}
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </button>
                </CollapsibleTrigger>

                <CollapsibleContent className="overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="space-y-5 border-t border-[rgba(184,150,46,0.12)] px-6 pb-7 pt-5 text-[13px] leading-[1.85] text-[var(--text-muted)] max-sm:px-5">
                    <p>
                      Most Founders, CXOs, and MDs already sense something is off: decisions take
                      longer than they should, your calendar is full but the business isn&apos;t moving,
                      or you can feel a gap in your strategy without being able to name it. The hard
                      part isn&apos;t noticing the friction. It&apos;s knowing exactly where it&apos;s
                      coming from, and what actually fixes it.
                    </p>
                    <p>
                      After optimizing 100+ high-growth Founders / CXOs / MDs / Leaders, Quantix
                      Strategies has prepared this assessment from patterns we&apos;ve seen repeatedly
                      across mid-market businesses in GCC, APAC, and North America vis-a-vis decision
                      backlog, scope creep, unscalable workload, missing growth roadmaps, operational
                      gaps, and deal blind spots. Most leaders are dealing with two or three of these
                      at once, often without realizing they&apos;re connected.
                    </p>
                    <p>
                      In 10 minutes, you&apos;ll get a clear picture of where your time and
                      decision-making capacity are actually going, and within 48 to 72 hours a
                      personalized roadmap for each gap: what you can fix yourself today, what role
                      you&apos;re missing, and where structural support would move the needle. No
                      pitch, no obligation. Just a clearer view of what&apos;s actually slowing you
                      down.
                    </p>

                    <div className="grid gap-6 min-[768px]:grid-cols-2">
                      <div className="rounded-lg border border-[rgba(56,111,164,0.12)] bg-[rgba(56,111,164,0.04)] p-4">
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#386FA4]">
                          Expected Outcomes
                        </p>
                        <ol className="list-decimal space-y-2 pl-4">
                          <li>
                            Diagnostic Clarity: Identification of top 3-5 optimization opportunities
                          </li>
                          <li>
                            Benchmarking: Comparison against high-performing founder standards
                          </li>
                          <li>
                            Action Plan: Prioritized recommendations with implementation timelines
                          </li>
                        </ol>
                      </div>

                      <div className="rounded-lg border border-[rgba(184,150,46,0.15)] bg-[rgba(184,150,46,0.04)] p-4">
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B8962E]">
                          Methodology
                        </p>
                        <p className="mb-3">
                          Built on proven consulting frameworks combining strategic planning,
                          operational excellence, behavioral psychology, and statistical analysis.
                        </p>
                        <ul className="list-disc space-y-1.5 pl-4">
                          <li>Strategy: Organizational design and strategic planning frameworks</li>
                          <li>Management: Leadership principles and scaling methodologies</li>
                          <li>Psychology: Decision-making and cognitive load optimization</li>
                          <li>Analytics: Data-driven scoring calibrated against 2,000+ assessments</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </article>
          </Collapsible>
        </section>

        {/* Assessment type cards */}
        <div
          className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 px-[max(32px,6vw)] max-[899px]:grid-cols-1 min-[900px]:grid-cols-3"
          style={{ marginBottom: '48px' }}
        >
          {/* Card 1, Strategic Focus Audit */}
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
              {['7 scaled questions', '3 binary questions', '3 minutes'].map((pill) => (
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

          {/* Card 2, Operational Excellence */}
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
              Systems, structure & execution. Evaluate role clarity, communication, stakeholder
              management
            </p>
            <div className="mb-7 flex flex-wrap gap-2">
              {['7 scaled questions', '4 binary questions', '11 questions', '3 minutes'].map((pill) => (
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

          {/* Card 3, Comprehensive */}
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
              {['All questions combined', '21 total questions', '7 minutes'].map((pill) => (
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
      </main>
      <Footer />
    </div>
  );
}
