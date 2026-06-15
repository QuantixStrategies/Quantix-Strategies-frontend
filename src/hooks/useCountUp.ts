import { useEffect, useRef, useState } from "react";

type CountUpOptions = {
  duration?: number;
  decimals?: number;
};

function parseMetricValue(raw: string): { prefix: string; target: number; suffix: string } {
  const match = raw.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return { prefix: "", target: 0, suffix: raw };
  return {
    prefix: match[1],
    target: Number(match[2]),
    suffix: match[3],
  };
}

export function useCountUp(
  value: string,
  active: boolean,
  { duration = 1400, decimals = 0 }: CountUpOptions = {}
) {
  const { prefix, target, suffix } = parseMetricValue(value);
  const [display, setDisplay] = useState(prefix + "0" + suffix);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!active || target === 0) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      const formatted =
        decimals > 0 ? current.toFixed(decimals) : String(Math.round(current));
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active, decimals, duration, prefix, suffix, target, value]);

  return display;
}
