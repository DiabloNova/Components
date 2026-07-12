"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  LayoutDashboard,
  TrendingUp,
  Clock,
  Settings,
  Menu,
  X,
  ArrowUpRight,
  Bell,
  ChevronRight,
  User,
  Sliders,
  DollarSign,
  Briefcase
} from "lucide-react";

// --- Types & Interfaces ---
interface BarData {
  day: string;
  hours: number;
}

interface AreaData {
  month: string;
  income: number;
}

// 7 Data points for weekly Hours Worked
const weeklyHours: BarData[] = [
  { day: "Mon", hours: 6.4 },
  { day: "Tue", hours: 8.5 },
  { day: "Wed", hours: 9.2 },
  { day: "Thu", hours: 7.8 },
  { day: "Fri", hours: 8.0 },
  { day: "Sat", hours: 4.5 },
  { day: "Sun", hours: 2.0 },
];

// 12 Data points for Income
const monthlyIncome: AreaData[] = [
  { month: "Jan", income: 3200 },
  { month: "Feb", income: 3800 },
  { month: "Mar", income: 4100 },
  { month: "Apr", income: 3700 },
  { month: "May", income: 4800 },
  { month: "Jun", income: 5200 },
  { month: "Jul", income: 6100 },
  { month: "Aug", income: 5900 },
  { month: "Sep", income: 6400 },
  { month: "Oct", income: 7100 },
  { month: "Nov", income: 6800 },
  { month: "Dec", income: 8200 },
];

