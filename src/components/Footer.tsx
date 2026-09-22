import React from 'react';
import { Phone, MessageCircle, MapPin, Settings } from 'lucide-react';
import { BusinessConfig } from '../types';
import { getCleanWhatsAppDigits } from '../config/business';

interface FooterProps {
  config: BusinessConfig;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenAdmin }) => {
  const cleanWaDigits = getCleanWhatsAppDigits(config.whatsappNumber);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-[#1C0E07] text-[#FAF6F0] pt-16 pb-12 border-t border-[#E5A93C]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Logo & Brand Description */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <img
                src="/images/logo.png"
                alt="Logo Aux Gâteries"
                referrerPolicy="no-referrer"
                className="w-14 h-14 object-contain flex-shrink-0"
              />
              <div>
                <span className="font-display text-2xl font-bold tracking-wider text-[#FAF6F0] block">
                  AUX GÂTERIES
                </span>
                <span className="text-xs text-[#E5A93C] font-semibold tracking-widest uppercase block">
                  Boulangerie • Pâtisserie • Restaurant
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-300 max-w-sm leading-relaxed">
              Le plaisir commence ici. Votre boulangerie-pâtisserie artisanale et restaurant de confiance à Akassato.
            </p>

            <div className="pt-2 text-xs text-stone-400">
              <span className="block font-medium text-stone-200">Localisation :</span>
              <span>{config.city}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E5A93C]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li>
                <button
                  onClick={() => scrollTo('accueil')}
                  className="hover:text-[#E5A93C] transition-colors"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('nos-produits')}
                  className="hover:text-[#E5A93C] transition-colors"
                >
                  Produits & Incontournables
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('occasion-speciale')}
                  className="hover:text-[#E5A93C] transition-colors"
                >
                  Gâteaux d'événements
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('a-propos')}
                  className="hover:text-[#E5A93C] transition-colors"
                >
                  À propos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('localisation')}
                  className="hover:text-[#E5A93C] transition-colors"
                >
                  Contact & Horaires
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact Block */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E5A93C]">
              Coordonnées Officielles
            </h4>
            
            <div className="space-y-3 text-sm text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E5A93C] flex-shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{config.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E5A93C] flex-shrink-0" />
                <a
                  href={`tel:${config.phoneNumber.replace(/\s+/g, '')}`}
                  className="font-mono font-bold text-white hover:text-[#E5A93C] transition-colors"
                >
                  {config.phoneNumber}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#E5A93C] flex-shrink-0" />
                <a
                  href={`https://wa.me/${cleanWaDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#E5A93C] hover:underline"
                >
                  WhatsApp : {config.whatsappNumber}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-stone-300">
                {config.openingHours}
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Admin toggle */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            © {new Date().getFullYear()} AUX GÂTERIES — Boulangerie • Pâtisserie • Restaurant. Akassato, Bénin. Tous droits réservés.
          </p>

          <button
            id="btn-footer-admin"
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-[#E5A93C] transition-colors border border-white/5"
            title="Espace de gestion pour le propriétaire de l'établissement"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Espace Gérant</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
