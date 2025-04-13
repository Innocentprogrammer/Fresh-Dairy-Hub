'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useAppContext } from '../context/AppContext'
import PaymentButton from '../components/PaymentButton'

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useAppContext()
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  
  const handlePaymentSuccess = () => {
    // Clear cart using the context function
    clearCart();
  };
  
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
              >
                <Image 
                  src={item.product.image}
                  alt={item.product.name}
                  width={80} 
                  height={80} 
                  className="rounded-md" 
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.product.name}</h2>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <div className="ml-auto">
                  <p className="text-lg font-bold">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>₹50.00</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{(total + 50).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <PaymentButton 
                amount={total + 50} 
                cartItems={cart}
                onSuccess={handlePaymentSuccess}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}