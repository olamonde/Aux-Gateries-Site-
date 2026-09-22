import React from 'react';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { CartItem } from '../types';
import { formatFCFA, createOrderWhatsAppLink, WHATSAPP_NUMBER } from '../config/business';

interface FloatingActionBarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  whatsappNumber?: string;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
  cartItems,
  onOpenCart,
  whatsappNumber = WHATSAPP_NUMBER,
}) => {
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const formattedItemsForOrder = cartItems.map((item) => ({
    name: item.product.name,
    quantity: item.quantity,
    price: item.product.price,
  }));

  const orderWhatsAppUrl = createOrderWhatsAppLink(formattedItemsForOrder, whatsappNumber);

  if (totalCount === 0) {
    return (
      <aside
        id="floating-wa-standalone"
        aria-label="Contact WhatsApp rapide"
        className="fixed bottom-5 right-5 z-30"
      >
        <a
          href={orderWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Commander ou poser une question sur WhatsApp"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#F5B82E] to-[#E5A93C] text-[#2B1810] font-bold text-xs shadow-xl shadow-[#E5A93C]/30 hover:scale-105 active:scale-95 transition-all border border-[#2B1810]/20"
        >
          <MessageCircle className="w-5 h-5 text-[#2B1810]" />
          <span className="hidden sm:inline">WhatsApp Direct</span>
        </a>
      </aside>
    );
  }

  return (
    <aside
      id="floating-cart-bar"
      aria-label="Barre flottante de commande"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-30 max-w-md w-auto animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-[#2B1810] text-[#FAF6F0] rounded-2xl p-3 shadow-2xl border-2 border-[#E5A93C] flex items-center justify-between gap-3">
        {/* Cart Counter & Total */}
        <button
          onClick={onOpenCart}
          className="flex items-center gap-2.5 text-left hover:opacity-90 transition-opacity pl-1"
        >
          <div className="relative w-10 h-10 rounded-xl bg-[#3D2314] flex items-center justify-center text-[#E5A93C] flex-shrink-0">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#C85A32] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
              {totalCount}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-stone-300 block">Panier en cours</span>
            <span className="text-sm font-bold text-[#E5A93C] block font-mono">
              {formatFCFA(totalAmount)}
            </span>
          </div>
        </button>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCart}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-[#FAF6F0] transition-colors"
          >
            Détails
          </button>

          <a
            id="floating-btn-wa-order"
            href={orderWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs bg-gradient-to-r from-[#F5B82E] to-[#E5A93C] text-[#2B1810] shadow-md hover:from-[#FAD961] active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4 text-[#2B1810]" />
            <span>Commander</span>
          </a>
        </div>
      </div>
    </aside>
  );
};
