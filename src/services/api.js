import axios from 'axios';

// Single explicit base URL (change with REACT_APP_API if needed)
const BASE = (process.env.REACT_APP_API || 'http://127.0.0.1:4000/').replace(/\/+$/, '/') ;

export const api = axios.create({
  baseURL: BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export const pingApi = async () => {
  try {
    const r = await api.get('users');
    return { ok: true, status: r.status };
  } catch (e) {
    return { ok: false, error: e?.message || 'API not reachable' };
  }
};

// REST helpers (resource paths only—no leading slash)
export const getCourses = (params = {}) => api.get('courses', { params });
export const getCourse  = (id)              => api.get(`courses/${id}`);

export const getUsers   = (params = {}) => api.get('users', { params });
export const createUser = (payload)     => api.post('users', payload);

export const getEnrollments   = (params = {}) => api.get('enrollments', { params });
export const createEnrollment = (payload)     => api.post('enrollments', payload);
export const updateEnrollment = (id, payload) => api.patch(`enrollments/${id}`, payload);
