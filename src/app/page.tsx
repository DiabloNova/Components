import React from "react";
import Navigation from "@/components/Navigation";
import LeftCard from "@/components/LeftCard";
import RightCard from "@/components/RightCard";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EAEAEA] p-4 md:p-8 selection:bg-neutral-800 selection:text-white">
      {/* Main Container - Rounded, elevated white card */}
      <div className="w-full max-w-[880px] bg-white rounded-[32px] p-8 md:p-11 md:pb-14 shadow-container overflow-visible relative">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          {/* Main Title - Gray & Black contrast exactly like original */}
          <h1 className="text-[25px] md:text-[28px] font-bold text-[#A6A6A6] leading-[1.25] tracking-tight">
            Smarter systems spot <br />
            problems <span className="text-[#111111]">— and Solve them</span>
          </h1>

          {/* Top-Right Navigation Pill */}
          <div className="self-start sm:self-auto">
            <Navigation />
          </div>
        </div>

        {/* Two-Column Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 relative">
          {/* Left Card: Light Theme */}
          <LeftCard />

          {/* Right Card: Dark Theme with cascading visual height offset (translate-y) */}
          <div className="transform md:translate-y-8">
            <RightCard />
          </div>
        </div>

      </div>
    </main>
  );
}
