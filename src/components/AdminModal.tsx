import React, { useState } from 'react';
import { X, Save, RotateCcw, Plus, Trash2, Edit3, Store, DollarSign, Phone, MapPin, Clock, Check } from 'lucide-react';
import { BusinessConfig, Product } from '../types';
import { formatFCFA } from '../config/business';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BusinessConfig;
  onSaveConfig: (newConfig: BusinessConfig) => void;
  products: Product[];
  onSaveProducts: (newProducts: Product[]) => void;
  onResetDefaults: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  products,
  onSaveProducts,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'products'>('info');
  const [formData, setFormData] = useState<BusinessConfig>({ ...config });
  const [productList, setProductList] = useState<Product[]>([...products]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // New product state
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'patisserie' | 'boulangerie' | 'restaurant' | 'traiteur'>('patisserie');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(1000);
  const [newProdImage, setNewProdImage] = useState('/images/bande-fraise-vanille.jpg');

  if (!isOpen) return null;

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleProductPriceChange = (id: string, newPrice: number) => {
    const updated = productList.map((p) =>
      p.id === id ? { ...p, price: Math.max(0, newPrice) } : p
    );
    setProductList(updated);
    onSaveProducts(updated);
  };

  const handleDeleteProduct = (id: string) => {
    const updated = productList.filter((p) => p.id !== id);
    setProductList(updated);
    onSaveProducts(updated);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const newProduct: Product = {
      id: `custom-prod-${Date.now()}`,
      name: newProdName.trim(),
      category: newProdCategory,
      description: newProdDesc.trim() || 'Création artisanale Aux Gâteries.',
      price: Number(newProdPrice) || 1000,
      image: newProdImage,
      badge: 'Nouveau',
    };

    const updated = [newProduct, ...productList];
    setProductList(updated);
    onSaveProducts(updated);

    // Reset form
    setNewProdName('');
    setNewProdDesc('');
    setNewProdPrice(1000);
    setIsAddingProduct(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-3xl bg-[#FAF6F0] rounded-2xl shadow-2xl border border-[#2B1810]/20 max-h-[90vh] flex flex-col overflow-hidden z-10">
        
        {/* Modal Header */}
        <div className="p-5 bg-[#2B1810] text-[#FAF6F0] flex items-center justify-between border-b border-[#E5A93C]/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#E5A93C] text-[#2B1810] flex items-center justify-center font-bold">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-[#FAF6F0]">
                Espace Gérant & Administration
              </h3>
              <p className="text-xs text-[#E5A93C]">
                Gestion des informations, horaires, tarifs & catalogue d'Aux Gâteries
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fermer la modale gérant"
            className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-white px-5 pt-3 gap-4">
          <button
            onClick={() => setActiveTab('info')}
            className={`pb-3 text-sm font-bold border-b-2 flex items-center gap-2 ${
              activeTab === 'info'
                ? 'border-[#2B1810] text-[#2B1810]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Phone className="w-4 h-4 text-[#C85A32]" />
            <span>Coordonnées & Textes</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 text-sm font-bold border-b-2 flex items-center gap-2 ${
              activeTab === 'products'
                ? 'border-[#2B1810] text-[#2B1810]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <DollarSign className="w-4 h-4 text-[#C85A32]" />
            <span>Produits & Tarifs ({productList.length})</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {savedSuccess && (
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4" />
              <span>Modifications enregistrées avec succès en direct !</span>
            </div>
          )}

          {activeTab === 'info' ? (
            <form onSubmit={handleInfoSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Nom de l'établissement
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-sm text-[#2B1810] focus:ring-2 focus:ring-[#E5A93C] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Numéro WhatsApp unique (commandes)
                  </label>
                  <input
                    type="text"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-sm text-[#2B1810] font-mono focus:ring-2 focus:ring-[#E5A93C] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Numéro de Téléphone (appels)
                  </label>
                  <input
                    type="text"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-sm text-[#2B1810] font-mono focus:ring-2 focus:ring-[#E5A93C] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Slogan officiel
                  </label>
                  <input
                    type="text"
                    value={formData.slogan}
                    onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-sm text-[#2B1810] focus:ring-2 focus:ring-[#E5A93C] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Adresse complète
                </label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-sm text-[#2B1810] focus:ring-2 focus:ring-[#E5A93C] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Horaires d'ouverture
                </label>
                <input
                  type="text"
                  value={formData.openingHours}
                  onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-sm text-[#2B1810] focus:ring-2 focus:ring-[#E5A93C] focus:outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Réinitialiser toutes les données par défaut ?')) {
                      onResetDefaults();
                      onClose();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-red-600 underline"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Rétablir les valeurs d'origine</span>
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs bg-[#2B1810] text-[#FAF6F0] hover:bg-[#3D2314] shadow-md"
                >
                  <Save className="w-4 h-4 text-[#E5A93C]" />
                  <span>Enregistrer les informations</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-5">
              {/* Add product toggle */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-stone-700">
                  Catalogue Actuel ({productList.length} articles)
                </span>
                <button
                  onClick={() => setIsAddingProduct(!isAddingProduct)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#E5A93C] text-[#2B1810] hover:bg-[#F5B82E]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAddingProduct ? 'Annuler' : 'Ajouter un produit'}</span>
                </button>
              </div>

              {/* Add Product Form */}
              {isAddingProduct && (
                <form
                  onSubmit={handleCreateProduct}
                  className="p-4 rounded-xl bg-white border border-[#E5A93C]/40 shadow-md space-y-3 animate-in slide-in-from-top-2"
                >
                  <h4 className="text-xs font-bold uppercase text-[#2B1810]">Nouveau produit</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-0.5">Nom du produit</label>
                      <input
                        type="text"
                        placeholder="Ex: Tarte au citron meringuée"
                        value={newProdName}
                        onChange={(e) => setNewProdName(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-0.5">Catégorie</label>
                      <select
                        value={newProdCategory}
                        onChange={(e) => setNewProdCategory(e.target.value as any)}
                        className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-300"
                      >
                        <option value="patisserie">🍰 Pâtisserie</option>
                        <option value="boulangerie">🥖 Boulangerie</option>
                        <option value="restaurant">🍽️ Restaurant</option>
                        <option value="traiteur">🥐 Traiteur & Salé</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-0.5">Prix en FCFA</label>
                      <input
                        type="number"
                        min="0"
                        step="50"
                        value={newProdPrice}
                        onChange={(e) => setNewProdPrice(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-0.5">Image associée</label>
                      <select
                        value={newProdImage}
                        onChange={(e) => setNewProdImage(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-300"
                      >
                        <option value="/images/bande-fraise-vanille.jpg">Bande fraise-vanille</option>
                        <option value="/images/eclairs.jpg">Éclairs</option>
                        <option value="/images/friand-poisson.jpg">Friand poisson</option>
                        <option value="/images/boulangerie.jpg">Boulangerie / Pains</option>
                        <option value="/images/restaurant.jpg">Restaurant / Plats</option>
                        <option value="/images/gateau-evenement.jpg">Gâteau célébration</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-0.5">Description courte</label>
                    <input
                      type="text"
                      placeholder="Description gourmande..."
                      value={newProdDesc}
                      onChange={(e) => setNewProdDesc(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-300"
                    />
                  </div>
                  <div className="text-right">
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#2B1810] text-white"
                    >
                      Ajouter au catalogue
                    </button>
                  </div>
                </form>
              )}

              {/* Products Table */}
              <div className="space-y-2">
                {productList.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between gap-3 shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-lg object-cover bg-stone-100 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-[#2B1810] block truncate">
                          {prod.name}
                        </span>
                        <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                          {prod.category} {prod.isOfficial && '• Phare'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min="0"
                          step="50"
                          value={prod.price}
                          onChange={(e) => handleProductPriceChange(prod.id, Number(e.target.value))}
                          className="w-20 px-2 py-1 text-xs font-bold font-mono text-right rounded border border-stone-300 bg-stone-50"
                        />
                        <span className="text-[11px] font-semibold text-stone-600">FCFA</span>
                      </div>

                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        aria-label={`Supprimer ${prod.name}`}
                        className="p-1.5 text-stone-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-[#2B1810] text-[#FAF6F0]"
          >
            Fermer l'espace gérant
          </button>
        </div>

      </div>
    </div>
  );
};
