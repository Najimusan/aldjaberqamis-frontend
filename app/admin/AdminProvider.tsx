'use client'

import React from 'react'
import { AdminAuthProvider } from '@/context/AdminAuthContext'

interface AdminProviderProps {
  children: React.ReactNode
}

const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  return (
    <AdminAuthProvider>
      {children}
    </AdminAuthProvider>
  )
}

export default AdminProvider

