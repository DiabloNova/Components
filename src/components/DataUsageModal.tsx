"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Sliders } from "lucide-react";

interface DataUsageModalProps {
  percentage: number;
  usedAmount: number;
  totalAmount: number;
  setPercentage: (value: number) => void;
  onClose: () => void;
}

function clampPercentage(value: number): number {
  if (!Number.isFinite(value)) {
    console.error("DataUsageModal received a non-finite percentage:", value);
    return 0;
  }
  return Math.min(100, Math.max(0, value));
}

export default function DataUsageModal({
  percentage,
  usedAmount,
  totalAmount,
  setPercentage,
  onClose,
}: DataUsageModalProps) {
  const [isDialHovered, setIsDialHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // A non-finite or out-of-range percentage would propagate NaN into the SVG
  // stroke offsets and render an invisible dial with no visible failure.
  const safePercentage = clampPercentage(percentage);

  // SVG circular progress calculations
  const radius = 82;
  const circumference = 2 * Math.PI * radius; // Approx 515.221
  const strokeOffset = circumference - (circumference * safePercentage) / 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center w-[340px]"
    >
      {/* ModalHeader: Flex container containing title and close button */}
      <div className="relative w-full flex items-center justify-center mb-5 h-[32px]">
        {/* Close Button on the left */}
        <button
          onClick={onClose}
          className="absolute left-0 w-[32px] h-[32px] rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center border border-gray-100/50 hover:scale-105 active:scale-95 hover:bg-neutral-50 transition-all duration-300 group outline-none"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-neutral-800 transition-transform duration-300 group-hover:rotate-90" strokeWidth={2.5} />
        </button>

        {/* Title text exactly centered */}
        <h2 className="text-[16px] font-semibold text-[#111111] tracking-tight select-none">
          Data Usage
        </h2>
      </div>

      {/* DataCard: Main UI container panel with card hover animations */}
      <motion.div
        whileHover={{
          y: -4,
          boxShadow: "0px 20px 50px rgba(0,0,0,0.12)",
        }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
        className="w-[340px] h-[400px] p-6 flex flex-col justify-between bg-white rounded-[20px] shadow-[0_16px_48px_-16px_rgba(0,0,0,0.08)] border border-gray-100/40 select-none relative overflow-visible"
      >
        <div>
          {/* CardHeading: Title for the card section */}
          <h3 className="text-[22px] font-bold text-[#111111] tracking-tight select-none text-left">
            Summary
          </h3>

          {/* CircularProgressContainer: Relative boundaries mapping to focus & dial hover triggers */}
          <motion.div
            onMouseEnter={() => setIsDialHovered(true)}
            onMouseLeave={() => setIsDialHovered(false)}
            animate={{ scale: isDialHovered ? 1.05 : 1.0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.8 }}
            className="relative w-[210px] h-[210px] flex items-center justify-center mx-auto mt-4 cursor-pointer select-none"
          >
            {/* SVG Gradients Definitions */}
            <svg className="absolute w-0 h-0" viewBox="0 0 0 0">
              <defs>
                <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#52e050" />
                  <stop offset="100%" stopColor="#2fd475" />
                </linearGradient>
              </defs>
            </svg>

            {/* Recessed Neomorphic Groove Background with Physical Inset Shadow */}
            <div className="absolute w-[184px] h-[184px] rounded-full bg-gradient-to-b from-[#e8e8e8] to-[#fcfcfc] shadow-[inset_0_4px_10px_rgba(0,0,0,0.08)] border border-gray-100/10 pointer-events-none select-none z-0" />

            {/* Radial Tick Marks (Diamond layout positioned radially below active layers) */}
            <div className="absolute inset-0 pointer-events-none z-10 select-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    transform: `rotate(${i * 30}deg) translateY(-82px)`,
                  }}
                >
                  <div className="w-[4px] h-[4px] bg-neutral-300 transform rotate-45 select-none" />
                </div>
              ))}
            </div>

            {/* Luminous Halo Glow Layer: Blurred replica of the progress bar path */}
            <div className="absolute inset-0 pointer-events-none z-20 overflow-visible select-none">
              <motion.svg
                className="absolute inset-0 w-full h-full transform -rotate-90 overflow-visible"
                viewBox="0 0 210 210"
                style={{ filter: "blur(14px)" }}
                animate={{ opacity: isDialHovered ? 0.60 : 0.45 }}
                transition={{ duration: 0.3 }}
              >
                <motion.circle
                  cx="105"
                  cy="105"
                  r={radius}
                  stroke="url(#progress-gradient)"
                  strokeWidth="20"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: strokeOffset }}
                  transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
                />
              </motion.svg>
            </div>

            {/* Active Vector SVG Progress Bar */}
            <svg
              className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none z-30 select-none"
              viewBox="0 0 210 210"
            >
              <motion.circle
                cx="105"
                cy="105"
                r={radius}
                stroke="url(#progress-gradient)"
                strokeWidth="20"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: strokeOffset }}
                transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
              />
            </svg>

            {/* Center Floating Hub Disc */}
            <div className="absolute w-[126px] h-[126px] rounded-full bg-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] flex flex-col items-center justify-center pointer-events-none select-none z-40">
              <div className="flex items-baseline leading-none select-none">
                <span className="text-[46px] font-bold text-black tracking-tighter select-none">{safePercentage}</span>
                <span className="text-[20px] font-semibold text-black ml-[1px] select-none">%</span>
              </div>
              <div className="text-[12px] font-semibold tracking-wide text-[#111111] mt-0.5 select-none">
                <span>{usedAmount}GB</span>
                <span className="text-[#a0a0a0]"> / {totalAmount}GB</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CardFooter: Container wrapping the action triggers or inline inputs */}
        <div className="h-[36px] flex items-center justify-center select-none relative z-50">
          {!isEditing ? (
            <p className="text-[13px] font-medium text-[#111111] select-none text-center">
              Renews 1st August •{" "}
              <span
                onClick={() => setIsEditing(true)}
                className="underline underline-offset-4 cursor-pointer hover:text-black/80 transition-colors"
              >
                Edit
              </span>
            </p>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex items-center gap-3 bg-neutral-50 border border-neutral-100 p-1.5 px-3 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
            >
              <Sliders className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <input
                type="range"
                min="0"
                max="100"
                value={safePercentage}
                onChange={(e) => setPercentage(clampPercentage(Number(e.target.value)))}
                className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#2fd475] focus:outline-none focus:ring-0"
              />
              <span
                onClick={() => setIsEditing(false)}
                className="text-[12px] font-semibold text-neutral-800 hover:text-neutral-900 cursor-pointer underline underline-offset-2 shrink-0 select-none"
              >
                Done
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
