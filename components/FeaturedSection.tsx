import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface FeaturedSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  onProductClick: (product: Product) => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  products,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  onProductClick
}) => {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products, chosen for their quality, innovation, and style.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={isInWishlist(product.id)}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};