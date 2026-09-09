import {
  UserProfile,
  Assignment,
  Exam,
  StudySession,
  ActionPlan,
  BudgetItem,
  LearningResource,
  CareerPath,
  StudentGoal,
  NotificationItem,
} from '../types';

export const initialUser: UserProfile = {
  id: 'usr_student_01',
  name: 'Alex Rivera',
  email: 'alex.rivera@campus.edu',
  university: 'Metropolitan Institute of Technology',
  department: 'Computer Science & Engineering',
  semester: '5th Semester / Year 3',
  studyGoals: 'Maintain 3.8+ GPA, master Data Structures & System Design, land a summer SWE internship.',
  careerGoal: 'Full-Stack Software Engineer',
  skills: ['JavaScript', 'Python', 'React', 'Data Structures', 'SQL', 'Git'],
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'student',
  createdAt: '2026-01-15T09:00:00Z',
};

export const initialAssignments: Assignment[] = [
  {
    id: 'asg_01',
    title: 'Data Structures: Red-Black Tree Implementation',
    course: 'CSE 263 - Data Structures & Algorithms',
    description: 'Implement node insertions, rotations, deletions, and verification tests in C++ or Python.',
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    priority: 'high',
    status: 'in_progress',
    estimatedHours: 4,
  },
  {
    id: 'asg_02',
    title: 'Database Systems: E-Commerce Schema & Normalization',
    course: 'CSE 310 - Database Management',
    description: 'Design 3NF relational schema, write 15 complex SQL queries with joins and subqueries.',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days
    priority: 'urgent',
    status: 'not_started',
    estimatedHours: 6,
  },
  {
    id: 'asg_03',
    title: 'Computer Networks: Packet Sniffer Analysis',
    course: 'CSE 340 - Computer Networks',
    description: 'Analyze Wireshark PCAP capture files for TCP 3-way handshake and HTTP/HTTPS headers.',
    dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days
    priority: 'medium',
    status: 'not_started',
    estimatedHours: 3,
  },
  {
    id: 'asg_04',
    title: 'Discrete Mathematics: Graph Theory Problem Set 4',
    course: 'MATH 205 - Discrete Mathematics',
    description: 'Eulerian vs Hamiltonian paths proofs, planar graph coloring theorems.',
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'medium',
    status: 'completed',
    estimatedHours: 5,
  },
];

export const initialExams: Exam[] = [
  {
    id: 'ex_01',
    subject: 'Data Structures & Algorithms',
    courseCode: 'CSE 263',
    examDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000).toISOString(), // 12 days 14 hours
    difficulty: 'Hard',
    notes: 'Comprehensive exam covering all data structures and asymptotic analysis. Room 402B.',
    topics: [
      { id: 't1', name: 'Array & Dynamic Arrays', status: 'mastered' },
      { id: 't2', name: 'Linked List (Singly, Doubly, Circular)', status: 'mastered' },
      { id: 't3', name: 'Stack & Monotonic Stack', status: 'in_progress' },
      { id: 't4', name: 'Queue & Priority Queue / Heap', status: 'not_started' },
      { id: 't5', name: 'Binary Search Tree & AVL / Red-Black', status: 'not_started' },
      { id: 't6', name: 'Graphs (BFS, DFS, Dijkstra, A*)', status: 'not_started' },
    ],
  },
  {
    id: 'ex_02',
    subject: 'Database Management Systems',
    courseCode: 'CSE 310',
    examDate: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000).toISOString(),
    difficulty: 'Challenging',
    notes: 'Focus on ACID properties, B+ Tree indexing, and Transaction Concurrency.',
    topics: [
      { id: 't21', name: 'Relational Algebra & Normalization', status: 'mastered' },
      { id: 't22', name: 'B+ Tree & Hash Indexing', status: 'in_progress' },
      { id: 't23', name: 'Concurrency & 2-Phase Locking', status: 'not_started' },
      { id: 't24', name: 'Recovery (WAL & ARIES)', status: 'not_started' },
    ],
  },
];

