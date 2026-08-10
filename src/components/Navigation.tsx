"use client";

import React, { useState } from "react";
import { cn } from "@/utils/cn";

export default function Navigation() {
  const tabs = ["Reviews", "Solve", "Prevent"];
  const [activeTab, setActiveTab] = useState("Reviews");

  return (
    <div className="flex items-center p-1 bg-[#F4F3F0] rounded-full shadow-pill-container border border-[#E9E8E4]">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "relative flex items-center justify-center px-4 py-2 text-[13px] font-medium rounded-full transition-all duration-300",
              isActive
                ? "bg-white text-[#111111] shadow-pill-active border border-[#E1E0DC]/40"
                : "text-[#7D7D7D] hover:text-[#111111]"
            )}
          >
            {tab === "Reviews" && (
              <span className="relative flex h-2 w-2 mr-1.5">
                {/* Glow ring for premium look */}
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B30] opacity-30"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B30]"></span>
              </span>
            )}
            <span>{tab}</span>
          </button>
        );
      })}
    </div>
  );
}
