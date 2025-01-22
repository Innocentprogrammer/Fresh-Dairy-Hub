'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart, Info } from 'lucide-react'
import { useAppContext } from './context/AppContext'
import ProductDetailsModal from './components/ProductDetailsModal'

const trendingProducts = [
  { id: 1, name: "Fresh Milk", price: 2.99, image: "/images/FreshMilk.jpg", description: "Farm-fresh milk, rich in nutrients and perfect for your daily needs." },
  { id: 2, name: "Organic Yogurt", price: 3.99, image: "/images/OrganicYogurt.jpg", description: "Creamy organic yogurt, packed with probiotics for a healthy gut." },
  { id: 3, name: "Artisan Cheese", price: 5.99, image: "/images/ArtisanCheese.jpg", description: "Hand-crafted artisan cheese, perfect for your cheese board or cooking." },
]

const newlyAddedProducts = [
  { id: 4, name: "Butter", price: 2.49, image: "/images/Butter.jpg", description: "Creamy, golden butter made from the finest cream." },
  { id: 5, name: "Cream", price: 3.49, image: "/images/Cream.jpg", description: "Rich, velvety cream perfect for cooking or topping desserts." },
  { id: 6, name: "Ice Cream", price: 4.99, image: "/images/IceCream.jpg", description: "Delicious, creamy ice cream in various flavors." },
  { id: 7, name: "Cottage Cheese", price: 3.79, image: "/images/CottageCheese.jpg", description: "Fresh, protein-rich cottage cheese, great for snacks or cooking." },
]

export default function Home() {
  const { addToCart } = useAppContext()
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <Image
          src="/images/FreshDairyProducts.jpg"
          alt="Fresh Dairy Products"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10 text-white">
          <motion.h1 
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to Fresh Dairy Hub
          </motion.h1>
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover the freshest dairy products for your daily needs
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/products" className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300">
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Trending Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingProducts.map((product) => (
              <motion.div 
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <Image src={product.image} alt={product.name} width={300} height={200} className="w-full h-48 object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">Freshly sourced from local farms.</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-600 font-bold">${product.price.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                  >
                    <Info className="mr-2" size={16} />
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newly Added Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Newly Added</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {newlyAddedProducts.map((product) => (
              <motion.div 
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <Image src={product.image} alt={product.name} width={300} height={200} className="w-full h-48 object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">Fresh from our dairy farms to your table.</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-600 font-bold">${product.price.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                  >
                    <Info className="mr-2" size={16} />
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((review) => (
              <motion.div 
                key={review}
                className="bg-white rounded-lg shadow-md p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  <Image src={`/avatar-${review}.jpg`} alt={`Customer ${review}`} width={40} height={40} className="rounded-full mr-4" />
                  <div>
                    <h3 className="font-semibold">Customer {review}</h3>
                    <div className="text-yellow-400">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  )
}

