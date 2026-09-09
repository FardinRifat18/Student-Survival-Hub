"""
URL configuration for Student Survival Hub Django REST Framework backend.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AssignmentViewSet,
    ExamViewSet,
    StudySessionViewSet,
    ActionPlanViewSet,
    BudgetItemViewSet,
    LearningResourceViewSet,
    register_student,
    solve_my_problem_view,
    generate_action_plan_view,
    study_assistant_chat_view,
    budget_advisor_view,
)

router = DefaultRouter()
router.register(r'assignments', AssignmentViewSet, basename='assignment')
router.register(r'exams', ExamViewSet, basename='exam')
router.register(r'sessions', StudySessionViewSet, basename='study-session')
router.register(r'action-plans', ActionPlanViewSet, basename='action-plan')
router.register(r'budget', BudgetItemViewSet, basename='budget')
router.register(r'resources', LearningResourceViewSet, basename='resource')

urlpatterns = [
    # REST API CRUD Endpoints
    path('api/', include(router.urls)),

    # Auth Endpoints
    path('api/auth/register/', register_student, name='register-student'),

    # Core AI & Triage Endpoints
    path('api/ai/solve-problem/', solve_my_problem_view, name='solve-my-problem'),
    path('api/ai/generate-action-plan/', generate_action_plan_view, name='generate-action-plan'),
    path('api/ai/study-assistant/', study_assistant_chat_view, name='study-assistant'),
    path('api/ai/budget-advice/', budget_advisor_view, name='budget-advice'),
]
