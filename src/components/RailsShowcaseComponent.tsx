"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getBezierPoint, getBezierTangentAngle, type CubicBezier } from "@/utils/bezier";
import { useTilt } from "@/hooks/useTilt";

// --- Types & Helper Interfaces ---
interface SphereConfig {
  id: string;
  trackIndex: number; // 0: Outer, 1: Middle, 2: Inner
  t: number;          // Position progress (0 to 1) along the track
  type: "matte" | "teal" | "capsule";
}

const trackBases: CubicBezier[] = [
  // Track 3 (Outer / Bottom-most in original visual hierarchy)
  {
    p0: { x: 224, y: -20 },
    p1: { x: 130, y: 130 },
    p2: { x: 420, y: 240 },
    p3: { x: 920, y: 360 },
  },
  // Track 2 (Middle)
  {
    p0: { x: 340, y: -20 },
    p1: { x: 246, y: 130 },
    p2: { x: 536, y: 240 },
    p3: { x: 1036, y: 360 },
  },
  // Track 1 (Inner / Top-most in original visual hierarchy)
  {
    p0: { x: 456, y: -20 },
    p1: { x: 362, y: 130 },
    p2: { x: 652, y: 240 },
    p3: { x: 1152, y: 360 },
  },
];

// Per-variant visual layers; all variants share the same positioning wrapper.
const sphereLayers: Record<SphereConfig["type"], React.ReactNode> = {
  matte: (
    <>
      <div className="absolute w-[22px] h-[22px] translate-x-[5px] translate-y-[7px] bg-black/20 blur-[4.5px] rounded-full transition-transform duration-300 group-hover:translate-x-[6px] group-hover:translate-y-[9px] group-hover:scale-105" />
      <div className="w-[22px] h-[22px] rounded-full bg-[radial-gradient(circle_at_35%_35%,#ffffff_0%,#f5f5f5_35%,#e0e0e0_70%,#b0b0b0_100%)] border border-white/20 transition-transform duration-300 group-hover:scale-105" />
    </>
  ),
  teal: (
    <>
      <div className="absolute w-[22px] h-[22px] translate-x-[4px] translate-y-[6px] bg-cyan-400/35 blur-[7px] rounded-full transition-all duration-300 group-hover:bg-cyan-400/45 group-hover:scale-110" />
      <div className="w-[22px] h-[22px] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(165,243,252,0.95)_0%,rgba(34,211,238,0.75)_50%,rgba(8,145,178,0.95)_85%,rgba(6,182,212,0.6)_100%)] border border-cyan-300/30 backdrop-blur-[1px] transition-transform duration-300 group-hover:scale-110 relative overflow-hidden">
        <div className="absolute top-[2.5px] left-[2.5px] w-1.5 h-1.5 bg-white/70 rounded-full" />
      </div>
    </>
  ),
  capsule: (
    <>
      <div className="absolute w-[44px] h-[22px] translate-x-[4px] translate-y-[6px] bg-black/15 blur-[4px] rounded-full" />
      <div className="absolute w-[22px] h-[22px] translate-x-[16px] translate-y-[6px] bg-cyan-400/30 blur-[7px] rounded-full" />
      <div className="w-[44px] h-[22px] rounded-full flex items-center overflow-hidden border border-white/20 shadow-sm relative transition-all duration-300 group-hover:scale-105">
        <div className="w-1/2 h-full bg-[radial-gradient(circle_at_50%_35%,#ffffff_0%,#f0f0f0_50%,#cccccc_100%)]" />
        <div className="w-1/2 h-full bg-[radial-gradient(circle_at_35%_35%,rgba(167,243,254,1)_0%,rgba(34,211,238,0.9)_60%,rgba(8,145,178,1)_100%)] relative">
          <div className="absolute top-[2px] left-[2px] w-1 h-1 bg-white/80 rounded-full" />
        </div>
      </div>
    </>
  ),
};

interface SphereComponentProps {
  sphere: SphereConfig;
  track: CubicBezier;
}

