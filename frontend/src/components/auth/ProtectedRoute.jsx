import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PageLoader } from '../common/Loader';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <PageLoader message="Verifying session security..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (adminOnly && user?.role !== 'admin') {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
        <span className="text-4xl">🚫</span>
        <h2 className="text-xl font-bold text-slate-800">Administrative Access Required</h2>
        <p className="text-sm text-slate-500 max-w-sm">
          You do not have administrative privileges to view this control panel.
        </p>
      </div>
    );
  }

  return children;
}
