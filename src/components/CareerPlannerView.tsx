import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Briefcase,
  Code2,
  FolderGit2,
  FileCheck,
  GraduationCap,
  Sparkles,
  ChevronRight,
  DollarSign,
} from 'lucide-react';
import { CareerRoadmap, CareerMilestone } from '../types';

interface CareerPlannerViewProps {
  roadmaps: CareerRoadmap[];
  onToggleMilestone: (roadmapId: string, milestoneId: string) => void;
}

export const CareerPlannerView: React.FC<CareerPlannerViewProps> = ({
  roadmaps,
  onToggleMilestone,
}) => {
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string>(roadmaps[0]?.id || '');
  const activeRoadmap = roadmaps.find((r) => r.id === selectedRoadmapId) || roadmaps[0];

  const completedMilestones = activeRoadmap?.milestones.filter((m) => m.completed).length || 0;
  const totalMilestones = activeRoadmap?.milestones.length || 1;
  const progressPercent = Math.round((completedMilestones / totalMilestones) * 100);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Career & Skill Roadmaps</h1>
          <p className="mt-1 text-sm text-slate-600">
            Step-by-step tracks with required skill stacks, portfolio projects, and internship benchmarks.
          </p>
        </div>

        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
          5 Industry Pathways
        </span>
      </div>

      {/* Career Path Switcher Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {roadmaps.map((r) => {
          const isSelected = activeRoadmap?.id === r.id;
          const completedCount = r.milestones.filter((m) => m.completed).length;
          const pct = Math.round((completedCount / r.milestones.length) * 100);

          return (
            <button
              key={r.id}
              onClick={() => setSelectedRoadmapId(r.id)}
              className={`rounded-2xl border p-3.5 text-left transition-all ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-1 ring-indigo-600'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <span className="text-xs font-bold text-slate-900 block truncate">
                {r.title || r.role}
              </span>
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                <span>{pct}% ready</span>
                <span className="font-semibold text-indigo-600">
                  {completedCount}/{r.milestones.length}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-1.5 rounded-full bg-indigo-600"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {activeRoadmap && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Milestone Roadmap */}
          <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Career Pathway
                </span>
                <h2 className="text-xl font-black text-slate-900">{activeRoadmap.title || activeRoadmap.role}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{activeRoadmap.description}</p>
              </div>

              <div className="rounded-2xl bg-emerald-50 px-3.5 py-2 text-right">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block">
                  Average Graduate Compensation
                </span>
                <span className="text-sm font-black text-emerald-800">
                  {activeRoadmap.averageSalary || activeRoadmap.avgSalary || '$95,000 - $140,000 / yr'}
                </span>
              </div>
            </div>

            {/* Step by Step Milestones */}
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Structured Milestones & Checkpoints
              </span>

              {activeRoadmap.milestones.map((m, idx) => (
                <div
                  key={m.id}
                  className={`flex items-start gap-3.5 rounded-2xl border p-4 transition-all ${
                    m.completed
                      ? 'border-emerald-200 bg-emerald-50/40'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-white'
                  }`}
                >
                  <button
                    onClick={() => onToggleMilestone(activeRoadmap.id, m.id)}
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                      m.completed
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-slate-300 hover:border-indigo-600 bg-white'
                    }`}
                  >
                    {m.completed && <CheckCircle2 className="h-4 w-4" />}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400">Step {idx + 1}:</span>
                      <h4
                        className={`text-sm font-bold ${
                          m.completed ? 'line-through text-slate-400' : 'text-slate-900'
                        }`}
                      >
                        {m.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {m.description}
                    </p>
                    {m.skills && m.skills.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {m.skills.map((s, i) => (
                          <span
                            key={i}
                            className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-700 shadow-2xs"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Recommended Projects & Resume Checklist */}
          <div className="space-y-6">
            {/* Recommended Portfolio Projects */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <FolderGit2 className="h-4 w-4 text-indigo-600" />
                <span>Must-Have Portfolio Projects</span>
              </div>

              <div className="space-y-2.5">
                {(activeRoadmap.recommendedProjects || [
                  {
                    title: 'Full-Stack Student Management System',
                    description: 'REST API, database normalization, auth, responsive React frontend.',
                    techStack: 'Python, Django, React, PostgreSQL',
                  },
                  {
                    title: 'Real-time Algorithm Visualizer',
                    description: 'Interactive tree and graph traversal simulations with step-by-step playback.',
                    techStack: 'TypeScript, Canvas, Tailwind CSS',
                  },
                ]).map((p, i) => (
                  <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-xs">
                    <span className="font-bold text-slate-900 block">{p.title}</span>
                    <p className="mt-0.5 text-slate-500 text-[11px] leading-relaxed">
                      {p.description}
                    </p>
                    <span className="mt-1 inline-block text-[10px] font-bold text-indigo-600">
                      Tech: {p.techStack}
                    </span>
                  </div>
                ))}
              </div>
            </div>


            {/* Resume Checklist */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <FileCheck className="h-4 w-4 text-emerald-600" />
                <span>Internship Resume Checklist</span>
              </div>

              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Quantified bullet points (e.g. "reduced latency by 40%")</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>GitHub profile with clean READMEs & live demo links</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>ATS-optimized single page PDF template</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>3+ relevant coursework / academic capstone projects</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
