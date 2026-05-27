import { useEffect, useRef } from "react";

const N = 200;
const FRAME_MS = 1000 / 60;
const LEFT_END = 0.4;
const RIGHT_START = 0.6;
const WAVE_X0 = 0.5; /* sine waves in right 50% */
const CONNECT_DIST = 60;

const COL_ROSE = { r: 149, g: 79, b: 114 };
const COL_BLUE = { r: 56, g: 111, b: 164 };
const COL_GOLD = { r: 184, g: 150, b: 46 };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothT(x: number, w: number) {
  const a = LEFT_END * w;
  const b = RIGHT_START * w;
  if (x <= a) return 0;
  if (x >= b) return 1;
  return (x - a) / (b - a);
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
  seed: number;
  roseBias: number;
};

export function HeroNoiseSignalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const particles: Particle[] = [];
    let raf = 0;
    let lastTs = 0;
    let time = 0;

    function makeParticles() {
      particles.length = 0;
      for (let i = 0; i < N; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 1.8,
          vy: (Math.random() - 0.5) * 1.8,
          r: 0.75 + Math.random() * 0.75,
          phase: Math.random() * Math.PI * 2,
          seed: Math.random() * 10000,
          roseBias: Math.random(),
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
      if (particles.length === 0) makeParticles();
      else {
        for (const p of particles) {
          p.x = Math.min(w - 1, Math.max(0, p.x));
          p.y = Math.min(h - 1, Math.max(0, p.y));
        }
      }
    }

    resize();

    const ro = new ResizeObserver(() => resize());
    ro.observe(container);
    window.addEventListener("resize", resize);

    function step(ts: number) {
      raf = requestAnimationFrame(step);
      if (lastTs === 0) lastTs = ts;
      const dt = ts - lastTs;
      if (dt < FRAME_MS) return;
      lastTs = ts;
      time += Math.min(dt / 1000, 0.05);

      if (w < 4 || h < 4 || particles.length === 0) return;

      const xWaveStart = WAVE_X0 * w;

      // - Background: gradient + radial glow -
      const lg = ctx.createLinearGradient(0, 0, w, 0);
      lg.addColorStop(0, "#0D1B2A");
      lg.addColorStop(1, "#1A1A2E");
      ctx.fillStyle = lg;
      ctx.fillRect(0, 0, w, h);

      const cx = w * 0.62;
      const cy = h * 0.48;
      const rad = Math.max(w, h) * 0.55;
      const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      rg.addColorStop(0, "rgba(56,111,164,0.06)");
      rg.addColorStop(1, "rgba(56,111,164,0)");
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, w, h);

      // - Noise field (left 40%): fade + segments -
      ctx.fillStyle = "rgba(13,27,42,0.14)";
      ctx.fillRect(0, 0, w * LEFT_END, h);

      const noiseCount = 85;
      for (let i = 0; i < noiseCount; i++) {
        const nx = Math.random() * w * LEFT_END;
        const ny = Math.random() * h;
        const len = 5 + Math.random() * 10;
        const baseAng = Math.random() * Math.PI * 2;
        const wobble = Math.sin(nx * 0.012 + time * 2.1 + i * 0.7) * 0.85;
        const ang = baseAng + wobble;
        const op = 0.2 + Math.random() * 0.2;
        ctx.strokeStyle = `rgba(149,79,114,${op})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(nx, ny);
        ctx.lineTo(nx + Math.cos(ang) * len, ny + Math.sin(ang) * len);
        ctx.stroke();
      }

      // - Sine waves (right 50%) -
      const phase = time * 1.15;
      const drawWave = (amp: number, stroke: string, lineW: number, phaseOff: number) => {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineW;
        ctx.beginPath();
        let started = false;
        for (let x = xWaveStart; x <= w; x += 2) {
          const u = ((x - xWaveStart) / (w - xWaveStart)) * Math.PI * 5;
          const y = h * 0.5 + amp * h * Math.sin(u + phase + phaseOff);
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else ctx.lineTo(x, y);
        }
        ctx.stroke();
      };
      drawWave(0.09, "rgba(56,111,164,0.6)", 1.5, 0);
      drawWave(0.065, "rgba(184,150,46,0.3)", 1.2, Math.PI / 4);
      drawWave(0.045, "rgba(56,111,164,0.22)", 1, Math.PI / 2.2);

      // - Update particles -
      const waveAmp = 0.11 * h;
      for (const p of particles) {
        const t = smoothT(p.x, w);

        let cvx = p.vx + (Math.random() - 0.5) * 0.55;
        let cvy = p.vy + (Math.random() - 0.5) * 0.55;
        cvx *= 0.985;
        cvy *= 0.985;

        const targetY =
          h * 0.5 +
          waveAmp * Math.sin(p.x * 0.009 + phase * 1.1 + p.phase + Math.sin(p.seed * 0.001) * 0.2);
        let ovx = p.vx * 0.992 + (Math.random() - 0.5) * 0.08;
        let ovy = p.vy + (targetY - p.y) * 0.045;
        ovx += (w * 0.75 - p.x) * 0.00002;

        p.vx = lerp(cvx, ovx, t);
        p.vy = lerp(cvy, ovy, t);

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) {
          p.x = 0;
          p.vx *= -0.6;
        }
        if (p.x > w) {
          p.x = w;
          p.vx *= -0.6;
        }
        if (p.y < 0) {
          p.y = 0;
          p.vy *= -0.6;
        }
        if (p.y > h) {
          p.y = h;
          p.vy *= -0.6;
        }
      }

      // - Connection lines (transition zone only) -
      const zL = LEFT_END * w;
      const zR = RIGHT_START * w;
      ctx.lineWidth = 1;
      for (let i = 0; i < N; i++) {
        const a = particles[i];
        if (a.x < zL || a.x > zR) continue;
        for (let j = i + 1; j < N; j++) {
          const b = particles[j];
          if (b.x < zL || b.x > zR) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (dx * dx + dy * dy > CONNECT_DIST * CONNECT_DIST) continue;
          ctx.strokeStyle = "rgba(184,150,46,0.15)";
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // - Draw particles -
      for (const p of particles) {
        const t = smoothT(p.x, w);
        const flicker = 0.35 + 0.35 * Math.sin(time * 3.2 + p.seed * 0.01);
        const alpha = lerp(flicker, 0.82, t);
        const br = lerp(COL_ROSE.r, COL_BLUE.r, p.roseBias);
        const bg = lerp(COL_ROSE.g, COL_BLUE.g, p.roseBias);
        const bb = lerp(COL_ROSE.b, COL_BLUE.b, p.roseBias);
        const fr = lerp(br, COL_BLUE.r, t);
        const fgC = lerp(bg, COL_BLUE.g, t);
        const fb = lerp(bb, COL_BLUE.b, t);
        ctx.fillStyle = `rgba(${Math.round(fr)},${Math.round(fgC)},${Math.round(fb)},${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // - Label -
      ctx.font = "10px ui-monospace, monospace";
      ctx.fillStyle = `rgba(${COL_GOLD.r},${COL_GOLD.g},${COL_GOLD.b},0.4)`;
      ctx.textAlign = "right";
      ctx.textBaseline = "bottom";
      ctx.fillText("noise → signal", w - 14, h - 12);
    }

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-0">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
    </div>
  );
}
