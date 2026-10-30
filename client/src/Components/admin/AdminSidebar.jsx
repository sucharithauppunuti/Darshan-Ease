import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Landmark,
  Layers,
  CalendarDays,
  TicketCheck,
  Home,
  LogOut,
  ShieldCheck,
  MessageSquare,
  Package,
  MapPin,
  Users
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { path: '/admin/dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
    { path: '/admin/temples', label: 'Temples Management', icon: Landmark },
    { path: '/admin/darshan-types', label: 'Darshan Ticket Types', icon: Layers },
    { path: '/admin/slots', label: 'Slots & Capacity', icon: CalendarDays },
    { path: '/admin/bookings', label: 'Devotee Bookings', icon: TicketCheck }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-[#1A1815] text-gray-300 min-h-screen flex flex-col justify-between p-4 border-r border-[#D4AF37]/20 shrink-0">
      <div>
        {/* Admin Brand */}
        <div className="flex items-center space-x-3 px-3 py-4 border-b border-gray-800 mb-6">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FF6F00] to-[#D4AF37] p-0.5">
            <div className="w-full h-full bg-[#1A1815] rounded-full flex items-center justify-center">
              <span className="text-base">🕉️</span>
            </div>
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-white tracking-wide">
              DarshanEase
            </h2>
            <div className="mt-0.5 leading-tight">
              <p className="text-[10px] text-amber-200/90 font-medium italic">
                Darshan without confusion
              </p>
            </div>
            <p className="text-[10px] text-[#F3C644] font-semibold uppercase tracking-wider flex items-center mt-1">
              <ShieldCheck className="w-3 h-3 mr-1" />
              Admin Console
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-gradient-to-r from-[#FF6F00] to-[#E65100] text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-[#D4AF37]'}`} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Shortcuts */}
      <div className="pt-6 border-t border-gray-800 space-y-2 text-xs">
        <Link
          to="/"
          className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Home className="w-4 h-4 text-[#D4AF37]" />
          <span>Devotee Public Portal</span>
        </Link>

        {useAuth().isAuthenticated ? (
          <button
            onClick={logout}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-colors text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        ) : (
          <Link
            to="/login"
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-amber-300 hover:text-white hover:bg-white/5 transition-colors text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4 rotate-180" />
            <span>Sign In to Admin</span>
          </Link>
        )}
      </div>
    </aside>
  );
};

export default AdminSidebar;
