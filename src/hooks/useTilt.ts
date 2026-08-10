"use client";

import React, { useRef } from "react";
import { useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";

export interface UseTiltOptions {
  /** Maximum rotation around the X axis, in degrees. */
  maxRotateX?: number;
  /** Maximum rotation around the Y axis, in degrees. */
  maxRotateY?: number;
  /** Spring used to smooth the rotation. */
  spring?: { stiffness: number; damping: number };
}

export interface Tilt<T extends HTMLElement> {
  ref: React.RefObject<T>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  onPointerMove: (event: React.PointerEvent<T>) => void;
  onPointerLeave: () => void;
}

/**
 * Pointer-driven 3D tilt. Pointer position is normalised to [-0.5, 0.5] over the
 * element bounds and mapped onto spring-smoothed rotation values, which the
 * consumer spreads onto a `motion` element together with `transformStyle`.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>({
  maxRotateX = 8,
  maxRotateY = 8,
  spring = { stiffness: 180, damping: 25 },
}: UseTiltOptions = {}): Tilt<T> {
  const ref = useRef<T>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxRotateX, -maxRotateX]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxRotateY, maxRotateY]), spring);

  const onPointerMove = (event: React.PointerEvent<T>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((event.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, rotateX, rotateY, onPointerMove, onPointerLeave };
}
