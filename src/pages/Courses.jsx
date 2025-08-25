import { useEffect, useMemo, useState } from 'react'
import { getCourses } from '../utils/api'
import CourseCard from '../components/CourseCard'
import FilterBar from '../components/FilterBar'

export default function Courses() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [list, setList] = useState([])

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [level, setLevel] = useState('')
  const [price, setPrice] = useState('')
  const [sort, setSort] = useState('')

  useEffect(() => {
    (async () => {
      setLoading(true)
      setError('')
      try {
        const { data } = await getCourses()
        setList(Array.isArray(data) ? data : [])
      } catch (e) {
        const msg = e?.response?.status === 404
          ? 'Courses route not found. Ensure server/db.json has a "courses" array and that JSON Server is running on 4000.'
          : (e?.message || 'Failed to load courses')
        setError(msg)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const filtered = useMemo(() => {
    let out = list.filter(c =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
    )
    if (category) out = out.filter(c => c.category === category)
    if (level) out = out.filter(c => c.level === level)
    if (price === 'free') out = out.filter(c => c.price === 0)
    if (price === 'paid') out = out.filter(c => c.price > 0)
    if (sort === 'rating_desc') out = out.sort((a,b)=>b.rating-a.rating)
    if (sort === 'price_asc') out = out.sort((a,b)=>a.price-b.price)
    if (sort === 'price_desc') out = out.sort((a,b)=>b.price-a.price)
    return out
  }, [list, query, category, level, price, sort])

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-black">Browse Courses</h1>

      {error && (
        <div className="mt-6 rounded-xl border border-red-300/70 bg-red-50 text-red-700 p-4">
          {error}
        </div>
      )}

      <div className="mt-6">
        <FilterBar
          query={query} setQuery={setQuery}
          category={category} setCategory={setCategory}
          level={level} setLevel={setLevel}
          price={price} setPrice={setPrice}
          sort={sort} setSort={setSort}
        />
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? Array.from({length:6}).map((_,i)=>(
          <div key={i} className="h-72 rounded-2xl bg-slate-100 animate-pulse" />
        )) : filtered.map(c => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </section>
  )
}
