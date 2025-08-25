// src/pages/Login.jsx
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Login() {
  const { login, loading } = useAuth()
  const [email, setEmail] = useState('user@example.com') // prefill to test
  const [password, setPassword] = useState('secret123')  // prefill to test
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const loc = useLocation()
  const redirectTo = loc.state?.from || '/dashboard'

  useEffect(() => {
    setError('')
  }, [email, password])

  const submit = async (e) => {
    e.preventDefault()
    setError('')

    const eNorm = (email || '').trim().toLowerCase()
    const pNorm = (password || '').trim()
    if (!eNorm || !pNorm) {
      setError('Email and password are required.')
      return
    }

    const res = await login(eNorm, pNorm)
    if (res.ok) navigate(redirectTo)
    else setError(res.error || 'Login failed. Please try again.')
  }

  return (
    <section className="relative min-h-[calc(100dvh-4rem)] flex items-center justify-center px-4 py-10 overflow-hidden">
      {/* Animated background blobs */}
      <motion.div
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl"
        animate={{ x: [0, 20, -10, 0], y: [0, -10, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-fuchsia-500/30 blur-3xl"
        animate={{ x: [0, -15, 10, 0], y: [0, 15, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {/* Card */}
      <motion.div
        initial={{ y: 16, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        className="relative w-full max-w-md"
      >
        {/* Glow ring */}
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500 opacity-60 blur-[6px]" />
        <div className="relative rounded-3xl border border-white/20 bg-white/70 p-6 shadow-[0_10px_60px_-15px_rgba(0,0,0,0.35)] backdrop-blur-xl dark:bg-slate-900/60 dark:border-white/10 sm:p-8">
          {/* Logo / Title */}
          <div className="flex items-center gap-3">
            {/* If you have a logo in /public/logo.png, it’ll render; otherwise the fallback circle shows */}
            <img
              src="/logo.png"
              alt="ProEdge logo"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
              className="h-10 w-10 rounded-full object-contain ring-1 ring-white/40"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Welcome back to <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-cyan-600">ProEdge</span>
              </h1>
              <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
                Log in to continue learning.
              </p>
            </div>
          </div>

          {/* Error */}
          {error ? (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-xl border border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300 px-3 py-2 text-sm"
            >
              {error}
            </motion.div>
          ) : null}

          {/* Form */}
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300 block">Email</label>
              <div className="mt-1 relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 my-auto text-slate-400 dark:text-slate-500">
                  <MailIcon />
                </span>
                <input
                  type="email"
                  className="w-full rounded-xl border border-slate-200/70 bg-white/70 pl-10 pr-3 py-2 text-slate-800 placeholder-slate-400 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500/60 dark:border-slate-700/70 dark:bg-slate-950/60 dark:text-slate-100"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Password</label>
                <a href="#" className="text-xs text-indigo-600 hover:underline dark:text-indigo-400">Forgot?</a>
              </div>
              <div className="mt-1 relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 my-auto text-slate-400 dark:text-slate-500">
                  <LockIcon />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full rounded-xl border border-slate-200/70 bg-white/70 pl-10 pr-12 py-2 text-slate-800 placeholder-slate-400 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500/60 dark:border-slate-700/70 dark:bg-slate-950/60 dark:text-slate-100"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={()=>setShowPassword(v=>!v)}
                  className="absolute inset-y-0 right-2 my-auto grid place-items-center rounded-lg px-2 py-1 text-xs text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/70 hover:bg-slate-100/70 dark:hover:bg-slate-800/70 transition"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Remember + Hint */}
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/60 dark:bg-transparent dark:border-slate-700" defaultChecked />
                Remember me
              </label>
              
            </div>

            {/* CTA */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ y: -1, scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="relative w-full rounded-xl bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-cyan-600 text-white py-3 font-semibold shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500/60"
            >
              {/* shine */}
              <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                <span className="absolute -inset-x-10 -top-1 h-[140%] translate-x-[-60%] rotate-12 opacity-0 transition group-hover:opacity-20 bg-white/40 blur-xl" />
              </span>

              <span className="inline-flex items-center gap-2">
                {loading ? (
                  <>
                    <Spinner /> Logging in...
                  </>
                ) : (
                  <>
                    <KeyIcon /> Login
                  </>
                )}
              </span>
            </motion.button>
          </form>

          

          
        </div>
      </motion.div>
    </section>
  )
}

/* ---------- Small UI helpers ---------- */
function Spinner() {
  return (
    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg>
  )
}

function SocialBtn({ label }) {
  return (
    <button className="rounded-xl border border-slate-200/70 bg-white/60 px-3 py-2 text-sm font-medium shadow-sm transition hover:shadow-md hover:bg-white dark:border-slate-700/70 dark:bg-slate-950/60 dark:hover:bg-slate-900/70">
      {label}
    </button>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4h16v16H4z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  )
}
function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 118 0v3" />
    </svg>
  )
}
function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17.94 17.94A10.94 10.94 0 0112 19C5 19 1 12 1 12a21.78 21.78 0 014.18-5.94" />
      <path d="M10.58 10.58a3 3 0 104.24 4.24" />
      <path d="M1 1l22 22" />
    </svg>
  )
}
function KeyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 2l-2 2" />
      <path d="M7 15l-4 4 0 3 3 0 4-4" />
      <circle cx="15" cy="9" r="6" />
    </svg>
  )
}
