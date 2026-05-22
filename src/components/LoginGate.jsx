import { useState } from 'react'

const CORRECT_USER = 'forgeadmin'
const CORRECT_PASS = 'forgepass1!'
const SESSION_KEY = 'forge_demo_auth'

export default function LoginGate({ children }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (authed) return children

  function handleSubmit(e) {
    e.preventDefault()
    if (username === CORRECT_USER && password === CORRECT_PASS) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setAuthed(true)
    } else {
      setError('Invalid username or password.')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-forge-navy flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex items-center gap-3 justify-center mb-8">
          <div className="w-10 h-10 bg-forge-fire rounded-sm flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
              <path d="M4 18h16v2H4zM4 14h4v4H4zM9 10h6v8H9zM16 14h4v4h-4zM7 6h10l2 4H5z"/>
            </svg>
          </div>
          <div className="leading-none">
            <span className="font-display text-2xl font-bold text-white tracking-wide">FORGE</span>
            <span className="block text-forge-fire text-xs font-semibold tracking-widest uppercase">Elevator</span>
          </div>
        </div>

        <div className="bg-white rounded-sm shadow-2xl p-8">
          <h1 className="font-display text-2xl font-bold text-forge-navy mb-1">Preview Access</h1>
          <p className="text-gray-400 text-sm mb-7">This site is currently in private preview.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-user" className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                Username
              </label>
              <input
                id="login-user"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError('') }}
                className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forge-fire/40 transition"
                placeholder="Username"
              />
            </div>

            <div>
              <label htmlFor="login-pass" className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                Password
              </label>
              <input
                id="login-pass"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forge-fire/40 transition"
                placeholder="Password"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs">{error}</p>
            )}

            <button type="submit" className="btn-primary w-full justify-center py-3 text-sm mt-2">
              Enter Site
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-5">
          Demo preview — not publicly accessible yet.
        </p>
      </div>
    </div>
  )
}