export const initialStudySessions: StudySession[] = [
  {
    id: 'ss_01',
    subject: 'Data Structures',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    durationMinutes: 60,
    priority: 'high',
    completed: true,
    notes: 'Reviewed Red-Black tree rotation logic.',
  },
  {
    id: 'ss_02',
    subject: 'Discrete Mathematics',
    date: new Date().toISOString().split('T')[0],
    startTime: '10:15',
    durationMinutes: 60,
    priority: 'medium',
    completed: true,
    notes: 'Solved 5 Euler path proofs.',
  },
  {
    id: 'ss_03',
    subject: 'Programming Practice',
    date: new Date().toISOString().split('T')[0],
    startTime: '15:00',
    durationMinutes: 60,
    priority: 'high',
    completed: false,
    notes: 'LeetCode Medium array and tree questions.',
  },
  {
    id: 'ss_04',
    subject: 'Database Management',
    date: new Date().toISOString().split('T')[0],
    startTime: '17:30',
    durationMinutes: 75,
    priority: 'urgent',
    completed: false,
    notes: 'Draft schema diagrams for assignment.',
  },
];

export const initialActionPlan: ActionPlan = {
  id: 'plan_cse_final_14d',
  goal: 'Prepare for CSE 263 Final Exam & Boost GPA in 14 Days',
  startDate: new Date().toISOString().split('T')[0],
  targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  subjects: ['Data Structures', 'Algorithms', 'Database Systems', 'Maths'],
  hoursPerDay: 4,
  skillLevel: 'Intermediate',
  preferredTime: 'Morning',
  days: [
    {
      dayNumber: 1,
      date: 'Day 1 (Today)',
      focusTitle: 'Tree Foundations & Array Review',
      tasks: [
        { id: 'p1_1', title: 'Data Structures: Tree traversals (Inorder, Preorder, Postorder)', subject: 'Data Structures', durationHours: 2, priority: 'high', completed: true },
        { id: 'p1_2', title: 'Algorithms: Divide & Conquer QuickSort vs MergeSort', subject: 'Algorithms', durationHours: 1, priority: 'medium', completed: true },
        { id: 'p1_3', title: 'Practice 20 MCQs on Asymptotic Complexity', subject: 'Data Structures', durationHours: 0.5, priority: 'medium', completed: false },
      ],
    },
    {
      dayNumber: 2,
      date: 'Day 2 (Tomorrow)',
      focusTitle: 'Balanced BSTs & SQL Joins',
      tasks: [
        { id: 'p2_1', title: 'Database: 3NF & BCNF Normalization deep-dive', subject: 'Database Systems', durationHours: 2, priority: 'high', completed: false },
        { id: 'p2_2', title: 'SQL Practice: Subqueries and Group By having clauses', subject: 'Database Systems', durationHours: 1, priority: 'medium', completed: false },
        { id: 'p2_3', title: 'Review AVL Tree single & double rotations', subject: 'Data Structures', durationHours: 1, priority: 'high', completed: false },
      ],
    },
    {
      dayNumber: 3,
      date: 'Day 3',
      focusTitle: 'Priority Queues & Graph Representations',
      tasks: [
        { id: 'p3_1', title: 'Binary Heaps: Min-heap, Max-heap, Heapify algorithm', subject: 'Data Structures', durationHours: 2, priority: 'high', completed: false },
        { id: 'p3_2', title: 'Graph adjacency list vs matrix and BFS traversal', subject: 'Algorithms', durationHours: 1.5, priority: 'high', completed: false },
        { id: 'p3_3', title: 'Flashcards on Big-O runtimes and space limits', subject: 'Data Structures', durationHours: 0.5, priority: 'low', completed: false },
      ],
    },
    {
      dayNumber: 4,
      date: 'Day 4',
      focusTitle: 'Shortest Path Algorithms & Past Papers',
      tasks: [
        { id: 'p4_1', title: 'Dijkstra & Bellman-Ford shortest path simulation', subject: 'Algorithms', durationHours: 2, priority: 'high', completed: false },
        { id: 'p4_2', title: 'Solve 2024 Fall Midterm Past Exam Paper', subject: 'Data Structures', durationHours: 1.5, priority: 'urgent', completed: false },
        { id: 'p4_3', title: 'Analyze exam mistakes and note weak spots', subject: 'Review', durationHours: 0.5, priority: 'medium', completed: false },
      ],
    },
    {
      dayNumber: 5,
      date: 'Day 5',
      focusTitle: 'Dynamic Programming & Memoization',
      tasks: [
        { id: 'p5_1', title: 'Classic DP: Knapsack 0/1 and Longest Common Subsequence', subject: 'Algorithms', durationHours: 2.5, priority: 'high', completed: false },
        { id: 'p5_2', title: 'Database Indexing: B-Tree index layout on disk', subject: 'Database Systems', durationHours: 1.5, priority: 'medium', completed: false },
      ],
    },
  ],
  createdAt: new Date().toISOString(),
};

