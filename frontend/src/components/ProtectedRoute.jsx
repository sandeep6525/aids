import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-bg-main"><p className="font-bold text-brand-primary text-xl">Loading...</p></div>;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole && user.role !== 'SUPER_ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-main text-center p-8">
        <div>
          <h1 className="text-4xl font-bold text-red-600 mb-4">403 Forbidden</h1>
          <p className="text-brand-primary text-xl mb-6">You do not have permission to access this page.</p>
          <a href="/admin" className="btn-primary px-6 py-2 rounded">Go to Dashboard</a>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
