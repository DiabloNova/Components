import React from "react";
import { cn } from "@/utils/cn";

export interface PageShellProps {
  /** Background utility class for the page surface. */
  background?: string;
  /** Padding utility classes, overridable for denser layouts. */
  padding?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Full-height centered page surface shared by every showcase page.
 */
export default function PageShell({
  background = "bg-[#EAEAEA]",
  padding = "p-4 md:p-8 py-12 md:py-16",
  className,
  children,
}: PageShellProps) {
  return (
    <main
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center selection:bg-neutral-800 selection:text-white",
        background,
        padding,
        className
      )}
    >
      {children}
    </main>
  );
}
