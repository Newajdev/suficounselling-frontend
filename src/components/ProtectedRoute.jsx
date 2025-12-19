import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from './DashboardLayout';

const ProtectedRoute = ({ children, allowedRoles = null, showLayoutOnUnauthorized = false }) => {
  const { isAuthenticated, hasRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !hasRole(allowedRoles)) {
    const unauthorizedContent = (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Unauthorized</h1>
          <p className="text-gray-600">You do not have permission to access this page.</p>
        </div>
      </div>
    );

    if (showLayoutOnUnauthorized) {
      return <DashboardLayout>{unauthorizedContent}</DashboardLayout>;
    }

    return unauthorizedContent;
  }

  return children;
};

export default ProtectedRoute;

