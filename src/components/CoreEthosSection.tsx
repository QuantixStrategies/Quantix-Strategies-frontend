import { useRef, useState, useEffect, useLayoutEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

const ethosPoints = [
  {
    number: "01",
    tag: "CONSISTENCY",
    heading: "Quality",
    headingHighlight: "Q",
    description:
      "Quality that's consistent and uncompromising — the foundation of every engagement.",
    microText: null as string | null,
  },
  {
    number: "02",
    tag: "INNOVATION",
    heading: "Next-Gen Mindset",
    headingHighlight: "N",
    description:
      "Embracing innovation and future-forward thinking to stay ahead of the curve.",
    microText: "Staying ahead through curiosity and bold thinking.",
  },
  {
    number: "03",
    tag: "INTEGRITY",
    heading: "Trust",
    headingHighlight: "T",
    description: "Trust, built through integrity and results you can measure.",
    microText: "Every relationship anchored in transparency.",
  },
  {
    number: "04",
    tag: "INTELLIGENCE",
    heading: "Insight-Led Strategy",
    headingHighlight: "I",
    description: "Insight-driven strategies powered by data and intuition.",
    microText: null as string | null,
  },
  {
    number: "05",
    tag: "EXCELLENCE",
    heading: "eXcellence",
    headingHighlight: "X",
    description:
      "Excellence at the intersection of vision and execution — where strategy meets delivery.",
    microText: "Where strategy meets flawless delivery.",
  },
] as const;

function renderHeading(heading: string, highlight: string) {
  const i = heading.indexOf(highlight);
  if (i === -1) {
    return (
      <>
        <span className="text-[#B8962E]">{heading.charAt(0)}</span>
        {heading.slice(1)}
      </>
    );
  }
  return (
    <>
      {heading.slice(0, i)}
      <span className="text-[#B8962E]">{highlight}</span>
      {heading.slice(i + highlight.length)}
    </>
  );
}

type Point = (typeof ethosPoints)[number];

function EthosCardInner({ point }: { point: Point }) {
  return (
    <>
      <p
        className="text-[11px] font-medium uppercase tracking-[3px] text-[#386FA4]"
        style={{ letterSpacing: "3px" }}
      >
        {point.tag}
      </p>
      <h3 className="my-2 text-[22px] font-semibold leading-tight text-[#F0EDE8]">
        {renderHeading(point.heading, point.headingHighlight)}
      </h3>
      <div className="my-3 h-0.5 w-9 bg-[#B8962E]" />
      <p className="text-[14px] leading-[1.7] text-[#A8B2BD]">{point.description}</p>
      {point.microText && (
        <p className="mt-3 text-[14px] leading-[1.7] text-[#A8B2BD]/90">{point.microText}</p>
      )}
    </>
  );
}

const cardShell =
  "rounded-lg border border-[rgba(56,111,164,0.2)] bg-[#1A1A2E] px-8 py-7 text-left " +
  "hover:shadow-[0_8px_32px_rgba(149,79,114,0.2)] hover:-translate-y-[3px] " +
  "transition-[transform,box-shadow] duration-300 ease-out";

export default function CoreEthosSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [titleVisible, setTitleVisible] = useState(false);
  const [lineProgress, setLineProgress] = useState(0);
  const [visibleRows, setVisibleRows] = useState<boolean[]>(() => ethosPoints.map(() => false));

  const updateLineProgress = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const start = vh * 0.92;
    const traveled = start - rect.top;
    const denom = Math.max(rect.height * 0.55, 1);
    setLineProgress(Math.min(1, Math.max(0, traveled / denom)));
  }, []);

  useEffect(() => {
    const titleEl = titleRef.current;
    if (!titleEl) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setTitleVisible(true), {
      threshold: 0.25,
    });
    obs.observe(titleEl);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateLineProgress, { passive: true });
    window.addEventListener("resize", updateLineProgress);
    updateLineProgress();
    return () => {
      window.removeEventListener("scroll", updateLineProgress);
      window.removeEventListener("resize", updateLineProgress);
    };
  }, [updateLineProgress]);

  useLayoutEffect(() => {
    const observers: IntersectionObserver[] = [];
    ethosPoints.forEach((_, index) => {
      const el = rowRefs.current[index];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setVisibleRows((prev) => {
              const next = [...prev];
              next[index] = true;
              return next;
            });
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const connector = (
    <div className="h-px w-10 shrink-0 bg-[rgba(184,150,46,0.6)]" aria-hidden />
  );

  return (
    <section
      id="ethos"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0D1B2A] py-[100px]"
    >
      <div className="container relative z-10 mx-auto max-w-6xl px-4 lg:px-8">
        <div ref={titleRef} className="mb-16 text-center md:mb-20">
          <h2
            className="mb-3 text-3xl font-bold text-[#F0EDE8] lg:text-4xl"
            style={{ lineHeight: "var(--leading-tight)" }}
          >
            Quantix Strategies: Core Ethos
          </h2>
          <div
            className="mx-auto mb-4 h-[3px] bg-[#B8962E] transition-all duration-500 ease-out"
            style={{ width: titleVisible ? 60 : 0, maxWidth: 60 }}
          />
          <p
            className="mx-auto max-w-[500px] text-sm text-[#A8B2BD]"
            style={{ lineHeight: "var(--leading-relaxed)" }}
          >
            The principles that guide every engagement we take on.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div
            className="pointer-events-none absolute left-1/2 top-0 z-0 hidden h-full w-[2px] md:block"
            style={{
              transform: `translateX(-50%) scaleY(${lineProgress})`,
              transformOrigin: "top center",
              background: "linear-gradient(to bottom, #386FA4, #954F72, #B8962E)",
            }}
            aria-hidden
          />

          <div
            className="pointer-events-none absolute left-6 top-0 z-0 h-full w-[2px] md:hidden"
            style={{
              transform: `scaleY(${lineProgress})`,
              transformOrigin: "top center",
              background: "linear-gradient(to bottom, #386FA4, #954F72, #B8962E)",
            }}
            aria-hidden
          />

          <div className="relative z-[1] space-y-10 md:space-y-16">
            {ethosPoints.map((point, index) => {
              const isLeft = index % 2 === 0;
              const isVisible = visibleRows[index];
              const delayMs = index * 150;

              const entrance = (fromLeft: boolean) =>
                cn(
                  "transition-[opacity,transform] duration-500 ease-out will-change-transform",
                  isVisible ? "translate-x-0 opacity-100" : fromLeft ? "-translate-x-10 opacity-0" : "translate-x-10 opacity-0"
                );

              const badge = (
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-bold text-[#0D1B2A]"
                  style={{
                    backgroundColor: "#B8962E",
                    boxShadow: "0 0 0 4px #0D1B2A, 0 0 0 6px rgba(184,150,46,0.4)",
                  }}
                >
                  {point.number}
                </div>
              );

              return (
                <div
                  key={point.number}
                  ref={(el) => {
                    rowRefs.current[index] = el;
                  }}
                  className="relative"
                >
                  <div className="hidden w-full grid-cols-[minmax(0,42%)_minmax(128px,auto)_minmax(0,42%)] items-center gap-0 md:grid">
                    <div className="min-w-0">
                      {isLeft ? (
                        <div className={entrance(true)} style={{ transitionDelay: `${delayMs}ms` }}>
                          <div
                            className={cn(
                              cardShell,
                              "border-l-[3px] border-l-[#954F72]"
                            )}
                          >
                            <EthosCardInner point={point} />
                          </div>
                        </div>
                      ) : (
                        <div className="min-h-[1px]" aria-hidden />
                      )}
                    </div>

                    <div className="flex items-center justify-center gap-0 px-2">
                      {isLeft ? (
                        <>
                          {connector}
                          {badge}
                        </>
                      ) : (
                        <>
                          {badge}
                          {connector}
                        </>
                      )}
                    </div>

                    <div className="min-w-0">
                      {!isLeft ? (
                        <div className={entrance(false)} style={{ transitionDelay: `${delayMs}ms` }}>
                          <div
                            className={cn(
                              cardShell,
                              "border-r-[3px] border-r-[#386FA4]"
                            )}
                          >
                            <EthosCardInner point={point} />
                          </div>
                        </div>
                      ) : (
                        <div className="min-h-[1px]" aria-hidden />
                      )}
                    </div>
                  </div>

                  <div className="flex items-stretch gap-0 pl-[60px] md:hidden">
                    <div className="absolute left-6 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-full text-base font-bold text-[#0D1B2A] transition-[opacity,transform] duration-500 ease-out",
                          isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
                        )}
                        style={{
                          backgroundColor: "#B8962E",
                          boxShadow: "0 0 0 4px #0D1B2A, 0 0 0 6px rgba(184,150,46,0.4)",
                          transitionDelay: `${delayMs}ms`,
                        }}
                      >
                        {point.number}
                      </div>
                    </div>
                    {connector}
                    <div
                      className={cn(
                        entrance(true),
                        "min-w-0 flex-1"
                      )}
                      style={{ transitionDelay: `${delayMs}ms` }}
                    >
                      <div className={cn(cardShell, "border-l-[3px] border-l-[#954F72]")}>
                        <EthosCardInner point={point} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
