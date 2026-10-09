import React, { useState } from 'react';
import { SessionResult, Difficulty } from '../types';
import { DIFFICULTY_CONFIGS } from '../data/difficulties';

interface AccuracyChartProps {
  results: SessionResult[];
}

export const AccuracyChart: React.FC<AccuracyChartProps> = ({ results }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');

  // Filter and pick the last 10 results
  const filtered = selectedDifficulty === 'all'
    ? results
    : results.filter(r => r.difficulty === selectedDifficulty);

  // Take the most recent 10 results, ordered chronologically (oldest to newest)
  const last10 = filtered.slice(-10);

  // Chart dimensions
  const svgWidth = 680;
  const svgHeight = 220;
  const paddingLeft = 46;
  const paddingRight = 28;
  const paddingTop = 26;
  const paddingBottom = 40;

  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;

  const points = last10.map((item, index) => {
    const x = last10.length > 1
      ? paddingLeft + (index / (last10.length - 1)) * chartWidth
      : paddingLeft + chartWidth / 2;
    const y = paddingTop + chartHeight - (item.accuracyRate / 100) * chartHeight;
    return { x, y, item, index };
  });

  const [hoveredPoint, setHoveredPoint] = useState<typeof points[0] | null>(null);

  // Calculate average
  const avgAccuracy = last10.length > 0
    ? Math.round(last10.reduce((sum, r) => sum + r.accuracyRate, 0) / last10.length)
    : 0;

  // Path string for the line
  const linePath = points.length > 1
    ? points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '')
    : points.length === 1
    ? `M ${paddingLeft} ${points[0].y} L ${svgWidth - paddingRight} ${points[0].y}`
    : '';

  // Area under curve path
  const areaPath = points.length > 1
    ? `${linePath} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`
    : points.length === 1
    ? `M ${paddingLeft} ${points[0].y} L ${svgWidth - paddingRight} ${points[0].y} L ${svgWidth - paddingRight} ${paddingTop + chartHeight} L ${paddingLeft} ${paddingTop + chartHeight} Z`
    : '';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              過去10回の正答率推移
            </h3>
            {last10.length > 0 && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                平均: {avgAccuracy}% ({last10.length}回実施)
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {last10.length > 0
              ? `直近${last10.length}回分の正答率（％）推移グラフ`
              : '演習を実施すると、ここにアカウントごとの正答率推移が記録されます'}
          </p>
        </div>

        {/* Difficulty Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-medium self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setSelectedDifficulty('all')}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              selectedDifficulty === 'all'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            すべて
          </button>
          {(['easy', 'normal', 'hard', 'master'] as Difficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDifficulty(d)}
              className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                selectedDifficulty === d
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {DIFFICULTY_CONFIGS[d].label}
            </button>
          ))}
        </div>
      </div>

      {last10.length === 0 ? (
        <div className="h-48 flex items-center justify-center text-slate-400 text-sm">
          この難易度の演習データはまだありません
        </div>
      ) : (
        <div className="relative mt-3">
          <div className="w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto min-w-[500px] select-none"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines & Y-axis labels */}
              {[0, 25, 50, 75, 100].map((val) => {
                const y = paddingTop + chartHeight - (val / 100) * chartHeight;
                return (
                  <g key={val}>
                    <line
                      x1={paddingLeft}
                      y1={y}
                      x2={svgWidth - paddingRight}
                      y2={y}
                      stroke="currentColor"
                      className="text-slate-100 dark:text-slate-800"
                      strokeDasharray={val === 0 || val === 100 ? '0' : '4 4'}
                    />
                    <text
                      x={paddingLeft - 8}
                      y={y + 3}
                      textAnchor="end"
                      className="text-[10px] fill-slate-400 font-medium"
                    >
                      {val}%
                    </text>
                  </g>
                );
              })}

              {/* Area fill */}
              {areaPath && (
                <path d={areaPath} fill="url(#chartGradient)" />
              )}

              {/* Line */}
              {linePath && (
                <path
                  d={linePath}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Data Points */}
              {points.map((p) => {
                const isHovered = hoveredPoint?.item.id === p.item.id;
                const isPerfect = p.item.accuracyRate === 100;
                return (
                  <g
                    key={p.item.id}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint(p)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isHovered ? 6 : 4.5}
                      fill={isPerfect ? '#10b981' : '#6366f1'}
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="transition-all duration-150"
                    />

                    {/* X-axis Label */}
                    <text
                      x={p.x}
                      y={paddingTop + chartHeight + 18}
                      textAnchor="middle"
                      className="text-[10px] fill-slate-400"
                    >
                      第{p.index + 1}回
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Interactive Tooltip Card */}
          {hoveredPoint && (
            <div
              className="absolute pointer-events-none z-10 bg-slate-900 text-white rounded-lg p-2.5 text-xs shadow-xl -translate-x-1/2 -translate-y-full border border-slate-700"
              style={{
                left: `${(hoveredPoint.x / svgWidth) * 100}%`,
                top: `${(hoveredPoint.y / svgHeight) * 100 - 8}%`,
              }}
            >
              <div className="font-bold flex items-center justify-between gap-3">
                <span>{hoveredPoint.item.passageTitle}</span>
                <span className="text-emerald-400 font-extrabold">{hoveredPoint.item.accuracyRate}%</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-1 flex items-center gap-2">
                <span>難易度: {DIFFICULTY_CONFIGS[hoveredPoint.item.difficulty].label}</span>
                <span>·</span>
                <span>正解: {hoveredPoint.item.score} / 5問</span>
                <span>·</span>
                <span>{hoveredPoint.item.dateStr}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
