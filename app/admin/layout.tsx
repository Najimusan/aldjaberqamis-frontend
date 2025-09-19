'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import AdminProvider from './AdminProvider'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const [userRole, setUserRole] = useState<string>('')
  const [roleLoading, setRoleLoading] = useState(true)

  const navigation = [
    { name: 'Tableau de bord', href: '/admin/dashboard', icon: LayoutDashboard, roles: ['super_admin', 'admin', 'manager'] },
    { name: 'Produits', href: '/admin/produits', icon: Package, roles: ['super_admin', 'admin'] },
    { name: 'Commandes', href: '/admin/commandes', icon: ShoppingCart, roles: ['super_admin', 'admin', 'manager'] },
    { name: 'Utilisateurs', href: '/admin/utilisateurs', icon: Users, roles: ['super_admin'] },
  ]

  useEffect(() => {
    // Ne pas vérifier l'auth sur la page de login
    if (pathname === '/admin/login') {
      setLoading(false)
      return
    }

    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        router.push('/admin/login')
        return
      }

      try {
        const response = await fetch('http://localhost:5000/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

            if (response.ok) {
              const userData = await response.json()
              console.log('Layout - Données utilisateur:', userData)
              setUserRole(userData.data.user.role)
              setIsAuthenticated(true)
            } else {
          localStorage.removeItem('adminToken')
          router.push('/admin/login')
        }
      } catch (error) {
        localStorage.removeItem('adminToken')
        router.push('/admin/login')
      } finally {
        setLoading(false)
        setRoleLoading(false)
      }
    }

    checkAuth()
  }, [router, pathname])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
  }

  // Ne pas afficher le layout sur la page de login
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-gray-800 text-white rounded-lg"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-700">
            <h1 className="text-xl font-bold text-white">Al Djaber Qamis</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {roleLoading ? (
              <div className="text-center text-gray-400">Chargement...</div>
            ) : (
              navigation
                .filter(item => {
                  // Si le rôle n'est pas encore chargé, afficher tout
                  if (!userRole) return true
                  // Sinon, filtrer selon le rôle
                  return item.roles.includes(userRole)
                })
                .map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => {
                        console.log('Navigation vers:', item.href)
                        setSidebarOpen(false)
                      }}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-white text-black'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  )
                })
            )}
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t border-gray-700">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Déconnexion
            </motion.button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:ml-64">
        <main className="min-h-screen">
          {children}
        </main>
      </div>
      
      {/* Toast notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151'
          }
        }}
      />
    </div>
  )
}

export default AdminLayout
