'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Share2, Truck, Shield, RotateCcw, Star } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductImageViewer from '@/components/ProductImageViewer'
import { productsApi } from '@/lib/api'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/context/CartContext'
import toast from 'react-hot-toast'

const ProductDetailPage: React.FC = () => {
  const params = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const productData = await productsApi.getById(params.id as string)
        setProduct(productData)
        setSelectedSize(productData.sizes[0] || '')
        const firstColor = Array.isArray(productData.colors) && productData.colors.length > 0
          ? (typeof productData.colors[0] === 'string' 
              ? String(productData.colors[0]) 
              : (productData.colors[0]?.name || productData.colors[0]?.hex || ''))
          : ''
        setSelectedColor(firstColor)
      } catch (error) {
        console.error('Erreur lors du chargement du produit:', error)
        toast.error('Produit non trouvé')
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const handleAddToCart = () => {
    if (!product) return

    if (!selectedSize || !selectedColor) {
      toast.error('Veuillez sélectionner une taille et une couleur')
      return
    }

    addToCart(product, quantity, selectedSize, selectedColor)
    toast.success('Produit ajouté au panier')
  }


  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: product?.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Erreur lors du partage:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast.success('Lien copié dans le presse-papiers')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-950">
        <Header />
        <main className="pt-16">
          <div className="container-custom section-padding py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="w-full h-96 bg-dark-800 rounded-xl animate-pulse" />
                <div className="grid grid-cols-4 gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="w-full h-20 bg-dark-800 rounded-lg animate-pulse" />
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-8 bg-dark-800 rounded animate-pulse" />
                <div className="h-6 bg-dark-800 rounded w-3/4 animate-pulse" />
                <div className="h-12 bg-dark-800 rounded w-1/2 animate-pulse" />
                <div className="space-y-3">
                  <div className="h-4 bg-dark-800 rounded animate-pulse" />
                  <div className="h-4 bg-dark-800 rounded animate-pulse" />
                  <div className="h-4 bg-dark-800 rounded w-2/3 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-dark-950">
        <Header />
        <main className="pt-16">
          <div className="container-custom section-padding py-12 text-center">
            <div className="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star size={48} className="text-dark-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Produit non trouvé</h1>
            <p className="text-dark-300 mb-6">Le produit que vous recherchez n'existe pas ou a été supprimé.</p>
            <a href="/catalogue" className="btn-primary">
              Retour au catalogue
            </a>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      
      <main className="pt-16">
        <div className="container-custom section-padding py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images avec visualisation complète */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ProductImageViewer
                images={product.images}
                productName={product.name}
                className="w-full"
              />
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-dark-400 text-sm font-medium uppercase tracking-wide">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleShare}
                      className="p-2 text-dark-400 hover:text-white transition-colors duration-300"
                    >
                      <Share2 size={24} />
                    </motion.button>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">{product.name}</h1>
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-white">
                    {formatPrice(product.price)}
                  </span>
                  {product.stock > 0 && (
                    <span className="text-dark-400">
                      {product.stock} en stock
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                <p className="text-dark-300 leading-relaxed">{product.description}</p>
              </div>

              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Taille</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <motion.button
                        key={size}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                          selectedSize === size
                            ? 'bg-white text-dark-950 border-white'
                            : 'bg-transparent text-white border-dark-600 hover:border-dark-400'
                        }`}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Couleur</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((colorItem: any) => {
                      const colorName = typeof colorItem === 'string' ? colorItem : (colorItem?.name || colorItem?.hex || '')
                      const colorHex = typeof colorItem === 'string' ? undefined : colorItem?.hex
                      const isSelected = selectedColor === colorName || (!!colorHex && selectedColor === colorHex)

                      return (
                        <motion.button
                          key={colorHex || colorName}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedColor(colorName || colorHex || '')}
                          className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                            isSelected
                              ? 'bg-white text-dark-950 border-white'
                              : 'bg-transparent text-white border-dark-600 hover:border-dark-400'
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
                        </motion.button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Quantité</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-dark-600 rounded-lg">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-white hover:text-dark-300 transition-colors duration-300"
                    >
                      -
                    </motion.button>
                    <span className="px-4 py-2 text-white font-medium">{quantity}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-2 text-white hover:text-dark-300 transition-colors duration-300"
                    >
                      +
                    </motion.button>
                  </div>
                  <span className="text-dark-400 text-sm">
                    Max: {product.stock}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0 || !selectedSize || !selectedColor}
                className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
              </motion.button>

              {/* Features */}
              {product.features && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Caractéristiques</h3>
                  <div className="space-y-2">
                    {product.features.material && (
                      <div className="flex justify-between">
                        <span className="text-dark-300">Matière:</span>
                        <span className="text-white">{product.features.material}</span>
                      </div>
                    )}
                    {product.features.care && (
                      <div className="flex justify-between">
                        <span className="text-dark-300">Entretien:</span>
                        <span className="text-white">{product.features.care}</span>
                      </div>
                    )}
                    {product.features.origin && (
                      <div className="flex justify-between">
                        <span className="text-dark-300">Origine:</span>
                        <span className="text-white">{product.features.origin}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Service Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-dark-800">
                <div className="text-center">
                  <Truck className="mx-auto mb-2 text-white" size={24} />
                  <p className="text-sm text-dark-300">Livraison gratuite</p>
                </div>
                <div className="text-center">
                  <Shield className="mx-auto mb-2 text-white" size={24} />
                  <p className="text-sm text-dark-300">Garantie qualité</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="mx-auto mb-2 text-white" size={24} />
                  <p className="text-sm text-dark-300">Retours faciles</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ProductDetailPage




