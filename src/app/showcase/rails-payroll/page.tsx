import React from "react";
import RailsShowcaseComponent from "@/components/RailsShowcaseComponent";

export const metadata = {
  title: "Rails Worldwide Payroll Solution Showcase",
  description: "A premium, pixel-perfect interactive showcase of the Rails worldwide payroll solution.",
};

export default function RailsShowcasePage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-[#EAEAEA] p-4 md:p-8 py-12 md:py-16 selection:bg-neutral-800 selection:text-white">
      {/* Container to display the component as a premium centered floating showcase card */}
      <div className="w-full flex justify-center items-center">
        <RailsShowcaseComponent />
      </div>
    </main>
  );
}
