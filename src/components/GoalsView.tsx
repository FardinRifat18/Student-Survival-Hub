import React, { useState } from 'react';
import {
  Target,
  Plus,
  CheckCircle2,
  Calendar,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { StudentGoal } from '../types';

interface GoalsViewProps {
  goals: StudentGoal[];
  onToggleTask: (goalId: string, taskId: string) => void;
  onAddGoal: (goal: Omit<StudentGoal, 'id' | 'progressPercentage'>) => void;
  onDeleteGoal: (id: string) => void;
}

export const GoalsView: React.FC<GoalsViewProps> = ({
  goals,
  onToggleTask,
  onAddGoal,
  onDeleteGoal,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Academic' | 'Skill' | 'Health' | 'Career'>('Skill');
  const [targetDate, setTargetDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [tasksInput, setTasksInput] = useState(
    'Week 1: Fundamentals, Week 2: Build 2 mini apps, Week 3: Master async/await, Week 4: Ship capstone'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tasks = tasksInput
      .split(',')
      .map((t, idx) => ({
        id: `gt_${Date.now()}_${idx}`,
        title: t.trim(),
        completed: false,
      }))
      .filter((t) => t.title.length > 0);

    onAddGoal({
      title,
      category,
      targetDate,
      tasks,
    });

    setTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Semester & Skill Goals</h1>
          <p className="mt-1 text-sm text-slate-600">
            Define micro-milestones to systematically track long-term academic and technical breakthroughs.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          <span>New Goal</span>
        </button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const completedCount = goal.tasks.filter((t) => t.completed).length;
          const totalCount = goal.tasks.length;
          const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

          return (
            <div
              key={goal.id}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:border-indigo-300 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="rounded-lg bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700">
                    {goal.category}
                  </span>
                  <button
                    onClick={() => onDeleteGoal(goal.id)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <h3 className="mt-3 text-lg font-bold text-slate-900">{goal.title}</h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>Target: {goal.targetDate}</span>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Progress</span>
                    <span className="text-indigo-600">{pct}% ({completedCount}/{totalCount})</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Task Sub-Checklist */}
                <div className="mt-5 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Action Tasks
                  </span>
                  {goal.tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-xs transition-colors ${
                        task.completed
                          ? 'border-emerald-100 bg-emerald-50/50 text-slate-400'
                          : 'border-slate-100 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <button
                        onClick={() => onToggleTask(goal.id, task.id)}
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                          task.completed
                            ? 'border-emerald-500 bg-emerald-500 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {task.completed && <CheckCircle2 className="h-3 w-3" />}
                      </button>
                      <span className={task.completed ? 'line-through text-slate-400' : 'font-medium'}>
                        {task.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl animate-in fade-in">
            <h2 className="text-lg font-bold text-slate-900">Create New Student Goal</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Goal Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Learn JavaScript in 30 days"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
                  >
                    <option value="Skill">Skill</option>
                    <option value="Academic">Academic</option>
                    <option value="Career">Career</option>
                    <option value="Health">Health</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Target Date
                  </label>
                  <input
                    type="date"
                    required
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Sub-tasks (Comma-separated)
                </label>
                <textarea
                  rows={3}
                  value={tasksInput}
                  onChange={(e) => setTasksInput(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
