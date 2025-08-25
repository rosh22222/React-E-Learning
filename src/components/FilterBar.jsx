export default function FilterBar({ query, setQuery, category, setCategory, level, setLevel, price, setPrice, sort, setSort }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-3">
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search courses..."
        className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2"
      />
      <select value={category} onChange={e => setCategory(e.target.value)} className="rounded-xl border px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
        <option value="">All Categories</option>
        <option>Development</option>
        <option>Data</option>
        <option>Design</option>
        <option>Marketing</option>
      </select>
      <select value={level} onChange={e => setLevel(e.target.value)} className="rounded-xl border px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
        <option value="">All Levels</option>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>
      <select value={price} onChange={e => setPrice(e.target.value)} className="rounded-xl border px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
        <option value="">Any Price</option>
        <option value="free">Free</option>
        <option value="paid">Paid</option>
      </select>
      <select value={sort} onChange={e => setSort(e.target.value)} className="rounded-xl border px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
        <option value="">Sort</option>
        <option value="rating_desc">Rating: High → Low</option>
        <option value="price_asc">Price: Low → High</option>
        <option value="price_desc">Price: High → Low</option>
      </select>
      <button
        onClick={() => { setQuery(''); setCategory(''); setLevel(''); setPrice(''); setSort(''); }}
        className="rounded-xl border px-3 py-2 dark:border-slate-700"
      >
        Reset
      </button>
    </div>
  )
}
