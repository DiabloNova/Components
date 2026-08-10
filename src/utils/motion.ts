/**
 * Centralized motion curves, transitions, and springs
 * designed for precision hardware-like aesthetics.
 */

import type { Transition, Variants } from "framer-motion";

export const transitions = {
  // Ultra smooth spring for physical objects with weight (marbles, indicators)
  inertialSpring: {
    type: "spring",
    stiffness: 45,
    damping: 18,
    mass: 1.2,
  },

  // High-performance snappier spring for hover or interactive transitions
  responsiveSpring: {
    type: "spring",
    stiffness: 120,
    damping: 20,
    mass: 0.8,
  },

  // Elegant slow ease curve for subtle ambient animations (breathing glows, slow sweeps)
  ambientEase: {
    type: "tween",
    ease: [0.25, 0.1, 0.25, 1], // ease-in-out
    duration: 3.5,
  },

  // Standard micro-interaction transition
  standardEase: {
    type: "tween",
    ease: [0.16, 1, 0.3, 1], // easeOutQuart
    duration: 0.5,
  },

  // Long, decelerating sweep used by circular dials filling up
  dialSweep: {
    type: "tween",
    ease: [0.25, 1, 0.5, 1],
    duration: 1.4,
  },

  // Panel/card entrance and exit
  panelEase: {
    type: "tween",
    ease: [0.16, 1, 0.3, 1],
    duration: 0.4,
  },

  // Hover lift on cards and panels
  hoverLift: {
    type: "tween",
    ease: [0.25, 1, 0.5, 1],
    duration: 0.3,
  },
} satisfies Record<string, Transition>;

export const variants = {
  // Fade in elements elegantly from below
  fadeUp: {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: transitions.standardEase
    }
  },

  // Soft breathing opacity/glow cycle
  breathingGlow: {
    pulse: {
      scale: [1, 1.03, 1],
      opacity: [0.85, 0.98, 0.85],
      filter: [
        "drop-shadow(0 0 8px rgba(34, 211, 238, 0.45))",
        "drop-shadow(0 0 16px rgba(34, 211, 238, 0.75))",
        "drop-shadow(0 0 8px rgba(34, 211, 238, 0.45))"
      ],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },

  // Slow ambient floating movement
  slowFloat: {
    animate: {
      y: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
} satisfies Record<string, Variants>;
