// src/context/AuthContext.jsx
import { createContext, useContext, useMemo, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { getUsers, createUser, pingApi } from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('ProE_user', null);
  const [loading, setLoading] = useState(false);

  const normalizeEmail = (e) => (e || '').trim().toLowerCase();

  const explainAxiosError = (e) => {
    if (e?.code === 'ERR_NETWORK') return 'Network unreachable.';
    if (e?.response?.status === 404) return 'API route not found. Ensure db.json has "users", "courses", "enrollments".';
    if (e?.response?.status) return `Server error ${e.response.status}`;
    return 'Unexpected error';
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const em = normalizeEmail(email);
      const pw = (password || '').trim();
      if (!em || !pw) return { ok: false, error: 'Email and password are required' };

      // Ping is informational only — do not block on it
      await pingApi();

      // Try server-side filter by email
      let { data } = await getUsers({ email: em });

      // Fallback: fetch all and match locally (covers mock / case issues)
      if (!Array.isArray(data) || data.length === 0) {
        const all = await getUsers({});
        data = Array.isArray(all.data) ? all.data.filter((u) => normalizeEmail(u.email) === em) : [];
      }

      if (data.length) {
        const found = data[0];
        if ((found.password || '') === pw) {
          setUser(found);
          return { ok: true };
        }
      }
      return { ok: false, error: 'Invalid credentials' };
    } catch (e) {
      console.error('[LOGIN ERROR]', e);
      return { ok: false, error: explainAxiosError(e) };
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const em = normalizeEmail(payload?.email);
      const pw = (payload?.password || '').trim();
      if (!em || !pw) return { ok: false, error: 'Email and password are required' };

      // Ping is informational only — do not block on it
      await pingApi();

      // Check if email exists (normalized), using both filtered and full lists
      const existing = await getUsers({ email: em });
      let exists =
        Array.isArray(existing.data) && existing.data.some((u) => normalizeEmail(u.email) === em);
      if (!exists) {
        const all = await getUsers({});
        exists = Array.isArray(all.data) && all.data.some((u) => normalizeEmail(u.email) === em);
      }
      if (exists) return { ok: false, error: 'Email already registered' };

      const { data } = await createUser({
        name: (payload.name || em.split('@')[0]).trim(),
        email: em,
        password: pw, // plaintext for demo only
        interests: payload.interests || [],
        bio: (payload.bio || '').trim(),
        avatar:
          payload.avatar ||
          `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(payload.name || em)}`
      });

      setUser(data);
      return { ok: true };
    } catch (e) {
      console.error('[REGISTER ERROR]', e);
      return { ok: false, error: explainAxiosError(e) };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>.');
  return ctx;
};
