import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    appName: "Student Survival Hub",
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

// AI Endpoint 1: "Solve My Problem" - Global Student Dilemma Triage
app.post("/api/ai/solve-problem", async (req, res) => {
  const { problem, currentContext } = req.body;

  if (!problem || typeof problem !== "string") {
    return res.status(400).json({ error: "Problem description is required." });
  }

  // If Gemini API is available, generate smart recommendations
  if (ai) {
    try {
      const prompt = `You are the lead academic advisor and student survival strategist in "Student Survival Hub".
A student shared this urgent academic problem:
"${problem}"

Context of their upcoming deadlines and exams:
${JSON.stringify(currentContext || {})}

Analyze the problem thoroughly and return a valid JSON object matching this exact schema:
{
  "problemSummary": "A concise 1-sentence rephrasing of their core challenge",
  "doFirst": "The single most critical step they must start in the next 30 minutes",
  "priorityLevel": "urgent" | "high" | "medium",
  "estimatedTime": "Estimated total hours to resolve or get under control (e.g. '3.5 hours today')",
  "schedule": [
    { "time": "e.g. 09:00 - 10:30", "activity": "Specific focused action" },
    { "time": "e.g. 10:45 - 12:00", "activity": "Second milestone" },
    { "time": "e.g. 13:00 - 14:30", "activity": "Third milestone" }
  ],
  "actionPlan": [
    "Step 1: Immediate triage...",
    "Step 2: Core work...",
    "Step 3: Verification & Submission..."
  ],
  "calmingAdvice": "An encouraging, scientifically backed study mindset tip for student stress."
}
Return ONLY pure JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.4,
        },
      });

      const responseText = response.text || "{}";
      const parsed = JSON.parse(responseText);
      return res.json(parsed);
    } catch (err) {
      console.warn("Gemini solve-problem error, falling back to heuristic engine:", err);
    }
  }

  // Intelligent heuristic fallback
  const isUrgent = problem.toLowerCase().includes("tomorrow") || problem.toLowerCase().includes("today") || problem.toLowerCase().includes("overdue") || problem.toLowerCase().includes("exam");
  return res.json({
    problemSummary: `Tackling multi-deadline overload: "${problem.slice(0, 90)}..."`,
    doFirst: "Block the next 90 minutes with zero distractions to finish the assignment due earliest.",
    priorityLevel: isUrgent ? "urgent" : "high",
    estimatedTime: "4 - 5 hours across 2 focused sessions",
    schedule: [
      { time: "Next 45 mins", activity: "Triage & complete the nearest assignment introduction and core requirements." },
      { time: "15 min Break", activity: "Hydrate, step away from screens, reset attention." },
      { time: "Next 90 mins", activity: "High-yield exam review: practice high-frequency problem sets." },
      { time: "Evening 60 mins", activity: "Outline remaining tasks and draft submissions for peer review." },
    ],
    actionPlan: [
      "1. Stop multitasking: Pick the closest due date and ignore other notifications.",
      "2. Use Pomodoro intervals (25m study / 5m break) to avoid cognitive burnout.",
      "3. Ask your professor or TA for office hour clarification on difficult concepts early.",
      "4. Submit an 85% finished project rather than taking a zero on a deadline.",
    ],
    calmingAdvice: "Remember: Panic inflates difficulty. You don't have to finish everything at once—you just have to complete the next 25-minute block.",
  });
});

// AI Endpoint 2: Smart Study Assistant
app.post("/api/ai/study-assistant", async (req, res) => {
  const { query, mode, subject } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  if (ai) {
    try {
      let systemPrompt = "You are an expert university tutor in Computer Science, Engineering, Mathematics, and Sciences.";
      if (mode === "mcqs") {
        systemPrompt += " Generate 3-5 multiple-choice questions with answer keys, explanations, and difficulty ratings.";
      } else if (mode === "flashcards") {
        systemPrompt += " Generate a set of high-yield flashcard questions and answers formatted clearly.";
      } else if (mode === "summary") {
        systemPrompt += " Provide a high-impact summary with key formulas, algorithmic complexity, and key takeaways.";
      } else if (mode === "explain") {
        systemPrompt += " Explain the concept clearly using intuitive real-world analogies, step-by-step logic, code snippets (if applicable), time/space complexity, and practical tips.";
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: `${systemPrompt}\n\nSubject: ${subject || "Computer Science"}\nStudent Prompt: ${query}`,
        config: {
          temperature: 0.5,
        },
      });

      return res.json({ response: response.text || "No response generated." });
    } catch (err) {
      console.warn("Gemini study-assistant error, falling back:", err);
    }
  }

  // Fallback response generator
  return res.json({
    response: `### 🎓 Smart Study Assistant (${subject || "Computer Science"} Tutoring)

**Topic:** ${query}

#### 1. Core Concept Overview
In computer science and engineering, mastering **${query}** requires understanding the foundational data structures, state changes, and trade-offs.

* **Key Principle:** Break down inputs into subproblems. Ensure boundary conditions (such as empty collections, edge values, or null pointers) are handled first.
* **Complexity:** Typically aims for $O(log N)$ or $O(N)$ operations with minimal auxiliary memory $O(1)$ or $O(N)$.

#### 2. Quick Practice Check
* **Q1:** What is the primary advantage of this approach over a brute-force approach?
* *Answer:* It avoids redundant recalculations or unnecessary comparisons by leveraging ordered states or memoized caches.

*Need deeper code walkthroughs or practice MCQs? Try asking: "Give me 3 practice MCQs on this topic" or "Write Python implementation with tests".*`,
  });
});

// AI Endpoint 3: Personalized Action Plan Generator
app.post("/api/ai/generate-action-plan", async (req, res) => {
  const { goal, subjects, hoursPerDay, daysCount, skillLevel, preferredTime } = req.body;

  const targetDays = Math.min(Math.max(Number(daysCount) || 14, 3), 30);
  const hours = Number(hoursPerDay) || 3;

  if (ai) {
    try {
      const prompt = `Create a detailed day-by-day student study action plan for:
Goal: "${goal || "Prepare for CSE Final Exam"}"
Target Duration: ${targetDays} days
Subjects: ${(subjects || []).join(", ") || "Data Structures, Database Systems, Algorithms"}
Study hours per day: ${hours} hours
Skill level: ${skillLevel || "Intermediate"}
Preferred study time: ${preferredTime || "Morning"}

Generate a JSON object matching this schema:
{
  "goal": "${goal || "CSE Exam Preparation"}",
  "days": [
    {
      "dayNumber": 1,
      "date": "Day 1",
      "focusTitle": "Focus area title",
      "tasks": [
        {
          "id": "task_1_1",
          "title": "Specific task title",
          "subject": "Subject name",
          "durationHours": 1.5,
          "priority": "high",
          "completed": false
        }
      ]
    }
  ]
}
Include at least 5 representative structured days. Return pure JSON only.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json(parsed);
    } catch (err) {
      console.warn("Action plan generation fallback:", err);
    }
  }

  // Fallback procedural plan generator
  const generatedDays = [];
  const sampleSubjects = subjects && subjects.length ? subjects : ["Data Structures", "Algorithms", "Databases", "Computer Networks"];
  for (let i = 1; i <= Math.min(targetDays, 7); i++) {
    const subj1 = sampleSubjects[(i - 1) % sampleSubjects.length];
    const subj2 = sampleSubjects[i % sampleSubjects.length];
    generatedDays.push({
      dayNumber: i,
      date: `Day ${i}`,
      focusTitle: `${subj1} Concepts & ${subj2} Practice`,
      tasks: [
        {
          id: `plan_task_${i}_1`,
          title: `Deep review: ${subj1} core theorems and lecture notes`,
          subject: subj1,
          durationHours: Math.round((hours * 0.6) * 10) / 10,
          priority: i % 2 === 0 ? "high" : "urgent",
          completed: i === 1,
        },
        {
          id: `plan_task_${i}_2`,
          title: `Solve 10 problem sets & code walkthrough in ${subj2}`,
          subject: subj2,
          durationHours: Math.round((hours * 0.4) * 10) / 10,
          priority: "medium",
          completed: false,
        },
      ],
    });
  }

  return res.json({
    goal: goal || `Prepare for ${sampleSubjects[0]} in ${targetDays} days`,
    days: generatedDays,
  });
});

