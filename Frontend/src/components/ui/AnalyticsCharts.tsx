'use client';

import React, { useState } from 'react';
import { TrendingUp, BarChart3, PieChart as PieIcon } from 'lucide-react';

interface AreaChartProps {
  darkMode?: boolean;
  title: string;
  subtitle: string;
  data: { label: string; value1: number; value2: number }[];
  series1Label: string;
  series2Label: string;
}

export function AnalyticsAreaChart({
  darkMode = false,
  title,
  subtitle,
  data,
  series1Label,
  series2Label,
}: AreaChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Auto-scale Y-axis to exact max data value (minimum 1 to prevent division by zero)
  const rawMax = Math.max(...data.map(d => Math.max(d.value1, d.value2)), 0);
  const maxValue = rawMax === 0 ? 1 : rawMax;

  const chartHeight = 190;
  const chartWidth = 500;
  const paddingLeft = 35;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 25;

  const innerWidth = chartWidth - paddingLeft - paddingRight;
  const innerHeight = chartHeight - paddingTop - paddingBottom;

  const getPoints = (key: 'value1' | 'value2') => {
    return data.map((d, i) => {
      const x = paddingLeft + (i / (data.length - 1)) * innerWidth;
      const y = paddingTop + innerHeight - (d[key] / maxValue) * innerHeight;
      return `${x},${y}`;
    }).join(' ');
  };

  const points1 = getPoints('value1');
  const points2 = getPoints('value2');

  const baselineY = paddingTop + innerHeight;
  const areaPoints1 = `${paddingLeft},${baselineY} ${points1} ${chartWidth - paddingRight},${baselineY}`;
  const areaPoints2 = `${paddingLeft},${baselineY} ${points2} ${chartWidth - paddingRight},${baselineY}`;

  return (
    <div className={`p-6 rounded-3xl border shadow-xl flex flex-col justify-between h-full transition-all ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-red-500/10 text-red-500">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold font-serif">{title}</h3>
            <p className="text-xs text-slate-400">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 shadow-xs" />
            <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>{series1Label}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-500 shadow-xs" />
            <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>{series2Label}</span>
          </div>
        </div>
      </div>

      <div className="relative w-full flex-1 flex items-center justify-center pt-2">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="gradRed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines and Y-axis labels */}
          {[
            { ratio: 1, val: maxValue },
            { ratio: 0.5, val: Math.round(maxValue / 2) },
            { ratio: 0, val: 0 },
          ].map((tick, i) => {
            const y = paddingTop + (1 - tick.ratio) * innerHeight;
            return (
              <g key={i}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={chartWidth - paddingRight}
                  y2={y}
                  stroke={darkMode ? '#334155' : '#f1f5f9'}
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3}
                  textAnchor="end"
                  fill={darkMode ? '#64748b' : '#94a3b8'}
                  fontSize="10"
                  fontWeight="bold"
                >
                  {tick.val}
                </text>
              </g>
            );
          })}

          {/* Area Fills */}
          <polygon points={areaPoints1} fill="url(#gradRed)" />
          <polygon points={areaPoints2} fill="url(#gradBlue)" />

          {/* Lines */}
          <polyline points={points2} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points={points1} fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Interactive Data Points & Labels */}
          {data.map((d, i) => {
            const x = paddingLeft + (i / (data.length - 1)) * innerWidth;
            const y1 = paddingTop + innerHeight - (d.value1 / maxValue) * innerHeight;
            const y2 = paddingTop + innerHeight - (d.value2 / maxValue) * innerHeight;
            const isHovered = hoveredIdx === i;

            return (
              <g key={i} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)} className="cursor-pointer">
                {isHovered && (
                  <line x1={x} y1={paddingTop} x2={x} y2={baselineY} stroke={darkMode ? '#94a3b8' : '#cbd5e1'} strokeWidth="1" strokeDasharray="2 2" />
                )}
                <circle cx={x} cy={y1} r={isHovered ? 7 : 4.5} fill="#ef4444" stroke={darkMode ? '#0f172a' : '#ffffff'} strokeWidth="2" className="transition-all duration-200" />
                <circle cx={x} cy={y2} r={isHovered ? 7 : 4.5} fill="#3b82f6" stroke={darkMode ? '#0f172a' : '#ffffff'} strokeWidth="2" className="transition-all duration-200" />

                {/* X Axis Month Labels */}
                <text x={x} y={chartHeight - 4} textAnchor="middle" fill={darkMode ? '#94a3b8' : '#64748b'} fontSize="11" fontWeight="bold">
                  {d.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredIdx !== null && (
          <div className={`absolute top-2 right-4 px-3 py-2 rounded-xl text-xs shadow-lg border backdrop-blur-md animate-in fade-in duration-150 ${darkMode ? 'bg-slate-800/95 border-slate-700 text-white' : 'bg-white/95 border-slate-200 text-slate-900'}`}>
            <p className="font-extrabold text-[11px] text-red-500 mb-1">{data[hoveredIdx].label} Metrics</p>
            <div className="flex items-center gap-3">
              <span className="text-red-500 font-bold">{series1Label}: {data[hoveredIdx].value1}</span>
              <span className="text-blue-500 font-bold">{series2Label}: {data[hoveredIdx].value2}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface BarChartProps {
  darkMode?: boolean;
  title: string;
  subtitle: string;
  data: { label: string; value: number; color: string }[];
}

export function AnalyticsBarChart({ darkMode = false, title, subtitle, data }: BarChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const totalCount = data.reduce((acc, d) => acc + d.value, 0);

  return (
    <div className={`p-6 rounded-3xl border shadow-xl flex flex-col justify-between h-full transition-all ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
      <div className="flex items-center gap-2.5 pb-4 mb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="p-2 rounded-xl bg-violet-500/10 text-violet-500">
          <BarChart3 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-extrabold font-serif">{title}</h3>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
      </div>

      <div className="space-y-3 pt-1 flex-1 flex flex-col justify-center">
        {data.map((item, idx) => {
          const pct = totalCount > 0 && item.value > 0 ? Math.round((item.value / totalCount) * 100) : 0;
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={item.label}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`p-2.5 rounded-2xl transition-all cursor-pointer ${isHovered ? (darkMode ? 'bg-slate-800/80' : 'bg-slate-100/80') : ''}`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className={darkMode ? 'text-slate-200' : 'text-slate-800'}>{item.label}</span>
                <span className="font-extrabold font-mono" style={{ color: item.value > 0 ? item.color : '#94a3b8' }}>
                  {item.value} ({pct}%)
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800/80 overflow-hidden p-0.5 border border-slate-200/60 dark:border-slate-700/60">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: item.value > 0 ? item.color : 'transparent',
                    boxShadow: item.value > 0 ? `0 0 8px ${item.color}50` : 'none',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface DonutChartProps {
  darkMode?: boolean;
  title: string;
  subtitle: string;
  items: { label: string; count: number; color: string }[];
}

export function AnalyticsDonutChart({ darkMode = false, title, subtitle, items }: DonutChartProps) {
  const total = items.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className={`p-6 rounded-3xl border shadow-xl flex flex-col justify-between h-full transition-all ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
      <div className="flex items-center gap-2.5 pb-4 mb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
          <PieIcon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-extrabold font-serif">{title}</h3>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center flex-1 py-2">
        <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={darkMode ? '#1e293b' : '#f1f5f9'}
              strokeWidth="3.8"
            />
            {total > 0 && items.map((item, idx) => {
              let cumulativePct = 0;
              for (let i = 0; i < idx; i++) {
                cumulativePct += (items[i].count / total) * 100;
              }
              const itemPct = (item.count / total) * 100;
              if (itemPct === 0) return null;
              const strokeDasharray = `${itemPct} ${100 - itemPct}`;
              const strokeDashoffset = -cumulativePct;

              return (
                <circle
                  key={item.label}
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke={item.color}
                  strokeWidth="4"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-700"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-black font-serif">{total}</span>
            <span className="text-[10px] uppercase font-bold text-slate-400">Total</span>
          </div>
        </div>

        <div className="space-y-2.5">
          {items.map((item) => {
            const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
            return (
              <div key={item.label} className="flex items-center justify-between text-xs font-bold p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className={`truncate ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{item.label}</span>
                </div>
                <span className="font-extrabold ml-2">{item.count} <span className="text-[10px] text-slate-400 font-normal">({pct}%)</span></span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
