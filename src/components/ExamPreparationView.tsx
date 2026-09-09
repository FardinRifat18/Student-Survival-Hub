import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  ChevronRight,
  Flame,
  Award,
} from 'lucide-react';
import { Exam, ExamTopic, ExamTopicStatus } from '../types';

interface ExamPreparationViewProps {
  exams: Exam[];
  onAddExam: (exam: Exam) => void;
  onUpdateTopicStatus: (examId: string, topicId: string, status: ExamTopicStatus) => void;
  onAddTopic: (examId: string, topicName: string) => void;
}

export const ExamPreparationView: React.FC<ExamPreparationViewProps> = ({
  exams,
  onAddExam,
  onUpdateTopicStatus,
  onAddTopic,
}) => {
  const [selectedExamId, setSelectedExamId] = useState<string>(exams[0]?.id || '');
  const [newTopicName, setNewTopicName] = useState('');
  const [showAddExamModal, setShowAddExamModal] = useState(false);

  // New Exam form
  const [newSubject, setNewSubject] = useState('');
  const [newCourseCode, setNewCourseCode] = useState('');
  const [newExamDate, setNewExamDate] = useState(
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16)
  );
  const [newDifficulty, setNewDifficulty] = useState<'Easy' | 'Moderate' | 'Challenging' | 'Hard'>('Hard');
  const [newTopicsText, setNewTopicsText] = useState('Topic 1, Topic 2, Topic 3, Topic 4');

  const activeExam = exams.find((e) => e.id === selectedExamId) || exams[0];

  // Countdown timer calculation
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!activeExam) return;
    const updateCountdown = () => {
      const target = new Date(activeExam.examDate).getTime();
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [activeExam]);

  const handleAddTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicName.trim() || !activeExam) return;
    onAddTopic(activeExam.id, newTopicName.trim());
    setNewTopicName('');
  };

  const handleCreateExamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newCourseCode.trim()) return;

    const topicsList: ExamTopic[] = newTopicsText
      .split(',')
      .map((t, idx) => ({
        id: `topic_${Date.now()}_${idx}`,
        name: t.trim(),
        status: 'not_started' as ExamTopicStatus,
      }))
      .filter((t) => t.name.length > 0);

    const createdExam: Exam = {
      id: `exam_${Date.now()}`,
      subject: newSubject,
      courseCode: newCourseCode,
      examDate: new Date(newExamDate).toISOString(),
      difficulty: newDifficulty,
      topics: topicsList,
      notes: '',
    };

    onAddExam(createdExam);
    setSelectedExamId(createdExam.id);
    setShowAddExamModal(false);
  };

  // Preparation progress calculation
  const masteredCount = activeExam?.topics.filter((t) => t.status === 'mastered').length || 0;
  const inProgressCount = activeExam?.topics.filter((t) => t.status === 'in_progress').length || 0;
  const totalTopics = activeExam?.topics.length || 1;
  const prepPercentage = Math.round(
    ((masteredCount * 1 + inProgressCount * 0.5) / totalTopics) * 100
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Exam Preparation & Syllabus Mastery</h1>
          <p className="mt-1 text-sm text-slate-600">
            Deconstruct complex university exams into granular topic checklists with real-time countdowns.
          </p>
        </div>

        <button
          onClick={() => setShowAddExamModal(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          <span>Add Exam Target</span>
        </button>
      </div>

      {/* Exam Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {exams.map((exam) => (
          <button
            key={exam.id}
            onClick={() => setSelectedExamId(exam.id)}
            className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
              activeExam?.id === exam.id
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <GraduationCap className="h-4 w-4" />
            <span>{exam.courseCode}: {exam.subject}</span>
          </button>
        ))}
      </div>

      {activeExam && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Live Countdown Hero & Preparation Progress */}
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 p-6 sm:p-8 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-400/30">
                {activeExam.courseCode}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  activeExam.difficulty === 'Hard'
                    ? 'bg-rose-500/20 text-rose-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}
              >
                Difficulty: {activeExam.difficulty}
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {activeExam.subject}
              </h2>
              <p className="mt-1 text-xs text-indigo-200 font-medium">
                Scheduled on {new Date(activeExam.examDate).toLocaleDateString()} at{' '}
                {new Date(activeExam.examDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {/* Live Countdown Display */}
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-md text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block mb-2">
                Exam Countdown
              </span>
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                {String(countdown.days).padStart(2, '0')} Days {String(countdown.hours).padStart(2, '0')} Hours
              </div>
              <div className="mt-2 text-xs font-semibold text-amber-300">
                {countdown.minutes} Minutes {countdown.seconds} Seconds
              </div>
            </div>

            {/* Preparation Level Progress Bar */}
            <div className="border-t border-white/10 pt-5 space-y-2">
              <div className="flex justify-between text-xs text-indigo-200 font-bold">
                <span>Preparation Level</span>
                <span className="text-emerald-400 font-black">{prepPercentage}%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 transition-all duration-500"
                  style={{ width: `${prepPercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                <span>{masteredCount} Mastered ✅</span>
                <span>{inProgressCount} In Progress ⏳</span>
                <span>{activeExam.topics.length - masteredCount - inProgressCount} Left ❌</span>
              </div>
            </div>
          </div>

          {/* Right Column: Topics Breakdown Checklist */}
          <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Topic Breakdown & Mastery Checklist
                </h3>
                <p className="text-xs text-slate-500">
                  Click status icons to toggle between Mastered ✅, In Progress ⏳, and Not Started ❌
                </p>
              </div>

              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                {activeExam.topics.length} Total Topics
              </span>
            </div>

            {/* Topic List */}
            <div className="space-y-2.5">
              {activeExam.topics.map((topic) => (
                <div
                  key={topic.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-3.5 hover:border-indigo-300 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-xs sm:text-sm text-slate-900">
                      {topic.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onUpdateTopicStatus(activeExam.id, topic.id, 'mastered')}
                      title="Mark Mastered"
                      className={`rounded-xl px-2.5 py-1 text-xs font-bold transition-all ${
                        topic.status === 'mastered'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-emerald-50'
                      }`}
                    >
                      ✅ Mastered
                    </button>
                    <button
                      onClick={() => onUpdateTopicStatus(activeExam.id, topic.id, 'in_progress')}
                      title="Mark In Progress"
                      className={`rounded-xl px-2.5 py-1 text-xs font-bold transition-all ${
                        topic.status === 'in_progress'
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-amber-50'
                      }`}
                    >
                      ⏳ In Progress
                    </button>
                    <button
                      onClick={() => onUpdateTopicStatus(activeExam.id, topic.id, 'not_started')}
                      title="Mark Not Started"
                      className={`rounded-xl px-2.5 py-1 text-xs font-bold transition-all ${
                        topic.status === 'not_started'
                          ? 'bg-slate-300 text-slate-800'
                          : 'bg-white text-slate-400 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      ❌ Not Started
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Add Topic Input */}
            <form onSubmit={handleAddTopicSubmit} className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Add another syllabus topic (e.g. Graph Cycle Detection)..."
                value={newTopicName}
                onChange={(e) => setNewTopicName(e.target.value)}
                className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700"
              >
                Add Topic
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Exam Modal */}
      {showAddExamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl animate-in fade-in">
            <h2 className="text-lg font-bold text-slate-900">Add Upcoming Exam</h2>
            <form onSubmit={handleCreateExamSubmit} className="mt-4 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Course Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CSE 263"
                    value={newCourseCode}
                    onChange={(e) => setNewCourseCode(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Exam Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={newExamDate}
                    onChange={(e) => setNewExamDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Subject Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Data Structures & Algorithms Final"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Difficulty
                </label>
                <select
                  value={newDifficulty}
                  onChange={(e) => setNewDifficulty(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
                >
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Challenging">Challenging</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Syllabus Topics (Comma-separated)
                </label>
                <textarea
                  rows={2}
                  value={newTopicsText}
                  onChange={(e) => setNewTopicsText(e.target.value)}
                  placeholder="Array, Linked List, Stack, Queue, Trees, Graphs"
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddExamModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700"
                >
                  Save Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
