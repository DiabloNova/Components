import React from "react";
import BottomNavigation from "@/components/BottomNavigation";
import HamburgerMenu from "@/components/HamburgerMenu";
import PageShell from "@/components/ui/page-shell";

export default function Home() {
  return (
    <PageShell padding="p-4 md:p-8">
      {/* Hamburger Menu fixed at top-right corner of the viewport */}
      <div className="absolute top-6 right-6 z-50">
        <HamburgerMenu />
      </div>

      {/* Main content area containing only the black navigation bar (Bottom Navigation) */}
      <div className="w-full max-w-[560px] flex flex-col items-center justify-center gap-6">
        <div className="text-center mb-4">
          <h1 className="text-[20px] font-bold text-neutral-800 tracking-tight">
            Main Control Panel
          </h1>
          <p className="text-neutral-500 text-sm">
            Use the top right menu to navigate
          </p>
        </div>

        {/* The Black Navigation Bar component */}
        <div className="w-full">
          <BottomNavigation />
        </div>
      </div>
    </PageShell>
  );
}
