import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

const CONTACT_EMAIL = "inquiries@quantixstrategies.com";

export default function FinalCtaSection() {
  return (
    <section className="border-t border-[rgba(56,111,164,0.2)] bg-[#0D1B2A] py-20">
      <div className="container mx-auto max-w-3xl px-4 text-center lg:px-8">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[#B8962E]">
          Ready when you are
        </p>
        <h2 className="font-playfair text-3xl font-normal leading-tight text-[#F0EDE8] lg:text-4xl">
          Turn data into decision
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#A8B2BD]">
          Whether you need a diagnostic starting point or a strategic partner for the long haul,
          Quantix is built to be the extended team you can trust.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-[#386FA4] px-8 text-[#F0EDE8] hover:bg-[#954F72]"
          >
            <Link to="/assessment">
              Take the Assessment
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-[rgba(56,111,164,0.4)] bg-transparent text-[#F0EDE8] hover:border-[#B8962E] hover:bg-[rgba(184,150,46,0.08)]"
          >
            <a href={`mailto:${CONTACT_EMAIL}`}>
              <Mail className="h-4 w-4" />
              {CONTACT_EMAIL}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
