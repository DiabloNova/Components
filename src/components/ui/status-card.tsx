import React from "react";

/** Shared styling for the recovery button/link rendered inside a StatusCard. */
export const statusActionClass =
  "inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#111111] text-white text-[13px] font-bold hover:bg-[#2A2A2E] transition-colors duration-200";

export interface StatusCardProps {
  title: string;
  message: string;
  /** Next.js error digest, shown when present. */
  digest?: string;
  /** Recovery affordance, e.g. a retry button or a link home. */
  action: React.ReactNode;
}

/** Centered white card used by the error, global-error and not-found routes. */
export default function StatusCard({ title, message, digest, action }: StatusCardProps) {
  return (
    <div className="w-full max-w-[440px] bg-white rounded-[24px] p-8 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.08)] border border-gray-100/40">
      <h1 className="text-[20px] font-bold text-[#111111] tracking-tight">{title}</h1>
      <p className="text-[#626262] text-[14px] leading-[1.5] mt-3">{message}</p>
      {digest && (
        <p className="text-[#8E8E93] text-[12px] mt-2 font-mono">Error ID: {digest}</p>
      )}
      <div className="mt-6">{action}</div>
    </div>
  );
}
