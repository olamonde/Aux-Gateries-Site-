export type ProductCategory = 'tous' | 'patisserie' | 'boulangerie' | 'restaurant' | 'traiteur';

export interface Product {
  id: string;
  name: string;
  category: 'patisserie' | 'boulangerie' | 'restaurant' | 'traiteur';
  description: string;
  price: number; // in FCFA
  image: string;
  isPopular?: boolean;
  isOfficial?: boolean; // Highlighted in the prompt (Bande fraise-vanille, Éclairs, Friand poisson)
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BusinessConfig {
  businessName: string;
  tagline: string;
  slogan: string;
  heroText: string;
  whatsappNumber: string;
  phoneNumber: string;
  address: string;
  city: string;
  openingHours: string;
  googleMapsUrl: string;
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}
