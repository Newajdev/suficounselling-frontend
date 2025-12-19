import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/dashboard') {
      // Exact match for dashboard
      return location.pathname === path;
    }
    // For nested routes, check if current path starts with the route path
    return location.pathname.startsWith(path);
  };

  // Navigation items with role-based visibility
  const navigationItems = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      roles: ['superAdmin'],
    },
    {
      title: 'All User',
      path: '/dashboard/users',
      roles: ['admin', 'superAdmin'],
    },
    {
      title: 'Write a Foriyadi',
      path: '/dashboard/foriyadi/create',
      roles: ['admin', 'superAdmin', 'distributor', 'writer'],
    },
    {
      title: 'Foriyadis Written By You',
      path: '/dashboard/foriyadi/my-list',
      roles: ['admin', 'superAdmin', 'distributor', 'writer'],
    },
    {
      title: 'Total Foriyadi List',
      path: '/dashboard/foriyadi/all',
      roles: ['superAdmin', 'admin', 'distributor', 'writer', 'view'],
    },
    {
      title: 'Search Foriyadi',
      path: '/dashboard/foriyadi/search',
      roles: ['view'],
    },
    {
      title: 'Landing Manager',
      path: '/dashboard/landing-manager',
      roles: ['superAdmin'],
    },
  ];

  // Filter navigation items based on user role
  const visibleItems = navigationItems.filter((item) => {
    if (!user) return false;
    return item.roles.includes(user.role);
  });

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="w-64 bg-[#1F3B45] text-white flex flex-col h-screen">
      {/* Top Section - Logo */}
      <div className="p-6 border-b border-gray-600">
        <div className="flex items-center gap-3">
          <img src="/Logo.png" alt="Logo" className="w-12 h-12" />
          <div className="text-sm leading-tight">
            <div className="font-bold">DIRI Sufi</div>
            <div className="font-bold">Counselling</div>
            <div className="font-bold">Center</div>
          </div>
        </div>
      </div>

      {/* User Info Section */}
      {user && (
        <div className="p-4 border-b border-gray-600">
          <div className="text-sm">
            <div className="font-semibold text-gray-200">{user.userName || 'User'}</div>
            <div className="text-gray-400 text-xs mt-1 capitalize">{user.role}</div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {visibleItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-[#315e68] text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-600">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-white font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

