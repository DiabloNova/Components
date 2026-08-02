import React from "react";
import Link from "next/link";
import RightCard from "@/components/RightCard";
import BottomNavigation from "@/components/BottomNavigation";
import { ArrowLeft } from "lucide-react";

export default function SecondPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#EAEAEA] p-4 md:p-8 py-12 md:py-16 gap-12 md:gap-16 selection:bg-neutral-800 selection:text-white">
      {/* Main Container - Rounded, elevated white card matching the home page */}
      <div className="w-full max-w-[880px] bg-white rounded-[32px] p-8 md:p-11 md:pb-14 shadow-container overflow-visible relative">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F4F3F0] hover:bg-[#E9E8E4] border border-[#E9E8E4] transition-all duration-300"
              title="Back to Home"
            >
              <ArrowLeft className="w-5 h-5 text-[#111111]" />
            </Link>
            <h1 className="text-[25px] md:text-[28px] font-bold text-[#111111] leading-[1.25] tracking-tight">
              Secure Deployment
            </h1>
          </div>

          <div className="text-sm font-medium text-[#7D7D7D]">
            Second Page
          </div>
        </div>

        {/* Card Section */}
        <div className="flex justify-center items-center mt-12 min-h-[380px]">
          <RightCard />
        </div>
      </div>

      {/* Premium Bottom Navigation Component */}
      <div className="w-full">
        <BottomNavigation />
      </div>
    </main>
  );
}
