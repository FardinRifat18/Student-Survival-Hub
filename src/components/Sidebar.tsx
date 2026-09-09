import React from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  FileCheck2,
  GraduationCap,
  Sparkles,
  Timer,
  Wallet,
  BookOpen,
  Compass,
  Target,
  Bot,
  BarChart3,
  ShieldAlert,
  HelpCircle,
  Code,
  X,
} from 'lucide-react';

export type NavigationTab =
  | 'dashboard'
  | 'action_plan'
  | 'study_planner'
  | 'assignments'
  | 'exams'
  | 'focus_timer'
  | 'budget'
  | 'resources'
  | 'career'
  | 'goals'
  | 'ai_assistant'
  | 'analytics'
  | 'admin'
  | 'django_code';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  isAdmin?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpen,
  onCloseMobile,
  isAdmin = true,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'action_plan', label: 'My Plan', icon: Sparkles, badge: 'Smart' },
    { id: 'study_planner', label: 'Study Planner', icon: CalendarDays, badge: null },
    { id: 'assignments', label: 'Assignments', icon: FileCheck2, badge: '2 due' },
    { id: 'exams', label: 'Exams', icon: GraduationCap, badge: '12d' },
    { id: 'focus_timer', label: 'Focus Timer', icon: Timer, badge: '25m' },
    { id: 'budget', label: 'Budget', icon: Wallet, badge: null },
    { id: 'resources', label: 'Resources', icon: BookOpen, badge: null },
    { id: 'career', label: 'Career', icon: Compass, badge: 'Roadmap' },
    { id: 'goals', label: 'Goals', icon: Target, badge: '65%' },
    { id: 'ai_assistant', label: 'AI Assistant', icon: Bot, badge: 'Gemini' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
    { id: 'django_code', label: 'Django Models', icon: Code, badge: 'Python' },
    ...(isAdmin ? [{ id: 'admin', label: 'Admin Hub', icon: ShieldAlert, badge: 'System' }] : []),
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header with close button */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4 lg:hidden">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-indigo-600" />
            <span className="font-bold text-slate-900">Student Navigation</span>
          </div>
          <button
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Student Toolkit
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => {
                  onSelectTab(item.id as NavigationTab);
                  onCloseMobile();
                }}
                className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200 font-bold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badge === '2 due'
                        ? 'bg-rose-100 text-rose-700'
                        : item.badge === '12d'
                        ? 'bg-amber-100 text-amber-800'
                        : item.badge === 'Gemini'
                        ? 'bg-purple-100 text-purple-700'
                        : item.badge === 'Python'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer Info Card */}
        <div className="border-t border-slate-100 p-3">
          <div className="rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 to-blue-50/60 p-3">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
              <span>Exam Prep Sprint</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-600 leading-snug">
              CSE 263 Final Exam is in 12 days. 4 key topics need your review.
            </p>
            <button
              onClick={() => {
                onSelectTab('exams');
                onCloseMobile();
              }}
              className="mt-2 text-[11px] font-bold text-indigo-700 hover:text-indigo-900 hover:underline"
            >
              Open Exam Tracker →
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