// AI Endpoint 4: Budget "How Can I Save More?" Advice
app.post("/api/ai/budget-advice", async (req, res) => {
  const { income, expenses, transactions } = req.body;

  if (ai) {
    try {
      const prompt = `You are a financial wellness advisor for university students.
Current Monthly Income: $${income}
Current Monthly Expenses: $${expenses}
Net Balance: $${Number(income) - Number(expenses)}
Recent Spending entries:
${JSON.stringify(transactions || [])}

Provide 4 practical, high-impact money-saving suggestions tailored specifically for student lifestyles (books, food, transportation, streaming, campus deals).
Return pure JSON in format:
{
  "summary": "1 sentence financial health check",
  "tips": [
    { "category": "Category", "tip": "Actionable tip", "potentialSavings": "$30 - $50/mo" }
  ],
  "challenge": "A fun 7-day student savings challenge"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      return res.json(JSON.parse(response.text || "{}"));
    } catch (err) {
      console.warn("Budget advice fallback:", err);
    }
  }

  return res.json({
    summary: `You are spending $${expenses} against $${income} monthly income. You have an estimated ${Math.max(0, Math.round(((Number(income) - Number(expenses)) / (Number(income) || 1)) * 100))}% savings margin.`,
    tips: [
      { category: "Education", tip: "Never buy physical textbooks retail—use university library reserves, open-access OpenStax PDFs, or rent via Chegg.", potentialSavings: "$60 - $120/mo" },
      { category: "Food & Dining", tip: "Meal-prep campus lunches 3 days a week instead of buying cafeteria fast food daily.", potentialSavings: "$80 - $140/mo" },
      { category: "Transport", tip: "Activate university semester transit subsidies or carpool with classmates for off-campus housing.", potentialSavings: "$30 - $50/mo" },
      { category: "Tech & Software", tip: "Use GitHub Student Developer Pack to get free JetBrains, AWS credits, and Copilot tools.", potentialSavings: "$40/mo" },
    ],
    challenge: "7-Day No-Takeout Challenge: Brew your own coffee and cook dinners at home this week to bank $35 directly into savings.",
  });
});

// Vite Middleware / Static Serving
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Student Survival Hub server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
