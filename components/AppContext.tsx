'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Product = {
  id: number
  name: string
  price: number
  image: string
}

type CartItem = {
  product: Product
  quantity: number
}

type User = {
  name: string
  email: string
} | null

type AppContextType = {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  user: User
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }

    // Load user from localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    // Save user to localStorage whenever it changes
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId))
  }

  const login = async (email: string) => {
    // In a real app, you would validate credentials with a backend
    // For this example, we'll just set a user if the email includes "@"
    if (email.includes('@')) {
      setUser({ name: email.split('@')[0], email })
    } else {
      throw new Error('Invalid email')
    }
  }

  const signup = async (name: string, email: string) => {
    // In a real app, you would send this data to a backend
    // For this example, we'll just set a user if the email includes "@"
    if (email.includes('@')) {
      setUser({ name, email })
    } else {
      throw new Error('Invalid email')
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AppContext.Provider value={{ cart, addToCart, removeFromCart, user, login, signup, logout }}>
      {children}
    </AppContext.Provider>
  )
}

