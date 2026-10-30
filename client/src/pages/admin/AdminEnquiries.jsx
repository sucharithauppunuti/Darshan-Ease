import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import AdminLayout from '../../components/admin/AdminLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  Mail,
  Phone,
  User,
  Calendar,
  Sparkles,
  AlertCircle
} from 'lucide-react';

const STATUS_OPTIONS = ['All', 'Requested', 'Pending Confirmation', 'Confirmed', 'Cancelled', 'Completed'];
const TYPE_OPTIONS = ['All', 'Package', 'Custom Plan', 'Pandit Puja', 'Group Darshan', 'Assistance', 'General'];

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [responseNotes, setResponseNotes] = useState('');
  const [newStatus, setNewStatus] = useState('Requested');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter, typeFilter]);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const params = {};
      if (statusFilter !== 'All') params.status = statusFilter;
      if (typeFilter !== 'All') params.type = typeFilter;
      const res = await axiosClient.get('/enquiries', { params });
      if (res.data.success) {
        setEnquiries(res.data.enquiries || []);
      }
    } catch (err) {
      console.error('Error fetching admin enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (enq) => {
    setSelectedEnquiry(enq);
    setNewStatus(enq.status);
    setResponseNotes(enq.responseNotes || '');
    setMsg('');
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedEnquiry) return;

    try {
      setUpdating(true);
      setMsg('');
      const res = await axiosClient.put(`/enquiries/${selectedEnquiry._id}/status`, {
        status: newStatus,
        responseNotes: responseNotes.trim()
      });

      if (res.data.success) {
        setMsg('Status updated successfully and devotee notification generated!');
        // Update local list
        setEnquiries((prev) =>
          prev.map((item) =>
            item._id === selectedEnquiry._id ? res.data.enquiry : item
          )
        );
        setSelectedEnquiry(res.data.enquiry);
        setTimeout(() => setMsg(''), 3000);
      }
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const q = search.toLowerCase();
    const nameMatch = e.devoteeName?.toLowerCase().includes(q);
    const emailMatch = e.devoteeEmail?.toLowerCase().includes(q);
    const templeMatch = e.templeName?.toLowerCase().includes(q);
    const notesMatch = e.specialRequests?.toLowerCase().includes(q);
    return nameMatch || emailMatch || templeMatch || notesMatch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Completed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Pending Confirmation':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-purple-100 text-purple-800 border-purple-300';
    }
  };

  return (
    <AdminLayout
      title="Pilgrimage Enquiries & Coordination"
      subtitle="Devotee requests for tour packages, pandit puja, group darshans, and on-ground assistance"
    >
      <div className="space-y-6">
        
        {/* Filters & Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#D4AF37]/30 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by devotee name, email, shrine, or details..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#E65100]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white text-gray-700 focus:outline-none focus:border-[#E65100]"
            >
              <option value="All">All Service Types</option>
              {TYPE_OPTIONS.slice(1).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white text-gray-700 focus:outline-none focus:border-[#E65100]"
            >
              <option value="All">All Statuses</option>
              {STATUS_OPTIONS.slice(1).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Enquiries Table */}
        <div className="bg-white rounded-2xl border border-[#D4AF37]/30 shadow-xs overflow-hidden">
          {loading ? (
            <div className="py-12">
              <LoadingSpinner text="Retrieving pilgrimage enquiries..." />
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="py-16 text-center text-gray-500">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-semibold">No enquiries found</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting the filter criteria or check back later.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FDFBF7] border-b border-gray-200 text-gray-600 font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Devotee Details</th>
                    <th className="py-3.5 px-4">Service Category</th>
                    <th className="py-3.5 px-4">Shrine / Destination</th>
                    <th className="py-3.5 px-4">Preferred Date & Devotees</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Submitted</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {filteredEnquiries.map((enq) => (
                    <tr key={enq._id} className="hover:bg-amber-50/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-gray-900">{enq.devoteeName}</div>
                        <div className="text-[11px] text-gray-500 flex items-center space-x-2 mt-0.5">
                          <span className="flex items-center"><Mail className="w-3 h-3 mr-0.5" />{enq.devoteeEmail}</span>
                          {enq.devoteePhone && (
                            <span className="flex items-center"><Phone className="w-3 h-3 mr-0.5" />{enq.devoteePhone}</span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E65100]/10 text-[#E65100]">
                          {enq.enquiryType}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-medium text-gray-800">
                        {enq.templeName || enq.destinationName || 'Multi-shrine Yatra'}
                      </td>

                      <td className="py-3.5 px-4">
                        <div>{enq.travelDate ? new Date(enq.travelDate).toLocaleDateString() : 'Flexible'}</div>
                        <div className="text-[11px] text-gray-500">{enq.devoteeCount} Devotee(s)</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(enq.status)}`}>
                          {enq.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-gray-400 text-[11px]">
                        {new Date(enq.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleOpenModal(enq)}
                          className="px-3 py-1.5 rounded-lg bg-[#6B1D2F] hover:bg-[#4A121F] text-white text-[11px] font-bold transition-colors"
                        >
                          Review & Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Update & Review Modal */}
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-[#D4AF37]/40 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#6B1D2F]">
                    Review Pilgrimage Enquiry
                  </h3>
                  <p className="text-xs text-gray-500">Service: {selectedEnquiry.enquiryType}</p>
                </div>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="text-gray-400 hover:text-gray-700 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {msg && (
                <div className={`p-3 rounded-xl text-xs flex items-center space-x-2 ${
                  msg.includes('successfully') ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{msg}</span>
                </div>
              )}

              {/* Devotee Info Recap */}
              <div className="bg-[#FDFBF7] p-4 rounded-xl border border-amber-200/60 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Devotee Name:</span>
                  <span className="font-bold text-gray-900">{selectedEnquiry.devoteeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email & Phone:</span>
                  <span className="font-medium text-gray-800">{selectedEnquiry.devoteeEmail} • {selectedEnquiry.devoteePhone || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shrine / Destination:</span>
                  <span className="font-bold text-[#E65100]">{selectedEnquiry.templeName || selectedEnquiry.destinationName || 'Multi-temple'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Group Size & Dates:</span>
                  <span className="text-gray-800">{selectedEnquiry.devoteeCount} Person(s) • {selectedEnquiry.travelDate ? new Date(selectedEnquiry.travelDate).toLocaleDateString() : 'Flexible'}</span>
                </div>
                {selectedEnquiry.budgetRange && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Budget Range:</span>
                    <span className="font-bold text-emerald-700">{selectedEnquiry.budgetRange}</span>
                  </div>
                )}
                {selectedEnquiry.specialRequests && (
                  <div className="pt-2 border-t border-amber-200/40">
                    <span className="text-gray-500 block mb-0.5">Special Requests & Devotee Notes:</span>
                    <p className="p-2 rounded bg-white text-gray-700 italic border border-gray-100">
                      "{selectedEnquiry.specialRequests}"
                    </p>
                  </div>
                )}
              </div>

              {/* Status & Response Form */}
              <form onSubmit={handleUpdateStatus} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Update Enquiry Status *
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-300 text-xs font-semibold focus:outline-none focus:border-[#E65100] bg-white cursor-pointer"
                  >
                    <option value="Requested">Requested (New Enquiry)</option>
                    <option value="Pending Confirmation">Pending Confirmation (Coordinator Reviewing)</option>
                    <option value="Confirmed">Confirmed (Seva / Package Scheduled)</option>
                    <option value="Cancelled">Cancelled (Not Feasible / Devotee Withdrawn)</option>
                    <option value="Completed">Completed (Yatra Successfully Fulfilled)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Coordinator Response Notes
                  </label>
                  <textarea
                    rows="3"
                    value={responseNotes}
                    onChange={(e) => setResponseNotes(e.target.value)}
                    placeholder="Provide details about assigned priest, confirmed hotel vouchers, or instructions..."
                    className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100]"
                  ></textarea>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    This note will be logged and visible to the devotee in their "My Trips" dashboard.
                  </p>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedEnquiry(null)}
                    className="px-4 py-2 rounded-full border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-6 py-2 rounded-full bg-[#E65100] hover:bg-[#BF360C] text-white text-xs font-bold shadow-md disabled:opacity-50"
                  >
                    {updating ? 'Saving...' : 'Update & Notify Devotee'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default AdminEnquiries;
