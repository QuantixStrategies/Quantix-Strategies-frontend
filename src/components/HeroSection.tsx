import { useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from "react";
import type { ISourceOptions } from "@tsparticles/engine";
import { Mouse } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesOptions: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
        },
        modes: {
          grab: { distance: 180, links: { opacity: 0.4 } },
        },
      },
      particles: {
        color: { value: ["#5eead4", "#67e8f9", "#22d3ee", "#2dd4bf"] },
        links: {
          color: "#5eead4",
          distance: 160,
          enable: true,
          opacity: 0.15,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: "none" as const,
          outModes: { default: "bounce" as const },
        },
        number: {
          density: { enable: true },
          value: 90,
        },
        opacity: {
          value: { min: 0.2, max: 0.6 },
          animation: { enable: true, speed: 0.8, sync: false },
        },
        shape: { type: "circle" },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0a2a35" }}
    >
      {/* Particle Network */}
      {init && (
        <Particles
          id="hero-particles"
          options={particlesOptions}
          className="absolute inset-0 z-0"
        />
      )}

      {/* Radial glow - right side */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.15) 0%, rgba(34,211,238,0.05) 40%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-32 lg:py-40 relative z-10">
        <div className="max-w-4xl">
          <div className="flex gap-5 items-start mb-8">
            <div
              className="w-1.5 h-28 md:h-36 flex-shrink-0 rounded-full mt-1"
              style={{ background: "linear-gradient(to bottom, #2dd4bf, #22d3ee)" }}
            />
            <div>
              <h1
                className="font-bold text-white mb-1 leading-tight"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
              >
                Turning Data
              </h1>
              <h2
                className="font-bold text-white leading-tight"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
              >
                into Decision
              </h2>
            </div>
          </div>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl ml-8 leading-relaxed">
            Trusted extended team to global advisory firms and emerging
            businesses, delivering tailored strategies and transformative
            solutions to drive long-term value
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <Mouse className="w-6 h-6 text-white/40" strokeWidth={1.5} />
        <span className="text-[10px] uppercase tracking-widest text-white/30">
          Scroll
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
