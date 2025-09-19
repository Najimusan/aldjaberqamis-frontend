'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Package, Search, Filter, Eye, Trash2, CheckCircle, Clock, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

interface Order {
  _id: string
  orderNumber: string
  customer: {
    firstName: string
    lastName: string
    phone: string
  }
  items: Array<{
    product: {
      name: string
      price: number
    }
    quantity: number
    selectedSize: string
    selectedColor: string
  }>
  total: number
  status: 'en attente' | 'confirmé' | 'en préparation' | 'expédiée' | 'livrée' | 'annulée'
  subtotal: number
  shippingCost?: number
  delivery: {
    address: string
    city: string
    wilaya: string
    postalCode: string
    notes?: string
  }
  createdAt: string
  updatedAt: string
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [token, setToken] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const router = useRouter()

  const statusOptions = [
    { value: 'en attente', label: 'En attente', color: 'text-yellow-400' },
    { value: 'confirmé', label: 'Confirmé', color: 'text-green-400' },
    { value: 'expédiée', label: 'Expédiée', color: 'text-purple-400' },
    { value: 'livrée', label: 'Livrée', color: 'text-emerald-400' },
    { value: 'annulée', label: 'Annulée', color: 'text-red-400' }
  ]

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken')
    if (!storedToken) {
      router.push('/admin/login')
      return
    }

    // Vérifier les permissions
    fetch('http://localhost:5000/api/auth/verify', {
      headers: {
        'Authorization': `Bearer ${storedToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      // Vérifier si l'utilisateur peut gérer les commandes
      if (!['super_admin', 'admin', 'manager'].includes(data.data.user.role)) {
        router.push('/admin/dashboard')
        return
      }
      setToken(storedToken)
      fetchOrders(storedToken)
    })
    .catch(() => {
      localStorage.removeItem('adminToken')
      router.push('/admin/login')
    })
  }, [searchTerm, statusFilter, currentPage, router])

  const fetchOrders = async (authToken?: string) => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10'
      })
      
      if (searchTerm) params.append('search', searchTerm)
      if (statusFilter) params.append('status', statusFilter)

      const effectiveToken = authToken || token
      console.log('Token utilisé:', effectiveToken)
      console.log('URL appelée:', `http://localhost:5000/api/orders?${params}`)

      const response = await fetch(`http://localhost:5000/api/orders?${params}`, {
        headers: {
          'Authorization': `Bearer ${effectiveToken}`,
          'Content-Type': 'application/json'
        }
      })

      console.log('Réponse status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Commandes admin chargées:', data)
        setOrders(data.data || [])
        setTotalPages(data.pagination?.totalPages || 1)
      } else {
        const errorData = await response.json()
        console.error('Erreur API:', errorData)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des commandes:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        const result = await response.json()
        
        // Si la commande a été supprimée automatiquement (livrée ou annulée)
        if (result.data.deleted) {
          setOrders(orders.filter(order => order._id !== orderId))
          toast.success(result.message)
        } else {
          // Sinon, recharger les commandes
          fetchOrders(token as string)
          toast.success('Statut mis à jour avec succès')
        }
      } else {
        const error = await response.json()
        toast.error(error.message || 'Erreur lors de la mise à jour')
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error)
      toast.error('Erreur lors de la mise à jour du statut')
    }
  }

