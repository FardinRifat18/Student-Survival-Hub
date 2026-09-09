export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export type TaskStatus = 'not_started' | 'in_progress' | 'completed';

export type ExamTopicStatus = 'mastered' | 'in_progress' | 'not_started';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  university: string;
  department: string;
  semester: string;
  studyGoals?: string;
  careerGoal?: string;
  targetGpa?: number;
  currentGpa?: number;
  weakSubjects?: string[];
  strongSubjects?: string[];
  academicGoals?: string;
  skills: string[];
  avatarUrl?: string;
  role?: 'student' | 'admin';
  createdAt?: string;
}

export interface Task {
  id: string;
  title: string;
  subject?: string;
  durationMinutes: number;
  priority: Priority;
  completed: boolean;
  dueDate?: string;
  date?: string; // YYYY-MM-DD
  timeSlot?: string;
}

export interface Assignment {
  id: string;
  title: string;
  course: string;
  description: string;
  dueDate: string; // ISO date string
  priority: Priority;
  status: TaskStatus;
  estimatedHours: number;
}

export interface ExamTopic {
  id: string;
  name: string;
  status: ExamTopicStatus;
}

export interface Exam {
  id: string;
  subject: string;
  courseCode: string;
  examDate: string; // ISO date string
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Hard';
  topics: ExamTopic[];
  notes?: string;
}

export interface StudySession {
  id: string;
  subject: string;
  date: string;
  startTime: string;
  durationMinutes: number;
  priority: Priority;
  completed: boolean;
  notes?: string;
}

export interface ActionPlanDayTask {
  id: string;
  title: string;
  subject: string;
  durationHours: number;
  priority: Priority;
  completed: boolean;
}

export interface ActionPlanDay {
  dayNumber: number;
  date: string;
  focusTitle: string;
  tasks: ActionPlanDayTask[];
}

export interface ActionPlan {
  id: string;
  goal: string;
  startDate: string;
  targetDate: string;
  subjects: string[];
  hoursPerDay: number;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  preferredTime: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  days: ActionPlanDay[];
  createdAt: string;
}

export interface PomodoroSettings {
  studyDuration: number; // minutes, default 25
  shortBreakDuration: number; // minutes, default 5
  longBreakDuration: number; // minutes, default 15
  sessionsBeforeLongBreak: number; // default 4
}

export interface FocusSessionLog {
  id: string;
  subject: string;
  durationMinutes: number;
  date: string;
  timestamp: string;
}

export type FocusSession = FocusSessionLog;

export interface BudgetItem {
  id: string;
  type: 'income' | 'expense';
  category: 'Pocket money' | 'Part-time job' | 'Scholarship' | 'Food' | 'Transport' | 'Education' | 'Entertainment' | 'Shopping' | 'Other';
  amount: number;
  title: string;
  date: string;
}

export type ResourceCategory =
  | 'Programming'
  | 'Mathematics'
  | 'Physics'
  | 'Database Systems'
  | 'Computer Networks'
  | 'Algorithms & DSA'
  | 'Technical English'
  | 'Career Development'
  | 'Interview Preparation';

export interface LearningResource {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  type?: 'Documentation' | 'Course' | 'Interactive' | 'Article' | 'Book';
  url: string;
  tags: string[];
  bookmarked?: boolean;
}

export type ResourceItem = LearningResource;

export interface CareerMilestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  skills?: string[];
  recommendedResources?: string[];
}

export interface CareerRoadmap {
  id: string;
  title?: string;
  role?: string;
  description: string;
  demand?: 'High' | 'Very High' | 'Trending';
  avgSalary?: string;
  averageSalary?: string;
  milestones: CareerMilestone[];
  recommendedProjects?: {
    title: string;
    description: string;
    techStack: string;
  }[];
}

export type CareerPath = CareerRoadmap;

export interface GoalTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface StudentGoal {
  id: string;
  title: string;
  targetDays?: number;
  targetDate?: string;
  category?: 'Academic' | 'Skill' | 'Health' | 'Career';
  startDate?: string;
  progressPercentage?: number;
  tasks: GoalTask[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'deadline' | 'exam' | 'session' | 'system';
  timestamp: string;
  read: boolean;
}

export interface ProblemSolution {
  problemSummary: string;
  doFirst: string;
  priorityLevel: Priority;
  estimatedTime: string;
  schedule: { time: string; activity: string }[];
  actionPlan: string[];
  calmingAdvice: string;
}

export interface ChatMessage {
  id: string;
  role?: 'user' | 'assistant';
  sender?: 'user' | 'ai';
  text: string;
  timestamp: string;
}


