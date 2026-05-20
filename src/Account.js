import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from './context/AppContext'

export default function Account() {
  const { user, signUp, signIn, signOut, authError, setAuthError } = useApp()
  const navigate = useNavigate()
  const [tab, setTab] = useState('signin') // 'signin' | 'signup'

  // ── Sign Up form ──────────────────────────────────────────────────────────
  const [signUpForm, setSignUpForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [signUpErrors, setSignUpErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [signedUp, setSignedUp] = useState(false)

  // ── Sign In form ──────────────────────────────────────────────────────────
  const [signInForm, setSignInForm] = useState({ email: '', password: '' })
  const [showSignInPass, setShowSignInPass] = useState(false)

  const validateSignUp = () => {
    const e = {}
    if (!signUpForm.fullName.trim()) e.fullName = 'Full name is required.'
    if (!signUpForm.email.trim()) e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpForm.email))
      e.email = 'Enter a valid email address.'
    if (!signUpForm.phone.trim()) e.phone = 'Phone number is required.'
    else if (!/^\+?[\d\s\-().]{7,}$/.test(signUpForm.phone))
      e.phone = 'Enter a valid phone number.'
    if (!signUpForm.password) e.password = 'Password is required.'
    else if (signUpForm.password.length < 8)
      e.password = 'Password must be at least 8 characters.'
    if (!signUpForm.confirmPassword)
      e.confirmPassword = 'Please confirm your password.'
    else if (signUpForm.password !== signUpForm.confirmPassword)
      e.confirmPassword = 'Passwords do not match.'
    return e
  }

  const handleSignUpChange = (e) => {
    const { name, value } = e.target
    setSignUpForm((prev) => ({ ...prev, [name]: value }))
    if (signUpErrors[name])
      setSignUpErrors((prev) => ({ ...prev, [name]: undefined }))
    setAuthError('')
  }

  const handleSignUpSubmit = async (e) => {
    e.preventDefault()
    const errs = validateSignUp()
    if (Object.keys(errs).length > 0) {
      setSignUpErrors(errs)
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    const ok = signUp(signUpForm)
    setLoading(false)
    if (ok) setSignedUp(true)
  }

  const handleSignInSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    const ok = signIn(signInForm.email, signInForm.password)
    setLoading(false)
    if (ok) navigate('/Home')
  }

  // ── Already logged in ─────────────────────────────────────────────────────
  if (user) {
    return (
      <div className="signup-page">
        <div className="signup-card">
          <div className="success-ring">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4ade80"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="success-title">
            Welcome back,{' '}
            <span className="highlight">{user.fullName.split(' ')[0]}</span>!
          </h2>
          <p className="success-sub" style={{ marginBottom: 20 }}>
            You are signed in as{' '}
            <strong className="highlight">{user.email}</strong>.
          </p>
          <button className="btn" onClick={signOut}>
            Sign Out
          </button>
          <button
            className="btn"
            style={{
              marginTop: 10,
              background: 'transparent',
              border: '1px solid #a78bfa',
              color: '#a78bfa',
            }}
            onClick={() => navigate('/Home')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  // ── Success screen after sign-up ──────────────────────────────────────────
  if (signedUp) {
    return (
      <div className="signup-page">
        <div className="signup-card">
          <div className="success-ring">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4ade80"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="success-title">Account created!</h2>
          <p className="success-sub">
            Welcome,{' '}
            <strong className="highlight">
              {signUpForm.fullName.split(' ')[0]}
            </strong>
            . Your account is ready.
          </p>
          <button
            className="btn"
            style={{ marginTop: 16 }}
            onClick={() => navigate('/Home')}
          >
            Start Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="logo-mark">W</div>

        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            gap: 0,
            marginBottom: 24,
            border: '1px solid #27273a',
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >
          {['signin', 'signup'].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t)
                setAuthError('')
              }}
              style={{
                flex: 1,
                padding: '11px 0',
                background: tab === t ? '#6c5ce7' : 'transparent',
                color: tab === t ? '#fff' : '#6b6b8a',
                border: 'none',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s',
              }}
            >
              {t === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        {/* Global auth error */}
        {authError && (
          <div
            style={{
              background: '#2a0a0a',
              border: '1px solid #f87171',
              borderRadius: 8,
              padding: '10px 14px',
              color: '#f87171',
              fontSize: 13,
              marginBottom: 16,
            }}
          >
            {authError}
          </div>
        )}

        {/* ── SIGN IN ── */}
        {tab === 'signin' && (
          <form
            onSubmit={handleSignInSubmit}
            noValidate
            className="signup-form"
          >
            <Field
              label="Email Address"
              name="email"
              type="email"
              placeholder="jane@example.com"
              value={signInForm.email}
              onChange={(e) =>
                setSignInForm((p) => ({ ...p, email: e.target.value }))
              }
              icon={<IconMail />}
            />
            <PasswordField
              label="Password"
              name="password"
              placeholder="Your password"
              value={signInForm.password}
              onChange={(e) =>
                setSignInForm((p) => ({ ...p, password: e.target.value }))
              }
              show={showSignInPass}
              onToggle={() => setShowSignInPass((v) => !v)}
            />
            <button
              type="submit"
              disabled={loading}
              className={`btn${loading ? ' btn--loading' : ''}`}
              style={{ marginTop: 8 }}
            >
              {loading ? (
                <span className="btn-inner">
                  <Spinner /> Signing in…
                </span>
              ) : (
                'Sign In'
              )}
            </button>
            <p className="login-link" style={{ marginTop: 12 }}>
              No account?{' '}
              <button
                type="button"
                onClick={() => setTab('signup')}
                className="link"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Create one
              </button>
            </p>
          </form>
        )}

        {/* ── SIGN UP ── */}
        {tab === 'signup' && (
          <form
            onSubmit={handleSignUpSubmit}
            noValidate
            className="signup-form"
          >
            <Field
              label="Full Name"
              name="fullName"
              type="text"
              placeholder="Jane Doe"
              value={signUpForm.fullName}
              onChange={handleSignUpChange}
              error={signUpErrors.fullName}
              icon={<IconUser />}
            />
            <Field
              label="Email Address"
              name="email"
              type="email"
              placeholder="jane@example.com"
              value={signUpForm.email}
              onChange={handleSignUpChange}
              error={signUpErrors.email}
              icon={<IconMail />}
            />
            <Field
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="+1 234 567 8900"
              value={signUpForm.phone}
              onChange={handleSignUpChange}
              error={signUpErrors.phone}
              icon={<IconPhone />}
            />
            <PasswordField
              label="Password"
              name="password"
              placeholder="Min. 8 characters"
              value={signUpForm.password}
              onChange={handleSignUpChange}
              error={signUpErrors.password}
              show={showPassword}
              onToggle={() => setShowPassword((v) => !v)}
            />
            <PasswordField
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={signUpForm.confirmPassword}
              onChange={handleSignUpChange}
              error={signUpErrors.confirmPassword}
              show={showConfirm}
              onToggle={() => setShowConfirm((v) => !v)}
            />
            {signUpForm.password && (
              <StrengthBar password={signUpForm.password} />
            )}
            <button
              type="submit"
              disabled={loading}
              className={`btn${loading ? ' btn--loading' : ''}`}
            >
              {loading ? (
                <span className="btn-inner">
                  <Spinner /> Creating account…
                </span>
              ) : (
                'Create Account'
              )}
            </button>
            <p className="login-link" style={{ marginTop: 12 }}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setTab('signin')}
                className="link"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Sign in
              </button>
            </p>
          </form>
        )}

        <p className="terms">
          By continuing, you agree to our{' '}
          <a href="#!" className="link">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#!" className="link">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}

// ─── Sub-components (unchanged from original) ─────────────────────────────────

function Field({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
  icon,
}) {
  return (
    <div className="field-group">
      <label htmlFor={name} className="field-label">
        {label}
      </label>
      <div className="input-wrap">
        <span className="input-icon">{icon}</span>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`field-input${error ? ' field-input--error' : ''}`}
          aria-describedby={error ? `${name}-err` : undefined}
        />
      </div>
      {error && (
        <span id={`${name}-err`} className="error-text">
          {error}
        </span>
      )}
    </div>
  )
}

function PasswordField({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  show,
  onToggle,
}) {
  return (
    <div className="field-group">
      <label htmlFor={name} className="field-label">
        {label}
      </label>
      <div className="input-wrap">
        <span className="input-icon">
          <IconLock />
        </span>
        <input
          id={name}
          name={name}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`field-input field-input--password${error ? ' field-input--error' : ''}`}
          aria-describedby={error ? `${name}-err` : undefined}
        />
        <button
          type="button"
          onClick={onToggle}
          className="eye-btn"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <IconEyeOff /> : <IconEye />}
        </button>
      </div>
      {error && (
        <span id={`${name}-err`} className="error-text">
          {error}
        </span>
      )}
    </div>
  )
}

function StrengthBar({ password }) {
  const getStrength = () => {
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    return score
  }
  const strength = getStrength()
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const classes = [
    '',
    'strength--weak',
    'strength--fair',
    'strength--good',
    'strength--strong',
  ]
  return (
    <div className="strength-wrap">
      <div className="strength-bars">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`strength-bar${i <= strength ? ` ${classes[strength]}` : ''}`}
          />
        ))}
      </div>
      {strength > 0 && (
        <p className={`strength-label ${classes[strength]}`}>
          {labels[strength]}
        </p>
      )}
    </div>
  )
}

function Spinner() {
  return (
    <svg
      className="spinner"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  )
}

function IconUser() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}
function IconMail() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2,4 12,13 22,4" />
    </svg>
  )
}
function IconPhone() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
function IconLock() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
function IconEye() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
function IconEyeOff() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}
