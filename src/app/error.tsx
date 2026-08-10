"use client";

import React, { useEffect } from "react";
import { RotateCcw } from "lucide-react";

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
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#EAEAEA] p-8 text-center">
      <div className="w-full max-w-[440px] bg-white rounded-[24px] p-8 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.08)] border border-gray-100/40">
        <h1 className="text-[20px] font-bold text-[#111111] tracking-tight">
          Something went wrong
        </h1>
        <p className="text-[#626262] text-[14px] leading-[1.5] mt-3">
          {error.message || "An unexpected error occurred while rendering this page."}
        </p>
        {error.digest && (
          <p className="text-[#8E8E93] text-[12px] mt-2 font-mono">
            Error ID: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#111111] text-white text-[13px] font-bold hover:bg-[#2A2A2E] transition-colors duration-200"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try again</span>
        </button>
      </div>
    </main>
  );
}
