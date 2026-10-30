import React from 'react';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, User, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminLayout = ({ children, title, subtitle }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Admin Header */}
        <header className="h-16 bg-white border-b border-[#D4AF37]/25 px-6 sm:px-8 flex items-center justify-between shadow-xs">
          <div>
            <h1 className="font-serif text-lg font-bold text-[#6B1D2F] truncate">
              {title || 'Temple Administration Console'}
            </h1>
            {subtitle && (
              <p className="text-xs text-[#E65100] font-medium italic hidden sm:block tracking-wide">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-xs font-semibold text-[#E65100] hover:underline"
            >
              Public Site →
            </Link>

            {user ? (
              <div className="flex items-center space-x-2 pl-4 border-l border-gray-200">
                <div className="w-8 h-8 rounded-full bg-[#6B1D2F] text-white flex items-center justify-center font-bold text-xs">
                  {user.name?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div className="text-left text-xs leading-tight hidden sm:block">
                  <p className="font-bold text-gray-900">{user.name}</p>
                  <p className="text-[10px] text-emerald-600 font-semibold uppercase">{user.role === 'admin' ? 'Admin Active' : 'Devotee'}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 pl-4 border-l border-gray-200">
                <Link
                  to="/login"
                  className="px-3 py-1.5 rounded-lg bg-[#E65100] hover:bg-[#BF360C] text-white text-xs font-semibold shadow-xs transition-colors flex items-center space-x-1"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Admin Sign In</span>
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
