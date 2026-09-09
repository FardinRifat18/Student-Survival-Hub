import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles,
  Zap,
  Award,
  Wallet,
} from 'lucide-react';

interface AnalyticsViewProps {
  totalStudyHours?: number;
  taskCompletionRate?: number;
  avgFocusTime?: number;
  mostProductiveDay?: string;
  mostProductiveTime?: string;
  currentGpa?: number;
  targetGpa?: number;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  totalStudyHours = 38.5,
  taskCompletionRate = 84,
  avgFocusTime = 42,
  mostProductiveDay = 'Tuesday',
  mostProductiveTime = '09:00 AM - 11:30 AM',
  currentGpa = 3.82,
  targetGpa = 3.9,
}) => {
  // Weekly hours dataset
  const weeklyData = [
    { day: 'Mon', hours: 5.5, tasks: 6 },
    { day: 'Tue', hours: 7.2, tasks: 8 },
    { day: 'Wed', hours: 6.0, tasks: 5 },
    { day: 'Thu', hours: 6.8, tasks: 7 },
    { day: 'Fri', hours: 5.0, tasks: 4 },
    { day: 'Sat', hours: 4.5, tasks: 3 },
    { day: 'Sun', hours: 3.5, tasks: 2 },
  ];

  const maxHours = Math.max(...weeklyData.map((d) => d.hours));

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Academic Analytics & Insights</h1>
          <p className="mt-1 text-sm text-slate-600">
            Neuro-chronological study habits, GPA trajectory, and weekly performance trends.
          </p>
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
          ● Live Telemetry
        </span>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Total Study Hours</span>
          <p className="mt-2 text-2xl font-black text-indigo-600">{totalStudyHours}h</p>
          <span className="text-[11px] text-emerald-600 font-bold">+12% vs last week</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Task Completion Rate</span>
          <p className="mt-2 text-2xl font-black text-emerald-600">{taskCompletionRate}%</p>
          <span className="text-[11px] text-slate-400 font-medium">Top 5% student benchmark</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Avg Focus Session</span>
          <p className="mt-2 text-2xl font-black text-slate-900">{avgFocusTime} mins</p>
          <span className="text-[11px] text-slate-400 font-medium">Optimal flow state</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Current / Target GPA</span>
          <p className="mt-2 text-2xl font-black text-amber-600">
            {currentGpa} <span className="text-sm font-bold text-slate-400">/ {targetGpa}</span>
          </p>
          <span className="text-[11px] text-emerald-600 font-bold">Summa Cum Laude Track</span>
        </div>
      </div>

      {/* 2-Column Analytical Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Weekly Study Bar Chart */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Weekly Study Volume (Hours per Day)
              </h2>
              <p className="text-xs text-slate-500">
                Peak study output observed on Tuesdays and Thursdays.
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
              38.5 Hours Total
            </span>
          </div>

          {/* Pure Tailwind CSS Bar Chart */}
          <div className="pt-4">
            <div className="flex items-end justify-between gap-2 h-56 pt-4">
              {weeklyData.map((d) => {
                const heightPct = Math.round((d.hours / maxHours) * 100);
                const isPeak = d.day === 'Tue';
                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-[11px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      {d.hours}h
                    </span>
                    <div className="w-full max-w-[42px] bg-slate-100 rounded-xl h-full flex items-end overflow-hidden p-1">
                      <div
                        className={`w-full rounded-lg transition-all duration-500 ${
                          isPeak
                            ? 'bg-gradient-to-t from-indigo-700 to-indigo-500'
                            : 'bg-gradient-to-t from-slate-400 to-slate-300 group-hover:from-indigo-400 group-hover:to-indigo-300'
                        }`}
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className={`text-xs font-bold ${isPeak ? 'text-indigo-600 font-black' : 'text-slate-500'}`}>
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Neuro-chronological Habits */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Peak Productivity Habits</h3>

            <div className="rounded-2xl bg-indigo-50/70 p-4 space-y-2 border border-indigo-100">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
                <Zap className="h-4 w-4 text-amber-500" />
                <span>Most Productive Day</span>
              </div>
              <p className="text-base font-black text-indigo-950">{mostProductiveDay}</p>
              <p className="text-[11px] text-slate-600">
                You complete 35% more LeetCode and theory questions on Tuesday mornings.
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50/70 p-4 space-y-2 border border-emerald-100">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                <Clock className="h-4 w-4 text-emerald-600" />
                <span>Prime Focus Window</span>
              </div>
              <p className="text-base font-black text-emerald-950">{mostProductiveTime}</p>
              <p className="text-[11px] text-slate-600">
                Your uninterrupted deep-work sprints last 2.4x longer before 12:00 PM.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Semester Target Projection
              </span>
              <span className="text-xs font-bold text-slate-800">
                Predicted GPA at current pace: 3.88 / 4.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
