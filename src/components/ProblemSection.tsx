import { useEffect, useRef, useState } from "react";
import { Calendar, Clock, HelpCircle } from "lucide-react";
import { NarrativeChapter } from "@/components/NarrativeChapter";
import { cn } from "@/lib/utils";

const painPoints = [
  {
    icon: Clock,
    title: "Decisions take longer than they should",
    description:
      "Every major call runs through one person. When they're unavailable, the organization stalls, no matter how capable the team is.",
  },
  {
    icon: Calendar,
    title: "Your calendar is full, but the business isn't moving",
    description:
      "Days disappear into operational firefighting. Strategic priorities keep slipping to next quarter, again.",
  },
  {
    icon: HelpCircle,
    title: "You sense a gap you can't name",
    description:
      "Something feels off in your strategy or operations, but without a clear diagnosis, you can't fix what you can't see.",
  },
];

export default function ProblemSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(() => painPoints.map(() => false));

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    painPoints.forEach((_, index) => {
      const el = cardRefs.current[index];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setVisibleCards((prev) => {
              const next = [...prev];
              next[index] = true;
              return next;
            });
          }
        },
        { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="problem" className="relative bg-[#0D1B2A] py-[100px]">
      <div className="container mx-auto max-w-6xl px-4 lg:px-8">
        <NarrativeChapter
          chapter="Chapter 01"
          title="The Challenge Leaders Face"
          subtitle="Most Founders, CXOs, and MDs already sense something is off. The friction isn't the problem, not knowing where it's coming from is."
          className="mb-16 md:mb-20"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            const isVisible = visibleCards[index];
            return (
              <div
                key={point.title}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={cn(
                  "rounded-lg border border-[rgba(149,79,114,0.25)] border-l-[3px] border-l-[#954F72] bg-[#1A1A2E] px-7 py-8 transition-[opacity,transform] duration-500 ease-out",
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-[rgba(149,79,114,0.3)] bg-[rgba(149,79,114,0.08)]">
                  <Icon className="h-5 w-5 text-[#954F72]" strokeWidth={1.75} />
                </div>
                <h3 className="mb-3 text-lg font-semibold leading-snug text-[#F0EDE8]">
                  {point.title}
                </h3>
                <p className="text-sm leading-[1.75] text-[#A8B2BD]">{point.description}</p>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-14 max-w-2xl text-center font-playfair text-lg italic leading-relaxed text-[#A8B2BD]">
          &ldquo;The hard part isn&apos;t noticing the friction. It&apos;s knowing exactly where
          it&apos;s coming from, and what actually fixes it.&rdquo;
        </p>
      </div>
    </section>
  );
}
