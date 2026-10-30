import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Users,
  Ticket,
  Printer,
  Download,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Ban,
  RefreshCw,
  XCircle
} from 'lucide-react';

const BookingConfirmation = () => {
  const { bookingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(location.state?.newBooking || null);
  const [loading, setLoading] = useState(!booking);
  const [error, setError] = useState('');
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('Devotee change of plan');
  const [cancelling, setCancelling] = useState(false);

  const ticketRef = useRef(null);

  useEffect(() => {
    if (!booking) {
      fetchBooking();
    }
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get(`/bookings/${bookingId}`);
      if (res.data.success) {
        setBooking(res.data.booking);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error loading booking pass');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!ticketRef.current) return;
    try {
      setDownloadingPdf(true);
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#FFFFFF'
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`DarshanTicket-${booking.bookingReference}.pdf`);
    } catch (err) {
      console.error('PDF generation error:', err);
      alert('Could not download PDF. You can use the Print button to save as PDF.');
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handleCancelBooking = async () => {
    try {
      setCancelling(true);
      const res = await axiosClient.patch(`/bookings/${booking._id}/cancel`, {
        reason: cancellationReason
      });
      if (res.data.success) {
        setBooking(prev => ({ ...prev, status: 'cancelled' }));
        setShowCancelModal(false);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel booking');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner text="Generating consecrated darshan pass..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
        <Navbar />
        <div className="flex-1 max-w-md mx-auto px-4 py-20 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold text-[#6B1D2F]">Booking Not Found</h2>
          <p className="mt-2 text-sm text-gray-600">{error || 'Unable to locate your reservation'}</p>
          <Link
            to="/my-bookings"
            className="mt-6 inline-block px-6 py-2.5 rounded-full text-xs font-semibold bg-[#E65100] text-white"
          >
            Go to My Bookings
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F0E4] temple-dashboard-bg flex flex-col font-sans text-[#1A1815]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Success Header Message */}
        <div className="text-center mb-8 space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner border border-emerald-300">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#321B1D]">
            Darshan Pass Confirmed!
          </h1>
          <p className="text-sm text-[#7D7060] max-w-lg mx-auto font-light">
            Your slot reservation has been atomically confirmed and recorded. May you have a blessed and auspicious darshan.
          </p>
        </div>

        {/* Action Buttons: Download PDF, Print, Cancel & My Bookings */}
        <div className="flex flex-wrap items-center justify-end gap-3 mb-6 print:hidden">
          {booking.status !== 'cancelled' && (
            <>
              <button
                disabled={downloadingPdf}
                onClick={handleDownloadPdf}
                className="inline-flex items-center px-4 py-2 rounded-xl bg-[#E87519] hover:bg-[#D4630A] text-xs font-bold text-white shadow-md transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 mr-1.5" />
                <span>{downloadingPdf ? 'Generating PDF...' : 'Download Darshan Ticket (PDF)'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center px-4 py-2 rounded-xl border border-[#C5A15B]/50 bg-white hover:bg-[#F7F0E4] text-xs font-semibold text-[#321B1D] shadow-sm transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4 mr-1.5 text-[#E87519]" />
                <span>Print E-Pass</span>
              </button>

              <button
                onClick={() => setShowCancelModal(true)}
                className="inline-flex items-center px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-xs font-semibold text-red-700 border border-red-200 shadow-sm transition-all"
              >
                <Ban className="w-4 h-4 mr-1.5" />
                <span>Cancel Ticket</span>
              </button>
            </>
          )}

          <Link
            to="/my-bookings"
            className="inline-flex items-center px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-700 shadow-sm transition-all"
          >
            <span>My Bookings</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        {/* Consecrated E-Pass Card (Printable & Downloadable) */}
        <div
          ref={ticketRef}
          className={`bg-white rounded-3xl border-2 ${
            booking.status === 'cancelled' ? 'border-red-300 opacity-80' : 'border-[#D4AF37]/50'
          } shadow-xl overflow-hidden print:shadow-none print:border print:m-0`}
        >
          
          {/* Top Pass Golden Ribbon */}
          <div className="bg-gradient-to-r from-[#6B1D2F] via-[#800020] to-[#4A121F] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-[#F3C644] text-xs font-semibold uppercase tracking-wider mb-1">
                <span>🕉️ Official Pilgrimage E-Pass</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold">
                {booking.templeSnapshot?.name}
              </h2>
              <p className="text-xs text-gray-200 mt-0.5">
                {booking.templeSnapshot?.city}, {booking.templeSnapshot?.state} • Deity: {booking.templeSnapshot?.deity}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-center sm:text-right">
              <p className="text-[10px] text-gray-300 uppercase tracking-widest font-semibold">
                Booking Reference
              </p>
              <p className="text-lg font-mono font-black text-[#F3C644] tracking-wider">
                {booking.bookingReference}
              </p>
              <span className="inline-block px-2 py-0.5 mt-1 rounded text-[10px] font-bold bg-emerald-500 text-white uppercase tracking-wider">
                {booking.status}
              </span>
            </div>
          </div>

          {/* Pass Body Information */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Core Timings & Darshan Type Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#FDFBF7] border border-[#D4AF37]/25 text-xs">
              <div>
                <p className="text-gray-500 font-medium">Darshan Type</p>
                <p className="font-bold text-gray-900 mt-1 text-sm">
                  {booking.darshanTypeSnapshot?.name}
                </p>
              </div>

              <div>
                <p className="text-gray-500 font-medium">Scheduled Date</p>
                <p className="font-bold text-gray-900 mt-1 text-sm flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-[#E65100]" />
                  <span>{booking.slotSnapshot?.date}</span>
                </p>
              </div>

              <div>
                <p className="text-gray-500 font-medium">Slot Time</p>
                <p className="font-bold text-gray-900 mt-1 text-sm flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-[#E65100]" />
                  <span>{booking.slotSnapshot?.startTime} - {booking.slotSnapshot?.endTime}</span>
                </p>
              </div>

              <div>
                <p className="text-gray-500 font-medium">Total Devotees</p>
                <p className="font-bold text-gray-900 mt-1 text-sm flex items-center">
                  <Users className="w-3.5 h-3.5 mr-1 text-[#E65100]" />
                  <span>{booking.devoteeCount} Person(s)</span>
                </p>
              </div>
            </div>

            {/* Devotees Table */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B1D2F] mb-3">
                Registered Visiting Devotees
              </h3>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">Devotee Name</th>
                      <th className="py-2.5 px-3">Age</th>
                      <th className="py-2.5 px-3">Gender</th>
                      <th className="py-2.5 px-3">Photo ID Type</th>
                      <th className="py-2.5 px-3">ID Number</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-800">
                    {booking.devotees?.map((d, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="py-2 px-3 font-semibold text-gray-500">{idx + 1}</td>
                        <td className="py-2 px-3 font-bold">{d.name}</td>
                        <td className="py-2 px-3">{d.age}</td>
                        <td className="py-2 px-3">{d.gender}</td>
                        <td className="py-2 px-3">{d.idType}</td>
                        <td className="py-2 px-3 font-mono text-gray-600">
                          {d.idNumber || 'Verified at reporting'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sanctum QR Code Verification Block */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 rounded-2xl bg-[#FDFBF7] border border-[#D4AF37]/30 text-xs items-center">
              <div className="sm:col-span-3 flex justify-center sm:justify-start">
                <div className="p-2 bg-white rounded-xl border border-stone-300 shadow-xs">
                  <QRCode
                    value={`DARSHANEASE:REF:${booking.bookingReference}:TEMPLE:${booking.templeSnapshot?.name}:DEVOTEES:${booking.devoteeCount}`}
                    size={80}
                  />
                </div>
              </div>
              <div className="sm:col-span-6 space-y-1 text-center sm:text-left">
                <p className="font-bold text-gray-900">Sanctum Entry QR & Barcode</p>
                <p className="text-gray-500 text-[11px]">Present this QR code for instant scan verification at temple reporting gate.</p>
                <p className="text-gray-700 text-[11px]">Booking Ref: <span className="font-mono font-bold text-[#6B1D2F]">{booking.bookingReference}</span></p>
              </div>
              <div className="sm:col-span-3 text-center sm:text-right space-y-1">
                <p className="text-gray-500">Prasad Token</p>
                <p className="font-bold text-[#E65100]">Included (1 per devotee)</p>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                  Govinda Prasadam
                </span>
              </div>
            </div>

            {/* Payment & Contact Info Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-xs">
              <div className="space-y-1">
                <p className="text-gray-500">Contact Information</p>
                <p className="font-bold text-gray-900">Phone: {booking.contactPhone}</p>
                <p className="text-gray-700">Email: {booking.contactEmail}</p>
              </div>

              <div className="sm:text-right space-y-1">
                <p className="text-gray-500">Amount Paid</p>
                <p className="text-xl font-black text-[#6B1D2F]">
                  {booking.totalAmount === 0 ? 'Free Entry (₹0)' : `₹${booking.totalAmount}`}
                </p>
                <p className="text-[11px] text-emerald-700 font-semibold">
                  Payment Status: {booking.paymentStatus.toUpperCase()}
                  {booking.paymentId && ` (${booking.paymentId})`}
                </p>
              </div>
            </div>

            {/* Important Instructions Box */}
            <div className="bg-[#FFF9F0] p-4 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1.5">
              <p className="font-bold flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1 text-[#E65100]" />
                Reporting Instructions at Temple Sanctum
              </p>
              <ul className="list-disc list-inside space-y-1 font-light text-[11px] text-gray-700">
                <li>Please report at the temple verification counter at least 30 minutes prior to slot timing.</li>
                <li>Each registered devotee must produce the corresponding original photo ID card.</li>
                <li>Traditional temple dress code is compulsory. Electronic gadgets and leather items are restricted.</li>
              </ul>
            </div>

          </div>

          {/* Pass Footer Bar */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500">
            <p>DarshanEase Verified Booking Reference • Non-Transferable Pass</p>
            <p className="mt-1 sm:mt-0">Issued: {new Date(booking.createdAt).toLocaleString()}</p>
          </div>

        </div>

        {/* Cancellation Confirmation Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
              <div className="flex items-center space-x-3 text-red-600">
                <div className="p-3 bg-red-100 rounded-2xl">
                  <Ban className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-gray-900 text-lg">
                    Cancel Darshan Pass?
                  </h3>
                  <p className="text-xs text-gray-500">
                    Booking Ref: {booking.bookingReference}
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed font-light">
                Cancelling this pass will release your reserved slot capacity back to the temple so other waiting devotees can receive darshan.
              </p>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Reason for Cancellation
                </label>
                <select
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-red-500 bg-white"
                >
                  <option value="Devotee change of plan">Change of travel plan</option>
                  <option value="Health or medical issue">Health or medical issue</option>
                  <option value="Rescheduling for another auspicious date">Rescheduling for another date</option>
                  <option value="Other personal reason">Other personal reason</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-stone-100">
                <button
                  disabled={cancelling}
                  onClick={() => setShowCancelModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-100"
                >
                  Keep Pass
                </button>
                <button
                  disabled={cancelling}
                  onClick={handleCancelBooking}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-md transition-all flex items-center space-x-1.5"
                >
                  {cancelling ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Cancelling...</span>
                    </>
                  ) : (
                    <span>Confirm Cancellation</span>
                  )}
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

export default BookingConfirmation;
