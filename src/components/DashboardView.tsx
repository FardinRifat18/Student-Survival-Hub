import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  Plus,
  Play,
  Flame,
  Award,
  BookOpen,
} from 'lucide-react';
import {
  UserProfile,
  Assignment,
  Exam,
  StudySession,
  ActionPlan,
  Priority,
} from '../types';

interface DashboardViewProps {
  user: UserProfile;
  assignments: Assignment[];
  exams: Exam[];
  studySessions: StudySession[];
  actionPlan: ActionPlan;
  onNavigateTab: (tab: any) => void;
  onToggleSession: (id: string) => void;
  onOpenSolveProblem: () => void;
  onStartFocusSession: (subject: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  assignments,
  exams,
  studySessions,
  actionPlan,
  onNavigateTab,
  onToggleSession,
  onOpenSolveProblem,
  onStartFocusSession,
}) => {
  // Live Countdown calculation for nearest exam
  const nearestExam = exams[0];
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!nearestExam) return;
    const calculateTime = () => {
      const target = new Date(nearestExam.examDate).getTime();
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [nearestExam]);

  // Greeting based on current time
  const currentHour = new Date().getHours();
  const greetingTime =
    currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  // Stats calculation
  const completedSessions = studySessions.filter((s) => s.completed).length;
  const totalSessions = studySessions.length;
  const dailyProgressPercent = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 50;

  const totalStudyHoursToday = studySessions
    .filter((s) => s.completed)
    .reduce((acc, s) => acc + s.durationMinutes, 0) / 60;

  const pendingAssignmentsCount = assignments.filter((a) => a.status !== 'completed').length;

  const getDeadlineBadge = (dueDateString: string) => {
    const due = new Date(dueDateString).getTime();
    const now = Date.now();
    const diffDays = (due - now) / (1000 * 60 * 60 * 24);

    if (diffDays <= 1) {
      return {
        label: 'Due Very Soon',
        color: 'bg-rose-100 text-rose-800 border-rose-200',
        dot: 'bg-rose-500',
      };
    } else if (diffDays <= 3) {
      return {
        label: 'Due Soon',
        color: 'bg-amber-100 text-amber-800 border-amber-200',
        dot: 'bg-amber-500',
      };
    } else {
      return {
        label: `${Math.ceil(diffDays)} Days Left`,
        color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        dot: 'bg-emerald-500',
      };
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-600 p-6 sm:p-8 text-white shadow-xl shadow-indigo-100">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-indigo-100 backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>{user.university} • {user.semester}</span>
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight">
              {greetingTime}, {user.name} 👋
            </h1>
            <p className="mt-1 text-sm sm:text-base text-indigo-100 max-w-xl">
              Here's your plan for today. You have {studySessions.filter((s) => !s.completed).length} study sessions remaining and {pendingAssignmentsCount} pending assignments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenSolveProblem}
              className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-900 shadow-md transition-all hover:bg-amber-300 active:scale-95"
            >
              <Sparkles className="h-4 w-4 text-slate-900" />
              <span>Solve My Problem</span>
            </button>
            <button
              onClick={() => onNavigateTab('action_plan')}
              className="inline-flex items-center gap-2 rounded-2xl bg-white/20 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white backdrop-blur-xs hover:bg-white/30 transition-all active:scale-95"
            >
              <span>View Action Plan</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* 2. Today's Overview Metric Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Tasks Remaining</span>
          <p className="mt-2 text-2xl font-black text-slate-900">
            {studySessions.filter((s) => !s.completed).length}
          </p>
          <span className="text-[11px] text-slate-400 font-medium">of {studySessions.length} planned</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Study Hours</span>
          <p className="mt-2 text-2xl font-black text-indigo-600">
            {totalStudyHoursToday.toFixed(1)}h
          </p>
          <span className="text-[11px] text-emerald-600 font-bold">Goal: 4.0h/day</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Assignments Due</span>
          <p className="mt-2 text-2xl font-black text-rose-600">
            {pendingAssignmentsCount}
          </p>
          <span className="text-[11px] text-rose-500 font-bold">1 due tomorrow</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Upcoming Exams</span>
          <p className="mt-2 text-2xl font-black text-amber-600">
            {exams.length}
          </p>
          <span className="text-[11px] text-slate-400 font-medium">Next in {countdown.days}d</span>
        </div>

        <div className="col-span-2 sm:col-span-1 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Daily Progress</span>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="text-2xl font-black text-slate-900">{dailyProgressPercent}%</p>
            <span className="text-[11px] font-bold text-indigo-600">
              {completedSessions}/{totalSessions} done
            </span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${dailyProgressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. Main Dashboard 2-Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Columns: Today's Study Plan & Deadlines */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Study Plan */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-600" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Today's Study Plan
                </h2>
              </div>
              <button
                onClick={() => onNavigateTab('study_planner')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                Open Full Schedule →
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {studySessions.map((session) => (
                <div
                  key={session.id}
                  className={`flex items-center justify-between rounded-2xl border p-3.5 transition-all ${
                    session.completed
                      ? 'border-slate-100 bg-slate-50/70 text-slate-400'
                      : 'border-slate-200 bg-white hover:border-indigo-300 text-slate-800 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onToggleSession(session.id)}
                      className={`flex h-6 w-6 items-center justify-center rounded-lg border transition-colors ${
                        session.completed
                          ? 'border-emerald-500 bg-emerald-500 text-white'
                          : 'border-slate-300 hover:border-indigo-500'
                      }`}
                    >
                      {session.completed && <CheckCircle2 className="h-4 w-4" />}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${session.completed ? 'line-through' : 'text-slate-900'}`}>
                          {session.startTime} → {session.subject}
                        </span>
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                          {session.durationMinutes} mins
                        </span>
                      </div>
                      {session.notes && (
                        <p className="mt-0.5 text-[11px] text-slate-500">{session.notes}</p>
                      )}
                    </div>
                  </div>

                  {!session.completed && (
                    <button
                      onClick={() => onStartFocusSession(session.subject)}
                      className="inline-flex items-center gap-1 rounded-xl bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 hover:bg-indigo-100"
                    >
                      <Play className="h-3 w-3 fill-current" />
                      <span>Start</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Upcoming Assignment Deadlines
                </h2>
              </div>
              <button
                onClick={() => onNavigateTab('assignments')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                Manage All →
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {assignments.slice(0, 3).map((asg) => {
                const badge = getDeadlineBadge(asg.dueDate);
                return (
                  <div
                    key={asg.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-4 gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">
                          {asg.title}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-500 mt-0.5">
                        {asg.course} • Est: {asg.estimatedHours} hours
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${badge.color}`}
                      >
                        <span className={`h-2 w-2 rounded-full ${badge.dot}`} />
                        {badge.label}
                      </span>
                      <span className="rounded-lg bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 border border-slate-200">
                        {asg.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Exam Countdown & Weekly Progress */}
        <div className="space-y-6">
          {/* Exam Countdown Card */}
          {nearestExam && (
            <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-indigo-950 p-6 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-indigo-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                    Next Exam Countdown
                  </span>
                </div>
                <span className="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-xs font-bold text-amber-300 border border-amber-400/30">
                  {nearestExam.courseCode}
                </span>
              </div>

              <div className="mt-4 text-center">
                <h3 className="text-lg font-bold text-white">{nearestExam.subject}</h3>
                {/* Live Countdown Clock */}
                <div className="mt-4 grid grid-cols-4 gap-2">
                  <div className="rounded-2xl bg-white/10 p-2.5 backdrop-blur-xs">
                    <span className="text-xl sm:text-2xl font-black text-white">{countdown.days}</span>
                    <span className="block text-[10px] font-bold text-indigo-200 uppercase">Days</span>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-2.5 backdrop-blur-xs">
                    <span className="text-xl sm:text-2xl font-black text-white">{countdown.hours}</span>
                    <span className="block text-[10px] font-bold text-indigo-200 uppercase">Hours</span>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-2.5 backdrop-blur-xs">
                    <span className="text-xl sm:text-2xl font-black text-white">{countdown.minutes}</span>
                    <span className="block text-[10px] font-bold text-indigo-200 uppercase">Mins</span>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-2.5 backdrop-blur-xs">
                    <span className="text-xl sm:text-2xl font-black text-amber-400">{countdown.seconds}</span>
                    <span className="block text-[10px] font-bold text-indigo-200 uppercase">Secs</span>
                  </div>
                </div>
              </div>

              {/* Topic readiness */}
              <div className="mt-6 border-t border-white/10 pt-4">
                <div className="flex justify-between text-xs text-indigo-200 mb-1.5 font-medium">
                  <span>Topic Mastery</span>
                  <span>
                    {nearestExam.topics.filter((t) => t.status === 'mastered').length} of {nearestExam.topics.length} topics
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-emerald-400"
                    style={{
                      width: `${(nearestExam.topics.filter((t) => t.status === 'mastered').length / nearestExam.topics.length) * 100}%`,
                    }}
                  />
                </div>

                <button
                  onClick={() => onNavigateTab('exams')}
                  className="mt-4 w-full rounded-2xl bg-white/15 py-2 text-xs font-bold text-white hover:bg-white/25 transition-all text-center"
                >
                  Review Exam Topics Checklist →
                </button>
              </div>
            </div>
          )}

          {/* Weekly Progress Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-base">Weekly Progress</h3>
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                On Track
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-600 font-medium mb-1">
                  <span>Study Hours (18.5h / 25h goal)</span>
                  <span className="font-bold text-slate-900">74%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-2 rounded-full bg-indigo-600 w-[74%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 font-medium mb-1">
                  <span>Completed Tasks (22 / 26)</span>
                  <span className="font-bold text-slate-900">85%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-2 rounded-full bg-emerald-500 w-[85%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 font-medium mb-1">
                  <span>Assignment Completion</span>
                  <span className="font-bold text-slate-900">67%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-2 rounded-full bg-amber-500 w-[67%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 font-medium mb-1">
                  <span>Semester Goal: JavaScript Mastery</span>
                  <span className="font-bold text-slate-900">65%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-2 rounded-full bg-purple-600 w-[65%]" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-indigo-50/70 p-3 text-center">
              <span className="text-xs font-bold text-indigo-900">
                🔥 5-Day Study Streak Active!
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Complete today's sessions to earn the "Weekend Champion" badge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
