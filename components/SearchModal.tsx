'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, Loader2 } from 'lucide-react'
import { productsApi } from '@/lib/api'
import { Product } from '@/types'
import Link from 'next/link'
import Image from 'next/image'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setResults([])
      setHasSearched(false)
    }
  }, [isOpen])

  useEffect(() => {
    const searchProducts = async () => {
      if (query.trim().length < 2) {
        setResults([])
        setHasSearched(false)
        return
      }

      setIsLoading(true)
      setHasSearched(true)

      try {
        const response = await productsApi.getAll({ search: query.trim() }, 1, 8)
        setResults(response.data)
      } catch (error) {
        console.error('Erreur lors de la recherche:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    const timeoutId = setTimeout(searchProducts, 300)
    return () => clearTimeout(timeoutId)
  }, [query])

  const handleClose = () => {
    setQuery('')
    setResults([])
    setHasSearched(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl mx-4 bg-dark-900 border border-dark-800 rounded-xl shadow-2xl z-50"
          >
            {/* Header */}
            <div className="flex items-center p-6 border-b border-dark-800">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" size={20} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher un produit..."
                  className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                  autoFocus
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClose}
                className="ml-4 p-2 text-dark-400 hover:text-white transition-colors duration-300"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="max-h-96 overflow-y-auto">
              {!hasSearched && query.length < 2 ? (
                <div className="p-6 text-center text-dark-400">
                  <Search size={48} className="mx-auto mb-4 text-dark-600" />
                  <p>Tapez au moins 2 caractères pour commencer la recherche</p>
                </div>
              ) : isLoading ? (
                <div className="p-6 text-center text-dark-400">
                  <Loader2 size={48} className="mx-auto mb-4 animate-spin text-white" />
                  <p>Recherche en cours...</p>
                </div>
              ) : results.length === 0 && hasSearched ? (
                <div className="p-6 text-center text-dark-400">
                  <Search size={48} className="mx-auto mb-4 text-dark-600" />
                  <p>Aucun produit trouvé pour "{query}"</p>
                  <p className="text-sm mt-2">Essayez avec d'autres mots-clés</p>
                </div>
              ) : (
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-white font-medium">
                      {results.length} résultat{results.length > 1 ? 's' : ''} pour "{query}"
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {results.map((product, index) => (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Link
                          href={`/produit/${product._id}`}
                          onClick={handleClose}
                          className="flex items-center space-x-4 p-4 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors duration-300 group"
                        >
                          <div className="w-16 h-16 bg-dark-700 rounded-lg overflow-hidden flex-shrink-0">
                            {product.images[0] ? (
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-dark-400">
                                <Search size={24} />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-medium truncate group-hover:text-dark-300 transition-colors duration-300">
                              {product.name}
                            </h4>
                            <p className="text-dark-400 text-sm truncate">
                              {product.description}
                            </p>
                            <p className="text-white font-semibold">
                              {new Intl.NumberFormat('fr-DZ', {
                                style: 'currency',
                                currency: 'DZD',
                                minimumFractionDigits: 0,
                              }).format(product.price)}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {results.length > 0 && (
              <div className="p-6 border-t border-dark-800">
                <Link
                  href={`/catalogue?search=${encodeURIComponent(query)}`}
                  onClick={handleClose}
                  className="w-full btn-secondary text-center block"
                >
                  Voir tous les résultats
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SearchModal





