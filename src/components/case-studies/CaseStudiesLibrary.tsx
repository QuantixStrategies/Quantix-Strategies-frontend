import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  cases,
  FILTER_LABELS,
  type CaseStudy,
  type FilterPill,
} from "@/data/caseStudies";

const NAV_OFFSET = 64;

function formatCaseNo(id: number) {
  return String(id).padStart(2, "0");
}

function CaseStudyCard({
  c,
  onOpen,
}: {
  c: CaseStudy;
  onOpen: (c: CaseStudy) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "flex cursor-pointer flex-col overflow-hidden rounded-[10px] border border-[rgba(56,111,164,0.12)] bg-[#1A1A2E] transition-all duration-300 ease-out",
        "border-t-[3px] border-t-[#386FA4] hover:-translate-y-[5px] hover:border-t-[#B8962E] hover:shadow-[0_16px_48px_rgba(56,111,164,0.15)]"
      )}
      onClick={() => onOpen(c)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(c);
        }
      }}
    >
      <div className="flex items-center justify-between bg-[#0D1B2A] px-6 py-[18px]">
        <span
          className="rounded-full border border-[rgba(56,111,164,0.2)] bg-[rgba(56,111,164,0.1)] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[2px] text-[#386FA4]"
        >
          {c.tag}
        </span>
        <span className="font-playfair text-[22px] font-normal text-[#B8962E]">{c.stat.v}</span>
      </div>
      <div className="px-6 pb-6 pt-5">
        <p
          className="mb-2 text-[11px] uppercase tracking-[2px] text-[rgba(184,150,46,0.4)]"
          style={{ letterSpacing: "2px" }}
        >
          {formatCaseNo(c.id)}
        </p>
        <h3 className="mb-4 font-playfair text-[17px] font-normal leading-[1.35] text-[#F0EDE8]">
          {c.title}
        </h3>
        <div className="mb-4 h-px w-9 bg-[#B8962E]" style={{ width: 36 }} />
        <div className="relative">
          <span className="absolute -left-0.5 -top-1 font-playfair text-[18px] leading-none text-[#B8962E]">
            &ldquo;
          </span>
          <p className="line-clamp-3 pl-3 text-[12px] italic leading-[1.7] text-[#A8B2BD]">
            {c.quote}
          </p>
        </div>
        <div className="mt-5 flex gap-4 border-t border-[rgba(56,111,164,0.1)] pt-4">
          <div>
            <p className="mb-1 text-[9px] uppercase tracking-[2px] text-[rgba(168,178,189,0.5)]">
              Client
            </p>
            <p className="text-[11px] text-[#A8B2BD]">{c.client}</p>
          </div>
          <div>
            <p className="mb-1 text-[9px] uppercase tracking-[2px] text-[rgba(168,178,189,0.5)]">
              Industry
            </p>
            <p className="text-[11px] text-[#A8B2BD]">{c.industry}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function CaseStudyModal({ c, onClose }: { c: CaseStudy; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[1000] overflow-y-auto backdrop-blur-[8px] max-[639px]:min-h-screen"
      style={{ background: "rgba(13,27,42,0.95)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="mx-auto max-w-[760px] px-6 pb-20 pt-10 max-[639px]:mx-0 max-[639px]:max-w-none max-[639px]:rounded-none max-[639px]:px-4">
        <div className="sticky top-5 z-10 float-right clear-both mb-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[rgba(56,111,164,0.3)] bg-[rgba(56,111,164,0.15)] text-lg leading-none text-[#A8B2BD] transition-colors duration-200 hover:bg-[#386FA4] hover:text-[#F0EDE8]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <header className="pb-8 pt-12">
          <span className="inline-block rounded-full border border-[rgba(56,111,164,0.2)] bg-[rgba(56,111,164,0.1)] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[2px] text-[#386FA4]">
            {c.tag}
          </span>
          <p className="mt-4 text-[11px] uppercase tracking-[2px] text-[#B8962E]">
            {formatCaseNo(c.id)}
          </p>
          <h2
            id="case-modal-title"
            className="mt-2 font-playfair text-[32px] font-normal leading-tight text-[#F0EDE8]"
          >
            {c.title}
          </h2>
          <div className="my-5 h-0.5 w-14 bg-[#B8962E]" style={{ width: 56, height: 2 }} />
        </header>

        <div className="mb-9 grid grid-cols-1 gap-8 rounded-[10px] border border-[rgba(56,111,164,0.12)] border-l-4 border-l-[#B8962E] bg-[#1A1A2E] p-7 min-[520px]:grid-cols-[auto_1px_1fr] min-[520px]:items-center min-[520px]:gap-8 min-[520px]:px-8 min-[520px]:py-7">
          <div className="min-w-0">
            <p className="font-playfair text-[40px] font-normal leading-none text-[#B8962E]">
              {c.stat.v}
            </p>
            <p className="mt-2 max-w-[180px] text-xs leading-relaxed text-[#A8B2BD]">{c.stat.label}</p>
          </div>
          <div
            className="hidden min-h-[120px] w-px bg-[rgba(56,111,164,0.2)] min-[520px]:block"
            aria-hidden
          />
          <div className="min-w-0 border-t border-[rgba(56,111,164,0.2)] pt-6 min-[520px]:border-t-0 min-[520px]:pt-0">
            <span className="font-playfair text-[32px] leading-none text-[#B8962E]">&ldquo;</span>
            <p className="mt-1 font-playfair text-[15px] italic leading-[1.7] text-[#F0EDE8]">
              {c.quote}
            </p>
          </div>
        </div>

        <section className="mb-7">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-[#B8962E]">○</span>
            <span className="text-[10px] uppercase tracking-[2px] text-[#A8B2BD]">The Situation</span>
          </div>
          <div className="mb-3 h-px w-7 bg-[#B8962E]" style={{ width: 28 }} />
          <p className="font-playfair text-[15px] leading-[1.9] text-[#A8B2BD]">{c.problem}</p>
        </section>

        <section className="mb-7">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-[#B8962E]">◇</span>
            <span className="text-[10px] uppercase tracking-[2px] text-[#A8B2BD]">Our Approach</span>
          </div>
          <div className="mb-3 h-px w-7 bg-[#B8962E]" style={{ width: 28 }} />
          <p className="font-playfair text-[15px] leading-[1.9] text-[#A8B2BD]">{c.approach}</p>
        </section>

        <section className="mb-7">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-[#B8962E]">△</span>
            <span className="text-[10px] uppercase tracking-[2px] text-[#A8B2BD]">The Outcome</span>
          </div>
          <div className="mb-3 h-px w-7 bg-[#B8962E]" style={{ width: 28 }} />
          <p className="font-playfair text-[15px] leading-[1.9] text-[#A8B2BD]">{c.outcome}</p>
        </section>

        <section
          className="mb-8 rounded-lg px-6 py-5"
          style={{ background: "rgba(56,111,164,0.05)" }}
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="text-[#B8962E]">□</span>
            <span className="text-[10px] uppercase tracking-[2px] text-[#A8B2BD]">Key Insight</span>
          </div>
          <div className="mb-3 h-px w-7 bg-[#B8962E]" style={{ width: 28 }} />
          <p className="font-playfair text-[15px] italic leading-[1.9] text-[#386FA4]">{c.insight}</p>
        </section>

        <footer className="flex flex-wrap gap-8 border-t border-[rgba(56,111,164,0.15)] pt-6">
          <div>
            <p className="mb-1 text-[9px] uppercase tracking-[2px] text-[rgba(168,178,189,0.5)]">Client</p>
            <p className="text-[11px] text-[#A8B2BD]">{c.client}</p>
          </div>
          <div>
            <p className="mb-1 text-[9px] uppercase tracking-[2px] text-[rgba(168,178,189,0.5)]">
              Industry
            </p>
            <p className="text-[11px] text-[#A8B2BD]">{c.industry}</p>
          </div>
        </footer>
      </div>
    </motion.div>
  );
}

export default function CaseStudiesLibrary() {
  const [filter, setFilter] = useState<FilterPill>("All Cases");
  const [modalCase, setModalCase] = useState<CaseStudy | null>(null);

  const filtered = useMemo(() => {
    if (filter === "All Cases") return cases;
    return cases.filter((c) => c.tag === filter);
  }, [filter]);

  const countLabel = `Showing ${filtered.length} case${filtered.length === 1 ? "" : "s"}`;

  return (
    <div className="bg-[#0D1B2A]">
      {/* Hero */}
      <section className="w-full bg-[#0D1B2A] px-[max(32px,8vw)] pb-[60px] pt-20">
        <p className="text-[11px] uppercase tracking-[3px] text-[#386FA4]" style={{ letterSpacing: "3px" }}>
          Knowledge · Case Studies
        </p>
        <h1 className="mt-4 max-w-3xl font-playfair text-[42px] font-normal leading-tight text-[#F0EDE8]">
          Fifteen Situations. One Common Thread.
        </h1>
        <div className="my-6 h-0.5 w-14 bg-[#B8962E]" style={{ width: 56, height: 2 }} />
        <p className="max-w-[560px] text-[15px] leading-[1.8] text-[#A8B2BD]">
          Real-world strategic interventions across industries and organization types — every situation
          where the right lens changed the outcome.
        </p>
        <a
          href="/quantix_pdf.html"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block border border-[#B8962E] bg-transparent px-8 py-3 text-[11px] uppercase tracking-[2px] text-[#B8962E] transition-all duration-300 ease-out hover:bg-[#B8962E] hover:text-[#0D1B2A]"
          style={{ letterSpacing: "2px" }}
        >
          Download Full Case Book
        </a>
      </section>

      {/* Sticky filter */}
      <div
        className="sticky z-10 border-b border-[rgba(56,111,164,0.08)] bg-[#1A1A2E]"
        style={{ top: NAV_OFFSET }}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-[max(32px,8vw)] py-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="-mx-1 flex gap-2 overflow-x-auto pb-1 scrollbar-none"
          >
            {FILTER_LABELS.map((pill) => {
              const active = filter === pill;
              return (
                <button
                  key={pill}
                  type="button"
                  onClick={() => setFilter(pill)}
                  className={cn(
                    "shrink-0 rounded-full border px-5 py-[7px] text-xs tracking-wide transition-all duration-200 ease-out",
                    active
                      ? "border-[#386FA4] bg-[#386FA4] text-[#F0EDE8]"
                      : "border-[rgba(56,111,164,0.3)] bg-transparent text-[#A8B2BD] hover:border-[#386FA4] hover:text-[#F0EDE8]"
                  )}
                  style={{ letterSpacing: "1px" }}
                >
                  {pill}
                </button>
              );
            })}
          </div>
          <p className="shrink-0 text-xs text-[#A8B2BD] sm:text-right">{countLabel}</p>
        </div>
      </div>

      {/* Grid */}
      <section className="bg-[#0D1B2A] px-[max(32px,8vw)] py-[60px]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={filter}
            layout
            className="mx-auto grid max-w-7xl grid-cols-1 gap-6 min-[640px]:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((c) => (
              <CaseStudyCard key={c.id} c={c} onOpen={setModalCase} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#1A1A2E] px-[max(32px,8vw)] py-[60px]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center min-[640px]:flex-row min-[640px]:text-left">
          <div>
            <h3 className="font-playfair text-2xl text-[#F0EDE8]">
              Want to explore how we approach your situation?
            </h3>
            <p className="mt-2 text-sm text-[#A8B2BD]">
              Every engagement begins with a confidential conversation.
            </p>
          </div>
          <a
            href="mailto:info@quantixstrategies.com"
            className="inline-block rounded border-none bg-[#386FA4] px-9 py-3.5 text-xs uppercase tracking-[2px] text-[#F0EDE8] transition-all duration-300 ease-out hover:bg-[#954F72]"
          >
            Start a Conversation
          </a>
        </div>
      </section>

      <AnimatePresence>
        {modalCase ? (
          <CaseStudyModal key={modalCase.id} c={modalCase} onClose={() => setModalCase(null)} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
