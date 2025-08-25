import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCourse, createEnrollment, getEnrollments } from '../utils/api'
import Accordion from '../components/Accordion'
import { useAuth } from '../context/AuthContext'

export default function CourseDetail() {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const { data } = await getCourse(id)
      setCourse(data)
      setLoading(false)
    })()
  }, [id])

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/courses/${id}` } })
      return
    }
    setEnrolling(true)
    // avoid duplicate enrollment
    const existing = await getEnrollments({ userId: user.id, courseId: Number(id) })
    if (existing.data.length === 0) {
      await createEnrollment({ userId: user.id, courseId: Number(id), progress: 0 })
    }
    setEnrolling(false)
    navigate('/dashboard')
  }

  if (loading) return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="h-72 rounded-3xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
      <div className="mt-6 h-10 w-1/2 bg-slate-100 dark:bg-slate-800 animate-pulse rounded" />
      <div className="mt-4 h-24 bg-slate-100 dark:bg-slate-800 animate-pulse rounded" />
    </section>
  )

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <img src={course.thumbnail} alt={course.title} className="h-72 w-full object-cover rounded-3xl shadow-soft" />
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-black">{course.title}</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">{course.description}</p>

          <div className="mt-6">
            <h2 className="font-semibold text-lg mb-3">Syllabus</h2>
            <Accordion items={course.syllabus} />
          </div>
        </div>
        <aside className="w-full lg:w-[360px] shrink-0">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900">
            <div className="text-2xl font-bold text-indigo-600">{course.price === 0 ? 'Free' : `₹${course.price}`}</div>
            <p className="text-sm text-slate-500 mt-1">{course.category} • {course.level}</p>
            <p className="text-sm text-slate-500">Lessons: {course.lessons} • Duration: {course.duration}</p>
            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="mt-5 w-full rounded-xl bg-indigo-600 text-white py-3 hover:bg-indigo-700 disabled:opacity-60"
            >
              {enrolling ? 'Enrolling...' : 'Enroll & Start'}
            </button>
          </div>
        </aside>
      </div>
    </section>
  )
}
