import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroBanner from '../components/home/HeroBanner';
import CategoryFilters from '../components/home/CategoryFilters';
import TempleCard from '../components/home/TempleCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
  ArrowRight,
  Compass,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Scroll,
  ShieldCheck,
  CalendarCheck,
  Clock,
  Ticket,
  Flame,
  History
} from 'lucide-react';

const Home = () => {
  const [temples, setTemples] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' (default for desktop visibility) or 'scroll'
  
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedTemples();
    loadRecentlyViewed();
  }, [selectedCategory]);

  const loadRecentlyViewed = () => {
    try {
      const stored = localStorage.getItem('darshanease_recent_temples');
      if (stored) {
        setRecentlyViewed(JSON.parse(stored).slice(0, 4));
      }
    } catch (e) {
      console.warn('Could not load recently viewed temples:', e);
    }
  };

  const fetchFeaturedTemples = async () => {
    try {
      setLoading(true);
      const params = { limit: 50 };
      if (selectedCategory && selectedCategory !== 'All') {
        params.category = selectedCategory;
      }
      const res = await axiosClient.get('/temples', { params });
      if (res.data.success) {
        setTemples(res.data.temples || []);
      }
    } catch (err) {
      console.error('Error fetching featured temples:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleHeroSearch = ({ search }) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    navigate(`/temples?${params.toString()}`);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F0E4] temple-dashboard-bg flex flex-col font-sans text-[#1A1815]">
      {/* 1. Header with DarshanEase logo, Home, Explore Temples, My Bookings, notifications & profile */}
      <Navbar />

      <main className="flex-1 pb-12">
        {/* 2. Hero Section with Cinematic Temple Architecture, Headline, Search & Explore CTA */}
        <HeroBanner onSearch={handleHeroSearch} />

        {/* 3. Sacred Category Filter Chips */}
        <CategoryFilters
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* 4. Featured & Popular Temples Across India — Brought higher up for immediate visibility */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-2 mb-8 sm:mb-10">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#C5A15B]/30 gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#E87519] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A15B]" />
                <span>Sacred Shrines & Sanctums</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#321B1D]">
                Popular Temples Across India
              </h2>
              <p className="text-xs sm:text-sm text-[#7D7060] mt-1">
                Explore holy shrines, check real-time slot capacities, and book authentic darshan passes.
              </p>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
              {/* Grid / Carousel View Switcher */}
              <div className="flex items-center bg-white border border-[#C5A15B]/40 rounded-xl p-1 shadow-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-[#E87519] text-white shadow-xs'
                      : 'text-[#321B1D] hover:text-[#E87519] hover:bg-[#F7F0E4]'
                  }`}
                  title="Grid View (All Temples)"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Grid</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('scroll')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                    viewMode === 'scroll'
                      ? 'bg-[#E87519] text-white shadow-xs'
                      : 'text-[#321B1D] hover:text-[#E87519] hover:bg-[#F7F0E4]'
                  }`}
                  title="Carousel Sidescroll View"
                >
                  <Scroll className="w-3.5 h-3.5" />
                  <span>Carousel</span>
                </button>
              </div>

              {/* View All Temples Link */}
              <Link
                to="/temples"
                className="inline-flex items-center px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#321B1D] hover:text-[#E87519] bg-white border border-[#C5A15B]/40 hover:border-[#E87519]/60 shadow-xs hover:shadow-sm transition-all group shrink-0"
              >
                <span>View All Temples ({temples.length})</span>
                <ArrowRight className="w-4 h-4 ml-1.5 text-[#E87519] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Cards Content */}
          {loading ? (
            <div className="py-20">
              <LoadingSpinner text="Retrieving holy temples and darshan timings..." />
            </div>
          ) : temples.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#C5A15B]/30 my-8 p-6 shadow-xs">
              <Compass className="w-12 h-12 text-[#C5A15B] mx-auto mb-3 opacity-60" />
              <p className="font-serif text-lg text-[#321B1D] font-bold">No temples found in this category</p>
              <p className="text-xs text-[#7D7060] mt-1">Please try another sacred category or reset filter</p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold bg-[#E87519] hover:bg-[#D4630A] text-white transition-colors cursor-pointer"
              >
                Reset to All Temples
              </button>
            </div>
          ) : viewMode === 'scroll' ? (
            /* Carousel View with Visual Nav Buttons */
            <div className="relative mt-6 group/scroll">
              <button
                onClick={scrollLeft}
                className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white text-[#321B1D] border-2 border-[#C5A15B]/50 shadow-xl items-center justify-center hover:bg-[#E87519] hover:text-white transition-all hover:scale-110 focus:outline-none cursor-pointer"
                aria-label="Scroll temples left"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={scrollRight}
                className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white text-[#321B1D] border-2 border-[#C5A15B]/50 shadow-xl items-center justify-center hover:bg-[#E87519] hover:text-white transition-all hover:scale-110 focus:outline-none cursor-pointer"
                aria-label="Scroll temples right"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div
                ref={scrollContainerRef}
                className="flex items-stretch gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#E87519 #F7F0E4'
                }}
              >
                {temples.map((temple) => (
                  <div
                    key={temple._id}
                    className="w-[280px] sm:w-[320px] md:w-[350px] shrink-0 snap-start flex flex-col"
                  >
                    <TempleCard temple={temple} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Desktop Widened Grid View */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
              {temples.map((temple) => (
                <TempleCard key={temple._id} temple={temple} />
              ))}
            </div>
          )}
        </section>

        {/* 5. Recently Viewed Temples (if user previously explored temples) */}
        {recentlyViewed.length > 0 && selectedCategory === 'All' && (
          <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-2 mb-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#C5A15B]/30 mb-4">
              <div className="flex items-center space-x-2">
                <History className="w-4 h-4 text-[#E87519]" />
                <h3 className="font-serif font-bold text-lg text-[#321B1D]">
                  Recently Explored Shrines
                </h3>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('darshanease_recent_temples');
                  setRecentlyViewed([]);
                }}
                className="text-xs text-[#7D7060] hover:text-[#E87519] cursor-pointer"
              >
                Clear History
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentlyViewed.map((temple) => (
                <TempleCard key={temple._id} temple={temple} />
              ))}
            </div>
          </section>
        )}

        {/* 6. Concise Booking Guidance Section */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-10 mb-10">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#C5A15B]/35 shadow-sm">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-[#E87519] uppercase tracking-wider">
                Transparent & Reliable Pilgrimage
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#321B1D] mt-1">
                Concise Darshan Booking Guidance
              </h2>
              <p className="text-xs sm:text-sm text-[#7D7060] mt-1.5">
                Simple 3-step process to secure your authentic temple visit
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#F7F0E4]/60 border border-[#C5A15B]/30 relative">
                <div className="w-14 h-14 rounded-2xl bg-[#321B1D] text-[#E2C889] flex items-center justify-center font-serif font-black text-xl shadow-md mb-4 border border-[#C5A15B]/40">
                  1
                </div>
                <h3 className="font-serif font-bold text-base text-[#321B1D]">
                  Select Sacred Temple
                </h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Browse India's revered Jyotirlingas, Shakti Peethas, and sacred shrines with verified visiting guidelines and dress codes.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#F7F0E4]/60 border border-[#C5A15B]/30 relative">
                <div className="w-14 h-14 rounded-2xl bg-[#E87519] text-white flex items-center justify-center font-serif font-black text-xl shadow-md mb-4">
                  2
                </div>
                <h3 className="font-serif font-bold text-base text-[#321B1D]">
                  Choose Date & Live Slot
                </h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Select your preferred visit date and sanctum time slot. Live capacity tracking guarantees your seat without overbooking.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#F7F0E4]/60 border border-[#C5A15B]/30 relative">
                <div className="w-14 h-14 rounded-2xl bg-[#321B1D] text-[#E87519] flex items-center justify-center font-serif font-black text-xl shadow-md mb-4 border border-[#C5A15B]/40">
                  3
                </div>
                <h3 className="font-serif font-bold text-base text-[#321B1D]">
                  Receive Digital E-Pass
                </h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Complete secure Razorpay payment or free confirmation. Present your digital darshan pass directly on your phone at the temple gate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Devotee Trust & Sanctum Integrity Banner */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 mb-8">
          <div className="rounded-3xl bg-gradient-to-r from-[#321B1D] via-[#4A1A1E] to-[#231214] p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-[#C5A15B]/40">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#C5A15B]/25 text-[#E2C889] text-xs font-bold uppercase tracking-wider mb-4 border border-[#E2C889]/40">
                <ShieldCheck className="w-4 h-4" />
                <span>Devotee Trust & Sanctum Integrity</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
                Authentic Darshan Experience Across Sacred India
              </h2>

              <p className="mt-3 text-xs sm:text-base text-amber-100/90 font-light leading-relaxed">
                Direct slot reservation, authentic temple guidelines, transparent ticket tariffs, and hassle-free devotee e-passes.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <Clock className="w-5 h-5 text-[#E2C889] mb-2" />
                  <h4 className="font-bold text-sm text-white">Verified Timings</h4>
                  <p className="text-xs text-amber-100/80 mt-1">Authentic morning and evening sanctum aarti schedules.</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <Ticket className="w-5 h-5 text-[#E2C889] mb-2" />
                  <h4 className="font-bold text-sm text-white">Transparent Tariffs</h4>
                  <p className="text-xs text-amber-100/80 mt-1">Free general entries and official special seva passes.</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <CalendarCheck className="w-5 h-5 text-[#E2C889] mb-2" />
                  <h4 className="font-bold text-sm text-white">Guaranteed Slots</h4>
                  <p className="text-xs text-amber-100/80 mt-1">Atomic capacity tracking prevents overbooking.</p>
                </div>
              </div>
            </div>

            {/* Sacred Background Geometry */}
            <div className="absolute -right-10 -bottom-10 w-96 h-96 rounded-full bg-white/5 blur-2xl pointer-events-none"></div>
          </div>
        </section>

      </main>

      {/* 9. Elegant Devotional Footer */}
      <Footer />
    </div>
  );
};

export default Home;
