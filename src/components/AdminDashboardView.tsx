import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Activity,
  BookOpen,
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { ResourceItem } from '../types';

interface AdminDashboardViewProps {
  resources: ResourceItem[];
  onDeleteResource: (id: string) => void;
  onAddResource: (res: any) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  resources,
  onDeleteResource,
}) => {
  const [selectedSection, setSelectedSection] = useState<'overview' | 'resources' | 'activity'>('overview');

  const stats = {
    totalStudents: 28420,
    activeStudents: 14210,
    totalResources: resources.length,
    actionPlansCompleted: 8940,
  };

  const studentActivities = [
    { student: 'Alex Rivera', action: 'Completed 14-day Data Structures sprint', time: '5 mins ago' },
    { student: 'Sarah Chen', action: 'Generated AI triage for Operating Systems', time: '18 mins ago' },
    { student: 'Marcus Johnson', action: 'Logged $12 campus expense in Food & Dining', time: '34 mins ago' },
    { student: 'Priya Patel', action: 'Mastered Red-Black Trees topic checklist', time: '1 hour ago' },
    { student: 'David Kim', action: 'Completed 4 Pomodoro focus blocks (100m)', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md">
            <ShieldAlert className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">Admin Control Hub</h1>
              <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                Staff Authorization
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Campus platform telemetry, active enrollments, and learning resource moderation.
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 p-1 text-xs font-bold">
          <button
            onClick={() => setSelectedSection('overview')}
            className={`rounded-xl px-3 py-1.5 transition-all ${
              selectedSection === 'overview' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
            }`}
          >
            Metrics
          </button>
          <button
            onClick={() => setSelectedSection('resources')}
            className={`rounded-xl px-3 py-1.5 transition-all ${
              selectedSection === 'resources' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
            }`}
          >
            Moderate Resources ({resources.length})
          </button>
          <button
            onClick={() => setSelectedSection('activity')}
            className={`rounded-xl px-3 py-1.5 transition-all ${
              selectedSection === 'activity' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
            }`}
          >
            Live Activity Feed
          </button>
        </div>
      </div>

      {/* 4 Admin KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Total Registered Students</span>
            <Users className="h-4 w-4 text-indigo-600" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">
            {stats.totalStudents.toLocaleString()}
          </p>
          <span className="text-[11px] text-emerald-600 font-bold">+840 this week</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Active Today</span>
            <Activity className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="mt-2 text-2xl font-black text-emerald-600">
            {stats.activeStudents.toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-400 font-medium">50.0% concurrency</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Action Plans Completed</span>
            <Sparkles className="h-4 w-4 text-purple-600" />
          </div>
          <p className="mt-2 text-2xl font-black text-purple-600">
            {stats.actionPlansCompleted.toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-400 font-medium">92% success rate</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Verified Resources</span>
            <BookOpen className="h-4 w-4 text-amber-600" />
          </div>
          <p className="mt-2 text-2xl font-black text-amber-600">
            {resources.length}
          </p>
          <span className="text-[11px] text-emerald-600 font-bold">10 categories</span>
        </div>
      </div>

      {/* Conditional Section 1: Overview & System Health */}
      {selectedSection === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Backend & Cloud Health</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                <span className="font-semibold text-slate-700">Django REST Framework API</span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-bold text-emerald-800">
                  Healthy (99.98%)
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                <span className="font-semibold text-slate-700">Gemini 3.8 Flash AI Engine</span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-bold text-emerald-800">
                  Operational (180ms latency)
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                <span className="font-semibold text-slate-700">PostgreSQL / SQLite Storage</span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-bold text-emerald-800">
                  Synced (2.4 GB)
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Top Requested Problem Scenarios</h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between rounded-xl bg-indigo-50/60 p-3 text-indigo-950">
                <span className="font-medium">"Three assignments due next week + upcoming exam"</span>
                <span className="font-bold">42% of queries</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-slate-700">
                <span className="font-medium">"Failing Data Structures / Algorithms midterm"</span>
                <span className="font-bold">28% of queries</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-slate-700">
                <span className="font-medium">"Budget deficit on off-campus rent & meal plans"</span>
                <span className="font-bold">19% of queries</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conditional Section 2: Manage Resources */}
      {selectedSection === 'resources' && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">Learning Repository Management</h3>
            <span className="text-xs text-slate-500">{resources.length} active verified entries</span>
          </div>

          <div className="space-y-2">
            {resources.map((res) => (
              <div
                key={res.id}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{res.title}</span>
                    <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-700">
                      {res.category}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-0.5 truncate max-w-md">
                    {res.url}
                  </span>
                </div>

                <button
                  onClick={() => onDeleteResource(res.id)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                  title="Remove resource"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conditional Section 3: Live Activity */}
      {selectedSection === 'activity' && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Real-Time Student Activity Stream</h3>
          <div className="space-y-3">
            {studentActivities.map((act, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-3.5 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs">
                    {act.student.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">{act.student}</span>
                    <p className="text-slate-600 text-[11px] mt-0.5">{act.action}</p>
                  </div>
                </div>
                <span className="text-slate-400 text-[11px]">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
