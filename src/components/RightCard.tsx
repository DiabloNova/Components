"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function RightCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col justify-between p-8 bg-gradient-to-b from-[#212124] to-[#121213] border border-[#2A2A2E]/50 rounded-[24px] shadow-dark-card h-[380px] w-full max-w-[380px] mx-auto md:mx-0 z-10 transition-all duration-500 hover:translate-y-[-4px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        {/* Title */}
        <h2 className="text-[20px] font-bold text-white leading-[1.25] tracking-tight">
          Secure deployment
        </h2>

        {/* Description Paragraph - exact max-w to wrap on 3 lines like the original */}
        <p className="text-[#8E8E93] text-[14px] leading-[1.5] mt-4 font-normal max-w-[260px]">
          No deploys with uncached fetches. <br />
          CI must load-test any component that <br />
          pulls user data on render.
        </p>
      </div>

      <div className="mt-auto">
        {/* Middle Label */}
        <p className="text-[#555558] text-[13px] font-semibold mb-6">
          v2.8.6 securely encrypted
        </p>

        {/* Footer Section */}
        <div className="flex items-center justify-between gap-1">
          {/* Deployed Badge */}
          <div className="flex items-center gap-1.5 bg-[#122415] border border-[#1A3D1F]/80 text-[#55C448] px-3.5 py-1.5 rounded-full text-[13px] font-bold select-none shadow-[0_1px_2px_rgba(0,0,0,0.2)] whitespace-nowrap">
            <svg
              className="w-4 h-4 text-[#55C448] shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Deployed</span>
          </div>

          {/* Action Button */}
          <button className="shadow-btn-white flex items-center gap-1.5 bg-white text-[#111111] hover:bg-[#F5F5F7] px-4 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 group whitespace-nowrap">
            <span className="whitespace-nowrap">Restart investigation</span>
            <ArrowRight
              className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                isHovered ? "translate-x-1" : ""
              }`}
              strokeWidth={2.5}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
