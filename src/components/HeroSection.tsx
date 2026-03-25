import { Mouse } from "lucide-react";
import { motion } from "framer-motion";
import { HeroNoiseSignalCanvas } from "@/components/HeroNoiseSignalCanvas";

const ACCENT_GOLD = "#B8962E";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroNoiseSignalCanvas />

      {/* Content */}
      <div className="container relative z-[1] mx-auto px-4 lg:px-8 py-32 lg:py-40">
        <div className="max-w-4xl">
          <motion.div
            className="flex gap-5 items-start mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div
              className="w-1.5 h-28 md:h-36 flex-shrink-0 rounded-full mt-1"
              style={{ backgroundColor: ACCENT_GOLD }}
            />
            <div>
              <h1
                className="font-bold text-foreground mb-1 leading-tight"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
              >
                Turning Data
              </h1>
              <h2
                className="font-bold text-foreground leading-tight"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
              >
                into Decision
              </h2>
            </div>
          </motion.div>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl ml-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Trusted extended team to global advisory firms and emerging
            businesses, delivering tailored strategies and transformative
            solutions to drive long-term value
          </motion.p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2 animate-bounce">
        <Mouse className="w-6 h-6 text-muted-foreground/50" strokeWidth={1.5} />
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground/40">
          Scroll
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
