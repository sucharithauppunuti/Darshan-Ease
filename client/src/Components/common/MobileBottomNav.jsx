import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { Home, Compass, CalendarCheck, Bell, User } from 'lucide-react';

const MobileBottomNav = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { unreadCount } = useNotifications();

  const isActive = (path) => location.pathname === path;

  // Don't show bottom nav inside full screen print view or admin layout
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#D4AF37]/35 shadow-lg px-2 py-2 flex items-center justify-around print:hidden">
      {/* Home */}
      <Link
        to="/"
        className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
          isActive('/') || isActive('/home')
            ? 'text-[#E65100] font-bold'
            : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Home</span>
      </Link>

      {/* Temples */}
      <Link
        to="/temples"
        className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
          isActive('/temples')
            ? 'text-[#E65100] font-bold'
            : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        <Compass className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Temples</span>
      </Link>

      {/* My Bookings */}
      <Link
        to={isAuthenticated ? '/my-bookings' : '/login'}
        className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
          isActive('/my-bookings')
            ? 'text-[#E65100] font-bold'
            : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        <CalendarCheck className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Bookings</span>
      </Link>

      {/* Notifications */}
      <Link
        to={isAuthenticated ? '/notifications' : '/login'}
        className={`relative flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
          isActive('/notifications')
            ? 'text-[#E65100] font-bold'
            : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        <div className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[15px] h-[15px] px-0.5 text-[9px] font-bold text-white bg-[#E65100] rounded-full">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5">Alerts</span>
      </Link>

      {/* Profile / Account */}
      <Link
        to={isAuthenticated ? '/profile' : '/login'}
        className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
          isActive('/profile') || isActive('/login') || isActive('/register')
            ? 'text-[#E65100] font-bold'
            : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        <User className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">{isAuthenticated ? 'Profile' : 'Sign In'}</span>
      </Link>
    </div>
  );
};

export default MobileBottomNav;
