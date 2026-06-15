import { useEffect, useRef, useState } from "react";
import { Globe, Users, TrendingUp, Award } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { NarrativeChapter } from "@/components/NarrativeChapter";
import CaseStudySpotlight from "@/components/CaseStudySpotlight";

const metrics = [
  {
    icon: Globe,
    value: "5+",
    label: "Geographies Served",
    description: "USA, UK, Europe, Middle-East, South-East Asia",
  },
  {
    icon: Users,
    value: "100+",
    label: "Clients Served",
    description: "Conglomerates, family offices, and businesses",
  },
  {
    icon: TrendingUp,
    value: "1.2",
    label: "AUM Advised",
    description: "Assets under management advised globally",
    decimals: 1,
    prefix: "~$",
    suffix: " Tn",
  },
  {
    icon: Award,
    value: "50+",
    label: "Years Combined Experience",
    description: "Consulting, assurance, strategy, and investments",
  },
] as const;

function MetricCard({
  metric,
  active,
}: {
  metric: (typeof metrics)[number];
  active: boolean;
}) {
  const Icon = metric.icon;
  const counted = useCountUp(metric.value, active, {
    decimals: "decimals" in metric ? metric.decimals : 0,
  });
  const animated =
    "prefix" in metric && "suffix" in metric
      ? `${metric.prefix}${counted}${metric.suffix}`
      : counted;

  return (
    <div className="text-center">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-card">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="mb-2 text-4xl font-bold text-primary">{animated}</div>
      <div className="mb-1 text-base font-semibold text-foreground">{metric.label}</div>
      <p className="text-sm text-muted-foreground">{metric.description}</p>
    </div>
  );
}

export default function ProofSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setStatsActive(true), {
      threshold: 0.25,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="proof" className="section-bg-primary-dotted py-[100px]">
      <div className="container mx-auto max-w-6xl px-4 lg:px-8">
        <NarrativeChapter
          chapter="Chapter 02"
          title="Proof That Strategy Works"
          subtitle="Twenty-five years of advisory work across geographies, client types, and asset classes — measured in outcomes, not promises."
          className="mb-16 md:mb-20"
        />

        <div
          ref={statsRef}
          className="mb-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:mb-20"
        >
          {metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} active={statsActive} />
          ))}
        </div>

        <CaseStudySpotlight />
      </div>
    </section>
  );
}
