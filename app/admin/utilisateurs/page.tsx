'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import UserManagement from '@/components/admin/UserManagement'

const UserManagementPage = () => {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken')
    if (!storedToken) {
      router.push('/admin/login')
      return
    }

    // Vérifier si le token est valide
    fetch('http://localhost:5000/api/auth/verify', {
      headers: {
        'Authorization': `Bearer ${storedToken}`
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Token invalide')
      }
    })
    .then(data => {
      // Vérifier si l'utilisateur est super_admin
      if (data.data.user.role !== 'super_admin') {
        router.push('/admin/dashboard')
        return
      }
      setToken(storedToken)
    })
    .catch(() => {
      localStorage.removeItem('adminToken')
      router.push('/admin/login')
    })
    .finally(() => {
      setLoading(false)
    })
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    )
  }

  if (!token) {
    return null
  }

  return <UserManagement 
    token={token} 
    onBackToDashboard={() => router.push('/admin/dashboard')}
  />
}

export default UserManagementPage