function SphereComponent({ sphere, track }: SphereComponentProps) {
  const [localT, setLocalT] = useState(sphere.t);

  useEffect(() => {
    const interval = setInterval(() => {
      const wave = Math.sin(Date.now() / 3200 + sphere.trackIndex) * 0.004;
      setLocalT(sphere.t + wave);
    }, 30);
    return () => clearInterval(interval);
  }, [sphere.t, sphere.trackIndex]);

  const pos = getBezierPoint(track, localT);
  const rotation =
    sphere.type === "capsule" ? ` rotate(${getBezierTangentAngle(track, localT)}deg)` : "";

  return (
    <div
      className="absolute pointer-events-auto group"
      style={{
        left: `${(pos.x / 1000) * 100}%`,
        top: `${(pos.y / 500) * 100}%`,
        transform: `translate(-50%, -50%)${rotation}`,
      }}
    >
      {sphereLayers[sphere.type]}
    </div>
  );
}

export default function RailsShowcaseComponent() {
  // For interactive page/tab selector state "02 / 03"
  const [activeSlide, setActiveSlide] = useState(2); // Default to slide 2

  // Mouse hover coordinate tracking for premium 3D tilt/parallax card effect
  const { ref, rotateX, rotateY, onPointerMove, onPointerLeave } = useTilt<HTMLDivElement>({
    maxRotateX: 6,
    maxRotateY: 8,
    spring: { stiffness: 90, damping: 22 },
  });

  // Configure original sphere positions along the tracks
  const spheresConfig: SphereConfig[] = [
    { id: "s1", trackIndex: 0, t: 0.33, type: "matte" },    // Sphere 1 (Matte White, Track 3)
    { id: "s2", trackIndex: 2, t: 0.16, type: "matte" },    // Sphere 2 (Matte White, Track 1)
    { id: "s3", trackIndex: 1, t: 0.49, type: "matte" },    // Sphere 3 (Matte White, Track 2)
    { id: "s4", trackIndex: 1, t: 0.58, type: "capsule" },  // Capsule 4 (Half-White, Half-Teal, Track 2)
    { id: "s5", trackIndex: 1, t: 0.77, type: "teal" },     // Orb 5 (Teal Glass, Track 2)
    { id: "s6", trackIndex: 2, t: 0.85, type: "teal" },     // Orb 6 (Teal Glass, Track 1)
    { id: "s7", trackIndex: 0, t: 0.88, type: "matte" },    // Sphere 7 (Matte White, Track 3)
  ];

  return (
    <div className="w-full max-w-[1000px] px-2 md:px-4">
      {/* 3D tilt floating showcase card */}
      <motion.div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full bg-[#EAEAEA] rounded-[36px] p-8 md:p-12 pb-10 md:pb-14 shadow-container border border-white/50 relative overflow-hidden flex flex-col justify-between min-h-[540px] select-none"
      >
        {/* Subtle slow sweep light glare reflection layer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none mix-blend-overlay" />

        {/* --- Top Navigation Bar --- */}
        <div className="flex items-center justify-between z-10">
          {/* Precise Lowercase "rails" geometric SVG wordmark */}
          <div className="flex items-center gap-1.5 cursor-pointer group">
            <svg
              width="58"
              height="20"
              viewBox="0 0 58 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#111111] transition-transform duration-300 group-hover:scale-105"
            >
              {/* r */}
              <path
                d="M4 6.5V17M4 10.5C4.8 7.5 7.2 6.5 9.5 6.5"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* a */}
              <path
                d="M17.5 17C15.5 17 13.5 15.8 13.5 13C13.5 10.2 15.5 9 17.5 9C19.5 9 20.5 10.2 20.5 13C20.5 15.8 18.5 17 17.5 17ZM20.5 9.5V17"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* i */}
              <path
                d="M26 6.5V17"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <circle cx="26" cy="2.5" r="1.4" fill="currentColor" />
              {/* l */}
              <path
                d="M31.5 2V17"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              {/* s */}
              <path
                d="M37 15.5C37.5 16.5 39 17 40.5 17C42.5 17 43.5 16 43.5 14.8C43.5 12.5 37 13 37 10.2C37 8 38.5 6.5 41 6.5C42.5 6.5 44 7.2 44.5 8.5"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Nav links and Premium black pill action button */}
          <div className="flex items-center gap-6 md:gap-8 text-[13.5px] font-medium text-neutral-800">
            <button className="text-neutral-500 hover:text-black transition-colors duration-300">
              Solutions
            </button>
            <button className="text-neutral-500 hover:text-black transition-colors duration-300">
              How it works
            </button>
            <button className="bg-black text-white hover:bg-neutral-800 px-5 py-2.5 rounded-[12px] text-[13px] font-medium transition-all duration-300 shadow-sm active:scale-95">
              Get in touch
            </button>
          </div>
        </div>

        {/* --- Graphic Canvas Area with Carved Tracks & Physical Spheres --- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Main SVG Container containing the tracks */}
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
          >
            {trackBases.map((track, idx) => {
              const pathData = `M ${track.p0.x} ${track.p0.y} C ${track.p1.x} ${track.p1.y}, ${track.p2.x} ${track.p2.y}, ${track.p3.x} ${track.p3.y}`;
              return (
                <g key={idx}>
                  {/* Neumorphic Shadow (inset shadow simulator) shifted slightly top-left */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#D0D0D0"
                    strokeWidth="22"
                    strokeLinecap="round"
                    className="opacity-95 transform -translate-x-[1.2px] -translate-y-[1.2px]"
                  />
                  {/* Neumorphic Highlight (inset highlight simulator) shifted slightly bottom-right */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="22"
                    strokeLinecap="round"
                    className="opacity-90 transform translate-x-[1.2px] translate-y-[1.2px]"
                  />
                  {/* Main Carved Track Channel matching the background precisely */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#EAEAEA"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />
                  {/* Deep Inner Center Core of track for depth perception */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#E2E2E2"
                    strokeWidth="10"
                    strokeLinecap="round"
                    className="opacity-70"
                  />
                </g>
              );
            })}
          </svg>

          {/* Render Physical Spheres along the curves */}
          {spheresConfig.map((sphere) => (
            <SphereComponent key={sphere.id} sphere={sphere} track={trackBases[sphere.trackIndex]} />
          ))}
        </div>

        {/* --- Bottom Grid Section (Content & Slide Selector) --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end z-10 mt-auto pt-24">
          {/* Bottom-Left Column: Headline & Interactive Slide Switcher */}
          <div className="md:col-span-6 flex flex-col gap-6 md:gap-8">
            {/* Interactive "02 / 03" Slide Selector */}
            <div className="flex items-center gap-3.5 text-[13.5px] font-semibold text-neutral-800">
              <button
                onClick={() => setActiveSlide(activeSlide === 2 ? 1 : 2)}
                className="w-10 h-10 rounded-full border border-neutral-300/80 bg-white/40 flex items-center justify-center hover:bg-white hover:border-neutral-400 hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm"
              >
                02
              </button>
              <span className="text-neutral-400 font-medium">/ 03</span>
            </div>

            {/* Title with clean, editorial letter spacing & weight */}
            <h2 className="text-[34px] md:text-[40px] font-medium text-[#111111] leading-[1.12] tracking-tight">
              Worldwide <br />
              payroll solution
            </h2>
          </div>

          {/* Bottom-Right Column: Subtitle, Dots & Body Description */}
          <div className="md:col-span-6 flex flex-col gap-4 max-w-[340px] md:ml-auto">
            {/* Horizontal Pagination Indicator Dots */}
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-1 h-1 rounded-full bg-neutral-800" />
              <span className="w-1 h-1 rounded-full bg-neutral-400" />
            </div>

            {/* Small bold header */}
            <h3 className="text-[13.5px] font-semibold text-neutral-800">
              One place for everything
            </h3>

            {/* Premium, low-contrast, highly legible description */}
            <p className="text-[12.5px] text-neutral-500 leading-[1.6] font-normal">
              A solution that allows businesses to deposit their local fiat into an account and then pay individuals.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