export default function LiquidGlassDashboard() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Bar Chart Geometry Config
  const barChartWidth = 420;
  const barChartHeight = 220;
  const maxHours = 10;
  const activeBarWidth = 24;

  // Area Chart Geometry Config
  const areaChartWidth = 720;
  const areaChartHeight = 220;
  const maxIncome = 9000;

  return (
    <main className="min-h-screen w-full bg-slate-950 text-white flex relative overflow-hidden select-none font-sans">
      {/* --- Ambient Liquid Background Canvas --- */}
      {/* Glowing physical shape 1: Cyan bottom-left blob */}
      <motion.div
        animate={{
          x: [-40, 40, -40],
          y: [-20, 50, -20],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[150px] pointer-events-none z-0 will-change-transform"
      />

      {/* Glowing physical shape 2: Violet top-right blob */}
      <motion.div
        animate={{
          x: [40, -40, 40],
          y: [20, -50, 20],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/15 blur-[160px] pointer-events-none z-0 will-change-transform"
      />

      {/* Glowing physical shape 3: Emerald middle blob */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none z-0 will-change-transform"
      />

      {/* --- SIDEBAR PANEL (Collapsible with dynamic premium transitions) --- */}
      <motion.aside
        animate={{ width: sidebarExpanded ? 240 : 88 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="h-screen bg-white/5 border-r border-white/10 backdrop-blur-3xl flex flex-col justify-between py-8 px-4 z-20 relative select-none shadow-[inset_-1px_0_0_rgba(255,255,255,0.08)]"
      >
        <div>
          {/* Logo element */}
          <div className="flex items-center gap-3 px-3 mb-10 h-8 cursor-pointer select-none">
            <div className="w-8 h-8 rounded-[10px] bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <span className="font-bold text-[18px] text-white">L</span>
            </div>
            {sidebarExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-bold text-[17px] bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent tracking-tight"
              >
                Liquid Glass
              </motion.span>
            )}
          </div>

          {/* Navigation Items */}
          <div className="flex flex-col gap-2">
            {[
              { label: "Dashboard", icon: LayoutDashboard },
              { label: "Analytics", icon: TrendingUp },
              { label: "Schedules", icon: Clock },
              { label: "Settings", icon: Settings },
            ].map((item) => {
              const isActive = activeTab === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-[14px] transition-all duration-300 w-full relative group ${
                    isActive
                      ? "bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] border border-white/10"
                      : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <item.icon className={`w-[20px] h-[20px] shrink-0 transition-colors duration-300 ${isActive ? "text-cyan-400" : "text-neutral-400 group-hover:text-white"}`} strokeWidth={1.8} />
                  {sidebarExpanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[14px] font-medium tracking-tight"
                    >
                      {item.label}
                    </motion.span>
                  )}
                  {/* Subtle active glow accent line on left */}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      className="absolute left-0 w-[3px] h-6 bg-cyan-400 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer and Toggle Button */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            className="flex items-center justify-center w-full h-11 rounded-[14px] bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-neutral-400 hover:text-white transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
          >
            {sidebarExpanded ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.aside>

      {/* --- MAIN DASHBOARD BODY (MASONRY LAYOUT) --- */}
      <section className="flex-1 h-screen overflow-y-auto z-10 px-16 py-12 select-none relative scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {/* Upper Header Row */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-[32px] font-bold text-white tracking-tight leading-none">
              Overview
            </h1>
            <p className="text-[14px] text-neutral-400 font-medium tracking-tight mt-2.5">
              Welcome back, your dashboard state is completely healthy.
            </p>
          </div>

          {/* Quick Stats icons & Avatar floating items */}
          <div className="flex items-center gap-4">
            {/* Ambient Search Bar Frame */}
            <div className="relative w-[240px] flex items-center bg-white/5 border border-white/10 rounded-[14px] px-3.5 py-2.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-lg focus-within:border-cyan-400/50 focus-within:bg-white/10 transition-all duration-300">
              <Search className="w-4 h-4 text-neutral-400 mr-2 shrink-0" strokeWidth={2} />
              <input
                type="text"
                placeholder="Quick lookup..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-[13px] font-medium text-white placeholder-neutral-500 focus:outline-none w-full"
              />
            </div>

            <div className="w-[42px] h-[42px] rounded-[14px] bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] hover:bg-white/10 transition-colors cursor-pointer relative">
              <Bell className="w-4 h-4 text-neutral-300" strokeWidth={2} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            </div>

            <div className="w-[42px] h-[42px] rounded-[14px] bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center shadow-md shadow-cyan-500/10 cursor-pointer">
              <User className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Masonry-like 3-Column Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start w-full">
          {/* Column 1 (Left Area - Column span 8): Primary Charts & Metrics */}
          <div className="xl:col-span-8 flex flex-col gap-8 w-full">

            {/* Row of quick cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {/* Metric Card 1: Total Earnings */}
              <div className="bg-white/5 border border-white/10 rounded-[20px] p-5 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:-translate-y-1 hover:border-white/20 transition-all duration-300 flex flex-col justify-between h-[150px]">
                <div className="flex justify-between items-start">
                  <div className="w-9 h-9 rounded-[10px] bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-[12px] font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    +12% <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-neutral-400 tracking-tight">Total Income</p>
                  <h3 className="text-[24px] font-bold text-white tracking-tight mt-1">$48,250.00</h3>
                </div>
              </div>

              {/* Metric Card 2: Hours Tracked */}
              <div className="bg-white/5 border border-white/10 rounded-[20px] p-5 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:-translate-y-1 hover:border-white/20 transition-all duration-300 flex flex-col justify-between h-[150px]">
                <div className="flex justify-between items-start">
                  <div className="w-9 h-9 rounded-[10px] bg-purple-400/10 border border-purple-400/20 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-[12px] font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    +4.2% <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-neutral-400 tracking-tight">Hours Tracked</p>
                  <h3 className="text-[24px] font-bold text-white tracking-tight mt-1">44.1 Hours</h3>
                </div>
              </div>

              {/* Metric Card 3: Project Count */}
              <div className="bg-white/5 border border-white/10 rounded-[20px] p-5 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:-translate-y-1 hover:border-white/20 transition-all duration-300 flex flex-col justify-between h-[150px]">
                <div className="flex justify-between items-start">
                  <div className="w-9 h-9 rounded-[10px] bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-[12px] font-semibold text-neutral-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full flex items-center">
                    Active
                  </span>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-neutral-400 tracking-tight">Active Projects</p>
                  <h3 className="text-[24px] font-bold text-white tracking-tight mt-1">8 Projects</h3>
                </div>
              </div>
            </div>

            {/* Income Area Chart (Full width of left column) */}
            <div className="bg-white/5 border border-white/10 rounded-[24px] p-6 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-visible relative">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-[18px] font-bold text-white tracking-tight">Income Area Projection</h2>
                  <p className="text-[12px] text-neutral-400 font-medium tracking-tight mt-1">Annual earnings metrics updated monthly</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span className="text-[12px] font-semibold text-neutral-300">Earnings</span>
                </div>
              </div>

              {/* Area Chart SVG Canvas */}
              <div className="relative overflow-visible w-full h-[220px]">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox={`0 0 ${areaChartWidth} ${areaChartHeight}`}
                  preserveAspectRatio="none"
                >
                  <defs>
                    {/* Linear gradient mapping aqua to completely transparent */}
                    <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  {Array.from({ length: 4 }).map((_, i) => {
                    const lineY = (areaChartHeight / 4) * (i + 1);
                    return (
                      <line
                        key={i}
                        x1="0"
                        y1={lineY}
                        x2={areaChartWidth}
                        y2={lineY}
                        stroke="rgba(255, 255, 255, 0.05)"
                        strokeWidth="1.2"
                      />
                    );
                  })}

                  {/* SVG Area Filled Polygon */}
                  <polygon
                    points={`
                      0,${areaChartHeight}
                      ${monthlyIncome
                        .map((data, index) => {
                          const cx = (areaChartWidth / 11) * index;
                          const cy = areaChartHeight - (data.income / maxIncome) * areaChartHeight;
                          return `${cx},${cy}`;
                        })
                        .join(" ")}
                      ${areaChartWidth},${areaChartHeight}
                    `}
                    fill="url(#area-gradient)"
                  />

                  {/* SVG Stroke line path */}
                  <path
                    d={`
                      M 0,${areaChartHeight - (monthlyIncome[0].income / maxIncome) * areaChartHeight}
                      ${monthlyIncome
                        .slice(1)
                        .map((data, index) => {
                          const cx = (areaChartWidth / 11) * (index + 1);
                          const cy = areaChartHeight - (data.income / maxIncome) * areaChartHeight;
                          return `L ${cx},${cy}`;
                        })
                        .join(" ")}
                    `}
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Interactive node highlights on hover */}
                  {monthlyIncome.map((data, index) => {
                    const cx = (areaChartWidth / 11) * index;
                    const cy = areaChartHeight - (data.income / maxIncome) * areaChartHeight;
                    const isHovered = hoveredAreaIndex === index;

                    return (
                      <g key={index} className="cursor-pointer">
                        {/* Hidden fat hover capture bar */}
                        <rect
                          x={cx - 15}
                          y="0"
                          width="30"
                          height={areaChartHeight}
                          fill="transparent"
                          onMouseEnter={() => setHoveredAreaIndex(index)}
                          onMouseLeave={() => setHoveredAreaIndex(null)}
                        />
                        {/* Interactive circle bullet */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isHovered ? 6 : 4}
                          fill={isHovered ? "#ffffff" : "#22d3ee"}
                          stroke={isHovered ? "#22d3ee" : "rgba(255,255,255,0.2)"}
                          strokeWidth={isHovered ? 3.5 : 1.5}
                          className="transition-all duration-300"
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Floating mouse cursor-tracked tooltips matching the card glass token stack */}
                <AnimatePresence>
                  {hoveredAreaIndex !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.95 }}
                      className="absolute p-3 rounded-[12px] bg-white/10 backdrop-blur-2xl border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_12px_24px_rgba(0,0,0,0.3)] z-40 flex flex-col gap-1 text-left min-w-[100px] pointer-events-none select-none"
                      style={{
                        left: `${(hoveredAreaIndex / 11) * 92}%`,
                        bottom: `${((monthlyIncome[hoveredAreaIndex].income / maxIncome) * 100) + 12}%`,
                      }}
                    >
                      <span className="text-[11px] font-semibold text-neutral-400">
                        {monthlyIncome[hoveredAreaIndex].month}
                      </span>
                      <span className="text-[13px] font-bold text-white tracking-tight">
                        ${monthlyIncome[hoveredAreaIndex].income.toLocaleString()}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Chart axis months labels */}
              <div className="flex justify-between mt-3.5 px-1">
                {monthlyIncome.map((data, i) => (
                  <span key={i} className="text-[11px] font-semibold text-neutral-500 w-[24px] text-center">
                    {data.month}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Column 2 (Right Area - Column span 4): Hours Worked & Activity */}
          <div className="xl:col-span-4 flex flex-col gap-8 w-full">

            {/* Hours Worked Bar Chart Card */}
            <div className="bg-white/5 border border-white/10 rounded-[24px] p-6 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-visible relative">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-[18px] font-bold text-white tracking-tight">Hours Tracked</h2>
                  <p className="text-[12px] text-neutral-400 font-medium tracking-tight mt-1">Weekly timesheet analytics</p>
                </div>
                <div className="flex items-center gap-1.5 bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 px-3 py-1 rounded-full text-[11px] font-bold shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
                  Active
                </div>
              </div>

              {/* Hours Worked Bar Chart SVG */}
              <div className="relative overflow-visible w-full h-[220px]">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox={`0 0 ${barChartWidth} ${barChartHeight}`}
                  preserveAspectRatio="none"
                >
                  {/* Grid Lines */}
                  {Array.from({ length: 4 }).map((_, i) => {
                    const lineY = (barChartHeight / 4) * (i + 1);
                    return (
                      <line
                        key={i}
                        x1="0"
                        y1={lineY}
                        x2={barChartWidth}
                        y2={lineY}
                        stroke="rgba(255, 255, 255, 0.05)"
                        strokeWidth="1.2"
                      />
                    );
                  })}

                  {/* Vertical rounded top-end bars */}
                  {weeklyHours.map((data, index) => {
                    const totalBars = weeklyHours.length;
                    const spacing = barChartWidth / totalBars;
                    const bx = spacing * index + (spacing - activeBarWidth) / 2;
                    const barHeight = (data.hours / maxHours) * barChartHeight;
                    const by = barChartHeight - barHeight;
                    const isHovered = hoveredBarIndex === index;

                    return (
                      <g key={index} className="cursor-pointer">
                        {/* Ambient Shadow overlay behind bar on hover */}
                        {isHovered && (
                          <rect
                            x={bx - 4}
                            y={by - 4}
                            width={activeBarWidth + 8}
                            height={barHeight + 4}
                            rx={12}
                            fill="rgba(34,211,238,0.12)"
                            className="transition-all duration-300"
                          />
                        )}

                        {/* Solid Bar Element */}
                        <rect
                          x={bx}
                          y={by}
                          width={activeBarWidth}
                          height={barHeight}
                          rx={12}
                          fill={isHovered ? "url(#bar-hover-gradient)" : "url(#bar-normal-gradient)"}
                          className="transition-all duration-300"
                          onMouseEnter={() => setHoveredBarIndex(index)}
                          onMouseLeave={() => setHoveredBarIndex(null)}
                        />

                        {/* Top-cap highlight dot on bar */}
                        {isHovered && (
                          <circle
                            cx={bx + activeBarWidth / 2}
                            cy={by + 6}
                            r={3}
                            fill="#ffffff"
                          />
                        )}
                      </g>
                    );
                  })}

                  <defs>
                    <linearGradient id="bar-normal-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="bar-hover-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Glassmorphic tooltips for Hover states on Bars */}
                <AnimatePresence>
                  {hoveredBarIndex !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.95 }}
                      className="absolute p-3 rounded-[12px] bg-white/10 backdrop-blur-2xl border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_12px_24px_rgba(0,0,0,0.3)] z-40 flex flex-col gap-1 text-left min-w-[90px] pointer-events-none select-none"
                      style={{
                        left: `${(hoveredBarIndex / 6) * 78}%`,
                        bottom: `${((weeklyHours[hoveredBarIndex].hours / maxHours) * 100) + 12}%`,
                      }}
                    >
                      <span className="text-[11px] font-semibold text-neutral-400">
                        {weeklyHours[hoveredBarIndex].day}
                      </span>
                      <span className="text-[13px] font-bold text-white tracking-tight">
                        {weeklyHours[hoveredBarIndex].hours} Hours
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Chart axis days labels */}
              <div className="flex justify-between mt-3.5 px-3">
                {weeklyHours.map((data, i) => (
                  <span key={i} className="text-[11px] font-semibold text-neutral-500 w-[24px] text-center">
                    {data.day}
                  </span>
                ))}
              </div>
            </div>

            {/* Premium activity log card */}
            <div className="bg-white/5 border border-white/10 rounded-[24px] p-6 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex flex-col h-[230px] justify-between">
              <div>
                <h2 className="text-[18px] font-bold text-white tracking-tight">Recent Tasks</h2>
                <div className="flex flex-col gap-3 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                      <span className="text-[13px] font-semibold text-white">Liquid morph layout design</span>
                    </div>
                    <span className="text-[11px] font-semibold text-neutral-500">Done</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-400" />
                      <span className="text-[13px] font-semibold text-white">Glassmorphism color calibration</span>
                    </div>
                    <span className="text-[11px] font-semibold text-neutral-500">2h ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-[13px] font-semibold text-white">Hardware acceleration optimizations</span>
                    </div>
                    <span className="text-[11px] font-semibold text-cyan-400">In Progress</span>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-1.5 text-[12px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors w-max">
                <span>View timesheets</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
