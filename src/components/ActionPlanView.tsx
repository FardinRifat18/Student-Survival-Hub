import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  RotateCcw,
  Calendar,
  Layers,
  Award,
  ChevronDown,
  ChevronUp,
  Plus,
  Loader2,
} from 'lucide-react';
import { ActionPlan, ActionPlanDay, Priority } from '../types';

interface ActionPlanViewProps {
  actionPlan: ActionPlan;
  onUpdatePlan: (updatedPlan: ActionPlan) => void;
}

export const ActionPlanView: React.FC<ActionPlanViewProps> = ({
  actionPlan,
  onUpdatePlan,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGeneratorForm, setShowGeneratorForm] = useState(false);

  // Form State
  const [goalInput, setGoalInput] = useState(actionPlan.goal);
  const [subjectsInput, setSubjectsInput] = useState(actionPlan.subjects.join(', '));
  const [hoursPerDay, setHoursPerDay] = useState(actionPlan.hoursPerDay);
  const [daysCount, setDaysCount] = useState(14);
  const [skillLevel, setSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>(actionPlan.skillLevel);
  const [preferredTime, setPreferredTime] = useState<'Morning' | 'Afternoon' | 'Evening' | 'Night'>('Morning');
  const [freeDays, setFreeDays] = useState('Sunday');

  // Toggle task completion
  const handleToggleTask = (dayIndex: number, taskId: string) => {
    const newDays = [...actionPlan.days];
    const targetDay = { ...newDays[dayIndex] };
    targetDay.tasks = targetDay.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    newDays[dayIndex] = targetDay;

    onUpdatePlan({
      ...actionPlan,
      days: newDays,
    });
  };

  // Generate new plan via AI Endpoint
  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    const subjectsArray = subjectsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const res = await fetch('/api/ai/generate-action-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal: goalInput,
          subjects: subjectsArray,
          hoursPerDay: hoursPerDay,
          daysCount: daysCount,
          skillLevel: skillLevel,
          preferredTime: preferredTime,
        }),
      });

      if (!res.ok) throw new Error('Failed to generate action plan');
      const data = await res.json();

      onUpdatePlan({
        ...actionPlan,
        goal: data.goal || goalInput,
        subjects: subjectsArray,
        hoursPerDay,
        skillLevel,
        preferredTime,
        days: data.days || actionPlan.days,
      });

      setShowGeneratorForm(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Compute total tasks and progress
  const allTasks = actionPlan.days.flatMap((d) => d.tasks);
  const completedTasksCount = allTasks.filter((t) => t.completed).length;
  const totalTasksCount = allTasks.length;
  const planProgress = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Study Engine</span>
          </div>
          <h1 className="mt-1 text-2xl font-black text-slate-900">
            Personalized Student Action Plan
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Current Goal: <span className="font-bold text-indigo-900">{actionPlan.goal}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowGeneratorForm(!showGeneratorForm)}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all"
          >
            <RotateCcw className="h-4 w-4" />
            <span>{showGeneratorForm ? 'Cancel Form' : 'Regenerate / Modify Plan'}</span>
          </button>
        </div>
      </div>

      {/* Progress & Overview Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Plan Progress</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">{planProgress}%</span>
            <span className="text-xs font-bold text-indigo-600">
              {completedTasksCount} / {totalTasksCount} tasks
            </span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all"
              style={{ width: `${planProgress}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Daily Study Allocation</span>
          <p className="mt-1 text-2xl font-black text-indigo-600">{actionPlan.hoursPerDay}h / Day</p>
          <span className="text-xs text-slate-500 font-medium">
            Preferred Time: {actionPlan.preferredTime}
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Subjects Covered</span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {actionPlan.subjects.map((sub, i) => (
              <span
                key={i}
                className="rounded-lg bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700"
              >
                {sub}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Generator / Modify Form Modal/Drawer */}
      {showGeneratorForm && (
        <form
          onSubmit={handleGeneratePlan}
          className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-b from-indigo-50/50 to-white p-6 shadow-md space-y-4 animate-in fade-in"
        >
          <div className="border-b border-indigo-100 pb-3">
            <h3 className="font-black text-lg text-slate-900">
              Customize Your Study Action Plan
            </h3>
            <p className="text-xs text-slate-500">
              Tell the system your exams, hours, and goals to generate an optimized day-by-day roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Main Academic Goal
              </label>
              <input
                type="text"
                required
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                placeholder="e.g. Prepare for CSE final exam in 14 days"
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs sm:text-sm font-medium focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Subjects (Comma-separated)
              </label>
              <input
                type="text"
                required
                value={subjectsInput}
                onChange={(e) => setSubjectsInput(e.target.value)}
                placeholder="Data Structures, Algorithms, Database Systems"
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs sm:text-sm font-medium focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Available Study Hours per Day
              </label>
              <select
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs sm:text-sm font-medium focus:border-indigo-500 focus:outline-none"
              >
                <option value={2}>2 Hours / Day</option>
                <option value={3}>3 Hours / Day</option>
                <option value={4}>4 Hours / Day</option>
                <option value={5}>5 Hours / Day</option>
                <option value={6}>6+ Hours (Intensive Sprint)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Target Days Duration
              </label>
              <select
                value={daysCount}
                onChange={(e) => setDaysCount(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs sm:text-sm font-medium focus:border-indigo-500 focus:outline-none"
              >
                <option value={7}>7-Day Rapid Sprint</option>
                <option value={14}>14-Day Comprehensive Preparation</option>
                <option value={21}>21-Day Mastery Program</option>
                <option value={30}>30-Day Semester Booster</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Current Skill Level
              </label>
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value as any)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs sm:text-sm font-medium focus:border-indigo-500 focus:outline-none"
              >
                <option value="Beginner">Beginner (Need fundamental explanations)</option>
                <option value="Intermediate">Intermediate (Focus on practice & problem solving)</option>
                <option value="Advanced">Advanced (High-yield past papers & edge cases)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Preferred Study Time
              </label>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value as any)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs sm:text-sm font-medium focus:border-indigo-500 focus:outline-none"
              >
                <option value="Morning">Morning (08:00 - 12:00)</option>
                <option value="Afternoon">Afternoon (13:00 - 17:00)</option>
                <option value="Evening">Evening (18:00 - 22:00)</option>
                <option value="Night">Night Owl (22:00 - 02:00)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowGeneratorForm(false)}
              className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isGenerating}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Synthesizing Plan...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generate AI Action Plan</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Day-by-Day Interactive Roadmap */}
      <div className="space-y-4">
        {actionPlan.days.map((day, dayIdx) => {
          const dayCompleted = day.tasks.every((t) => t.completed);
          const dayCompletedCount = day.tasks.filter((t) => t.completed).length;

          return (
            <div
              key={day.dayNumber}
              className={`rounded-3xl border transition-all ${
                dayCompleted
                  ? 'border-emerald-200 bg-emerald-50/40'
                  : 'border-slate-200 bg-white shadow-xs'
              } p-6`}
            >
              {/* Day Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black ${
                      dayCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    {day.dayNumber}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                      {day.date} — {day.focusTitle}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">
                    {dayCompletedCount}/{day.tasks.length} Completed
                  </span>
                  {dayCompleted && (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                      Done ✅
                    </span>
                  )}
                </div>
              </div>

              {/* Tasks in this Day */}
              <div className="mt-4 space-y-2.5">
                {day.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between rounded-2xl border p-3.5 transition-all ${
                      task.completed
                        ? 'border-slate-100 bg-slate-50 text-slate-400'
                        : 'border-slate-200 bg-white hover:border-indigo-300 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggleTask(dayIdx, task.id)}
                        className={`flex h-5 w-5 items-center justify-center rounded-lg border transition-colors ${
                          task.completed
                            ? 'border-emerald-500 bg-emerald-500 text-white'
                            : 'border-slate-300 hover:border-indigo-500'
                        }`}
                      >
                        {task.completed && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </button>
                      <div>
                        <span
                          className={`text-xs sm:text-sm font-semibold ${
                            task.completed ? 'line-through text-slate-400' : 'text-slate-900'
                          }`}
                        >
                          {task.title}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] text-slate-500 font-medium">
                            {task.subject}
                          </span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                            <Clock className="h-3 w-3" />
                            {task.durationHours} hours
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          task.priority === 'urgent'
                            ? 'bg-rose-100 text-rose-800'
                            : task.priority === 'high'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
