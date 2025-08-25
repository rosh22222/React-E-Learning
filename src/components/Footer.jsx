export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-slate-500 dark:text-slate-400">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} ProEdge. All rights reserved.</p>
          <p className="opacity-80">Built with ❤️ using React & Tailwind</p>
        </div>
      </div>
    </footer>
  )
}
