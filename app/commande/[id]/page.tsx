'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Package, MapPin, Phone, Mail, CheckCircle, Clock, X } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface OrderItem {
  product: {
    _id: string
    name: string
    price: number
    images: string[]
  }
  quantity: number
  price: number
}

interface Order {
  _id: string
  orderNumber: string
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: {
      street: string
      city: string
      wilaya: string
      postalCode: string
    }
  }
  items: OrderItem[]
  total: number
  status: 'paiement en attente' | 'confirmé' | 'expédié' | 'livré' | 'annulé'
  notes?: string
  createdAt: string
  updatedAt: string
}

const OrderPage: React.FC = () => {
  const params = useParams()
  const orderId = params.id as string
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (orderId) {
      fetchOrder()
    }
  }, [orderId])

  const fetchOrder = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`)
      if (response.ok) {
        const data = await response.json()
        setOrder(data.order)
      } else {
        setError('Commande non trouvée')
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la commande:', error)
      setError('Erreur lors du chargement de la commande')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paiement en attente':
        return 'text-yellow-400 bg-yellow-400/20'
      case 'confirmé':
        return 'text-blue-400 bg-blue-400/20'
      case 'expédié':
        return 'text-purple-400 bg-purple-400/20'
      case 'livré':
        return 'text-green-400 bg-green-400/20'
      case 'annulé':
        return 'text-red-400 bg-red-400/20'
      default:
        return 'text-gray-400 bg-gray-400/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paiement en attente':
        return <Clock className="w-4 h-4" />
      case 'confirmé':
        return <CheckCircle className="w-4 h-4" />
      case 'expédié':
        return <Package className="w-4 h-4" />
      case 'livré':
        return <CheckCircle className="w-4 h-4" />
      case 'annulé':
        return <X className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 py-12 text-center">
            <div className="text-gray-400 text-lg">Chargement de la commande...</div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 py-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900 p-8 rounded-lg"
            >
              <X className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-white mb-4">Commande non trouvée</h1>
              <p className="text-gray-400 mb-6">{error}</p>
              <Link
                href="/catalogue"
                className="inline-block px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Retour au catalogue
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/catalogue"
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au catalogue
            </Link>
            <h1 className="text-3xl font-bold text-white">Détails de la commande</h1>
            <p className="text-gray-400">Commande #{order.orderNumber}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informations de la commande */}
            <div className="lg:col-span-2 space-y-6">
              {/* Statut */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900 p-6 rounded-lg"
              >
                <h2 className="text-xl font-semibold text-white mb-4">Statut de la commande</h2>
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <p className="text-white font-semibold capitalize">{order.status}</p>
                    <p className="text-gray-400 text-sm">
                      Commande passée le {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Articles commandés */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-900 p-6 rounded-lg"
              >
                <h2 className="text-xl font-semibold text-white mb-4">Articles commandés</h2>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-4 border-b border-gray-700 last:border-b-0">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.product.images[0] || 'https://via.placeholder.com/80x80/ffffff/000000?text=Produit'}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="text-white font-medium">{item.product.name}</h3>
                          <p className="text-gray-400 text-sm">Quantité: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-white font-semibold">
                        {(item.price * item.quantity).toLocaleString('fr-DZ')} DZD
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Informations de livraison */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-900 p-6 rounded-lg"
              >
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Adresse de livraison
                </h2>
                <div className="text-gray-300">
                  <p className="font-medium">{order.customer.firstName} {order.customer.lastName}</p>
                  <p>{order.customer.address.street}</p>
                  <p>{order.customer.address.city}, {order.customer.address.wilaya}</p>
                  {order.customer.address.postalCode && (
                    <p>{order.customer.address.postalCode}</p>
                  )}
                </div>
              </motion.div>

              {/* Notes */}
              {order.notes && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gray-900 p-6 rounded-lg"
                >
                  <h2 className="text-xl font-semibold text-white mb-4">Notes</h2>
                  <p className="text-gray-300">{order.notes}</p>
                </motion.div>
              )}
            </div>

            {/* Résumé */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-900 p-6 rounded-lg h-fit"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Résumé</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Sous-total</span>
                  <span>{order.total.toLocaleString('fr-DZ')} DZD</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Livraison</span>
                  <span>Gratuite</span>
                </div>
                <div className="flex justify-between text-white font-semibold text-lg border-t border-gray-700 pt-2">
                  <span>Total</span>
                  <span>{order.total.toLocaleString('fr-DZ')} DZD</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact
                  </h3>
                  <p className="text-gray-300 text-sm">{order.customer.phone}</p>
                  <p className="text-gray-300 text-sm">{order.customer.email}</p>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Paiement
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Paiement à la livraison en espèces
                  </p>
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

export default OrderPage