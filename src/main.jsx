
import { useState } from 'react'
import { supabase } from './lib/supabase'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [interests, setInterests] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setSuccess(false)

    const cleanUsername = username.trim()
    const cleanInterests = interests.trim()

    if (!cleanUsername || !cleanInterests) {
      setMessage('Please fill in both fields.')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase
        .from('submissions')
        .insert({
          username: cleanUsername,
          interests: cleanInterests,
        })

      if (error) throw error

      setUsername('')
      setInterests('')
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
      <div className="login-container">

        <form className="form-card" onSubmit={handleSubmit}>

          <h1 className="logo">Openform</h1>

          <p className="subtitle">
            Sign up to share a little about yourself.
          </p>

          <div className="field">
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={100}
              required
            />
          </div>

          <div className="field">
            <textarea
              id="interests"
              placeholder="Your interests, hobbies, passions..."
              rows={4}
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              maxLength={5000}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>

          {message && (
            <p
              role="status"
              className={`form-message ${success ? 'success' : 'error'}`}
            >
              {message}
            </p>
          )}

          <div className="separator">
            <span />
            <p>OR</p>
            <span />
          </div>

          <p className="facebook-text">
            Share what makes you, you.
          </p>

        </form>

        <div className="signup-card">
          Don't have an account? <span>Get started</span>
        </div>

        <footer>
          © 2026 OPENFORM
        </footer>

      </div>
    </main>
  )
}

export default App
