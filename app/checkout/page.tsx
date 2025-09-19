'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { CreditCard, MapPin, User, Phone } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/context/CartContext'
import { ordersApi } from '@/lib/api'
import { wilayas } from '@/lib/wilayas'
import { formatPrice, generateOrderNumber } from '@/lib/utils'
import toast from 'react-hot-toast'

interface CheckoutForm {
  customer: {
    firstName: string
    lastName: string
    phone: string
  }
  delivery: {
    address: string
    city: string
    wilaya: string
    postalCode: string
    notes?: string
  }
}

const CheckoutPage: React.FC = () => {
  const router = useRouter()
  const { state: cartState, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors }, watch } = useForm<CheckoutForm>()

  const shipping = cartState.total >= 5000 ? 0 : 500
  const finalTotal = cartState.total + shipping

  const onSubmit = async (data: CheckoutForm) => {
    if (cartState.items.length === 0) {
      toast.error('Votre panier est vide')
      return
    }

    setIsSubmitting(true)

    try {
      const orderData = {
        ...data,
        items: cartState.items.filter(item => item.product).map(item => ({
          product: item.product!._id,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
          price: item.product!.price
        })),
        subtotal: cartState.total,
        shipping,
        total: finalTotal
      }

      const order = await ordersApi.create(orderData as any)
      
      // Clear cart
      clearCart()
      
      // Redirect to success page
      router.push(`/commande/${order._id}`)
      
      toast.success('Commande passée avec succès!')
    } catch (error) {
      console.error('Erreur lors de la commande:', error)
      toast.error('Erreur lors de la commande. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cartState.items.length === 0) {
    return (
      <div className="min-h-screen bg-dark-950">
        <Header />
        <main className="pt-16">
          <div className="container-custom section-padding py-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard size={48} className="text-dark-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">Votre panier est vide</h1>
              <p className="text-dark-300 mb-6">Ajoutez des produits à votre panier avant de passer commande.</p>
              <button
                onClick={() => router.push('/catalogue')}
                className="btn-primary"
              >
                Voir le catalogue
              </button>
            </motion.div>
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-3xl font-bold text-white mb-8 text-center">
              Finaliser votre commande
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Customer Information */}
                  <div className="card">
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                      <User className="mr-2" size={20} />
                      Informations personnelles
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label">Prénom *</label>
                        <input
                          {...register('customer.firstName', { required: 'Le prénom est requis' })}
                          className="input-field"
                          placeholder="Votre prénom"
                        />
                        {errors.customer?.firstName && (
                          <p className="form-error">{errors.customer.firstName.message}</p>
                        )}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Nom *</label>
                        <input
                          {...register('customer.lastName', { required: 'Le nom est requis' })}
                          className="input-field"
                          placeholder="Votre nom"
                        />
                        {errors.customer?.lastName && (
                          <p className="form-error">{errors.customer.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      <div className="form-group">
                        <label className="form-label">Téléphone *</label>
                        <input
                          {...register('customer.phone', { 
                            required: 'Le téléphone est requis',
                            pattern: {
                              value: /^(\+213|0)[5-7][0-9]{8}$/,
                              message: 'Numéro de téléphone algérien invalide'
                            }
                          })}
                          className="input-field"
                          placeholder="0555123456"
                        />
                        {errors.customer?.phone && (
                          <p className="form-error">{errors.customer.phone.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Delivery Information */}
                  <div className="card">
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                      <MapPin className="mr-2" size={20} />
                      Adresse de livraison
                    </h2>

                    <div className="form-group">
                      <label className="form-label">Adresse complète *</label>
                      <input
                        {...register('delivery.address', { required: 'L\'adresse est requise' })}
                        className="input-field"
                        placeholder="Rue, quartier, numéro..."
                      />
                      {errors.delivery?.address && (
                        <p className="form-error">{errors.delivery.address.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label">Ville *</label>
                        <input
                          {...register('delivery.city', { required: 'La ville est requise' })}
                          className="input-field"
                          placeholder="Votre ville"
                        />
                        {errors.delivery?.city && (
                          <p className="form-error">{errors.delivery.city.message}</p>
                        )}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Wilaya *</label>
                        <select
                          {...register('delivery.wilaya', { required: 'La wilaya est requise' })}
                          className="input-field"
                        >
                          <option value="">Sélectionner une wilaya</option>
                          {wilayas.map(wilaya => (
                            <option key={wilaya.code} value={wilaya.name}>
                              {wilaya.name}
                            </option>
                          ))}
                        </select>
                        {errors.delivery?.wilaya && (
                          <p className="form-error">{errors.delivery.wilaya.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label">Code postal *</label>
                        <input
                          {...register('delivery.postalCode', { 
                            required: 'Le code postal est requis',
                            pattern: {
                              value: /^\d{5}$/,
                              message: 'Code postal invalide (5 chiffres)'
                            }
                          })}
                          className="input-field"
                          placeholder="16000"
                        />
                        {errors.delivery?.postalCode && (
                          <p className="form-error">{errors.delivery.postalCode.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Notes de livraison (optionnel)</label>
                      <textarea
                        {...register('delivery.notes')}
                        className="input-field h-24 resize-none"
                        placeholder="Instructions spéciales pour la livraison..."
                      />
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="card">
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                      <CreditCard className="mr-2" size={20} />
                      Paiement
                    </h2>
                    
                    <div className="bg-dark-800 rounded-lg p-4">
                      <p className="text-dark-300 text-sm mb-2">
                        <strong>Mode de paiement :</strong> Paiement à la livraison
                      </p>
                      <p className="text-dark-300 text-sm">
                        Vous paierez votre commande en espèces lors de la livraison. 
                        Le livreur vous remettra un reçu.
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Traitement...' : 'Confirmer la commande'}
                  </motion.button>
                </form>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                <div className="card">
                  <h2 className="text-xl font-semibold text-white mb-6">
                    Résumé de la commande
                  </h2>

                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    {cartState.items.filter(item => item.product).map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-dark-800 rounded-lg">
                        <div className="w-16 h-16 bg-dark-700 rounded-lg overflow-hidden flex-shrink-0">
                          {item.product!.images[0] ? (
                            <img
                              src={item.product!.images[0]}
                              alt={item.product!.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-dark-400">
                              <CreditCard size={24} />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium truncate">{item.product!.name}</h4>
                          <p className="text-dark-400 text-sm">
                            {item.selectedSize} • {item.selectedColor}
                          </p>
                          <p className="text-dark-400 text-sm">
                            Quantité: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">
                            {formatPrice(item.product!.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Totals */}
                  <div className="space-y-3 border-t border-dark-700 pt-4">
                    <div className="flex justify-between">
                      <span className="text-dark-300">Sous-total</span>
                      <span className="text-white">{formatPrice(cartState.total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-300">Livraison</span>
                      <span className="text-white">
                        {shipping === 0 ? 'Gratuite' : formatPrice(shipping)}
                      </span>
                    </div>
                    {shipping === 0 && (
                      <p className="text-green-400 text-sm">
                        ✓ Livraison gratuite pour les commandes de plus de 5000 DA
                      </p>
                    )}
                    <div className="flex justify-between text-lg font-semibold border-t border-dark-700 pt-3">
                      <span className="text-white">Total</span>
                      <span className="text-white">{formatPrice(finalTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Order Info */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Informations importantes
                  </h3>
                  <div className="space-y-3 text-sm text-dark-300">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                      <p>Votre commande sera traitée dans les 24h</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                      <p>Livraison gratuite pour les commandes de plus de 5000 DA</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                      <p>Délai de livraison: 2-5 jours ouvrés</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                      <p>Paiement à la livraison uniquement</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default CheckoutPage


