"use client";

import React, { useState } from "react";
import { LayoutGrid, Layers, CreditCard, Sliders, User } from "lucide-react";

export default function BottomNavigation() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Define our 6 premium items
  const navItems = [
    {
      id: 0,
      icon: (active: boolean) => (
        <LayoutGrid
          className={`w-5 h-5 transition-colors duration-300 ${
            active ? "text-white" : "text-[#7A7A7F] group-hover:text-white"
          }`}
          strokeWidth={1.8}
        />
      ),
    },
    {
      id: 1,
      icon: (active: boolean) => (
        <div className="flex items-end gap-[3px] h-[18px]">
          <div
            className={`w-[2.5px] h-2 rounded-full transition-colors duration-300 ${
              active ? "bg-white" : "bg-[#7A7A7F] group-hover:bg-white"
            }`}
          />
          <div
            className={`w-[2.5px] h-[18px] rounded-full transition-colors duration-300 ${
              active ? "bg-white" : "bg-[#7A7A7F] group-hover:bg-white"
            }`}
          />
          <div
            className={`w-[2.5px] h-3.5 rounded-full transition-colors duration-300 ${
              active ? "bg-white" : "bg-[#7A7A7F] group-hover:bg-white"
            }`}
          />
        </div>
      ),
    },
    {
      id: 2,
      icon: (active: boolean) => (
        <Layers
          className={`w-5 h-5 transition-colors duration-300 ${
            active ? "text-white" : "text-[#7A7A7F] group-hover:text-white"
          }`}
          strokeWidth={1.8}
        />
      ),
    },
    {
      id: 3,
      icon: (active: boolean) => (
        <CreditCard
          className={`w-5 h-5 transition-colors duration-300 ${
            active ? "text-white" : "text-[#7A7A7F] group-hover:text-white"
          }`}
          strokeWidth={1.8}
        />
      ),
    },
    {
      id: 4,
      icon: (active: boolean) => (
        <Sliders
          className={`w-5 h-5 transition-colors duration-300 ${
            active ? "text-white" : "text-[#7A7A7F] group-hover:text-white"
          }`}
          strokeWidth={1.8}
        />
      ),
    },
    {
      id: 5,
      icon: (active: boolean) => (
        <User
          className={`w-5 h-5 transition-colors duration-300 ${
            active ? "text-white" : "text-[#7A7A7F] group-hover:text-white"
          }`}
          strokeWidth={1.8}
        />
      ),
    },
  ];

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
                      {item.icon(true)}
                    </div>
                  </div>
                ) : (
                  /* Standard Unselected Tab with smooth hover and subtle press transition */
                  <div className="flex items-center justify-center w-14 h-14 rounded-[18px] transition-all duration-300 hover:bg-white/5 active:scale-90">
                    {item.icon(false)}
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
