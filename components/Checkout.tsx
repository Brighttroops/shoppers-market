import React, { useState } from 'react';
import { X, CreditCard, Truck, Shield, Leaf, Heart } from 'lucide-react';
import { CartItem, Address, PaymentInfo, Order } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onOrderComplete: (order: Order) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({
  isOpen,
  onClose,
  items,
  total,
  onOrderComplete
}) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState<Address>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [addCarbonOffset, setAddCarbonOffset] = useState(true);
  const [charityDonation, setCharityDonation] = useState(5);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const carbonOffsetCost = 2.50;
  const finalTotal = total + (addCarbonOffset ? carbonOffsetCost : 0) + charityDonation;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const order: Order = {
      id: Date.now().toString(),
      userId: user?.id || 'guest',
      items,
      total: finalTotal,
      status: 'pending',
      shippingAddress,
      paymentMethod: `**** **** **** ${paymentInfo.cardNumber.slice(-4)}`,
      createdAt: new Date().toISOString(),
      trackingNumber: `NS${Date.now()}`,
      carbonOffset: addCarbonOffset ? carbonOffsetCost : 0,
      charityDonation
    };

    onOrderComplete(order);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Secure Checkout</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Order Summary */}
            <div className="p-6 bg-gray-50 border-r border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.product.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Sustainability Options */}
              <div className="space-y-4 mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-gray-900 flex items-center">
                  <Leaf className="h-4 w-4 text-green-600 mr-2" />
                  Make a Positive Impact
                </h4>
                
                <label className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={addCarbonOffset}
                      onChange={(e) => setAddCarbonOffset(e.target.checked)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Carbon offset shipping</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">+${carbonOffsetCost}</span>
                </label>

                <div>
                  <label className="block text-sm text-gray-700 mb-2 items-center">
                    <Heart className="h-4 w-4 text-rose-500 mr-2" />
                    Charity donation
                  </label>
                  <select
                    value={charityDonation}
                    onChange={(e) => setCharityDonation(parseFloat(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value={0}>No donation</option>
                    <option value={2}>$2 - Clean Water</option>
                    <option value={5}>$5 - Education</option>
                    <option value={10}>$10 - Environmental</option>
                  </select>
                </div>
              </div>

              {/* Total */}
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                {addCarbonOffset && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Carbon Offset</span>
                    <span>+${carbonOffsetCost}</span>
                  </div>
                )}
                {charityDonation > 0 && (
                  <div className="flex justify-between text-sm text-rose-600">
                    <span>Charity Donation</span>
                    <span>+${charityDonation}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {step === 1 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Shipping Address
                  </h3>
                  
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        value={shippingAddress.zipCode}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      />
                      <select
                        value={shippingAddress.country}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Information
                  </h3>
                  
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      value={paymentInfo.cardholderName}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cardholderName: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                    
                    <input
                      type="text"
                      placeholder="Card Number (Demo: 4242 4242 4242 4242)"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center text-blue-800">
                      <Shield className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Secure Payment</span>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">
                      Your payment information is encrypted and secure
                    </p>
                  </div>

                  <div className="flex space-x-4 mt-6">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                      {isProcessing ? 'Processing...' : `Place Order - $${finalTotal.toFixed(2)}`}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};