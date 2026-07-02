import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export function Login() {
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();
  const location = useLocation() as { state?: { from?: { pathname?: string }; redirectTo?: string } };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    login(email, mode === 'register' ? name : undefined);
    const dest = location.state?.redirectTo || location.state?.from?.pathname || '/';
    nav(dest, { replace: true });
  };

  return (
    <div className="form-page">
      <form className="form" onSubmit={submit}>
        <div className="subline">{mode === 'signin' ? 'Sign in · returning member' : 'Enrollment · new member'}</div>
        <h1>{mode === 'signin' ? 'Present your card.' : 'Get a library card.'}</h1>

        <hr className="divider" />

        {mode === 'register' && (
          <div className="field">
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sam Rivera" required />
          </div>
        )}
        <div className="field">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@street.example" required />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="•••••••" required />
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 16, alignItems: 'center' }}>
          <button type="submit" className="btn">{mode === 'signin' ? 'Sign in' : 'Enroll'}</button>
          <button
            type="button"
            className="chip"
            onClick={() => setMode(mode === 'signin' ? 'register' : 'signin')}
          >
            {mode === 'signin' ? 'New here? Enroll' : 'Have a card? Sign in'}
          </button>
        </div>

        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--pencil)', marginTop: 18, letterSpacing: 1 }}>
          NOTE — This is a prototype. Any email/password will let you in; nothing is sent anywhere.
        </div>
      </form>
    </div>
  );
}