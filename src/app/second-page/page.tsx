import React from "react";
import Navigation from "@/components/Navigation";
import LeftCard from "@/components/LeftCard";
import RightCard from "@/components/RightCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SecondPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#EAEAEA] p-4 md:p-8 py-12 md:py-16 gap-8 selection:bg-neutral-800 selection:text-white">
      {/* Back button above the main container */}
      <div className="w-full max-w-[880px] flex justify-start">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#F4F3F0] text-[#111111] text-[13px] font-semibold transition-all duration-300 shadow-sm border border-[#E9E8E4]"
          title="Back to Home"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Main Page</span>
        </Link>
      </div>

      {/* Main Container - Rounded, elevated white card containing BOTH cards */}
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
          {/* Left Card: Light Theme with Neumorphic Inner Frame */}
          <LeftCard />

          {/* Right Card: Dark Theme with cascading visual height offset */}
          <div className="transform md:translate-y-8">
            <RightCard />
          </div>
        </div>

      </div>
    </main>
  );
}
