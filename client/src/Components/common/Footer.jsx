import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Clock,
  Sparkles,
  Ticket,
  ChevronRight,
  CalendarCheck
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-12">
      {/* Devotional Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#321B1D] via-[#4A1A1E] to-[#231214] text-white py-14 px-4 sm:px-6 lg:px-8 xl:px-12 border-t border-[#C5A15B]/35">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=80')"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#C5A15B]/25 border border-[#C5A15B]/40 text-[#E2C889] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A15B]" />
            <span>Divine Journeys Made Simple</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
            Plan Your Sacred Temple Darshan with Confidence
          </h2>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-gray-200 font-normal leading-relaxed">
            Discover holy shrines across India, view authentic guidelines, check real-time slot capacities, and book official darshan e-passes.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/temples"
              className="inline-flex items-center px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-[#E87519] text-white shadow-lg hover:bg-[#D4630A] hover:scale-102 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 mr-2 text-[#E2C889]" />
              Explore All Temples
            </Link>

            <Link
              to="/my-bookings"
              className="inline-flex items-center px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 transition-all cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 mr-2" />
              My Bookings
            </Link>
          </div>
        </div>
      </div>

      {/* Main Charcoal Footer */}
      <div className="bg-[#1A1815] text-gray-300 pt-14 pb-10 border-t border-[#C5A15B]/25">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-gray-800">
            
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#321B1D] via-[#4A1A1E] to-[#E87519] p-0.5">
                  <div className="w-full h-full bg-[#1A1815] rounded-[14px] flex items-center justify-center">
                    <span className="text-xl">🕉️</span>
                  </div>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-white tracking-tight">
                    DarshanEase
                  </span>
                  <p className="text-[11px] text-[#C5A15B] font-medium">
                    Every Devotee Closer to the Divine
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed">
                India's dedicated temple darshan booking and management platform. Providing verified sanctum information, transparent slot capacities, and direct digital passes for devotees across India and abroad.
              </p>

              <div className="flex flex-col space-y-2 pt-1 text-xs text-[#C5A15B]">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                  <span>DarshanEase Verified Shrines</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#E87519]" />
                  <span>Atomic Capacity Tracking</span>
                </div>
              </div>
            </div>

            {/* Sacred Traditions */}
            <div>
              <h3 className="font-serif text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#E87519] pl-2.5">
                Sacred Traditions
              </h3>
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li>
                  <Link to="/temples?category=Jyotirlinga" className="hover:text-[#E2C889] transition-colors flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1 text-[#E87519]" />
                    12 Holy Jyotirlingas
                  </Link>
                </li>
                <li>
                  <Link to="/temples?category=Shakti+Peeth" className="hover:text-[#E2C889] transition-colors flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1 text-[#E87519]" />
                    Maha Shakti Peethas
                  </Link>
                </li>
                <li>
                  <Link to="/temples?category=Vaishnava" className="hover:text-[#E2C889] transition-colors flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1 text-[#E87519]" />
                    Vaishnava Sanctums
                  </Link>
                </li>
                <li>
                  <Link to="/temples?category=Ganesh" className="hover:text-[#E2C889] transition-colors flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1 text-[#E87519]" />
                    Lord Ganesha Temples
                  </Link>
                </li>
                <li>
                  <Link to="/temples?category=Other+Deities" className="hover:text-[#E2C889] transition-colors flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1 text-[#E87519]" />
                    Ancient Shrines
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-serif text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#E87519] pl-2.5">
                Devotee Navigation
              </h3>
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li>
                  <Link to="/temples" className="hover:text-[#E2C889] transition-colors flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1 text-[#E87519]" />
                    Explore All 25 Temples
                  </Link>
                </li>
                <li>
                  <Link to="/my-bookings" className="hover:text-[#E2C889] transition-colors flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1 text-[#E87519]" />
                    My Darshan Bookings
                  </Link>
                </li>
                <li>
                  <Link to="/notifications" className="hover:text-[#E2C889] transition-colors flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1 text-[#E87519]" />
                    Booking Notifications
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-[#E2C889] transition-colors flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1 text-[#E87519]" />
                    Devotee Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-[#E2C889] transition-colors flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1 text-[#E87519]" />
                    Register New Account
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Support */}
            <div>
              <h3 className="font-serif text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#E87519] pl-2.5">
                Devotee Helpline
              </h3>
              <div className="space-y-3 text-xs text-gray-400">
                <div className="flex items-start space-x-2.5">
                  <Phone className="w-4 h-4 text-[#E87519] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Toll-Free Darshan Support</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">+91 1800 200 4455 (06:00 AM - 09:00 PM)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <Mail className="w-4 h-4 text-[#E87519] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Email Assistance</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">helpdesk@darshanease.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-[#E87519] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Sanctum Support Center</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Spiritual Gateway, New Delhi, India</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright & Disclaimer */}
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-3 text-center md:text-left">
            <p>
              © {new Date().getFullYear()} DarshanEase. All rights reserved. “DARSHANEASE • Every Devotee Closer to the Divine”.
            </p>
            <p className="max-w-xl text-[11px] text-gray-500">
              DarshanEase facilitates verified temple darshan slot reservations and official e-passes. Temple schedules and capacity are monitored directly with temple administrative trusts.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
