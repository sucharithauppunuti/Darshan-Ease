import React from 'react';

const LoadingSpinner = ({ text = 'Loading sacred details...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative w-16 h-16">
        <div className="w-16 h-16 rounded-full border-4 border-[#F7F3EA] border-t-[#E65100] border-r-[#D4AF37] animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl animate-pulse">🕉️</span>
        </div>
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#8D8070]">
        {text}
      </p>
    </div>
  );
};

export default LoadingSpinner;
