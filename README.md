# 🎓 Student Survival Hub

> **Plan Better • Study Smarter • Achieve More 🚀**

**Student Survival Hub** is a full-stack web application designed to help students manage their academic life, daily tasks, study plans, deadlines, budget, learning resources, and career goals from one centralized platform.

The project is built with **HTML, CSS, JavaScript, Python, Django, and SQL**.

---

## 📌 About The Project

Students often struggle with managing multiple assignments, exams, deadlines, study schedules, personal budgets, and career planning.

**Student Survival Hub** aims to solve these problems by providing an easy-to-use digital platform where students can organize their academic and personal activities efficiently.

---

## ✨ Key Features

### 📚 Study Planner

* Create personalized study plans
* Organize subjects and study sessions
* Track study progress
* Manage daily learning goals

### 📝 Assignment Manager

* Add and manage assignments
* Set assignment deadlines
* Track pending and completed assignments
* Priority-based task organization

### 🗓️ Exam Preparation

* Create exam schedules
* Add important exam dates
* Prepare subject-wise study plans
* Track preparation progress

### ⏰ Time Management

* Daily task management
* Productivity tracking
* Study session planning
* Important deadline reminders

### 💰 Budget Manager

* Track daily expenses
* Manage monthly student budgets
* Categorize expenses
* Monitor spending habits

### 📖 Learning Resources

* Store useful learning materials
* Organize resources by subject
* Add links to educational resources
* Quick access to study materials

### 🎯 Career Planner

* Set career goals
* Track skills
* Create learning roadmaps
* Manage career-related tasks

### 📊 Student Dashboard

* Overview of assignments
* Upcoming exams
* Study progress
* Tasks and deadlines
* Budget overview

### 🔐 Authentication

* Student registration
* Secure login/logout
* User profile
* Personalized dashboard

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* Responsive Web Design

### Backend

* Python
* Django
* Django MVT Architecture

### Database

* SQL
* Django ORM

### Development Tools

* Visual Studio Code
* Git
* GitHub

---

## 🏗️ Project Architecture

```text
Student Survival Hub
│
├── Frontend
│   ├── HTML
│   ├── CSS
│   └── JavaScript
│
├── Backend
│   ├── Python
│   └── Django
│
├── Database
│   └── SQL
│
└── Authentication
    ├── Login
    ├── Registration
    └── User Profile
```

---

## 📂 Project Structure

```text
student-survival-hub/
│
├── manage.py
│
├── student_survival_hub/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── accounts/
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   └── forms.py
│
├── dashboard/
│   ├── models.py
│   ├── views.py
│   └── urls.py
│
├── planner/
│   ├── models.py
│   ├── views.py
│   └── urls.py
│
├── assignments/
│   ├── models.py
│   ├── views.py
│   └── urls.py
│
├── exams/
│   ├── models.py
│   ├── views.py
│   └── urls.py
│
├── budget/
│   ├── models.py
│   ├── views.py
│   └── urls.py
│
├── resources/
│   ├── models.py
│   ├── views.py
│   └── urls.py
│
├── career/
│   ├── models.py
│   ├── views.py
│   └── urls.py
│
├── templates/
│
├── static/
│   ├── css/
│   ├── js/
│   └── images/
│
├── requirements.txt
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/student-survival-hub.git
```

### 2. Navigate to the Project

```bash
cd student-survival-hub
```

### 3. Create a Virtual Environment

```bash
python -m venv venv
```

### 4. Activate Virtual Environment

**Windows:**

```bash
venv\Scripts\activate
```

**macOS/Linux:**

```bash
source venv/bin/activate
```

### 5. Install Dependencies

```bash
pip install -r requirements.txt
```

### 6. Apply Database Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 7. Create Admin Account

```bash
python manage.py createsuperuser
```

### 8. Run the Development Server

```bash
python manage.py runserver
```

Open your browser and visit:

```text
http://127.0.0.1:8000/
```

---

## 🔑 Environment Variables

For production, sensitive configuration should be stored in environment variables.

Example:

```env
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=your-database-url
```

> Never upload your real `SECRET_KEY`, database password, API keys, or other sensitive credentials to GitHub.

---

## 📊 Future Improvements

The project can be extended with:

* 🤖 AI Study Assistant
* 🔔 Smart Notifications
* 📅 Google Calendar Integration
* 📱 Mobile Application
* 🌙 Dark Mode
* 📈 Advanced Analytics
* 🧠 AI-powered Study Recommendations
* 📄 Resume Builder
* 💼 Internship & Job Tracker
* 👥 Student Community
* 🏆 Gamification & Achievement System

---

## 🎯 Project Goals

The main goal of **Student Survival Hub** is to create a single platform that helps students:

* Stay organized
* Save time
* Improve productivity
* Manage academic responsibilities
* Control their spending
* Discover useful resources
* Build career-focused skills

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/new-feature
```

3. Make your changes
4. Commit your changes

```bash
git commit -m "Add new feature"
```

5. Push to your branch

```bash
git push origin feature/new-feature
```

6. Open a Pull Request

---

## 📜 License

This project is developed for educational and portfolio purposes.

You can add a specific license such as **MIT License** if you want to make the project open source.

---

## 👨‍💻 Developer

**Student Survival Hub**

Built with ❤️ using:

**HTML • CSS • JavaScript • Python • Django • SQL**

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

> **Student Survival Hub — Your Digital Companion for Student Life. 🎓🚀**