  const deleteOrder = async (orderId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      return
    }

    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setOrders(orders.filter(order => order._id !== orderId))
        toast.success('Commande supprimée avec succès')
      } else {
        const error = await response.json()
        toast.error(error.message || 'Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      toast.error('Erreur lors de la suppression')
    }
  }

  const openDetailsModal = (order: Order) => {
    setSelectedOrder(order)
    setShowDetailsModal(true)
  }

  const closeDetailsModal = () => {
    setSelectedOrder(null)
    setShowDetailsModal(false)
  }

  const getStatusColor = (status: Order['status']) => {
    const statusConfig = statusOptions.find(s => s.value === status)
    return statusConfig?.color || 'text-gray-400'
  }

  const getStatusLabel = (status: Order['status']) => {
    const statusConfig = statusOptions.find(s => s.value === status)
    return statusConfig?.label || status
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-DZ', {
      style: 'currency',
      currency: 'DZD'
    }).format(price)
  }

  if (!token) {
    return null
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/admin/dashboard')}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour au Dashboard</span>
          </motion.button>
        </div>
        
        <div className="flex items-center space-x-3">
          <Package className="w-8 h-8 text-white" />
          <h1 className="text-2xl font-bold text-white">Gestion des Commandes</h1>
        </div>
        
        <div></div>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher une commande..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          />
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
        >
          <option value="">Tous les statuts</option>
          {statusOptions.map(status => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
        
        <button
          onClick={() => fetchOrders()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Search className="w-4 h-4" />
          <span>Actualiser</span>
        </button>
      </div>

      {/* Liste des commandes */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            Chargement des commandes...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Commande
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Livraison
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Articles
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Montant
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {orders.map((order) => (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        #{order.orderNumber}
                      </div>
                      <div className="text-xs text-gray-400">
                        ID: {order._id.slice(-8)}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        {order.customer.firstName} {order.customer.lastName}
                      </div>
                      <div className="text-xs text-gray-400">
                        📞 {order.customer.phone}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">
                        {order.delivery.address}
                      </div>
                      <div className="text-xs text-gray-400">
                        {order.delivery.city}, {order.delivery.wilaya} {order.delivery.postalCode}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">
                        {order.items.length} article(s)
                      </div>
                      <div className="text-xs text-gray-400">
                        {order.items.map(item => `${item.quantity}x ${item.product?.name || 'Produit supprimé'}`).join(', ')}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        {formatPrice(order.total)}
                      </div>
                      <div className="text-xs text-gray-400">
                        Sous-total: {formatPrice(order.subtotal)}
                        {(order.shippingCost || 0) > 0 && (
                          <span> + Livraison: {formatPrice(order.shippingCost || 0)}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value as Order['status'])}
                        className={`text-xs font-medium px-2 py-1 rounded-full border-0 bg-transparent ${getStatusColor(order.status)}`}
                      >
                        {statusOptions.map(status => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleTimeString('fr-FR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openDetailsModal(order)}
                          className="text-blue-400 hover:text-blue-300"
                          title="Voir les détails"
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteOrder(order._id)}
                          className="text-red-400 hover:text-red-300"
                          title="Supprimer la commande"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
          >
            Précédent
          </button>
          <span className="px-4 py-2 text-white">
            Page {currentPage} sur {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
          >
            Suivant
          </button>
        </div>
      )}

      {/* Modal de détails de la commande */}
      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Détails de la commande #{selectedOrder.orderNumber}
                </h2>
                <button
                  onClick={closeDetailsModal}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Informations client */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">Informations Client</h3>
                  <div className="space-y-2">
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Nom:</span> {selectedOrder.customer.firstName} {selectedOrder.customer.lastName}
                    </p>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Téléphone:</span> {selectedOrder.customer.phone}
                    </p>
                  </div>
                </div>

                {/* Adresse de livraison */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">Adresse de Livraison</h3>
                  <div className="space-y-2">
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Adresse:</span> {selectedOrder.delivery.address}
                    </p>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Ville:</span> {selectedOrder.delivery.city}
                    </p>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Wilaya:</span> {selectedOrder.delivery.wilaya}
                    </p>
                    <p className="text-gray-300">
                      <span className="font-medium text-white">Code postal:</span> {selectedOrder.delivery.postalCode}
                    </p>
                    {selectedOrder.delivery.notes && (
                      <p className="text-gray-300">
                        <span className="font-medium text-white">Notes:</span> {selectedOrder.delivery.notes}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Articles commandés */}
              <div className="bg-gray-700 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Articles Commandés</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-600 p-3 rounded">
                      <div>
                        <p className="text-white font-medium">{item.product?.name || 'Produit supprimé'}</p>
                        <p className="text-gray-400 text-sm">
                          Taille: {item.selectedSize} | Couleur: {item.selectedColor}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-white">Quantité: {item.quantity}</p>
                        <p className="text-gray-400">{formatPrice(item.product.price)} × {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Résumé financier */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">Résumé Financier</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Sous-total:</span>
                    <span className="text-white">{formatPrice(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Livraison:</span>
                    <span className="text-white">
                      {selectedOrder.shippingCost && selectedOrder.shippingCost > 0 ? formatPrice(selectedOrder.shippingCost) : 'Gratuite'}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t border-gray-600 pt-2">
                    <span className="text-white">Total:</span>
                    <span className="text-white">{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={closeDetailsModal}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
                >
                  Fermer
                </button>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => {
                    updateOrderStatus(selectedOrder._id, e.target.value as Order['status'])
                    setSelectedOrder({...selectedOrder, status: e.target.value as Order['status']})
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {statusOptions.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default OrdersPage