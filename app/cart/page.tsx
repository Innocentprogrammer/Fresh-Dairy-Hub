'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useAppContext } from '../context/AppContext'

export default function Cart() {
  const { cart, removeFromCart } = useAppContext()

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
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
                <p className="text-lg font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                <button 
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
          <div className="mt-8 text-right">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
          </div>
        </div>
      )}
      <motion.button
        className="mt-8 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Proceed to Checkout
      </motion.button>
    </div>
  )
}

