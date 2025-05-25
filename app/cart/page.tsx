'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useAppContext } from '../context/AppContext'
import PaymentButton from '../components/PaymentButton'
import { useState } from 'react'
import type { CartItem } from "../types/cart"

export default function Cart() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useAppContext()
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set())
  
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  
  const handlePaymentSuccess = () => {
    clearCart();
  };

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    // Prevent negative quantities and zero quantities
    if (newQuantity < 1) {
      removeFromCart(productId)
      return
    }
    
    // Prevent excessive quantities (optional limit)
    if (newQuantity > 99) {
      return
    }

    // Add visual feedback for updating
    setUpdatingItems(prev => new Set(prev).add(productId))
    
    try {
      await updateQuantity(productId, newQuantity)
    } catch (error) {
      console.error('Failed to update quantity:', error)
    } finally {
      // Remove updating state after a short delay for visual feedback
      setTimeout(() => {
        setUpdatingItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(productId)
          return newSet
        })
      }, 300)
    }
  }

  const incrementQuantity = (productId: string, currentQuantity: number) => {
    handleQuantityChange(productId, currentQuantity + 1)
  }

  const decrementQuantity = (productId: string, currentQuantity: number) => {
    handleQuantityChange(productId, currentQuantity - 1)
  }

  const handleManualQuantityChange = (productId: string, value: string) => {
    const newQuantity = parseInt(value, 10)
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      handleQuantityChange(productId, newQuantity)
    }
  }

  const QuantityControls = ({ item }: { item: any }) => {
    const isUpdating = updatingItems.has(item.product.id)
    
    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            onClick={() => decrementQuantity(item.product.id, item.quantity)}
            disabled={isUpdating}
            className="px-3 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            −
          </button>
          
          <input
            type="number"
            min="1"
            max="99"
            value={item.quantity}
            onChange={(e) => handleManualQuantityChange(item.product.id, e.target.value)}
            disabled={isUpdating}
            className="w-16 px-2 py-1 text-center border-0 focus:outline-none focus:ring-0 disabled:opacity-50"
            aria-label="Quantity"
          />
          
          <button
            onClick={() => incrementQuantity(item.product.id, item.quantity)}
            disabled={isUpdating || item.quantity >= 99}
            className="px-3 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        
        {isUpdating && (
          <div className="flex items-center">
            <svg className="animate-spin h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
          <motion.a
            href="/products"
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Browse Products
          </motion.a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <motion.div
                key={item.product.id}
                className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                layout
              >
                <Image 
                  src={item.product.image}
                  alt={item.product.name}
                  width={80} 
                  height={80} 
                  className="rounded-md object-cover" 
                />
                
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.product.name}</h2>
                  <p className="text-gray-600 text-sm">₹{item.product.price.toFixed(2)} each</p>
                  
                  <div className="mt-2">
                    <QuantityControls item={item} />
                  </div>
                </div>
                
                <div className="text-right space-y-2">
                  <p className="text-lg font-bold">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Clear Cart Button */}
            <div className="pt-4">
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-800 font-medium transition-colors"
              >
                Clear All Items
              </button>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                  </span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className={total > 500 ? 'text-green-600 line-through' : ''}>
                    ₹50.00
                  </span>
                </div>
                
                {total > 500 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Free Delivery (₹500+)</span>
                    <span>₹0.00</span>
                  </div>
                )}
                
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{(total + (total > 500 ? 0 : 50)).toFixed(2)}</span>
                  </div>
                </div>
                
                {total < 500 && (
                  <p className="text-sm text-gray-600 mt-2">
                    Add ₹{(500 - total).toFixed(2)} more for free delivery!
                  </p>
                )}
              </div>
              
              <PaymentButton 
                amount={total + (total > 500 ? 0 : 50)} 
                cartItems={cart as unknown as CartItem[]}
                onSuccess={handlePaymentSuccess}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}