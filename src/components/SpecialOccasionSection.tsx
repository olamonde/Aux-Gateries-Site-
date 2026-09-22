import React from 'react';
import { MessageCircle, Cake, Sparkles, CheckCircle2 } from 'lucide-react';
import { createCakeRequestWhatsAppLink, WHATSAPP_NUMBER } from '../config/business';

interface SpecialOccasionSectionProps {
  whatsappNumber?: string;
}

export const SpecialOccasionSection: React.FC<SpecialOccasionSectionProps> = ({
  whatsappNumber = WHATSAPP_NUMBER,
}) => {
  const cakeWhatsAppUrl = createCakeRequestWhatsAppLink(whatsappNumber);

  return (
    <section id="occasion-speciale" className="py-16 sm:py-24 bg-[#2B1810] text-[#FAF6F0] relative overflow-hidden">
      {/* Warm Ambient Backdrops */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-20 w-80 h-80 rounded-full bg-[#C85A32]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 -mr-20 w-96 h-96 rounded-full bg-[#E5A93C]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-[#3D2314] to-[#251208] rounded-3xl border border-[#E5A93C]/30 shadow-2xl p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#E5A93C] text-xs font-bold uppercase tracking-wider">
                <Cake className="w-4 h-4" />
                <span>Pâtisserie de fête & Sur-mesure</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FAF6F0] leading-tight">
                Une occasion spéciale ?
              </h2>

              <p className="text-base sm:text-lg text-stone-200 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                Anniversaire, célébration ou simplement une envie gourmande ? Découvrez nos créations pâtissières.
              </p>

              {/* Feature Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-2 pb-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-[#E5A93C] flex-shrink-0" />
                  <span>Tailles adaptées à vos convives</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-[#E5A93C] flex-shrink-0" />
                  <span>Personnalisation des saveurs & décors</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-[#E5A93C] flex-shrink-0" />
                  <span>Conseils directs sur WhatsApp</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-[#E5A93C] flex-shrink-0" />
                  <span>Retrait pratique à Akassato</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <a
                  id="btn-demand-cake"
                  href={cakeWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-base bg-gradient-to-r from-[#F5B82E] to-[#E5A93C] hover:from-[#FAD961] hover:to-[#F5B82E] text-[#2B1810] shadow-lg shadow-[#E5A93C]/25 hover:shadow-xl hover:shadow-[#E5A93C]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  <MessageCircle className="w-5 h-5 text-[#2B1810]" />
                  <span>Demander un gâteau</span>
                </a>
              </div>

              <p className="text-xs text-stone-400 italic">
                * Échangez directement avec notre équipe pour valider le modèle, le nombre de parts et la date souhaitée.
              </p>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#E5A93C]/40 bg-[#1F0E06] aspect-square">
                <img
                  src="/images/gateau-evenement.jpg"
                  alt="Création gâteau de célébration Aux Gâteries"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F0E06]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-center">
                  <span className="text-[#E5A93C] text-xs font-bold uppercase tracking-wider block">
                    Création Pâtissière Sur Commande
                  </span>
                  <span className="text-stone-200 text-xs mt-0.5 block">
                    Élaboré avec des ingrédients nobles et une finition soignée
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