export const initialBudgets: BudgetItem[] = [
  { id: 'b_01', type: 'income', category: 'Scholarship', amount: 850, title: 'Merit Academic Stipend', date: '2026-09-01' },
  { id: 'b_02', type: 'income', category: 'Part-time job', amount: 480, title: 'Campus IT Lab Assistant', date: '2026-09-03' },
  { id: 'b_03', type: 'income', category: 'Pocket money', amount: 200, title: 'Family allowance', date: '2026-09-05' },
  { id: 'b_04', type: 'expense', category: 'Education', amount: 240, title: 'Textbooks & Course Reader Packets', date: '2026-09-02' },
  { id: 'b_05', type: 'expense', category: 'Food', amount: 320, title: 'Campus Cafeteria & Groceries', date: '2026-09-04' },
  { id: 'b_06', type: 'expense', category: 'Transport', amount: 65, title: 'Metro Student Monthly Pass', date: '2026-09-02' },
  { id: 'b_07', type: 'expense', category: 'Entertainment', amount: 55, title: 'Movie night & Streaming subscription', date: '2026-09-06' },
  { id: 'b_08', type: 'expense', category: 'Shopping', amount: 80, title: 'Ergonomic mouse & notebook pens', date: '2026-09-07' },
];

export const initialResources: LearningResource[] = [
  {
    id: 'res_01',
    title: 'VisuAlgo - Visualising Data Structures & Algorithms',
    description: 'Interactive animated visualizer for sorting, binary heaps, AVL trees, and graph algorithms.',
    category: 'Algorithms',
    difficulty: 'Beginner',
    url: 'https://visualgo.net/',
    tags: ['Interactive', 'Visuals', 'Trees', 'Sorting'],
    bookmarked: true,
  },
  {
    id: 'res_02',
    title: 'NeetCode 150 Roadmap & Video Explanations',
    description: 'Curated 150 coding interview problems grouped by pattern (Arrays, Two Pointers, Trees, DP).',
    category: 'Interview Preparation',
    difficulty: 'Intermediate',
    url: 'https://neetcode.io/practice',
    tags: ['LeetCode', 'DSA', 'Interview', 'Video'],
    bookmarked: true,
  },
  {
    id: 'res_03',
    title: '3Blue1Brown - Essence of Linear Algebra',
    description: 'Geometric intuition behind matrix multiplication, eigenvalues, eigenvectors, and transformations.',
    category: 'Mathematics',
    difficulty: 'Beginner',
    url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab',
    tags: ['Linear Algebra', 'Video', 'Visual Math'],
    bookmarked: false,
  },
  {
    id: 'res_04',
    title: 'SQL Bolt - Interactive SQL Lessons',
    description: 'Learn SQL in your browser with interactive sandboxes from SELECT queries to aggregate functions.',
    category: 'Database',
    difficulty: 'Beginner',
    url: 'https://sqlbolt.com/',
    tags: ['SQL', 'Interactive', 'Database', 'Practice'],
    bookmarked: true,
  },
  {
    id: 'res_05',
    title: 'Computer Networking: A Top-Down Approach Companion',
    description: 'Interactive Wireshark labs, socket programming guides, and protocol packet breakdowns.',
    category: 'Networking',
    difficulty: 'Intermediate',
    url: 'https://kurose.cpsc.ucalgary.ca/8e/',
    tags: ['Networking', 'TCP/IP', 'Wireshark'],
    bookmarked: false,
  },
  {
    id: 'res_06',
    title: 'Full Stack Open (University of Helsinki)',
    description: 'World-class modern web development course covering React, Redux, Node.js, Express, REST, GraphQL.',
    category: 'Programming',
    difficulty: 'Intermediate',
    url: 'https://fullstackopen.com/en/',
    tags: ['React', 'Node.js', 'Web Dev', 'University'],
    bookmarked: false,
  },
  {
    id: 'res_07',
    title: 'Tech Interview Handbook by Yangshun Tay',
    description: 'Curated guide covering technical resume optimization, behavioral interview stories, and algorithms.',
    category: 'Career',
    difficulty: 'Intermediate',
    url: 'https://www.techinterviewhandbook.org/',
    tags: ['Resume', 'Career', 'Interview', 'SWE'],
    bookmarked: true,
  },
  {
    id: 'res_08',
    title: 'MIT 6.006 Introduction to Algorithms',
    description: 'Legendary MIT undergraduate course notes, problem sets, and recitations on algorithm design.',
    category: 'Algorithms',
    difficulty: 'Advanced',
    url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
    tags: ['MIT', 'Lectures', 'Algorithm Design'],
    bookmarked: false,
  },
];

