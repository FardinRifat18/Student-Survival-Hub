import React, { useState, useEffect, useRef } from 'react';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Flame,
  CheckCircle2,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { FocusSession } from '../types';

interface TimeManagementViewProps {
  initialSubject?: string;
}

export const TimeManagementView: React.FC<TimeManagementViewProps> = ({
  initialSubject = 'Data Structures',
}) => {
  const [timerMode, setTimerMode] = useState<'study' | 'shortBreak' | 'longBreak'>('study');
  const [currentSubject, setCurrentSubject] = useState(initialSubject);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Mode durations in seconds
  const modeDurations = {
    study: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  const [timeLeft, setTimeLeft] = useState(modeDurations.study);
  const [completedPomodoros, setCompletedPomodoros] = useState(3);
  const [recentSessions, setRecentSessions] = useState<FocusSession[]>([
    {
      id: 'f1',
      subject: 'Data Structures (Tree Balancing)',
      durationMinutes: 25,
      date: 'Today, 09:30 AM',
      completed: true,
    },
    {
      id: 'f2',
      subject: 'Mathematics (Graph Proofs)',
      durationMinutes: 25,
      date: 'Today, 11:00 AM',
      completed: true,
    },
    {
      id: 'f3',
      subject: 'Web Development (State Machines)',
      durationMinutes: 25,
      date: 'Yesterday',
      completed: true,
    },
  ]);

  // Web Audio chime generator
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {
      // AudioContext might be restricted until user interaction
    }
  };

  useEffect(() => {
    let interval: any = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      playChime();

      if (timerMode === 'study') {
        setCompletedPomodoros((c) => c + 1);
        setRecentSessions((prev) => [
          {
            id: `f_${Date.now()}`,
            subject: currentSubject,
            durationMinutes: 25,
            date: 'Just now',
            completed: true,
          },
          ...prev,
        ]);
        setTimerMode('shortBreak');
        setTimeLeft(modeDurations.shortBreak);
      } else {
        setTimerMode('study');
        setTimeLeft(modeDurations.study);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, timerMode, currentSubject]);

  const switchMode = (mode: 'study' | 'shortBreak' | 'longBreak') => {
    setIsRunning(false);
    setTimerMode(mode);
    setTimeLeft(modeDurations[mode]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(modeDurations[timerMode]);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = ((modeDurations[timerMode] - timeLeft) / modeDurations[timerMode]) * 100;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Focus Timer & Pomodoro Engine</h1>
          <p className="mt-1 text-sm text-slate-600">
            Neuroscience-backed interval study blocks: 25m work, 5m short break, 15m long break.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {soundEnabled ? <Volume2 className="h-4 w-4 text-indigo-600" /> : <VolumeX className="h-4 w-4 text-slate-400" />}
            <span>{soundEnabled ? 'Chime ON' : 'Chime Muted'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pomodoro Timer Center Card */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-8 shadow-xs flex flex-col items-center text-center space-y-6">
          {/* Mode Switcher Tabs */}
          <div className="flex rounded-2xl border border-slate-200 bg-slate-50 p-1.5 text-xs font-bold">
            <button
              onClick={() => switchMode('study')}
              className={`rounded-xl px-4 py-2 transition-all ${
                timerMode === 'study'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Study: 25:00
            </button>
            <button
              onClick={() => switchMode('shortBreak')}
              className={`rounded-xl px-4 py-2 transition-all ${
                timerMode === 'shortBreak'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Break: 05:00
            </button>
            <button
              onClick={() => switchMode('longBreak')}
              className={`rounded-xl px-4 py-2 transition-all ${
                timerMode === 'longBreak'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Long Break: 15:00
            </button>
          </div>

          {/* Active Subject Selector */}
          <div className="w-full max-w-sm">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Active Focus Target
            </label>
            <input
              type="text"
              value={currentSubject}
              onChange={(e) => setCurrentSubject(e.target.value)}
              className="w-full text-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm font-bold text-slate-800 focus:bg-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Circular Visual Timer */}
          <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-8 border-slate-100 shadow-inner">
            <div
              className="absolute inset-0 rounded-full border-8 border-indigo-600 transition-all duration-1000"
              style={{
                clipPath: `polygon(50% 50%, -50% -50%, ${progressPercent}% -50%, ${progressPercent}% 150%, -50% 150%)`,
              }}
            />
            <div className="relative z-10 text-center">
              <span className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900 font-mono">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-slate-400">
                {timerMode === 'study' ? 'Deep Work' : 'Rest & Hydrate'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              id="pomodoro-toggle-btn"
              onClick={() => setIsRunning(!isRunning)}
              className={`inline-flex items-center gap-2 rounded-2xl px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all active:scale-95 ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-100'
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="h-4 w-4 fill-current" />
                  <span>Pause Timer</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-current" />
                  <span>Start Focus Session</span>
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="rounded-2xl border border-slate-200 p-3.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              title="Reset Timer"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Daily Tracker & Recent Sessions */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">Today's Focus Stats</span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                🔥 Streak Active
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-50 p-3.5 text-center">
                <span className="text-[11px] font-semibold text-slate-500 block">
                  Completed Sprints
                </span>
                <span className="text-2xl font-black text-indigo-600">
                  {completedPomodoros}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  ({completedPomodoros * 25} mins)
                </span>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3.5 text-center">
                <span className="text-[11px] font-semibold text-slate-500 block">
                  Daily Goal
                </span>
                <span className="text-2xl font-black text-slate-900">
                  8 Sprints
                </span>
                <span className="text-[10px] text-emerald-600 block mt-0.5 font-bold">
                  {Math.round((completedPomodoros / 8) * 100)}% Reached
                </span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <span className="text-xs font-bold text-slate-700 block mb-2">
                Recent Completed Sessions
              </span>
              <div className="space-y-2">
                {recentSessions.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="font-semibold text-slate-800 truncate max-w-[150px]">
                        {s.subject}
                      </span>
                    </div>
                    <span className="text-slate-400 text-[10px]">{s.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-blue-50/50 p-5">
            <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
              Optimal Focus Strategy
            </h4>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              After 4 consecutive study intervals (100 mins total), take a full 15-minute restorative walk without looking at phone screens.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
