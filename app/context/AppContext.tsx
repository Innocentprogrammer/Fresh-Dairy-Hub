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
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, newQuantity: number) => Promise<void>
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  user: User
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
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
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize data from localStorage
  useEffect(() => {
    try {
      // Load cart from localStorage
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        // Validate cart structure
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart)
        }
      }

      // Load user from localStorage
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser)
        // Validate user structure
        if (parsedUser && typeof parsedUser === 'object' && parsedUser.email) {
          setUser(parsedUser)
        }
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error)
      // Clear corrupted data
      localStorage.removeItem('cart')
      localStorage.removeItem('user')
    } finally {
      setIsInitialized(true)
    }
  }, [])

  // Save cart to localStorage whenever it changes (after initialization)
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('cart', JSON.stringify(cart))
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    }
  }, [cart, isInitialized])

  // Save user to localStorage whenever it changes (after initialization)
  useEffect(() => {
    if (isInitialized) {
      try {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
        } else {
          localStorage.removeItem('user')
        }
      } catch (error) {
        console.error('Error saving user to localStorage:', error)
      }
    }
  }, [user, isInitialized])

  // Add to cart with optional quantity
  const addToCart = (product: Product, quantity: number = 1) => {
    if (quantity < 1) return

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id)
      
      if (existingItem) {
        // Update existing item quantity
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, 99) } // Cap at 99
            : item
        )
      }
      
      // Add new item to cart
      return [...prevCart, { product, quantity: Math.min(quantity, 99) }]
    })
  }

  // Remove item completely from cart
  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId))
  }

  // Update quantity of specific item
  const updateQuantity = async (productId: number, newQuantity: number): Promise<void> => {
    return new Promise((resolve) => {
      if (newQuantity < 1) {
        // Remove item if quantity is less than 1
        removeFromCart(productId)
        resolve()
        return
      }

      if (newQuantity > 99) {
        // Cap quantity at 99
        newQuantity = 99
      }

      setCart(prevCart => {
        const updatedCart = prevCart.map(item =>
          item.product.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
        return updatedCart
      })

      // Simulate async operation (for loading states)
      setTimeout(() => {
        resolve()
      }, 100)
    })
  }

  // Clear entire cart
  const clearCart = () => {
    setCart([])
  }

  // Get total number of items in cart
  const getTotalItems = (): number => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  // Get total price of items in cart
  const getTotalPrice = (): number => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }

  // Login function with improved validation
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format')
      }

      // Password validation (should match your signup requirements)
      const passwordValidation = {
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
        hasMinLength: password.length > 8
      }

      const isPasswordValid = Object.values(passwordValidation).every(Boolean)
      if (!isPasswordValid) {
        throw new Error('Password does not meet requirements')
      }

      // In a real app, you would validate credentials with a backend
      // For this example, we'll simulate a successful login
      setUser({ 
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1), 
        email 
      })
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Signup function with improved validation
  const signup = async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Validation
      if (!name.trim()) {
        throw new Error('Name is required')
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format')
      }

      // Password validation
      const passwordValidation = {
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
        hasMinLength: password.length > 8
      }

      const isPasswordValid = Object.values(passwordValidation).every(Boolean)
      if (!isPasswordValid) {
        throw new Error('Password does not meet requirements')
      }

      // In a real app, you would send this data to a backend
      // For this example, we'll simulate a successful signup
      setUser({ name: name.trim(), email })
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    // Optionally clear cart on logout
    // clearCart()
  }

  const value: AppContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    user,
    login,
    signup,
    logout,
    isLoading
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}