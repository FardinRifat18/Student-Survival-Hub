import React, { useState } from 'react';
import {
  FileCheck2,
  Plus,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Search,
  Filter,
  Trash2,
  Calendar,
} from 'lucide-react';
import { Assignment, Priority, TaskStatus } from '../types';

interface AssignmentManagerViewProps {
  assignments: Assignment[];
  onAddAssignment: (asg: Omit<Assignment, 'id'>) => void;
  onUpdateStatus: (id: string, status: TaskStatus) => void;
  onDeleteAssignment: (id: string) => void;
}

export const AssignmentManagerView: React.FC<AssignmentManagerViewProps> = ({
  assignments,
  onAddAssignment,
  onUpdateStatus,
  onDeleteAssignment,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [priority, setPriority] = useState<Priority>('high');
  const [status, setStatus] = useState<TaskStatus>('not_started');
  const [estimatedHours, setEstimatedHours] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !course.trim()) return;

    onAddAssignment({
      title,
      course,
      description,
      dueDate: new Date(dueDate).toISOString(),
      priority,
      status,
      estimatedHours,
    });

    setTitle('');
    setCourse('');
    setDescription('');
    setShowAddModal(false);
  };

  // Warning badges computation
  const getWarningBadge = (dueDateStr: string, asgStatus: TaskStatus) => {
    if (asgStatus === 'completed') {
      return {
        label: 'Completed',
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-500',
      };
    }
    const dueTime = new Date(dueDateStr).getTime();
    const now = Date.now();
    const diffDays = (dueTime - now) / (1000 * 60 * 60 * 24);

    if (diffDays < 1) {
      return {
        label: '🔴 Due Very Soon (≤ 24h)',
        color: 'bg-rose-100 text-rose-800 border-rose-300 font-bold',
        dot: 'bg-rose-500',
      };
    } else if (diffDays <= 7) {
      return {
        label: `🟡 Due Soon (${Math.ceil(diffDays)}d left)`,
        color: 'bg-amber-100 text-amber-800 border-amber-300 font-bold',
        dot: 'bg-amber-500',
      };
    } else {
      return {
        label: `🟢 More than 7 days (${Math.ceil(diffDays)}d)`,
        color: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-medium',
        dot: 'bg-emerald-500',
      };
    }
  };

  const filteredAssignments = assignments.filter((asg) => {
    const matchesFilter = filterStatus === 'all' || asg.status === filterStatus;
    const matchesSearch =
      asg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.course.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Assignment Manager</h1>
          <p className="mt-1 text-sm text-slate-600">
            Track coursework deadlines, priorities, and automated proximity warnings.
          </p>
        </div>

        <button
          id="add-assignment-btn"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          <span>New Assignment</span>
        </button>
      </div>

      {/* Filter and Warning legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-2">
          {['all', 'not_started', 'in_progress', 'completed'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                filterStatus === st
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'all'
                ? 'All Assignments'
                : st === 'not_started'
                ? 'Not Started'
                : st === 'in_progress'
                ? 'In Progress'
                : 'Completed'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-600">
          <span className="flex items-center gap-1">🟢 &gt;7 Days</span>
          <span className="flex items-center gap-1">🟡 Due Soon</span>
          <span className="flex items-center gap-1">🔴 Very Soon</span>
        </div>
      </div>

      {/* Assignment List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAssignments.map((asg) => {
          const warning = getWarningBadge(asg.dueDate, asg.status);
          return (
            <div
              key={asg.id}
              className={`flex flex-col justify-between rounded-3xl border p-5 transition-all ${
                asg.status === 'completed'
                  ? 'border-slate-200 bg-slate-50/60 opacity-80'
                  : 'border-slate-200 bg-white shadow-xs hover:border-indigo-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="rounded-lg bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700">
                    {asg.course}
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${warning.color}`}
                  >
                    {warning.label}
                  </span>
                </div>

                <h3 className="mt-3 text-base font-bold text-slate-900 leading-snug">
                  {asg.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {asg.description}
                </p>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    Due: {new Date(asg.dueDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    Est: {asg.estimatedHours}h
                  </span>
                </div>

                {/* Status Switcher & Delete */}
                <div className="flex items-center justify-between gap-2">
                  <select
                    value={asg.status}
                    onChange={(e) => onUpdateStatus(asg.id, e.target.value as TaskStatus)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none"
                  >
                    <option value="not_started">Not Started</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>

                  <button
                    onClick={() => onDeleteAssignment(asg.id)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl animate-in fade-in">
            <h2 className="text-lg font-bold text-slate-900">Create New Assignment</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Assignment Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Red-Black Tree Implementation"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Course Code / Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="CSE 263 - Data Structures"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
                  >
                    <option value="not_started">Not Started</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Estimated (Hours)
                  </label>
                  <input
                    type="number"
                    min={0.5}
                    max={50}
                    step={0.5}
                    value={estimatedHours}
                    onChange={(e) => setEstimatedHours(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Description & Deliverables
                </label>
                <textarea
                  rows={2}
                  placeholder="Detailed assignment brief, repository links, submission rules..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  Save Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
