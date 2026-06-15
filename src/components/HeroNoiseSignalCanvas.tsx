import { useEffect, useRef } from "react";

const N = 240;
const STREAM_COUNT = 6;
const FRAME_MS = 1000 / 60;
const MORPH_DURATION = 3.8;
const PULSE_INTERVAL = 4.2;

const COL_ROSE = { r: 149, g: 79, b: 114 };
const COL_BLUE = { r: 56, g: 111, b: 164 };
const COL_GOLD = { r: 184, g: 150, b: 46 };

type NoiseSegment = {
  nx: number;
  ny: number;
  len: number;
  ang: number;
  phase: number;
  opacity: number;
};

type Particle = {
  x: number;
  y: number;
  px: number;
  py: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
  seed: number;
  roseBias: number;
  stream: number;
};

type PulseRing = {
  born: number;
  speed: number;
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function noiseField(x: number, y: number, t: number) {
  return (
    Math.sin(x * 0.011 + t * 1.7) * Math.cos(y * 0.009 - t * 1.3) +
    Math.sin((x + y) * 0.007 + t * 2.2) * 0.6
  );
}

function streamY(x: number, stream: number, h: number, phase: number) {
  const lane = h * (0.18 + stream * (0.64 / STREAM_COUNT));
  return lane + Math.sin(x * 0.0065 + phase * 1.4 + stream * 1.1) * h * 0.07;
}

export function HeroNoiseSignalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = container.closest("section");

    let w = 0;
    let h = 0;
    let dpr = 1;
    const particles: Particle[] = [];
    const noiseSegments: NoiseSegment[] = [];
    const pulses: PulseRing[] = [];
    let raf = 0;
    let lastTs = 0;
    let time = 0;
    let morphStart = performance.now();
    let lastPulse = 0;
    let morph = reducedMotion ? 1 : 0;
    let mouseX = 0.5;
    let mouseY = 0.5;
    let smoothMouseX = 0.5;
    let smoothMouseY = 0.5;

    function makeNoiseSegments() {
      noiseSegments.length = 0;
      const count = Math.floor(110 * (w / 1200));
      for (let i = 0; i < Math.max(count, 55); i++) {
        noiseSegments.push({
          nx: Math.random() * w * 0.42,
          ny: Math.random() * h,
          len: 3 + Math.random() * 18,
          ang: Math.random() * Math.PI * 2,
          phase: Math.random() * Math.PI * 2,
          opacity: 0.1 + Math.random() * 0.28,
        });
      }
    }

    function makeParticles() {
      particles.length = 0;
      for (let i = 0; i < N; i++) {
        particles.push({
          x: Math.random() * w * 0.45,
          y: Math.random() * h,
          px: 0,
          py: 0,
          vx: (Math.random() - 0.5) * 2.8,
          vy: (Math.random() - 0.5) * 2.8,
          r: 0.6 + Math.random() * 1.1,
          phase: Math.random() * Math.PI * 2,
          seed: Math.random() * 10000,
          roseBias: Math.random(),
          stream: i % STREAM_COUNT,
        });
      }
    }

    function resize() {
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      if (cw < 1 || ch < 1) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cw;
      h = ch;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particles.length === 0) {
        makeParticles();
        makeNoiseSegments();
      } else {
        for (const p of particles) {
          p.x = Math.min(w - 1, Math.max(0, p.x));
          p.y = Math.min(h - 1, Math.max(0, p.y));
        }
        makeNoiseSegments();
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
    };

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(container);
    window.addEventListener("resize", resize);
    section?.addEventListener("mousemove", onMouseMove);

    function lensPosition() {
      const parallaxX = (smoothMouseX - 0.5) * 48;
      const parallaxY = (smoothMouseY - 0.5) * 32;
      return {
        x: w * 0.6 + parallaxX,
        y: h * 0.48 + parallaxY,
      };
    }

    function drawPrism(lx: number, ly: number, morphAmount: number) {
      const baseR = Math.min(w, h) * (0.09 + morphAmount * 0.03);
      const rot = time * 0.35;

      const bloom = ctx.createRadialGradient(lx, ly, 0, lx, ly, baseR * 2.8);
      bloom.addColorStop(0, `rgba(184,150,46,${0.22 * morphAmount})`);
      bloom.addColorStop(0.35, `rgba(56,111,164,${0.12 * morphAmount})`);
      bloom.addColorStop(1, "rgba(56,111,164,0)");
      ctx.fillStyle = bloom;
      ctx.beginPath();
      ctx.arc(lx, ly, baseR * 2.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.translate(lx, ly);
      ctx.rotate(rot);

      ctx.strokeStyle = `rgba(184,150,46,${0.55 * morphAmount})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const px = Math.cos(a) * baseR;
        const py = Math.sin(a) * baseR;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.rotate(-rot * 2);
      ctx.strokeStyle = `rgba(56,111,164,${0.35 * morphAmount})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2;
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a) * baseR * 0.85, Math.sin(a) * baseR * 0.85);
      }
      ctx.stroke();

      ctx.restore();

      const corePulse = 0.6 + 0.4 * Math.sin(time * 2.8);
      ctx.fillStyle = `rgba(240,237,232,${0.08 * corePulse * morphAmount})`;
      ctx.beginPath();
      ctx.arc(lx, ly, baseR * 0.18, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawPulseRings(lx: number, ly: number, morphAmount: number) {
      for (const ring of pulses) {
        const age = time - ring.born;
        const radius = age * ring.speed;
        const maxR = Math.min(w, h) * 0.45;
        if (radius > maxR) continue;
        const alpha = (1 - radius / maxR) * 0.35 * morphAmount;
        ctx.strokeStyle = `rgba(184,150,46,${alpha})`;
        ctx.lineWidth = 1.5 * (1 - radius / maxR);
        ctx.beginPath();
        ctx.arc(lx, ly, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    function drawStreams(lx: number, phase: number, morphAmount: number) {
      for (let s = 0; s < STREAM_COUNT; s++) {
        const alpha = (0.08 + morphAmount * 0.22) * (0.7 + 0.3 * Math.sin(phase + s));
        const gradient = ctx.createLinearGradient(lx, 0, w, 0);
        gradient.addColorStop(0, `rgba(56,111,164,0)`);
        gradient.addColorStop(0.2, `rgba(56,111,164,${alpha})`);
        gradient.addColorStop(1, `rgba(184,150,46,${alpha * 0.5})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1 + morphAmount;
        ctx.beginPath();
        let started = false;
        for (let x = lx + 20; x < w; x += 3) {
          const y = streamY(x, s, h, phase);
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }

    function drawGlitchScanlines(morphAmount: number) {
      const scanCount = 4;
      for (let i = 0; i < scanCount; i++) {
        const y =
          ((time * 40 + i * (h / scanCount) + Math.sin(time + i) * 30) % h) * (1 - morphAmount * 0.7);
        ctx.fillStyle = `rgba(149,79,114,${0.04 * (1 - morphAmount)})`;
        ctx.fillRect(0, y, w * 0.44, 1);
      }
    }

    function step(ts: number) {
      raf = requestAnimationFrame(step);
      if (lastTs === 0) lastTs = ts;
      const dt = ts - lastTs;
      if (dt < FRAME_MS) return;
      lastTs = ts;
      time += Math.min(dt / 1000, 0.05);

      smoothMouseX = lerp(smoothMouseX, mouseX, 0.06);
      smoothMouseY = lerp(smoothMouseY, mouseY, 0.06);

      if (!reducedMotion) {
        const elapsed = (ts - morphStart) / 1000;
        morph = easeOutCubic(Math.min(elapsed / MORPH_DURATION, 1));
        if (time - lastPulse > PULSE_INTERVAL) {
          pulses.push({ born: time, speed: 90 + Math.random() * 40 });
          lastPulse = time;
          if (pulses.length > 6) pulses.shift();
        }
      }

      if (w < 4 || h < 4 || particles.length === 0) return;

      const { x: lx, y: ly } = lensPosition();
      const phase = time * 1.2;
      const lensR = Math.min(w, h) * 0.1;

      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, "#0D1B2A");
      bg.addColorStop(0.5, "#101f30");
      bg.addColorStop(1, "#1A1A2E");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const nebula = ctx.createRadialGradient(lx + 80, ly - 40, 0, lx, ly, Math.max(w, h) * 0.65);
      nebula.addColorStop(0, `rgba(56,111,164,${0.07 + morph * 0.05})`);
      nebula.addColorStop(0.5, `rgba(149,79,114,${0.03 * (1 - morph * 0.5)})`);
      nebula.addColorStop(1, "rgba(13,27,42,0)");
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, w, h);

      drawGlitchScanlines(morph);

      for (const seg of noiseSegments) {
        const wobble = Math.sin(seg.nx * 0.014 + time * 2.4 + seg.phase) * 1.1;
        const ang = seg.ang + wobble;
        const fade = (1 - morph * 0.65) * seg.opacity;
        ctx.strokeStyle = `rgba(149,79,114,${fade})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(seg.nx, seg.ny);
        ctx.lineTo(seg.nx + Math.cos(ang) * seg.len, seg.ny + Math.sin(ang) * seg.len);
        ctx.stroke();
      }

      drawStreams(lx, phase, morph);
      drawPulseRings(lx, ly, morph);
      drawPrism(lx, ly, morph);

      for (let i = pulses.length - 1; i >= 0; i--) {
        if (time - pulses[i].born > 5) pulses.splice(i, 1);
      }

      for (const p of particles) {
        p.px = p.x;
        p.py = p.y;

        const dxL = p.x - lx;
        const dyL = p.y - ly;
        const distLens = Math.hypot(dxL, dyL);
        const sideT = easeInOutSine(Math.max(0, Math.min(1, (p.x - lx + lensR) / (w - lx + lensR))));
        const signalT = sideT * morph;

        const nf = noiseField(p.x, p.y, time + p.seed * 0.0001);
        let ax = Math.cos(nf * Math.PI) * 0.35 * (1 - signalT);
        let ay = Math.sin(nf * Math.PI * 1.3) * 0.35 * (1 - signalT);

        if (p.x < lx - lensR * 0.5) {
          const vortexAngle = Math.atan2(dyL, dxL) + Math.PI / 2;
          const vortexPull = 0.15 * (1 - signalT);
          ax += Math.cos(vortexAngle) * vortexPull;
          ay += Math.sin(vortexAngle) * vortexPull;
        }

        if (distLens < lensR * 2.2) {
          const tunnel = (1 - distLens / (lensR * 2.2)) * 0.8 * morph;
          ax += (lx + lensR - p.x) * 0.002 * tunnel;
          ay += (ly - p.y) * 0.001 * tunnel;
        }

        if (p.x > lx + lensR * 0.3) {
          const targetY = streamY(p.x, p.stream, h, phase);
          ay += (targetY - p.y) * (0.03 + signalT * 0.06);
          ax += 0.12 * signalT;
        }

        p.vx = p.vx * 0.96 + ax;
        p.vy = p.vy * 0.96 + ay;
        p.vx += (Math.random() - 0.5) * 0.25 * (1 - signalT);
        p.vy += (Math.random() - 0.5) * 0.25 * (1 - signalT);

        const speed = Math.hypot(p.vx, p.vy);
        const maxSpeed = lerp(3.2, 2.2, signalT);
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) {
          p.x = 0;
          p.vx *= -0.5;
        }
        if (p.x > w) {
          p.x = w * 0.95;
          p.vx *= -0.3;
        }
        if (p.y < 0) {
          p.y = 0;
          p.vy *= -0.5;
        }
        if (p.y > h) {
          p.y = h;
          p.vy *= -0.5;
        }

        if (p.x > lx + lensR && Math.random() < 0.002 * morph) {
          p.x = Math.random() * lx * 0.5;
          p.y = Math.random() * h;
          p.vx = (Math.random() - 0.5) * 2;
          p.vy = (Math.random() - 0.5) * 2;
        }
      }

      for (let i = 0; i < N; i++) {
        const a = particles[i];
        if (a.x < lx - lensR || a.x > lx + lensR) continue;
        for (let j = i + 1; j < Math.min(i + 8, N); j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > 45 * 45) continue;
          const alpha = (1 - Math.sqrt(d2) / 45) * 0.3 * morph;
          ctx.strokeStyle = `rgba(184,150,46,${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const p of particles) {
        const sideT = easeInOutSine(Math.max(0, Math.min(1, (p.x - lx + lensR) / (w - lx + lensR))));
        const signalT = sideT * morph;
        const flicker = 0.25 + 0.4 * Math.sin(time * 3.5 + p.seed * 0.01);
        const alpha = lerp(flicker, 0.95, signalT);

        const fr = lerp(lerp(COL_ROSE.r, COL_BLUE.r, p.roseBias), COL_GOLD.r, signalT * 0.35);
        const fg = lerp(lerp(COL_ROSE.g, COL_BLUE.g, p.roseBias), COL_GOLD.g, signalT * 0.35);
        const fb = lerp(lerp(COL_ROSE.b, COL_BLUE.b, p.roseBias), COL_GOLD.b, signalT * 0.35);

        const trailLen = 3 + signalT * 8;
        ctx.strokeStyle = `rgba(${Math.round(fr)},${Math.round(fg)},${Math.round(fb)},${alpha * 0.35})`;
        ctx.lineWidth = p.r * (0.5 + signalT);
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        if (signalT > 0.45) {
          ctx.shadowBlur = 12 * signalT;
          ctx.shadowColor = `rgba(56,111,164,${0.6 * signalT})`;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = `rgba(${Math.round(fr)},${Math.round(fg)},${Math.round(fb)},${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (0.8 + signalT * 0.5), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", resize);
      section?.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />

      <div
        className="absolute inset-y-0 left-0 w-[min(62%,560px)] bg-gradient-to-r from-[#0D1B2A] via-[#0D1B2A]/92 to-transparent"
        aria-hidden
      />

      <div
        className="absolute left-[4%] top-[22%] hidden flex-col gap-1 sm:flex lg:left-[5%]"
        aria-hidden
      >
        <span
          className="font-playfair text-[11px] italic text-[#954F72]/60"
          style={{ letterSpacing: "0.2em" }}
        >
          chaos
        </span>
        <span className="text-[9px] font-medium uppercase tracking-[0.4em] text-[#954F72]/40">
          NOISE
        </span>
      </div>

      <div
        className="absolute bottom-[20%] right-[5%] hidden flex-col items-end gap-2 text-right lg:flex"
        aria-hidden
      >
        <span
          className="font-playfair text-2xl text-[#386FA4]/80"
          style={{ letterSpacing: "0.08em" }}
        >
          SIGNAL
        </span>
        <span className="max-w-[140px] text-[10px] leading-relaxed text-[#A8B2BD]/50">
          Clarity emerges through the lens
        </span>
      </div>

      <div
        className="absolute right-[8%] top-1/2 hidden h-24 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#B8962E]/40 to-transparent lg:block"
        aria-hidden
      />
    </div>
  );
}
