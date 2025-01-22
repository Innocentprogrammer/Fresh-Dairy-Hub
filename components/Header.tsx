'use client'

import Link from 'next/link'
import { ShoppingCart, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAppContext } from '../app/context/AppContext'

export default function Header() {
  const { cart, user, logout } = useAppContext()

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <motion.header 
      className="bg-white shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">Fresh Dairy Hub</Link>
        <div className="flex items-center">
          <Link href="/products" className="text-gray-800 hover:text-blue-600 px-3 py-2">Products</Link>
          {user ? (
            <div className="flex items-center">
              <span className="text-gray-800 px-3 py-2">Welcome, {user.name}</span>
              <button onClick={logout} className="text-gray-800 hover:text-blue-600 px-3 py-2">Logout</button>
            </div>
          ) : (
            <Link href="/auth" className="text-gray-800 hover:text-blue-600 px-3 py-2">
              <User className="inline-block mr-1" size={18} />
              Login / Sign Up
            </Link>
          )}
          <Link href="/cart" className="text-gray-800 hover:text-blue-600 px-3 py-2 flex items-center">
            <ShoppingCart className="inline-block mr-1" size={18} />
            <span>Cart ({cartItemsCount})</span>
          </Link>
        </div>
      </nav>
    </motion.header>
  )
}

