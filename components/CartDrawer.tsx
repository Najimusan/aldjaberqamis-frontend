'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { state: cartState, updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (productId: string, selectedSize: string, selectedColor: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, selectedSize, selectedColor)
    } else {
      updateQuantity(productId, selectedSize, selectedColor, newQuantity)
    }
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
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-dark-900 border-l border-dark-800 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-dark-800">
              <h2 className="text-xl font-semibold text-white">Panier</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 text-dark-400 hover:text-white transition-colors duration-300"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {cartState.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <ShoppingBag size={64} className="text-dark-600 mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Votre panier est vide</h3>
                  <p className="text-dark-400 mb-6">Découvrez nos produits et ajoutez-les à votre panier</p>
                  <Link
                    href="/catalogue"
                    onClick={onClose}
                    className="btn-primary"
                  >
                    Voir le catalogue
                  </Link>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {cartState.items.filter(item => item.product).map((item, index) => (
                    <motion.div
                      key={`${item.product!._id}-${item.selectedSize}-${item.selectedColor}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-dark-800 rounded-lg"
                    >
                      {/* Image */}
                      <div className="w-16 h-16 bg-dark-700 rounded-lg overflow-hidden flex-shrink-0">
                        {item.product!.images[0] ? (
                          <img
                            src={item.product!.images[0]}
                            alt={item.product!.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-dark-400">
                            <ShoppingBag size={24} />
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium truncate">{item.product!.name}</h4>
                        <p className="text-dark-400 text-sm">
                          Taille: {item.selectedSize} | Couleur: {item.selectedColor}
                        </p>
                        <p className="text-white font-semibold">{formatPrice(item.product!.price)}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleQuantityChange(
                            item.product!._id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity - 1
                          )}
                          className="p-1 text-dark-400 hover:text-white transition-colors duration-300"
                        >
                          <Minus size={16} />
                        </motion.button>
                        <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleQuantityChange(
                            item.product!._id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity + 1
                          )}
                          className="p-1 text-dark-400 hover:text-white transition-colors duration-300"
                        >
                          <Plus size={16} />
                        </motion.button>
                      </div>

                      {/* Remove Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => removeFromCart(
                          item.product!._id,
                          item.selectedSize,
                          item.selectedColor
                        )}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors duration-300"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartState.items.length > 0 && (
              <div className="border-t border-dark-800 p-6 space-y-4">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span className="text-white">Total:</span>
                  <span className="text-white">{formatPrice(cartState.total)}</span>
                </div>
                <div className="space-y-2">
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="w-full btn-primary text-center block"
                  >
                    Commander maintenant
                  </Link>
                  <Link
                    href="/catalogue"
                    onClick={onClose}
                    className="w-full btn-secondary text-center block"
                  >
                    Continuer mes achats
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer





