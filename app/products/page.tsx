'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Info } from 'lucide-react'
import ProductDetailsModal from '../components/ProductDetailsModal'
import type { Product } from "../types/product";


const products = [
  { id: 1, name: "Fresh Milk", price: 60.99, image: "/images/FreshMilk.jpg", description: "Farm-fresh milk, rich in nutrients and perfect for your daily needs." },
  { id: 2, name: "Organic Yogurt", price: 100.99, image: "/images/OrganicYogurt.jpg", description: "Creamy organic yogurt, packed with probiotics for a healthy gut." },
  { id: 3, name: "Artisan Cheese", price: 150.99, image: "/images/ArtisanCheese.jpg", description: "Hand-crafted artisan cheese, perfect for your cheese board or cooking." },
  { id: 4, name: "Butter", price: 20.49, image: "/images/Butter.jpg", description: "Creamy, golden butter made from the finest cream." },
  { id: 5, name: "Cream", price: 40.49, image: "/images/Cream.jpg", description: "Rich, velvety cream perfect for cooking or topping desserts." },
  { id: 6, name: "Ice Cream", price: 50.99, image: "/images/IceCream.jpg", description: "Delicious, creamy ice cream in various flavors." },
  { id: 7, name: "Cottage Cheese", price: 80.79, image: "/images/CottageCheese.jpg", description: "Fresh, protein-rich cottage cheese, great for snacks or cooking." },
  { id: 8, name: "Whipped Cream", price: 100.99, image: "/images/WhippedCream.jpg", description: "Light and fluffy whipped cream, perfect for desserts." },
]


export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product| null>(null)

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <motion.div 
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image src={product.image} alt={product.name} width={300} height={200} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">Fresh from our local dairy farms.</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-600 font-bold">₹{product.price.toFixed(2)}</span>
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
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  )
}

