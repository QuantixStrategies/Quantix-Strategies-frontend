import { Mouse, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HeroNoiseSignalCanvas } from "@/components/HeroNoiseSignalCanvas";

const ACCENT_GOLD = "#B8962E";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <HeroNoiseSignalCanvas />

      <div className="pointer-events-none absolute right-[4%] top-[28%] z-[1] hidden lg:block">
        <div className="relative">
          <div className="absolute -inset-6 rounded-full bg-[#B8962E]/10 blur-2xl" />
          <div className="relative rounded-full border border-[#B8962E]/30 bg-[#0D1B2A]/60 px-5 py-4 backdrop-blur-sm">
            <p className="text-center text-[9px] font-medium uppercase tracking-[0.35em] text-[#B8962E]">
              The Lens
            </p>
            <p className="mt-1 text-center font-playfair text-sm italic text-[#F0EDE8]/80">
              Data → Decision
            </p>
          </div>
        </div>
      </div>

      <div className="container relative z-[1] mx-auto px-4 py-32 lg:px-8 lg:py-40">
        <div className="max-w-4xl">
          <motion.p
            className="mb-6 text-[11px] font-medium uppercase tracking-[0.35em] text-[#B8962E]"
            style={{ letterSpacing: "0.35em" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Strategic Management Consulting
          </motion.p>

          <motion.div
            className="mb-8 flex items-start gap-5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            <div
              className="mt-1 h-28 w-1.5 flex-shrink-0 rounded-full md:h-36"
              style={{ backgroundColor: ACCENT_GOLD }}
            />
            <div>
              <h1
                className="font-playfair mb-1 font-normal leading-tight text-foreground"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
              >
                Turning Data
              </h1>
              <h2
                className="font-playfair font-normal leading-tight text-foreground"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
              >
                into Decision
              </h2>
            </div>
          </motion.div>

          <motion.p
            className="mb-10 ml-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Trusted extended team to global advisory firms and emerging businesses, delivering
            tailored strategies that turn complexity into clarity.
          </motion.p>

          <motion.div
            className="ml-8 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
          >
            <Button
              asChild
              size="lg"
              className="bg-[#386FA4] text-[#F0EDE8] hover:bg-[#954F72]"
            >
              <a href="#problem">
                Explore the Challenge
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-[rgba(56,111,164,0.4)] bg-transparent text-[#F0EDE8] hover:border-[#B8962E] hover:bg-[rgba(184,150,46,0.08)]"
            >
              <Link to="/assessment">Take the Assessment</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <a
        href="#problem"
        className="absolute bottom-8 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-2 animate-bounce"
        aria-label="Scroll to explore"
      >
        <Mouse className="h-6 w-6 text-muted-foreground/50" strokeWidth={1.5} />
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground/40">
          Scroll
        </span>
      </a>
    </section>
  );
};

export default HeroSection;
