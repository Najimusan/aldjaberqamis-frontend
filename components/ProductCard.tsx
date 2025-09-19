'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Eye } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/context/CartContext'
import ProductPlaceholder from './ProductPlaceholder'
import { getImageUrl } from '@/lib/api'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '')
  const [imageError, setImageError] = useState(false)
  // Colors can be strings or objects { name, hex }
  const initialColor = Array.isArray(product.colors) && product.colors.length > 0
    ? (typeof product.colors[0] === 'string' ? String(product.colors[0]) : (product.colors[0] as any).name || (product.colors[0] as any).hex || '')
    : ''
  const [selectedColor, setSelectedColor] = useState(initialColor)
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!selectedSize || !selectedColor) {
      toast.error('Veuillez sélectionner une taille et une couleur')
      return
    }

    addToCart(product, 1, selectedSize, selectedColor)
    toast.success('Produit ajouté au panier')
  }


  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group bg-dark-800 rounded-xl overflow-hidden border border-dark-700 hover:border-dark-600 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/produit/${product._id}`}>
        {/* Image Container */}
        <div className="relative h-64 bg-dark-700 overflow-hidden">
          {product.images[0] && !imageError ? (
            <Image
              src={getImageUrl(product.images[0])}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImageError(true)}
              unoptimized
            />
          ) : (
            <ProductPlaceholder 
              width={400} 
              height={256} 
              className="w-full h-full"
              text={product.name}
            />
          )}

          {/* Overlay with actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
            >
              <Eye size={20} />
            </motion.button>
          </motion.div>

          {/* Stock indicator */}
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-3 left-3 bg-yellow-500 text-dark-950 text-xs font-bold px-2 py-1 rounded-full">
              Plus que {product.stock} en stock
            </div>
          )}

          {/* Out of stock overlay */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <span className="text-white font-semibold">Rupture de stock</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <p className="text-dark-400 text-sm font-medium mb-2 capitalize">
            {product.category}
          </p>

          {/* Title */}
          <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-dark-300 transition-colors duration-300">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-dark-400 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Size and Color Selection */}
          {isHovered && product.sizes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4 space-y-3"
            >
              {/* Sizes */}
              {product.sizes.length > 0 && (
                <div>
                  <p className="text-dark-300 text-sm mb-2">Taille:</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setSelectedSize(size)
                        }}
                        className={`px-3 py-1 text-xs rounded-full border transition-all duration-300 ${
                          selectedSize === size
                            ? 'bg-white text-dark-950 border-white'
                            : 'bg-transparent text-dark-300 border-dark-600 hover:border-dark-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {product.colors.length > 0 && (
                <div>
                  <p className="text-dark-300 text-sm mb-2">Couleur:</p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((colorItem: any) => {
                      const colorName = typeof colorItem === 'string' ? colorItem : (colorItem?.name || colorItem?.hex || '')
                      const colorHex = typeof colorItem === 'string' ? undefined : colorItem?.hex
                      const isSelected = selectedColor === colorName || (!!colorHex && selectedColor === colorHex)

                      return (
                        <button
                          key={colorHex || colorName}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setSelectedColor(colorName || colorHex || '')
                          }}
                          className={`px-3 py-1 text-xs rounded-full border transition-all duration-300 ${
                            isSelected
                              ? 'bg-white text-dark-950 border-white'
                              : 'bg-transparent text-dark-300 border-dark-600 hover:border-dark-400'
                          }`}
                          title={colorName}
                        >
                          <span className="inline-flex items-center gap-2">
                            {colorHex ? (
                              <span
                                aria-hidden
                                className="inline-block w-3 h-3 rounded-full border border-dark-600"
                                style={{ backgroundColor: colorHex }}
                              />
                            ) : null}
                            {colorName}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-bold text-xl">
                {formatPrice(product.price)}
              </p>
              {product.stock > 0 && (
                <p className="text-dark-400 text-sm">
                  {product.stock} en stock
                </p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0 || !selectedSize || !selectedColor}
              className="p-3 bg-white text-dark-950 rounded-lg hover:bg-dark-200 disabled:bg-dark-700 disabled:text-dark-400 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ShoppingCart size={20} />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard




