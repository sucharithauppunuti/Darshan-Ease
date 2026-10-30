import React, { useState, useEffect, useMemo } from 'react';
import axiosClient from '../../api/axiosClient';
import AdminLayout from '../../components/admin/AdminLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
  CalendarDays,
  Plus,
  Lock,
  Unlock,
  AlertCircle,
  Clock,
  Users,
  Edit2,
  CheckCircle2,
  Ban,
  MapPin,
  Building2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';

const AdminSlots = () => {
  const [temples, setTemples] = useState([]);
  const [darshanTypes, setDarshanTypes] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedState, setSelectedState] = useState('all');
  const [selectedTempleId, setSelectedTempleId] = useState('');
  const [selectedDarshanTypeId, setSelectedDarshanTypeId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalSlots, setTotalSlots] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Modal State for New Slot
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [modalState, setModalState] = useState('');
  const [modalTempleId, setModalTempleId] = useState('');
  const [modalDarshanTypes, setModalDarshanTypes] = useState([]);
  const [modalDarshanTypeId, setModalDarshanTypeId] = useState('');
  const [loadingModalTypes, setLoadingModalTypes] = useState(false);

  // Modal State for Edit Slot
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);

  const [slotForm, setSlotForm] = useState({
    date: new Date().toISOString().split('T')[0],
    startTime: '06:00 AM',
    endTime: '08:30 AM',
    capacity: 100
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Unique sorted list of states
  const states = useMemo(() => {
    return [...new Set(temples.map((t) => t.state).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b)
    );
  }, [temples]);

  // Temple counts per state
  const stateTempleCounts = useMemo(() => {
    const counts = {};
    temples.forEach((t) => {
      if (t.state) counts[t.state] = (counts[t.state] || 0) + 1;
    });
    return counts;
  }, [temples]);

  // Temples grouped by state for optgroups
  const groupedTemples = useMemo(() => {
    const groups = {};
    temples.forEach((t) => {
      const s = t.state || 'Other';
      if (!groups[s]) groups[s] = [];
      groups[s].push(t);
    });
    return groups;
  }, [temples]);

  // Temples filtered by filter bar state
  const filterTemples = useMemo(() => {
    if (!selectedState || selectedState === 'all') return temples;
    return temples.filter((t) => t.state === selectedState);
  }, [temples, selectedState]);

  // Temples filtered by modal state
  const modalTemples = useMemo(() => {
    if (!modalState || modalState === 'all') return temples;
    return temples.filter((t) => t.state === modalState);
  }, [temples, modalState]);

  const currentSelectedTemple = useMemo(() => {
    return temples.find((t) => t._id === selectedTempleId);
  }, [temples, selectedTempleId]);

  const currentModalTemple = useMemo(() => {
    return temples.find((t) => t._id === modalTempleId);
  }, [temples, modalTempleId]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedTempleId) {
      fetchDarshanTypesForTemple(selectedTempleId);
    }
  }, [selectedTempleId]);

  useEffect(() => {
    setCurrentPage(1);
    fetchSlots(1, pageSize);
  }, [selectedTempleId, selectedDarshanTypeId, selectedDate, statusFilter]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/temples', { params: { status: 'all' } });
      if (res.data.success) {
        const fetchedTemples = res.data.temples || [];
        setTemples(fetchedTemples);
        if (fetchedTemples.length > 0) {
          const firstTemple = fetchedTemples[0];
          setSelectedTempleId(firstTemple._id);
        }
      }
    } catch (err) {
      console.error('Error initializing slot management:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDarshanTypesForTemple = async (tId) => {
    try {
      const res = await axiosClient.get(`/temples/${tId}/darshan-types`);
      if (res.data.success) {
        const types = res.data.darshanTypes || [];
        setDarshanTypes(types);
        if (types.length > 0) {
          setSelectedDarshanTypeId(types[0]._id);
        } else {
          setSelectedDarshanTypeId('');
        }
      }
    } catch (err) {
      console.error('Error loading darshan types for slot:', err);
    }
  };

  const fetchDarshanTypesForModal = async (tId) => {
    if (!tId) {
      setModalDarshanTypes([]);
      setModalDarshanTypeId('');
      return;
    }
    try {
      setLoadingModalTypes(true);
      const res = await axiosClient.get(`/temples/${tId}/darshan-types`);
      if (res.data.success) {
        const types = res.data.darshanTypes || [];
        setModalDarshanTypes(types);
        if (types.length > 0) {
          setModalDarshanTypeId(types[0]._id);
        } else {
          setModalDarshanTypeId('');
        }
      }
    } catch (err) {
      console.error('Error loading modal darshan types:', err);
      setModalDarshanTypes([]);
      setModalDarshanTypeId('');
    } finally {
      setLoadingModalTypes(false);
    }
  };

  const fetchSlots = async (targetPage = currentPage, targetLimit = pageSize) => {
    try {
      setLoadingSlots(true);
      const params = {
        page: targetPage,
        limit: targetLimit
      };
      if (selectedTempleId) params.templeId = selectedTempleId;
      if (selectedDarshanTypeId) params.darshanTypeId = selectedDarshanTypeId;
      if (selectedDate) params.date = selectedDate;
      if (statusFilter !== 'all') params.status = statusFilter;

      const res = await axiosClient.get('/admin/slots', { params });
      if (res.data.success) {
        setSlots(res.data.slots || []);
        setTotalSlots(res.data.total !== undefined ? res.data.total : (res.data.slots?.length || 0));
        setTotalPages(res.data.totalPages || 1);
        setCurrentPage(res.data.currentPage || targetPage);
      }
    } catch (err) {
      console.error('Error fetching admin slots:', err);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
    fetchSlots(newPage, pageSize);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
    fetchSlots(1, newSize);
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const handleStateFilterChange = (newState) => {
    setSelectedState(newState);
    if (newState === 'all') {
      if (!temples.some((t) => t._id === selectedTempleId) && temples.length > 0) {
        setSelectedTempleId(temples[0]._id);
      }
    } else {
      const inState = temples.filter((t) => t.state === newState);
      if (inState.length > 0) {
        const isInState = inState.some((t) => t._id === selectedTempleId);
        if (!isInState) {
          setSelectedTempleId(inState[0]._id);
        }
      }
    }
  };

  const handleOpenCreateModal = () => {
    setFormError('');
    const initialTemple = currentSelectedTemple || temples[0];
    const initialState = initialTemple?.state || states[0] || '';
    const initialTempleId = initialTemple?._id || '';

    setModalState(initialState);
    setModalTempleId(initialTempleId);
    fetchDarshanTypesForModal(initialTempleId);

    setSlotForm({
      date: new Date().toISOString().split('T')[0],
      startTime: '06:00 AM',
      endTime: '08:30 AM',
      capacity: 100
    });
    setCreateModalOpen(true);
  };

  const handleModalStateChange = (newState) => {
    setModalState(newState);
    const inState = temples.filter((t) => t.state === newState);
    if (inState.length > 0) {
      const firstTId = inState[0]._id;
      setModalTempleId(firstTId);
      fetchDarshanTypesForModal(firstTId);
    } else {
      setModalTempleId('');
      setModalDarshanTypes([]);
      setModalDarshanTypeId('');
    }
  };

  const handleModalTempleChange = (newTId) => {
    setModalTempleId(newTId);
    fetchDarshanTypesForModal(newTId);
  };

  const handleToggleBlockStatus = async (slot) => {
    const nextStatus = slot.status === 'blocked' ? 'active' : 'blocked';
    const confirmMsg =
      nextStatus === 'blocked'
        ? `Block this slot? Confirmed devotees will receive an automatic schedule alert notification.`
        : `Unblock this slot to allow new bookings?`;

    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await axiosClient.patch(`/admin/slots/${slot._id}/status`, {
        status: nextStatus
      });
      if (res.data.success) {
        setSlots((prev) =>
          prev.map((s) => (s._id === slot._id ? { ...s, status: nextStatus } : s))
        );
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating slot status');
    }
  };

  const handleOpenEditSlot = (slot) => {
    setEditingSlot(slot);
    setSlotForm({
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      capacity: slot.capacity
    });
    setFormError('');
    setEditModalOpen(true);
  };

  const handleSaveEditSlot = async (e) => {
    e.preventDefault();
    if (slotForm.capacity < editingSlot.bookedCount) {
      setFormError(
        `Cannot reduce capacity below ${editingSlot.bookedCount} (existing confirmed reservations).`
      );
      return;
    }

    try {
      setSubmitting(true);
      setFormError('');
      const res = await axiosClient.put(`/admin/slots/${editingSlot._id}`, {
        capacity: Number(slotForm.capacity),
        startTime: slotForm.startTime,
        endTime: slotForm.endTime
      });

      if (res.data.success) {
        setEditModalOpen(false);
        fetchSlots(currentPage, pageSize);
      }
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to update slot');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateSlot = async (e) => {
    e.preventDefault();
    if (!modalTempleId) {
      setFormError('Please select a temple.');
      return;
    }
    if (!modalDarshanTypeId) {
      setFormError('Please select a darshan option. If none exist for this temple, configure darshan types first.');
      return;
    }

    try {
      setSubmitting(true);
      setFormError('');

      await axiosClient.post('/admin/slots', {
        templeId: modalTempleId,
        darshanTypeId: modalDarshanTypeId,
        date: slotForm.date,
        startTime: slotForm.startTime,
        endTime: slotForm.endTime,
        capacity: Number(slotForm.capacity)
      });

      // Sync outer filter bar so newly scheduled slot is immediately displayed
      setSelectedState(modalState);
      setSelectedTempleId(modalTempleId);
      setSelectedDarshanTypeId(modalDarshanTypeId);
      setSelectedDate(slotForm.date);

      setCreateModalOpen(false);
      setCurrentPage(1);
      fetchSlots(1, pageSize);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to create slot');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout
      title="Slot Availability & Visitor Capacity"
      subtitle="Schedule dates, set visitor quotas, view booked counts, and block slots"
    >
      <div className="space-y-6">
        {/* Controls Bar */}
        <div className="bg-white p-5 rounded-2xl border border-[#D4AF37]/30 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* State Selector */}
            <div>
              <span className="block font-bold text-gray-700 uppercase mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#E65100]" />
                <span>State:</span>
              </span>
              <select
                value={selectedState}
                onChange={(e) => handleStateFilterChange(e.target.value)}
                className="p-2 rounded-xl border border-gray-300 font-semibold text-gray-800 bg-white focus:outline-none focus:border-[#E65100]"
              >
                <option value="all">All States ({states.length})</option>
                {states.map((st) => (
                  <option key={st} value={st}>
                    {st} ({stateTempleCounts[st]} {stateTempleCounts[st] === 1 ? 'temple' : 'temples'})
                  </option>
                ))}
              </select>
            </div>

            {/* Temple Selector (State-wise) */}
            <div>
              <span className="block font-bold text-gray-700 uppercase mb-1 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[#E65100]" />
                <span>Temple:</span>
              </span>
              <select
                value={selectedTempleId}
                onChange={(e) => setSelectedTempleId(e.target.value)}
                className="p-2 rounded-xl border border-gray-300 font-semibold text-gray-800 bg-white focus:outline-none focus:border-[#E65100] max-w-[280px]"
              >
                {selectedState === 'all' ? (
                  Object.keys(groupedTemples).sort().map((st) => (
                    <optgroup key={st} label={`── ${st} (${groupedTemples[st].length}) ──`}>
                      {groupedTemples[st].map((t) => (
                        <option key={t._id} value={t._id}>
                          {t.name} ({t.city})
                        </option>
                      ))}
                    </optgroup>
                  ))
                ) : (
                  filterTemples.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name} ({t.city})
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Darshan Type Selector */}
            <div>
              <span className="block font-bold text-gray-700 uppercase mb-1">Darshan Type:</span>
              <select
                value={selectedDarshanTypeId}
                onChange={(e) => setSelectedDarshanTypeId(e.target.value)}
                className="p-2 rounded-xl border border-gray-300 text-gray-800 bg-white focus:outline-none focus:border-[#E65100] max-w-[220px]"
              >
                <option value="">All Types</option>
                {darshanTypes.map((dt) => (
                  <option key={dt._id} value={dt._id}>
                    {dt.name} (₹{dt.chargePerDevotee})
                  </option>
                ))}
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <span className="block font-bold text-gray-700 uppercase mb-1">Date:</span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="p-2 rounded-xl border border-gray-300 text-gray-800 focus:outline-none focus:border-[#E65100]"
              />
            </div>

            {/* Status Filter */}
            <div>
              <span className="block font-bold text-gray-700 uppercase mb-1">Slot Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 rounded-xl border border-gray-300 text-gray-800 bg-white focus:outline-none focus:border-[#E65100]"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="inline-flex items-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6F00] to-[#E65100] text-white font-bold shadow-sm hover:brightness-105 transition-all text-xs"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Create Time Slot</span>
          </button>
        </div>

        {/* Selected Temple Info Badge */}
        {currentSelectedTemple && (
          <div className="bg-[#FDFBF7] px-4 py-2.5 rounded-xl border border-[#D4AF37]/20 flex flex-wrap items-center justify-between text-xs text-gray-600 gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900">{currentSelectedTemple.name}</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-[#6B1D2F] font-semibold text-[10px]">
                {currentSelectedTemple.state}
              </span>
              <span className="text-gray-500">• {currentSelectedTemple.city}</span>
            </div>
            <div className="text-gray-500">
              Deity: <strong className="text-[#6B1D2F]">{currentSelectedTemple.deity}</strong>
            </div>
          </div>
        )}

        {/* Slots Table */}
        <div className="bg-white rounded-2xl border border-[#D4AF37]/30 shadow-xs overflow-hidden">
          {loadingSlots ? (
            <div className="py-16">
              <LoadingSpinner text="Loading time slots..." />
            </div>
          ) : slots.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-xs">
              No time slots match the selected filters.
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FDFBF7] border-b border-gray-200 text-gray-600 font-semibold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Time Interval</th>
                      <th className="py-3 px-4">Temple & State</th>
                      <th className="py-3 px-4">Darshan Option</th>
                      <th className="py-3 px-4">Total Quota</th>
                      <th className="py-3 px-4">Booked Seats</th>
                      <th className="py-3 px-4">Available</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {slots.map((slot) => {
                      const remaining = Math.max(0, slot.capacity - (slot.bookedCount || 0));
                      const slotTemple = slot.temple || currentSelectedTemple;

                      return (
                        <tr key={slot._id} className="hover:bg-gray-50">
                          <td className="py-3.5 px-4 font-bold text-gray-900">
                            {slot.date}
                          </td>

                          <td className="py-3.5 px-4 font-semibold">
                            <div className="flex items-center text-gray-800">
                              <Clock className="w-3.5 h-3.5 mr-1 text-[#E65100]" />
                              <span>{slot.startTime} - {slot.endTime}</span>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-bold text-gray-900">{slotTemple?.name || 'Temple'}</div>
                            <div className="text-[10px] text-gray-500 flex items-center gap-1">
                              <span className="font-semibold text-[#6B1D2F]">{slotTemple?.state || ''}</span>
                              {slotTemple?.city && (
                                <>
                                  <span>•</span>
                                  <span>{slotTemple.city}</span>
                                </>
                              )}
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-gray-600">
                            {slot.darshanType?.name || 'Standard'}
                          </td>

                          <td className="py-3.5 px-4 font-bold text-gray-900">
                            {slot.capacity}
                          </td>

                          <td className="py-3.5 px-4 font-semibold text-[#E65100]">
                            {slot.bookedCount || 0}
                          </td>

                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                remaining === 0
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {remaining} remaining
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                slot.status === 'active'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {slot.status}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <div className="inline-flex items-center space-x-2">
                              <button
                                onClick={() => handleOpenEditSlot(slot)}
                                className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50"
                                title="Edit Capacity & Times"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => handleToggleBlockStatus(slot)}
                                className={`p-1.5 rounded-lg transition-colors ${
                                  slot.status === 'blocked'
                                    ? 'text-emerald-600 hover:bg-emerald-50'
                                    : 'text-red-600 hover:bg-red-50'
                                }`}
                                title={slot.status === 'blocked' ? 'Unblock Slot' : 'Block Slot'}
                              >
                                {slot.status === 'blocked' ? (
                                  <Unlock className="w-4 h-4" />
                                ) : (
                                  <Lock className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {totalSlots > 0 && (
                <div className="p-4 bg-[#FDFBF7] border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  {/* Left: Summary and Page Size Selector */}
                  <div className="flex flex-wrap items-center gap-3 text-gray-600">
                    <span>
                      Showing <strong className="text-gray-900">{Math.min((currentPage - 1) * pageSize + 1, totalSlots)}</strong> to{' '}
                      <strong className="text-gray-900">{Math.min(currentPage * pageSize, totalSlots)}</strong> of{' '}
                      <strong className="text-[#6B1D2F] font-bold">{totalSlots}</strong> slots
                    </span>

                    <div className="flex items-center gap-1.5 pl-2 border-l border-gray-300">
                      <span className="text-gray-500">Per page:</span>
                      <select
                        value={pageSize}
                        onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                        className="py-1 px-2 rounded-lg border border-gray-300 bg-white font-semibold text-gray-800 focus:outline-none focus:border-[#E65100]"
                      >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                    </div>
                  </div>

                  {/* Right: Page Buttons */}
                  <div className="flex items-center space-x-1">
                    {/* First Page */}
                    <button
                      type="button"
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                      className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      title="First Page"
                    >
                      <ChevronsLeft className="w-4 h-4" />
                    </button>

                    {/* Prev Page */}
                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      title="Previous Page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Numbered Page Buttons with Smart Ellipses */}
                    {getPageNumbers().map((p, idx) => {
                      if (p === '...') {
                        return (
                          <span key={`ellipsis-${idx}`} className="px-2 py-1 text-gray-400 font-bold select-none">
                            ...
                          </span>
                        );
                      }
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => handlePageChange(p)}
                          className={`min-w-[32px] h-8 px-2 rounded-lg font-bold text-xs transition-all ${
                            currentPage === p
                              ? 'bg-gradient-to-r from-[#FF6F00] to-[#E65100] text-white shadow-xs'
                              : 'border border-gray-200 bg-white text-gray-700 hover:bg-amber-50/70 hover:border-[#D4AF37]'
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}

                    {/* Next Page */}
                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      title="Next Page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Last Page */}
                    <button
                      type="button"
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                      className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      title="Last Page"
                    >
                      <ChevronsRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Create Slot Modal */}
        {createModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 space-y-4 my-8 animate-in fade-in duration-150">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-gray-900">
                  Create Time Slot
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Select state and temple to configure visitor capacity & schedules
                </p>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center space-x-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleCreateSlot} className="space-y-4 text-xs">
                {/* State & Temple Selection Section */}
                <div className="p-3.5 bg-[#FDFBF7] rounded-xl border border-[#D4AF37]/30 space-y-3">
                  <div className="font-bold text-gray-800 uppercase tracking-wide text-[11px] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E65100]" />
                    <span>State-wise Temple Selection</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Modal State Selector */}
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">State *</label>
                      <select
                        value={modalState}
                        onChange={(e) => handleModalStateChange(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-300 font-medium text-gray-900 bg-white focus:outline-none focus:border-[#E65100]"
                        required
                      >
                        {states.map((st) => (
                          <option key={st} value={st}>
                            {st} ({stateTempleCounts[st]} {stateTempleCounts[st] === 1 ? 'temple' : 'temples'})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Modal Temple Selector */}
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Temple *</label>
                      <select
                        value={modalTempleId}
                        onChange={(e) => handleModalTempleChange(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-300 font-semibold text-gray-900 bg-white focus:outline-none focus:border-[#E65100]"
                        required
                      >
                        {modalTemples.map((t) => (
                          <option key={t._id} value={t._id}>
                            {t.name} ({t.city})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {currentModalTemple && (
                    <div className="text-[11px] text-gray-500 flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 border-t border-amber-100">
                      <span>City: <strong className="text-gray-800">{currentModalTemple.city}</strong></span>
                      <span>•</span>
                      <span>Deity: <strong className="text-[#6B1D2F]">{currentModalTemple.deity}</strong></span>
                    </div>
                  )}
                </div>

                {/* Darshan Type Selection */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1 flex items-center justify-between">
                    <span>Darshan Option *</span>
                    {loadingModalTypes && (
                      <span className="text-[10px] text-amber-600 font-normal">Loading options...</span>
                    )}
                  </label>
                  {modalDarshanTypes.length === 0 ? (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px]">
                      ⚠️ No active darshan types configured for {currentModalTemple?.name || 'this temple'}.
                      Please configure darshan types on the Darshan Types page first.
                    </div>
                  ) : (
                    <select
                      value={modalDarshanTypeId}
                      onChange={(e) => setModalDarshanTypeId(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-gray-300 font-semibold text-gray-900 bg-white focus:outline-none focus:border-[#E65100]"
                      required
                    >
                      {modalDarshanTypes.map((dt) => (
                        <option key={dt._id} value={dt._id}>
                          {dt.name} — ₹{dt.chargePerDevotee || 0} ({dt.duration || '30-45 mins'})
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Date *</label>
                  <input
                    type="date"
                    value={slotForm.date}
                    onChange={(e) => setSlotForm({ ...slotForm, date: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E65100]"
                    required
                  />
                </div>

                {/* Times */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Start Time *</label>
                    <input
                      type="text"
                      placeholder="e.g. 06:00 AM"
                      value={slotForm.startTime}
                      onChange={(e) => setSlotForm({ ...slotForm, startTime: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E65100]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">End Time *</label>
                    <input
                      type="text"
                      placeholder="e.g. 08:30 AM"
                      value={slotForm.endTime}
                      onChange={(e) => setSlotForm({ ...slotForm, endTime: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E65100]"
                      required
                    />
                  </div>
                </div>

                {/* Quota */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Visitor Capacity (Quota) *</label>
                  <input
                    type="number"
                    min="1"
                    value={slotForm.capacity}
                    onChange={(e) => setSlotForm({ ...slotForm, capacity: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E65100]"
                    required
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end space-x-3 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setCreateModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || modalDarshanTypes.length === 0}
                    className="px-5 py-2.5 text-xs font-bold bg-[#E65100] hover:bg-[#BF360C] text-white rounded-xl shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {submitting ? 'Creating...' : 'Create Slot'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Slot Modal */}
        {editModalOpen && editingSlot && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-gray-900">
                  Update Slot Capacity & Schedule
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Slot schedule and maximum devotee quota
                </p>
              </div>

              {/* Temple & State Context Badge */}
              <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/80 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#6B1D2F] uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#E65100]" />
                    {editingSlot.temple?.state || currentSelectedTemple?.state || 'State'}
                  </span>
                  <span className="text-gray-500 font-medium">
                    {editingSlot.temple?.city || currentSelectedTemple?.city}
                  </span>
                </div>
                <div className="font-bold text-gray-900 text-sm">
                  {editingSlot.temple?.name || currentSelectedTemple?.name}
                </div>
                <div className="text-xs text-gray-600 flex items-center gap-1.5 pt-0.5">
                  <span className="font-semibold text-gray-700">Darshan Option:</span>
                  <span className="text-[#E65100] font-bold">{editingSlot.darshanType?.name || 'Standard'}</span>
                </div>
              </div>

              {formError && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleSaveEditSlot} className="space-y-3.5 text-xs">
                <div>
                  <p className="text-gray-500">
                    Existing Confirmed Bookings: <strong>{editingSlot.bookedCount}</strong>
                  </p>
                  <p className="text-[11px] text-amber-700 font-light mt-0.5">
                    * By rule, capacity cannot be lowered below existing booked count.
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">New Capacity *</label>
                  <input
                    type="number"
                    min={editingSlot.bookedCount}
                    value={slotForm.capacity}
                    onChange={(e) => setSlotForm({ ...slotForm, capacity: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#E65100]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Start Time</label>
                    <input
                      type="text"
                      value={slotForm.startTime}
                      onChange={(e) => setSlotForm({ ...slotForm, startTime: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#E65100]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">End Time</label>
                    <input
                      type="text"
                      value={slotForm.endTime}
                      onChange={(e) => setSlotForm({ ...slotForm, endTime: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#E65100]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 text-xs font-bold bg-[#E65100] hover:bg-[#BF360C] text-white rounded-lg shadow-sm"
                  >
                    {submitting ? 'Saving...' : 'Update Capacity'}
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

export default AdminSlots;
