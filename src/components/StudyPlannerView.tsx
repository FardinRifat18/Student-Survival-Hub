import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  CheckCircle2,
  List,
  Grid,
  CalendarDays,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { StudySession, Priority } from '../types';

interface StudyPlannerViewProps {
  sessions: StudySession[];
  onAddSession: (session: Omit<StudySession, 'id'>) => void;
  onToggleSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
}

export const StudyPlannerView: React.FC<StudyPlannerViewProps> = ({
  sessions,
  onAddSession,
  onToggleSession,
  onDeleteSession,
}) => {
  const [viewMode, setViewMode] = useState<'daily' | 'weekly' | 'calendar'>('daily');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Session Form State
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('14:00');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [priority, setPriority] = useState<Priority>('medium');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    onAddSession({
      subject,
      date,
      startTime,
      durationMinutes,
      priority,
      completed: false,
      notes,
    });

    setSubject('');
    setNotes('');
    setShowAddModal(false);
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Study Planner & Timeblocking</h1>
          <p className="mt-1 text-sm text-slate-600">
            Organize daily and weekly study blocks with targeted priorities and durations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 p-1 text-xs font-semibold">
            <button
              onClick={() => setViewMode('daily')}
              className={`rounded-xl px-3 py-1.5 transition-all ${
                viewMode === 'daily' ? 'bg-white text-indigo-700 shadow-2xs font-bold' : 'text-slate-600'
              }`}
            >
              Daily Slots
            </button>
            <button
              onClick={() => setViewMode('weekly')}
              className={`rounded-xl px-3 py-1.5 transition-all ${
                viewMode === 'weekly' ? 'bg-white text-indigo-700 shadow-2xs font-bold' : 'text-slate-600'
              }`}
            >
              Weekly Grid
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`rounded-xl px-3 py-1.5 transition-all ${
                viewMode === 'calendar' ? 'bg-white text-indigo-700 shadow-2xs font-bold' : 'text-slate-600'
              }`}
            >
              Calendar View
            </button>
          </div>

          <button
            id="planner-add-session-btn"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add Session</span>
          </button>
        </div>
      </div>

      {/* Add Session Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl animate-in fade-in">
            <h2 className="text-lg font-bold text-slate-900">Schedule a Study Session</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Data Structures (Red-Black Trees)"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Duration (Mins)
                  </label>
                  <select
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-indigo-500 focus:outline-none"
                  >
                    <option value={25}>25 mins (1 Pomodoro)</option>
                    <option value={45}>45 mins</option>
                    <option value={60}>60 mins (1 Hour)</option>
                    <option value={90}>90 mins (Deep Focus)</option>
                    <option value={120}>120 mins (2 Hours)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Study Notes / Specific Goals (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Solve 3 LeetCode medium questions; review slides 1-30"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-indigo-500 focus:outline-none"
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
                  Save Study Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View 1: Daily Schedule List */}
      {viewMode === 'daily' && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-bold text-sm text-slate-800">
              Today's Timeblocked Agenda
            </span>
            <span className="text-xs text-slate-500">
              {sessions.filter((s) => s.completed).length} of {sessions.length} sessions completed
            </span>
          </div>

          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border p-4 transition-all gap-3 ${
                  session.completed
                    ? 'border-slate-100 bg-slate-50/70 text-slate-400'
                    : 'border-slate-200 bg-white hover:border-indigo-300 shadow-2xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => onToggleSession(session.id)}
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                      session.completed
                        ? 'border-emerald-500 bg-emerald-500 text-white'
                        : 'border-slate-300 hover:border-indigo-500'
                    }`}
                  >
                    {session.completed && <CheckCircle2 className="h-4 w-4" />}
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${session.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {session.subject}
                      </span>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          session.priority === 'urgent'
                            ? 'bg-rose-100 text-rose-800'
                            : session.priority === 'high'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {session.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-indigo-500" />
                        {session.startTime} ({session.durationMinutes} mins)
                      </span>
                      <span>•</span>
                      <span>{session.date}</span>
                    </div>
                    {session.notes && (
                      <p className="mt-1 text-xs text-slate-500 italic bg-slate-50 rounded-lg p-1.5">
                        "{session.notes}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => onDeleteSession(session.id)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    title="Delete session"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 2: Weekly Grid */}
      {viewMode === 'weekly' && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs overflow-x-auto">
          <div className="grid grid-cols-7 gap-3 min-w-[750px]">
            {daysOfWeek.map((day, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3 min-h-[220px]">
                <div className="border-b border-slate-200 pb-2 text-center">
                  <span className="font-bold text-xs text-slate-800">{day}</span>
                </div>
                <div className="mt-2 space-y-2">
                  {sessions.slice(0, 2).map((s, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-white p-2 text-[11px] shadow-2xs border border-slate-200/80"
                    >
                      <span className="font-bold text-indigo-700 block truncate">{s.subject}</span>
                      <span className="text-slate-500 text-[10px]">{s.startTime}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 3: Calendar View */}
      {viewMode === 'calendar' && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <span className="font-bold text-sm text-slate-900">September 2026 Academic Calendar</span>
            <span className="text-xs text-indigo-600 font-semibold">Semester Term Active</span>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
              <span key={i} className="text-xs font-bold text-slate-400 py-1">
                {d}
              </span>
            ))}
            {/* Generate calendar cells */}
            {[...Array(30)].map((_, i) => {
              const dayNum = i + 1;
              const isToday = dayNum === 9;
              return (
                <div
                  key={i}
                  className={`min-h-[70px] rounded-xl border p-1 text-left transition-all ${
                    isToday ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-100 bg-white'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full text-center text-xs font-bold leading-5 ${
                      isToday ? 'bg-indigo-600 text-white' : 'text-slate-700'
                    }`}
                  >
                    {dayNum}
                  </span>
                  {dayNum === 9 && (
                    <div className="mt-1 rounded bg-indigo-100 p-1 text-[9px] font-bold text-indigo-800 truncate">
                      4 Study Sessions
                    </div>
                  )}
                  {dayNum === 10 && (
                    <div className="mt-1 rounded bg-rose-100 p-1 text-[9px] font-bold text-rose-800 truncate">
                      Assignment Due
                    </div>
                  )}
                  {dayNum === 21 && (
                    <div className="mt-1 rounded bg-amber-100 p-1 text-[9px] font-bold text-amber-800 truncate">
                      CSE 263 Final
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
