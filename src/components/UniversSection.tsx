import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES_META } from '../config/business';

interface UniversSectionProps {
  onSelectCategory: (category: string) => void;
}

export const UniversSection: React.FC<UniversSectionProps> = ({ onSelectCategory }) => {
  return (
    <section id="nos-univers" className="py-16 sm:py-20 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/40 text-[#2B1810] text-xs font-bold uppercase tracking-widest mb-3">
            <span>Découverte artisanale</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B1810] tracking-tight">
            Les Trois Univers d'Aux Gâteries
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-700 font-normal leading-relaxed">
            De la baguette dorée du petit matin aux délices pâtissiers raffinés et aux plats savoureux du midi et du soir.
          </p>
        </div>

        {/* 3 Large Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES_META.map((cat) => (
            <div
              key={cat.key}
              id={`univers-card-${cat.key}`}
              className="group relative bg-[#FDFBF7] rounded-2xl overflow-hidden border border-[#2B1810]/10 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#2B1810]/5">
                <img
                  src={cat.image}
                  alt={cat.label}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1810]/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                {/* Floating Category Icon Badge */}
                <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-[#2B1810]/90 backdrop-blur-md border border-[#E5A93C]/40 flex items-center justify-center text-2xl shadow-lg">
                  {cat.icon}
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-display text-2xl font-bold text-[#FAF6F0]">
                    {cat.label}
                  </h3>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-[#C85A32]">
                    {cat.tagline}
                  </p>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Explore Category Button */}
                <button
                  id={`btn-explore-${cat.key}`}
                  onClick={() => onSelectCategory(cat.key)}
                  className="inline-flex items-center justify-between w-full pt-3 border-t border-stone-200 text-sm font-bold text-[#2B1810] group-hover:text-[#C85A32] transition-colors"
                >
                  <span>Explorer les créations {cat.label}</span>
                  <div className="w-8 h-8 rounded-full bg-[#E5A93C]/20 group-hover:bg-[#E5A93C] flex items-center justify-center text-[#2B1810] transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
