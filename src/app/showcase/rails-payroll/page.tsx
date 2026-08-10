import React from "react";
import RailsShowcaseComponent from "@/components/RailsShowcaseComponent";
import PageShell from "@/components/ui/page-shell";

export const metadata = {
  title: "Rails Worldwide Payroll Solution Showcase",
  description: "A premium, pixel-perfect interactive showcase of the Rails worldwide payroll solution.",
};

export default function RailsShowcasePage() {
  return (
    <PageShell>
      {/* Container to display the component as a premium centered floating showcase card */}
      <div className="w-full flex justify-center items-center">
        <RailsShowcaseComponent />
      </div>
    </PageShell>
  );
}
