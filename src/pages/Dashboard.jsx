// src/pages/Dashboard.jsx
import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getCourses, getEnrollments, updateEnrollment } from '../utils/api'
import ProgressBar from '../components/ProgressBar'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Dashboard() {
  const { user } = useAuth()
  const [enrollments, setEnrollments] = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    ;(async () => {
      setLoading(true)
      try {
        const [en, co] = await Promise.all([
          getEnrollments({ userId: user.id }),
          getCourses(),
        ])
        if (!alive) return
        setEnrollments(en.data ?? en) // works with axios or mock
        setCourses(co.data ?? co)
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => { alive = false }
  }, [user.id])

  const rows = useMemo(() => {
    return enrollments
      .map(en => ({ ...en, course: courses.find(c => c.id === en.courseId) }))
      .filter(r => r.course)
  }, [enrollments, courses])

  const overall = useMemo(() => {
    if (!rows.length) return 0
    const sum = rows.reduce((acc, r) => acc + (Number(r.progress) || 0), 0)
    return Math.round(sum / rows.length)
  }, [rows])

  const setProgress = async (id, value) => {
    setEnrollments(prev => prev.map(e => e.id === id ? { ...e, progress: value } : e)) // optimistic
    try {
      await updateEnrollment(id, { progress: value })
    } catch {
      // rollback (rare when using mock)
      setEnrollments(prev => prev.map(e => e.id === id ? { ...e, progress: prev.find(p => p.id === id)?.progress ?? 0 } : e))
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/70 backdrop-blur-xl p-6 sm:p-8 shadow-[0_10px_60px_-15px_rgba(0,0,0,0.25)] dark:bg-slate-900/60 dark:border-white/10">
        <div className="pointer-events-none absolute -top-20 -left-20 h-56 w-56 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-fuchsia-500/30 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Your Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              Track progress and continue learning.
            </p>
          </div>

          <div className="w-full lg:w-[380px]">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-600 dark:text-slate-300">Overall progress</span>
              <span className="font-semibold">{overall}%</span>
            </div>
            <ProgressBar value={overall} />
          </div>

          <Link
            to="/courses"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-cyan-600 text-white px-5 py-2.5 text-sm font-medium shadow hover:shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500/60"
          >
            Explore courses
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="mt-8 grid gap-6">
        {loading ? (
          <SkeletonList />
        ) : rows.length === 0 ? (
          <EmptyState />
        ) : (
          <AnimatePresence mode="popLayout">
            {rows.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 220, damping: 22, delay: i * 0.03 }}
                className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={r.course.thumbnail}
                        alt={r.course.title}
                        className="h-16 w-24 object-cover rounded-xl ring-1 ring-black/5 dark:ring-white/10"
                      />
                      <span className="absolute -bottom-1 -right-1 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] text-white backdrop-blur">
                        {r.course.level}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold leading-tight">{r.course.title}</h3>
                      <p className="text-sm text-slate-500">
                        {r.course.category} • {r.course.duration || `${r.course.lessons} lessons`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/courses/${r.courseId}`}
                      className="rounded-xl border px-3 py-1.5 text-sm transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                    >
                      View
                    </Link>
                    <Link
                      to={`/courses/${r.courseId}`}
                      className="hidden sm:inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white px-3.5 py-1.5 text-sm shadow transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500/60"
                    >
                      Continue
                    </Link>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-4">
                  <ProgressBar value={r.progress} />
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <div className="relative flex-1 min-w-[220px]">
                      {/* Styled range track */}
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={r.progress}
                        onChange={e => setProgress(r.id, Number(e.target.value))}
                        className="w-full appearance-none bg-transparent"
                        style={{ WebkitAppearance: 'none' }}
                      />
                      <style>
                        {`
                          input[type="range"]::-webkit-slider-runnable-track {
                            height: 8px; border-radius: 9999px;
                            background: linear-gradient(90deg, rgb(79,70,229), rgb(217,70,239), rgb(6,182,212));
                            opacity: 0.35;
                          }
                          input[type="range"]::-moz-range-track {
                            height: 8px; border-radius: 9999px; background: rgba(148,163,184,0.25);
                          }
                          input[type="range"]::-webkit-slider-thumb {
                            -webkit-appearance: none; appearance: none;
                            height: 18px; width: 18px; margin-top: -5px; border-radius: 9999px;
                            background: white; border: 2px solid rgba(79,70,229,0.9);
                            box-shadow: 0 2px 10px rgba(99,102,241,0.35);
                          }
                          input[type="range"]::-moz-range-thumb {
                            height: 18px; width: 18px; border-radius: 9999px; background: white; border: 2px solid rgba(79,70,229,0.9);
                          }
                        `}
                      </style>
                    </div>

                    <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      {r.progress}% completed
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </section>
  )
}

/* ---------- Subcomponents ---------- */

function SkeletonList() {
  return (
    <div className="grid gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
          <div className="h-28 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 animate-pulse dark:from-slate-800 dark:via-slate-900 dark:to-slate-800" />
          <div className="p-4">
            <div className="h-3 w-1/2 rounded bg-slate-200/80 dark:bg-slate-800/80 mb-2" />
            <div className="h-3 w-1/3 rounded bg-slate-200/70 dark:bg-slate-800/70" />
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-8 text-center dark:border-slate-800/80 dark:bg-slate-900">
      <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 7h18M3 12h14M3 17h10" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold">No enrollments yet</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        You’re not enrolled in any courses. Start your journey now.
      </p>
      <Link
        to="/courses"
        className="mt-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-cyan-600 text-white px-4 py-2 text-sm shadow hover:shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500/60"
      >
        Browse Courses
      </Link>
    </div>
  )
}
