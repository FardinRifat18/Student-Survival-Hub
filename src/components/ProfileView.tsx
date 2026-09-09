import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Award,
  BookOpen,
  Target,
  FileText,
  Mail,
  Building,
  Save,
} from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onUpdateUser }) => {
  const [name, setName] = useState(user.name);
  const [university, setUniversity] = useState(user.university);
  const [department, setDepartment] = useState(user.department);
  const [semester, setSemester] = useState(user.semester);
  const [targetGpa, setTargetGpa] = useState(user.targetGpa);
  const [weakSubjectsInput, setWeakSubjectsInput] = useState(user.weakSubjects.join(', '));
  const [strongSubjectsInput, setStrongSubjectsInput] = useState(user.strongSubjects.join(', '));
  const [skillsInput, setSkillsInput] = useState(user.skills.join(', '));
  const [academicGoals, setAcademicGoals] = useState(user.academicGoals);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      university,
      department,
      semester,
      targetGpa,
      weakSubjects: weakSubjectsInput.split(',').map((s) => s.trim()).filter(Boolean),
      strongSubjects: strongSubjectsInput.split(',').map((s) => s.trim()).filter(Boolean),
      skills: skillsInput.split(',').map((s) => s.trim()).filter(Boolean),
      academicGoals,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Student Academic Profile</h1>
          <p className="mt-1 text-sm text-slate-600">
            Manage your university credentials, target GPA, skill inventory, and academic aspirations.
          </p>
        </div>

        {savedSuccess && (
          <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold text-emerald-800 animate-in fade-in">
            Profile Updated Successfully ✅
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Avatar & Basic Information */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col items-center text-center space-y-4">
            <div className="relative">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="h-28 w-28 rounded-3xl object-cover ring-4 ring-indigo-50 shadow-md"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-indigo-600 text-3xl font-black text-white shadow-md">
                  {user.name.charAt(0)}
                </div>
              )}
              <span className="absolute -bottom-2 -right-2 rounded-full bg-emerald-500 p-1.5 text-white ring-2 ring-white">
                <GraduationCap className="h-4 w-4" />
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">{user.name}</h3>
              <p className="text-xs text-slate-500">{user.email}</p>
              <span className="mt-2 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                {user.department}
              </span>
            </div>

            <div className="w-full border-t border-slate-100 pt-4 text-left space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-slate-400 shrink-0" />
                <span className="truncate">{user.university}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-slate-400 shrink-0" />
                <span>Target GPA: {user.targetGpa} / 4.00</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-slate-400 shrink-0" />
                <span>{user.semester}</span>
              </div>
            </div>
          </div>

          {/* Right 2 Columns: Editable Details */}
          <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Academic & Skill Credentials
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  University / College
                </label>
                <input
                  type="text"
                  required
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Department / Major
                </label>
                <input
                  type="text"
                  required
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Current Semester / Year
                </label>
                <input
                  type="text"
                  required
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Target GPA (0.00 - 4.00)
              </label>
              <input
                type="number"
                min={1}
                max={4}
                step={0.01}
                value={targetGpa}
                onChange={(e) => setTargetGpa(Number(e.target.value))}
                className="w-full sm:w-48 rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Weak Subjects (Needs Priority Planning)
                </label>
                <input
                  type="text"
                  value={weakSubjectsInput}
                  onChange={(e) => setWeakSubjectsInput(e.target.value)}
                  placeholder="Data Structures, Calculus"
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Strong Subjects (High Confidence)
                </label>
                <input
                  type="text"
                  value={strongSubjectsInput}
                  onChange={(e) => setStrongSubjectsInput(e.target.value)}
                  placeholder="Python, Database Systems"
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Technical Skills & Tools (Comma-separated)
              </label>
              <input
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="Python, Django, React, TypeScript, SQL, Git"
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Academic & Career Statement
              </label>
              <textarea
                rows={2}
                value={academicGoals}
                onChange={(e) => setAcademicGoals(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-indigo-700"
              >
                <Save className="h-4 w-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
