import React from "react";
import Navigation from "@/components/Navigation";
import LeftCard from "@/components/LeftCard";
import BottomNavigation from "@/components/BottomNavigation";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#EAEAEA] p-4 md:p-8 py-12 md:py-16 gap-12 md:gap-16 selection:bg-neutral-800 selection:text-white">
      {/* Main Container - Rounded, elevated white card */}
      <div className="w-full max-w-[880px] bg-white rounded-[32px] p-8 md:p-11 md:pb-14 shadow-container overflow-visible relative">

        {/* Hamburger Menu in the absolute top right corner */}
        <div className="absolute top-6 right-6 z-50">
          <HamburgerMenu />
        </div>

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pr-12">
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

        {/* Single-Column Card Section */}
        <div className="flex justify-center items-center mt-10 relative min-h-[380px]">
          {/* Left Card: Light Theme with Neumorphic Inner Frame */}
          <LeftCard />
        </div>

      </div>

      {/* Premium Bottom Navigation Component */}
      <div className="w-full">
        <BottomNavigation />
      </div>
    </main>
  );
}
