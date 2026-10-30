import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import AdminLayout from '../../components/admin/AdminLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
  Landmark,
  TicketCheck,
  CalendarCheck,
  Users,
  PlusCircle,
  Eye,
  CheckCircle2,
  CalendarDays,
  Clock,
  Search,
  Filter
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/admin/dashboard-stats');
      if (res.data.success) {
        setStats(res.data.stats);
        const bookings = res.data.recentBookings || [];
        setRecentBookings(bookings);
        setFilteredBookings(bookings);
      }
    } catch (err) {
      console.error('Error fetching admin dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = [...recentBookings];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        b =>
          b.bookingReference?.toLowerCase().includes(q) ||
          b.templeSnapshot?.name?.toLowerCase().includes(q) ||
          b.devotees?.some(d => d.name?.toLowerCase().includes(q))
      );
    }
    if (statusFilter !== 'all') {
      result = result.filter(b => b.status === statusFilter);
    }
    setFilteredBookings(result);
  }, [searchQuery, statusFilter, recentBookings]);

  return (
    <AdminLayout
      title="Administrative Dashboard"
      subtitle="Temple Darshan Booking & Operations Management"
    >
      {loading ? (
        <LoadingSpinner text="Compiling administrative analytics from MongoDB..." />
      ) : (
        <div className="space-y-8">
          
          {/* Top Admin Welcome Header */}
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#6B1D2F] via-[#85233A] to-[#E65100] text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-[#F3C644] text-xs font-bold uppercase tracking-wider mb-2">
                  <span>🕉️ DarshanEase Governance Console</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white drop-shadow">
                  Temple Darshan Management Suite
                </h2>
                <p className="text-xs sm:text-sm text-amber-100/90 font-light mt-1 max-w-2xl leading-relaxed">
                  Real-time operational metrics across all temples, slot capacity governance, and devotee reservations.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  to="/admin/temples/new"
                  className="inline-flex items-center px-4 py-2.5 rounded-xl bg-white text-[#6B1D2F] text-xs font-bold shadow-md hover:bg-gray-100 transition-colors"
                >
                  <PlusCircle className="w-4 h-4 mr-1.5 text-[#E65100]" />
                  <span>Add New Temple</span>
                </Link>

                <Link
                  to="/admin/slots"
                  className="inline-flex items-center px-4 py-2.5 rounded-xl bg-[#E65100] hover:bg-[#BF360C] text-white text-xs font-bold shadow-md transition-colors"
                >
                  <CalendarDays className="w-4 h-4 mr-1.5" />
                  <span>Manage Slots</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 5 Required Summary Cards (Requirement 13) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* 1. Total Temples */}
            <Link
              to="/admin/temples"
              className="bg-white p-5 rounded-2xl border border-[#D4AF37]/30 shadow-xs hover:border-[#E65100] transition-colors flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Total Temples
                </span>
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#E65100] flex items-center justify-center">
                  <Landmark className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <h3 className="text-2xl font-black font-serif text-[#6B1D2F]">
                  {stats?.totalTemples || 0}
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {stats?.activeTemples || 0} active in portal
                </p>
              </div>
            </Link>

            {/* 2. Total Bookings */}
            <Link
              to="/admin/bookings"
              className="bg-white p-5 rounded-2xl border border-[#D4AF37]/30 shadow-xs hover:border-[#E65100] transition-colors flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Total Bookings
                </span>
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <TicketCheck className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <h3 className="text-2xl font-black font-serif text-[#6B1D2F]">
                  {stats?.totalBookings || 0}
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {stats?.totalDevotees || 0} devotees facilitated
                </p>
              </div>
            </Link>

            {/* 3. Upcoming Bookings */}
            <Link
              to="/admin/bookings"
              className="bg-white p-5 rounded-2xl border border-[#D4AF37]/30 shadow-xs hover:border-[#E65100] transition-colors flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Upcoming Bookings
                </span>
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <CalendarCheck className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <h3 className="text-2xl font-black font-serif text-[#6B1D2F]">
                  {stats?.upcomingBookings || 0}
                </h3>
                <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                  Active confirmed passes
                </p>
              </div>
            </Link>

            {/* 4. Active Darshan Slots */}
            <Link
              to="/admin/slots"
              className="bg-white p-5 rounded-2xl border border-[#D4AF37]/30 shadow-xs hover:border-[#E65100] transition-colors flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Active Slots
                </span>
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <h3 className="text-2xl font-black font-serif text-[#6B1D2F]">
                  {stats?.activeSlots || 0}
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Scheduled visit slots
                </p>
              </div>
            </Link>

            {/* 5. Available & Fully Booked Slots */}
            <Link
              to="/admin/slots"
              className="bg-white p-5 rounded-2xl border border-[#D4AF37]/30 shadow-xs hover:border-[#E65100] transition-colors flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Slot Statuses
                </span>
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                  <CalendarDays className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-baseline space-x-2">
                  <span className="text-xl font-black text-emerald-700">
                    {stats?.availableSlots || 0}
                  </span>
                  <span className="text-[10px] text-gray-400">Available</span>
                  <span className="text-gray-300">/</span>
                  <span className="text-xl font-black text-red-700">
                    {stats?.fullyBookedSlots || 0}
                  </span>
                  <span className="text-[10px] text-gray-400">Full</span>
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  Real-time slot capacity status
                </p>
              </div>
            </Link>

          </div>

          {/* Recent Bookings Table with Search & Status Filters (Requirement 13) */}
          <div className="bg-white rounded-3xl border border-[#D4AF37]/30 shadow-xs overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#6B1D2F]">
                  Recent Devotee Reservations
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">Live database logs across all temples</p>
              </div>

              {/* Table Search & Status Filter */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search ref or devotee..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-[#E65100]"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs text-gray-700 bg-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>

                <Link
                  to="/admin/bookings"
                  className="text-xs font-bold text-[#E65100] hover:underline"
                >
                  View All →
                </Link>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FDFBF7] border-b border-gray-200 text-gray-600 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Booking Ref</th>
                    <th className="py-3.5 px-4">Temple</th>
                    <th className="py-3.5 px-4">Darshan Option</th>
                    <th className="py-3.5 px-4">Visit Date & Slot</th>
                    <th className="py-3.5 px-4">Devotees</th>
                    <th className="py-3.5 px-4">Total Tariff</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-10 text-gray-400">
                        No bookings matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => (
                      <tr key={b._id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#E65100]">
                          #{b.bookingReference}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-gray-900">
                          {b.templeSnapshot?.name}
                        </td>
                        <td className="py-3.5 px-4 text-gray-600">
                          {b.darshanTypeSnapshot?.name}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-gray-900">{b.slotSnapshot?.date}</span>
                          <span className="text-gray-400 text-[11px] block">{b.slotSnapshot?.startTime} - {b.slotSnapshot?.endTime}</span>
                        </td>
                        <td className="py-3.5 px-4 font-medium">
                          {b.devoteeCount} Person{b.devoteeCount === 1 ? '' : 's'}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#6B1D2F]">
                          {b.totalAmount === 0 ? 'Free (₹0)' : `₹${b.totalAmount}`}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              b.status === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : b.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            to={`/booking-confirmation/${b._id}`}
                            className="inline-flex items-center px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#E65100] text-[11px] font-bold transition-colors"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            <span>View Pass</span>
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
