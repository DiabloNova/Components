import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#EAEAEA] p-8 text-center">
      <div className="w-full max-w-[440px] bg-white rounded-[24px] p-8 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.08)] border border-gray-100/40">
        <h1 className="text-[20px] font-bold text-[#111111] tracking-tight">
          Page not found
        </h1>
        <p className="text-[#626262] text-[14px] leading-[1.5] mt-3">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-4 py-2.5 rounded-full bg-[#111111] text-white text-[13px] font-bold hover:bg-[#2A2A2E] transition-colors duration-200"
        >
          Back to Main Page
        </Link>
      </div>
    </main>
  );
}
