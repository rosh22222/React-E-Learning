import { useState } from 'react'

export default function Accordion({ items = [] }) {
  const [open, setOpen] = useState(null)
  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      {items.map((it, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left px-5 py-4 bg-slate-50 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-900/60"
          >
            <span className="font-medium">{it.title}</span>
          </button>
          {open === i && (
            <div className="px-5 py-4 text-slate-700 dark:text-slate-300 whitespace-pre-line">
              {it.content}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
