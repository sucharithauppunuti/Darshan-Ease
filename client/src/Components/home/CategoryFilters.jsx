import React from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';

const CATEGORIES = [
  { id: 'All', label: 'All Temples', icon: '🏛️', subtitle: 'All Shrines' },
  { id: 'Jyotirlinga', label: '12 Jyotirlingas', icon: '🔱', subtitle: 'Holy Shiva Lingas' },
  { id: 'Shakti Peeth', label: 'Shakti Peethas', icon: '🪷', subtitle: 'Divine Devi Shrines' },
  { id: 'Vaishnava', label: 'Vaishnava Shrines', icon: '🐚', subtitle: 'Vishnu & Krishna' },
  { id: 'Ganesh', label: 'Lord Ganesha', icon: '🐘', subtitle: 'Vighnaharta Shrines' },
  { id: 'Other Deities', label: 'Other Shrines', icon: '✨', subtitle: 'Ancient Sanctums' }
];

const CategoryFilters = ({ selectedCategory, onSelectCategory }) => {
  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mb-4 sm:mb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#C5A15B]/30">
        <div>
          <div className="flex items-center space-x-1.5 text-xs font-bold text-[#E87519] uppercase tracking-wider mb-0.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A15B]" />
            <span>Divine Traditions</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#321B1D]">
            Sacred Categories
          </h2>
          <p className="text-xs text-[#7D7060]">
            Filter holy temples by sacred deity tradition and spiritual significance
          </p>
        </div>

        {selectedCategory !== 'All' && (
          <button
            onClick={() => onSelectCategory('All')}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#321B1D] hover:text-[#E87519] bg-white border border-[#C5A15B]/40 shadow-xs hover:shadow-sm transition-all cursor-pointer"
          >
            <RotateCcw className="w-3 h-3 text-[#E87519]" />
            <span>Reset Filter</span>
          </button>
        )}
      </div>

      {/* Category Cards: Horizontal scroll on mobile, responsive grid on tablet & desktop */}
      <div className="flex overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 snap-x snap-mandatory">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center space-x-3 p-3 sm:p-3.5 rounded-2xl border transition-all text-left group cursor-pointer shrink-0 w-[200px] sm:w-auto min-h-[76px] snap-start ${
                isSelected
                  ? 'bg-gradient-to-tr from-[#FFF7ED] to-[#FFF1E0] border-2 border-[#E87519] shadow-md ring-2 ring-[#E87519]/20'
                  : 'bg-white hover:bg-[#F7F0E4]/70 border border-[#C5A15B]/35 hover:border-[#E87519]/60 shadow-xs hover:shadow-md'
              }`}
            >
              {/* Icon Badge */}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                  isSelected
                    ? 'bg-gradient-to-tr from-[#E87519] to-[#C5A15B] text-white shadow-sm'
                    : 'bg-[#F7F0E4] border border-[#C5A15B]/40 text-stone-700'
                }`}
              >
                <span className="text-xl select-none">{cat.icon}</span>
              </div>

              {/* Text Info - Readable without unwanted truncation */}
              <div className="min-w-0 flex-1">
                <p
                  className={`text-xs sm:text-sm font-bold leading-tight ${
                    isSelected ? 'text-[#321B1D]' : 'text-[#2C1810] group-hover:text-[#E87519]'
                  }`}
                >
                  {cat.label}
                </p>
                <p className="text-[11px] text-[#7D7060] leading-tight mt-0.5">
                  {cat.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryFilters;
