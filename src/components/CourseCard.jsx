// src/components/CourseCard.jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function CourseCard({ course }) {
  const isFree = Number(course.price) === 0
  const priceLabel = isFree ? 'Free' : `₹${course.price?.toLocaleString?.() ?? course.price}`
  const rating = Number(course.rating) || 0

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 250, damping: 18 }}
      className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden 
                 bg-white dark:bg-slate-900 hover:shadow-lg transition"
    >
      {/* image */}
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        {/* subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
      </div>

      {/* content */}
      <div className="p-4">
        <h3 className="font-semibold text-base sm:text-lg line-clamp-2 text-slate-800 dark:text-slate-100">
          {course.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {course.category} • {course.level}
        </p>

        <div className="mt-3 flex items-center justify-between text-sm">
          <span className={`font-semibold ${isFree ? 'text-emerald-600' : 'text-indigo-600 dark:text-indigo-400'}`}>
            {priceLabel}
          </span>
          <span className="text-amber-500 font-medium">★ {rating.toFixed(1)}</span>
        </div>

        <Link
          to={`/courses/${course.id}`}
          className="mt-4 block text-center rounded-lg bg-indigo-600 text-white py-2 text-sm 
                     hover:bg-indigo-700 dark:hover:bg-indigo-500 transition"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  )
}
