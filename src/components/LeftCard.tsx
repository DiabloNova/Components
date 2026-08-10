"use client";

import React from "react";
import Pill from "@/components/ui/pill";

export default function LeftCard() {
  return (
    <div className="flex flex-col justify-between p-8 shadow-left-card rounded-[24px] h-[380px] w-full max-w-[380px] mx-auto md:mx-0 transition-all duration-300 hover:shadow-md">
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
            <Pill>v2.8.5</Pill>
            <Pill tone="success">Open source</Pill>
          </div>
          <div>
            <Pill>database</Pill>
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
