'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Package, Plus, Edit, Trash2, Search, Filter, Eye, ArrowLeft } from 'lucide-react'
import MultipleImageUpload from '@/components/admin/MultipleImageUpload'
import ProductImageGallery from '@/components/admin/ProductImageGallery'
import { Product, ProductColor } from '@/types'
import toast from 'react-hot-toast'


// Fonction utilitaire pour nettoyer les couleurs
const cleanColors = (colors: any[]): ProductColor[] => {
  if (!Array.isArray(colors)) return []
  
  return colors.map((color: any) => {
    if (typeof color === 'string') {
      return { name: color, hex: '#000000' }
    } else if (color && typeof color === 'object' && color.name && color.hex) {
      return { name: String(color.name), hex: String(color.hex) }
    } else {
      return { name: 'Couleur inconnue', hex: '#000000' }
    }
  })
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [token, setToken] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [imagePreview, setImagePreview] = useState<string[]>([])
  const [uploadingImages, setUploadingImages] = useState(false)
  const router = useRouter()

  // Formulaire de création/modification
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'qamis',
    sizes: ['M', 'L', 'XL'],
    colors: [] as ProductColor[],
    stock: 0,
    features: {
      material: '',
      care: '',
      origin: 'Algérie'
    },
    tags: [] as string[]
  })

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const availableCategories = [
    { value: 'qamis', label: 'Qamis' },
    { value: 'hidjab', label: 'Hidjab' },
    { value: 'parfum', label: 'Parfum' },
    { value: 'pantalon', label: 'Pantalon' },
    { value: 'jabador', label: 'Jabador' },
    { value: 'accessoires', label: 'Accessoires' }
  ]
  
  const predefinedColors: ProductColor[] = [
    { name: 'Blanc', hex: '#FFFFFF' },
    { name: 'Noir', hex: '#000000' },
    { name: 'Beige', hex: '#F5F5DC' },
    { name: 'Marron', hex: '#8B4513' },
    { name: 'Gris', hex: '#808080' },
    { name: 'Bleu', hex: '#0000FF' },
    { name: 'Vert', hex: '#008000' },
    { name: 'Rouge', hex: '#FF0000' }
  ]

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken')
    if (!storedToken) {
      router.push('/admin/login')
      return
    }

    // Vérifier les permissions
    fetch('http://localhost:5000/api/auth/verify', {
      headers: {
        'Authorization': `Bearer ${storedToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      // Vérifier si l'utilisateur peut gérer les produits
      if (!['super_admin', 'admin'].includes(data.data.user.role)) {
        router.push('/admin/dashboard')
        return
      }
      setToken(storedToken)
    })
    .catch(() => {
      localStorage.removeItem('adminToken')
      router.push('/admin/login')
    })
  }, [router])


  useEffect(() => {
    if (token) {
      fetchProducts()
    }
  }, [token, searchTerm, categoryFilter, currentPage])

  const fetchProducts = async () => {
    if (!token) return
    
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10'
      })
      
      if (searchTerm) params.append('search', searchTerm)
      if (categoryFilter) params.append('category', categoryFilter)

      const response = await fetch(`http://localhost:5000/api/products?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        // Nettoyer les données des produits pour s'assurer que les couleurs sont dans le bon format
        const cleanedProducts = (data.data || []).map((product: any) => ({
          ...product,
          colors: cleanColors(product.colors)
        }))
        setProducts(cleanedProducts)
        setTotalPages(data.pagination?.totalPages || 1)
      } else {
        console.error('Erreur lors du chargement des produits')
        setProducts([])
      }
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (productId: string) => {
    if (!token) return
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return

    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        fetchProducts()
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    }
  }

  const toggleProductStatus = async (productId: string, isActive: boolean) => {
    if (!token) return
    
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: !isActive })
      })

      if (response.ok) {
        fetchProducts()
      }
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-DZ', {
      style: 'currency',
      currency: 'DZD'
    }).format(price)
  }

  const getCategoryLabel = (category: string) => {
    const categoryData = availableCategories.find(c => c.value === category)
    return categoryData?.label || category
  }

  const handleColorChange = (color: ProductColor) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.some(c => c.hex === color.hex) 
        ? prev.colors.filter(c => c.hex !== color.hex)
        : [...prev.colors, color]
    }))
  }

  const addCustomColor = (name: string, hex: string) => {
    const newColor: ProductColor = { name, hex }
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, newColor]
    }))
  }

  const removeColor = (hex: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(c => c.hex !== hex)
    }))
  }

  const uploadImages = async (files: File[]) => {
    if (files.length === 0) return []
    
    setUploadingImages(true)
    try {
      const formData = new FormData()
      files.forEach(file => {
        formData.append('images', file)
      })
      
      const response = await fetch('http://localhost:5000/api/upload/images', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })
      
      if (response.ok) {
        const data = await response.json()
        toast.success(`${data.data.images.length} image(s) uploadée(s) avec succès`)
        return data.data.images
      } else {
        throw new Error('Erreur lors de l\'upload des images')
      }
    } catch (error) {
      console.error('Erreur upload:', error)
      toast.error('Erreur lors de l\'upload des images')
      return []
    } finally {
      setUploadingImages(false)
    }
  }

  const clearImageSelection = () => {
    // Libérer toutes les URLs d'objets
    imagePreview.forEach(url => URL.revokeObjectURL(url))
    setSelectedImages([])
    setImagePreview([])
  }

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return
    
    try {
      // Upload des images d'abord
      let imageUrls = []
      if (selectedImages.length > 0) {
        imageUrls = await uploadImages(selectedImages)
      } else {
        // Utiliser une image placeholder si aucune image n'est sélectionnée
        imageUrls = ['https://via.placeholder.com/400x400/ffffff/000000?text=' + encodeURIComponent(formData.name)]
      }
      
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          images: imageUrls
        })
      })

      if (response.ok) {
        setShowCreateModal(false)
        setFormData({
          name: '',
          description: '',
          price: 0,
          category: 'qamis',
          sizes: ['M', 'L', 'XL'],
          colors: [],
          stock: 0,
          features: {
            material: '',
            care: '',
            origin: 'Algérie'
          },
          tags: []
        })
        clearImageSelection()
        fetchProducts()
        toast.success('Produit créé avec succès !')
      } else {
        const error = await response.json()
        toast.error(error.message || 'Erreur lors de la création')
      }
    } catch (error) {
      console.error('Erreur lors de la création:', error)
      if (error instanceof Error) {
        toast.error('Erreur lors de la création: ' + error.message)
      } else {
        toast.error('Erreur lors de la création: une erreur inconnue est survenue')
      }
    }
  }

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct || !token) return

    try {
      // Upload des nouvelles images si des images sont sélectionnées
      let imageUrls = editingProduct.images // Garder les images existantes par défaut
      if (selectedImages.length > 0) {
        imageUrls = await uploadImages(selectedImages)
      }
      
      const response = await fetch(`http://localhost:5000/api/products/${editingProduct._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          images: imageUrls
        })
      })

      if (response.ok) {
        setEditingProduct(null)
        setFormData({
          name: '',
          description: '',
          price: 0,
          category: 'qamis',
          sizes: ['M', 'L', 'XL'],
          colors: [],
          stock: 0,
          features: {
            material: '',
            care: '',
            origin: 'Algérie'
          },
          tags: []
        })
        fetchProducts()
        alert('Produit modifié avec succès !')
      } else {
        const error = await response.json()
        alert(error.message || 'Erreur lors de la modification')
      }
    } catch (error) {
      console.error('Erreur lors de la modification:', error)
      alert('Erreur lors de la modification')
    }
  }

  const openEditModal = (product: Product) => {
    setEditingProduct(product)
    
    // S'assurer que les couleurs sont dans le bon format
    const safeColors = cleanColors(product.colors)
    
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      sizes: product.sizes,
      colors: safeColors,
      stock: product.stock,
      features: {
        material: product.features?.material || '',
        care: product.features?.care || '',
        origin: product.features?.origin || 'Algérie'
      },
      tags: product.tags || []
    })
  }

  const toggleSize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }))
  }


  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedImages(files)
    
    // Créer des aperçus
    const previews = files.map(file => URL.createObjectURL(file))
    setImagePreview(previews)
  }

  const removeImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index)
    const newPreviews = imagePreview.filter((_, i) => i !== index)
    setSelectedImages(newImages)
    setImagePreview(newPreviews)
  }

  if (!token) {
    return null
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/admin/dashboard')}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour au Dashboard</span>
          </motion.button>
        </div>
        
        <div className="flex items-center space-x-3">
          <Package className="w-8 h-8 text-white" />
          <h1 className="text-2xl font-bold text-white">Gestion des Produits</h1>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nouveau Produit</span>
        </motion.button>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          />
        </div>
        
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
        >
          <option value="">Toutes les catégories</option>
          {availableCategories.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Liste des produits */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            Chargement des produits...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Produit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {products.map((product) => (
                  <motion.tr
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16">
                          <ProductImageGallery
                            images={product.images}
                            productName={product.name}
                            className="h-16 w-16"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-400 truncate max-w-xs">
                            {product.description}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {product.images.length} image(s)
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-600 text-white">
                        {getCategoryLabel(product.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleProductStatus(product._id, product.isActive)}
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          product.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.isActive ? 'Actif' : 'Inactif'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openEditModal(product)}
                          className="text-green-400 hover:text-green-300"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteProduct(product._id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
          >
            Précédent
          </button>
          <span className="px-4 py-2 text-white">
            Page {currentPage} sur {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
          >
            Suivant
          </button>
        </div>
      )}

      {/* Modal de création/modification */}
      {(showCreateModal || editingProduct) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-bold text-white mb-4">
              {editingProduct ? 'Modifier le produit' : 'Nouveau produit'}
            </h2>
            
            <form onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nom du produit
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                    rows={3}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Prix (DZD)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Catégorie
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {availableCategories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Tailles disponibles */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tailles disponibles
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => toggleSize(size)}
                        className={`px-3 py-2 rounded-lg border-2 transition-all ${
                          formData.sizes.includes(size)
                            ? 'bg-white text-black border-white'
                            : 'bg-gray-700 text-white border-gray-600 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Couleurs disponibles */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Couleurs disponibles
                  </label>
                  <div className="space-y-4">
                    {/* Couleurs prédéfinies */}
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Couleurs prédéfinies :</p>
                      <div className="flex flex-wrap gap-2">
                        {predefinedColors.map(color => (
                          <button
                            key={color.hex}
                            type="button"
                            onClick={() => handleColorChange(color)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${
                              formData.colors.some(c => c.hex === color.hex)
                                ? 'bg-white text-black border-white'
                                : 'bg-gray-700 text-white border-gray-600 hover:border-gray-400'
                            }`}
                          >
                            <div 
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: color.hex }}
                            />
                            {color.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Couleurs sélectionnées */}
                    {formData.colors.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Couleurs sélectionnées :</p>
                        <div className="flex flex-wrap gap-2">
                          {formData.colors.map((color, index) => (
                            <div
                              key={color?.hex || index}
                              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg"
                            >
                              <div 
                                className="w-4 h-4 rounded-full border border-white"
                                style={{ backgroundColor: color?.hex || '#000000' }}
                              />
                              {color?.name || 'Couleur inconnue'}
                              <button
                                type="button"
                                onClick={() => removeColor(color?.hex || '')}
                                className="text-red-300 hover:text-red-100"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload d'images multiple */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Images du produit
                  </label>
                  <MultipleImageUpload
                    selectedImages={selectedImages}
                    setSelectedImages={setSelectedImages}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                    maxImages={5}
                    maxSizeInMB={5}
                    acceptedTypes={['image/jpeg', 'image/jpg', 'image/png', 'image/webp']}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Matériau
                  </label>
                  <input
                    type="text"
                    value={formData.features.material}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      features: { ...formData.features, material: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false)
                    setEditingProduct(null)
                    setFormData({
                      name: '',
                      description: '',
                      price: 0,
                      category: 'qamis',
                      sizes: ['M', 'L', 'XL'],
                      colors: [],
                      stock: 0,
                      features: {
                        material: '',
                        care: '',
                        origin: 'Algérie'
                      },
                      tags: []
                    })
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={uploadingImages}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    uploadingImages
                      ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                      : 'bg-white text-black hover:bg-gray-200'
                  }`}
                >
                  {uploadingImages ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                      <span>Upload en cours...</span>
                    </div>
                  ) : (
                    editingProduct ? 'Modifier' : 'Créer'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default ProductsPage

