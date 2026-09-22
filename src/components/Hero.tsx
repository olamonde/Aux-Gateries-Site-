import React from 'react';
import { MessageCircle, ArrowRight, MapPin, Clock, Sparkles } from 'lucide-react';
import { BusinessConfig } from '../types';
import { getCleanWhatsAppDigits } from '../config/business';

interface HeroProps {
  config: BusinessConfig;
  onExploreProducts: () => void;
}

export const Hero: React.FC<HeroProps> = ({ config, onExploreProducts }) => {
  const cleanWaDigits = getCleanWhatsAppDigits(config.whatsappNumber);

  return (
    <section id="accueil" className="relative bg-[#2B1810] text-[#FAF6F0] overflow-hidden pt-6 pb-16 lg:py-20">
      {/* Decorative Warm Ambient Glows (Terracotta & Gold) */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#E5A93C]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#C85A32]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Story, Logo & Calls to Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Circular Logo & Pill Tag */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <img
                src="/images/logo.png"
                alt="Logo officiel Aux Gâteries"
                referrerPolicy="no-referrer"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain flex-shrink-0"
              />

              <div className="space-y-1.5 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D2314] border border-[#E5A93C]/40 text-[#E5A93C] text-xs font-semibold tracking-wide shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Akassato, Bénin • Maison Artisanale</span>
                </div>
                <h2 className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#FAF6F0]/80">
                  {config.tagline}
                </h2>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl font-black text-[#FAF6F0] leading-tight">
                « {config.slogan} »
              </h1>
              <p className="text-lg sm:text-xl text-[#FAF6F0]/90 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {config.heroText}
              </p>
            </div>

            {/* Address Banner */}
            <div className="flex items-start justify-center lg:justify-start gap-2 text-stone-300 text-xs sm:text-sm bg-black/25 backdrop-blur-sm p-3 rounded-xl border border-white/10 max-w-lg mx-auto lg:mx-0">
              <MapPin className="w-4 h-4 text-[#E5A93C] flex-shrink-0 mt-0.5" />
              <span>{config.address}</span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              {/* WhatsApp Primary Button in Signature Gold with High Contrast */}
              <a
                id="hero-wa-btn"
                href={`https://wa.me/${cleanWaDigits}?text=${encodeURIComponent("Bonjour Aux Gâteries 👋\nJe souhaite passer une commande ou me renseigner sur vos produits d'aujourd'hui.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-base bg-gradient-to-r from-[#F5B82E] to-[#E5A93C] hover:from-[#FAD961] hover:to-[#F5B82E] text-[#2B1810] shadow-lg shadow-[#E5A93C]/25 hover:shadow-xl hover:shadow-[#E5A93C]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5 text-[#2B1810]" />
                <span>Commander sur WhatsApp</span>
              </a>

              {/* Discover Products Button */}
              <button
                id="hero-explore-btn"
                onClick={onExploreProducts}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-base bg-white/10 hover:bg-white/15 text-[#FAF6F0] border border-white/20 hover:border-[#E5A93C]/50 transition-all duration-200"
              >
                <span>Découvrir nos produits</span>
                <ArrowRight className="w-4 h-4 text-[#E5A93C]" />
              </button>
            </div>

            {/* 3 Trust Pillars */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-white/10 text-center">
              <div className="p-2 sm:p-3 rounded-lg bg-white/5 border border-white/5">
                <span className="block text-[#E5A93C] font-bold text-xs sm:text-sm">🥖 Fournées</span>
                <span className="block text-[11px] text-stone-300">Pains chauds du jour</span>
              </div>
              <div className="p-2 sm:p-3 rounded-lg bg-white/5 border border-white/5">
                <span className="block text-[#E5A93C] font-bold text-xs sm:text-sm">🍰 Pâtisseries</span>
                <span className="block text-[11px] text-stone-300">Créations pur beurre</span>
              </div>
              <div className="p-2 sm:p-3 rounded-lg bg-white/5 border border-white/5">
                <span className="block text-[#E5A93C] font-bold text-xs sm:text-sm">🍽️ Restaurant</span>
                <span className="block text-[11px] text-stone-300">Plats savoureux</span>
              </div>
            </div>

          </div>

          {/* Right Column: Real Facade Photograph Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Frame with Terracotta & Golden Border */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border-2 border-[#E5A93C]/40 bg-[#3D2314] aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="/images/facade.jpg"
                  alt="Façade officielle de la boulangerie Aux Gâteries à Akassato"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1810] via-transparent to-black/20" />

                {/* Overlaid Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#2B1810]/90 backdrop-blur-md border border-[#E5A93C]/30 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#E5A93C] font-bold uppercase tracking-wider block">
                      Établissement officiel
                    </span>
                    <span className="text-sm font-semibold text-white block">
                      Aux Gâteries — Akassato
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#E5A93C] text-[#2B1810] flex items-center justify-center font-bold text-xs">
                    ★
                  </div>
                </div>
              </div>

              {/* Floating Opening Badge */}
              <div className="hidden sm:flex absolute -top-4 -left-4 items-center gap-2 px-3.5 py-2 rounded-xl bg-[#3D2314] border border-[#E5A93C]/50 shadow-xl text-xs font-medium text-[#FAF6F0]">
                <Clock className="w-3.5 h-3.5 text-[#E5A93C]" />
                <span>Ouvert 7j/7 dès 06h30</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
