import axios from 'axios'
import { Product, Order, ApiResponse, PaginatedResponse, FilterOptions } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// Fonction pour convertir les URLs d'images du backend vers le proxy Next.js
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return ''
  
  // Si c'est une URL complète du backend local, la convertir vers le proxy Next.js
  if (imagePath.startsWith('http://localhost:5000/uploads/')) {
    return imagePath.replace('http://localhost:5000/uploads/', '/api/uploads/')
  }
  
  // Si c'est une URL complète du backend local sans port, la convertir
  if (imagePath.startsWith('http://localhost/uploads/')) {
    return imagePath.replace('http://localhost/uploads/', '/api/uploads/')
  }
  
  // Si c'est un chemin relatif du backend, le convertir vers le proxy Next.js
  if (imagePath.startsWith('/uploads/')) {
    return `/api${imagePath}`
  }
  
  // Si c'est un chemin sans slash initial, l'ajouter
  if (!imagePath.startsWith('/')) {
    return `/api/uploads/${imagePath}`
  }
  
  // Pour les autres URLs (externe), les retourner telles quelles
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  
  return imagePath
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

// API Produits
export const productsApi = {
  getAll: async (filters?: FilterOptions, page = 1, limit = 12): Promise<PaginatedResponse<Product>> => {
    const response = await api.get('/products', {
      params: { ...filters, page, limit }
    })
    return {
      data: response.data.data || response.data.products || response.data,
      page: response.data.pagination?.page || response.data.pagination?.currentPage || page,
      limit: response.data.pagination?.limit || limit,
      totalPages: response.data.pagination?.totalPages || 1,
      total: response.data.pagination?.total || 0
    }
  },

  getById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`)
    return response.data.data
  },

  create: async (product: Partial<Product>): Promise<Product> => {
    const response = await api.post('/products', product)
    return response.data.data
  },

  update: async (id: string, product: Partial<Product>): Promise<Product> => {
    const response = await api.put(`/products/${id}`, product)
    return response.data.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`)
  },
}

// API Commandes
export const ordersApi = {
  create: async (order: Partial<Order>): Promise<Order> => {
    const response = await api.post('/orders', order)
    return response.data.data
  },

  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Order>> => {
    const response = await api.get('/orders', {
      params: { page, limit }
    })
    return response.data
  },

  getById: async (id: string): Promise<Order> => {
    const response = await api.get(`/orders/${id}`)
    return response.data.data
  },

  updateStatus: async (id: string, status: string): Promise<Order> => {
    const response = await api.patch(`/orders/${id}/status`, { status })
    return response.data.data
  },
}

// API Authentification
export const authApi = {
  login: async (username: string, password: string): Promise<{ token: string; user: any }> => {
    const response = await api.post('/auth/login', { username, password })
    return response.data.data
  },

  verifyToken: async (): Promise<any> => {
    const response = await api.get('/auth/verify')
    return response.data.data
  },
}

// API Catégories
export const categoriesApi = {
  getAll: async (): Promise<any[]> => {
    const response = await api.get('/categories')
    return response.data.data
  },

  getById: async (id: string): Promise<any> => {
    const response = await api.get(`/categories/${id}`)
    return response.data.data
  },

  create: async (categoryData: any): Promise<any> => {
    const response = await api.post('/categories', categoryData)
    return response.data.data
  },

  update: async (id: string, categoryData: any): Promise<any> => {
    const response = await api.put(`/categories/${id}`, categoryData)
    return response.data.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`)
  }
}

// API Statistiques
export const statsApi = {
  getDashboard: async (): Promise<any> => {
    const response = await api.get('/stats/dashboard')
    return response.data
  }
}

export default api


