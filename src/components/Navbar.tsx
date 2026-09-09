import React, { useState } from 'react';
import {
  Bell,
  Search,
  Sparkles,
  User,
  GraduationCap,
  CheckCircle2,
  AlertTriangle,
  Clock,
  LogOut,
  Settings,
  Code2,
  Menu,
} from 'lucide-react';
import { UserProfile, NotificationItem } from '../types';

interface NavbarProps {
  user: UserProfile | null;
  notifications: NotificationItem[];
  onOpenSolveProblem: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
  onOpenProfile: () => void;
  onOpenDjangoInspector: () => void;
  onToggleSidebar: () => void;
  onSearchSelect?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  notifications,
  onOpenSolveProblem,
  onOpenAuth,
  onLogout,
  onOpenProfile,
  onOpenDjangoInspector,
  onToggleSidebar,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-md transition-all sm:px-6">
      {/* Left: Brand & Mobile Sidebar Toggle */}
      <div className="flex items-center gap-3">
        <button
          id="mobile-menu-toggle"
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-sky-500 text-white shadow-md shadow-indigo-100">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
                Student Survival Hub
              </span>
              <span className="hidden rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 sm:inline-block">
                v2.4
              </span>
            </div>
            <p className="hidden text-[11px] font-medium text-slate-500 md:block">
              Plan Better. Study Smarter. Live Easier.
            </p>
          </div>
        </div>
      </div>

      {/* Middle: Search input */}
      <div className="hidden max-w-md flex-1 px-6 md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="global-search-input"
            type="text"
            placeholder="Search assignments, exams, topics, formulas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
          {searchQuery && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-medium text-slate-400">
              Press Enter
            </span>
          )}
        </div>
      </div>

      {/* Right: Global Actions & User Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global "Solve My Problem" Button */}
        <button
          id="global-solve-my-problem-btn"
          onClick={onOpenSolveProblem}
          className="relative inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 px-3 py-2 text-xs sm:text-sm font-semibold text-white shadow-md shadow-rose-100 transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
        >
          <Sparkles className="h-4 w-4 animate-pulse text-amber-200" />
          <span className="font-bold">Solve My Problem</span>
          <span className="hidden rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white lg:inline">
            AI Triage
          </span>
        </button>

        {/* Django & Python Architecture Inspector */}
        <button
          id="django-inspector-btn"
          onClick={onOpenDjangoInspector}
          title="Inspect Django Models & Architecture"
          className="hidden items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50/80 px-2.5 py-2 text-xs font-semibold text-emerald-800 transition-all hover:bg-emerald-100 sm:inline-flex"
        >
          <Code2 className="h-4 w-4 text-emerald-600" />
          <span>Django/Python</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            id="notifications-bell-btn"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="relative rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900"
            aria-label="View notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 px-1">
                <span className="font-bold text-sm text-slate-800">Notifications</span>
                <span className="text-xs text-indigo-600 font-medium cursor-pointer hover:underline">
                  Mark all as read
                </span>
              </div>
              <div className="mt-2 max-h-72 space-y-2 overflow-y-auto pr-1">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-start gap-3 rounded-xl p-2.5 transition-colors ${
                      item.read ? 'bg-slate-50 text-slate-600' : 'bg-indigo-50/70 text-slate-900'
                    }`}
                  >
                    <div className="mt-0.5 rounded-lg bg-white p-1.5 shadow-xs">
                      {item.type === 'deadline' && <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />}
                      {item.type === 'exam' && <Clock className="h-3.5 w-3.5 text-rose-500" />}
                      {item.type === 'session' && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
                      {item.type === 'system' && <Bell className="h-3.5 w-3.5 text-blue-500" />}
                    </div>
                    <div className="flex-1 text-xs">
                      <p className="font-semibold">{item.title}</p>
                      <p className="mt-0.5 text-slate-500 leading-relaxed">{item.message}</p>
                      <span className="mt-1 inline-block text-[10px] text-slate-400">
                        {item.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Account / Profile */}
        {user ? (
          <div className="relative">
            <button
              id="user-profile-menu-btn"
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5 pr-2.5 transition-all hover:bg-slate-100"
            >
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="h-7 w-7 rounded-lg object-cover ring-1 ring-slate-300"
                />
              ) : (
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">
                  {user.name.charAt(0)}
                </div>
              )}
              <span className="hidden text-xs font-semibold text-slate-700 sm:inline-block max-w-[100px] truncate">
                {user.name}
              </span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-50">
                <div className="border-b border-slate-100 p-2 text-xs">
                  <p className="font-bold text-slate-900">{user.name}</p>
                  <p className="text-slate-500 truncate">{user.email}</p>
                  <span className="mt-1 inline-block rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-700">
                    {user.department}
                  </span>
                </div>
                <div className="mt-1 space-y-0.5">
                  <button
                    onClick={() => {
                      onOpenProfile();
                      setShowUserMenu(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
                  >
                    <User className="h-4 w-4 text-slate-500" />
                    <span>My Profile & Goals</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenDjangoInspector();
                      setShowUserMenu(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
                  >
                    <Code2 className="h-4 w-4 text-emerald-600" />
                    <span>Django Architecture</span>
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setShowUserMenu(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              id="navbar-login-btn"
              onClick={() => onOpenAuth('login')}
              className="rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Log In
            </button>
            <button
              id="navbar-signup-btn"
              onClick={() => onOpenAuth('signup')}
              className="rounded-xl bg-indigo-600 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
