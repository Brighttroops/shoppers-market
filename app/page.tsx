"use client"

import React, { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { CategoryBanner } from '../components/CategoryBanner';
import { Filters } from '../components/Filters';
import { ProductGrid } from '../components/ProductGrid';
import { FeaturedSection } from '../components/FeaturedSection';
import { Cart } from '../components/Cart';
import { ProductModal } from '../components/ProductModal';
import { Footer } from '../components/Footer';
import { AuthModal } from '../components/AuthModal';
import { UserProfile } from '../components/UserProfile';
import  AdminPanel from '@/components/AdminPanel'
import { Checkout } from '../components/Checkout';
import { AIChat } from '../components/AIChat';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { products as initialProducts, categories, brands } from '../data/products';
import { FilterState, Product, Order } from '../types';

function AppContent() {
  const { user } = useAuth();
  const cart = useCart();
  const wishlist = useWishlist();
  
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'shop' | 'profile' | 'admin'>('shop');
  const [orders, setOrders] = useState<Order[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    priceRange: [0, 1000],
    brand: 'All',
    rating: 0,
    inStock: false
  });

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = filters.category === 'All' || product.category === filters.category;
      const matchesBrand = filters.brand === 'All' || product.brand === filters.brand;
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const matchesRating = product.rating >= filters.rating;
      const matchesStock = !filters.inStock || product.inStock;

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating && matchesStock;
    });
  }, [searchQuery, filters, products]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      rating: 4.5,
      reviews: 0
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const handleUpdateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleOrderComplete = (order: Order) => {
    setOrders(prev => [...prev, order]);
    cart.clearCart();
    setCurrentView('profile');
  };

  const handleAIRecommendation = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      handleProductClick(product);
    }
  };

  const handleAuthClick = () => {
    if (user) {
      setCurrentView('profile');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleProfileClick = () => {
    setCurrentView('profile');
  };

  const handleCheckout = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsCheckoutOpen(true);
    cart.closeCart();
  };

  if (currentView === 'profile' && user) {
    return (
      <div>
        <Header
          cartItems={cart.totalItems}
          wishlistItems={wishlist.items.length}
          onCartToggle={cart.toggleCart}
          onSearchChange={setSearchQuery}
          searchQuery={searchQuery}
          onAuthClick={handleAuthClick}
          onProfileClick={handleProfileClick}
        />
        <div className="pt-4">
          <button
            onClick={() => setCurrentView('shop')}
            className="ml-8 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            ← Back to Shop
          </button>
        </div>
        <UserProfile orders={orders} wishlistItems={wishlist.items} />
      </div>
    );
  }

  if (currentView === 'admin' && user?.role === 'admin') {
    return (
      <div>
        <div className="p-4 bg-white border-b border-gray-200">
          <button
            onClick={() => setCurrentView('shop')}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            ← Back to Shop
          </button>
        </div>
        <AdminPanel
        //@ts-ignore
          products={products}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItems={cart.totalItems}
        wishlistItems={wishlist.items.length}
        onCartToggle={cart.toggleCart}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        onAuthClick={handleAuthClick}
        onProfileClick={handleProfileClick}
      />

      {user?.role === 'admin' && (
        <div className="bg-indigo-600 text-white p-2 text-center">
          <button
            onClick={() => setCurrentView('admin')}
            className="text-white hover:text-indigo-200 font-medium"
          >
            Access Admin Dashboard →
          </button>
        </div>
      )}

      <Hero />

      <FeaturedSection
        products={products}
        onAddToCart={cart.addToCart}
        onToggleWishlist={wishlist.toggleWishlist}
        isInWishlist={wishlist.isInWishlist}
        onProductClick={handleProductClick}
      />

      <CategoryBanner
        categories={categories}
        activeCategory={filters.category}
        onCategoryChange={handleCategoryChange}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <Filters
              filters={filters}
              onFilterChange={setFilters}
              categories={categories}
              brands={brands}
            />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                All Products ({filteredProducts.length})
              </h2>
              
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Filters
              </button>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden mb-6">
                <Filters
                  filters={filters}
                  onFilterChange={setFilters}
                  categories={categories}
                  brands={brands}
                />
              </div>
            )}

            <ProductGrid
              products={filteredProducts}
              onAddToCart={cart.addToCart}
              onToggleWishlist={wishlist.toggleWishlist}
              isInWishlist={wishlist.isInWishlist}
              onProductClick={handleProductClick}
            />
          </div>
        </div>
      </main>

      <Footer />

      {/* AI Chat */}
      <AIChat
        products={products}
        onProductRecommend={handleAIRecommendation}
      />

      {/* Cart Sidebar */}
      <Cart
        isOpen={cart.isOpen}
        items={cart.items}
        onClose={cart.closeCart}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeFromCart}
        totalPrice={cart.totalPrice}
        onCheckout={handleCheckout}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={handleCloseProductModal}
        onAddToCart={cart.addToCart}
        onToggleWishlist={wishlist.toggleWishlist}
        isInWishlist={selectedProduct ? wishlist.isInWishlist(selectedProduct.id) : false}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Checkout Modal */}
      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart.items}
        total={cart.totalPrice}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;