from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    university = models.CharField(max_length=255, default='Metropolitan Institute of Technology')
    department = models.CharField(max_length=255, default='Computer Science & Engineering')
    semester = models.CharField(max_length=100, default='5th Semester / Year 3')
    study_goals = models.TextField(blank=True, default='Maintain 3.8+ GPA, master Data Structures & System Design')
    career_goal = models.CharField(max_length=255, default='Full-Stack Software Engineer')
    skills = models.JSONField(default=list, blank=True)
    avatar_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.get_full_name() or self.user.username} ({self.department})"

class Subject(models.Model):
    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=255)
    credit_hours = models.PositiveIntegerField(default=3)
    color = models.CharField(max_length=50, default='indigo')

    def __str__(self):
        return f"{self.code} - {self.name}"

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

    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='assignments')
    title = models.CharField(max_length=255)
    course = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    due_date = models.DateTimeField()
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='medium')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='not_started')
    estimated_hours = models.DecimalField(max_digits=5, decimal_places=2, default=2.0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['due_date']

    def __str__(self):
        return f"{self.title} ({self.course})"

class Exam(models.Model):
    DIFFICULTY_CHOICES = [
        ('Easy', 'Easy'),
        ('Moderate', 'Moderate'),
        ('Challenging', 'Challenging'),
        ('Hard', 'Hard'),
    ]

    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='exams')
    subject = models.CharField(max_length=255)
    course_code = models.CharField(max_length=50)
    exam_date = models.DateTimeField()
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, default='Moderate')
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ['exam_date']

    def __str__(self):
        return f"{self.course_code}: {self.subject}"

class ExamTopic(models.Model):
    STATUS_CHOICES = [
        ('mastered', 'Mastered'),
        ('in_progress', 'In Progress'),
        ('not_started', 'Not Started'),
    ]

    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='topics')
    name = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='not_started')

    def __str__(self):
        return f"{self.name} [{self.status}]"

class StudySession(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='study_sessions')
    subject = models.CharField(max_length=255)
    date = models.DateField(default=timezone.now)
    start_time = models.TimeField()
    duration_minutes = models.PositiveIntegerField(default=60)
    priority = models.CharField(max_length=20, default='medium')
    completed = models.BooleanField(default=False)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ['date', 'start_time']

class ActionPlan(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='action_plans')
    goal = models.CharField(max_length=255)
    start_date = models.DateField(default=timezone.now)
    target_date = models.DateField()
    subjects = models.JSONField(default=list)
    hours_per_day = models.DecimalField(max_digits=4, decimal_places=1, default=3.0)
    skill_level = models.CharField(max_length=50, default='Intermediate')
    plan_data = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)

class BudgetItem(models.Model):
    TYPE_CHOICES = [
        ('income', 'Income'),
        ('expense', 'Expense'),
    ]
    CATEGORY_CHOICES = [
        ('Pocket money', 'Pocket money'),
        ('Part-time job', 'Part-time job'),
        ('Scholarship', 'Scholarship'),
        ('Food', 'Food'),
        ('Transport', 'Transport'),
        ('Education', 'Education'),
        ('Entertainment', 'Entertainment'),
        ('Shopping', 'Shopping'),
        ('Other', 'Other'),
    ]

    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='budget_items')
    item_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    title = models.CharField(max_length=255)
    date = models.DateField(default=timezone.now)

    class Meta:
        ordering = ['-date']

class LearningResource(models.Model):
    CATEGORY_CHOICES = [
        ('Programming', 'Programming'),
        ('Mathematics', 'Mathematics'),
        ('Physics', 'Physics'),
        ('Database', 'Database'),
        ('Networking', 'Networking'),
        ('Algorithms', 'Algorithms'),
        ('English', 'English'),
        ('Career', 'Career'),
        ('Interview Preparation', 'Interview Preparation'),
    ]
    DIFFICULTY_CHOICES = [
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, default='Beginner')
    url = models.URLField()
    tags = models.JSONField(default=list)
    bookmarks = models.ManyToManyField(User, related_name='bookmarked_resources', blank=True)

class StudentGoal(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='goals')
    title = models.CharField(max_length=255)
    target_days = models.PositiveIntegerField(default=30)
    start_date = models.DateField(default=timezone.now)

class GoalTask(models.Model):
    goal = models.ForeignKey(StudentGoal, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)

class Notification(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=255)
    message = models.TextField()
    notification_type = models.CharField(max_length=50, default='deadline')
    timestamp = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)
