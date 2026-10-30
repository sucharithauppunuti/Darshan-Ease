import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import AdminLayout from '../../components/admin/AdminLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
  TicketCheck,
  Search,
  Filter,
  Eye,
  Calendar,
  Clock,
  Users,
  MapPin,
  X,
  ShieldCheck
} from 'lucide-react';

const AdminBookings = () => {
  const [temples, setTemples] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedTempleId, setSelectedTempleId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Selected Booking Details Modal
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchTemples();
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [selectedTempleId, selectedDate, statusFilter]);

  const fetchTemples = async () => {
    try {
      const res = await axiosClient.get('/temples', { params: { status: 'all' } });
      if (res.data.success) {
        setTemples(res.data.temples || []);
      }
    } catch (err) {
      console.error('Error fetching temples:', err);
    }
  };

  const fetchBookings = async (customSearch = search) => {
    try {
      setLoading(true);
      const params = {};
      if (customSearch.trim()) params.search = customSearch.trim();
      if (selectedTempleId) params.templeId = selectedTempleId;
      if (selectedDate) params.date = selectedDate;
      if (statusFilter !== 'all') params.status = statusFilter;

      const res = await axiosClient.get('/admin/bookings', { params });
      if (res.data.success) {
        setBookings(res.data.bookings || []);
      }
    } catch (err) {
      console.error('Error fetching admin bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchBookings(search);
  };

  return (
    <AdminLayout
      title="Devotee Reservations & E-Passes"
      subtitle="Complete database of confirmed, completed, and cancelled pilgrimage bookings"
    >
      <div className="space-y-6">
        {/* Filters and Search Bar */}
        <div className="bg-white p-5 rounded-2xl border border-[#D4AF37]/30 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
          <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search reference, devotee name, phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E65100]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#6B1D2F] text-white rounded-xl font-semibold hover:bg-[#4A121F]"
            >
              Search
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-3">
            {/* Temple Selector */}
            <select
              value={selectedTempleId}
              onChange={(e) => setSelectedTempleId(e.target.value)}
              className="p-2 rounded-xl border border-gray-300 text-gray-800 bg-white"
            >
              <option value="">All Temples</option>
              {temples.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>

            {/* Date Filter */}
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="p-2 rounded-xl border border-gray-300 text-gray-800"
            />

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 rounded-xl border border-gray-300 text-gray-800 bg-white"
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-2xl border border-[#D4AF37]/30 shadow-xs overflow-hidden">
          {loading ? (
            <LoadingSpinner text="Retrieving bookings database..." />
          ) : bookings.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-xs">
              No reservations found matching the filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FDFBF7] border-b border-gray-200 text-gray-600 font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Booking Ref</th>
                    <th className="py-3 px-4">Temple Name</th>
                    <th className="py-3 px-4">Primary Contact</th>
                    <th className="py-3 px-4">Visit Date & Slot</th>
                    <th className="py-3 px-4">Devotees</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {bookings.map((b) => (
                    <tr key={b._id} className="hover:bg-gray-50">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#E65100]">
                        #{b.bookingReference}
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-gray-900">
                        {b.templeSnapshot?.name}
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-gray-900">{b.user?.name || 'Devotee'}</p>
                        <p className="text-[11px] text-gray-400">{b.contactPhone}</p>
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-gray-800">{b.slotSnapshot?.date}</p>
                        <p className="text-[11px] text-gray-500">{b.slotSnapshot?.startTime}</p>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-semibold">{b.devoteeCount}</span> Devotee(s)
                      </td>

                      <td className="py-3.5 px-4 font-bold text-[#6B1D2F]">
                        {b.totalAmount === 0 ? 'Free' : `₹${b.totalAmount}`}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            b.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50"
                          title="View Devotee Pass Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Devotee Booking Details Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 space-y-5 animate-in fade-in duration-150 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#E65100] bg-[#FF6F00]/10 px-2 py-0.5 rounded">
                    #{selectedBooking.bookingReference}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-gray-900 mt-1">
                    {selectedBooking.templeSnapshot?.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-1 text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Slot & Option summary */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-gray-50 text-xs text-gray-700">
                <div>
                  <p className="text-gray-400">Darshan Option</p>
                  <p className="font-bold text-gray-900">{selectedBooking.darshanTypeSnapshot?.name}</p>
                </div>
                <div>
                  <p className="text-gray-400">Scheduled Date & Time</p>
                  <p className="font-bold text-gray-900">
                    {selectedBooking.slotSnapshot?.date} ({selectedBooking.slotSnapshot?.startTime})
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Contact</p>
                  <p className="font-bold text-gray-900">
                    {selectedBooking.contactPhone} • {selectedBooking.contactEmail}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Payment & Status</p>
                  <p className="font-bold text-gray-900">
                    {selectedBooking.totalAmount === 0 ? 'Free' : `₹${selectedBooking.totalAmount}`} ({selectedBooking.status.toUpperCase()})
                  </p>
                </div>
              </div>

              {/* Visiting Devotees */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B1D2F] mb-2">
                  Devotee Visitors ({selectedBooking.devoteeCount}):
                </h4>
                <div className="space-y-2">
                  {selectedBooking.devotees?.map((d, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl border border-gray-200 text-xs flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-gray-900">
                          {i + 1}. {d.name}
                        </span>{' '}
                        <span className="text-gray-500">
                          ({d.age} yrs, {d.gender})
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-gray-600 bg-gray-50 px-2 py-0.5 rounded">
                        {d.idType}: {d.idNumber || 'None'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedBooking.status === 'cancelled' && (
                <div className="p-3 bg-red-50 rounded-xl text-xs text-red-800">
                  <strong>Cancellation Info:</strong> Cancelled on{' '}
                  {new Date(selectedBooking.cancelledAt).toLocaleString()}. Reason:{' '}
                  {selectedBooking.cancellationReason || 'User requested'}.
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminBookings;
