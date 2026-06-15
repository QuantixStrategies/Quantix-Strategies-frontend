import { Link } from "react-router-dom";
import { Crosshair, Gauge, Layers, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NarrativeChapter } from "@/components/NarrativeChapter";

const tracks = [
  {
    icon: Crosshair,
    title: "Strategic Focus Audit",
    duration: "3 minutes",
    description: "Bandwidth, planning, delegation, and organizational alignment.",
  },
  {
    icon: Gauge,
    title: "Operational Excellence",
    duration: "3 minutes",
    description: "Role clarity, communication, and stakeholder management.",
  },
  {
    icon: Layers,
    title: "Comprehensive Assessment",
    duration: "7 minutes",
    description: "Full strategic and operational picture, recommended.",
    featured: true,
  },
];

export default function AssessmentPromoSection() {
  return (
    <section id="assessment" className="relative overflow-hidden bg-[#1A1A2E] py-[100px]">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(184,150,46,0.15), transparent)",
        }}
        aria-hidden
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 lg:px-8">
        <NarrativeChapter
          chapter="Chapter 05"
          title="Your Next Move"
          subtitle="In 10 minutes, get a clear picture of where your decision-making capacity is going, and a personalized roadmap within 48 hours. No pitch, no obligation."
          className="mb-14 md:mb-16"
        />

        <div className="mb-12 grid gap-5 md:grid-cols-3">
          {tracks.map((track) => {
            const Icon = track.icon;
            return (
              <div
                key={track.title}
                className={`rounded-lg border bg-[#0D1B2A] px-6 py-7 transition-all duration-300 hover:-translate-y-1 ${
                  track.featured
                    ? "border-[#B8962E] shadow-[0_8px_32px_rgba(184,150,46,0.12)]"
                    : "border-[rgba(56,111,164,0.2)]"
                }`}
              >
                {track.featured && (
                  <span className="mb-3 inline-block text-[10px] font-medium uppercase tracking-[0.2em] text-[#B8962E]">
                    Recommended
                  </span>
                )}
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-[rgba(56,111,164,0.2)] bg-[rgba(56,111,164,0.08)]">
                  <Icon className="h-5 w-5 text-[#386FA4]" strokeWidth={1.75} />
                </div>
                <h3 className="mb-2 font-playfair text-lg text-[#F0EDE8]">{track.title}</h3>
                <p className="mb-3 text-xs uppercase tracking-[0.15em] text-[#B8962E]">
                  {track.duration}
                </p>
                <p className="text-sm leading-relaxed text-[#A8B2BD]">{track.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-[#386FA4] px-10 text-[#F0EDE8] hover:bg-[#954F72]"
          >
            <Link to="/assessment">
              Start the Leader Bandwidth Audit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
