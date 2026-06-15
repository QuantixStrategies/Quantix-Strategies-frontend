import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type NarrativeChapterProps = {
  chapter: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
};

export function NarrativeChapter({
  chapter,
  title,
  subtitle,
  align = "center",
  className,
}: NarrativeChapterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), {
      threshold: 0.3,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <p
        className="mb-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[#B8962E]"
        style={{ letterSpacing: "0.35em" }}
      >
        {chapter}
      </p>
      <h2 className="font-playfair text-3xl font-normal leading-tight text-[#F0EDE8] lg:text-4xl">
        {title}
      </h2>
      <div
        className={cn(
          "mt-4 h-[3px] bg-[#B8962E] transition-all duration-500 ease-out",
          align === "center" ? "mx-auto" : "",
          visible ? "w-[60px]" : "w-0"
        )}
      />
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-[560px] text-sm leading-relaxed text-[#A8B2BD]",
            align === "center" ? "mx-auto" : ""
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
