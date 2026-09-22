import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus, Check, MessageCircle, Sparkles, Search } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { formatFCFA, createOrderWhatsAppLink, WHATSAPP_NUMBER } from '../config/business';

interface ProductsSectionProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onDirectOrder: (product: Product, quantity: number) => void;
  whatsappNumber?: string;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  whatsappNumber = WHATSAPP_NUMBER,
}) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedNotice, setAddedNotice] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const updated = Math.max(1, current + delta);
      return { ...prev, [productId]: updated };
    });
  };

  const getQty = (productId: string) => quantities[productId] || 1;

  const handleAdd = (product: Product) => {
    const qty = getQty(product.id);
    onAddToCart(product, qty);
    setAddedNotice(product.id);
    setTimeout(() => {
      setAddedNotice(null);
    }, 1800);
  };

  const handleQuickWhatsApp = (product: Product) => {
    const qty = getQty(product.id);
    const link = createOrderWhatsAppLink(
      [{ name: product.name, quantity: qty, price: product.price }],
      whatsappNumber
    );
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  // Filter products by category & search query
  const filteredProducts = products.filter((p) => {
    const matchesCat =
      selectedCategory === 'tous' ||
      p.category === selectedCategory ||
      (selectedCategory === 'boulangerie' && (p.category === 'boulangerie' || p.category === 'traiteur'));
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const categoriesTabs: { key: ProductCategory; label: string; icon: string }[] = [
    { key: 'tous', label: 'Tous nos délices', icon: '✨' },
    { key: 'patisserie', label: 'Pâtisserie', icon: '🍰' },
    { key: 'boulangerie', label: 'Boulangerie', icon: '🥖' },
    { key: 'restaurant', label: 'Restaurant', icon: '🍽️' },
    { key: 'traiteur', label: 'Traiteur & Salé', icon: '🥐' },
  ];

  return (
    <section id="nos-produits" className="py-16 sm:py-20 bg-[#F4ECE4]/70 border-t border-b border-[#2B1810]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/40 text-[#2B1810] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>Sélection gourmande artisanale</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B1810] tracking-tight">
            Nos Incontournables
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-700 font-normal leading-relaxed">
            Pâtisseries fines, viennoiseries dorées et délices salés préparés avec passion. Commandez directement pour dégustation ou à emporter.
          </p>
        </div>

        {/* Categories Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Scrollable Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categoriesTabs.map((tab) => {
              const isActive = selectedCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  id={`tab-category-${tab.key}`}
                  onClick={() => onSelectCategory(tab.key)}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#2B1810] text-[#FAF6F0] shadow-md shadow-[#2B1810]/20'
                      : 'bg-white/80 text-stone-700 hover:bg-white hover:text-[#2B1810] border border-stone-200'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="product-search-input"
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white text-sm text-[#2B1810] placeholder:text-stone-400 border border-stone-200 focus:outline-none focus:border-[#E5A93C] focus:ring-1 focus:ring-[#E5A93C]"
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8 max-w-xl mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#E5A93C]/20 text-[#2B1810] flex items-center justify-center mx-auto mb-3 text-xl font-bold">
              🍽️
            </div>
            <h3 className="font-display text-lg font-bold text-[#2B1810] mb-1">
              {selectedCategory === 'restaurant'
                ? 'Carte du restaurant en cours d\'actualisation'
                : 'Aucun produit trouvé'}
            </h3>
            <p className="text-sm text-stone-600 mb-4 leading-relaxed">
              {selectedCategory === 'restaurant'
                ? 'Les menus et plats cuisinés du jour sont disponibles directement sur place à Akassato ou sur simple demande WhatsApp.'
                : 'Aucun produit ne correspond à votre filtre de recherche actuel.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  onSelectCategory('tous');
                }}
                className="px-4 py-2 rounded-full text-xs font-bold bg-[#2B1810] text-[#FAF6F0] hover:bg-[#3D2314] transition-colors"
              >
                Voir tous les produits disponibles
              </button>
              {selectedCategory === 'restaurant' && (
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    'Bonjour Aux Gâteries 👋 Je souhaite connaître les plats et menus disponibles aujourd\'hui au restaurant.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-xs font-bold bg-[#E5A93C] text-[#2B1810] hover:bg-[#F5B82E] transition-colors"
                >
                  Demander le menu du jour sur WhatsApp
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const qty = getQty(product.id);
              const isAdded = addedNotice === product.id;

              return (
                <div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  className="group bg-[#FAF6F0] rounded-2xl overflow-hidden border border-[#2B1810]/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Photo with Badge */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge if official or popular */}
                    {product.badge && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#2B1810]/90 backdrop-blur-sm border border-[#E5A93C]/40 text-[#FAF6F0] text-xs font-bold tracking-wide shadow-sm flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]"></span>
                        <span>{product.badge}</span>
                      </div>
                    )}

                    {product.isOfficial && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#C85A32] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        Produit Phare
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-display text-xl font-bold text-[#2B1810] group-hover:text-[#C85A32] transition-colors leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#2B1810]/10 space-y-3">
                      {/* Price & Quantity Selector */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs text-stone-500 font-medium block">Prix unitaire</span>
                          <span className="font-display text-xl font-black text-[#2B1810]">
                            {formatFCFA(product.price)}
                          </span>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center bg-white rounded-lg border border-stone-300 p-1 shadow-inner">
                          <button
                            id={`qty-minus-${product.id}`}
                            onClick={() => handleQuantityChange(product.id, -1)}
                            aria-label="Diminuer la quantité"
                            className="w-7 h-7 flex items-center justify-center rounded text-stone-600 hover:bg-stone-100 active:scale-95 transition-all"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-[#2B1810]">
                            {qty}
                          </span>
                          <button
                            id={`qty-plus-${product.id}`}
                            onClick={() => handleQuantityChange(product.id, 1)}
                            aria-label="Augmenter la quantité"
                            className="w-7 h-7 flex items-center justify-center rounded text-stone-600 hover:bg-stone-100 active:scale-95 transition-all"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Actions Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {/* Add to Cart button */}
                        <button
                          id={`btn-add-cart-${product.id}`}
                          onClick={() => handleAdd(product)}
                          className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs transition-all ${
                            isAdded
                              ? 'bg-emerald-700 text-white'
                              : 'bg-[#2B1810] hover:bg-[#3D2314] text-[#FAF6F0]'
                          } shadow-sm active:scale-95`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Ajouté !</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5 text-[#E5A93C]" />
                              <span>Au panier</span>
                            </>
                          )}
                        </button>

                        {/* Quick WhatsApp Order Button */}
                        <button
                          id={`btn-quick-wa-${product.id}`}
                          onClick={() => handleQuickWhatsApp(product)}
                          title="Commander immédiatement cet article sur WhatsApp"
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs bg-gradient-to-r from-[#F5B82E] to-[#E5A93C] hover:from-[#FAD961] hover:to-[#F5B82E] text-[#2B1810] shadow-sm active:scale-95 transition-all"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-[#2B1810]" />
                          <span>Commander</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Note on official demonstration list */}
        <div className="mt-12 text-center text-xs text-stone-500 max-w-xl mx-auto italic">
          * Les prix et disponibilités en vitrine peuvent varier selon les fournées et arrivages journaliers à la boutique d'Akassato.
        </div>

      </div>
    </section>
  );
};
