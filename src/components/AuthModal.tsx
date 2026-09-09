import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  GraduationCap,
  Building,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup';
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  // Form Fields
  const [email, setEmail] = useState('alex.rivera@university.edu');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Alex Rivera');
  const [university, setUniversity] = useState('National Technical University');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [semester, setSemester] = useState('3rd Year / 5th Semester');
  const [academicGoals, setAcademicGoals] = useState('Maintain 3.8+ GPA and secure a SWE internship');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const studentUser: UserProfile = {
      id: 'student_1',
      name: mode === 'signup' ? name : 'Alex Rivera',
      email,
      university: mode === 'signup' ? university : 'National Technical University',
      department: mode === 'signup' ? department : 'Computer Science & Engineering',
      semester: mode === 'signup' ? semester : '3rd Year / 5th Semester',
      academicGoals: mode === 'signup' ? academicGoals : 'Maintain 3.8+ GPA',
      targetGpa: 3.85,
      currentGpa: 3.78,
      weakSubjects: ['Data Structures', 'Calculus III'],
      strongSubjects: ['Python', 'Database Management'],
      skills: ['Python', 'Django', 'React', 'SQL', 'Git'],
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    };

    onLoginSuccess(studentUser);
    onClose();
  };

  const handle1ClickDemo = () => {
    const demoStudent: UserProfile = {
      id: 'student_demo',
      name: 'Alex Rivera',
      email: 'alex.rivera@university.edu',
      university: 'National Technical University',
      department: 'Computer Science & Engineering',
      semester: '3rd Year / 5th Semester',
      academicGoals: 'Prepare for CSE final exams and secure Software Engineering Summer Internship.',
      targetGpa: 3.85,
      currentGpa: 3.78,
      weakSubjects: ['Data Structures (Tree Balancing)', 'Calculus III'],
      strongSubjects: ['Python', 'Database Management', 'Web Systems'],
      skills: ['Python', 'Django', 'TypeScript', 'React', 'Algorithms', 'SQL'],
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    };
    onLoginSuccess(demoStudent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-base">
                {mode === 'login' ? 'Student Sign In' : 'Create Student Account'}
              </h2>
              <p className="text-xs text-slate-500">Student Survival Hub</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Form */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Quick Demo 1-Click Button */}
          <button
            onClick={handle1ClickDemo}
            className="w-full rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50/50 p-3 text-xs font-bold text-indigo-900 transition-all hover:bg-indigo-100 hover:border-indigo-400 flex items-center justify-center gap-2 shadow-2xs"
          >
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <span>1-Click Student Demo Sign In (Alex Rivera)</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-2 text-[10px] uppercase font-bold text-slate-400 absolute">
              or enter credentials
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Rivera"
                      className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-3 text-xs focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      University
                    </label>
                    <input
                      type="text"
                      required
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder="University name"
                      className="w-full rounded-xl border border-slate-200 p-2 text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      required
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="Major / Dept"
                      className="w-full rounded-xl border border-slate-200 p-2 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Current Semester / Year
                  </label>
                  <input
                    type="text"
                    required
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    placeholder="3rd Year / 5th Semester"
                    className="w-full rounded-xl border border-slate-200 p-2 text-xs focus:outline-none"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Student Email (.edu or personal)
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-3 text-xs focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-3 text-xs focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition-all"
            >
              <span>{mode === 'login' ? 'Sign In to Hub' : 'Register Account'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          {/* Toggle between login / register */}
          <div className="text-center pt-2">
            {mode === 'login' ? (
              <p className="text-xs text-slate-500">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-bold text-indigo-600 hover:underline"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-500">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-indigo-600 hover:underline"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
