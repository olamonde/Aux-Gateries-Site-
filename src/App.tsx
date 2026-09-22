import React, { useState, useEffect } from 'react';
import { Product, CartItem, BusinessConfig } from './types';
import {
  INITIAL_BUSINESS_CONFIG,
  INITIAL_PRODUCTS,
  WHATSAPP_NUMBER,
} from './config/business';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { UniversSection } from './components/UniversSection';
import { ProductsSection } from './components/ProductsSection';
import { SpecialOccasionSection } from './components/SpecialOccasionSection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { FloatingActionBar } from './components/FloatingActionBar';
import { AdminModal } from './components/AdminModal';

export default function App() {
  // Configuration d'établissement
  const [config, setConfig] = useState<BusinessConfig>(() => {
    try {
      const saved = localStorage.getItem('aux_gateries_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        // S'assurer que l'URL Google Maps et la localisation correspondent au Plus Code officiel
        if (!parsed.googleMapsUrl || parsed.googleMapsUrl.includes('Akassato+Benin+Lycee+Technique')) {
          return {
            ...parsed,
            city: INITIAL_BUSINESS_CONFIG.city,
            googleMapsUrl: INITIAL_BUSINESS_CONFIG.googleMapsUrl,
          };
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Erreur chargement config locale', e);
    }
    return INITIAL_BUSINESS_CONFIG;
  });

  // Catalogue de produits
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('aux_gateries_products');
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        // Exclure les repas inventés pouvant subsister dans le cache du navigateur
        const sanitized = parsed.filter(
          (p) =>
            p.id !== 'prod-riz-gras-royal' &&
            p.id !== 'prod-poulet-braise' &&
            !p.name.toLowerCase().includes('riz au gras') &&
            !p.name.toLowerCase().includes('poulet braisé')
        );
        return sanitized;
      }
    } catch (e) {
      console.warn('Erreur chargement produits locaux', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Panier d'achat
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aux_gateries_cart');
      if (saved) {
        const parsed: CartItem[] = JSON.parse(saved);
        return parsed.filter(
          (item) =>
            item.product.id !== 'prod-riz-gras-royal' &&
            item.product.id !== 'prod-poulet-braise' &&
            !item.product.name.toLowerCase().includes('riz au gras') &&
            !item.product.name.toLowerCase().includes('poulet braisé')
        );
      }
    } catch (e) {
      console.warn('Erreur chargement panier local', e);
    }
    return [];
  });

  // Filtre de catégorie actif
  const [selectedCategory, setSelectedCategory] = useState<string>('tous');

  // État des tiroirs & modales
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sauvegardes persistantes locales
  useEffect(() => {
    try {
      localStorage.setItem('aux_gateries_config', JSON.stringify(config));
    } catch (e) {
      console.error(e);
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem('aux_gateries_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('aux_gateries_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Actions panier
  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    const element = document.getElementById('nos-produits');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  const handleExploreProducts = () => {
    handleSelectCategory('tous');
  };

  const handleResetDefaults = () => {
    setConfig(INITIAL_BUSINESS_CONFIG);
    setProducts(INITIAL_PRODUCTS);
    setCartItems([]);
    localStorage.removeItem('aux_gateries_config');
    localStorage.removeItem('aux_gateries_products');
    localStorage.removeItem('aux_gateries_cart');
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2B1810] flex flex-col font-sans selection:bg-[#E5A93C]/40 selection:text-[#2B1810]">
      {/* Navigation Bar */}
      <Navbar
        config={config}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={handleSelectCategory}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section avec Façade Officielle */}
        <Hero
          config={config}
          onExploreProducts={handleExploreProducts}
        />

        {/* Section Nos Univers (Boulangerie, Pâtisserie, Restaurant) */}
        <UniversSection
          onSelectCategory={handleSelectCategory}
        />

        {/* Section Nos Incontournables (Produits & Panier) */}
        <ProductsSection
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={handleAddToCart}
          onDirectOrder={(product, quantity) => handleAddToCart(product, quantity)}
          whatsappNumber={config.whatsappNumber || WHATSAPP_NUMBER}
        />

        {/* Section Gâteaux / Événements Spéciaux */}
        <SpecialOccasionSection
          whatsappNumber={config.whatsappNumber || WHATSAPP_NUMBER}
        />

        {/* Section À Propos Sobre */}
        <AboutSection
          config={config}
        />

        {/* Section Galerie Visuelle Haute Résolution */}
        <GallerySection />

        {/* Section Localisation Akassato & Google Maps */}
        <LocationSection
          config={config}
        />
      </main>

      {/* Footer Officiel Chocolat & Or */}
      <Footer
        config={config}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Tiroir Panier WhatsApp */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        whatsappNumber={config.whatsappNumber || WHATSAPP_NUMBER}
      />

      {/* Barre d'action et panier flottante */}
      <FloatingActionBar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        whatsappNumber={config.whatsappNumber || WHATSAPP_NUMBER}
      />

      {/* Espace Administrateur / Gérant */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onSaveConfig={setConfig}
        products={products}
        onSaveProducts={setProducts}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
