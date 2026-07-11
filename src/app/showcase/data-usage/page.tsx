"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sliders } from "lucide-react";
import DataUsageModal from "@/components/DataUsageModal";

export default function DataUsageShowcasePage() {
  const [isOpen, setIsOpen] = useState(true);
  const [percentage, setPercentage] = useState(36);

  // Constants to scale physical values based on percentage
  const totalAmount = 10; // 10 GB total
  const usedAmount = parseFloat(((totalAmount * percentage) / 100).toFixed(1));

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#f7f7f7] relative overflow-hidden selection:bg-neutral-800 selection:text-white p-4">
      {/* Abstracted structural backdrop or ambient grid lines for premium aesthetics */}
      <div className="absolute inset-0 bg-[radial-gradient(#e1e1e1_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Orchestrate modal entry/exit life cycle */}
      <AnimatePresence mode="wait">
        {isOpen ? (
          <DataUsageModal
            key="modal"
            percentage={percentage}
            usedAmount={usedAmount}
            totalAmount={totalAmount}
            setPercentage={setPercentage}
            onClose={() => setIsOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      {/* Floating Action Button (FAB) to restore the modal conditionally when closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="fab"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-white text-neutral-800 border border-neutral-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 font-medium text-[14px]"
          >
            <Sliders className="w-4 h-4 text-[#2fd475]" />
            <span>Open Data Usage</span>
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
