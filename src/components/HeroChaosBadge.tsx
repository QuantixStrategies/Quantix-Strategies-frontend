import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function useScrambleBinary(seed: string, active: boolean) {
  const [display, setDisplay] = useState(seed);

  useEffect(() => {
    if (!active) {
      setDisplay(seed);
      return;
    }
    const id = window.setInterval(() => {
      setDisplay(
        seed
          .split("")
          .map(() => (Math.random() > 0.45 ? "1" : "0"))
          .join("")
      );
    }, 90);
    return () => window.clearInterval(id);
  }, [seed, active]);

  return display;
}

export function HeroChaosBadge() {
  const bits = useScrambleBinary("01001110", true);

  return (
    <motion.div
      className="pointer-events-none absolute bottom-36 left-4 z-[2] sm:bottom-[30%] sm:left-6 lg:left-10"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.8, ease: "easeOut" }}
    >
      <div className="relative">
        <div className="absolute -inset-3 rounded-lg bg-[#954F72]/10 blur-xl" />
        <div className="relative border-l-2 border-[#954F72] bg-[#0D1B2A]/75 px-4 py-3 backdrop-blur-md sm:px-5 sm:py-4">
          <motion.span
            className="block font-mono text-sm tracking-[0.25em] text-[#954F72] sm:text-base"
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            {bits}
          </motion.span>
          <span className="mt-1 block font-playfair text-xs italic text-[#954F72]/80 sm:text-sm">
            chaos
          </span>
          <span
            className="mt-0.5 block text-[9px] font-medium uppercase tracking-[0.42em] text-[#954F72]/55"
            style={{ letterSpacing: "0.42em" }}
          >
            NOISE
          </span>
        </div>
      </div>
    </motion.div>
  );
}
