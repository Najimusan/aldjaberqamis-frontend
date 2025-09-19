'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Bell, Search, User } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const AdminHeader: React.FC = () => {
  const { user } = useAuth()

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-40 bg-dark-900/95 backdrop-blur-sm border-b border-dark-800">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-dark-400 hover:text-white transition-colors duration-300"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </motion.button>

            {/* User info */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <User size={16} className="text-dark-950" />
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-medium text-sm">
                  {user?.email || 'Admin'}
                </p>
                <p className="text-dark-400 text-xs">Administrateur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader





