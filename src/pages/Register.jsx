// src/pages/Register.jsx
import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Register() {
  const { register, loading } = useAuth()
  const navigate = useNavigate()
  const loc = useLocation()
  const redirectTo = loc.state?.from || '/dashboard'

  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    interests: [],
    bio: ''
  })

  const allInterests = ['Development','Data','Design','Marketing','Business','DevOps']

  // Derived avatar
  const avatar = useMemo(
    () => `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(form.name || form.email || 'User')}`,
    [form.name, form.email]
  )

  useEffect(() => setErrors({}), [step])

  const validateStep = (s) => {
    const e = {}
    if (s === 1) {
      if (!form.name.trim()) e.name = 'Please enter your full name.'
      if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = 'Enter a valid email address.'
      if (!form.password.trim()) e.password = 'Please create a password.'
      if (form.password && form.password.length < 6) e.password = 'Use at least 6 characters.'
    }
    if (s === 2) {
      if (!form.interests.length) e.interests = 'Pick at least one interest.'
      if (form.bio && form.bio.length > 280) e.bio = 'Bio should be under 280 characters.'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (!validateStep(step)) return
    setStep(s => Math.min(3, s + 1))
  }
  const prev = () => setStep(s => Math.max(1, s - 1))

  const handleSubmit = async () => {
    if (!validateStep(2)) { setStep(2); return }
    const payload = { ...form, avatar }
    const res = await register(payload)
    if (res.ok) navigate(redirectTo)
    else alert(res.error || 'Something went wrong.')
  }

  // password strength (very simple signal)
  const passStrength = useMemo(() => {
    const p = form.password || ''
    let score = 0
    if (p.length >= 6) score++
    if (/[A-Z]/.test(p)) score++
    if (/\d/.test(p)) score++
    if (/[^a-zA-Z0-9]/.test(p)) score++
    return Math.min(score, 4)
  }, [form.password])

  const strengthLabel = ['Weak','Fair','Good','Strong'][Math.max(0, passStrength - 1)] || 'Weak'
  const strengthColor =
    passStrength <= 1 ? 'bg-rose-500' :
    passStrength === 2 ? 'bg-amber-500' :
    passStrength === 3 ? 'bg-emerald-500' : 'bg-indigo-600'

  return (
    <section className="relative min-h-[calc(100dvh-4rem)] flex items-start sm:items-center justify-center px-4 py-10 overflow-hidden">
      {/* Soft background blobs */}
      <motion.div
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"
        animate={{ x: [0, 16, -10, 0], y: [0, -10, 12, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"
        animate={{ x: [0, -12, 10, 0], y: [0, 14, -16, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        className="relative w-full max-w-2xl"
      >
        {/* Glow ring */}
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500 opacity-40 blur-[6px]" />

        {/* Card */}
        <div className="relative rounded-3xl border border-white/20 bg-white/70 p-6 sm:p-8 shadow-[0_10px_60px_-15px_rgba(0,0,0,0.35)] backdrop-blur-xl dark:bg-slate-900/60 dark:border-white/10">
          {/* Header with stepper */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Create your account</h1>
              <p className="text-slate-600 dark:text-slate-300 mt-1">Step {step} of 3</p>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <StepDot active={step >= 1} label="Account" />
              <Connector />
              <StepDot active={step >= 2} label="Profile" />
              <Connector />
              <StepDot active={step >= 3} label="Review" />
            </div>
          </div>

          {/* progress bar */}
          <div className="mt-6 h-1.5 w-full rounded-full bg-slate-200/70 dark:bg-slate-800/70 overflow-hidden">
            <motion.div
              key={step}
              className="h-full bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-cyan-600"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>

          {/* Steps */}
          <div className="mt-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="grid gap-4 sm:grid-cols-2"
                >
                  <Field
                    label="Full name"
                    error={errors.name}
                    icon={<UserIcon />}
                  >
                    <input
                      className="mt-1 w-full rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2 text-slate-800 placeholder-slate-400 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500/60 dark:border-slate-700/70 dark:bg-slate-950/60 dark:text-slate-100"
                      value={form.name}
                      onChange={(e)=>setForm({...form, name:e.target.value})}
                      placeholder="Ada Lovelace"
                    />
                  </Field>

                  <Field
                    label="Email"
                    error={errors.email}
                    icon={<MailIcon />}
                  >
                    <input
                      type="email"
                      className="mt-1 w-full rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2 text-slate-800 placeholder-slate-400 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500/60 dark:border-slate-700/70 dark:bg-slate-950/60 dark:text-slate-100"
                      value={form.email}
                      onChange={(e)=>setForm({...form, email:e.target.value})}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field
                      label="Password"
                      error={errors.password}
                      icon={<LockIcon />}
                      trailing={
                        <button
                          type="button"
                          onClick={()=>setShowPassword(v=>!v)}
                          className="rounded-lg border border-slate-200/70 dark:border-slate-700/70 px-2 py-1 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/70 transition"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? 'Hide' : 'Show'}
                        </button>
                      }
                    >
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="mt-1 w-full rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2 pr-14 text-slate-800 placeholder-slate-400 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500/60 dark:border-slate-700/70 dark:bg-slate-950/60 dark:text-slate-100"
                        value={form.password}
                        onChange={(e)=>setForm({...form, password:e.target.value})}
                        placeholder="At least 6 characters"
                        autoComplete="new-password"
                      />
                      {/* strength bar */}
                      <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200/70 dark:bg-slate-800/70 overflow-hidden">
                        <div className={`h-full ${strengthColor}`} style={{ width: `${(passStrength/4)*100}%` }} />
                      </div>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Strength: {strengthLabel}</p>
                    </Field>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={avatar}
                      alt="Avatar preview"
                      className="h-12 w-12 rounded-full ring-1 ring-white/40 dark:ring-white/20"
                    />
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      Avatar preview (auto-generated). It will update as you type.
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Interests</label>
                    {errors.interests && <p className="text-xs text-rose-600 mt-1">{errors.interests}</p>}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {allInterests.map(tag => {
                        const active = form.interests.includes(tag)
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() =>
                              setForm(f =>
                                ({...f, interests: active ? f.interests.filter(t=>t!==tag) : [...f.interests, tag]})
                              )
                            }
                            className={`px-3 py-1.5 rounded-full border text-sm transition focus:outline-none focus-visible:ring-2 ${
                              active
                                ? 'bg-indigo-600 text-white border-indigo-600 focus-visible:ring-indigo-500/60'
                                : 'border-slate-300/70 text-slate-700 hover:bg-slate-100/70 dark:border-slate-700/70 dark:text-slate-200 dark:hover:bg-slate-800/70 focus-visible:ring-slate-500/40'
                            }`}
                          >
                            {tag}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Short bio</label>
                    {errors.bio && <p className="text-xs text-rose-600 mt-1">{errors.bio}</p>}
                    <textarea
                      rows={4}
                      className="mt-2 w-full rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2 text-slate-800 placeholder-slate-400 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500/60 dark:border-slate-700/70 dark:bg-slate-950/60 dark:text-slate-100"
                      value={form.bio}
                      onChange={(e)=>setForm({...form, bio:e.target.value})}
                      placeholder="Tell us a bit about your goals (max 280 chars)"
                    />
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{form.bio.length}/280</div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="s3"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <img src={avatar} alt="Avatar" className="h-12 w-12 rounded-full ring-1 ring-white/40 dark:ring-white/20" />
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      Looks good? You can change this later in your profile.
                    </div>
                  </div>
                  <div className="rounded-xl bg-slate-50/80 dark:bg-slate-900/40 p-4">
                    <Row label="Name" value={form.name || '—'} />
                    <Row label="Email" value={form.email || '—'} />
                    <Row label="Interests" value={form.interests.join(', ') || '—'} />
                    <Row label="Bio" value={form.bio || '—'} multiline />
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    By creating an account, you agree to our terms & privacy policy.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={prev}
              disabled={step===1}
              className="rounded-xl border border-slate-300/70 px-4 py-2 text-sm text-slate-700 disabled:opacity-50 hover:bg-slate-100/70 transition dark:border-slate-700/70 dark:text-slate-200 dark:hover:bg-slate-800/70"
            >
              Back
            </button>

            {step < 3 ? (
              <button
                onClick={next}
                className="rounded-xl bg-indigo-600 text-white px-5 py-2.5 text-sm font-medium hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="rounded-xl bg-fuchsia-600 text-white px-5 py-2.5 text-sm font-medium hover:bg-fuchsia-700 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500/60"
              >
                {loading ? 'Creating...' : 'Create Account'}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

/* ---------- Tiny pieces ---------- */

function Field({ label, error, icon, trailing, children }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2">
        {icon ? <span className="text-slate-400 dark:text-slate-500">{icon}</span> : null}
        {label}
      </label>
      {children}
      {error ? <p className="mt-1 text-xs text-rose-600">{error}</p> : null}
      {trailing ? <div className="mt-2">{trailing}</div> : null}
    </div>
  )
}

function Row({ label, value, multiline }) {
  return (
    <div className="py-2 text-sm">
      <div className="text-slate-500 dark:text-slate-400">{label}</div>
      <div className={`font-medium text-slate-800 dark:text-slate-100 ${multiline ? 'whitespace-pre-wrap' : ''}`}>{value}</div>
    </div>
  )
}

function StepDot({ active, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${active ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'}`} />
      <span className={`text-xs ${active ? 'text-slate-800 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>{label}</span>
    </div>
  )
}
function Connector() {
  return <span className="h-px w-6 bg-slate-300 dark:bg-slate-700" />
}

/* ---------- Icons (no extra deps) ---------- */
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M6 20c0-3.3137 2.6863-6 6-6s6 2.6863 6 6" />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  )
}
function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 118 0v3" />
    </svg>
  )
}
