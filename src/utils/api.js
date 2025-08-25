// src/utils/api.js
import axios from 'axios';


const BASE = (process.env.REACT_APP_API || 'http://127.0.0.1:4000/').replace(/\/+$/, '/') + '';

const http = axios.create({
  baseURL: BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 8000,
});


const MOCK_VERSION = 2;
const LS_KEY = '_mockdb_v1'; 

/** Build the latest seed catalog */
function buildSeed() {
  const now = Date.now();
  const course = (c) => ({
    instructor: { name: 'Staff', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=SF' },
    tags: [],
    language: 'en',
    badges: [],
    publishedAt: new Date(now - 1000 * 60 * 60 * 24 * 30).toISOString(),
    ...c,
  });

  /** NOTE: id values here are canonical and used for merging */
  const courses = [
    course({
      id: 1,
      title: 'React & Tailwind: From Zero to Pro',
      category: 'Development',
      level: 'Beginner',
      price: 0,
      rating: 4.7,
      lessons: 36,
      duration: '8h 30m',
      thumbnail:
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop',
      description:
        'Build modern, responsive UIs with React and TailwindCSS. Learn component patterns, hooks, and best practices.',
      syllabus: [
        { title: 'Introduction & Setup', content: 'Project setup, CRA/Vite, Tailwind.' },
        { title: 'React Fundamentals', content: 'Components, props, state, effects.' },
        { title: 'Styling with Tailwind', content: 'Responsive, dark mode, patterns.' },
      ],
      instructor: { name: 'Ava Collins', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=AC' },
      tags: ['react', 'tailwind', 'frontend'],
      badges: ['Free', 'Beginner Friendly'],
      publishedAt: new Date(now - 1000 * 60 * 60 * 24 * 120).toISOString(),
    }),
    course({
      id: 2,
      title: 'Data Analysis with Python',
      category: 'Data',
      level: 'Intermediate',
      price: 1999,
      rating: 4.8,
      lessons: 40,
      duration: '9h 10m',
      thumbnail:
        'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop',
      description: 'Clean, transform, and visualize real-world datasets.',
      syllabus: [
        { title: 'Pandas 101', content: 'Series, DataFrame, indexing, filtering.' },
        { title: 'EDA', content: 'Groupby, stats, charts.' },
      ],
      instructor: { name: 'Ravi Sharma', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=RS' },
      tags: ['python', 'pandas', 'eda'],
      badges: ['Bestseller'],
      publishedAt: new Date(now - 1000 * 60 * 60 * 24 * 90).toISOString(),
    }),

    // ---- The rest of your expanded catalog (IDs 3..12) ----
    course({
      id: 3,
      title: 'JavaScript Mastery: ES6+ to Advanced Patterns',
      category: 'Development',
      level: 'Intermediate',
      price: 1499,
      rating: 4.6,
      lessons: 45,
      duration: '10h 00m',
      thumbnail:
        'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop',
      description:
        'Master modern JavaScript including async patterns, modules, tooling, and performance best practices.',
      syllabus: [
        { title: 'Modern Syntax', content: 'ES6+, modules, bundlers.' },
        { title: 'Async Deep Dive', content: 'Promises, async/await, concurrency.' },
        { title: 'Patterns', content: 'Module, Observer, Factory, immutability.' },
      ],
      instructor: { name: 'Mina Park', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=MP' },
      tags: ['javascript', 'patterns', 'async'],
      badges: ['Staff Pick'],
      publishedAt: new Date(now - 1000 * 60 * 60 * 24 * 60).toISOString(),
    }),
    course({
      id: 4,
      title: 'UI/UX Design Foundations with Figma',
      category: 'Design',
      level: 'Beginner',
      price: 1299,
      rating: 4.7,
      lessons: 32,
      duration: '7h 45m',
      thumbnail:
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
      description:
        'Learn design principles, create wireframes, and build pixel-perfect prototypes in Figma.',
      syllabus: [
        { title: 'Design Basics', content: 'Typography, color, layout, grids.' },
        { title: 'Wireframes', content: 'Low/high fidelity, user flows.' },
        { title: 'Prototyping', content: 'Interactive prototypes, handoff.' },
      ],
      instructor: { name: 'Ishita Rao', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=IR' },
      tags: ['figma', 'ui', 'ux'],
      badges: ['Certificate'],
      publishedAt: new Date(now - 1000 * 60 * 60 * 24 * 110).toISOString(),
    }),
    course({
      id: 5,
      title: 'Next.js 14 & App Router: Production Guide',
      category: 'Development',
      level: 'Intermediate',
      price: 1999,
      rating: 4.8,
      lessons: 38,
      duration: '8h 20m',
      thumbnail:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop',
      description:
        'Build SEO-friendly, server components powered apps with routing, caching, and edge deployment.',
      syllabus: [
        { title: 'App Router', content: 'Layouts, nested routes, metadata.' },
        { title: 'Data Fetching', content: 'Server components, streaming, caching.' },
        { title: 'Deployment', content: 'Edge runtime, envs, optimizations.' },
      ],
      instructor: { name: 'Diego Alves', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=DA' },
      tags: ['nextjs', 'react', 'ssr'],
      badges: ['New'],
      publishedAt: new Date(now - 1000 * 60 * 60 * 24 * 30).toISOString(),
    }),
    course({
      id: 6,
      title: 'TailwindCSS Advanced: Design Systems & Patterns',
      category: 'Design',
      level: 'Advanced',
      price: 1499,
      rating: 4.6,
      lessons: 28,
      duration: '6h 30m',
      thumbnail:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop',
      description:
        'Create scalable design systems with Tailwind, add themes, animations, and component patterns.',
      syllabus: [
        { title: 'Design Tokens', content: 'Colors, spacing, typography.' },
        { title: 'Theming', content: 'Dark mode, CSS variables, theming APIs.' },
        { title: 'Components', content: 'Accessible, reusable, animated UI.' },
      ],
      instructor: { name: 'Leo Hart', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=LH' },
      tags: ['tailwind', 'design-system', 'ui'],
      publishedAt: new Date(now - 1000 * 60 * 60 * 24 * 45).toISOString(),
    }),
    course({
      id: 7,
      title: 'Machine Learning Essentials',
      category: 'Data',
      level: 'Beginner',
      price: 2499,
      rating: 4.5,
      lessons: 35,
      duration: '9h 30m',
      thumbnail:
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
      description:
        'Understand ML concepts, train models, evaluate performance, and deploy simple predictors.',
      syllabus: [
        { title: 'ML Basics', content: 'Supervised vs unsupervised, metrics.' },
        { title: 'Models', content: 'Regression, trees, clustering.' },
        { title: 'Deployment', content: 'Saving models, simple APIs.' },
      ],
      instructor: { name: 'Chen Wei', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=CW' },
      tags: ['ml', 'python', 'sklearn'],
      badges: ['Certificate'],
      publishedAt: new Date(now - 1000 * 60 * 60 * 24 * 70).toISOString(),
    }),
    course({
      id: 8,
      title: 'SQL for Analysts & Engineers',
      category: 'Data',
      level: 'Beginner',
      price: 999,
      rating: 4.7,
      lessons: 30,
      duration: '6h 15m',
      thumbnail:
        'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1600&auto=format&fit=crop',
      description:
        'Query relational databases with confidence—joins, windows, CTEs, performance, and modeling.',
      syllabus: [
        { title: 'Core SQL', content: 'SELECT, WHERE, GROUP BY, HAVING.' },
        { title: 'Joins & Windows', content: 'INNER/OUTER, window functions.' },
        { title: 'CTEs & Perf', content: 'CTEs, indexes, EXPLAIN basics.' },
      ],
      instructor: { name: 'Nora Lee', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=NL' },
      tags: ['sql', 'analytics'],
      publishedAt: new Date(now - 1000 * 60 * 60 * 24 * 150).toISOString(),
    }),
    course({
      id: 9,
      title: 'AWS Cloud Practitioner Crash Course',
      category: 'Cloud',
      level: 'Beginner',
      price: 1799,
      rating: 4.6,
      lessons: 26,
      duration: '5h 50m',
      thumbnail:
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
      description:
        'Learn core AWS services (EC2, S3, RDS, IAM) and best practices to prepare for certification.',
      syllabus: [
        { title: 'Foundations', content: 'Global infra, IAM, regions, AZs.' },
        { title: 'Core Services', content: 'EC2, S3, RDS, Lambda.' },
        { title: 'Security & Costs', content: 'Shared responsibility, budgets.' },
      ],
      instructor: { name: 'Olivia Hayes', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=OH' },
      tags: ['aws', 'cloud'],
      badges: ['Trending'],
      publishedAt: new Date(now - 1000 * 60 * 60 * 24 * 25).toISOString(),
    }),
    course({
      id: 10,
      title: 'Cybersecurity Fundamentals',
      category: 'Security',
      level: 'Beginner',
      price: 1599,
      rating: 4.5,
      lessons: 24,
      duration: '5h 20m',
      thumbnail:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
      description:
        'Understand threats, vulnerabilities, OWASP, secure coding basics, and practical defense.',
      syllabus: [
        { title: 'Threats & Vulns', content: 'Phishing, XSS, SQLi, CSRF.' },
        { title: 'Secure Dev', content: 'Input validation, auth, logs.' },
        { title: 'Blue Team', content: 'Monitoring, patching, backups.' },
      ],
      instructor: { name: 'Ethan Brooks', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=EB' },
      tags: ['security', 'owasp'],
      publishedAt: new Date(now - 1000 * 60 * 60 * 24 * 10).toISOString(),
    }),
    course({
      id: 11,
      title: 'Flutter Mobile Development: Zero to Store',
      category: 'Mobile',
      level: 'Intermediate',
      price: 2199,
      rating: 4.7,
      lessons: 42,
      duration: '10h 40m',
      thumbnail:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop',
      description:
        'Build high-performance cross-platform apps with Flutter, state management, and publishing.',
      syllabus: [
        { title: 'Flutter Basics', content: 'Widgets, layouts, navigation.' },
        { title: 'State', content: 'Provider/Bloc, forms, async.' },
        { title: 'Ship It', content: 'Builds, store listing, updates.' },
      ],
      instructor: { name: 'Layla Khan', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=LK' },
      tags: ['flutter', 'mobile'],
      publishedAt: new Date(now - 1000 * 60 * 60 * 24 * 75).toISOString(),
    }),
    course({
      id: 12,
      title: 'Data Structures & Algorithms in Java',
      category: 'Development',
      level: 'Intermediate',
      price: 1899,
      rating: 4.6,
      lessons: 48,
      duration: '12h 00m',
      thumbnail:
        'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop',
      description:
        'Ace interviews by mastering complexity analysis, arrays, stacks, queues, trees, graphs, and DP.',
      syllabus: [
        { title: 'Time & Space', content: 'Big-O, recursion, patterns.' },
        { title: 'Core DS', content: 'Lists, stacks, queues, trees, heaps.' },
        { title: 'Graphs & DP', content: 'Traversal, shortest paths, DP.' },
      ],
      instructor: { name: 'Jason Mehta', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=JM' },
      tags: ['dsa', 'java', 'interview'],
      badges: ['Certificate'],
      publishedAt: new Date(now - 1000 * 60 * 60 * 24 * 200).toISOString(),
    }),

    // ---- Add any new courses here with new, unique IDs ----
    course({
      id: 13,
      title: 'Rust for Backend: From Zero to API',
      category: 'Development',
      level: 'Intermediate',
      price: 1799,
      rating: 4.6,
      lessons: 34,
      duration: '8h 10m',
      thumbnail:
        'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1600&auto=format&fit=crop',
      description: 'Write safe and fast services in Rust. Actix/Axum, testing, and deployment.',
      syllabus: [
        { title: 'Rust Basics', content: 'Ownership, borrowing, traits.' },
        { title: 'Web APIs', content: 'Actix/Axum, routing, middleware.' },
      ],
      instructor: { name: 'Elena Petrova', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=EP' },
      tags: ['rust', 'backend'],
      badges: ['New'],
      publishedAt: new Date(now - 1000 * 60 * 60 * 24 * 15).toISOString(),
    }),
  ];

  return {
    _meta: { version: MOCK_VERSION },
    courses,
    users: [
      {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'pass123',
        interests: [],
        bio: '',
        avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=TU',
      },
    ],
    enrollments: [],
    _counters: { courses: courses.length, users: 1, enrollments: 0 },
  };
}

function readMockRaw() {
  const raw = localStorage.getItem(LS_KEY);
  return raw ? JSON.parse(raw) : null;
}
function writeMock(db) {
  localStorage.setItem(LS_KEY, JSON.stringify(db));
}
function nextId(db, key) {
  db._counters[key] = (db._counters[key] || 0) + 1;
  return db._counters[key];
}

/** Merge new seed courses into existing DB (non-destructive). */
function migrateOrSeed() {
  const existing = readMockRaw();
  const seed = buildSeed();

  // First-time: just seed
  if (!existing) {
    writeMock(seed);
    return seed;
  }

  const currVersion = existing._meta?.version ?? 1;
  if (currVersion >= MOCK_VERSION) {
    // Already at latest; still ensure counters are valid
    existing._counters.courses = Math.max(
      existing._counters.courses || 0,
      (existing.courses || []).length
    );
    writeMock(existing);
    return existing;
  }

  // Migrate: add any seed courses that are missing by id
  const mapById = new Map(existing.courses.map((c) => [String(c.id), c]));
  let added = 0;

  seed.courses.forEach((sc) => {
    const key = String(sc.id);
    if (!mapById.has(key)) {
      existing.courses.push(sc);
      mapById.set(key, sc);
      added++;
    }
  });

  // Update counters & version
  existing._counters.courses = Math.max(
    existing._counters.courses || 0,
    existing.courses.length
  );
  existing._meta = { version: MOCK_VERSION };

  writeMock(existing);

  // console.info('[mockdb] migration completed, added', added, 'new courses');
  return existing;
}

/** Always returns a DB with newest seed merged in */
function readMock() {
  return migrateOrSeed();
}

// ---------- Smart network wrapper ----------
const isNetworkError = (e) => !e?.response; // no HTTP response => network/DNS/CORS/etc.

async function tryHttpThenMock(fnHttp, fnMock) {
  try {
    return await fnHttp();
  } catch (e) {
    if (isNetworkError(e)) {
      const data = fnMock();
      return { data, status: 200, headers: {}, config: {}, statusText: 'OK' };
    }
    throw e;
  }
}

// ---------- Public helpers ----------

export const pingApi = async () => {
  try {
    await http.get('users');
    return { ok: true, status: 200 };
  } catch (e) {
    if (isNetworkError(e)) return { ok: false, error: 'API not reachable, using local mock DB.' };
    return { ok: false, error: e?.message || 'Error' };
  }
};

/**
 * LEGACY/COMPAT: getCourses -> returns an ARRAY (as your UI expects).
 * Optional params: { q } – search across title/category/tags
 */
export const getCourses = (params = {}) =>
  tryHttpThenMock(
    () => http.get('courses', { params }), // array from server
    () => {
      const db = readMock();
      let list = [...db.courses];
      if (params.q) {
        const q = String(params.q).toLowerCase();
        list = list.filter(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.category.toLowerCase().includes(q) ||
            (c.tags || []).some((t) => String(t).toLowerCase().includes(q))
        );
      }
      // default: newest first so newly-added items appear at top
      list.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      return list;
    }
  );

/**
 * New: searchCourses -> { items, total, page, pageSize } (filters/sort/pagination)
 */
export const searchCourses = (params = {}) =>
  tryHttpThenMock(
    async () => {
      const serverParams = {
        q: params.q,
        category: params.category,
        level: params.level,
        price_gte: params.priceMin,
        price_lte: params.priceMax,
        _page: params.page || 1,
        _limit: params.pageSize || 12,
      };
      if (params.sortBy) {
        const map = { newest: 'publishedAt', rating: 'rating', price: 'price', lessons: 'lessons', title: 'title' };
        serverParams._sort = map[params.sortBy] || 'publishedAt';
        serverParams._order = params.sortDir === 'asc' ? 'asc' : 'desc';
      } else {
        serverParams._sort = 'publishedAt';
        serverParams._order = 'desc';
      }

      const res = await http.get('courses', { params: serverParams });
      const total = Number(res.headers['x-total-count'] || res.data.length || 0);
      return { items: res.data, total, page: Number(serverParams._page), pageSize: Number(serverParams._limit) };
    },
    () => {
      const db = readMock();
      let list = [...db.courses];

      if (params.q) {
        const q = String(params.q).toLowerCase();
        list = list.filter(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.category.toLowerCase().includes(q) ||
            (c.tags || []).some((t) => String(t).toLowerCase().includes(q))
        );
      }
      if (params.category) {
        list = list.filter((c) => String(c.category).toLowerCase() === String(params.category).toLowerCase());
      }
      if (params.level) {
        list = list.filter((c) => String(c.level).toLowerCase() === String(params.level).toLowerCase());
      }
      if (typeof params.priceMin === 'number') {
        list = list.filter((c) => Number(c.price) >= params.priceMin);
      }
      if (typeof params.priceMax === 'number') {
        list = list.filter((c) => Number(c.price) <= params.priceMax);
      }

      const dir = params.sortDir === 'asc' ? 1 : -1;
      switch (params.sortBy) {
        case 'price':
          list.sort((a, b) => (a.price - b.price) * dir);
          break;
        case 'rating':
          list.sort((a, b) => (a.rating - b.rating) * dir);
          break;
        case 'lessons':
          list.sort((a, b) => (a.lessons - b.lessons) * dir);
          break;
        case 'title':
          list.sort((a, b) => a.title.localeCompare(b.title) * dir);
          break;
        case 'newest':
        default:
          list.sort((a, b) => (new Date(b.publishedAt) - new Date(a.publishedAt)) * (dir === -1 ? 1 : -1));
          break;
      }

      const pageSize = Math.max(1, Number(params.pageSize) || 12);
      const page = Math.max(1, Number(params.page) || 1);
      const total = list.length;
      const start = (page - 1) * pageSize;
      const items = list.slice(start, start + pageSize);

      return { items, total, page, pageSize };
    }
  );

export const getCourse = (id) =>
  tryHttpThenMock(
    () => http.get(`courses/${id}`),
    () => {
      const db = readMock();
      return db.courses.find((c) => String(c.id) === String(id)) || null;
    }
  );

export const createCourse = (payload) =>
  tryHttpThenMock(
    () => http.post('courses', payload),
    () => {
      const db = readMock();
      const id = nextId(db, 'courses');
      const course = {
        id,
        rating: 0,
        lessons: 0,
        syllabus: [],
        badges: [],
        language: 'en',
        publishedAt: new Date().toISOString(),
        ...payload,
      };
      db.courses.push(course);
      db._counters.courses = Math.max(db._counters.courses, db.courses.length);
      writeMock(db);
      return course;
    }
  );

export const updateCourse = (id, payload) =>
  tryHttpThenMock(
    () => http.patch(`courses/${id}`, payload),
    () => {
      const db = readMock();
      const idx = db.courses.findIndex((c) => String(c.id) === String(id));
      if (idx === -1) {
        throw Object.assign(new Error('Course not found (mock)'), { response: { status: 404 } });
      }
      db.courses[idx] = { ...db.courses[idx], ...payload };
      writeMock(db);
      return db.courses[idx];
    }
  );

export const deleteCourse = (id) =>
  tryHttpThenMock(
    () => http.delete(`courses/${id}`),
    () => {
      const db = readMock();
      const idx = db.courses.findIndex((c) => String(c.id) === String(id));
      if (idx === -1) {
        throw Object.assign(new Error('Course not found (mock)'), { response: { status: 404 } });
      }
      const [removed] = db.courses.splice(idx, 1);
      writeMock(db);
      return removed;
    }
  );

// ---------- Users ----------
export const getUsers = (params = {}) =>
  tryHttpThenMock(
    () => http.get('users', { params }),
    () => {
      const db = readMock();
      if (!params || Object.keys(params).length === 0) return db.users;
      let out = [...db.users];
      if (params.email) {
        const em = String(params.email).trim().toLowerCase();
        out = out.filter((u) => String(u.email).toLowerCase() === em);
      }
      return out;
    }
  );

export const createUser = (payload) =>
  tryHttpThenMock(
    () => http.post('users', payload),
    () => {
      const db = readMock();
      const em = String(payload.email || '').trim().toLowerCase();
      if (db.users.some((u) => String(u.email).toLowerCase() === em)) {
        throw Object.assign(new Error('Email already exists (mock)'), { response: { status: 400 } });
      }
      const id = nextId(db, 'users');
      const user = { id, ...payload, email: em };
      db.users.push(user);
      db._counters.users = Math.max(db._counters.users, db.users.length);
      writeMock(db);
      return user;
    }
  );

// ---------- Enrollments ----------
export const getEnrollments = (params = {}) =>
  tryHttpThenMock(
    () => http.get('enrollments', { params }),
    () => {
      const db = readMock();
      let out = [...db.enrollments];
      if (params.userId) out = out.filter((e) => String(e.userId) === String(params.userId));
      if (params.courseId) out = out.filter((e) => String(e.courseId) === String(params.courseId));
      return out;
    }
  );

export const createEnrollment = (payload) =>
  tryHttpThenMock(
    () => http.post('enrollments', payload),
    () => {
      const db = readMock();
      const exists = db.enrollments.some(
        (e) => String(e.userId) === String(payload.userId) && String(e.courseId) === String(payload.courseId)
      );
      if (exists)
        return db.enrollments.find(
          (e) => String(e.userId) === String(payload.userId) && String(e.courseId) === String(payload.courseId)
        );
      const id = nextId(db, 'enrollments');
      const row = { id, progress: 0, ...payload };
      db.enrollments.push(row);
      db._counters.enrollments = Math.max(db._counters.enrollments, db.enrollments.length);
      writeMock(db);
      return row;
    }
  );

export const updateEnrollment = (id, payload) =>
  tryHttpThenMock(
    () => http.patch(`enrollments/${id}`, payload),
    () => {
      const db = readMock();
      const idx = db.enrollments.findIndex((e) => String(e.id) === String(id));
      if (idx === -1) {
        throw Object.assign(new Error('Enrollment not found (mock)'), { response: { status: 404 } });
      }
      db.enrollments[idx] = { ...db.enrollments[idx], ...payload };
      writeMock(db);
      return db.enrollments[idx];
    }
  );

/**
 * Categories helper (derives from course list if /categories not present)
 * Always returns an array of strings.
 */
export const getCategories = () =>
  tryHttpThenMock(
    async () => {
      try {
        const res = await http.get('categories');
        return Array.isArray(res.data) ? res.data : [];
      } catch {
        const all = await http.get('courses');
        const set = new Set((all.data || []).map((c) => c.category));
        return Array.from(set).sort((a, b) => a.localeCompare(b));
      }
    },
    () => {
      const db = readMock();
      const set = new Set(db.courses.map((c) => c.category));
      return Array.from(set).sort((a, b) => a.localeCompare(b));
    }
  );
