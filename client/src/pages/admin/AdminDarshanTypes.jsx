import React, { useState, useEffect, useMemo } from 'react';
import axiosClient from '../../api/axiosClient';
import AdminLayout from '../../components/admin/AdminLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
  Layers,
  Plus,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  AlertCircle,
  Save,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  MapPin,
  Building2
} from 'lucide-react';

const AdminDarshanTypes = () => {
  const [temples, setTemples] = useState([]);
  const [darshanTypes, setDarshanTypes] = useState([]);
  const [selectedState, setSelectedState] = useState('all');
  const [selectedTempleId, setSelectedTempleId] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal / Form state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [modalState, setModalState] = useState('');
  const [modalTempleId, setModalTempleId] = useState('');

  const [formData, setFormData] = useState({
    templeId: '',
    name: '',
    description: '',
    chargePerDevotee: 0,
    pricePerPerson: 0,
    currency: 'INR',
    eligibility: 'Open to all devotees with valid government photo identification',
    duration: '30-45 minutes',
    dressCode: 'Traditional Indian attire',
    reportingNotice: 'Please report 30 minutes prior to slot start time.',
    priceVerificationStatus: 'verified',
    officialSourceUrl: '',
    status: 'active'
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Unique sorted list of states
  const states = useMemo(() => {
    return [...new Set(temples.map((t) => t.state).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b)
    );
  }, [temples]);

  // Counts of temples per state
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

  const selectedTemple = useMemo(() => {
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
      fetchDarshanTypes(selectedTempleId);
    }
  }, [selectedTempleId]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/temples', { params: { status: 'all' } });
      if (res.data.success) {
        const fetched = res.data.temples || [];
        setTemples(fetched);
        if (fetched.length > 0) {
          setSelectedTempleId(fetched[0]._id);
        }
      }
    } catch (err) {
      console.error('Error fetching temples:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDarshanTypes = async (targetTempleId = selectedTempleId) => {
    if (!targetTempleId) return;
    try {
      const res = await axiosClient.get(`/temples/${targetTempleId}/darshan-types`);
      if (res.data.success) {
        setDarshanTypes(res.data.darshanTypes || []);
      }
    } catch (err) {
      console.error('Error fetching darshan types:', err);
    }
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

  const handleOpenAddModal = () => {
    setEditingType(null);
    const initialTemple = selectedTemple || temples[0];
    const initialState = initialTemple?.state || states[0] || '';
    const initialTempleId = initialTemple?._id || '';

    setModalState(initialState);
    setModalTempleId(initialTempleId);
    setFormData({
      templeId: initialTempleId,
      name: '',
      description: '',
      chargePerDevotee: 0,
      pricePerPerson: 0,
      currency: 'INR',
      eligibility: 'Open to all devotees with valid government photo identification',
      duration: '30-45 minutes',
      dressCode: 'Traditional Indian attire',
      reportingNotice: 'Please report 30 minutes prior to slot start time.',
      priceVerificationStatus: 'verified',
      officialSourceUrl: '',
      status: 'active'
    });
    setFormError('');
    setModalOpen(true);
  };

  const handleOpenEditModal = (dt) => {
    setEditingType(dt);
    const dtTempleId = dt.temple?._id || dt.temple || selectedTempleId;
    const t = temples.find((temp) => temp._id === dtTempleId) || selectedTemple;
    const dtState = t?.state || states[0] || '';

    setModalState(dtState);
    setModalTempleId(t?._id || selectedTempleId);
    setFormData({
      templeId: t?._id || selectedTempleId,
      name: dt.name || '',
      description: dt.description || '',
      chargePerDevotee: dt.chargePerDevotee !== undefined ? dt.chargePerDevotee : dt.pricePerPerson || 0,
      pricePerPerson: dt.pricePerPerson !== undefined ? dt.pricePerPerson : dt.chargePerDevotee || 0,
      currency: dt.currency || 'INR',
      eligibility: dt.eligibility || 'Open to all devotees with valid government photo identification',
      duration: dt.duration || '30-45 minutes',
      dressCode: dt.dressCode || 'Traditional Indian attire',
      reportingNotice: dt.reportingNotice || 'Please report 30 minutes prior to slot start time.',
      priceVerificationStatus: dt.priceVerificationStatus || 'verified',
      officialSourceUrl: dt.officialSourceUrl || '',
      status: dt.status || 'active'
    });
    setFormError('');
    setModalOpen(true);
  };

  const handleModalStateChange = (newState) => {
    setModalState(newState);
    const inState = temples.filter((t) => t.state === newState);
    if (inState.length > 0) {
      const firstTId = inState[0]._id;
      setModalTempleId(firstTId);
      setFormData((prev) => ({ ...prev, templeId: firstTId }));
    } else {
      setModalTempleId('');
      setFormData((prev) => ({ ...prev, templeId: '' }));
    }
  };

  const handleModalTempleChange = (newTId) => {
    setModalTempleId(newTId);
    setFormData((prev) => ({ ...prev, templeId: newTId }));
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      const res = await axiosClient.patch(`/darshan-types/${id}/status`, {
        status: nextStatus
      });
      if (res.data.success) {
        setDarshanTypes((prev) =>
          prev.map((dt) => (dt._id === id ? { ...dt, status: nextStatus, activeStatus: nextStatus } : dt))
        );
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating status');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) {
      return;
    }
    try {
      const res = await axiosClient.delete(`/darshan-types/${id}`);
      if (res.data.success) {
        setDarshanTypes((prev) => prev.filter((dt) => dt._id !== id));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete darshan type');
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!modalTempleId) {
      setFormError('Please select a temple.');
      return;
    }
    if (!formData.name.trim()) {
      setFormError('Please enter a darshan type name.');
      return;
    }

    if (formData.priceVerificationStatus === 'official' && !formData.officialSourceUrl.trim()) {
      setFormError('Official source URL is required when marked as official.');
      return;
    }

    try {
      setSubmitting(true);
      setFormError('');

      const payload = {
        ...formData,
        temple: modalTempleId,
        pricePerPerson: Number(formData.chargePerDevotee) || 0,
        chargePerDevotee: Number(formData.chargePerDevotee) || 0
      };

      if (editingType) {
        await axiosClient.put(`/darshan-types/${editingType._id}`, payload);
      } else {
        await axiosClient.post(`/temples/${modalTempleId}/darshan-types`, payload);
      }

      // Sync outer filter bar so devotee sees newly added or modified darshan type
      setSelectedState(modalState);
      setSelectedTempleId(modalTempleId);

      setModalOpen(false);
      fetchDarshanTypes(modalTempleId);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save darshan type');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout
      title="Darshan Ticket Types & Tariffs"
      subtitle="Configure temple-specific entry categories, tariffs per devotee, eligibility, and verification status"
    >
      <div className="space-y-6">
        {/* State-wise Temple Filter & Action Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#D4AF37]/30 shadow-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* State Filter */}
            <div>
              <span className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#E65100]" />
                <span>State:</span>
              </span>
              <select
                value={selectedState}
                onChange={(e) => handleStateFilterChange(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-900 bg-white focus:outline-none focus:border-[#E65100]"
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
              <span className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[#E65100]" />
                <span>Temple:</span>
              </span>
              <select
                value={selectedTempleId}
                onChange={(e) => setSelectedTempleId(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-900 bg-white focus:outline-none focus:border-[#E65100] max-w-[280px]"
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

            {selectedTemple && (
              <div className="flex flex-wrap items-center gap-2 pt-5 sm:pt-4 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-[#6B1D2F] font-bold">
                  {selectedTemple.state} • {selectedTemple.city}
                </span>
                <span className="text-gray-500 font-medium">
                  Deity: <span className="text-[#6B1D2F] font-bold">{selectedTemple.deity}</span>
                </span>
              </div>
            )}
          </div>

          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6F00] to-[#E65100] text-white text-xs font-bold shadow-md hover:brightness-105 transition-all shrink-0"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Add Darshan Ticket Type</span>
          </button>
        </div>

        {/* Darshan Types List */}
        <div className="bg-white rounded-2xl border border-[#D4AF37]/30 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#FDFBF7]">
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#E65100]" />
              <span>
                Available Darshan Types for {selectedTemple?.name || 'Selected Temple'}{' '}
                {selectedTemple?.state && (
                  <span className="text-amber-700 font-normal">({selectedTemple.state})</span>
                )}
              </span>
            </h3>
            <span className="text-xs font-bold text-[#6B1D2F] bg-white px-3 py-1 rounded-full border border-gray-200">
              {darshanTypes.length} configured
            </span>
          </div>

          {loading ? (
            <LoadingSpinner text="Fetching darshan categories..." />
          ) : darshanTypes.length === 0 ? (
            <div className="text-center py-16 text-gray-500 text-xs space-y-2">
              <p>No darshan types found for this temple.</p>
              <p className="text-gray-400">Click "Add Darshan Ticket Type" above to create one.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FDFBF7] border-b border-gray-200 text-gray-600 font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Darshan Name</th>
                    <th className="py-3 px-4">Tariff / Devotee</th>
                    <th className="py-3 px-4">Verification</th>
                    <th className="py-3 px-4">Eligibility & Duration</th>
                    <th className="py-3 px-4">Dress Protocol</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {darshanTypes.map((dt) => {
                    const price = dt.chargePerDevotee !== undefined ? dt.chargePerDevotee : dt.pricePerPerson || 0;
                    return (
                      <tr key={dt._id} className="hover:bg-gray-50">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-gray-900">{dt.name}</div>
                          <div className="text-[11px] text-gray-500 max-w-xs truncate">{dt.description}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-extrabold ${
                            price === 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-[#6B1D2F] border border-amber-200'
                          }`}>
                            {price === 0 ? 'Free (₹0)' : `₹${price}`}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="space-y-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              dt.priceVerificationStatus === 'official' || dt.priceVerificationStatus === 'verified'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              <ShieldCheck className="w-3 h-3 mr-1" />
                              {dt.priceVerificationStatus || 'verified'}
                            </span>
                            {dt.officialSourceUrl && (
                              <div>
                                <a
                                  href={dt.officialSourceUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[10px] text-blue-600 hover:underline inline-flex items-center"
                                >
                                  Official Link <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                                </a>
                              </div>
                            )}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="text-[11px] font-medium text-gray-800">{dt.duration || '30-45 mins'}</div>
                          <div className="text-[10px] text-gray-500 truncate">{dt.eligibility}</div>
                        </td>

                        <td className="py-3.5 px-4 text-gray-500 text-[11px] max-w-[150px] truncate">
                          {dt.dressCode}
                        </td>

                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => handleToggleStatus(dt._id, dt.status)}
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                              dt.status === 'active'
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                          >
                            {dt.status === 'active' ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <XCircle className="w-3 h-3 mr-1" />
                            )}
                            <span>{dt.status}</span>
                          </button>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center space-x-1">
                            <button
                              onClick={() => handleOpenEditModal(dt)}
                              className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                              title="Edit Darshan Type"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(dt._id, dt.name)}
                              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete Darshan Type"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Create/Edit Modal with State-wise Temple Selection */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 space-y-4 my-8 animate-in fade-in duration-150">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-gray-900">
                  {editingType ? 'Edit Darshan Ticket Type' : 'Add New Darshan Ticket Type'}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Select state and temple to configure devotional entry categories & tariffs
                </p>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center space-x-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
                {/* State-wise Temple Selection Card */}
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

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Darshan Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Special Entry Darshan (Seeghra Darshan)"
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E65100]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Tariff Per Devotee (₹) *</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.chargePerDevotee}
                      onChange={(e) => setFormData({ ...formData, chargePerDevotee: Number(e.target.value), pricePerPerson: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E65100]"
                      required
                    />
                    <span className="text-[10px] text-gray-500">Enter 0 for Free Darshan</span>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Approx Duration</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g. 45-60 minutes"
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E65100]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Short Description</label>
                  <textarea
                    rows="2"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Queue line details, prasadam laddu inclusion, sanctum sanctorum access..."
                    className="w-full p-2 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E65100]"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Eligibility & ID Guidelines</label>
                  <input
                    type="text"
                    value={formData.eligibility}
                    onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                    placeholder="e.g. Original Aadhaar / Govt ID required for all devotees"
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E65100]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Price Verification Status</label>
                    <select
                      value={formData.priceVerificationStatus}
                      onChange={(e) => setFormData({ ...formData, priceVerificationStatus: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E65100] bg-white"
                    >
                      <option value="verified">Verified Tariff</option>
                      <option value="official">Official Temple Rate</option>
                      <option value="demo">Demo / Illustrative Data</option>
                      <option value="unverified">Unverified</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Active Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E65100] bg-white"
                    >
                      <option value="active">Active (Available)</option>
                      <option value="inactive">Inactive (Hidden)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Official Source URL {formData.priceVerificationStatus === 'official' && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="url"
                    value={formData.officialSourceUrl}
                    onChange={(e) => setFormData({ ...formData, officialSourceUrl: e.target.value })}
                    placeholder="https://official-temple-trust.org/tariffs"
                    className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E65100]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Dress Code</label>
                    <input
                      type="text"
                      value={formData.dressCode}
                      onChange={(e) => setFormData({ ...formData, dressCode: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E65100]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Reporting Notice</label>
                    <input
                      type="text"
                      value={formData.reportingNotice}
                      onChange={(e) => setFormData({ ...formData, reportingNotice: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#E65100]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2.5 text-xs font-bold bg-[#E65100] hover:bg-[#BF360C] text-white rounded-xl shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{submitting ? 'Saving...' : 'Save Darshan Ticket'}</span>
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

export default AdminDarshanTypes;
