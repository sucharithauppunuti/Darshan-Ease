import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import {
  Search,
  MapPin,
  Ticket,
  ArrowRight,
  Compass,
  Clock,
  ShieldCheck
} from 'lucide-react';

const SUGGESTIONS = [
  { name: 'Sri Venkateswara Swamy Temple', city: 'Tirumala', state: 'Andhra Pradesh', deity: 'Lord Venkateswara' },
  { name: 'Kashi Vishwanath Temple', city: 'Varanasi', state: 'Uttar Pradesh', deity: 'Lord Shiva' },
  { name: 'Somnath Temple', city: 'Prabhas Patan', state: 'Gujarat', deity: 'Lord Shiva' },
  { name: 'Mahakaleshwar Jyotirlinga', city: 'Ujjain', state: 'Madhya Pradesh', deity: 'Lord Shiva' },
  { name: 'Shri Mata Vaishno Devi Temple', city: 'Katra', state: 'Jammu and Kashmir', deity: 'Goddess Vaishno Devi' },
  { name: 'Shirdi Sai Baba Temple', city: 'Shirdi', state: 'Maharashtra', deity: 'Sai Baba' },
  { name: 'Siddhivinayak Temple', city: 'Mumbai', state: 'Maharashtra', deity: 'Lord Ganesha' },
  { name: 'Jagannath Temple', city: 'Puri', state: 'Odisha', deity: 'Lord Jagannath' },
  { name: 'Meenakshi Amman Temple', city: 'Madurai', state: 'Tamil Nadu', deity: 'Goddess Meenakshi' },
  { name: 'Padmanabhaswamy Temple', city: 'Thiruvananthapuram', state: 'Kerala', deity: 'Lord Padmanabha' },
  { name: 'Kedarnath Temple', city: 'Rudraprayag', state: 'Uttarakhand', deity: 'Lord Shiva' },
  { name: 'Badrinath Temple', city: 'Chamoli', state: 'Uttarakhand', deity: 'Lord Badrinarayan' },
  { name: 'Kamakhya Temple', city: 'Guwahati', state: 'Assam', deity: 'Goddess Kamakhya' },
  { name: 'Dwarkadhish Temple', city: 'Dwarka', state: 'Gujarat', deity: 'Lord Krishna' },
  { name: 'Srisailam Mallikarjuna Temple', city: 'Srisailam', state: 'Andhra Pradesh', deity: 'Lord Shiva' },
  { name: 'Banke Bihari Temple', city: 'Vrindavan', state: 'Uttar Pradesh', deity: 'Lord Krishna' },
  { name: 'Brihadeeswarar Temple', city: 'Thanjavur', state: 'Tamil Nadu', deity: 'Lord Shiva' },
  { name: 'Golden Temple', city: 'Amritsar', state: 'Punjab', deity: 'Harmandir Sahib' },
  { name: 'Kalighat Kali Temple', city: 'Kolkata', state: 'West Bengal', deity: 'Goddess Kali' },
  { name: 'Ramanathaswamy Temple', city: 'Rameswaram', state: 'Tamil Nadu', deity: 'Lord Shiva' },
  { name: 'Shri Ram Janmabhoomi Mandir', city: 'Ayodhya', state: 'Uttar Pradesh', deity: 'Lord Rama' },
  { name: 'Kukke Shri Subrahmanya Temple', city: 'Subrahmanya', state: 'Karnataka', deity: 'Lord Subrahmanya' },
  { name: 'Jwala Ji Temple (Kangra)', city: 'Kangra', state: 'Himachal Pradesh', deity: 'Goddess Jwala Ji' },
  { name: 'Khatu Shyam Ji Temple', city: 'Sikar', state: 'Rajasthan', deity: 'Lord Khatu Shyam' },
  { name: 'Vishnupad Temple (Gaya)', city: 'Gaya', state: 'Bihar', deity: 'Lord Vishnu' },
  { name: 'Omkareshwar Jyotirlinga Temple', city: 'Khandwa', state: 'Madhya Pradesh', deity: 'Lord Shiva' },
  { name: 'Guruvayur Shri Krishna Temple', city: 'Guruvayur', state: 'Kerala', deity: 'Lord Krishna' },
  { name: 'Tripura Sundari Temple (Matabari)', city: 'Udaipur', state: 'Tripura', deity: 'Goddess Tripura Sundari' },
  { name: 'Chamundeshwari Temple (Chamundi Hill)', city: 'Mysuru', state: 'Karnataka', deity: 'Goddess Chamundeshwari' },
  { name: 'Baidyanath Jyotirlinga (Baba Dham)', city: 'Deoghar', state: 'Jharkhand', deity: 'Lord Shiva' }
];

