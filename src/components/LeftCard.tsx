"use client";

import React from "react";

export default function LeftCard() {
  return (
    <div className="flex flex-col justify-between p-8 bg-[#F5F5F5] border border-[#EBEBEB] rounded-[24px] shadow-left-card h-[380px] w-full max-w-[380px] mx-auto md:mx-0 transition-all duration-300 hover:shadow-md">
      <div>
        {/* Title & Subtitle */}
        <h2 className="text-[20px] font-bold text-[#111111] leading-[1.25] tracking-tight">
          Deployment (v2.8.5) <br />
          added uncached lookups
        </h2>

        {/* Description Paragraph - exact max-w to wrap on 3 lines like the original */}
        <p className="text-[#626262] text-[14px] leading-[1.5] mt-4 font-normal max-w-[285px]">
          Requests are overloading the database, causing latency spikes and broken
          frontend responses.
        </p>

        {/* Badges/Pills - Row 1 and Row 2 exactly as original */}
        <div className="flex flex-col gap-2 mt-8">
          <div className="flex items-center gap-2">
            <span className="bg-white text-[#555555] border border-[#E2E2E2] px-3.5 py-1 rounded-full text-[12px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              v2.8.5
            </span>
            <span className="bg-[#EBF5EB] text-[#428142] border border-[#D3EAD3] px-3.5 py-1 rounded-full text-[12px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
              Open source
            </span>
          </div>
          <div>
            <span className="inline-block bg-white text-[#555555] border border-[#E2E2E2] px-3.5 py-1 rounded-full text-[12px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              database
            </span>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="flex items-center justify-between mt-auto pt-4">
        <span className="text-[#8E8E93] text-[13px] font-normal">
          (27) spikes found
        </span>
        <a
          href="#"
          className="text-[#111111] text-[13px] font-semibold underline underline-offset-4 decoration-1 decoration-[#111111]/40 hover:decoration-[#111111] transition-all duration-200"
          onClick={(e) => e.preventDefault()}
        >
          Read more
        </a>
      </div>
    </div>
  );
}
