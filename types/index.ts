export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: string[];
  brand: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'customer';
  createdAt: string;
  twoFactorEnabled?: boolean;
  carbonOffset?: number;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  brand: string;
  rating: number;
  inStock: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: string;
  trackingNumber?: string;
  carbonOffset: number;
  charityDonation: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export interface AIRecommendation {
  productId: string;
  reason: string;
  confidence: number;
}

export interface AnalyticsData {
  totalSales: number;
  totalOrders: number;
  topProducts: Product[];
  salesByCategory: { category: string; sales: number }[];
  recentOrders: Order[];
  userGrowth: { month: string; users: number }[];
}

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  recommendations?: AIRecommendation[];
}

export interface SustainabilityMetrics {
  carbonSaved: number;
  charityRaised: number;
  ecoFriendlyProducts: number;
}