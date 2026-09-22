import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Phone, MessageCircle } from 'lucide-react';
import { BusinessConfig } from '../types';
import { getCleanWhatsAppDigits } from '../config/business';

interface NavbarProps {
  config: BusinessConfig;
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategory: (cat: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  cartCount,
  onOpenCart,
  onSelectCategory,
  onOpenAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const cleanWaDigits = getCleanWhatsAppDigits(config.whatsappNumber);

  return (
    <>
      {/* Top micro-bar for direct contact info */}
      <div className="bg-[#23120A] text-[#FAF6F0] text-xs py-1.5 px-4 border-b border-[#E5A93C]/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-stone-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium text-[#FAF6F0]">Akassato, Bénin</span>
            <span className="hidden sm:inline text-stone-400">• {config.openingHours}</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              id="topbar-call-link"
              href={`tel:${config.phoneNumber.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-[#E5A93C] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#E5A93C]" />
              <span className="font-semibold">{config.phoneNumber}</span>
            </a>

            <a
              id="topbar-wa-link"
              href={`https://wa.me/${cleanWaDigits}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1 text-[#E5A93C] hover:underline"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#2B1810]/95 backdrop-blur-md shadow-lg shadow-[#2B1810]/20 py-2.5'
            : 'bg-[#2B1810] py-3.5'
        } border-b border-[#E5A93C]/25`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <a
            id="brand-logo-link"
            href="#accueil"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('accueil');
            }}
            className="flex items-center gap-3.5 group text-left"
          >
            <img
              src="/images/logo.png"
              alt="Logo Aux Gâteries"
              referrerPolicy="no-referrer"
              className="w-14 h-14 sm:w-[70px] sm:h-[70px] object-contain flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
            />
            <div>
              <span className="block font-display text-xl sm:text-2xl font-bold tracking-wider text-[#FAF6F0] group-hover:text-[#E5A93C] transition-colors">
                AUX GÂTERIES
              </span>
              <span className="block text-[10px] sm:text-xs tracking-widest text-[#E5A93C] uppercase font-semibold">
                Boulangerie • Pâtisserie • Restaurant
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <button
              id="nav-home"
              onClick={() => scrollToSection('accueil')}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#FAF6F0] hover:text-[#E5A93C] hover:bg-white/5 transition-colors"
            >
              Accueil
            </button>
            <button
              id="nav-univers"
              onClick={() => scrollToSection('nos-univers')}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-stone-200 hover:text-[#E5A93C] hover:bg-white/5 transition-colors"
            >
              Nos univers
            </button>
            <button
              id="nav-products"
              onClick={() => {
                onSelectCategory('tous');
                scrollToSection('nos-produits');
              }}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-stone-200 hover:text-[#E5A93C] hover:bg-white/5 transition-colors"
            >
              Nos produits
            </button>
            <button
              id="nav-boulangerie"
              onClick={() => {
                onSelectCategory('boulangerie');
                scrollToSection('nos-produits');
              }}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-stone-200 hover:text-[#E5A93C] hover:bg-white/5 transition-colors"
            >
              Boulangerie
            </button>
            <button
              id="nav-patisserie"
              onClick={() => {
                onSelectCategory('patisserie');
                scrollToSection('nos-produits');
              }}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-stone-200 hover:text-[#E5A93C] hover:bg-white/5 transition-colors"
            >
              Pâtisserie
            </button>
            <button
              id="nav-restaurant"
              onClick={() => {
                onSelectCategory('restaurant');
                scrollToSection('nos-produits');
              }}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-stone-200 hover:text-[#E5A93C] hover:bg-white/5 transition-colors"
            >
              Restaurant
            </button>
            <button
              id="nav-about"
              onClick={() => scrollToSection('a-propos')}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-stone-200 hover:text-[#E5A93C] hover:bg-white/5 transition-colors"
            >
              À propos
            </button>
            <button
              id="nav-contact"
              onClick={() => scrollToSection('localisation')}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-stone-200 hover:text-[#E5A93C] hover:bg-white/5 transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cart Trigger */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              aria-label="Voir le panier"
              className="relative p-2.5 rounded-full text-[#FAF6F0] bg-[#3D2314] hover:bg-[#4E2B17] border border-[#E5A93C]/30 transition-all hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5 text-[#E5A93C]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C85A32] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Golden Commander CTA */}
            <button
              id="nav-order-cta"
              onClick={() => {
                if (cartCount > 0) {
                  onOpenCart();
                } else {
                  scrollToSection('nos-produits');
                }
              }}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full font-bold text-sm bg-gradient-to-r from-[#F5B82E] to-[#E5A93C] hover:from-[#FAD961] hover:to-[#F5B82E] text-[#2B1810] shadow-md shadow-[#E5A93C]/20 hover:shadow-lg transition-all transform active:scale-95"
            >
              Commander
            </button>

            {/* Mobile Hamburger Button */}
            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Ouvrir le menu"
              className="lg:hidden p-2 rounded-lg text-[#FAF6F0] hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#E5A93C]" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#23120A] border-t border-[#E5A93C]/20 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
            <button
              onClick={() => scrollToSection('accueil')}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-[#FAF6F0] hover:bg-[#3D2314]"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection('nos-univers')}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-stone-300 hover:bg-[#3D2314]"
            >
              Nos univers
            </button>
            <button
              onClick={() => {
                onSelectCategory('tous');
                scrollToSection('nos-produits');
              }}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-stone-300 hover:bg-[#3D2314]"
            >
              Nos produits (Tous)
            </button>
            <div className="pl-4 space-y-1 border-l-2 border-[#E5A93C]/30 my-1">
              <button
                onClick={() => {
                  onSelectCategory('boulangerie');
                  scrollToSection('nos-produits');
                }}
                className="block w-full text-left px-3 py-1.5 text-sm text-[#E5A93C] hover:text-white"
              >
                🥖 Boulangerie
              </button>
              <button
                onClick={() => {
                  onSelectCategory('patisserie');
                  scrollToSection('nos-produits');
                }}
                className="block w-full text-left px-3 py-1.5 text-sm text-[#E5A93C] hover:text-white"
              >
                🍰 Pâtisserie
              </button>
              <button
                onClick={() => {
                  onSelectCategory('restaurant');
                  scrollToSection('nos-produits');
                }}
                className="block w-full text-left px-3 py-1.5 text-sm text-[#E5A93C] hover:text-white"
              >
                🍽️ Restaurant
              </button>
            </div>
            <button
              onClick={() => scrollToSection('occasion-speciale')}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-stone-300 hover:bg-[#3D2314]"
            >
              Gâteaux d’événements
            </button>
            <button
              onClick={() => scrollToSection('a-propos')}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-stone-300 hover:bg-[#3D2314]"
            >
              À propos
            </button>
            <button
              onClick={() => scrollToSection('localisation')}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-stone-300 hover:bg-[#3D2314]"
            >
              Localisation & Horaires
            </button>

            <div className="pt-4 flex flex-col gap-2.5">
              <a
                href={`https://wa.me/${cleanWaDigits}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#F5B82E] to-[#E5A93C] text-[#2B1810] shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Commander sur WhatsApp</span>
              </a>

              <a
                href={`tel:${config.phoneNumber.replace(/\s+/g, '')}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium text-sm border border-stone-600 text-[#FAF6F0] hover:bg-white/5"
              >
                <Phone className="w-4 h-4 text-[#E5A93C]" />
                <span>Appeler : {config.phoneNumber}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
