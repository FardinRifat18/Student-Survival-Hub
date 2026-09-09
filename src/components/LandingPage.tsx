import React from 'react';
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Calendar,
  Clock,
  Wallet,
  CheckCircle2,
  FileText,
  Compass,
  Bot,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Star,
} from 'lucide-react';
import { Assignment, Exam, ActionPlan, BudgetItem } from '../types';

interface LandingPageProps {
  onGetStarted: () => void;
  onExploreFeatures: () => void;
  sampleAssignments: Assignment[];
  sampleExams: Exam[];
  sampleActionPlan: ActionPlan;
  sampleBudgets: BudgetItem[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onExploreFeatures,
  sampleAssignments,
  sampleExams,
  sampleActionPlan,
  sampleBudgets,
}) => {
  const primaryExam = sampleExams[0];
  const totalIncome = sampleBudgets
    .filter((b) => b.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = sampleBudgets
    .filter((b) => b.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-10 pb-16 sm:px-6 lg:px-8">
        {/* Subtle background glow */}
        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-full max-w-7xl -translate-x-1/2 opacity-30 pointer-events-none">
          <div className="absolute top-10 left-1/4 h-72 w-72 rounded-full bg-indigo-300 blur-3xl" />
          <div className="absolute top-20 right-1/4 h-72 w-72 rounded-full bg-rose-200 blur-3xl" />
        </div>

        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>The All-In-One University Student Operating System</span>
          </div>

          {/* Headline */}
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-rose-600 bg-clip-text text-transparent">
              Survive Student Life.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
            Plan your studies, manage deadlines, prepare for exams, control your budget,
            discover learning resources, and build your career — all in one place.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              id="hero-get-started-btn"
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-xl active:scale-95"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              id="hero-explore-features-btn"
              onClick={onExploreFeatures}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
            >
              <span>Explore Features</span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
              <span className="ml-1.5 font-bold text-slate-700">4.9/5</span>
            </div>
            <span>•</span>
            <span>Trusted by 25,000+ STEM & University Students</span>
          </div>
        </div>

        {/* Hero Visual: Interactive Modern Student Dashboard Preview */}
        <div className="mx-auto mt-12 max-w-5xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-2xl ring-1 ring-slate-900/5">
            {/* Mock Dashboard Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-rose-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="text-xs font-bold text-slate-800 ml-2">
                  Student Live Dashboard Preview
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                  ● Live Sync
                </span>
              </div>
            </div>

            {/* Dashboard Mock Grid */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* 1. Today's Tasks & Overview */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Today's Plan
                  </span>
                  <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold text-indigo-700">
                    4 Tasks
                  </span>
                </div>
                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex items-center gap-2 rounded-xl bg-white p-2 text-slate-700 shadow-2xs">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span className="line-through text-slate-400">09:00 - Data Structures Tree Traversals</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-white p-2 text-slate-800 shadow-2xs font-medium">
                    <Clock className="h-4 w-4 text-amber-500 shrink-0" />
                    <span>10:15 - Mathematics Graph Proofs</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-white p-2 text-slate-800 shadow-2xs font-medium">
                    <Clock className="h-4 w-4 text-indigo-500 shrink-0" />
                    <span>15:00 - Programming LeetCode Practice</span>
                  </div>
                </div>
              </div>

              {/* 2. Upcoming Assignments */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Upcoming Deadlines
                  </span>
                  <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-700">
                    Urgent
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                  {sampleAssignments.slice(0, 2).map((asg) => (
                    <div key={asg.id} className="rounded-xl bg-white p-2.5 shadow-2xs">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 truncate max-w-[170px]">
                          {asg.title}
                        </span>
                        <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                          Due Tomorrow
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500">{asg.course}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Exam Countdown */}
              <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-indigo-900 to-slate-900 p-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
                    Next Exam Countdown
                  </span>
                  <span className="rounded bg-amber-400/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-300">
                    CSE 263
                  </span>
                </div>
                <div className="mt-3 text-center">
                  <span className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                    12 Days 14 Hours
                  </span>
                  <p className="mt-1 text-xs text-indigo-200 font-medium">
                    Data Structures & Algorithms Final
                  </p>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-[11px] text-indigo-200 mb-1">
                    <span>Preparation Level</span>
                    <span>50%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/20">
                    <div className="h-1.5 rounded-full bg-emerald-400 w-1/2" />
                  </div>
                </div>
              </div>

              {/* 4. Student Action Plan */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-indigo-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Personalized Student Action Plan
                    </span>
                  </div>
                  <span className="text-xs text-indigo-600 font-bold">14-Day Sprint</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 font-medium">
                  Goal: "Prepare for CSE final exam in 14 days"
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="rounded-xl bg-white p-2.5 shadow-2xs border-l-2 border-indigo-600">
                    <span className="font-bold text-slate-900 block">Day 1 (Today)</span>
                    <span className="text-slate-600 text-[11px]">Data Structures (2h) • Algorithms (1h) • 20 MCQs</span>
                  </div>
                  <div className="rounded-xl bg-white p-2.5 shadow-2xs border-l-2 border-emerald-500">
                    <span className="font-bold text-slate-900 block">Day 2 (Tomorrow)</span>
                    <span className="text-slate-600 text-[11px]">Database Normalization (2h) • SQL practice (1h)</span>
                  </div>
                </div>
              </div>

              {/* 5. Budget Summary */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Student Budget
                  </span>
                  <Wallet className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-500">Balance</span>
                    <p className="text-xl font-black text-slate-900">
                      ${totalIncome - totalExpense}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-emerald-600 font-bold">
                      +${totalIncome} In
                    </span>
                    <span className="text-[11px] text-rose-500 font-bold block">
                      -${totalExpense} Out
                    </span>
                  </div>
                </div>
                <div className="mt-2 rounded-lg bg-emerald-50 p-1.5 text-center text-[10px] font-bold text-emerald-700">
                  Savings Rate: 50.7% on track
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="border-t border-slate-200 bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              Built for Every Dimension of University Life
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
              Replace 7 fragmented apps with one cohesive student hub designed for maximum academic GPA and minimum cognitive fatigue.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 p-5 hover:border-indigo-300 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Solve My Problem</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Describe any academic dilemma or deadline pileup. Get an immediate triage: what to do first, estimated hours, and a calm step-by-step schedule.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5 hover:border-indigo-300 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Personalized Action Plans</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Input your exam dates, weak subjects, and daily hours. The engine crafts a day-by-day roadmap with interactive completion checkpoints.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5 hover:border-indigo-300 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Exam Countdown & Topics</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Live countdown timers down to the second. Deconstruct complex syllabi into topics marked Mastered, In Progress, or Not Started.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5 hover:border-indigo-300 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Wallet className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Student Budget & Saving Tips</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Track pocket money, stipends, and campus meals. Get AI recommendations on how to save more on textbooks, transit, and groceries.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5 hover:border-indigo-300 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Bot className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Smart Study Assistant</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Ask Gemini to explain complex algorithms, generate practice MCQs, produce high-yield note summaries, and create interactive flashcards.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5 hover:border-indigo-300 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Compass className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Career Development Roadmaps</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Step-by-step career tracks for Full-Stack SWE, Data Science, Cybersecurity, and UI/UX with skill milestone checklists and salary metrics.
              </p>
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <div className="mt-16 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 p-8 text-center text-white shadow-xl">
            <h3 className="text-xl sm:text-2xl font-black">Ready to Take Control of Your Semester?</h3>
            <p className="mt-2 text-xs sm:text-sm text-indigo-200 max-w-md mx-auto">
              Join thousands of students mastering their coursework, deadlines, and careers.
            </p>
            <button
              onClick={onGetStarted}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-xs sm:text-sm font-bold text-indigo-900 shadow-md transition-all hover:bg-indigo-50 active:scale-95"
            >
              <span>Launch My Student Hub</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
