import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Clock,
  AlertCircle,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Send,
  Loader2,
  HeartHandshake,
  PlusCircle,
} from 'lucide-react';
import { ProblemSolution, Priority } from '../types';

interface SolveMyProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyToPlanner?: (tasks: string[]) => void;
  currentAssignmentsCount?: number;
  upcomingExamsCount?: number;
}

export const SolveMyProblemModal: React.FC<SolveMyProblemModalProps> = ({
  isOpen,
  onClose,
  onApplyToPlanner,
  currentAssignmentsCount = 3,
  upcomingExamsCount = 1,
}) => {
  const [problemText, setProblemText] = useState('');
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState<ProblemSolution | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedSchedule, setCopiedSchedule] = useState(false);

  if (!isOpen) return null;

  const samplePrompts = [
    'I have three assignments due next week and an exam after that. I don’t know how to organize everything.',
    'I am failing Data Structures because I don’t understand Tree Rotations and Big-O notation. What should I do right now?',
    'I only have 3 hours tonight and need to finish a lab report and study for tomorrow morning’s calculus quiz.',
    'I feel overwhelmed by midterms, part-time job, and haven’t slept well. How can I triage my week?',
  ];

  const handleSolve = async (textToSolve?: string) => {
    const text = textToSolve || problemText;
    if (!text.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/ai/solve-problem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problem: text,
          currentContext: {
            assignmentsDueSoon: currentAssignmentsCount,
            upcomingExams: upcomingExamsCount,
          },
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to resolve problem.');
      }

      const data = await res.json();
      setSolution(data);
    } catch (err: any) {
      console.error(err);
      setError('Could not connect to AI triage. Using offline heuristic triage instead.');
      // Offline fallback guarantee
      setSolution({
        problemSummary: `Tackling workload challenge: "${text.slice(0, 80)}..."`,
        doFirst: 'Write down all deadlines on a single sheet and commit to the nearest one for 45 minutes.',
        priorityLevel: 'urgent',
        estimatedTime: '3.5 hours across two focused intervals',
        schedule: [
          { time: '09:00 - 10:15', activity: 'Work on nearest assignment with zero browser tab distractions.' },
          { time: '10:15 - 10:30', activity: 'Take a screen-free walk and drink water.' },
          { time: '10:30 - 12:00', activity: 'High-yield exam review: practice 5 past exam problems.' },
        ],
        actionPlan: [
          '1. Eliminate decision fatigue: work in 25-minute Pomodoro sprints.',
          '2. Reach out to course TA or classmate for immediate roadblock questions.',
          '3. Turn in a solid partial submission rather than skipping a deadline.',
        ],
        calmingAdvice: 'You are capable of handling this. One focused hour immediately cuts your anxiety in half.',
      });
    } finally {
      setLoading(false);
    }
  };

  const priorityColorMap: Record<Priority, string> = {
    urgent: 'bg-rose-100 text-rose-800 border-rose-300',
    high: 'bg-amber-100 text-amber-800 border-amber-300',
    medium: 'bg-blue-100 text-blue-800 border-blue-300',
    low: 'bg-slate-100 text-slate-800 border-slate-300',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-600/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 text-white shadow-md">
              <Sparkles className="h-5 w-5 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Solve My Problem
              </h2>
              <p className="text-xs text-slate-600">
                AI Academic Triage & Personalized Crisis Solution
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {!solution ? (
            <>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  What is stressing you out or blocking your studies?
                </label>
                <textarea
                  id="solve-problem-textarea"
                  rows={4}
                  value={problemText}
                  onChange={(e) => setProblemText(e.target.value)}
                  placeholder="e.g. I have three assignments due next week and an exam after that. I don't know how to organize everything..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* Sample Quick Prompts */}
              <div>
                <span className="text-xs font-semibold text-slate-500">
                  Or click a common student scenario:
                </span>
                <div className="mt-2 space-y-1.5">
                  {samplePrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setProblemText(prompt);
                        handleSolve(prompt);
                      }}
                      className="block w-full text-left rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-700 transition-all hover:border-indigo-300 hover:bg-indigo-50/50"
                    >
                      💡 {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-800 border border-amber-200">
                  <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
                  <span>{error}</span>
                </div>
              )}
            </>
          ) : (
            /* Solution View */
            <div className="space-y-5 animate-in fade-in">
              {/* Problem summary & priority */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <span className="text-xs font-semibold text-slate-500">
                  {solution.problemSummary}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${
                      priorityColorMap[solution.priorityLevel] || 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    Priority: {solution.priorityLevel}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                    <Clock className="h-3 w-3" />
                    {solution.estimatedTime}
                  </span>
                </div>
              </div>

              {/* 1. What to do first */}
              <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-4">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <span>Step 1: What to do right now</span>
                </div>
                <p className="mt-1 text-sm font-bold text-slate-900 leading-relaxed">
                  {solution.doFirst}
                </p>
              </div>

              {/* 2. Suggested Schedule */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider mb-2">
                  <Calendar className="h-4 w-4 text-indigo-600" />
                  <span>Suggested Schedule Breakdown</span>
                </div>
                <div className="space-y-2">
                  {solution.schedule.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-xl bg-slate-50 p-2.5 text-xs text-slate-700"
                    >
                      <span className="font-bold text-indigo-600 shrink-0 w-24">
                        {item.time}
                      </span>
                      <span className="font-medium text-slate-800">{item.activity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Action Plan Steps */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider mb-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Action Plan</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {solution.actionPlan.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4. Calming scientific advice */}
              <div className="flex items-start gap-2.5 rounded-2xl bg-sky-50/80 p-3.5 text-xs text-sky-900 border border-sky-200">
                <HeartHandshake className="h-4 w-4 shrink-0 text-sky-600 mt-0.5" />
                <p className="leading-relaxed italic">{solution.calmingAdvice}</p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => setSolution(null)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  ← Ask Another Question
                </button>

                <div className="flex items-center gap-2">
                  {onApplyToPlanner && (
                    <button
                      onClick={() => {
                        onApplyToPlanner(solution.actionPlan);
                        setCopiedSchedule(true);
                        setTimeout(() => setCopiedSchedule(false), 2500);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700"
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      {copiedSchedule ? 'Added to Today!' : 'Add to My Study Plan'}
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer (when writing prompt) */}
        {!solution && (
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-4">
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Instant intelligent academic triaging
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                id="solve-problem-submit-btn"
                disabled={loading || !problemText.trim()}
                onClick={() => handleSolve()}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md transition-all hover:opacity-95 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Analyzing Triage...</span>
                  </>
                ) : (
                  <>
                    <span>Solve My Problem</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
