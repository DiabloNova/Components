"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export interface GlassCardProps {
  className?: string;
}

export default function GlassCard({ className }: GlassCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const springConfig = { damping: 25, stiffness: 180 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  return (
    <motion.div
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={(e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`relative w-full max-w-[370px] h-[490px] rounded-[48px] border-[1.5px] border-white/60 bg-white/20 p-11 backdrop-blur-[30px] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.06),_inset_0_2px_4px_rgba(255,255,255,0.4)] flex flex-col justify-between transition-shadow duration-300 hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.1),_inset_0_2px_4px_rgba(255,255,255,0.5)] ${className || ""}`}
    >
      {/* Elegant glint overlay */}
      <div className="absolute inset-0 rounded-[46px] bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />

      {/* Top: Bold, clean, compact typography exactly like the image */}
      <div className="flex flex-col mt-4">
        <h2 className="text-[42px] font-bold text-[#111111] leading-[1.04] tracking-[-0.035em] font-sans antialiased">
          A better <br />
          way to <br />
          design
        </h2>
      </div>

      {/* Bottom: Footer row */}
      <div className="flex items-center justify-between w-full mb-1">
        {/* Bottom-left: 3D Orb/Bubble + Text details */}
        <div className="flex items-center gap-3.5">
          {/* Photorealistic 3D Glass Orb/Bubble */}
          <div className="relative w-10 h-10 select-none pointer-events-none">
            {/* Base shadow */}
            <div className="absolute inset-0 rounded-full bg-[#111111]/5 blur-[2px] translate-y-[2px]" />
            {/* The main refracted glossy sphere gradient */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.95)_0%,rgba(250,250,250,0.75)_25%,rgba(200,200,200,0.35)_60%,rgba(120,120,120,0.1)_90%,rgba(255,255,255,0.05)_100%)] shadow-[inset_-3px_-3px_8px_rgba(0,0,0,0.06),_inset_1px_1px_3px_rgba(255,255,255,0.8),_0_4px_10px_-2px_rgba(0,0,0,0.1)] border border-white/50 backdrop-blur-[1px]" />
            {/* Hotspot/Reflection highlight */}
            <div className="absolute top-[4px] left-[5px] w-3 h-2 rounded-full bg-white/70 rotate-[-15deg] filter blur-[0.3px]" />
            <div className="absolute top-[3px] left-[7px] w-1.5 h-1.5 rounded-full bg-white/90" />
          </div>

          <div className="flex flex-col">
            <span className="text-[14.5px] font-bold text-[#111111] leading-tight tracking-tight">
              Chris Berge
            </span>
            <span className="text-[12px] font-semibold text-[#8a8a8f] leading-tight tracking-tight mt-[1px]">
              01 of 05
            </span>
          </div>
        </div>

        {/* Bottom-right: Right arrow */}
        <motion.button
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors duration-200"
        >
          <ArrowRight className="w-5 h-5 text-[#111111]" strokeWidth={2.4} />
        </motion.button>
      </div>
    </motion.div>
  );
}
