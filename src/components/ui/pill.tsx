import React from "react";
import { cn } from "@/utils/cn";

export type PillTone = "neutral" | "success";

const toneStyles: Record<PillTone, string> = {
  neutral:
    "bg-white text-[#555555] border-[#E2E2E2] shadow-[0_1px_2px_rgba(0,0,0,0.02)]",
  success:
    "bg-[#EBF5EB] text-[#428142] border-[#D3EAD3] shadow-[0_1px_2px_rgba(0,0,0,0.01)]",
};

export interface PillProps {
  tone?: PillTone;
  className?: string;
  children: React.ReactNode;
}

/** Small rounded metadata badge. */
export default function Pill({ tone = "neutral", className, children }: PillProps) {
  return (
    <span
      className={cn(
        "inline-block border px-3.5 py-1 rounded-full text-[12px] font-medium",
        toneStyles[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
