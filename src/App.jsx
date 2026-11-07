import { useState } from 'react'
import { supabase } from './lib/supabase'
import './App.css'

const FOOTER_LINKS = [
  'Meta', 'About', 'Blog', 'Jobs', 'Help', 'API', 'Privacy', 'Terms',
  'Locations', 'Openform Lite', 'Threads', 'Contact uploading', 'Verified',
]

function App() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  // Instagram enables the button once the password hits 6 characters
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
        "Sorry, your password was incorrect. Please double-check your password."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page">
      <div className="content">
        <div className="phones" aria-hidden="true">
          <div className="phone phone-back">
            <div className="phone-screen shot-1" />
          </div>
          <div className="phone phone-front">
            <div className="phone-screen shot-2" />
          </div>
        </div>

        <div className="login-container">
          <form className="form-card" onSubmit={handleSubmit}>
            <h1 className="logo">Openform</h1>

            <div className="field">
              <input
                id="identifier"
                type="text"
                placeholder=" "
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                autoComplete="username"
                maxLength={100}
              />
              <label htmlFor="identifier">Phone number, username, or email</label>
            </div>

            <div className="field">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="has-toggle"
              />
              <label htmlFor="password">Password</label>

              {password && (
                <button
                  type="button"
                  className="show-btn"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              )}
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading || !canSubmit}
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>

            <div className="separator">
              <span />
              <p>OR</p>
              <span />
            </div>

            <a className="alt-login" href="#!">Log in with Facebook</a>

            {message && (
              <p
                role="status"
                className={`form-message ${success ? 'success' : 'error'}`}
              >
                {message}
              </p>
            )}

            <a className="forgot" href="#!">Forgot password?</a>
          </form>

          <div className="signup-card">
            Don't have an account? <a href="#!">Sign up</a>
          </div>

          <div className="get-app">
            <p>Get the app.</p>
            <div className="badges">
              <a href="#!" className="badge">
                <small>Download on the</small>
                <strong>App Store</strong>
              </a>
              <a href="#!" className="badge">
                <small>GET IT ON</small>
                <strong>Google Play</strong>
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <nav>
          {FOOTER_LINKS.map((link) => (
            <a key={link} href="#!">{link}</a>
          ))}
        </nav>
        <div className="footer-bottom">
          <span>English ▾</span>
          <span>© 2026 Openform</span>
        </div>
      </footer>
    </main>
  )
}

export default App