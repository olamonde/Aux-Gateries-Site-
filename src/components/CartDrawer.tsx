import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { formatFCFA, createOrderWhatsAppLink, WHATSAPP_NUMBER } from '../config/business';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  whatsappNumber?: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  whatsappNumber = WHATSAPP_NUMBER,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const formattedItemsForOrder = items.map((item) => ({
    name: item.product.name,
    quantity: item.quantity,
    price: item.product.price,
  }));

  const orderWhatsAppUrl = createOrderWhatsAppLink(formattedItemsForOrder, whatsappNumber);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        id="cart-drawer-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF6F0] shadow-2xl flex flex-col border-l border-[#2B1810]/15">
          
          {/* Header */}
          <div className="p-5 bg-[#2B1810] text-[#FAF6F0] flex items-center justify-between border-b border-[#E5A93C]/30">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#E5A93C] text-[#2B1810] flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-[#FAF6F0]">
                  Mon Panier Gourmand
                </h3>
                <span className="text-xs text-[#E5A93C]">
                  {items.length} {items.length > 1 ? 'articles différents' : 'article'}
                </span>
              </div>
            </div>

            <button
              id="btn-close-cart"
              onClick={onClose}
              aria-label="Fermer le panier"
              className="p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
                <div className="w-16 h-16 rounded-full bg-stone-200/80 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-stone-400" />
                </div>
                <h4 className="font-display text-lg font-bold text-[#2B1810]">
                  Votre panier est vide
                </h4>
                <p className="text-sm mt-1 max-w-xs text-stone-600">
                  Découvrez nos créations pâtissières, pains et plats pour composer votre commande.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 rounded-full font-bold text-xs bg-[#2B1810] text-[#FAF6F0] hover:bg-[#3D2314] transition-all"
                >
                  Découvrir les produits
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      id={`cart-item-${product.id}`}
                      className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-sm flex items-center gap-3.5"
                    >
                      {/* Thumbnail */}
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-stone-100"
                      />

                      {/* Info & Price */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-[#2B1810] truncate">
                          {product.name}
                        </h4>
                        <span className="text-xs text-stone-500 block">
                          {formatFCFA(product.price)} / unité
                        </span>
                        <span className="text-xs font-bold text-[#C85A32] block mt-0.5">
                          Total : {formatFCFA(product.price * quantity)}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => onRemoveItem(product.id)}
                          aria-label={`Supprimer ${product.name}`}
                          className="text-stone-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="flex items-center bg-stone-100 rounded-lg p-0.5 border border-stone-200">
                          <button
                            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center rounded text-stone-600 hover:bg-stone-200 text-xs"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#2B1810]">
                            {quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded text-stone-600 hover:bg-stone-200 text-xs"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear Cart Button */}
                <div className="pt-2 text-right">
                  <button
                    onClick={onClearCart}
                    className="text-xs text-stone-500 hover:text-red-600 underline"
                  >
                    Vider tout le panier
                  </button>
                </div>

                {/* WhatsApp Message Preview Accordion */}
                <div className="p-3.5 rounded-xl bg-stone-100 border border-stone-200 text-xs space-y-1.5">
                  <span className="font-bold text-[#2B1810] flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Aperçu du message WhatsApp généré :</span>
                  </span>
                  <div className="bg-white p-2.5 rounded-lg border border-stone-200 font-mono text-[11px] text-stone-700 whitespace-pre-line leading-relaxed">
                    {`Bonjour Aux Gâteries 👋\n\nJe souhaite passer la commande suivante :\n\n${items
                      .map((i) => `• ${i.quantity} × ${i.product.name}`)
                      .join('\n')}\n\nTotal estimé : ${formatFCFA(totalAmount)}\n\nMerci de me confirmer la disponibilité.`}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout Bar */}
          {items.length > 0 && (
            <div className="p-5 bg-white border-t border-stone-200 space-y-3.5">
              <div className="flex items-center justify-between text-base">
                <span className="font-medium text-stone-600">Total estimé :</span>
                <span className="font-display text-2xl font-black text-[#2B1810]">
                  {formatFCFA(totalAmount)}
                </span>
              </div>

              {/* Main Golden WhatsApp Order Button */}
              <a
                id="btn-cart-checkout-wa"
                href={orderWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-[#F5B82E] to-[#E5A93C] hover:from-[#FAD961] hover:to-[#F5B82E] text-[#2B1810] shadow-lg shadow-[#E5A93C]/25 hover:shadow-xl transition-all duration-200 active:scale-98"
              >
                <MessageCircle className="w-5 h-5 text-[#2B1810]" />
                <span>Commander sur WhatsApp</span>
              </a>

              <p className="text-[11px] text-center text-stone-500">
                Paiement et confirmation de disponibilité en direct sur WhatsApp avec notre équipe d'Akassato.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
