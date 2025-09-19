'use client'

import React, { useState, useEffect } from 'react'
import { Plus, X, Check, ChevronDown } from 'lucide-react'
import { categoriesApi } from '@/lib/api'
import { Category } from '@/types'

interface CategorySelectorProps {
  selectedCategory: string
  onCategoryChange: (categoryId: string) => void
  disabled?: boolean
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  selectedCategory, 
  onCategoryChange, 
  disabled = false 
}) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: '' })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const data = await categoriesApi.getAll()
      setCategories(data)
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error)
    } finally {
      setLoading(false)
    }
  }

  const createCategory = async () => {
    if (newCategory.name.trim()) {
      try {
        const category = await categoriesApi.create({ 
          name: newCategory.name.trim(),
          description: '',
          color: '#8B5CF6'
        })
        setCategories([...categories, category])
        onCategoryChange(category._id)
        setNewCategory({ name: '' })
        setShowAddForm(false)
      } catch (error) {
        console.error('Erreur lors de la création de la catégorie:', error)
      }
    }
  }

  const selectedCategoryData = categories.find(cat => cat._id === selectedCategory)

  if (loading) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Catégorie
        </label>
        <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
          <div className="animate-pulse text-gray-500">Chargement...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Catégorie
      </label>
      
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            {selectedCategoryData && (
              <>
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: selectedCategoryData.color }}
                />
                <span>{selectedCategoryData.name}</span>
              </>
            )}
            {!selectedCategoryData && (
              <span className="text-gray-500">Sélectionner une catégorie</span>
            )}
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </button>

        {isOpen && !disabled && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {/* Liste des catégories existantes */}
            {categories.map((category) => (
              <button
                key={category._id}
                type="button"
                onClick={() => {
                  onCategoryChange(category._id)
                  setIsOpen(false)
                }}
                className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
              >
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="flex-1">{category.name}</span>
                {selectedCategory === category._id && (
                  <Check size={16} className="text-blue-600" />
                )}
              </button>
            ))}

            {/* Séparateur */}
            <div className="border-t border-gray-600 my-1" />

            {/* Option pour créer une nouvelle catégorie */}
            {!showAddForm ? (
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="w-full px-3 py-2 text-left hover:bg-gray-600 flex items-center space-x-2 text-blue-400 hover:text-blue-300"
              >
                <Plus size={16} />
                <span>Créer une nouvelle catégorie</span>
              </button>
            ) : (
              <div className="p-3 bg-gray-700 border-t border-gray-600">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Nom de la catégorie
                    </label>
                    <input
                      type="text"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({ name: e.target.value })}
                      placeholder="Ex: Qamis Premium"
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={createCategory}
                      disabled={!newCategory.name.trim()}
                      className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
                    >
                      <Plus size={14} />
                      <span>Créer</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false)
                        setNewCategory({ name: '' })
                      }}
                      className="px-3 py-2 text-gray-300 hover:text-white text-sm bg-gray-600 hover:bg-gray-500 rounded"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedCategoryData && (
        <div className="text-xs text-gray-500 mt-1">
          {selectedCategoryData.description || 'Aucune description'}
        </div>
      )}
    </div>
  )
}

export default CategorySelector
