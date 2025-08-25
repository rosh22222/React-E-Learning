import { Link } from 'react-router-dom'
import Carousel from '../components/Carousel'
import { motion } from 'framer-motion'

export default function Landing() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Carousel />

      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <motion.h1 initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="text-3xl sm:text-5xl font-black">
            Learn. Grow. Upgrade.
          </motion.h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            ProEdge helps you gain job-ready skills with project-based courses designed by experts. Track your progress in a delightful dashboard.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/courses" className="rounded-xl bg-indigo-600 text-white px-5 py-3 hover:bg-indigo-700">Browse Courses</Link>
            <Link to="/register" className="rounded-xl border px-5 py-3 dark:border-slate-700">Get Started</Link>
          </div>
        </div>
        <img
          className="rounded-3xl shadow-soft object-cover h-72 w-full"
          src="https://minutehack.com/public/images/articles/2020/10/female-woman-coder-technology.jpg"
          alt="Students learning"
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {[
          ['Expert Mentors','Learn from industry pros with real projects.'],
          ['Flexible & Mobile-first','Study anywhere with a responsive UI.'],
          ['Certificate of Completion','Show your achievements with pride.'],
        ].map(([t, s]) => (
          <div key={t} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900">
            <h3 className="font-semibold">{t}</h3>
            <p className="text-sm mt-2 text-slate-600 dark:text-slate-300">{s}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
