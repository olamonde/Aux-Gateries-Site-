import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, Navigation, ExternalLink, Compass } from 'lucide-react';
import { BusinessConfig } from '../types';
import { getCleanWhatsAppDigits } from '../config/business';

interface LocationSectionProps {
  config: BusinessConfig;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ config }) => {
  const cleanWaDigits = getCleanWhatsAppDigits(config.whatsappNumber);
  const cleanPhoneDigits = config.phoneNumber.replace(/[^\d+]/g, '');

  // Exact Google Maps identifiers requested
  const establishmentTitle = "BOULANGERIE PÂTISSERIE AUX GÂTERIES";
  const plusCodeLocation = "G954+638, Akassato, Bénin";
  const fullMapsQuery = "BOULANGERIE PÂTISSERIE AUX GÂTERIES, G954+638, Akassato, Bénin";

  // Official direct Google Maps URLs
  const openInGoogleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullMapsQuery)}`;
  const getDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullMapsQuery)}`;

  // Embedded map URL matching the exact establishment and Plus Code location
  const embedMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(fullMapsQuery)}&t=&z=16&ie=UTF8&iwloc=B&output=embed`;

  return (
    <section id="localisation" className="py-16 sm:py-24 bg-[#2B1810] text-[#FAF6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#E5A93C] text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Localisation Officielle & Contact</span>
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
              {/* Exact Establishment & Plus Code Block */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E5A93C]/20 border border-[#E5A93C]/40 flex items-center justify-center flex-shrink-0 text-[#E5A93C]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#E5A93C]">
                    Emplacement officiel Google Maps
                  </h3>
                  <p className="text-base sm:text-lg font-bold text-[#FAF6F0] leading-snug">
                    {establishmentTitle}
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#2B1810] border border-[#E5A93C]/30 text-xs font-mono font-semibold text-[#E5A93C]">
                    <Compass className="w-3.5 h-3.5" />
                    <span>{plusCodeLocation}</span>
                  </div>
                  <p className="text-xs text-stone-300 pt-1 font-normal leading-relaxed">
                    Repères : Dans la von du Lycée Technique SINO-Béninois, à l'entrée de la rue menant à l'Hôtel SYMPA.
                  </p>
                </div>
              </div>

              {/* Navigation Action Buttons in the information column */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  id="btn-location-directions"
                  href={getDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs bg-[#E5A93C] hover:bg-[#F5B82E] text-[#2B1810] shadow-md transition-all active:scale-98"
                >
                  <Navigation className="w-4 h-4 text-[#2B1810]" />
                  <span>Voir l'itinéraire</span>
                </a>

                <a
                  id="btn-location-open-maps"
                  href={openInGoogleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs bg-white/10 hover:bg-white/20 text-[#FAF6F0] border border-white/20 transition-all active:scale-98"
                >
                  <ExternalLink className="w-4 h-4 text-[#E5A93C]" />
                  <span>Ouvrir dans Google Maps</span>
                </a>
              </div>

              {/* Phone & WhatsApp Block */}
              <div className="flex items-start gap-4 pt-2 border-t border-white/10">
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

            {/* Direct Contact CTAs */}
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

          {/* Right Column: Interactive Google Maps Area */}
          <div className="lg:col-span-7 bg-[#3D2314] rounded-3xl overflow-hidden border border-[#E5A93C]/30 shadow-xl flex flex-col">
            
            {/* Top map info header */}
            <div className="p-4 sm:p-5 bg-[#2B1810] border-b border-white/10 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#E5A93C]" />
                <div>
                  <span className="text-xs sm:text-sm font-semibold text-[#FAF6F0] block">
                    {establishmentTitle}
                  </span>
                  <span className="text-[11px] text-[#E5A93C] font-mono block">
                    Plus Code : {plusCodeLocation}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  id="btn-map-header-directions"
                  href={getDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E5A93C] hover:bg-[#F5B82E] text-xs font-bold text-[#2B1810] transition-colors shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Voir l'itinéraire</span>
                </a>

                <a
                  id="btn-open-google-maps"
                  href={openInGoogleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-[#E5A93C] transition-colors"
                >
                  <span>Ouvrir dans Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Map Container: responsive with comfortable minimum height on mobile & desktop */}
            <div className="relative flex-1 min-h-[380px] sm:min-h-[440px] w-full bg-[#1C0D06] flex items-center justify-center overflow-hidden">
              <iframe
                title="Carte Google Maps - BOULANGERIE PÂTISSERIE AUX GÂTERIES Akassato"
                src={embedMapUrl}
                className="w-full h-full min-h-[380px] sm:min-h-[440px] border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Verified Establishment Badge Over Map */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm p-4 rounded-2xl bg-[#2B1810]/95 backdrop-blur-md border border-[#E5A93C]/50 shadow-2xl text-xs text-white">
                <div className="flex items-center gap-2 font-bold text-[#E5A93C] mb-1">
                  <MapPin className="w-4 h-4 text-[#E5A93C] flex-shrink-0" />
                  <span className="truncate">{establishmentTitle}</span>
                </div>
                <p className="text-stone-300 font-mono text-[11px] mb-2">
                  {plusCodeLocation}
                </p>
                <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                  <a
                    href={getDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-1.5 px-3 rounded-lg bg-[#E5A93C] hover:bg-[#F5B82E] text-[#2B1810] font-bold text-[11px] transition-colors"
                  >
                    Itinéraire direct
                  </a>
                  <a
                    href={openInGoogleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-[#FAF6F0] font-medium text-[11px] transition-colors"
                  >
                    Google Maps
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
