import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  ShieldCheck,
  Sparkles,
  Ticket,
  ChevronRight,
  Camera,
  CalendarCheck
} from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=800&q=80';

const TempleCard = ({ temple }) => {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState(
    temple.images && temple.images.length > 0 ? temple.images[0] : FALLBACK_IMAGE
  );

  const handleCardClick = () => {
    navigate(`/temples/${temple._id}`);
  };

  const isFree = temple.startingPrice === 0;
  const priceDisplay = isFree ? 'Free General Darshan' : `From ₹${temple.startingPrice}`;

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-3xl overflow-hidden border border-[#C5A15B]/35 shadow-sm hover:shadow-xl hover:border-[#C5A15B]/70 transition-all duration-300 flex flex-col hover:-translate-y-1.5 cursor-pointer relative h-full"
    >
      {/* Temple Photography Container (Consistent 16/10 Aspect Ratio, No Distortion) */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100 shrink-0">
        <img
          src={imgSrc}
          alt={temple.name}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Ambient Gradient Overlay for High-Contrast Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/35 pointer-events-none"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none gap-2">
          {temple.isVerified ? (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#321B1D]/90 text-[#E2C889] backdrop-blur-md border border-[#E2C889]/40 shadow-xs">
              <ShieldCheck className="w-3 h-3 mr-1 text-[#C5A15B]" />
              Verified Shrine
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-stone-200 backdrop-blur-md">
              Sacred Shrine
            </span>
          )}

          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/65 text-amber-100 backdrop-blur-md border border-white/20">
            {temple.category || 'Shrine'}
          </span>
        </div>

        {/* Bottom Overlay on Image: Deity and Photos Count */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs pointer-events-none">
          <span className="inline-flex items-center font-bold px-2.5 py-0.5 rounded-full bg-black/55 backdrop-blur-xs border border-white/15 text-[#E2C889] text-[11px]">
            <Sparkles className="w-3 h-3 mr-1 text-[#C5A15B]" />
            <span>{temple.deity}</span>
          </span>

          {temple.images && temple.images.length > 1 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/60 text-white backdrop-blur-xs border border-white/20">
              <Camera className="w-3 h-3 mr-1 text-[#C5A15B]" />
              {temple.images.length} Photos
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Full Temple Name without Clipping */}
          <h3 className="font-serif font-bold text-base sm:text-lg text-[#321B1D] group-hover:text-[#E87519] transition-colors line-clamp-2 leading-snug">
            {temple.name}
          </h3>

          {/* Location */}
          <p className="mt-1.5 flex items-center text-xs text-[#7D7060]">
            <MapPin className="w-3.5 h-3.5 mr-1 text-[#E87519] shrink-0" />
            <span className="truncate">{temple.city}, {temple.state}</span>
          </p>

          {/* Temple Description Snippet */}
          <p className="mt-2 text-xs text-gray-600 line-clamp-2 leading-relaxed font-normal">
            {temple.description}
          </p>

          {/* Configured Authentic Darshan Types */}
          {temple.darshanTypes && temple.darshanTypes.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5 items-center">
              {temple.darshanTypes.slice(0, 3).map((dt, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#F7F0E4] text-[#321B1D] border border-[#C5A15B]/30"
                  title={`${dt.name} (${Number(dt.chargePerDevotee) === 0 ? 'Free' : '₹' + dt.chargePerDevotee})`}
                >
                  <Ticket className="w-2.5 h-2.5 mr-1 text-[#E87519]" />
                  <span className="truncate max-w-[140px]">{dt.name}</span>
                </span>
              ))}
              {temple.darshanTypes.length > 3 && (
                <span className="text-[10px] text-[#7D7060] font-semibold">
                  +{temple.darshanTypes.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Bottom Tariff & Action Button */}
        <div className="mt-4 pt-3.5 border-t border-[#C5A15B]/25 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase font-bold text-[#7D7060] tracking-wider">
              Starting Darshan
            </p>
            <p className={`text-sm font-black ${isFree ? 'text-emerald-700' : 'text-[#321B1D]'}`}>
              {priceDisplay}
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/temples/${temple._id}`);
            }}
            className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold bg-[#E87519] hover:bg-[#D4630A] text-white shadow-xs hover:shadow-md transition-all shrink-0 cursor-pointer group-hover:scale-102"
          >
            <CalendarCheck className="w-3.5 h-3.5 mr-1.5" />
            <span>View Details & Book</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TempleCard;
