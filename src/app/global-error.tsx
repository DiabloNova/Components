"use client";

import React, { useEffect } from "react";
import PageShell from "@/components/ui/page-shell";
import StatusCard, { statusActionClass } from "@/components/ui/status-card";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error in root layout:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <PageShell padding="p-8" className="text-center">
          <StatusCard
            title="Application error"
            message={error.message || "The application failed to load."}
            digest={error.digest}
            action={
              <button onClick={reset} className={statusActionClass}>
                Try again
              </button>
            }
          />
        </PageShell>
      </body>
    </html>
  );
}
