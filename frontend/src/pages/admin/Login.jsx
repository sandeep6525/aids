import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);
    
    try {
      const res = await login(email, password);
      if (res.success) {
        navigate('/admin');
      } else {
        setError(res.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-main flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary rounded mb-4 shadow-sm">
          <Lock className="text-brand-accent w-8 h-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-brand-primary">Admin Portal Login</h2>
        <p className="mt-2 text-sm text-text-secondary">Department of Artificial Intelligence</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-border-subtle">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm font-medium">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-semibold text-brand-primary mb-1" htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-border-subtle rounded shadow-sm focus:outline-none focus:ring-gold focus:border-brand-accent sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-primary mb-1" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                required
                className="appearance-none block w-full px-3 py-2 border border-border-subtle rounded shadow-sm focus:outline-none focus:ring-gold focus:border-brand-accent sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 text-brand-accent focus:ring-gold border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary">Remember me</label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoggingIn}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition-colors ${isLoggingIn ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoggingIn ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
