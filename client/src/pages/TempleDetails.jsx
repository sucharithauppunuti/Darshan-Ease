import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
  MapPin,
  Clock,
  ShieldCheck,
  Phone,
  Mail,
  Globe,
  Sparkles,
  Ticket,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  X,
  Calendar,
  Info,
  CheckCircle2,
  Users,
  AlertCircle,
  Eye
} from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80';

const TempleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [temple, setTemple] = useState(null);
  const [darshanTypes, setDarshanTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imageFitMode, setImageFitMode] = useState('contain'); // 'contain' shows 100% of the image without any cropping
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTempleDetails();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchTempleDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosClient.get(`/temples/${id}`);
      if (res.data.success) {
        setTemple(res.data.temple);
        setDarshanTypes(res.data.darshanTypes || []);
        setActiveImageIndex(0);

        // Record in recently explored shrines for user dashboard
        try {
          const stored = localStorage.getItem('darshanease_recent_temples');
          const list = stored ? JSON.parse(stored) : [];
          const filtered = list.filter((t) => t._id !== res.data.temple._id);
          const updated = [res.data.temple, ...filtered].slice(0, 8);
          localStorage.setItem('darshanease_recent_temples', JSON.stringify(updated));
        } catch (e) {
          // ignore
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load temple details');
    } finally {
      setLoading(false);
    }
  };

  const imagesList = temple?.images && temple.images.length > 0
    ? temple.images
    : [FALLBACK_IMAGE];

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner text="Retrieving holy sanctum information, authentic gallery & darshan ticket options..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !temple) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
        <Navbar />
        <div className="flex-1 max-w-xl mx-auto px-4 py-20 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-[#6B1D2F]">Temple Not Found</h2>
          <p className="text-sm text-gray-600 mt-2">{error || 'The requested temple could not be located.'}</p>
          <Link
            to="/temples"
            className="mt-6 inline-flex items-center px-6 py-2.5 rounded-full bg-[#E65100] text-white text-xs font-bold shadow-md hover:bg-[#BF360C]"
          >
            ← Back to All Temples
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans text-[#1A1815]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-[#8D8070] mb-6">
          <Link to="/" className="hover:text-[#E65100]">Home</Link>
          <span>/</span>
          <Link to="/temples" className="hover:text-[#E65100]">Temples</Link>
          <span>/</span>
          <span className="text-[#6B1D2F] font-semibold truncate max-w-xs">{temple.name}</span>
        </nav>

        {/* 1. Header Banner & Title Block */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/30 shadow-md mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#E65100]/10 text-[#E65100] border border-[#E65100]/25">
                <Sparkles className="w-3.5 h-3.5 mr-1 text-[#D4AF37]" />
                {temple.category || 'Sacred Shrine'}
              </span>

              {temple.isVerified && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  Verified Information
                </span>
              )}

              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
                Main Deity: {temple.deity}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#6B1D2F] tracking-tight">
              {temple.name}
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-[#8D8070] flex items-center">
              <MapPin className="w-4 h-4 mr-1 text-[#E65100] shrink-0" />
              <span>{temple.address}, {temple.city}, {temple.state}</span>
            </p>
          </div>

          {/* Quick Book CTA Button */}
          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2">
            <Link
              to={`/book/${temple._id}${darshanTypes.length > 0 ? `?darshanTypeId=${darshanTypes[0]._id}` : ''}`}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF6F00] to-[#E65100] hover:from-[#E65100] hover:to-[#BF360C] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 text-center"
            >
              <Ticket className="w-4 h-4" />
              <span>Book Darshan Now</span>
            </Link>
            <p className="text-[11px] text-[#8D8070] text-center italic">
              {darshanTypes.length} Ticket Option(s) Configured
            </p>
          </div>
        </div>

        {/* 2. Main Visual Gallery & Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Left / Center Columns (2 Cols): Photos & Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Authentic Photographic Gallery Feature Card */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#D4AF37]/35 shadow-md">
              {/* Photo Stage (Generous Height with Ambient Sacred Glow & Uncropped Fit Mode) */}
              <div className="relative min-h-[420px] sm:min-h-[500px] md:min-h-[560px] max-h-[600px] w-full overflow-hidden bg-stone-950 flex items-center justify-center group">
                
                {/* Ambient Blurred Backdrop for seamless sacred reflection on non-16:9 images */}
                <div
                  className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-50 scale-125 pointer-events-none transition-all duration-700"
                  style={{ backgroundImage: `url(${imagesList[activeImageIndex]})` }}
                />

                {/* Primary Sacred Temple/Deity Photo */}
                <img
                  src={imagesList[activeImageIndex]}
                  alt={`${temple.name} - View ${activeImageIndex + 1}`}
                  className={`relative z-10 w-full h-full max-h-[560px] ${
                    imageFitMode === 'contain' ? 'object-contain' : 'object-cover object-center'
                  } transition-all duration-500`}
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />

                {/* Top Action Bar: Fit Toggle Mode & Fullscreen Enlarge */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageFitMode((m) => (m === 'cover' ? 'contain' : 'cover'));
                    }}
                    className="px-3 py-1.5 rounded-xl bg-black/65 hover:bg-[#6B1D2F] text-amber-200 text-xs font-bold backdrop-blur-md border border-white/25 transition-all shadow-md flex items-center space-x-1.5 cursor-pointer"
                    title={imageFitMode === 'contain' ? 'Switch to Fill Frame (Cover)' : 'Switch to Uncropped Full Photo (Fit)'}
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-300" />
                    <span>{imageFitMode === 'contain' ? 'Show Full Photo (Uncropped)' : 'Fill Frame (Crop)'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    className="p-2.5 rounded-xl bg-black/65 hover:bg-[#E65100] text-white text-xs backdrop-blur-md border border-white/25 transition-all shadow-md flex items-center space-x-1 cursor-pointer"
                    title="Expand Fullscreen View"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span className="font-semibold hidden sm:inline">Fullscreen</span>
                  </button>
                </div>

                {/* Prev / Next Nav Arrows */}
                {imagesList.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-[#E65100] text-white backdrop-blur-md flex items-center justify-center transition-all opacity-85 hover:opacity-100 shadow-xl hover:scale-110 cursor-pointer"
                      title="Previous sacred photo"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                      type="button"
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-[#E65100] text-white backdrop-blur-md flex items-center justify-center transition-all opacity-85 hover:opacity-100 shadow-xl hover:scale-110 cursor-pointer"
                      title="Next sacred photo"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Bottom Overlay Info (Only bottom scrim, not darkening whole photo) */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-10 flex items-end justify-between p-4 sm:p-6 text-white">
                  <div>
                    <p className="text-base sm:text-lg font-serif font-bold drop-shadow-md text-amber-100">
                      {temple.name}
                    </p>
                    <p className="text-xs text-gray-200 drop-shadow">
                      {temple.city}, {temple.state} • Main Deity: {temple.deity}
                    </p>
                  </div>
                  {imagesList.length > 1 && (
                    <span className="text-xs bg-black/60 px-3 py-1 rounded-full border border-white/20 backdrop-blur-md font-semibold text-gray-200">
                      Photo {activeImageIndex + 1} of {imagesList.length}
                    </span>
                  )}
                </div>
              </div>

              {/* Clickable Multi-Photo Thumbnail Bar */}
              {imagesList.length > 1 && (
                <div className="p-3 bg-[#FAF7F0] border-t border-[#D4AF37]/25 flex items-center justify-between gap-3 overflow-x-auto">
                  <span className="text-[11px] font-bold text-[#6B1D2F] uppercase tracking-wider shrink-0 flex items-center">
                    <Sparkles className="w-3.5 h-3.5 mr-1 text-[#E65100]" />
                    <span>Sacred Photo Views:</span>
                  </span>

                  <div className="flex items-center space-x-2 overflow-x-auto py-1">
                    {imagesList.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-16 h-12 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                          activeImageIndex === idx
                            ? 'border-[#E65100] ring-2 ring-[#E65100]/40 scale-105 shadow-md'
                            : 'border-gray-200 opacity-70 hover:opacity-100 hover:border-[#D4AF37]'
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`View ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = FALLBACK_IMAGE;
                          }}
                        />
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    className="text-xs font-bold text-[#E65100] hover:underline shrink-0 hidden sm:inline cursor-pointer"
                  >
                    View Fullscreen →
                  </button>
                </div>
              )}
            </div>

            {/* Detailed Description and Religious Significance */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/30 shadow-md space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#6B1D2F] border-b border-gray-100 pb-3">
                Religious Significance & History
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed font-light whitespace-pre-line">
                {temple.description}
              </p>
            </div>

            {/* Visitor Guidelines, Dress Code & Protocols */}
            <div className="bg-[#FFF9F0] p-6 sm:p-8 rounded-3xl border border-[#F3C644]/60 shadow-md space-y-4">
              <div className="flex items-center space-x-2 text-[#E65100]">
                <Info className="w-5 h-5 shrink-0" />
                <h3 className="font-serif text-xl font-bold">
                  Visitor Guidelines & Dress Code
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-light">
                {temple.guidelines}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-white/90 p-4 rounded-2xl border border-amber-200/70">
                  <strong className="text-gray-900 block mb-1">Identification Rule</strong>
                  <p className="text-gray-600">All devotees must carry government photo identification (Aadhaar, Passport, Voter ID) matching booking details.</p>
                </div>
                <div className="bg-white/90 p-4 rounded-2xl border border-amber-200/70">
                  <strong className="text-gray-900 block mb-1">Footwear & Luggage</strong>
                  <p className="text-gray-600">{temple.visitingInfo?.footwearPolicy || 'Secure footwear counters available at temple entrance complex.'}</p>
                </div>
              </div>
            </div>

            {/* 3. Temple-Specific Darshan Ticket Options Section */}
            <div id="darshan-options" className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/30 shadow-md space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
                <div>
                  <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#E65100] uppercase tracking-wider mb-0.5">
                    <Ticket className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Configured Ticket Types</span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-[#6B1D2F]">
                    Darshan Tickets for {temple.name}
                  </h2>
                  <p className="text-xs text-[#8D8070]">
                    Each temple has its own specific darshan categories, prices, and rules.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#E65100] bg-[#FF6F00]/10 px-3 py-1 rounded-full border border-[#E65100]/20 shrink-0">
                  {darshanTypes.length} Available Option{darshanTypes.length === 1 ? '' : 's'}
                </span>
              </div>

              {darshanTypes.length === 0 ? (
                <div className="text-center py-12 bg-[#FDFBF7] rounded-2xl border border-dashed border-gray-300 p-6">
                  <p className="text-sm font-semibold text-gray-700">General Darshan operates freely during open sanctum hours.</p>
                  <p className="text-xs text-gray-500 mt-1">Special slot reservations can be checked via administration.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {darshanTypes.map((type) => {
                    const price = type.pricePerPerson !== undefined ? type.pricePerPerson : type.chargePerDevotee || 0;
                    const isFree = price === 0;

                    return (
                      <div
                        key={type._id}
                        className="p-6 rounded-2xl border-2 border-gray-200 hover:border-[#D4AF37] hover:bg-[#FDFBF7] transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group shadow-xs"
                      >
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-serif font-bold text-lg text-gray-900 group-hover:text-[#6B1D2F] transition-colors">
                              {type.name}
                            </h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              isFree ? 'bg-emerald-100 text-emerald-800' : 'bg-[#E65100]/10 text-[#E65100] border border-[#E65100]/25'
                            }`}>
                              {isFree ? 'Free Darshan (₹0)' : `₹${price} / devotee`}
                            </span>
                            {type.duration && (
                              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-stone-100 text-stone-600">
                                ⏱️ {type.duration}
                              </span>
                            )}
                          </div>

                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                            {type.description}
                          </p>

                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#8D8070] pt-1">
                            {type.dressCode && (
                              <span><strong>Dress Code:</strong> {type.dressCode}</span>
                            )}
                            {type.eligibility && (
                              <span><strong>Eligibility:</strong> {type.eligibility}</span>
                            )}
                          </div>

                          {type.reportingNotice && (
                            <p className="text-[11px] text-amber-800 bg-amber-50/80 px-2.5 py-1 rounded-lg inline-block border border-amber-200/50">
                              ℹ️ {type.reportingNotice}
                            </p>
                          )}
                        </div>

                        {/* Select Ticket / Book This Darshan CTA */}
                        <div className="shrink-0 w-full md:w-auto">
                          <Link
                            to={`/book/${temple._id}?darshanTypeId=${type._id}`}
                            className="w-full md:w-auto px-6 py-3 rounded-full text-xs font-bold bg-[#E65100] hover:bg-[#BF360C] text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-1.5"
                          >
                            <Ticket className="w-4 h-4 mr-1" />
                            <span>Book This Darshan</span>
                            <ChevronRight className="w-3.5 h-3.5 ml-1" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

          {/* Right Column (1 Col): Quick Essentials & Contact Info */}
          <div className="space-y-6">
            
            {/* Quick Fact Box */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#D4AF37]/35 shadow-md space-y-5">
              <h3 className="font-serif text-xl font-bold text-[#6B1D2F] pb-3 border-b border-gray-100 flex items-center">
                <Sparkles className="w-4 h-4 text-[#D4AF37] mr-2" />
                <span>Sanctum Essentials</span>
              </h3>

              {/* Verified Morning & Evening Hours */}
              <div className="flex items-start space-x-3 text-xs">
                <Clock className="w-5 h-5 text-[#E65100] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900">Darshan & Aarti Timings</p>
                  <p className="text-gray-600 mt-1 leading-relaxed">
                    {temple.openingHours || '06:00 AM - 09:00 PM'}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-3 text-xs">
                <MapPin className="w-5 h-5 text-[#E65100] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900">Temple Address</p>
                  <p className="text-gray-600 mt-1 leading-relaxed">{temple.address}</p>
                </div>
              </div>

              {/* Best Season */}
              {temple.visitingInfo?.bestTimeToVisit && (
                <div className="flex items-start space-x-3 text-xs">
                  <Calendar className="w-5 h-5 text-[#E65100] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-900">Best Season to Visit</p>
                    <p className="text-gray-600 mt-1">{temple.visitingInfo.bestTimeToVisit}</p>
                  </div>
                </div>
              )}

              {/* Senior Citizen Accessibility */}
              {temple.accessibilityNotes && (
                <div className="flex items-start space-x-3 text-xs">
                  <Users className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-900">Senior Citizens & Accessibility</p>
                    <p className="text-gray-600 mt-1 leading-relaxed">{temple.accessibilityNotes}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Official Shrine Contact & Source Verification */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#D4AF37]/30 shadow-md space-y-4 text-xs">
              <h4 className="font-serif text-lg font-bold text-[#6B1D2F] pb-2 border-b border-gray-100">
                Official Temple Contact
              </h4>

              {temple.contactInfo?.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span className="text-gray-700">{temple.contactInfo.phone}</span>
                </div>
              )}

              {temple.contactInfo?.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span className="text-gray-700">{temple.contactInfo.email}</span>
                </div>
              )}

              {temple.contactInfo?.website && (
                <div className="flex items-center space-x-3">
                  <Globe className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <a
                    href={temple.contactInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E65100] font-semibold hover:underline truncate"
                  >
                    Official Shrine Website ↗
                  </a>
                </div>
              )}

              <div className="pt-3 border-t border-gray-100 text-[11px] text-[#8D8070] space-y-1">
                <p>
                  <strong>Verified Source:</strong> {temple.sourceVerification?.sourceName || 'Official Shrine Administration Board'}
                </p>
                <p className="italic text-[10px] text-gray-500">
                  Information and darshan options synchronized with recent shrine board notifications.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Fullscreen Photo Lightbox Modal */}
        {isLightboxOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Modal Top Header */}
            <div
              className="w-full max-w-5xl flex items-center justify-between text-white pb-3 border-b border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-amber-200">
                  {temple.name}
                </h3>
                <p className="text-xs text-gray-300">
                  {temple.city}, {temple.state} • Main Deity: {temple.deity}
                  {imagesList.length > 1 && ` • Photo ${activeImageIndex + 1} of ${imagesList.length}`}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setImageFitMode((m) => (m === 'cover' ? 'contain' : 'cover'))}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 mr-1" />
                  <span>{imageFitMode === 'contain' ? 'Full View (Fit)' : 'Fill View (Cover)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-red-600 text-white transition-colors cursor-pointer"
                  title="Close viewer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Image Main Stage */}
            <div
              className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={imagesList[activeImageIndex]}
                alt={`${temple.name} Fullscreen View`}
                className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/15"
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
              />

              {/* Prev / Next Modal Arrows */}
              {imagesList.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-[#E65100] text-white flex items-center justify-center transition-all shadow-xl border border-white/20 cursor-pointer"
                    title="Previous photo"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-[#E65100] text-white flex items-center justify-center transition-all shadow-xl border border-white/20 cursor-pointer"
                    title="Next photo"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Modal Bottom Thumbnail Bar */}
            {imagesList.length > 1 && (
              <div
                className="w-full max-w-5xl flex items-center justify-center gap-2 overflow-x-auto pt-2"
                onClick={(e) => e.stopPropagation()}
              >
                {imagesList.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-12 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-amber-400 ring-2 ring-amber-400/50 scale-105'
                        : 'border-white/30 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumb ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default TempleDetails;
