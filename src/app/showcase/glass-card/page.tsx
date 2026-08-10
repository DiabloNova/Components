import React from "react";
import GlassCard from "@/components/ui/glass-card";
import PageShell from "@/components/ui/page-shell";

export const metadata = {
  title: "Premium Glass Card Showcase",
  description: "A premium, pixel-perfect interactive showcase of the custom glassmorphic card design.",
};

export default function GlassCardShowcasePage() {
  return (
    <PageShell background="bg-[#E5E5E5]" className="overflow-hidden">
      {/* 3D background lighting and shadows mimicking the reference image atmosphere */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-white/30 to-white/0 filter blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-neutral-200/50 to-neutral-400/10 filter blur-[100px] pointer-events-none" />

      {/* Container to display the component as a premium centered floating showcase card with 3D perspective */}
      <div className="w-full flex justify-center items-center relative z-10" style={{ perspective: "1200px" }}>
        <GlassCard />
      </div>

      {/* Decorative star icon in the bottom-right corner as seen in reference */}
      <div className="absolute bottom-6 right-6 opacity-40 select-none pointer-events-none">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-500">
          <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" fill="currentColor" />
        </svg>
      </div>
    </PageShell>
  );
}
