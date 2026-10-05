const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const login = async (email, password) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return await res.json();
  } catch (error) {
    throw new Error('Network error during login.');
  }
};

export const logout = async () => {
  try {
    await fetch(`${API_URL}/auth/logout`, { method: 'POST' });
  } catch (error) {
    console.error(error);
  }
};

export const getMe = async (token) => {
  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return await res.json();
  } catch (error) {
    throw new Error('Network error while fetching profile.');
  }
};

// Generic fetcher for authenticated routes
export const fetchWithAuth = async (endpoint, options = {}, token) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers
  };
  
  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  
  // Basic handling for expired tokens can be added here
  // e.g., if res.status === 401/403, attempt refresh token flow
  
  return await res.json();
};
