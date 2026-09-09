/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar, NavigationTab } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { DashboardView } from './components/DashboardView';
import { ActionPlanView } from './components/ActionPlanView';
import { StudyPlannerView } from './components/StudyPlannerView';
import { AssignmentManagerView } from './components/AssignmentManagerView';
import { ExamPreparationView } from './components/ExamPreparationView';
import { StudyAssistantView } from './components/StudyAssistantView';
import { TimeManagementView } from './components/TimeManagementView';
import { BudgetManagerView } from './components/BudgetManagerView';
import { ResourcesView } from './components/ResourcesView';
import { CareerPlannerView } from './components/CareerPlannerView';
import { GoalsView } from './components/GoalsView';
import { AnalyticsView } from './components/AnalyticsView';
import { ProfileView } from './components/ProfileView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { SolveMyProblemModal } from './components/SolveMyProblemModal';
import { DjangoInspectorModal } from './components/DjangoInspectorModal';
import { AuthModal } from './components/AuthModal';

import {
  initialUserProfile,
  initialAssignments,
  initialExams,
  initialStudySessions,
  initialActionPlan,
  initialBudget,
  initialResources,
  initialRoadmaps,
  initialGoals,
  initialNotifications,
} from './data/mockData';
import {
  UserProfile,
  Assignment,
  Exam,
  StudySession,
  ActionPlan,
  BudgetItem,
  ResourceItem,
  CareerRoadmap,
  StudentGoal,
  ExamTopicStatus,
  TaskStatus,
} from './types';

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<'landing' | 'app'>('app');
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Modals
  const [showSolveProblem, setShowSolveProblem] = useState(false);
  const [showDjangoInspector, setShowDjangoInspector] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [focusInitialSubject, setFocusInitialSubject] = useState('Data Structures');

  // Application Data States
  const [user, setUser] = useState<UserProfile | null>(initialUserProfile);
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [exams, setExams] = useState<Exam[]>(initialExams);
  const [studySessions, setStudySessions] = useState<StudySession[]>(initialStudySessions);
  const [actionPlan, setActionPlan] = useState<ActionPlan>(initialActionPlan);
  const [budgets, setBudgets] = useState<BudgetItem[]>(initialBudget);
  const [resources, setResources] = useState<ResourceItem[]>(initialResources);
  const [roadmaps, setRoadmaps] = useState<CareerRoadmap[]>(initialRoadmaps);
  const [goals, setGoals] = useState<StudentGoal[]>(initialGoals);
  const [notifications, setNotifications] = useState(initialNotifications);

  // Action Plan handlers
  const handleUpdatePlan = (updated: ActionPlan) => {
    setActionPlan(updated);
  };

  // Study Planner handlers
  const handleAddSession = (sessionData: Omit<StudySession, 'id'>) => {
    const newSession: StudySession = {
      id: `session_${Date.now()}`,
      ...sessionData,
    };
    setStudySessions((prev) => [newSession, ...prev]);
  };

  const handleToggleSession = (id: string) => {
    setStudySessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  const handleDeleteSession = (id: string) => {
    setStudySessions((prev) => prev.filter((s) => s.id !== id));
  };

  // Focus Session Trigger from Dashboard
  const handleStartFocusSession = (subject: string) => {
    setFocusInitialSubject(subject);
    setActiveTab('focus_timer');
  };

  // Assignment handlers
  const handleAddAssignment = (asgData: Omit<Assignment, 'id'>) => {
    const newAsg: Assignment = {
      id: `asg_${Date.now()}`,
      ...asgData,
    };
    setAssignments((prev) => [newAsg, ...prev]);
  };

  const handleUpdateAssignmentStatus = (id: string, status: TaskStatus) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const handleDeleteAssignment = (id: string) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  };

  // Exam handlers
  const handleAddExam = (newExam: Exam) => {
    setExams((prev) => [newExam, ...prev]);
  };

  const handleUpdateTopicStatus = (
    examId: string,
    topicId: string,
    status: ExamTopicStatus
  ) => {
    setExams((prev) =>
      prev.map((exam) => {
        if (exam.id !== examId) return exam;
        return {
          ...exam,
          topics: exam.topics.map((t) => (t.id === topicId ? { ...t, status } : t)),
        };
      })
    );
  };

  const handleAddTopicToExam = (examId: string, topicName: string) => {
    setExams((prev) =>
      prev.map((exam) => {
        if (exam.id !== examId) return exam;
        const newTopic = {
          id: `topic_${Date.now()}`,
          name: topicName,
          status: 'not_started' as ExamTopicStatus,
        };
        return {
          ...exam,
          topics: [...exam.topics, newTopic],
        };
      })
    );
  };

  // Budget handlers
  const handleAddBudget = (itemData: Omit<BudgetItem, 'id'>) => {
    const newItem: BudgetItem = {
      id: `budget_${Date.now()}`,
      ...itemData,
    };
    setBudgets((prev) => [newItem, ...prev]);
  };

  const handleDeleteBudget = (id: string) => {
    setBudgets((prev) => prev.filter((b) => b.id !== id));
  };

  // Learning Resources handlers
  const handleToggleResourceBookmark = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, bookmarked: !r.bookmarked } : r))
    );
  };

  const handleAddResource = (resData: Omit<ResourceItem, 'id' | 'bookmarked'>) => {
    const newRes: ResourceItem = {
      id: `res_${Date.now()}`,
      bookmarked: false,
      ...resData,
    };
    setResources((prev) => [newRes, ...prev]);
  };

  const handleDeleteResource = (id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
  };

  // Career Roadmap handlers
  const handleToggleMilestone = (roadmapId: string, milestoneId: string) => {
    setRoadmaps((prev) =>
      prev.map((rm) => {
        if (rm.id !== roadmapId) return rm;
        return {
          ...rm,
          milestones: rm.milestones.map((m) =>
            m.id === milestoneId ? { ...m, completed: !m.completed } : m
          ),
        };
      })
    );
  };

  // Goal handlers
  const handleToggleGoalTask = (goalId: string, taskId: string) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== goalId) return g;
        return {
          ...g,
          tasks: g.tasks.map((t) =>
            t.id === taskId ? { ...t, completed: !t.completed } : t
          ),
        };
      })
    );
  };

  const handleAddGoal = (goalData: Omit<StudentGoal, 'id' | 'progressPercentage'>) => {
    const newGoal: StudentGoal = {
      id: `goal_${Date.now()}`,
      progressPercentage: 0,
      ...goalData,
    };
    setGoals((prev) => [newGoal, ...prev]);
  };

  const handleDeleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  // Apply AI triage recommendation to Study Planner
  const handleApplyTasksFromTriage = (tasks: string[]) => {
    const newSessions: StudySession[] = tasks.slice(0, 3).map((taskText, idx) => ({
      id: `triage_s_${Date.now()}_${idx}`,
      subject: taskText.slice(0, 40),
      date: new Date().toISOString().split('T')[0],
      startTime: `${16 + idx}:00`,
      durationMinutes: 45,
      priority: 'high',
      completed: false,
      notes: taskText,
    }));
    setStudySessions((prev) => [...newSessions, ...prev]);
    setActiveTab('study_planner');
    setShowSolveProblem(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation Bar */}
      <Navbar
        user={user}
        notifications={notifications}
        onOpenSolveProblem={() => setShowSolveProblem(true)}
        onOpenAuth={(mode) => {
          setAuthMode(mode);
          setShowAuthModal(true);
        }}
        onLogout={() => setUser(null)}
        onOpenProfile={() => {
          setCurrentView('app');
          setActiveTab('dashboard');
        }}
        onOpenDjangoInspector={() => setShowDjangoInspector(true)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Sub-header Navigation Bar: Mode Switcher (Landing vs Dashboard) */}
      <div className="bg-white/80 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('landing')}
            className={`rounded-lg px-3 py-1.5 font-bold transition-all ${
              currentView === 'landing'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Landing Page
          </button>
          <button
            onClick={() => setCurrentView('app')}
            className={`rounded-lg px-3 py-1.5 font-bold transition-all ${
              currentView === 'app'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Student Workspace
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-slate-500 font-medium">
            Active Semester: <strong className="text-slate-800">Fall 2026</strong>
          </span>
          <button
            onClick={() => setShowDjangoInspector(true)}
            className="text-emerald-700 font-bold hover:underline"
          >
            View Django REST Code
          </button>
        </div>
      </div>

      {/* Main View Area */}
      {currentView === 'landing' ? (
        <LandingPage
          onGetStarted={() => {
            setCurrentView('app');
            setActiveTab('dashboard');
          }}
          onExploreFeatures={() => {
            setCurrentView('app');
            setActiveTab('action_plan');
          }}
          sampleAssignments={assignments}
          sampleExams={exams}
          sampleActionPlan={actionPlan}
          sampleBudgets={budgets}
        />
      ) : (
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar
            currentTab={activeTab}
            onSelectTab={(tab) => {
              if (tab === 'django_code') {
                setShowDjangoInspector(true);
              } else {
                setActiveTab(tab);
              }
            }}
            isOpen={isSidebarOpen}
            onCloseMobile={() => setIsSidebarOpen(false)}
            isAdmin={true}
          />

          {/* Dynamic Content Views */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {activeTab === 'dashboard' && user && (
              <DashboardView
                user={user}
                assignments={assignments}
                exams={exams}
                studySessions={studySessions}
                actionPlan={actionPlan}
                onNavigateTab={(tab) => setActiveTab(tab)}
                onToggleSession={handleToggleSession}
                onOpenSolveProblem={() => setShowSolveProblem(true)}
                onStartFocusSession={handleStartFocusSession}
              />
            )}

            {activeTab === 'action_plan' && (
              <ActionPlanView
                actionPlan={actionPlan}
                onUpdatePlan={handleUpdatePlan}
              />
            )}

            {activeTab === 'study_planner' && (
              <StudyPlannerView
                sessions={studySessions}
                onAddSession={handleAddSession}
                onToggleSession={handleToggleSession}
                onDeleteSession={handleDeleteSession}
              />
            )}

            {activeTab === 'assignments' && (
              <AssignmentManagerView
                assignments={assignments}
                onAddAssignment={handleAddAssignment}
                onUpdateStatus={handleUpdateAssignmentStatus}
                onDeleteAssignment={handleDeleteAssignment}
              />
            )}

            {activeTab === 'exams' && (
              <ExamPreparationView
                exams={exams}
                onAddExam={handleAddExam}
                onUpdateTopicStatus={handleUpdateTopicStatus}
                onAddTopic={handleAddTopicToExam}
              />
            )}

            {activeTab === 'ai_assistant' && <StudyAssistantView />}

            {activeTab === 'focus_timer' && (
              <TimeManagementView initialSubject={focusInitialSubject} />
            )}

            {activeTab === 'budget' && (
              <BudgetManagerView
                budgets={budgets}
                onAddBudget={handleAddBudget}
                onDeleteBudget={handleDeleteBudget}
              />
            )}

            {activeTab === 'resources' && (
              <ResourcesView
                resources={resources}
                onToggleBookmark={handleToggleResourceBookmark}
                onAddResource={handleAddResource}
              />
            )}

            {activeTab === 'career' && (
              <CareerPlannerView
                roadmaps={roadmaps}
                onToggleMilestone={handleToggleMilestone}
              />
            )}

            {activeTab === 'goals' && (
              <GoalsView
                goals={goals}
                onToggleTask={handleToggleGoalTask}
                onAddGoal={handleAddGoal}
                onDeleteGoal={handleDeleteGoal}
              />
            )}

            {activeTab === 'analytics' && <AnalyticsView />}

            {activeTab === 'admin' && (
              <AdminDashboardView
                resources={resources}
                onDeleteResource={handleDeleteResource}
                onAddResource={handleAddResource}
              />
            )}
          </main>
        </div>
      )}

      {/* Global Modals */}
      <SolveMyProblemModal
        isOpen={showSolveProblem}
        onClose={() => setShowSolveProblem(false)}
        onApplyToPlanner={handleApplyTasksFromTriage}
        currentAssignmentsCount={assignments.filter((a) => a.status !== 'completed').length}
        upcomingExamsCount={exams.length}
      />

      <DjangoInspectorModal
        isOpen={showDjangoInspector}
        onClose={() => setShowDjangoInspector(false)}
      />

      <AuthModal
        isOpen={showAuthModal}
        initialMode={authMode}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={(loggedUser) => setUser(loggedUser)}
      />
    </div>
  );
}

