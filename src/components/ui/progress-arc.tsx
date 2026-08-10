"use client";

import React from "react";
import { motion } from "framer-motion";
import { transitions } from "@/utils/motion";

export interface ProgressArcProps {
  /** Circle radius in viewBox units. */
  radius: number;
  /** Filled portion of the arc, 0-100. */
  percentage: number;
  /** Center coordinate of the circle in viewBox units. */
  center: number;
  strokeWidth?: number;
  stroke?: string;
}

/**
 * Animated circular progress stroke. Rendered twice per dial: once as the
 * visible arc and once, blurred, as its luminous halo.
 */
export default function ProgressArc({
  radius,
  percentage,
  center,
  strokeWidth = 20,
  stroke = "url(#progress-gradient)",
}: ProgressArcProps) {
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.circle
      cx={center}
      cy={center}
      r={radius}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      fill="none"
      strokeDasharray={circumference}
      initial={{ strokeDashoffset: circumference }}
      animate={{ strokeDashoffset: circumference - (circumference * percentage) / 100 }}
      transition={transitions.dialSweep}
    />
  );
}
