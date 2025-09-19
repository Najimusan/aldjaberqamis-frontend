'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '@/lib/api'

interface AuthState {
  user: any | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  })

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const user = await authApi.verifyToken()
          setState({
            user,
            isAuthenticated: true,
            isLoading: false
          })
        } catch (error) {
          localStorage.removeItem('token')
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

    initAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { token, user } = await authApi.login(email, password)
      localStorage.setItem('token', token)
      setState({
        user,
        isAuthenticated: true,
        isLoading: false
      })
      return true
    } catch (error) {
      console.error('Erreur de connexion:', error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    })
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider')
  }
  return context
}