const HeroBanner = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allSuggestions, setAllSuggestions] = useState(SUGGESTIONS);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const heroContainerRef = useRef(null);
  const videoRef = useRef(null);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  // Load live temple suggestions from API if available
  useEffect(() => {
    const fetchTemplesForSearch = async () => {
      try {
        const res = await axiosClient.get('/temples?limit=50');
        if (res.data?.success && res.data.temples?.length > 0) {
          const mapped = res.data.temples.map((t) => ({
            name: t.name,
            city: t.city,
            state: t.state,
            deity: t.deity,
            id: t._id
          }));
          setAllSuggestions(mapped);
        }
      } catch (err) {
        // Fall back to predefined SUGGESTIONS
      }
    };
    fetchTemplesForSearch();
  }, []);

  // Ensure ambient video autoplays smoothly without audio
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log('Ambient video note:', err);
        });
      }
    }
  }, []);

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const query = searchTerm.toLowerCase().trim();
      const match = allSuggestions.filter(
        item =>
          item.name.toLowerCase().includes(query) ||
          item.city.toLowerCase().includes(query) ||
          item.state.toLowerCase().includes(query) ||
          item.deity.toLowerCase().includes(query)
      );
      setFilteredSuggestions(match);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, allSuggestions]);

  // Click outside listener for suggestions dropdown
  useEffect(() => {
    const handleOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (onSearch) {
      onSearch({ search: searchTerm });
    } else {
      navigate(`/temples?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleSelectSuggestion = (item) => {
    setSearchTerm(item.name);
    setShowSuggestions(false);
    if (item.id) {
      navigate(`/temples/${item.id}`);
    } else {
      navigate(`/temples?search=${encodeURIComponent(item.name)}`);
    }
  };

  return (
    <section ref={heroContainerRef} className="w-full">
      {/* 1. Cinematic Vivid Temple Background Video Banner (Inspired by reference screenshot) */}
      <div className="relative overflow-hidden rounded-3xl mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12 mt-3">
        <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-[#1A0E10] border border-[#C5A15B]/40 min-h-[420px] sm:min-h-[480px] md:min-h-[520px] flex flex-col justify-end">
          
          {/* Authentic Temple Entrance Video — Vivid & clearly visible without heavy dark overlays */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              defaultMuted
              playsInline
              preload="auto"
              poster="/assets/temple-intro-poster.jpg"
              className="w-full h-full object-cover object-center scale-100 pointer-events-none opacity-95 transition-opacity duration-1000"
            >
              <source src="/assets/temple-intro.mp4" type="video/mp4" />
              <source src="/videos/temple-hero.mp4" type="video/mp4" />
              <img
                src="/assets/temple-intro-poster.jpg"
                alt="Sacred Indian Temple Architecture"
                className="w-full h-full object-cover object-center opacity-95"
              />
            </video>
          </div>

          {/* Gentle Bottom Gradient Scrim — Keeps temple visual bright while making lower text crisp & readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none"></div>

          {/* Subtle Live Sanctum Ambience Tag */}
          <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center space-x-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[11px] text-[#E2C889] pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-serif tracking-wider uppercase text-[10px]">Live Sanctum View</span>
          </div>

          {/* Hero Banner Content (Positioned at bottom-left as shown in the reference screenshot) */}
          <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-3xl text-left text-white">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-[#E2C889]/40 shadow-xs mb-3">
              <span className="text-sm select-none">🕉️</span>
              <span className="text-xs sm:text-sm font-serif font-bold tracking-wider text-[#E2C889] uppercase">
                DARSHANEASE • Every Devotee Closer to the Divine
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight leading-tight text-white drop-shadow-lg">
              Your Divine Darshan, <span className="text-[#E87519]">Made Simple</span>
            </h1>

            {/* Supporting Text */}
            <p className="mt-2.5 sm:mt-3 text-sm sm:text-base md:text-lg text-amber-100/95 max-w-2xl font-light leading-relaxed drop-shadow-md">
              Discover sacred temples, choose your preferred darshan, and book your spiritual experience with ease.
            </p>

            {/* Primary Action Buttons (matching screenshot styling) */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/temples"
                className="px-6 py-3.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold bg-[#E87519] hover:bg-[#D4630A] text-white shadow-xl hover:shadow-2xl transition-all flex items-center space-x-2 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-white" />
                <span>Explore Temples</span>
              </Link>

              <Link
                to="/temples"
                className="px-6 py-3.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold bg-[#321B1D]/80 hover:bg-[#321B1D] text-[#E2C889] border border-[#C5A15B]/60 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all flex items-center space-x-2 transform hover:-translate-y-0.5"
              >
                <Ticket className="w-4 h-4 text-[#C5A15B]" />
                <span>Book Darshan</span>
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Dedicated Search Bar Section — Positioned Down of the Hero Video */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mt-4 sm:mt-5 mb-6">
        <div
          ref={searchContainerRef}
          className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#C5A15B]/40 shadow-lg relative"
        >
          <div className="mb-2 sm:mb-2.5 flex items-center justify-between text-xs text-[#7D7060] font-medium">
            <span className="flex items-center text-[#321B1D] font-bold">
              <Search className="w-3.5 h-3.5 mr-1.5 text-[#E87519]" />
              Search Sacred Temples Across India
            </span>
            <span className="hidden sm:inline text-[11px] text-[#7D7060]">
              Search by Temple Name, Deity, City, or State
            </span>
          </div>

          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col sm:flex-row items-stretch gap-2.5"
          >
            <div className="flex-1 flex items-center px-4 py-2.5 rounded-xl bg-[#F7F0E4]/60 border border-[#C5A15B]/30 focus-within:border-[#E87519] focus-within:bg-white transition-all">
              <Search className="w-5 h-5 text-[#E87519] mr-3 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => {
                  if (searchTerm.trim().length > 0) setShowSuggestions(true);
                }}
                placeholder="Search temple name, deity, or city (e.g. Tirumala, Varanasi, Shiva)..."
                className="w-full text-xs sm:text-sm text-gray-900 bg-transparent placeholder-gray-500 focus:outline-none font-medium"
                aria-label="Search temple by name, deity, or city"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setShowSuggestions(false);
                  }}
                  className="text-xs text-gray-400 hover:text-gray-700 ml-2 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#E87519] hover:bg-[#D4630A] text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-1.5 shrink-0 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>

              <Link
                to="/temples"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#321B1D] hover:bg-[#231214] text-[#E2C889] border border-[#C5A15B]/50 shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-1.5 shrink-0"
              >
                <Compass className="w-4 h-4 text-[#C5A15B]" />
                <span>Explore All Temples</span>
              </Link>
            </div>
          </form>

          {/* Autocomplete Suggestions Dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute left-4 right-4 mt-2 bg-white rounded-2xl shadow-2xl border border-[#C5A15B]/50 max-h-72 overflow-y-auto z-50 text-left py-2">
              <div className="px-4 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                Matching Holy Shrines ({filteredSuggestions.length})
              </div>
              {filteredSuggestions.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSuggestion(item)}
                  className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-[#F7F0E4]/60 transition-colors border-b border-gray-50 last:border-0 text-left cursor-pointer"
                >
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-[#321B1D]">{item.name}</p>
                    <p className="text-[11px] text-gray-500 flex items-center mt-0.5">
                      <MapPin className="w-3 h-3 text-[#E87519] mr-1 shrink-0" />
                      <span>{item.city}, {item.state}</span>
                      <span className="mx-1.5">•</span>
                      <span>Deity: {item.deity}</span>
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#C5A15B] opacity-70" />
                </button>
              ))}
            </div>
          )}

          {/* Verified Highlights below search bar */}
          <div className="mt-3.5 pt-3 border-t border-[#C5A15B]/20 flex flex-wrap items-center justify-between gap-2 text-xs text-[#7D7060]">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="inline-flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#E87519]" />
                35+ Authentic Indian Temples
              </span>
              <span className="inline-flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1 text-[#E87519]" />
                Real-Time Slot Capacities
              </span>
              <span className="inline-flex items-center">
                <Ticket className="w-3.5 h-3.5 mr-1 text-[#E87519]" />
                Free & Paid Darshan Passes
              </span>
            </div>
            <Link to="/temples" className="text-[11px] font-bold text-[#E87519] hover:underline flex items-center">
              Browse Directory <ArrowRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
