import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  cardNumber: string;
  joinedAt: string;
}

interface AuthState {
  user: User | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
}

const AuthCtx = createContext<AuthState | null>(null);
const STORAGE_KEY = 'ledger:user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const login = (email: string, name?: string) => {
    const derivedName = name?.trim() || email.split('@')[0];
    const cardNumber = 'NL-' + String(Math.floor(100 + Math.random() * 899)).padStart(6, '0');
    setUser({
      id: 'u_' + Math.random().toString(36).slice(2, 8),
      name: derivedName,
      email,
      cardNumber,
      joinedAt: new Date().toISOString(),
    });
  };
  const logout = () => setUser(null);

  return <AuthCtx.Provider value={{ user, login, logout }}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}