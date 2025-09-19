'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface AdminAuthState {
  user: any | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface AdminAuthContextType extends AdminAuthState {
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null)

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  })

  const refreshUser = async () => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/verify', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        
        if (response.ok) {
          const data = await response.json()
          setState({
            user: data.data.user,
            isAuthenticated: true,
            isLoading: false
          })
        } else {
          throw new Error('Token invalide')
        }
      } catch (error) {
        console.error('Erreur vérification token:', error)
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        })
      }
    } else {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      })
    }
  }

  useEffect(() => {
    refreshUser()
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('adminToken', data.data.token)
        localStorage.setItem('adminUser', JSON.stringify(data.data.user))
        setState({
          user: data.data.user,
          isAuthenticated: true,
          isLoading: false
        })
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error('Erreur de connexion:', error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    })
  }

  return (
    <AdminAuthContext.Provider value={{
      ...state,
      login,
      logout,
      refreshUser
    }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth doit être utilisé dans un AdminAuthProvider')
  }
  return context
}

