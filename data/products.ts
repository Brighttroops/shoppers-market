import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299,
    originalPrice: 399,
    image: 'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    rating: 4.8,
    reviews: 127,
    inStock: true,
    tags: ['wireless', 'premium', 'noise-cancelling'],
    brand: 'AudioTech'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 249,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    description: 'Advanced fitness tracking with heart rate monitoring and GPS.',
    rating: 4.6,
    reviews: 89,
    inStock: true,
    tags: ['fitness', 'smart', 'GPS'],
    brand: 'FitTech'
  },
  {
    id: '3',
    name: 'Minimalist Backpack',
    price: 89,
    originalPrice: 120,
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Fashion',
    description: 'Sleek, minimalist design perfect for daily commuting and travel.',
    rating: 4.7,
    reviews: 203,
    inStock: true,
    tags: ['minimalist', 'travel', 'daily'],
    brand: 'UrbanCarry'
  },
  {
    id: '4',
    name: 'Organic Green Tea Set',
    price: 45,
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Food & Beverage',
    description: 'Premium organic green tea collection with traditional brewing accessories.',
    rating: 4.9,
    reviews: 156,
    inStock: true,
    tags: ['organic', 'tea', 'premium'],
    brand: 'ZenLeaf'
  },
  {
    id: '5',
    name: 'Professional Camera Lens',
    price: 899,
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    description: 'Professional-grade camera lens for stunning photography.',
    rating: 4.9,
    reviews: 67,
    inStock: false,
    tags: ['professional', 'photography', 'lens'],
    brand: 'LensCraft'
  },
  {
    id: '6',
    name: 'Artisan Coffee Beans',
    price: 24,
    image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Food & Beverage',
    description: 'Single-origin artisan coffee beans, expertly roasted for rich flavor.',
    rating: 4.5,
    reviews: 234,
    inStock: true,
    tags: ['artisan', 'coffee', 'single-origin'],
    brand: 'RoastMaster'
  }
];

export const categories = ['All', 'Electronics', 'Fashion', 'Food & Beverage'];
export const brands = ['All', 'AudioTech', 'FitTech', 'UrbanCarry', 'ZenLeaf', 'LensCraft', 'RoastMaster'];