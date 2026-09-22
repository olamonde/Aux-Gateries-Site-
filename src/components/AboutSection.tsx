import React from 'react';
import { MapPin, Heart, Sparkles, Coffee } from 'lucide-react';
import { BusinessConfig } from '../types';

interface AboutSectionProps {
  config: BusinessConfig;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ config }) => {
  return (
    <section id="a-propos" className="py-16 sm:py-20 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Facade / Establishment Photo Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-[#2B1810]/15 aspect-[4/3] bg-stone-200">
                <img
                  src="/images/facade.jpg"
                  alt="Établissement Aux Gâteries à Akassato"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative Corner Badge */}
              <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-[#2B1810] text-[#FAF6F0] p-4 rounded-2xl shadow-xl border border-[#E5A93C]/40 max-w-[240px]">
                <div className="flex items-center gap-2 mb-1 text-[#E5A93C]">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Maison Gourmande</span>
                </div>
                <p className="text-xs text-stone-300 leading-snug">
                  Un cadre accueillant et convivial au cœur d'Akassato.
                </p>
              </div>

            </div>
          </div>

          {/* Right: Sober, authentic description */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32] block">
                Notre Philosophie
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B1810] tracking-tight">
                Bienvenue chez Aux Gâteries
              </h2>
            </div>

            <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-normal">
              Implanté à Akassato, <strong className="text-[#2B1810] font-semibold">Aux Gâteries</strong> réunit sous le même toit l’art de la boulangerie traditionnelle, la délicatesse de la pâtisserie moderne et la convivialité d’un restaurant pour vos déjeuners et dîners.
            </p>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Chaque jour, nous nous attachons à proposer des produits savoureux et soignés : baguettes croustillantes cuites au fil des fournées, douceurs sucrées emblématiques telles que notre <span className="font-medium text-[#2B1810]">Bande fraise-vanille</span> ou nos <span className="font-medium text-[#2B1810]">Éclairs</span>, et snacks salés comme nos célèbres <span className="font-medium text-[#2B1810]">Friands au poisson</span>.
            </p>

            {/* Core Values / Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-white border border-[#2B1810]/10 flex items-start gap-3 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-[#E5A93C]/20 flex items-center justify-center text-[#2B1810] flex-shrink-0 mt-0.5">
                  <Heart className="w-4 h-4 text-[#C85A32]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#2B1810]">Savoir-faire artisanal</h4>
                  <p className="text-xs text-stone-500 mt-0.5">Préparations soignées avec des ingrédients sélectionnés avec rigueur.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#2B1810]/10 flex items-start gap-3 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-[#E5A93C]/20 flex items-center justify-center text-[#2B1810] flex-shrink-0 mt-0.5">
                  <Coffee className="w-4 h-4 text-[#C85A32]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#2B1810]">Proximité & Écoute</h4>
                  <p className="text-xs text-stone-500 mt-0.5">Une équipe souriante et attentive à vos envies du quotidien et de fête.</p>
                </div>
              </div>
            </div>

            {/* Location reminder */}
            <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm text-[#2B1810] font-medium bg-[#E5A93C]/10 p-3 rounded-xl border border-[#E5A93C]/30">
              <MapPin className="w-4 h-4 text-[#C85A32] flex-shrink-0" />
              <span>{config.address}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
