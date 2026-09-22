import { BusinessConfig, Product } from '../types';

/**
 * NUMÉRO UNIQUE WHATSAPP & TÉLÉPHONE OFFICIEL
 * Conforme à la consigne : 'Créer une variable unique : WHATSAPP_NUMBER. Ne jamais répéter le numéro directement dans plusieurs endroits du code.'
 */
export const WHATSAPP_NUMBER = '+229 01 41 78 55 55';
export const PHONE_NUMBER = '+229 01 41 78 55 55';

export const BUSINESS_NAME = 'AUX GÂTERIES';
export const LOGO_PATH = '/images/logo.png';
export const FACADE_IMAGE_PATH = '/images/facade.jpg';

export const INITIAL_BUSINESS_CONFIG: BusinessConfig = {
  businessName: 'AUX GÂTERIES',
  tagline: 'BOULANGERIE – PÂTISSERIE – RESTAURANT',
  slogan: 'Le plaisir commence ici.',
  heroText: "Découvrez l'univers gourmand d'Aux Gâteries à Akassato.",
  whatsappNumber: WHATSAPP_NUMBER,
  phoneNumber: PHONE_NUMBER,
  address: "Akassato, dans la von du Lycée Technique SINO-Béninois, à l'entrée de la rue menant à l'Hôtel SYMPA.",
  city: 'G954+638, Akassato, Bénin',
  openingHours: 'Du Lundi au Dimanche : 06h30 – 22h30 (Service continu)',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=BOULANGERIE+P%C3%82TISSERIE+AUX+G%C3%82TERIES,+G954%2B638,+Akassato,+B%C3%A9nin',
};

/**
 * Nettoie le numéro pour générer le lien wa.me (retire les espaces, symboles + etc.)
 */
export function getCleanWhatsAppDigits(phone: string = WHATSAPP_NUMBER): string {
  return phone.replace(/[^\d]/g, '');
}

/**
 * Formate un montant en FCFA
 */
export function formatFCFA(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
}

/**
 * Génère le lien WhatsApp officiel pour une commande
 */
export function createOrderWhatsAppLink(
  items: { name: string; quantity: number; price: number }[],
  whatsappNumber: string = WHATSAPP_NUMBER
): string {
  const digits = getCleanWhatsAppDigits(whatsappNumber);
  
  if (items.length === 0) {
    const defaultMsg = `Bonjour Aux Gâteries 👋\n\nJe souhaite me renseigner sur vos produits disponibles aujourd'hui.`;
    return `https://wa.me/${digits}?text=${encodeURIComponent(defaultMsg)}`;
  }

  const itemsList = items
    .map(item => `• ${item.quantity} × ${item.name}`)
    .join('\n');

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const message = `Bonjour Aux Gâteries 👋\n\nJe souhaite passer la commande suivante :\n\n${itemsList}\n\nTotal estimé : ${formatFCFA(total)}\n\nMerci de me confirmer la disponibilité.`;

  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/**
 * Génère le lien WhatsApp pour une demande de gâteau d'événement
 */
export function createCakeRequestWhatsAppLink(whatsappNumber: string = WHATSAPP_NUMBER): string {
  const digits = getCleanWhatsAppDigits(whatsappNumber);
  const message = `Bonjour Aux Gâteries 👋\n\nJe souhaite commander un gâteau pour une occasion spéciale (anniversaire, mariage ou célébration).\nMerci de m'indiquer vos suggestions, délais et tarifs personnalisés.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/**
 * CATALOGUE INITIAL DES PRODUITS
 * Comprend en priorité absolue les visuels officiels mentionnés :
 * - Bande fraise-vanille
 * - Éclairs
 * - Friand poisson
 */
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-bande-fraise',
    name: 'Bande fraise-vanille',
    category: 'patisserie',
    description: 'Pâte feuilletée pur beurre croustillante, crème légère à la vanille de Madagascar et fraises fraîches nappées.',
    price: 3500,
    image: '/images/bande-fraise-vanille.jpg',
    isPopular: true,
    isOfficial: true,
    badge: 'Incontournable',
  },
  {
    id: 'prod-eclairs',
    name: 'Éclairs gourmands assortis',
    category: 'patisserie',
    description: 'Pâte à choux artisanale garnie d’une crème onctueuse chocolat noir d’origine ou caramel au beurre salé.',
    price: 1200,
    image: '/images/eclairs.jpg',
    isPopular: true,
    isOfficial: true,
    badge: 'Coup de cœur',
  },
  {
    id: 'prod-friand-poisson',
    name: 'Friand poisson savoureux',
    category: 'traiteur',
    description: 'Feuilleté doré au four garni d’une farce généreuse au poisson mariné aux épices douces et fines herbes.',
    price: 1000,
    image: '/images/friand-poisson.jpg',
    isPopular: true,
    isOfficial: true,
    badge: 'Salé incontournable',
  },
  {
    id: 'prod-baguette-tradition',
    name: 'Baguette Tradition croustillante',
    category: 'boulangerie',
    description: 'Pétrissage lent, fermentation naturelle et croûte dorée alvéolée. Cuite tout au long de la journée.',
    price: 300,
    image: '/images/boulangerie.jpg',
    isPopular: true,
    badge: 'Fournées du jour',
  },
  {
    id: 'prod-croissant-beurre',
    name: 'Croissant pur beurre doré',
    category: 'boulangerie',
    description: 'Feuilletage aéré au vrai beurre, croustillant à l’extérieur et fondant à l’intérieur pour vos petits déjeuners.',
    price: 500,
    image: '/images/boulangerie.jpg',
    isPopular: false,
    badge: 'Matin & Goûter',
  },
  {
    id: 'prod-gateau-evenement',
    name: 'Gâteau d’anniversaire sur mesure',
    category: 'patisserie',
    description: 'Création personnalisée à étages, génoise moelleuse, garniture au choix (chocolat, fruits rouges, vanille).',
    price: 18000,
    image: '/images/gateau-evenement.jpg',
    isPopular: true,
    badge: 'Sur commande',
  },
  {
    id: 'prod-pain-chocolat',
    name: 'Pain au chocolat pur beurre',
    category: 'boulangerie',
    description: 'Deux barres de chocolat intense enveloppées dans un feuilletage croustillant et doré.',
    price: 600,
    image: '/images/boulangerie.jpg',
    isPopular: false,
  },
];

export const CATEGORIES_META = [
  {
    key: 'boulangerie',
    label: 'Boulangerie',
    icon: '🥖',
    tagline: 'Pains et produits de boulangerie',
    description: 'Baguettes traditionnelles, pains spéciaux et viennoiseries fraîches cuites chaque matin.',
    image: '/images/boulangerie.jpg',
  },
  {
    key: 'patisserie',
    label: 'Pâtisserie',
    icon: '🍰',
    tagline: 'Gâteaux, éclairs, desserts et créations sucrées',
    description: 'Bande fraise-vanille, éclairs gourmands, gâteaux de célébration et mignardises fines.',
    image: '/images/bande-fraise-vanille.jpg',
  },
  {
    key: 'restaurant',
    label: 'Restaurant',
    icon: '🍽️',
    tagline: 'Une sélection de plats et spécialités',
    description: 'Cuisine savoureuse, grillades, plats traditionnels et déjeuners conviviaux à Akassato.',
    image: '/images/restaurant.jpg',
  },
];