export const initialCareerPaths: CareerPath[] = [
  {
    id: 'car_swe',
    role: 'Full-Stack Software Engineer',
    description: 'Designs and builds modern client-server web applications, scalable REST/GraphQL APIs, and cloud services.',
    demand: 'Very High',
    avgSalary: '$95,000 - $140,000 / yr',
    milestones: [
      { id: 'm1', title: 'HTML5, CSS3 & Responsive Web Design', description: 'Master flexbox, grid, semantic markup, and mobile layout best practices.', completed: true },
      { id: 'm2', title: 'JavaScript & TypeScript Mastery', description: 'Async/await, ES6+, closures, prototypes, TypeScript interfaces and types.', completed: true },
      { id: 'm3', title: 'Git & GitHub Collaboration', description: 'Branching strategies, PR reviews, merge conflict resolution, CI/CD actions.', completed: true },
      { id: 'm4', title: 'Frontend Framework (React)', description: 'Component lifecycle, hooks, state management, routing, and performance optimization.', completed: true },
      { id: 'm5', title: 'Backend RESTful APIs (Node/Express or Django)', description: 'Building secure endpoints, authentication with JWT/Sessions, and error handling.', completed: false },
      { id: 'm6', title: 'Relational & NoSQL Databases (PostgreSQL / SQLite)', description: 'Schema normalization, indexing, query optimization, and transactions.', completed: false },
      { id: 'm7', title: 'Full-Stack Capstone Projects', description: 'Deploy 2 production-grade applications with live URLs and GitHub READMEs.', completed: false },
      { id: 'm8', title: 'Portfolio Website & Resume Polish', description: 'Showcase projects with live demos, tech stack highlights, and clear metric impact.', completed: false },
      { id: 'm9', title: 'Summer Internship Application Sprint', description: 'Apply to 50+ junior/intern roles and connect with university alumni on LinkedIn.', completed: false },
      { id: 'm10', title: 'Technical Interview Preparation', description: 'Solve 100+ LeetCode problems and practice behavioral STAR format questions.', completed: false },
    ],
  },
  {
    id: 'car_ds',
    role: 'Data Analyst / Scientist',
    description: 'Extracts actionable business insights and builds predictive statistical models using Python and SQL.',
    demand: 'High',
    avgSalary: '$85,000 - $125,000 / yr',
    milestones: [
      { id: 'ds1', title: 'Python Fundamentals & Jupyter Notebooks', description: 'Functions, data structures, file I/O, and NumPy vectorization.', completed: true },
      { id: 'ds2', title: 'Advanced SQL & Data Warehousing', description: 'Window functions, CTEs, self-joins, indexing, and aggregations.', completed: true },
      { id: 'ds3', title: 'Pandas & Exploratory Data Analysis', description: 'Data cleaning, imputing missing values, merging dataframes, and transformations.', completed: false },
      { id: 'ds4', title: 'Data Visualization (Matplotlib, Seaborn, Tableau)', description: 'Communicating insights through interactive charts and executive dashboards.', completed: false },
      { id: 'ds5', title: 'Applied Statistics & Hypothesis Testing', description: 'A/B testing, p-values, regression analysis, confidence intervals.', completed: false },
      { id: 'ds6', title: 'Machine Learning Basics (Scikit-Learn)', description: 'Supervised vs unsupervised models, classification, metrics (Precision/Recall).', completed: false },
      { id: 'ds7', title: 'End-to-End Data Analysis Portfolio Project', description: 'Kaggle dataset study with business recommendations published on GitHub.', completed: false },
    ],
  },
  {
    id: 'car_sec',
    role: 'Cybersecurity Engineer',
    description: 'Secures computer networks, conducts vulnerability assessments, and protects infrastructure against threats.',
    demand: 'Trending',
    avgSalary: '$90,000 - $135,000 / yr',
    milestones: [
      { id: 'cs1', title: 'Networking Fundamentals (OSI Model & TCP/IP)', description: 'Packet routing, subnetting, DNS, DHCP, and firewall rules.', completed: true },
      { id: 'cs2', title: 'Linux Administration & Shell Scripting', description: 'Permissions, processes, bash scripting, and server hardening.', completed: true },
      { id: 'cs3', title: 'Web Application Security (OWASP Top 10)', description: 'SQL injection, XSS, CSRF, insecure direct object references.', completed: false },
      { id: 'cs4', title: 'Network Defense & Cryptography', description: 'Public key infrastructure, AES encryption, TLS handshakes, VPNs.', completed: false },
      { id: 'cs5', title: 'Security+ or CEH Certification Prep', description: 'Standard industry security principles and incident response procedures.', completed: false },
    ],
  },
  {
    id: 'car_uiux',
    role: 'UI/UX Designer & Product Designer',
    description: 'Conducts user research and crafts accessible, intuitive, and modern user interfaces in Figma.',
    demand: 'High',
    avgSalary: '$80,000 - $120,000 / yr',
    milestones: [
      { id: 'ux1', title: 'Design Principles & Typographic Hierarchy', description: 'Spacing scales, contrast ratios, gestalt laws, and visual hierarchy.', completed: true },
      { id: 'ux2', title: 'Figma Components, Variants & Auto-Layout', description: 'Mastering modern UI prototyping tools and design token systems.', completed: true },
      { id: 'ux3', title: 'User Research & Wireframing', description: 'User personas, journey maps, low-fidelity paper wireframes.', completed: false },
      { id: 'ux4', title: 'Design System Creation & Usability Testing', description: 'Building scalable UI kits and conducting user interview sessions.', completed: false },
      { id: 'ux5', title: 'Case Study Portfolio Development', description: 'Documenting 3 comprehensive problem-to-solution product case studies.', completed: false },
    ],
  },
];

