'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Shield, Users, Package, ShoppingCart, BarChart3, LogOut, RefreshCw, TrendingUp, TrendingDown, RotateCcw, AlertTriangle } from 'lucide-react'

const AdminDashboard: React.FC = () => {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const [stats, setStats] = useState<any>(null)
  const [statsLoading, setStatsLoading] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)
  const [showResetModal, setShowResetModal] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const userData = localStorage.getItem('adminUser')

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setIsAuthenticated(true)
        fetchStats(token)
      } catch (error) {
        console.error('Erreur lors du parsing des données utilisateur:', error)
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
        router.push('/admin/login')
      }
    } else {
      router.push('/admin/login')
    }
    setAuthLoading(false)
  }, [router])

  const fetchStats = async (token: string) => {
    try {
      setStatsLoading(true)
      const response = await fetch('http://localhost:5000/api/stats/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data.data)
        setLastRefresh(new Date())
      } else {
        console.error('Erreur lors de la récupération des statistiques')
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error)
    } finally {
      setStatsLoading(false)
    }
  }

  const handleRefresh = () => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      fetchStats(token)
    }
  }

  const handleResetStats = async () => {
    try {
      setResetLoading(true)
      const token = localStorage.getItem('adminToken')
      
      if (!token) return

      const response = await fetch('http://localhost:5000/api/stats/reset', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        alert(data.message)
        // Recharger les statistiques après réinitialisation
        fetchStats(token)
        setShowResetModal(false)
      } else {
        const errorData = await response.json()
        alert(errorData.message || 'Erreur lors de la réinitialisation')
      }
    } catch (error) {
      console.error('Erreur lors de la réinitialisation:', error)
      alert('Erreur lors de la réinitialisation des statistiques')
    } finally {
      setResetLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    router.push('/admin/login')
  }

  const menuItems = [
    {
      title: 'Tableau de bord',
      description: 'Vue d\'ensemble des statistiques',
      icon: BarChart3,
      href: '/admin/dashboard',
      color: 'bg-blue-500',
      roles: ['super_admin', 'admin', 'manager']
    },
    {
      title: 'Produits',
      description: 'Gérer le catalogue',
      icon: Package,
      href: '/admin/produits',
      color: 'bg-green-500',
      roles: ['super_admin', 'admin']
    },
    {
      title: 'Commandes',
      description: 'Suivre les commandes',
      icon: ShoppingCart,
      href: '/admin/commandes',
      color: 'bg-purple-500',
      roles: ['super_admin', 'admin', 'manager']
    },
    {
      title: 'Utilisateurs',
      description: 'Gérer les utilisateurs',
      icon: Users,
      href: '/admin/utilisateurs',
      color: 'bg-orange-500',
      roles: ['super_admin']
    }
  ]

  if (authLoading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <p className="text-white text-lg">Chargement de l'administration...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Redirection handled by useEffect
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <div className="bg-dark-900 border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Shield className="text-dark-950" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Administration</h1>
                <p className="text-dark-300">Al Djaber Qamis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">
                Connecté en tant que: {user?.role || 'admin'}
              </span>
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 bg-dark-800 text-white rounded-lg hover:bg-dark-700 transition-colors duration-300"
              >
                Retour au site
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 flex items-center space-x-2"
              >
                <LogOut size={16} />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Bienvenue dans l'administration
            </h2>
            <p className="text-dark-300 text-lg">
              Gérez votre boutique e-commerce depuis ce tableau de bord
            </p>
          </motion.div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {menuItems
            .filter(item => user?.role && item.roles.includes(user.role))
            .map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-dark-800 rounded-xl p-6 hover:bg-dark-700 transition-all duration-300 cursor-pointer"
                onClick={() => router.push(item.href)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center`}>
                    <item.icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                    <p className="text-dark-300 text-sm">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Real-time Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-dark-800 rounded-xl p-6 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">Statistiques en temps réel</h3>
            <div className="flex items-center space-x-4">
              {lastRefresh && (
                <p className="text-dark-300 text-sm">
                  Dernière mise à jour: {lastRefresh.toLocaleTimeString()}
                </p>
              )}
              <button
                onClick={handleRefresh}
                disabled={statsLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center space-x-2 disabled:opacity-50"
              >
                <RefreshCw size={16} className={statsLoading ? 'animate-spin' : ''} />
                <span>Actualiser</span>
              </button>
              {(user?.role === 'super_admin' || user?.role === 'admin') && (
                <button
                  onClick={() => setShowResetModal(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 flex items-center space-x-2"
                >
                  <RotateCcw size={16} />
                  <span>Réinitialiser</span>
                </button>
              )}
            </div>
          </div>

          {statsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
              <p className="text-dark-300 mt-4">Chargement des statistiques...</p>
            </div>
          ) : stats ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Commandes aujourd'hui */}
              <div className="bg-dark-700 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-dark-300 text-sm">Commandes aujourd'hui</p>
                    <p className="text-3xl font-bold text-white">{stats.overview?.ordersToday || 0}</p>
                  </div>
                  <ShoppingCart className="text-blue-400" size={32} />
                </div>
                {stats.overview?.ordersGrowth !== undefined && (
                  <div className="flex items-center mt-2">
                    {stats.overview.ordersGrowth >= 0 ? (
                      <TrendingUp className="text-green-400 mr-1" size={16} />
                    ) : (
                      <TrendingDown className="text-red-400 mr-1" size={16} />
                    )}
                    <span className={`text-sm ${stats.overview.ordersGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {Math.abs(stats.overview.ordersGrowth).toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>

              {/* Chiffre d'affaires aujourd'hui */}
              <div className="bg-dark-700 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-dark-300 text-sm">CA aujourd'hui</p>
                    <p className="text-3xl font-bold text-white">
                      {stats.overview?.revenueToday ? `${stats.overview.revenueToday.toFixed(0)} DA` : '0 DA'}
                    </p>
                  </div>
                  <BarChart3 className="text-green-400" size={32} />
                </div>
                {stats.overview?.revenueGrowth !== undefined && (
                  <div className="flex items-center mt-2">
                    {stats.overview.revenueGrowth >= 0 ? (
                      <TrendingUp className="text-green-400 mr-1" size={16} />
                    ) : (
                      <TrendingDown className="text-red-400 mr-1" size={16} />
                    )}
                    <span className={`text-sm ${stats.overview.revenueGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {Math.abs(stats.overview.revenueGrowth).toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>

              {/* Produits en rupture */}
              <div className="bg-dark-700 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-dark-300 text-sm">Produits en rupture</p>
                    <p className="text-3xl font-bold text-white">{stats.overview?.outOfStockProducts || 0}</p>
                  </div>
                  <AlertTriangle className="text-red-400" size={32} />
                </div>
                <div className="mt-2">
                  <p className="text-dark-300 text-xs">
                    {stats.overview?.outOfStockProducts > 0 ? 'Attention requise' : 'Tous en stock'}
                  </p>
                </div>
              </div>

              {/* Total produits */}
              <div className="bg-dark-700 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-dark-300 text-sm">Total produits</p>
                    <p className="text-3xl font-bold text-white">{stats.overview?.totalProducts || 0}</p>
                  </div>
                  <Package className="text-blue-400" size={32} />
                </div>
                <div className="mt-2">
                  <p className="text-dark-300 text-xs">En catalogue</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-dark-300">Aucune donnée disponible</p>
              <button
                onClick={handleRefresh}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Charger les données
              </button>
            </div>
          )}
        </motion.div>

        {/* Additional Stats if available */}
        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Products */}
            {stats.topProducts && stats.topProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-dark-800 rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold text-white mb-4">Top 5 Produits</h3>
                <div className="space-y-3">
                  {stats.topProducts.slice(0, 5).map((product: any, index: number) => (
                    <div key={index} className="flex items-center justify-between bg-dark-700 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-white font-medium">{product.product?.name || 'Produit supprimé'}</p>
                          <p className="text-dark-300 text-sm">{product.totalQuantity} vendus</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{product.totalRevenue.toFixed(0)} DA</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Orders by Status */}
            {stats.ordersByStatus && Object.keys(stats.ordersByStatus).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-dark-800 rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold text-white mb-4">Répartition des commandes</h3>
                <div className="space-y-3">
                  {Object.entries(stats.ordersByStatus).map(([status, count]: [string, any]) => (
                    <div key={status} className="flex items-center justify-between bg-dark-700 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <span className="text-white capitalize">{status}</span>
                      </div>
                      <span className="text-white font-semibold">{count}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Modal de confirmation de réinitialisation */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dark-800 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="text-red-400" size={24} />
              <h3 className="text-xl font-semibold text-white">Confirmer la réinitialisation</h3>
            </div>
            <p className="text-dark-300 mb-6">
              Êtes-vous sûr de vouloir réinitialiser toutes les statistiques ? Cette action va :
              <br />• Supprimer TOUTES les commandes
              <br />• Remettre le stock de TOUS les produits à 0
              <br /><strong className="text-red-400">Cette action est irréversible !</strong>
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 px-4 py-2 bg-dark-700 text-white rounded-lg hover:bg-dark-600 transition-colors duration-300"
              >
                Annuler
              </button>
              <button
                onClick={handleResetStats}
                disabled={resetLoading}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {resetLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Réinitialisation...</span>
                  </>
                ) : (
                  <>
                    <RotateCcw size={16} />
                    <span>Confirmer</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard