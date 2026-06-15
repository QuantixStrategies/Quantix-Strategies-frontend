import { useEffect, useRef } from "react";

const N = 260;
const STREAM_COUNT = 7;
const GLYPH_COUNT = 36;
const FRAME_MS = 1000 / 60;
const MORPH_DURATION = 4;
const PULSE_INTERVAL = 3.6;
const BOLT_INTERVAL = 2.4;

const COL_ROSE = { r: 149, g: 79, b: 114 };
const COL_BLUE = { r: 56, g: 111, b: 164 };
const COL_GOLD = { r: 184, g: 150, b: 46 };
const BINARY = "01";

type NoiseSegment = { nx: number; ny: number; len: number; ang: number; phase: number; opacity: number };

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

type PulseRing = { born: number; speed: number; x: number; y: number };
type ClickBurst = { x: number; y: number; born: number };
type EnergyBolt = { born: number; fromX: number; fromY: number; stream: number; duration: number };
type DataGlyph = { x: number; y: number; vy: number; char: string; phase: number };

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
  const lane = h * (0.16 + stream * (0.68 / STREAM_COUNT));
  return lane + Math.sin(x * 0.0065 + phase * 1.4 + stream * 1.1) * h * 0.075;
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
    const bursts: ClickBurst[] = [];
    const bolts: EnergyBolt[] = [];
    const glyphs: DataGlyph[] = [];
    let raf = 0;
    let lastTs = 0;
    let time = 0;
    let morphStart = performance.now();
    let lastPulse = 0;
    let lastBolt = 0;
    let morph = reducedMotion ? 1 : 0;
    let mouseX = 0.5;
    let mouseY = 0.5;
    let smoothMouseX = 0.5;
    let smoothMouseY = 0.5;
    let mousePxX = 0;
    let mousePxY = 0;

    function makeGlyphs() {
      glyphs.length = 0;
      for (let i = 0; i < GLYPH_COUNT; i++) {
        glyphs.push({
          x: Math.random() * w * 0.38,
          y: Math.random() * h,
          vy: 0.4 + Math.random() * 1.2,
          char: BINARY[Math.floor(Math.random() * 2)],
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function makeNoiseSegments() {
      noiseSegments.length = 0;
      const count = Math.floor(120 * (w / 1200));
      for (let i = 0; i < Math.max(count, 60); i++) {
        noiseSegments.push({
          nx: Math.random() * w * 0.42,
          ny: Math.random() * h,
          len: 3 + Math.random() * 20,
          ang: Math.random() * Math.PI * 2,
          phase: Math.random() * Math.PI * 2,
          opacity: 0.1 + Math.random() * 0.3,
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
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          r: 0.55 + Math.random() * 1.2,
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
        makeGlyphs();
      } else {
        for (const p of particles) {
          p.x = Math.min(w - 1, Math.max(0, p.x));
          p.y = Math.min(h - 1, Math.max(0, p.y));
        }
        makeNoiseSegments();
        makeGlyphs();
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
      mousePxX = e.clientX - rect.left;
      mousePxY = e.clientY - rect.top;
    };

    const onClick = (e: MouseEvent) => {
      if (!section || reducedMotion) return;
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      bursts.push({ x, y, born: time });
      pulses.push({ born: time, speed: 120 + Math.random() * 60, x, y });
      if (bursts.length > 8) bursts.shift();
      for (let i = 0; i < 12; i++) {
        const p = particles[Math.floor(Math.random() * N)];
        const ang = Math.random() * Math.PI * 2;
        const force = 2 + Math.random() * 4;
        p.vx += Math.cos(ang) * force;
        p.vy += Math.sin(ang) * force;
      }
    };

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(container);
    window.addEventListener("resize", resize);
    section?.addEventListener("mousemove", onMouseMove);
    section?.addEventListener("click", onClick);

    function lensPosition() {
      const parallaxX = (smoothMouseX - 0.5) * 64;
      const parallaxY = (smoothMouseY - 0.5) * 44;
      return { x: w * 0.6 + parallaxX, y: h * 0.48 + parallaxY };
    }

    function drawWarpGrid(lx: number, morphAmount: number) {
      const gridLeft = lx + 30;
      const rows = 14;
      const cols = 18;
      const cellW = (w - gridLeft) / cols;
      const cellH = h / rows;

      for (let r = 0; r <= rows; r++) {
        ctx.beginPath();
        for (let c = 0; c <= cols; c++) {
          const x = gridLeft + c * cellW;
          const baseY = r * cellH;
          const dx = x - mousePxX;
          const dy = baseY - mousePxY;
          const dist = Math.hypot(dx, dy);
          const warp = Math.max(0, 1 - dist / 180) * 18 * morphAmount;
          const y = baseY + Math.sin(x * 0.02 + time * 0.8) * 4 * morphAmount + warp * Math.sin(time * 2);
          if (c === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(56,111,164,${0.04 + morphAmount * 0.08})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      for (let c = 0; c <= cols; c++) {
        ctx.beginPath();
        for (let r = 0; r <= rows; r++) {
          const baseX = gridLeft + c * cellW;
          const y = r * cellH;
          const dx = baseX - mousePxX;
          const dy = y - mousePxY;
          const dist = Math.hypot(dx, dy);
          const warp = Math.max(0, 1 - dist / 180) * 12 * morphAmount;
          const x = baseX + warp * Math.cos(time * 1.5);
          if (r === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(184,150,46,${0.03 + morphAmount * 0.06})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }

    function drawBinaryRain(morphAmount: number) {
      ctx.font = "10px ui-monospace, monospace";
      ctx.textAlign = "center";
      for (const g of glyphs) {
        g.y += g.vy * (1.2 - morphAmount * 0.5);
        if (g.y > h + 20) {
          g.y = -10;
          g.x = Math.random() * w * 0.38;
        }
        const flicker = 0.15 + 0.25 * Math.sin(time * 4 + g.phase);
        const alpha = flicker * (1 - morphAmount * 0.75);
        ctx.fillStyle = `rgba(149,79,114,${alpha})`;
        ctx.fillText(g.char, g.x, g.y);
      }
    }

    function drawChromaticPrism(lx: number, ly: number, morphAmount: number) {
      const baseR = Math.min(w, h) * (0.095 + morphAmount * 0.035);
      const rot = time * 0.42;

      const bloom = ctx.createRadialGradient(lx, ly, 0, lx, ly, baseR * 3.2);
      bloom.addColorStop(0, `rgba(184,150,46,${0.28 * morphAmount})`);
      bloom.addColorStop(0.25, `rgba(56,111,164,${0.15 * morphAmount})`);
      bloom.addColorStop(0.6, `rgba(149,79,114,${0.06 * morphAmount})`);
      bloom.addColorStop(1, "rgba(13,27,42,0)");
      ctx.fillStyle = bloom;
      ctx.beginPath();
      ctx.arc(lx, ly, baseR * 3.2, 0, Math.PI * 2);
      ctx.fill();

      const offsets = [
        { dx: -2.5, color: `rgba(149,79,114,${0.45 * morphAmount})` },
        { dx: 0, color: `rgba(184,150,46,${0.7 * morphAmount})` },
        { dx: 2.5, color: `rgba(56,111,164,${0.45 * morphAmount})` },
      ];

      for (const off of offsets) {
        ctx.save();
        ctx.translate(lx + off.dx, ly);
        ctx.rotate(rot);
        ctx.strokeStyle = off.color;
        ctx.lineWidth = 1.8;
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
        ctx.restore();
      }

      ctx.save();
      ctx.translate(lx, ly);
      ctx.rotate(-rot * 1.6);
      ctx.strokeStyle = `rgba(240,237,232,${0.12 * morphAmount})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, -baseR * 0.55);
      ctx.lineTo(baseR * 0.48, baseR * 0.28);
      ctx.lineTo(-baseR * 0.48, baseR * 0.28);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      const corePulse = 0.5 + 0.5 * Math.sin(time * 3.2);
      ctx.fillStyle = `rgba(240,237,232,${0.14 * corePulse * morphAmount})`;
      ctx.beginPath();
      ctx.arc(lx, ly, baseR * 0.2, 0, Math.PI * 2);
      ctx.fill();
    }

    function spawnBolt(lx: number, ly: number) {
      bolts.push({
        born: time,
        fromX: Math.random() * lx * 0.7,
        fromY: Math.random() * h,
        stream: Math.floor(Math.random() * STREAM_COUNT),
        duration: 0.55 + Math.random() * 0.35,
      });
      if (bolts.length > 4) bolts.shift();
    }

    function drawEnergyBolts(lx: number, ly: number, phase: number, morphAmount: number) {
      for (const bolt of bolts) {
        const t = (time - bolt.born) / bolt.duration;
        if (t > 1) continue;
        const ease = easeOutCubic(t);
        const endX = lx + 80 + (w - lx) * 0.55;
        const endY = streamY(endX, bolt.stream, h, phase);

        const cp1x = bolt.fromX + (lx - bolt.fromX) * 0.5 + Math.sin(time * 20) * 20;
        const cp1y = bolt.fromY + (ly - bolt.fromY) * 0.4;
        const cp2x = lx + (endX - lx) * 0.3;
        const cp2y = ly + (endY - ly) * 0.2;

        const alpha = (1 - t) * 0.65 * morphAmount;
        const gradient = ctx.createLinearGradient(bolt.fromX, bolt.fromY, endX, endY);
        gradient.addColorStop(0, `rgba(149,79,114,${alpha * 0.5})`);
        gradient.addColorStop(0.45, `rgba(184,150,46,${alpha})`);
        gradient.addColorStop(1, `rgba(56,111,164,${alpha * 0.8})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5 + (1 - t) * 1.5;
        ctx.shadowBlur = 14 * (1 - t);
        ctx.shadowColor = `rgba(184,150,46,${alpha})`;
        ctx.beginPath();
        ctx.moveTo(bolt.fromX, bolt.fromY);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
        ctx.stroke();
        ctx.shadowBlur = 0;

        const headX = lerp(bolt.fromX, endX, ease);
        const headY = lerp(bolt.fromY, endY, ease);
        ctx.fillStyle = `rgba(240,237,232,${alpha})`;
        ctx.beginPath();
        ctx.arc(headX, headY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawConstellation(lx: number, morphAmount: number) {
      const signalPts = particles
        .filter((p) => p.x > lx + 40)
        .sort((a, b) => b.x - a.x)
        .slice(0, 9);
      if (signalPts.length < 4) return;

      const alpha = 0.12 * morphAmount * (0.6 + 0.4 * Math.sin(time * 1.5));
      ctx.strokeStyle = `rgba(184,150,46,${alpha})`;
      ctx.lineWidth = 0.8;
      for (let i = 0; i < signalPts.length; i++) {
        const a = signalPts[i];
        const b = signalPts[(i + 2) % signalPts.length];
        const c = signalPts[(i + 4) % signalPts.length];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.lineTo(c.x, c.y);
        ctx.closePath();
        ctx.stroke();
      }
    }

    function drawClickBursts(morphAmount: number) {
      for (const b of bursts) {
        const age = time - b.born;
        if (age > 1.2) continue;
        const r = age * 140;
        const alpha = (1 - age / 1.2) * 0.4 * morphAmount;
        ctx.strokeStyle = `rgba(184,150,46,${alpha})`;
        ctx.lineWidth = 2 * (1 - age / 1.2);
        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    function drawStreams(lx: number, phase: number, morphAmount: number) {
      for (let s = 0; s < STREAM_COUNT; s++) {
        const alpha = (0.1 + morphAmount * 0.28) * (0.65 + 0.35 * Math.sin(phase + s * 0.8));
        const gradient = ctx.createLinearGradient(lx, 0, w, 0);
        gradient.addColorStop(0, `rgba(56,111,164,0)`);
        gradient.addColorStop(0.15, `rgba(56,111,164,${alpha})`);
        gradient.addColorStop(1, `rgba(184,150,46,${alpha * 0.55})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.2 + morphAmount * 0.8;
        ctx.shadowBlur = 6 * morphAmount;
        ctx.shadowColor = `rgba(56,111,164,${alpha * 0.5})`;
        ctx.beginPath();
        let started = false;
        for (let x = lx + 16; x < w; x += 2) {
          const y = streamY(x, s, h, phase);
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }

    function step(ts: number) {
      raf = requestAnimationFrame(step);
      if (lastTs === 0) lastTs = ts;
      const dt = ts - lastTs;
      if (dt < FRAME_MS) return;
      lastTs = ts;
      time += Math.min(dt / 1000, 0.05);

      smoothMouseX = lerp(smoothMouseX, mouseX, 0.07);
      smoothMouseY = lerp(smoothMouseY, mouseY, 0.07);

      if (!reducedMotion) {
        const elapsed = (ts - morphStart) / 1000;
        morph = easeOutCubic(Math.min(elapsed / MORPH_DURATION, 1));
        if (time - lastPulse > PULSE_INTERVAL) {
          const lp = lensPosition();
          pulses.push({ born: time, speed: 95 + Math.random() * 50, x: lp.x, y: lp.y });
          lastPulse = time;
          if (pulses.length > 8) pulses.shift();
        }
        if (time - lastBolt > BOLT_INTERVAL && morph > 0.4) {
          const lp = lensPosition();
          spawnBolt(lp.x, lp.y);
          lastBolt = time;
        }
      }

      if (w < 4 || h < 4 || particles.length === 0) return;

      const { x: lx, y: ly } = lensPosition();
      const phase = time * 1.25;
      const lensR = Math.min(w, h) * 0.105;

      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, "#0A1622");
      bg.addColorStop(0.45, "#0D1B2A");
      bg.addColorStop(1, "#1A1A2E");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const nebula = ctx.createRadialGradient(lx, ly, 0, lx, ly, Math.max(w, h) * 0.7);
      nebula.addColorStop(0, `rgba(56,111,164,${0.09 + morph * 0.06})`);
      nebula.addColorStop(0.35, `rgba(184,150,46,${0.04 * morph})`);
      nebula.addColorStop(0.7, `rgba(149,79,114,${0.03 * (1 - morph * 0.4)})`);
      nebula.addColorStop(1, "rgba(13,27,42,0)");
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, w, h);

      drawBinaryRain(morph);
      drawWarpGrid(lx, morph);

      for (const seg of noiseSegments) {
        const wobble = Math.sin(seg.nx * 0.014 + time * 2.6 + seg.phase) * 1.2;
        const ang = seg.ang + wobble;
        const fade = (1 - morph * 0.7) * seg.opacity;
        ctx.strokeStyle = `rgba(149,79,114,${fade})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(seg.nx, seg.ny);
        ctx.lineTo(seg.nx + Math.cos(ang) * seg.len, seg.ny + Math.sin(ang) * seg.len);
        ctx.stroke();
      }

      drawStreams(lx, phase, morph);

      for (const ring of pulses) {
        const age = time - ring.born;
        const radius = age * ring.speed;
        const maxR = Math.min(w, h) * 0.5;
        if (radius > maxR) continue;
        const alpha = (1 - radius / maxR) * 0.4 * morph;
        ctx.strokeStyle = `rgba(184,150,46,${alpha})`;
        ctx.lineWidth = 2 * (1 - radius / maxR);
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      drawEnergyBolts(lx, ly, phase, morph);
      drawChromaticPrism(lx, ly, morph);
      drawClickBursts(morph);

      for (let i = bolts.length - 1; i >= 0; i--) {
        if (time - bolts[i].born > bolts[i].duration + 0.1) bolts.splice(i, 1);
      }
      for (let i = bursts.length - 1; i >= 0; i--) {
        if (time - bursts[i].born > 1.3) bursts.splice(i, 1);
      }
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
        let ax = Math.cos(nf * Math.PI) * 0.42 * (1 - signalT);
        let ay = Math.sin(nf * Math.PI * 1.3) * 0.42 * (1 - signalT);

        if (p.x < lx - lensR * 0.4) {
          const vortexAngle = Math.atan2(dyL, dxL) + Math.PI / 2;
          ax += Math.cos(vortexAngle) * 0.2 * (1 - signalT);
          ay += Math.sin(vortexAngle) * 0.2 * (1 - signalT);
          ax += (lx - p.x) * 0.0004 * morph;
        }

        if (distLens < lensR * 2.5) {
          const tunnel = (1 - distLens / (lensR * 2.5)) * 1.1 * morph;
          ax += (lx + lensR * 0.8 - p.x) * 0.0025 * tunnel;
          ay += (ly - p.y) * 0.0012 * tunnel;
        }

        if (p.x > lx + lensR * 0.2) {
          const targetY = streamY(p.x, p.stream, h, phase);
          ay += (targetY - p.y) * (0.035 + signalT * 0.07);
          ax += 0.15 * signalT;
          const mdx = mousePxX - p.x;
          const mdy = mousePxY - p.y;
          const md = Math.hypot(mdx, mdy);
          if (md < 120 && md > 1) {
            ax += (mdx / md) * 0.08 * signalT;
            ay += (mdy / md) * 0.08 * signalT;
          }
        }

        p.vx = p.vx * 0.955 + ax;
        p.vy = p.vy * 0.955 + ay;
        p.vx += (Math.random() - 0.5) * 0.3 * (1 - signalT);
        p.vy += (Math.random() - 0.5) * 0.3 * (1 - signalT);

        const speed = Math.hypot(p.vx, p.vy);
        const maxSpeed = lerp(3.6, 2.4, signalT);
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) { p.x = 0; p.vx *= -0.5; }
        if (p.x > w) { p.x = w * 0.96; p.vx *= -0.3; }
        if (p.y < 0) { p.y = 0; p.vy *= -0.5; }
        if (p.y > h) { p.y = h; p.vy *= -0.5; }

        if (p.x > lx + lensR && Math.random() < 0.0025 * morph) {
          p.x = Math.random() * lx * 0.45;
          p.y = Math.random() * h;
          p.vx = (Math.random() - 0.5) * 2.5;
          p.vy = (Math.random() - 0.5) * 2.5;
        }
      }

      drawConstellation(lx, morph);

      for (let i = 0; i < N; i++) {
        const a = particles[i];
        if (a.x < lx - lensR * 1.2 || a.x > lx + lensR * 1.2) continue;
        for (let j = i + 1; j < Math.min(i + 6, N); j++) {
          const b = particles[j];
          const d2 = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
          if (d2 > 42 * 42) continue;
          const alpha = (1 - Math.sqrt(d2) / 42) * 0.35 * morph;
          ctx.strokeStyle = `rgba(184,150,46,${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        const sideT = easeInOutSine(Math.max(0, Math.min(1, (p.x - lx + lensR) / (w - lx + lensR))));
        const signalT = sideT * morph;
        if (signalT < 0.5) continue;

        const fr = lerp(COL_BLUE.r, COL_GOLD.r, signalT);
        const fg = lerp(COL_BLUE.g, COL_GOLD.g, signalT);
        const fb = lerp(COL_BLUE.b, COL_GOLD.b, signalT);
        ctx.fillStyle = `rgba(${fr},${fg},${fb},${signalT * 0.15})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      for (const p of particles) {
        const sideT = easeInOutSine(Math.max(0, Math.min(1, (p.x - lx + lensR) / (w - lx + lensR))));
        const signalT = sideT * morph;
        const flicker = 0.2 + 0.45 * Math.sin(time * 3.8 + p.seed * 0.01);
        const alpha = lerp(flicker, 0.98, signalT);

        const fr = lerp(lerp(COL_ROSE.r, COL_BLUE.r, p.roseBias), COL_GOLD.r, signalT * 0.4);
        const fg = lerp(lerp(COL_ROSE.g, COL_BLUE.g, p.roseBias), COL_GOLD.g, signalT * 0.4);
        const fb = lerp(lerp(COL_ROSE.b, COL_BLUE.b, p.roseBias), COL_GOLD.b, signalT * 0.4);

        ctx.strokeStyle = `rgba(${Math.round(fr)},${Math.round(fg)},${Math.round(fb)},${alpha * 0.4})`;
        ctx.lineWidth = p.r * (0.6 + signalT * 1.2);
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        if (signalT > 0.4) {
          ctx.shadowBlur = 16 * signalT;
          ctx.shadowColor = `rgba(56,111,164,${0.7 * signalT})`;
        }

        ctx.fillStyle = `rgba(${Math.round(fr)},${Math.round(fg)},${Math.round(fb)},${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (0.75 + signalT * 0.6), 0, Math.PI * 2);
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
      section?.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />

      <div
        className="absolute inset-y-0 left-0 w-[min(62%,560px)] bg-gradient-to-r from-[#0A1622] via-[#0D1B2A]/94 to-transparent"
        aria-hidden
      />

      <div
        className="absolute left-[4%] top-[20%] hidden flex-col gap-2 sm:flex lg:left-[5%]"
        aria-hidden
      >
        <span className="font-mono text-[10px] text-[#954F72]/50">01001110</span>
        <span className="font-playfair text-xs italic text-[#954F72]/70">chaos</span>
        <span className="text-[9px] font-medium uppercase tracking-[0.45em] text-[#954F72]/45">
          NOISE
        </span>
      </div>

      <div
        className="absolute bottom-[18%] right-[4%] hidden flex-col items-end gap-2 text-right lg:flex"
        aria-hidden
      >
        <span className="font-playfair text-3xl text-[#386FA4]/90">SIGNAL</span>
        <span className="max-w-[160px] text-[10px] leading-relaxed text-[#A8B2BD]/55">
          Click anywhere to send a pulse through the system
        </span>
      </div>
    </div>
  );
}
