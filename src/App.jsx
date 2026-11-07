
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
      // Send data to Supabase
      const { error } = await supabase
        .from('submissions')
        .insert({
          username: cleanUsername,
          interests: cleanInterests,
        })

      if (error) throw error

      // Submission successful
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
      <form className="form-card" onSubmit={handleSubmit}>
        <h1>Openform<span>.</span></h1>
        <p>Tell us a little about yourself.</p>

        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={100}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="interests">Interests</label>
          <textarea
            id="interests"
            placeholder="Tell us about your interests..."
            rows={5}
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
      </form>
    </main>
  )
}

export default App
