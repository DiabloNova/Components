"use client";

import React, { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import PageShell from "@/components/ui/page-shell";
import StatusCard, { statusActionClass } from "@/components/ui/status-card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error rendering route:", error);
  }, [error]);

  return (
    <PageShell padding="p-8" className="text-center">
      <StatusCard
        title="Something went wrong"
        message={error.message || "An unexpected error occurred while rendering this page."}
        digest={error.digest}
        action={
          <button onClick={reset} className={statusActionClass}>
            <RotateCcw className="w-4 h-4" />
            <span>Try again</span>
          </button>
        }
      />
    </PageShell>
  );
}
