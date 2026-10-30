import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Ticket,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Ban,
  ArrowRight,
  Eye,
  Info
} from 'lucide-react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming', 'completed', 'cancelled', 'all'
  const [cancellingBookingId, setCancellingBookingId] = useState(null);
  const [cancellationReason, setCancellationReason] = useState('');
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchBookings();
  }, [activeTab]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const params = {};
      if (activeTab !== 'all') {
        params.status = activeTab;
      }
      const res = await axiosClient.get('/bookings/my', { params });
      if (res.data.success) {
        setBookings(res.data.bookings || []);
      }
    } catch (err) {
      console.error('Error fetching devotee bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const openCancelModal = (booking) => {
    setCancellingBookingId(booking);
    setCancellationReason('');
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!cancellingBookingId) return;

    try {
      setCancelLoading(true);
      const res = await axiosClient.patch(`/bookings/${cancellingBookingId._id}/cancel`, {
        reason: cancellationReason || 'Devotee change of plan'
      });

      if (res.data.success) {
        setFeedbackMessage({
          type: 'success',
          text: `Booking #${cancellingBookingId.bookingReference} has been successfully cancelled. Reserved slot capacity has been released.`
        });
        setCancelModalOpen(false);
        setCancellingBookingId(null);
        fetchBookings();
      }
    } catch (err) {
      setFeedbackMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to cancel booking'
      });
    } finally {
      setCancelLoading(false);
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-[#F7F0E4] temple-dashboard-bg flex flex-col font-sans text-[#1A1815]">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#C5A15B]/30 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#321B1D]">
              My Darshan Bookings
            </h1>
            <p className="text-xs sm:text-sm text-[#7D7060] mt-1">
              View your pilgrimage schedule, download entry passes, or manage future bookings.
            </p>
          </div>

          <Link
            to="/temples"
            className="inline-flex items-center px-5 py-2.5 rounded-full text-xs font-semibold bg-[#E87519] hover:bg-[#D4630A] text-white shadow-sm transition-all cursor-pointer"
          >
            <Ticket className="w-3.5 h-3.5 mr-1.5" />
            <span>Explore Temples & Book</span>
          </Link>
        </div>

        {/* Feedback Alert */}
        {feedbackMessage.text && (
          <div
            className={`my-4 p-4 rounded-xl text-xs flex items-center justify-between ${
              feedbackMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            <div className="flex items-center space-x-2">
              {feedbackMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              )}
              <span>{feedbackMessage.text}</span>
            </div>
            <button
              onClick={() => setFeedbackMessage({ type: '', text: '' })}
              className="text-xs font-bold underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Status Tabs */}
        <div className="flex space-x-2 my-6 border-b border-gray-200 overflow-x-auto">
          {[
            { id: 'upcoming', label: 'Upcoming Visits' },
            { id: 'completed', label: 'Completed Darshans' },
            { id: 'cancelled', label: 'Cancelled Bookings' },
            { id: 'all', label: 'All History' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-4 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border-b-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#E87519] text-[#E87519]'
                  : 'border-transparent text-gray-500 hover:text-[#321B1D]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {loading ? (
          <LoadingSpinner text="Retrieving your reservation records..." />
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 my-4 space-y-3">
            <Ticket className="w-12 h-12 text-[#D4AF37] mx-auto opacity-50" />
            <h3 className="font-serif text-lg font-bold text-gray-800">
              No {activeTab} bookings found
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              You do not have any registered darshan visits under this category.
            </p>
            <Link
              to="/temples"
              className="inline-block mt-3 px-5 py-2 rounded-full text-xs font-semibold bg-[#E65100] text-white"
            >
              Explore Temples & Book
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => {
              const isPast = booking.slotSnapshot?.date < todayStr;
              const isCancellable = booking.status === 'confirmed' && !isPast;

              let statusBadge = 'bg-emerald-100 text-emerald-800';
              if (booking.status === 'cancelled') statusBadge = 'bg-red-100 text-red-800';
              else if (isPast || booking.status === 'completed') statusBadge = 'bg-gray-100 text-gray-700';

              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D4AF37]/30 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  {/* Left Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#E65100] bg-[#FF6F00]/10 px-2.5 py-0.5 rounded">
                        #{booking.bookingReference}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${statusBadge}`}>
                        {booking.status === 'confirmed' && isPast ? 'Completed Visit' : booking.status}
                      </span>
                      <span className="text-xs text-[#8D8070]">
                        Booked on {new Date(booking.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#4A121F]">
                      {booking.templeSnapshot?.name}
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-gray-600 pt-1">
                      <div className="flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-[#D4AF37] shrink-0" />
                        <span className="truncate">{booking.templeSnapshot?.city}, {booking.templeSnapshot?.state}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-[#E65100] shrink-0" />
                        <span>{booking.slotSnapshot?.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1 text-[#E65100] shrink-0" />
                        <span>{booking.slotSnapshot?.startTime}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-3.5 h-3.5 mr-1 text-[#D4AF37] shrink-0" />
                        <span>{booking.devoteeCount} Devotee(s)</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500">
                      Option: <strong className="text-gray-700">{booking.darshanTypeSnapshot?.name}</strong> • Amount:{' '}
                      <strong className="text-gray-900">{booking.totalAmount === 0 ? 'Free' : `₹${booking.totalAmount}`}</strong>
                    </p>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center space-x-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0">
                    <Link
                      to={`/booking-confirmation/${booking._id}`}
                      className="px-4 py-2 rounded-xl border border-[#D4AF37]/50 text-xs font-semibold text-[#6B1D2F] hover:bg-[#F7F3EA] transition-colors flex items-center shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1.5 text-[#E65100]" />
                      <span>View Pass</span>
                    </Link>

                    {isCancellable && (
                      <button
                        onClick={() => openCancelModal(booking)}
                        className="px-4 py-2 rounded-xl border border-red-200 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors flex items-center"
                      >
                        <Ban className="w-3.5 h-3.5 mr-1.5" />
                        <span>Cancel</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Cancellation Confirmation Dialog Modal */}
        {cancelModalOpen && cancellingBookingId && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-red-200 space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center space-x-3 text-red-600">
                <AlertCircle className="w-6 h-6" />
                <h3 className="font-serif text-lg font-bold text-gray-900">
                  Cancel Darshan Booking?
                </h3>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                Are you sure you want to cancel booking <strong>#{cancellingBookingId.bookingReference}</strong> for{' '}
                <strong>{cancellingBookingId.templeSnapshot?.name}</strong> on{' '}
                <strong>{cancellingBookingId.slotSnapshot?.date}</strong>?
              </p>

              <div className="text-[11px] bg-amber-50 p-3 rounded-lg border border-amber-200 text-amber-900">
                <strong>Policy Notice:</strong> Cancelling will instantly release the {cancellingBookingId.devoteeCount} reserved slot seats back to the temple capacity for other waiting devotees. This action is irreversible.
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Reason for Cancellation (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Schedule conflict, family emergency"
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  disabled={cancelLoading}
                  onClick={() => setCancelModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Keep Booking
                </button>
                <button
                  type="button"
                  disabled={cancelLoading}
                  onClick={handleConfirmCancel}
                  className="px-5 py-2 rounded-lg text-xs font-semibold bg-red-600 hover:bg-red-700 text-white shadow-sm"
                >
                  {cancelLoading ? 'Cancelling...' : 'Confirm Cancellation'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyBookings;
