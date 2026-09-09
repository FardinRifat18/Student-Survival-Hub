from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from .models import (
    StudentProfile, Subject, Assignment, Exam, ExamTopic,
    StudySession, ActionPlan, BudgetItem, LearningResource,
    StudentGoal, GoalTask, Notification
)
import os

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def solve_my_problem_view(request):
    """
    Global 'Solve My Problem' triage engine in Django.
    Analyzes urgent student academic dilemma and outputs schedule, action plan, and order of priority.
    """
    problem = request.data.get('problem', '')
    if not problem:
        return Response({'error': 'Problem text is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Analyze urgency
    is_urgent = any(w in problem.lower() for w in ['tomorrow', 'today', 'overdue', 'exam', 'failing'])
    
    return Response({
        'problemSummary': f"Triage resolution for: {problem[:100]}...",
        'doFirst': "Block 90 minutes with notification mute to complete nearest submission.",
        'priorityLevel': 'urgent' if is_urgent else 'high',
        'estimatedTime': '3.5 - 4.5 hours structured study',
        'schedule': [
            {'time': '09:00 - 10:30', 'activity': 'Draft nearest assignment core requirements'},
            {'time': '10:45 - 12:00', 'activity': 'Review lecture slides & high-yield exam topics'},
            {'time': '14:00 - 15:30', 'activity': 'Practice problem sets & run sample tests'}
        ],
        'actionPlan': [
            '1. Clear desk and open only current course materials.',
            '2. Work in 25-minute Pomodoro bursts.',
            '3. Submit partial drafts early to guarantee baseline grades.',
            '4. Reach out to course TA for blockers.'
        ],
        'calmingAdvice': 'Deep breath: One completed task restores agency. Start the first 10 minutes now.'
    })

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_student_view(request):
    data = request.data
    username = data.get('email')
    password = data.get('password')
    name = data.get('name', 'Student')
    
    if not username or not password:
        return Response({'error': 'Email and password are required.'}, status=400)
        
    if User.objects.filter(username=username).exists():
        return Response({'error': 'A user with this email already exists.'}, status=400)
        
    user = User.objects.create_user(username=username, email=username, password=password, first_name=name)
    profile = StudentProfile.objects.create(
        user=user,
        university=data.get('university', 'Metropolitan Institute of Technology'),
        department=data.get('department', 'Computer Science & Engineering'),
        semester=data.get('semester', '1st Semester'),
        study_goals=data.get('studyGoals', 'Maintain high GPA and master algorithms.')
    )
    return Response({'message': 'Registration successful', 'userId': user.id})
