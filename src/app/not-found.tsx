import React from "react";
import Link from "next/link";
import PageShell from "@/components/ui/page-shell";
import StatusCard, { statusActionClass } from "@/components/ui/status-card";

export default function NotFound() {
  return (
    <PageShell padding="p-8" className="text-center">
      <StatusCard
        title="Page not found"
        message="The page you are looking for does not exist."
        action={
          <Link href="/" className={statusActionClass}>
            Back to Main Page
          </Link>
        }
      />
    </PageShell>
  );
}
