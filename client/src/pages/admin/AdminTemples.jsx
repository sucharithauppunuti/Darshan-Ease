import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import AdminLayout from '../../components/admin/AdminLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
  Landmark,
  Plus,
  Search,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  MapPin,
  Sparkles,
  Sliders,
  Filter
} from 'lucide-react';

const AdminTemples = () => {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [statusCounts, setStatusCounts] = useState({ all: 0, active: 0, inactive: 0 });

  useEffect(() => {
    fetchStatusCounts();
  }, []);

  useEffect(() => {
    fetchTemples();
  }, [statusFilter]);

  const fetchStatusCounts = async () => {
    try {
      const res = await axiosClient.get('/temples', { params: { status: 'all', limit: 200 } });
      if (res.data.success && res.data.temples) {
        const allTemples = res.data.temples;
        setStatusCounts({
          all: allTemples.length,
          active: allTemples.filter((t) => t.status === 'active').length,
          inactive: allTemples.filter((t) => t.status === 'inactive').length
        });
      }
    } catch (err) {
      console.error('Error fetching temple counts:', err);
    }
  };

  const fetchTemples = async () => {
    try {
      setLoading(true);
      const params = { status: statusFilter, limit: 100 };
      if (searchTerm.trim()) params.search = searchTerm.trim();

      const res = await axiosClient.get('/temples', { params });
      if (res.data.success) {
        setTemples(res.data.temples || []);
      }
    } catch (err) {
      console.error('Error fetching temples for admin:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (templeId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      const res = await axiosClient.patch(`/temples/${templeId}/status`, {
        status: newStatus
      });
      if (res.data.success) {
        if (statusFilter === 'all') {
          setTemples((prev) =>
            prev.map((t) => (t._id === templeId ? { ...t, status: newStatus } : t))
          );
        } else {
          setTemples((prev) => prev.filter((t) => t._id !== templeId));
        }
        fetchStatusCounts();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTemples();
  };

  return (
    <AdminLayout
      title="Temple Management"
      subtitle="Configure temples, sanctum guidelines, opening hours, and operating status"
    >
      <div className="space-y-6">
        {/* Top Actions & Filters Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#D4AF37]/30 shadow-xs">
          {/* Search Input */}
          <form onSubmit={handleSearch} className="flex items-center space-x-2 w-full lg:max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search temples by name, city, deity..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#E65100]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#6B1D2F] text-white rounded-xl text-xs font-semibold hover:bg-[#4A121F] transition-colors"
            >
              Search
            </button>
          </form>

          {/* Status Buttons & Add Temple */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Segmented Buttons */}
            <div className="inline-flex p-1 bg-gray-100/80 rounded-xl border border-gray-200 text-xs">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-white text-gray-900 shadow-xs border border-gray-200/60'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>All Statuses</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                  statusFilter === 'all' ? 'bg-[#6B1D2F] text-white' : 'bg-gray-200 text-gray-700'
                }`}>
                  {statusCounts.all}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('active')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  statusFilter === 'active'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-emerald-700'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Active</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                  statusFilter === 'active' ? 'bg-emerald-800 text-white' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {statusCounts.active}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('inactive')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  statusFilter === 'inactive'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-red-700'
                }`}
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Inactive</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                  statusFilter === 'inactive' ? 'bg-red-800 text-white' : 'bg-red-100 text-red-800'
                }`}>
                  {statusCounts.inactive}
                </span>
              </button>
            </div>

            <Link
              to="/admin/temples/new"
              className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF6F00] to-[#E65100] text-white text-xs font-bold shadow-sm hover:brightness-105 transition-all"
            >
              <Plus className="w-4 h-4 mr-1" />
              <span>Add Temple</span>
            </Link>
          </div>
        </div>

        {/* Temples Table */}
        <div className="bg-white rounded-2xl border border-[#D4AF37]/30 shadow-xs overflow-hidden">
          {loading ? (
            <div className="py-16">
              <LoadingSpinner text="Loading temple listings..." />
            </div>
          ) : temples.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-xs space-y-1">
              <p className="font-semibold text-gray-600 text-sm">No temples found matching criteria.</p>
              <p className="text-gray-400">
                {statusFilter === 'inactive'
                  ? 'There are currently no inactive temples.'
                  : statusFilter === 'active'
                  ? 'There are currently no active temples.'
                  : 'Try adjusting your search query or status filter.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FDFBF7] border-b border-gray-200 text-gray-600 font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Temple Name</th>
                    <th className="py-3 px-4">Main Deity</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Tradition</th>
                    <th className="py-3 px-4">Starting Price</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {temples.map((temple) => (
                    <tr key={temple._id} className="hover:bg-gray-50">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={temple.images && temple.images[0]}
                            alt={temple.name}
                            className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                          />
                          <div>
                            <p className="font-bold text-gray-900">{temple.name}</p>
                            <p className="text-[11px] text-gray-400 truncate max-w-xs">{temple.openingHours}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-gray-800">
                        {temple.deity}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-3.5 h-3.5 mr-1 text-[#E65100]" />
                          <span>{temple.city}, {temple.state}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                          {temple.category || 'Shrine'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-[#6B1D2F]">
                        {temple.startingPrice === 0 ? 'Free' : `₹${temple.startingPrice}`}
                      </td>

                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(temple._id, temple.status)}
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                            temple.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                          title={`Click to set ${temple.status === 'active' ? 'Inactive' : 'Active'}`}
                        >
                          {temple.status === 'active' ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <XCircle className="w-3 h-3 mr-1" />
                          )}
                          <span>{temple.status}</span>
                        </button>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center space-x-2">
                          <Link
                            to={`/temples/${temple._id}`}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                            title="Preview Public Page"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          <Link
                            to={`/admin/temples/${temple._id}/edit`}
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50"
                            title="Edit Temple"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTemples;
