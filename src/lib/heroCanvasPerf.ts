export type HeroCanvasPerf = {
  particleCount: number;
  streamCount: number;
  glyphCount: number;
  noiseSegmentMax: number;
  frameMs: number;
  maxDpr: number;
  warpGrid: boolean;
  bolts: boolean;
  bloom: boolean;
  constellation: boolean;
  shadows: boolean;
  torrentRows: boolean;
  chromaticPrism: boolean;
  particleLinks: boolean;
  pulseInterval: number;
  boltInterval: number;
  parallaxStrength: number;
  streamStep: number;
};

const DESKTOP: HeroCanvasPerf = {
  particleCount: 300,
  streamCount: 8,
  glyphCount: 64,
  noiseSegmentMax: 120,
  frameMs: 1000 / 60,
  maxDpr: 2,
  warpGrid: true,
  bolts: true,
  bloom: true,
  constellation: true,
  shadows: true,
  torrentRows: true,
  chromaticPrism: true,
  particleLinks: true,
  pulseInterval: 3,
  boltInterval: 1.9,
  parallaxStrength: 1,
  streamStep: 2,
};

const TABLET: HeroCanvasPerf = {
  particleCount: 140,
  streamCount: 5,
  glyphCount: 28,
  noiseSegmentMax: 45,
  frameMs: 1000 / 45,
  maxDpr: 1.5,
  warpGrid: false,
  bolts: true,
  bloom: false,
  constellation: false,
  shadows: false,
  torrentRows: false,
  chromaticPrism: true,
  particleLinks: true,
  pulseInterval: 4.5,
  boltInterval: 3.5,
  parallaxStrength: 0.5,
  streamStep: 4,
};

const MOBILE: HeroCanvasPerf = {
  particleCount: 72,
  streamCount: 4,
  glyphCount: 14,
  noiseSegmentMax: 24,
  frameMs: 1000 / 30,
  maxDpr: 1,
  warpGrid: false,
  bolts: false,
  bloom: false,
  constellation: false,
  shadows: false,
  torrentRows: false,
  chromaticPrism: false,
  particleLinks: false,
  pulseInterval: 7,
  boltInterval: 999,
  parallaxStrength: 0,
  streamStep: 6,
};

const MINIMAL: HeroCanvasPerf = {
  ...MOBILE,
  particleCount: 48,
  glyphCount: 8,
  frameMs: 1000 / 24,
};

export function getHeroCanvasPerf(): HeroCanvasPerf {
  if (typeof window === "undefined") return DESKTOP;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return MINIMAL;
  }

  if (window.matchMedia("(max-width: 767px)").matches) {
    return MOBILE;
  }

  if (
    window.matchMedia("(max-width: 1023px)").matches ||
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return TABLET;
  }

  return DESKTOP;
}
