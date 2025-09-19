'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { productsApi, categoriesApi } from '@/lib/api'
import { Product, FilterOptions, Category } from '@/types'
import toast from 'react-hot-toast'

const CataloguePage: React.FC = () => {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<FilterOptions>({})
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0
  })

  const sortOptions = [
    { value: 'newest', label: 'Plus récents' },
    { value: 'oldest', label: 'Plus anciens' },
    { value: 'price_asc', label: 'Prix croissant' },
    { value: 'price_desc', label: 'Prix décroissant' },
    { value: 'name', label: 'Nom A-Z' }
  ]

  const fetchProducts = async (page = 1, newFilters = filters, newSort = sortBy) => {
    try {
      setIsLoading(true)
      console.log('🚀 fetchProducts called with:', { page, newFilters, newSort })
      console.log('📊 Current filters state:', filters)
      
      const response = await productsApi.getAll(newFilters, page, 12)
      console.log('✅ Products response:', response.data.length, 'products')
      setProducts(response.data)
      setPagination({
        page: response.page,
        totalPages: response.totalPages,
        total: response.total
      })
    } catch (error) {
      console.error('❌ Erreur lors du chargement des produits:', error)
      toast.error('Erreur lors du chargement des produits')
    } finally {
      setIsLoading(false)
    }
  }


  // Charger les données initiales - MANUEL
  const loadInitialData = async () => {
    console.log('🔄 Loading initial data...')
    
    // Charger les catégories
    await loadCategories()
    
    // Lire les paramètres URL
    const categoryFromUrl = searchParams.get('category')
    const searchFromUrl = searchParams.get('search')
    const minPriceFromUrl = searchParams.get('minPrice')
    const maxPriceFromUrl = searchParams.get('maxPrice')
    
    console.log('📋 URL params:', { categoryFromUrl, searchFromUrl, minPriceFromUrl, maxPriceFromUrl })
    
    // Construire les filtres initiaux
    const initialFilters: FilterOptions = {}
    
    if (categoryFromUrl) {
      initialFilters.category = categoryFromUrl
    }
    if (searchFromUrl) {
      initialFilters.search = searchFromUrl
      setSearchTerm(searchFromUrl)
    }
    if (minPriceFromUrl) {
      initialFilters.minPrice = parseFloat(minPriceFromUrl)
    }
    if (maxPriceFromUrl) {
      initialFilters.maxPrice = parseFloat(maxPriceFromUrl)
    }
    
    console.log('🎯 Setting filters:', initialFilters)
    setFilters(initialFilters)
    setIsInitialized(true)
    
    // Charger les produits avec les filtres initiaux
    console.log('📦 Fetching products with initial filters...')
    fetchProducts(1, initialFilters, sortBy)
  }

  // Charger les données au montage du composant
  useEffect(() => {
    loadInitialData()
  }, []) // Se déclenche UNE SEULE FOIS au montage

  // Fonction pour gérer les changements de filtres manuellement
  const handleFiltersChange = (newFilters: FilterOptions) => {
    console.log('🎛️ Manual filters change:', newFilters)
    setFilters(newFilters)
    fetchProducts(1, newFilters, sortBy)
  }

  const loadCategories = async () => {
    // Utiliser directement les catégories statiques pour éviter les problèmes d'API
    const staticCategories = [
      { _id: '1', name: 'Qamis', slug: 'qamis', color: '#8B5CF6', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { _id: '2', name: 'Hidjab', slug: 'hidjab', color: '#EC4899', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { _id: '3', name: 'Parfum', slug: 'parfum', color: '#F59E0B', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { _id: '4', name: 'Pantalon', slug: 'pantalon', color: '#10B981', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { _id: '5', name: 'Jabador', slug: 'jabador', color: '#EF4444', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { _id: '6', name: 'Accessoires', slug: 'accessoires', color: '#6B7280', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    ]
    setCategories(staticCategories)
    
    // Essayer de charger depuis l'API en arrière-plan
    try {
      const data = await categoriesApi.getAll()
      if (data.length > 0) {
        setCategories(data)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error)
    }
  }

  // Debounce pour la recherche - MANUEL
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    
    // Annuler le timeout précédent
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    
    // Créer un nouveau timeout
    searchTimeoutRef.current = setTimeout(() => {
      if (value !== filters.search) {
        console.log('🔍 Search debounced:', value)
        handleFilterChange('search', value)
      }
    }, 500)
  }

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value || undefined }
    console.log('🎛️ Filter change:', { key, value, newFilters })
    handleFiltersChange(newFilters)
  }

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort)
    fetchProducts(1, filters, newSort)
  }

  const handlePageChange = (newPage: number) => {
    fetchProducts(newPage, filters, sortBy)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearFilters = () => {
    setFilters({})
    setSearchTerm('')
    fetchProducts(1, {}, sortBy)
  }

  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-12 bg-dark-900">
          <div className="container-custom section-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {filters.category ? 
                  `Catalogue - ${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}` : 
                  'Notre Catalogue'
                }
              </h1>
              <p className="text-dark-300 text-lg max-w-2xl mx-auto">
                {filters.category ? 
                  `Découvrez notre collection de ${filters.category} de qualité` :
                  'Découvrez notre collection complète de qamis et accessoires musulmans de qualité'
                }
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="py-6 bg-dark-800 border-b border-dark-700">
          <div className="container-custom section-padding">
            <div className="flex flex-col gap-6">
              {/* Mobile Filter Toggle */}
              <div className="md:hidden">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <SlidersHorizontal size={20} />
                  <span>Filtres</span>
                </motion.button>
              </div>

              {/* Desktop Filters */}
              <div className="hidden md:flex flex-1 items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter size={20} className="text-white" />
                  <span className="text-white font-medium">Filtres:</span>
                </div>

                <select
                  value={filters.category || ''}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="input-field w-48"
                >
                  <option value="">Toutes les catégories</option>
                  {categories.length > 0 ? (
                    categories.map(category => (
                      <option key={category._id} value={category.name.toLowerCase()}>
                        {category.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>Chargement des catégories...</option>
                  )}
                </select>

                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="input-field w-64"
                />

                <input
                  type="number"
                  placeholder="Prix min"
                  value={filters.minPrice || ''}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="input-field w-32"
                />

                <input
                  type="number"
                  placeholder="Prix max"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="input-field w-32"
                />

                <button
                  onClick={clearFilters}
                  className="btn-ghost text-sm"
                >
                  Effacer
                </button>
              </div>

              {/* Sort and View Controls */}
              <div className="flex items-center space-x-4">
                {/* Indicateur de filtre actif */}
                {filters.category && (
                  <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-lg">
                    <span className="text-white text-sm">
                      Catégorie: <span className="font-semibold capitalize">{filters.category}</span>
                    </span>
                    <button
                      onClick={() => handleFilterChange('category', '')}
                      className="text-white hover:text-red-400 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                )}

                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="input-field w-48"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'grid' 
                        ? 'bg-white text-dark-950' 
                        : 'bg-dark-700 text-white hover:bg-dark-600'
                    }`}
                  >
                    <Grid size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'list' 
                        ? 'bg-white text-dark-950' 
                        : 'bg-dark-700 text-white hover:bg-dark-600'
                    }`}
                  >
                    <List size={20} />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-6 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                    value={filters.category || ''}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Toutes les catégories</option>
                    {categories.map(category => (
                      <option key={category._id} value={category.name.toLowerCase()}>
                        {category.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="input-field"
                  />

                  <input
                    type="number"
                    placeholder="Prix min"
                    value={filters.minPrice || ''}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="input-field"
                  />

                  <input
                    type="number"
                    placeholder="Prix max"
                    value={filters.maxPrice || ''}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="input-field"
                  />
                </div>

                <button
                  onClick={clearFilters}
                  className="btn-secondary w-full"
                >
                  Effacer tous les filtres
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Products Section */}
        <section className="py-8">
          <div className="container-custom section-padding">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-dark-300">
                {pagination.total} produit{pagination.total > 1 ? 's' : ''} trouvé{pagination.total > 1 ? 's' : ''}
              </p>
              <p className="text-dark-300">
                Page {pagination.page} sur {pagination.totalPages}
              </p>
            </div>

            {/* Products Grid/List */}
            {isLoading ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="bg-dark-800 rounded-xl p-6 animate-pulse">
                    <div className="w-full h-48 bg-dark-700 rounded-lg mb-4" />
                    <div className="h-4 bg-dark-700 rounded mb-2" />
                    <div className="h-4 bg-dark-700 rounded w-3/4 mb-4" />
                    <div className="h-6 bg-dark-700 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter size={48} className="text-dark-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-dark-300 mb-6">
                  Essayez de modifier vos critères de recherche
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Effacer les filtres
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {products.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex justify-center mt-12"
              >
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 bg-dark-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-700 transition-all duration-300"
                  >
                    Précédent
                  </motion.button>

                  {[...Array(pagination.totalPages)].map((_, index) => {
                    const page = index + 1
                    const isCurrentPage = page === pagination.page
                    
                    return (
                      <motion.button
                        key={page}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                          isCurrentPage
                            ? 'bg-white text-dark-950'
                            : 'bg-dark-800 text-white hover:bg-dark-700'
                        }`}
                      >
                        {page}
                      </motion.button>
                    )
                  })}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="px-4 py-2 bg-dark-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-700 transition-all duration-300"
                  >
                    Suivant
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default CataloguePage




