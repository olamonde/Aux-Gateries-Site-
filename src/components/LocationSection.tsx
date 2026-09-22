import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, Navigation, ExternalLink } from 'lucide-react';
import { BusinessConfig } from '../types';
import { getCleanWhatsAppDigits } from '../config/business';

interface LocationSectionProps {
  config: BusinessConfig;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ config }) => {
  const cleanWaDigits = getCleanWhatsAppDigits(config.whatsappNumber);
  const cleanPhoneDigits = config.phoneNumber.replace(/[^\d+]/g, '');

  return (
    <section id="localisation" className="py-16 sm:py-24 bg-[#2B1810] text-[#FAF6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#E5A93C] text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Localisation & Contact</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#FAF6F0] tracking-tight">
            Retrouvez-nous à Akassato
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-300">
            Un emplacement facile d'accès pour vos retraits de commandes, vos petits déjeuners et vos déjeuners.
          </p>
        </div>

        {/* Content Grid: Contact Details Card + Google Maps Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Coordinates & Direct CTAs */}
          <div className="lg:col-span-5 bg-[#3D2314] rounded-3xl p-6 sm:p-8 border border-[#E5A93C]/30 shadow-xl flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              {/* Address Block */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E5A93C]/20 border border-[#E5A93C]/40 flex items-center justify-center flex-shrink-0 text-[#E5A93C]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#E5A93C]">
                    Adresse officielle
                  </h3>
                  <p className="text-base sm:text-lg font-medium text-[#FAF6F0] mt-1 leading-snug">
                    {config.address}
                  </p>
                  <p className="text-xs text-stone-300 mt-1 font-normal">
                    Repères : Lycée Technique SINO-Béninois & Rue de l'Hôtel SYMPA.
                  </p>
                </div>
              </div>

              {/* Phone & WhatsApp Block */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E5A93C]/20 border border-[#E5A93C]/40 flex items-center justify-center flex-shrink-0 text-[#E5A93C]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#E5A93C]">
                    Téléphone / WhatsApp
                  </h3>
                  <p className="text-xl sm:text-2xl font-bold font-mono text-[#FAF6F0] mt-1">
                    {config.phoneNumber}
                  </p>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Ligne directe pour commandes et réservations.
                  </p>
                </div>
              </div>

              {/* Hours Block */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E5A93C]/20 border border-[#E5A93C]/40 flex items-center justify-center flex-shrink-0 text-[#E5A93C]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#E5A93C]">
                    Horaires d'ouverture
                  </h3>
                  <p className="text-base font-semibold text-[#FAF6F0] mt-1">
                    {config.openingHours}
                  </p>
                  <p className="text-xs text-emerald-400 font-medium mt-0.5">
                    ● Ouvert aujourd'hui • Service continu
                  </p>
                </div>
              </div>
            </div>

            {/* The 2 Mandatory Buttons: « Nous appeler » and « Commander sur WhatsApp » */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <a
                id="btn-location-call"
                href={`tel:${cleanPhoneDigits}`}
                className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl font-bold text-sm bg-white/10 hover:bg-white/20 text-[#FAF6F0] border border-white/20 transition-all active:scale-98 shadow-sm"
              >
                <Phone className="w-4 h-4 text-[#E5A93C]" />
                <span>Nous appeler</span>
              </a>

              <a
                id="btn-location-wa"
                href={`https://wa.me/${cleanWaDigits}?text=${encodeURIComponent("Bonjour Aux Gâteries 👋\nJe souhaite passer une commande ou obtenir des informations.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-[#F5B82E] to-[#E5A93C] hover:from-[#FAD961] hover:to-[#F5B82E] text-[#2B1810] shadow-md shadow-[#E5A93C]/20 hover:shadow-lg transition-all active:scale-98"
              >
                <MessageCircle className="w-4 h-4 text-[#2B1810]" />
                <span>Commander sur WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive / Configurable Google Maps Area */}
          <div className="lg:col-span-7 bg-[#3D2314] rounded-3xl overflow-hidden border border-[#E5A93C]/30 shadow-xl flex flex-col">
            
            {/* Top map info header */}
            <div className="p-4 sm:p-5 bg-[#2B1810] border-b border-white/10 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#E5A93C]" />
                <span className="text-xs sm:text-sm font-semibold text-[#FAF6F0]">
                  Plan d'accès • Akassato, Bénin
                </span>
              </div>

              <a
                id="btn-open-google-maps"
                href={config.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-[#E5A93C] transition-colors"
              >
                <span>Ouvrir dans Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Map Container */}
            <div className="relative flex-1 min-h-[340px] w-full bg-[#1C0D06] flex items-center justify-center overflow-hidden">
              {/* Embedded Google Maps iframe centered on Akassato & SINO-Béninois */}
              <iframe
                title="Carte Google Maps - Aux Gâteries Akassato"
                src="https://maps.google.com/maps?q=Akassato+Benin+Lycee+Technique+Sino+Beninois&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[340px] border-0 filter contrast-105"
                loading="lazy"
              />

              {/* Floating Pin Card Over Map */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs p-3.5 rounded-2xl bg-[#2B1810]/95 backdrop-blur-md border border-[#E5A93C]/50 shadow-2xl text-xs text-white">
                <div className="flex items-center gap-2 font-bold text-[#E5A93C] mb-1">
                  <MapPin className="w-4 h-4 text-[#C85A32]" />
                  <span>AUX GÂTERIES</span>
                </div>
                <p className="text-stone-300 leading-tight">
                  Dans la von du Lycée Technique SINO-Béninois, entrée rue Hôtel SYMPA.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
