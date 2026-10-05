import React, { createContext, useState, useEffect, useContext } from 'react';
import { getMe, login as apiLogin, logout as apiLogout } from '../services/authApi';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await getMe(token);
          if (res.success) {
            setUser(res.data.user);
          } else {
            logout();
          }
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await apiLogin(email, password);
      if (res.success) {
        setUser(res.data.user);
        setToken(res.data.accessToken);
        localStorage.setItem('token', res.data.accessToken);
        if (res.data.refreshToken) {
          localStorage.setItem('refreshToken', res.data.refreshToken);
        }
        return { success: true };
      }
      return res;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
