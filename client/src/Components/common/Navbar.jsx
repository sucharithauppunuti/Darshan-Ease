import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Compass,
  CalendarCheck,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  LayoutDashboard,
  Home as HomeIcon
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F7F0E4]/95 backdrop-blur-md border-b border-[#C5A15B]/30 shadow-xs transition-all">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Divine Branding */}
          <Link to="/" className="flex items-center space-x-3 group shrink-0 focus:outline-none">
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#321B1D] via-[#4A1A1E] to-[#E87519] p-0.5 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-[#F7F0E4] rounded-[14px] flex items-center justify-center border border-[#C5A15B]/40">
                <span className="text-xl select-none" role="img" aria-label="Om Sacred Symbol">🕉️</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#E87519] border-2 border-[#F7F0E4]"></div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#321B1D] group-hover:text-[#E87519] transition-colors">
                  DarshanEase
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E87519]/10 text-[#E87519] border border-[#E87519]/25">
                  Temple Darshan
                </span>
              </div>
              <p className="text-[11px] font-medium text-[#7D7060] tracking-wide">
                Every Devotee Closer to the Divine
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
            <Link
              to="/"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center space-x-1.5 ${
                isActive('/') && location.pathname === '/'
                  ? 'text-[#321B1D] bg-[#E87519]/10 font-bold border border-[#E87519]/25 shadow-xs'
                  : 'text-[#321B1D] hover:text-[#E87519] hover:bg-white/60'
              }`}
            >
              <HomeIcon className="w-4 h-4 text-[#C5A15B]" />
              <span>Home</span>
            </Link>

            <Link
              to="/temples"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center space-x-1.5 ${
                isActive('/temples')
                  ? 'text-[#321B1D] bg-[#E87519]/10 font-bold border border-[#E87519]/25 shadow-xs'
                  : 'text-[#321B1D] hover:text-[#E87519] hover:bg-white/60'
              }`}
            >
              <Compass className="w-4 h-4 text-[#C5A15B]" />
              <span>Explore Temples</span>
            </Link>

            <Link
              to="/my-bookings"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center space-x-1.5 ${
                isActive('/my-bookings')
                  ? 'text-[#321B1D] bg-[#E87519]/10 font-bold border border-[#E87519]/25 shadow-xs'
                  : 'text-[#321B1D] hover:text-[#E87519] hover:bg-white/60'
              }`}
            >
              <CalendarCheck className="w-4 h-4 text-[#C5A15B]" />
              <span>My Bookings</span>
            </Link>

            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-100/90 hover:bg-amber-200 border border-amber-300 transition-colors flex items-center space-x-1.5 ml-1"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#E87519]" />
                <span>Admin Console</span>
              </Link>
            )}
          </nav>

          {/* Right Action Icons: Notifications & User Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Notifications Button */}
            {isAuthenticated && (
              <Link
                to="/notifications"
                className="relative p-2.5 rounded-full text-[#321B1D] hover:text-[#E87519] hover:bg-white/60 border border-[#C5A15B]/30 hover:border-[#C5A15B] transition-colors"
                title="Sacred Darshan Notifications"
                aria-label="View booking notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#E87519] text-[10px] font-bold text-white shadow-sm ring-2 ring-[#F7F0E4] animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Link>
            )}

            {/* Profile Dropdown or Sign In */}
            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2.5 p-1.5 pl-2.5 pr-3 rounded-full border border-[#C5A15B]/50 hover:border-[#E87519] bg-white shadow-xs hover:shadow-md transition-all focus:outline-none cursor-pointer"
                  aria-expanded={profileDropdownOpen}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#321B1D] to-[#E87519] text-[#E2C889] flex items-center justify-center font-bold text-xs shadow-inner border border-[#C5A15B]/40">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="text-left hidden lg:block">
                    <span className="block text-xs font-bold text-[#1A1815] max-w-[120px] truncate leading-tight">
                      {user?.name?.split(' ')[0] || 'Devotee'}
                    </span>
                    <span className="block text-[10px] text-[#7D7060] font-medium leading-tight">
                      {user?.role === 'admin' ? 'Admin' : 'Devotee'}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-[#C5A15B]/40 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-3 border-b border-gray-100 bg-[#F7F0E4]/70 rounded-t-2xl">
                      <p className="text-xs font-bold text-[#321B1D] truncate">{user?.name}</p>
                      <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
                      <div className="flex items-center space-x-1 mt-1.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#E87519]/10 text-[#E87519] border border-[#E87519]/20 uppercase tracking-wider">
                          <ShieldCheck className="w-2.5 h-2.5 mr-1" />
                          {user?.role === 'admin' ? 'Administrator' : 'Verified Devotee'}
                        </span>
                      </div>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center space-x-2.5 px-4 py-2.5 text-xs text-gray-700 hover:bg-[#F7F0E4] hover:text-[#E87519] transition-colors"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <User className="w-4 h-4 text-[#C5A15B]" />
                      <span className="font-medium">My Account</span>
                    </Link>

                    <Link
                      to="/my-bookings"
                      className="flex items-center space-x-2.5 px-4 py-2.5 text-xs text-gray-700 hover:bg-[#F7F0E4] hover:text-[#E87519] transition-colors"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <CalendarCheck className="w-4 h-4 text-[#C5A15B]" />
                      <span className="font-medium">My Darshan Bookings</span>
                    </Link>

                    <Link
                      to="/notifications"
                      className="flex items-center justify-between px-4 py-2.5 text-xs text-gray-700 hover:bg-[#F7F0E4] hover:text-[#E87519] transition-colors"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Bell className="w-4 h-4 text-[#C5A15B]" />
                        <span className="font-medium">Notifications</span>
                      </div>
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#E87519] text-white">
                          {unreadCount} new
                        </span>
                      )}
                    </Link>

                    <Link
                      to="/temples"
                      className="flex items-center space-x-2.5 px-4 py-2.5 text-xs text-gray-700 hover:bg-[#F7F0E4] hover:text-[#E87519] transition-colors"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <Compass className="w-4 h-4 text-[#C5A15B]" />
                      <span className="font-medium">Explore All Temples</span>
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center space-x-2.5 px-4 py-2.5 text-xs text-amber-900 bg-amber-50/80 hover:bg-amber-100 transition-colors font-semibold"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#E87519]" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#321B1D] hover:text-[#E87519] hover:bg-white/60 border border-[#C5A15B]/35 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#E87519] hover:bg-[#D4630A] text-white shadow-sm hover:shadow-md transition-all"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-gray-700 hover:text-[#E87519] hover:bg-white/60 border border-[#C5A15B]/30 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#C5A15B]/25 space-y-2 animate-in fade-in duration-150">
            <Link
              to="/"
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center space-x-2.5 ${
                location.pathname === '/' ? 'text-[#321B1D] bg-[#E87519]/10 font-bold border border-[#E87519]/25' : 'text-gray-800'
              }`}
            >
              <HomeIcon className="w-4 h-4 text-[#C5A15B]" />
              <span>Home</span>
            </Link>

            <Link
              to="/temples"
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center space-x-2.5 ${
                isActive('/temples') ? 'text-[#321B1D] bg-[#E87519]/10 font-bold border border-[#E87519]/25' : 'text-gray-800'
              }`}
            >
              <Compass className="w-4 h-4 text-[#C5A15B]" />
              <span>Explore Temples</span>
            </Link>

            <Link
              to="/my-bookings"
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center space-x-2.5 ${
                isActive('/my-bookings') ? 'text-[#321B1D] bg-[#E87519]/10 font-bold border border-[#E87519]/25' : 'text-gray-800'
              }`}
            >
              <CalendarCheck className="w-4 h-4 text-[#C5A15B]" />
              <span>My Bookings</span>
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-800"
                >
                  <User className="w-4 h-4 text-[#C5A15B]" />
                  <span>My Account</span>
                </Link>

                <Link
                  to="/notifications"
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-800"
                >
                  <div className="flex items-center space-x-2.5">
                    <Bell className="w-4 h-4 text-[#C5A15B]" />
                    <span>Notifications</span>
                  </div>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#E87519] text-white">
                      {unreadCount}
                    </span>
                  )}
                </Link>
              </>
            )}

            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className="block px-4 py-2.5 rounded-xl text-sm font-bold text-amber-900 bg-amber-50 border border-amber-200"
              >
                Admin Dashboard
              </Link>
            )}

            {!isAuthenticated && (
              <div className="pt-3 flex items-center space-x-3 px-2">
                <Link
                  to="/login"
                  className="flex-1 text-center py-2.5 rounded-xl border border-[#C5A15B]/50 text-xs font-bold text-gray-800 hover:bg-white"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="flex-1 text-center py-2.5 rounded-xl bg-[#E87519] text-white text-xs font-bold shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
