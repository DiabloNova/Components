"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the menu if clicked outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Premium styled hamburger toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F4F3F0] hover:bg-[#E9E8E4] border border-[#E9E8E4] text-[#111111] transition-all duration-300 shadow-sm outline-none focus:ring-2 focus:ring-[#FF6B30]/40"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Dropdown Menu Overlay */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border border-[#E9E8E4] shadow-xl overflow-hidden z-50 animate-fade-in origin-top-right transition-all duration-300">
          <div className="p-2 flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-3 text-[14px] font-medium text-[#111111] hover:bg-[#F4F3F0] rounded-xl transition-all duration-200"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF6B30] mr-3"></span>
              Main Page
            </Link>
            <Link
              href="/second-page"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-3 text-[14px] font-medium text-[#7D7D7D] hover:text-[#111111] hover:bg-[#F4F3F0] rounded-xl transition-all duration-200"
            >
              <span className="w-2 h-2 rounded-full bg-neutral-300 mr-3"></span>
              Second Page
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
