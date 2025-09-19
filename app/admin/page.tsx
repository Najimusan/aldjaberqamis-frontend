'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AdminPage: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    // Rediriger vers le dashboard
    router.push('/admin/dashboard')
  }, [router])

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white">Redirection...</p>
      </div>
    </div>
  )
}

export default AdminPage