export default function ProgressBar({ value }) {
  return (
    <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3">
      <div
        className="bg-indigo-600 h-3 rounded-full"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  )
}
