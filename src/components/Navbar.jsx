// src/components/Navbar.jsx
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { dark, setDark } = useTheme()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const firstName = useMemo(
    () => (user?.name?.trim()?.split(' ')[0]) || 'Learner',
    [user]
  )

  const linkBase =
    'group relative inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60'
  const linkIdle = 'text-slate-700 hover:text-indigo-600 dark:text-slate-300'
  const linkActive = 'text-indigo-700 dark:text-indigo-300'

  return (
    <header className="sticky top-0 z-50">
      {/* subtle gradient top border */}
      <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500" />

      <nav
        className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/60 border-b border-white/30 dark:border-white/10 shadow-[0_1px_0_0_rgba(255,255,255,0.3)_inset,0_1px_20px_-10px_rgba(0,0,0,0.25)]"
        role="navigation"
        aria-label="Primary"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand (logo + name) */}
          <Link
            to="/"
            className="group flex items-center gap-2 font-black tracking-tight text-xl"
          >
            {/* Logo from public/logo.png */}
            <motion.img
              src="logo2.png"           // 👈 put your file at public/logo.png (or adjust path)
              alt="ProEdge Logo"
              className="h-8 w-8 object-contain"
              whileHover={{ rotate: 6, scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            />
            {/* Brand text */}
            <span className="relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-cyan-600">
                Pro
              </span>
              <span className="absolute -bottom-1 left-0 h-[3px] w-0 bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
            </span>
            <span className="text-slate-800 dark:text-slate-200">Edge</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <NavPill to="/courses" base={linkBase} idle={linkIdle} active={linkActive}>
              <span className="i-tabler:school text-base" aria-hidden />
              Courses
            </NavPill>
            <NavPill to="/dashboard" base={linkBase} idle={linkIdle} active={linkActive}>
              <span className="i-tabler:layout-dashboard text-base" aria-hidden />
              Dashboard
            </NavPill>

            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setDark(v => !v)}
              className="ml-2 rounded-xl border border-slate-300/60 dark:border-slate-700/60 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 transition-all hover:bg-slate-100/60 dark:hover:bg-slate-800/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              <span className="flex items-center gap-2">
                <motion.span
                  whileHover={{ rotate: dark ? -10 : 10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  {dark ? <MoonIcon /> : <SunIcon />}
                </motion.span>
                {dark ? 'Dark' : 'Light'}
              </span>
            </motion.button>

            {/* Auth area */}
            {user ? (
              <div className="ml-3 flex items-center gap-3">
                <motion.span
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-slate-700 dark:text-slate-200"
                >
                  Hi, <span className="font-semibold">{firstName}</span>
                </motion.span>
                <Avatar name={firstName} />
                <PrimaryButton
                  label="Logout"
                  onClick={() => { logout(); navigate('/'); }}
                  gradient="from-indigo-600 to-fuchsia-600"
                  ring="focus-visible:ring-fuchsia-500/60"
                />
              </div>
            ) : (
              <div className="ml-3 flex items-center gap-2">
                <motion.div whileHover={{ y: -1, scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/login" className={`${linkBase} ${linkIdle}`}>
                    <span className="i-tabler:login text-base" aria-hidden />
                    <span>Login</span>
                    {/* soft shine on hover */}
                    <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10 blur-[2px]" />
                  </Link>
                </motion.div>
                <PrimaryLink
                  to="/register"
                  label="Register"
                  gradient="from-indigo-600 to-cyan-600"
                  hoverGradient="from-fuchsia-600 to-cyan-500"
                  ring="focus-visible:ring-cyan-500/60"
                />
              </div>
            )}
          </div>

          {/* Mobile actions */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setDark(v => !v)}
              className="rounded-lg border border-slate-300/60 dark:border-slate-700/60 p-2 text-slate-700 dark:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              {dark ? <MoonIcon /> : <SunIcon />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setOpen(true)}
              className="rounded-lg border border-slate-300/60 dark:border-slate-700/60 p-2 text-slate-700 dark:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
              aria-label="Open menu"
              title="Open menu"
            >
              <MenuIcon />
            </motion.button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              className="fixed inset-y-0 right-0 w-[84%] max-w-sm bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-l border-white/30 dark:border-white/10 shadow-2xl md:hidden"
              aria-label="Mobile menu"
            >
              <div className="flex h-16 items-center justify-between px-4 border-b border-white/30 dark:border-white/10">
                <Link to="/" onClick={() => setOpen(false)} className="font-black text-lg flex items-center gap-2">
                  <img src="/logo.png" alt="ProEdge Logo" className="h-7 w-7 object-contain" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-cyan-600">Pro</span>
                  <span className="text-slate-800 dark:text-slate-200">Edge</span>
                </Link>
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="rounded-lg p-2 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
                >
                  <CloseIcon />
                </motion.button>
              </div>

              <div className="px-4 py-4 flex flex-col gap-2">
                <MobileItem to="/courses" onClick={() => setOpen(false)}>Courses</MobileItem>
                <MobileItem to="/dashboard" onClick={() => setOpen(false)}>Dashboard</MobileItem>

                <div className="my-2 h-px bg-gradient-to-r from-transparent via-slate-300/60 dark:via-slate-700/60 to-transparent" />

                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-2 py-2">
                      <Avatar name={firstName} />
                      <div className="text-sm">
                        <div className="text-slate-700 dark:text-slate-200 font-medium">Hi, {firstName}</div>
                        <div className="text-slate-500 dark:text-slate-400">Welcome back 👋</div>
                      </div>
                    </div>
                    <PrimaryButton
                      className="mt-2"
                      label="Logout"
                      gradient="from-indigo-600 to-fuchsia-600"
                      hoverGradient="from-fuchsia-700 to-cyan-500"
                      onClick={() => { setOpen(false); logout(); navigate('/'); }}
                    />
                  </>
                ) : (
                  <div className="flex gap-2">
                    <motion.div className="flex-1" whileHover={{ y: -1, scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Link
                        to="/login"
                        onClick={() => setOpen(false)}
                        className="block rounded-xl border border-slate-300/60 dark:border-slate-700/60 px-4 py-2 text-center text-sm transition-colors hover:bg-slate-100/70 dark:hover:bg-slate-800/70"
                      >
                        Login
                      </Link>
                    </motion.div>

                    <PrimaryLink
                      className="flex-1"
                      to="/register"
                      label="Register"
                      gradient="from-indigo-600 to-cyan-600"
                      hoverGradient="from-fuchsia-600 to-cyan-500"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                )}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

/* ---------- Small helpers ---------- */

function NavPill({ to, base, idle, active, children }) {
  return (
    <NavLink to={to} className={({ isActive }) => `${base} ${isActive ? active : idle}`}>
      {({ isActive }) => (
        <span className="relative">
          <motion.span className="inline-flex items-center gap-2" whileHover={{ y: -1, scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            {children}
          </motion.span>

          {/* animated underline when active */}
          <motion.span
            layoutId="nav-underline"
            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500 rounded-full"
            style={{ opacity: isActive ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 40 }}
          />

          {/* soft shine on hover */}
          <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10 blur-[2px]" />
        </span>
      )}
    </NavLink>
  )
}

function MobileItem({ to, onClick, children }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `w-full ${isActive ? 'bg-indigo-50/70 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'} rounded-xl px-3 py-2 text-base transition-transform duration-300 hover:translate-x-1 hover:scale-[1.02]`
      }
    >
      {children}
    </NavLink>
  )
}

function Avatar({ name }) {
  const initials = name?.[0]?.toUpperCase() || 'U'
  return (
    <motion.div
      whileHover={{ scale: 1.12, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white text-sm font-semibold shadow"
      aria-hidden
      title={name}
    >
      {initials}
    </motion.div>
  )
}

/* ---------- Reusable fancy buttons ---------- */

function PrimaryButton({ label, onClick, gradient = 'from-indigo-600 to-fuchsia-600', ring = 'focus-visible:ring-fuchsia-500/60', className = '' }) {
  return (
    <motion.button
      whileHover={{ y: -1, scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`rounded-xl bg-gradient-to-r ${gradient} text-white px-3 py-2 text-sm shadow transition-all hover:shadow-lg focus:outline-none focus-visible:ring-2 ${ring} ${className}`}
    >
      <span className="inline-block transition-all">{label}</span>
    </motion.button>
  )
}

function PrimaryLink({ to, label, gradient = 'from-indigo-600 to-cyan-600', ring = 'focus-visible:ring-cyan-500/60', onClick, className = '' }) {
  return (
    <motion.div whileHover={{ y: -1, scale: 1.06 }} whileTap={{ scale: 0.96 }} className={className}>
      <Link
        to={to}
        onClick={onClick}
        className={`block rounded-xl bg-gradient-to-r ${gradient} text-white px-3 py-2 text-sm shadow transition-all hover:shadow-lg focus:outline-none focus-visible:ring-2 ${ring}`}
      >
        {label}
      </Link>
    </motion.div>
  )
}

/* ---------- Icons (no extra deps) ---------- */
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
      <path d="M6 6l12 12M6 18L18 6" />
    </svg>
  )
}