export const initialGoals: StudentGoal[] = [
  {
    id: 'g_01',
    title: 'Master JavaScript & Algorithms in 30 Days',
    targetDays: 30,
    startDate: '2026-08-20',
    tasks: [
      { id: 'gt_1', title: 'Variables, Types & Operators', completed: true },
      { id: 'gt_2', title: 'Functions, Scopes & Closures', completed: true },
      { id: 'gt_3', title: 'Arrays & High-Order Array Methods', completed: true },
      { id: 'gt_4', title: 'Objects, Prototypes & Classes', completed: true },
      { id: 'gt_5', title: 'DOM Manipulation & Event Listeners', completed: true },
      { id: 'gt_6', title: 'Asynchronous JavaScript, Promises & Fetch APIs', completed: false },
      { id: 'gt_7', title: 'Build Full Interactive Mini-Project', completed: false },
      { id: 'gt_8', title: 'Solve 20 Coding Challenges on LeetCode', completed: false },
    ],
  },
  {
    id: 'g_02',
    title: 'Achieve 3.8+ GPA this Semester',
    targetDays: 90,
    startDate: '2026-08-15',
    tasks: [
      { id: 'g2_1', title: 'Never miss an assignment submission deadline', completed: true },
      { id: 'g2_2', title: 'Attend all professor office hours before midterms', completed: true },
      { id: 'g2_3', title: 'Score 90%+ on CSE 263 Data Structures final', completed: false },
      { id: 'g2_4', title: 'Complete Database Systems term project early', completed: false },
    ],
  },
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif_01',
    title: 'Assignment Deadline Tomorrow',
    message: 'Your assignment "Data Structures: Red-Black Tree Implementation" is due tomorrow at 11:59 PM.',
    type: 'deadline',
    timestamp: '10 minutes ago',
    read: false,
  },
  {
    id: 'notif_02',
    title: 'Upcoming Exam in 12 Days',
    message: 'CSE 263 Final Exam is scheduled in 12 days 14 hours. 4 topics still need review.',
    type: 'exam',
    timestamp: '2 hours ago',
    read: false,
  },
  {
    id: 'notif_03',
    title: 'Focus Session Scheduled',
    message: 'Planned study session: "Programming Practice" starts at 15:00 today.',
    type: 'session',
    timestamp: '5 hours ago',
    read: true,
  },
  {
    id: 'notif_04',
    title: 'Action Plan Progress',
    message: 'You completed Day 1 tasks of your CSE Final Exam Action Plan! Keep up the momentum.',
    type: 'system',
    timestamp: '1 day ago',
    read: true,
  },
];

export const initialUserProfile = initialUser;
export const initialBudget = initialBudgets;
export const initialRoadmaps = initialCareerPaths;

