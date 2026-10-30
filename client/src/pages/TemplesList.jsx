import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import TempleCard from '../components/home/TempleCard';
import {
  Search,
  MapPin,
  Filter,
  RotateCcw,
  Compass,
  SlidersHorizontal,
  Sparkles,
  Ticket,
  ChevronDown
} from 'lucide-react';

const INDIAN_STATES = [
  'All States',
  'Andhra Pradesh',
  'Assam',
  'Bihar',
  'Gujarat',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
];

const CATEGORIES = [
  { value: 'All', label: 'All Categories' },
  { value: 'Jyotirlinga', label: 'Jyotirlingas' },
  { value: 'Shakti Peeth', label: 'Shakti Peethas' },
  { value: 'Vaishnava', label: 'Vaishnava Temples' },
  { value: 'Ganesh', label: 'Lord Ganesha Temples' },
  { value: 'Other Deities', label: 'Other Temples' }
];

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'name_asc', label: 'Temple Name (A - Z)' },
  { value: 'name_desc', label: 'Temple Name (Z - A)' },
  { value: 'price_asc', label: 'Ticket Price: Low to High' },
  { value: 'price_desc', label: 'Ticket Price: High to Low' }
];

const TemplesList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Filters state
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedState, setSelectedState] = useState(searchParams.get('state') || 'All States');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [priceType, setPriceType] = useState('all'); // 'all', 'free', 'paid'
  const [sort, setSort] = useState('popular');

  useEffect(() => {
    fetchTemples();
  }, [selectedState, category, priceType, sort]);

  const fetchTemples = async (customSearch = search) => {
    try {
      setLoading(true);
      const params = {};
      if (customSearch.trim()) params.search = customSearch.trim();
      if (selectedState && selectedState !== 'All States') params.state = selectedState;
      if (category && category !== 'All') params.category = category;
      if (priceType !== 'all') params.priceType = priceType;
      if (sort) params.sort = sort;

      const res = await axiosClient.get('/temples', { params });
      if (res.data.success) {
        setTemples(res.data.temples || []);
        setTotalCount(res.data.total || res.data.temples?.length || 0);
      }
    } catch (err) {
      console.error('Error fetching temples:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchTemples(search);
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedState('All States');
    setCategory('All');
    setPriceType('all');
    setSort('popular');
    setSearchParams({});
    fetchTemples('');
  };

  return (
    <div className="min-h-screen bg-[#F7F0E4] temple-dashboard-bg flex flex-col font-sans text-[#1A1815]">
      <Navbar />

      <main className="flex-1 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 w-full">
        
        {/* Header & Title */}
        <div className="pb-6 border-b border-[#C5A15B]/30 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#E87519] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A15B]" />
                <span>Complete Sacred Directory</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#321B1D]">
                Explore Famous Temples
              </h1>
              <p className="text-xs sm:text-sm text-[#7D7060] mt-1">
                Discover sanctums across India, explore verified guidelines, and book your darshan passes.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-xs font-semibold text-[#7D7060] bg-white px-3.5 py-1.5 rounded-full border border-[#C5A15B]/35 shadow-xs">
                {loading ? 'Finding shrines...' : `${temples.length} Temple${temples.length === 1 ? '' : 's'} Available`}
              </span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#D4AF37]/30 shadow-md mb-8">
          
          {/* Main Search Input */}
          <form onSubmit={handleSearchSubmit} className="mb-5">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search temple by name, deity, or city (e.g. Tirupati, Varanasi, Shiva)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#E65100] focus:ring-2 focus:ring-[#E65100]/20 bg-[#FDFBF7]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* <button
                  type="submit"
                  className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl bg-[#E65100] hover:bg-[#BF360C] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-1.5"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button> */}

                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-3 rounded-2xl border border-gray-200 text-stone-600 hover:text-[#6B1D2F] hover:bg-[#FDFBF7] text-xs font-semibold flex items-center justify-center space-x-1 transition-colors"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>
            </div>
          </form>

          {/* Filter Dropdowns Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-100 text-xs">
            
            {/* 1. State Filter */}
            <div>
              <label className="block text-[11px] font-bold text-[#6B1D2F] uppercase tracking-wider mb-1.5">
                Filter by State
              </label>
              <div className="relative">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-[#FDFBF7] text-gray-800 font-medium focus:outline-none focus:border-[#E65100] appearance-none"
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* 2. Category Filter */}
            <div>
              <label className="block text-[11px] font-bold text-[#6B1D2F] uppercase tracking-wider mb-1.5">
                Deity Category
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-[#FDFBF7] text-gray-800 font-medium focus:outline-none focus:border-[#E65100] appearance-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* 3. Free vs Paid Darshan Filter */}
            <div>
              <label className="block text-[11px] font-bold text-[#6B1D2F] uppercase tracking-wider mb-1.5">
                Ticket Type
              </label>
              <div className="relative">
                <select
                  value={priceType}
                  onChange={(e) => setPriceType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-[#FDFBF7] text-gray-800 font-medium focus:outline-none focus:border-[#E65100] appearance-none"
                >
                  <option value="all">All Darshan Passes</option>
                  <option value="free">Free Darshan (₹0)</option>
                  <option value="paid">Special Paid Entry</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* 4. Sort Options */}
            <div>
              <label className="block text-[11px] font-bold text-[#6B1D2F] uppercase tracking-wider mb-1.5">
                Sort Temples
              </label>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-[#FDFBF7] text-gray-800 font-medium focus:outline-none focus:border-[#E65100] appearance-none"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

          </div>
        </div>

        {/* Temple Cards Grid or Skeleton Loader */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm animate-pulse">
                <div className="aspect-[4/3] bg-stone-200"></div>
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-stone-200 rounded-md w-3/4"></div>
                  <div className="h-3 bg-stone-100 rounded-md w-1/2"></div>
                  <div className="h-10 bg-stone-100 rounded-md"></div>
                  <div className="pt-3 border-t border-gray-100 flex justify-between">
                    <div className="h-4 bg-stone-200 rounded w-16"></div>
                    <div className="h-8 bg-stone-200 rounded-full w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : temples.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-[#D4AF37]/40 p-8 shadow-xs">
            <Compass className="w-16 h-16 text-[#D4AF37] mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-serif font-bold text-[#6B1D2F]">
              No temples match your filters
            </h3>
            <p className="text-xs sm:text-sm text-[#8D8070] mt-1 max-w-md mx-auto">
              Try adjusting your search query, selecting "All States", or resetting the category filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-5 px-6 py-2.5 rounded-full bg-[#E65100] text-white text-xs font-bold shadow-md hover:bg-[#BF360C] transition-all"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {temples.map((temple) => (
              <TempleCard key={temple._id} temple={temple} />
            ))}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default TemplesList;
