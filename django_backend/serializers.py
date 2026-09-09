"""
Django REST Framework Serializers for Student Survival Hub.
Provides serialization for Students, Action Plans, Assignments, Exams, Budgets, and Problem Triage.
"""
from rest_framework import serializers
from .models import (
    StudentProfile,
    AcademicGoal,
    Assignment,
    Exam,
    ExamTopic,
    StudySession,
    ActionPlan,
    BudgetItem,
    LearningResource,
    CareerMilestone,
    ProblemTriageLog,
)


class StudentProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)

    class Meta:
        model = StudentProfile
        fields = [
            'id',
            'username',
            'email',
            'university',
            'department',
            'semester',
            'target_gpa',
            'current_gpa',
            'weak_subjects',
            'strong_subjects',
            'skills',
            'academic_goals',
            'created_at',
            'updated_at',
        ]


class AssignmentSerializer(serializers.ModelSerializer):
    warning_status = serializers.SerializerMethodField()

    class Meta:
        model = Assignment
        fields = [
            'id',
            'title',
            'course',
            'description',
            'due_date',
            'priority',
            'status',
            'estimated_hours',
            'warning_status',
            'created_at',
        ]

    def get_warning_status(self, obj):
        return obj.get_warning_status()


class ExamTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamTopic
        fields = ['id', 'name', 'status']


class ExamSerializer(serializers.ModelSerializer):
    topics = ExamTopicSerializer(many=True, read_only=True)
    days_until_exam = serializers.SerializerMethodField()
    preparation_percentage = serializers.SerializerMethodField()

    class Meta:
        model = Exam
        fields = [
            'id',
            'subject',
            'course_code',
            'exam_date',
            'difficulty',
            'preparation_level',
            'preparation_percentage',
            'days_until_exam',
            'notes',
            'topics',
        ]

    def get_days_until_exam(self, obj):
        return obj.days_until_exam()

    def get_preparation_percentage(self, obj):
        return obj.calculate_preparation_percentage()


class StudySessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudySession
        fields = [
            'id',
            'subject',
            'session_date',
            'start_time',
            'duration_minutes',
            'priority',
            'completed',
            'notes',
        ]


class ActionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActionPlan
        fields = [
            'id',
            'goal',
            'subjects',
            'hours_per_day',
            'start_date',
            'target_date',
            'skill_level',
            'preferred_time',
            'schedule_json',
            'is_active',
            'created_at',
        ]


class BudgetItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetItem
        fields = [
            'id',
            'item_type',
            'category',
            'amount',
            'description',
            'entry_date',
        ]


class LearningResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningResource
        fields = [
            'id',
            'title',
            'category',
            'resource_type',
            'url',
            'description',
            'tags',
            'is_verified',
        ]


class ProblemTriageLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProblemTriageLog
        fields = [
            'id',
            'problem_text',
            'triage_response',
            'priority_level',
            'estimated_time',
            'created_at',
        ]
