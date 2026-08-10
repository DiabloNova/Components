"use client";

import React, { useState } from "react";
import { LayoutGrid, Layers, CreditCard, Sliders, User, type LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

/** Shared colouring for every nav glyph, driven by the active/hover state. */
const glyphTones = {
  text: {
    active: "text-white",
    idle: "text-[#7A7A7F] group-hover:text-white",
  },
  bg: {
    active: "bg-white",
    idle: "bg-[#7A7A7F] group-hover:bg-white",
  },
} as const;

const glyphTone = (active: boolean, property: keyof typeof glyphTones) =>
  cn("transition-colors duration-300", glyphTones[property][active ? "active" : "idle"]);

const equalizerBars = ["h-2", "h-[18px]", "h-3.5"];

type NavItem = { id: number; icon: LucideIcon } | { id: number; icon: "equalizer" };

const navItems: NavItem[] = [
  { id: 0, icon: LayoutGrid },
  { id: 1, icon: "equalizer" },
  { id: 2, icon: Layers },
  { id: 3, icon: CreditCard },
  { id: 4, icon: Sliders },
  { id: 5, icon: User },
];

function NavIcon({ item, active }: { item: NavItem; active: boolean }) {
  if (item.icon === "equalizer") {
    return (
      <div className="flex items-end gap-[3px] h-[18px]">
        {equalizerBars.map((height) => (
          <div key={height} className={cn("w-[2.5px] rounded-full", height, glyphTone(active, "bg"))} />
        ))}
      </div>
    );
  }

  const Icon = item.icon;
  return <Icon className={cn("w-5 h-5", glyphTone(active, "text"))} strokeWidth={1.8} />;
}

export default function BottomNavigation() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full max-w-[560px] mx-auto">
      {/* Outer Floating Nav Container */}
      <div className="nav-bar-container rounded-[24px] p-2.5 flex items-center justify-between relative">
        {navItems.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <React.Fragment key={item.id}>
              {/* Navigation Button Item */}
              <button
                onClick={() => setActiveIndex(index)}
                className="relative flex-1 flex items-center justify-center h-14 group outline-none"
              >
                {isActive ? (
                  /* Premium Active Gold Metallic Frame - squircle style with inner bevel */
                  <div className="relative w-14 h-14 rounded-[18px] gold-metallic-ring p-[3px] flex items-center justify-center transition-all duration-500 scale-105 shadow-lg active:scale-95">
                    <div className="w-full h-full rounded-[15px] gold-metallic-inner flex items-center justify-center">
                      <NavIcon item={item} active />
                    </div>
                  </div>
                ) : (
                  /* Standard Unselected Tab with smooth hover and subtle press transition */
                  <div className="flex items-center justify-center w-14 h-14 rounded-[18px] transition-all duration-300 hover:bg-white/5 active:scale-90">
                    <NavIcon item={item} active={false} />
                  </div>
                )}
              </button>

              {/* Spaced Separator lines between items - skip after last item */}
              {index < navItems.length - 1 && (
                <div className="w-[1px] h-6 bg-gradient-to-b from-transparent via-[#2D2D32] to-transparent self-center" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
