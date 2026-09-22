import React, { useState } from 'react';
import { Eye, X, ZoomIn } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  size: 'large' | 'tall' | 'square';
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-facade',
    title: 'Façade officielle Aux Gâteries',
    category: 'Établissement',
    image: '/images/facade.jpg',
    size: 'large',
  },
  {
    id: 'gal-logo',
    title: 'Emblème officiel Aux Gâteries',
    category: 'Identité',
    image: '/images/logo.png',
    size: 'square',
  },
  {
    id: 'gal-bande-fraise',
    title: 'Bande fraise-vanille artisanale',
    category: 'Pâtisserie',
    image: '/images/bande-fraise-vanille.jpg',
    size: 'square',
  },
  {
    id: 'gal-eclairs',
    title: 'Éclairs gourmands assortis',
    category: 'Pâtisserie',
    image: '/images/eclairs.jpg',
    size: 'tall',
  },
  {
    id: 'gal-friand',
    title: 'Friand poisson doré au four',
    category: 'Salé & Traiteur',
    image: '/images/friand-poisson.jpg',
    size: 'square',
  },
  {
    id: 'gal-boulangerie',
    title: 'Fournées de pains & baguettes de tradition',
    category: 'Boulangerie',
    image: '/images/boulangerie.jpg',
    size: 'square',
  },
  {
    id: 'gal-evenement',
    title: 'Créations de fête & gâteaux sur mesure',
    category: 'Événements',
    image: '/images/gateau-evenement.jpg',
    size: 'tall',
  },
  {
    id: 'gal-restaurant',
    title: 'Plats et grillades au restaurant',
    category: 'Restaurant',
    image: '/images/restaurant.jpg',
    size: 'large',
  },
];

export const GallerySection: React.FC = () => {
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  return (
    <section id="galerie" className="py-16 sm:py-24 bg-[#FAF6F0] border-t border-[#2B1810]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32] block mb-2">
            Visite en images
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B1810] tracking-tight">
            L'Univers Aux Gâteries
          </h2>
          <p className="mt-3 text-base text-stone-600">
            Découvrez nos créations emblématiques, notre devanture à Akassato et l’ambiance chaleureuse de notre maison.
          </p>
        </div>

        {/* Dynamic Gallery Grid with varying aspect ratios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[220px]">
          {GALLERY_ITEMS.map((item) => {
            const isLarge = item.size === 'large';
            const isTall = item.size === 'tall';

            return (
              <div
                key={item.id}
                id={`gallery-item-${item.id}`}
                onClick={() => setActiveImage(item)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-[#2B1810] shadow-sm hover:shadow-xl transition-all duration-300 border border-[#2B1810]/10 ${
                  isLarge ? 'sm:col-span-2 row-span-1 lg:row-span-2' : ''
                } ${isTall ? 'row-span-2' : 'row-span-1'}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full ${
                    item.id === 'gal-logo'
                      ? 'object-contain p-4'
                      : 'object-cover group-hover:scale-105 transition-transform duration-500'
                  }`}
                />

                {/* Hover overlay with caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1810]/90 via-[#2B1810]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[#E5A93C] text-[11px] font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h4 className="text-base font-bold text-white leading-snug mt-1">
                    {item.title}
                  </h4>
                  <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-stone-300">
                    <ZoomIn className="w-3.5 h-3.5 text-[#E5A93C]" />
                    <span>Agrandir</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          id="gallery-lightbox"
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#2B1810] rounded-2xl overflow-hidden shadow-2xl border border-[#E5A93C]/30"
          >
            <button
              onClick={() => setActiveImage(null)}
              aria-label="Fermer la vue"
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-[#E5A93C] hover:text-[#2B1810] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-h-[75vh] overflow-hidden flex items-center justify-center bg-black/40">
              <img
                src={activeImage.image}
                alt={activeImage.title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-5 bg-[#2B1810] flex items-center justify-between border-t border-white/10">
              <div>
                <span className="text-xs font-bold uppercase text-[#E5A93C] tracking-wider block">
                  {activeImage.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {activeImage.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveImage(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
