import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import AdminLayout from '../../components/admin/AdminLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { ArrowLeft, Save, AlertCircle, ShieldCheck, ExternalLink, Info } from 'lucide-react';

const CATEGORIES = ['Jyotirlinga', 'Shakti Peeth', 'Vaishnava', 'Ganesh', 'Other Deities'];
const TRUST_LABELS = ['Official', 'Official Link-out', 'Authorized Partner', 'DarshanEase Verified', 'Information Only'];
const BOOKING_MODES = [
  { value: 'demo_booking', label: 'DarshanEase Demo Booking (Capacity Managed)' },
  { value: 'official_linkout', label: 'Official Shrine Portal Link-Out' },
  { value: 'enquiry_only', label: 'Visit / Seva Enquiry Only' },
  { value: 'none', label: 'Information Only (No Booking Action)' }
];

const AdminTempleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    deity: '',
    category: 'Vaishnava',
    description: '',
    images: '',
    address: '',
    city: '',
    state: '',
    openingHours: '06:00 AM - 09:00 PM',
    guidelines: 'Traditional Indian dress code mandatory. Electronic gadgets restricted.',
    status: 'active',
    startingPrice: 0,
    isPopular: false,
    isVerified: true,
    trustLabel: 'DarshanEase Verified',
    bookingMode: 'demo_booking',
    officialUrl: '',
    lastReviewedDate: '2026-10-12',
    accessibilityNotes: 'Wheelchair ramps available at main entrance, special assistance lane for senior citizens.',
    crowdLevelInfo: 'Moderate crowd (approx. 45-60 min darshan queue)',
    bestTimeToVisit: 'October to March',
    prasadTimings: '09:00 AM - 08:30 PM',
    contactPhone: '+91 8000 123 456',
    contactEmail: 'helpdesk@temple.org',
    contactWebsite: ''
  });

  useEffect(() => {
    if (isEditMode) {
      fetchTempleData();
    }
  }, [id]);

  const fetchTempleData = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get(`/temples/${id}`);
      if (res.data.success) {
        const t = res.data.temple;
        setFormData({
          name: t.name || '',
          deity: t.deity || '',
          category: t.category || 'Vaishnava',
          description: t.description || '',
          images: Array.isArray(t.images) ? t.images.join(', ') : '',
          address: t.address || '',
          city: t.city || '',
          state: t.state || '',
          openingHours: t.openingHours || '',
          guidelines: t.guidelines || '',
          status: t.status || 'active',
          startingPrice: t.startingPrice || 0,
          isPopular: Boolean(t.isPopular),
          isVerified: Boolean(t.isVerified),
          trustLabel: t.trustLabel || 'DarshanEase Verified',
          bookingMode: t.bookingMode || 'demo_booking',
          officialUrl: t.officialUrl || '',
          lastReviewedDate: t.lastReviewedDate ? t.lastReviewedDate.split('T')[0] : '2026-10-12',
          accessibilityNotes: t.accessibilityNotes || '',
          crowdLevelInfo: t.crowdLevelInfo || '',
          bestTimeToVisit: t.visitingInfo?.bestTimeToVisit || 'October to March',
          prasadTimings: t.visitingInfo?.prasadTimings || '09:00 AM - 08:30 PM',
          contactPhone: t.contactInfo?.phone || '',
          contactEmail: t.contactInfo?.email || '',
          contactWebsite: t.contactInfo?.website || ''
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching temple details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.deity.trim() || !formData.city.trim() || !formData.state.trim()) {
      setError('Please fill in temple name, deity, city, and state.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      const imagesArray = formData.images
        .split(',')
        .map((img) => img.trim())
        .filter(Boolean);

      const payload = {
        name: formData.name.trim(),
        deity: formData.deity.trim(),
        category: formData.category,
        description: formData.description.trim(),
        images: imagesArray.length > 0 ? imagesArray : ['https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80'],
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        openingHours: formData.openingHours.trim(),
        guidelines: formData.guidelines.trim(),
        status: formData.status,
        startingPrice: Number(formData.startingPrice) || 0,
        isPopular: formData.isPopular,
        isVerified: formData.isVerified,
        trustLabel: formData.trustLabel,
        bookingMode: formData.bookingMode,
        officialUrl: formData.officialUrl.trim(),
        lastReviewedDate: formData.lastReviewedDate,
        accessibilityNotes: formData.accessibilityNotes.trim(),
        crowdLevelInfo: formData.crowdLevelInfo.trim(),
        visitingInfo: {
          bestTimeToVisit: formData.bestTimeToVisit.trim(),
          prasadTimings: formData.prasadTimings.trim(),
          rituals: ['Maha Aarti', 'Suprabhatam', 'Nithya Puja'],
          footwearPolicy: 'Dedicated counters available outside sanctum complex.'
        },
        contactInfo: {
          phone: formData.contactPhone.trim(),
          email: formData.contactEmail.trim(),
          website: formData.contactWebsite.trim()
        }
      };

      if (isEditMode) {
        await axiosClient.put(`/temples/${id}`, payload);
      } else {
        await axiosClient.post('/temples', payload);
      }

      navigate('/admin/temples');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save temple information');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Loading Temple Details">
        <LoadingSpinner text="Fetching temple records..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title={isEditMode ? `Edit ${formData.name}` : 'Register New Temple'}
      subtitle="Complete sacred sanctum details, trust labels, booking mode, and accessibility"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <Link
            to="/admin/temples"
            className="inline-flex items-center text-xs font-semibold text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Back to Temples</span>
          </Link>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D4AF37]/30 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Trust Label & Booking Governance Card */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-4">
              <h3 className="font-serif font-bold text-sm text-[#6B1D2F] flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1.5 text-[#E65100]" />
                <span>Trust Label & Booking Authority Governance</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Trust Status Label *
                  </label>
                  <select
                    name="trustLabel"
                    value={formData.trustLabel}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100] bg-white cursor-pointer font-semibold text-[#6B1D2F]"
                  >
                    {TRUST_LABELS.map((label) => (
                      <option key={label} value={label}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Booking System Mode *
                  </label>
                  <select
                    name="bookingMode"
                    value={formData.bookingMode}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100] bg-white cursor-pointer"
                  >
                    {BOOKING_MODES.map((mode) => (
                      <option key={mode.value} value={mode.value}>
                        {mode.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Official Shrine Website URL
                  </label>
                  <input
                    type="url"
                    name="officialUrl"
                    value={formData.officialUrl}
                    onChange={handleChange}
                    placeholder="https://tirupatibalaji.ap.gov.in"
                    className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100]"
                  />
                  <p className="text-[10px] text-gray-500 mt-0.5">Used for Link-Out mode & devotee verification verification</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Last Editorial Reviewed Date
                  </label>
                  <input
                    type="date"
                    name="lastReviewedDate"
                    value={formData.lastReviewedDate}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100]"
                  />
                </div>
              </div>
            </div>

            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Temple Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Sri Venkateswara Swamy Temple"
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Main Deity *
                </label>
                <input
                  type="text"
                  name="deity"
                  value={formData.deity}
                  onChange={handleChange}
                  placeholder="e.g. Lord Venkateswara"
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Tradition Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100] bg-white cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Operating Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100] bg-white cursor-pointer"
                >
                  <option value="active">Active (Visible to Devotees)</option>
                  <option value="inactive">Inactive (Hidden / Suspended)</option>
                </select>
              </div>
            </div>

            {/* Location & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Tirumala"
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100]"
                  required
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="e.g. Andhra Pradesh"
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100]"
                  required
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Starting Price (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  name="startingPrice"
                  value={formData.startingPrice}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100]"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Full Physical Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g. S Mada St, Tirumala, Tirupati, Andhra Pradesh 517504"
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100]"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Temple History & Sanctum Description
              </label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Sacred history, religious significance, deity manifestation..."
                className="w-full p-3 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100]"
                required
              ></textarea>
            </div>

            {/* Accessibility & Crowd Advisory */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Accessibility Notes (Wheelchair, Elderly)
                </label>
                <input
                  type="text"
                  name="accessibilityNotes"
                  value={formData.accessibilityNotes}
                  onChange={handleChange}
                  placeholder="e.g. Wheelchair ramps available, elderly queue line"
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Crowd & Queue Advisory
                </label>
                <input
                  type="text"
                  name="crowdLevelInfo"
                  value={formData.crowdLevelInfo}
                  onChange={handleChange}
                  placeholder="e.g. Moderate crowd (40-60 mins waiting)"
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100]"
                />
              </div>
            </div>

            {/* Visiting Timings, Prasad & Season */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Best Season to Visit
                </label>
                <input
                  type="text"
                  name="bestTimeToVisit"
                  value={formData.bestTimeToVisit}
                  onChange={handleChange}
                  placeholder="e.g. October to March"
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Prasadam / Annadanam Timings
                </label>
                <input
                  type="text"
                  name="prasadTimings"
                  value={formData.prasadTimings}
                  onChange={handleChange}
                  placeholder="e.g. 09:00 AM - 08:30 PM"
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100]"
                />
              </div>
            </div>

            {/* Photographs URLs */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Photographs URLs (Comma-separated)
              </label>
              <textarea
                name="images"
                rows="2"
                value={formData.images}
                onChange={handleChange}
                placeholder="https://example.com/photo1.jpg, https://example.com/photo2.jpg"
                className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100]"
              ></textarea>
            </div>

            {/* Operating Timings & Guidelines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Opening Hours
                </label>
                <input
                  type="text"
                  name="openingHours"
                  value={formData.openingHours}
                  onChange={handleChange}
                  placeholder="e.g. 06:00 AM - 11:00 PM"
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Dress Code & Guidelines
                </label>
                <input
                  type="text"
                  name="guidelines"
                  value={formData.guidelines}
                  onChange={handleChange}
                  placeholder="e.g. Traditional attire mandatory. Mobile phones restricted."
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100]"
                />
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Helpline Phone
                </label>
                <input
                  type="text"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Helpdesk Email
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Contact Website
                </label>
                <input
                  type="url"
                  name="contactWebsite"
                  value={formData.contactWebsite}
                  onChange={handleChange}
                  placeholder="https://temple.org"
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#E65100]"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex items-center space-x-6 pt-2">
              <label className="flex items-center space-x-2 text-xs font-semibold text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="isPopular"
                  checked={formData.isPopular}
                  onChange={handleChange}
                  className="rounded text-[#E65100] focus:ring-[#E65100]"
                />
                <span>Highlight as Popular Shrine</span>
              </label>

              <label className="flex items-center space-x-2 text-xs font-semibold text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="isVerified"
                  checked={formData.isVerified}
                  onChange={handleChange}
                  className="rounded text-emerald-600 focus:ring-emerald-600"
                />
                <span>Display "Verified Official Info" Badge</span>
              </label>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-end space-x-3">
              <Link
                to="/admin/temples"
                className="px-5 py-2.5 rounded-full border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={submitting}
                className="px-7 py-2.5 rounded-full bg-[#E65100] hover:bg-[#BF360C] text-white text-xs font-bold shadow-md disabled:opacity-50 flex items-center"
              >
                <Save className="w-4 h-4 mr-1.5" />
                <span>{submitting ? 'Saving...' : isEditMode ? 'Update Temple' : 'Create Temple'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTempleForm;
