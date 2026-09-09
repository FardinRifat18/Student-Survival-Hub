import React, { useState } from 'react';
import {
  Code2,
  X,
  Copy,
  Check,
  FileCode,
  Layers,
  Database,
  Terminal,
  ShieldCheck,
} from 'lucide-react';

interface DjangoInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DjangoInspectorModal: React.FC<DjangoInspectorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'models' | 'views' | 'serializers' | 'urls'>('models');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const codeSnippets: Record<string, string> = {
    models: `# django_backend/models.py
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    university = models.CharField(max_length=200, default='State University')
    department = models.CharField(max_length=150, default='Computer Science & Engineering')
    semester = models.CharField(max_length=50, default='Fall 2026')
    target_gpa = models.DecimalField(max_digits=3, decimal_places=2, default=3.80)
    current_gpa = models.DecimalField(max_digits=3, decimal_places=2, default=3.75)
    weak_subjects = models.JSONField(default=list, blank=True)
    strong_subjects = models.JSONField(default=list, blank=True)
    skills = models.JSONField(default=list, blank=True)
    academic_goals = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user.username} ({self.department})"

class Assignment(models.Model):
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    ]
    STATUS_CHOICES = [
        ('not_started', 'Not Started'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ]

    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='assignments')
    title = models.CharField(max_length=255)
    course = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    due_date = models.DateTimeField()
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='not_started')
    estimated_hours = models.FloatField(default=2.0)

    def get_warning_status(self):
        diff = (self.due_date - timezone.now()).total_seconds() / 86400.0
        if diff <= 1:
            return "red_urgent"
        elif diff <= 7:
            return "yellow_soon"
        return "green_normal"

class Exam(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='exams')
    subject = models.CharField(max_length=200)
    course_code = models.CharField(max_length=50)
    exam_date = models.DateTimeField()
    difficulty = models.CharField(max_length=50, default='Moderate')
    preparation_level = models.IntegerField(default=50)

class ExamTopic(models.Model):
    STATUS_CHOICES = [
        ('mastered', 'Mastered'),
        ('in_progress', 'In Progress'),
        ('not_started', 'Not Started'),
    ]
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='topics')
    name = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='not_started')`,

    views: `# django_backend/views.py
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Assignment, Exam, ActionPlan, BudgetItem
from .serializers import AssignmentSerializer, ExamSerializer
import os, json
from google import genai

ai = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

@api_view(['POST'])
def solve_my_problem_view(request):
    """
    Core AI Academic Triage Endpoint requested in Section 21.
    Analyzes student problem and recommends priority, time, and schedule.
    """
    problem = request.data.get('problem', '')
    if not problem:
        return Response({'error': 'Problem statement is required'}, status=status.HTTP_400_BAD_REQUEST)

    prompt = f"""
    Act as the ultimate University Academic Advisor and Triage Specialist.
    Student problem: {problem}
    Output valid JSON:
    - problemSummary: string
    - doFirst: string
    - priorityLevel: 'urgent' | 'high' | 'medium' | 'low'
    - estimatedTime: string
    - schedule: array of objects { time, activity }
    - actionPlan: array of strings
    - calmingAdvice: string
    """
    response = ai.models.generate_content(
        model='gemini-3.8-flash',
        contents=prompt,
        config={'response_mime_type': 'application/json'}
    )
    return Response(json.loads(response.text))`,

    serializers: `# django_backend/serializers.py
from rest_framework import serializers
from .models import StudentProfile, Assignment, Exam, ExamTopic, BudgetItem

class AssignmentSerializer(serializers.ModelSerializer):
    warning_status = serializers.SerializerMethodField()

    class Meta:
        model = Assignment
        fields = [
            'id', 'title', 'course', 'description', 'due_date',
            'priority', 'status', 'estimated_hours', 'warning_status'
        ]

    def get_warning_status(self, obj):
        return obj.get_warning_status()

class ExamSerializer(serializers.ModelSerializer):
    days_until_exam = serializers.SerializerMethodField()
    preparation_percentage = serializers.SerializerMethodField()

    class Meta:
        model = Exam
        fields = ['id', 'subject', 'course_code', 'exam_date', 'days_until_exam', 'preparation_percentage']

    def get_days_until_exam(self, obj):
        return obj.days_until_exam()`,

    urls: `# django_backend/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AssignmentViewSet,
    ExamViewSet,
    solve_my_problem_view,
    generate_action_plan_view,
)

router = DefaultRouter()
router.register(r'assignments', AssignmentViewSet)
router.register(r'exams', ExamViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/ai/solve-problem/', solve_my_problem_view, name='solve-problem'),
    path('api/ai/generate-action-plan/', generate_action_plan_view, name='action-plan'),
]`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-900 px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  Python & Django Architecture
                </h2>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                  Django REST Framework
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Models, Serializers, Views, and URL routing designed for full-stack student survival.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Switcher & Copy Action */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-2.5">
          <div className="flex items-center gap-2">
            {(['models', 'views', 'serializers', 'urls'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}.py
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied Python Code</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy File</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content View */}
        <div className="flex-1 overflow-y-auto bg-slate-950 p-6 font-mono text-xs text-slate-200 leading-relaxed">
          <pre className="whitespace-pre">
            <code>{codeSnippets[activeTab]}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-white px-6 py-3.5 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Fully configured in <code className="text-indigo-600 font-bold">/django_backend/</code></span>
          </span>
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-4 py-2 font-bold text-white hover:bg-slate-800"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
