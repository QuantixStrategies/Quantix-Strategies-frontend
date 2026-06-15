import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cases } from "@/data/caseStudies";

const spotlight = cases[0];

export default function CaseStudySpotlight() {
  return (
    <article className="overflow-hidden rounded-xl border border-[rgba(56,111,164,0.2)] bg-[#1A1A2E]">
      <div className="grid lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col justify-center border-b border-[rgba(56,111,164,0.15)] bg-[#0D1B2A] p-8 lg:border-b-0 lg:border-r lg:p-10">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.3em] text-[#386FA4]">
            Featured Case Study
          </p>
          <p className="font-playfair text-4xl font-normal leading-none text-[#B8962E] lg:text-5xl">
            {spotlight.stat.v}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#A8B2BD]">{spotlight.stat.label}</p>
          <div className="my-6 h-px w-12 bg-[#B8962E]" />
          <p className="font-playfair text-xl italic leading-relaxed text-[#F0EDE8]">
            &ldquo;{spotlight.quote}&rdquo;
          </p>
        </div>

        <div className="p-8 lg:p-10">
          <span className="inline-block rounded-full border border-[rgba(56,111,164,0.2)] bg-[rgba(56,111,164,0.1)] px-3 py-1 text-[9px] font-medium uppercase tracking-[2px] text-[#386FA4]">
            {spotlight.tag}
          </span>
          <h3 className="mt-4 font-playfair text-2xl font-normal leading-snug text-[#F0EDE8]">
            {spotlight.title}
          </h3>
          <p className="mt-4 text-sm leading-[1.8] text-[#A8B2BD] line-clamp-4">{spotlight.outcome}</p>
          <div className="mt-6 flex flex-wrap gap-6 text-xs text-[#A8B2BD]">
            <div>
              <p className="mb-1 uppercase tracking-[2px] text-[rgba(168,178,189,0.5)]">Client</p>
              <p>{spotlight.client}</p>
            </div>
            <div>
              <p className="mb-1 uppercase tracking-[2px] text-[rgba(168,178,189,0.5)]">Industry</p>
              <p>{spotlight.industry}</p>
            </div>
          </div>
          <Link
            to="/knowledge"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#386FA4] transition-colors hover:text-[#B8962E]"
          >
            Explore all case studies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
