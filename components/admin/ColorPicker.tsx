'use client'

import React, { useState } from 'react'
import { Plus, X, Palette } from 'lucide-react'
import { ProductColor } from '@/types'

interface ColorPickerProps {
  colors: ProductColor[]
  onChange: (colors: ProductColor[]) => void
  disabled?: boolean
}

const ColorPicker: React.FC<ColorPickerProps> = ({ colors, onChange, disabled = false }) => {
  const [newColor, setNewColor] = useState({ name: '', hex: '#8B5CF6' })
  const [showAddForm, setShowAddForm] = useState(false)

  const addColor = () => {
    if (newColor.name.trim() && newColor.hex) {
      const colorExists = colors.some(
        color => color.name.toLowerCase() === newColor.name.toLowerCase() || color.hex === newColor.hex
      )
      
      if (!colorExists) {
        onChange([...colors, { ...newColor, name: newColor.name.trim() }])
        setNewColor({ name: '', hex: '#8B5CF6' })
        setShowAddForm(false)
      }
    }
  }

  const removeColor = (index: number) => {
    const newColors = colors.filter((_, i) => i !== index)
    onChange(newColors)
  }

  const updateColor = (index: number, field: 'name' | 'hex', value: string) => {
    const newColors = colors.map((color, i) => 
      i === index ? { ...color, [field]: value } : color
    )
    onChange(newColors)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Couleurs du produit
        </label>
        <span className="text-sm text-gray-500">
          {colors.length} couleur{colors.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Couleurs existantes */}
      <div className="space-y-2">
        {colors.map((color, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div 
              className="w-8 h-8 rounded-full border-2 border-gray-300"
              style={{ backgroundColor: color.hex }}
            />
            <div className="flex-1 grid grid-cols-2 gap-2">
              <input
                type="text"
                value={color.name}
                onChange={(e) => updateColor(index, 'name', e.target.value)}
                placeholder="Nom de la couleur"
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={disabled}
              />
              <input
                type="color"
                value={color.hex}
                onChange={(e) => updateColor(index, 'hex', e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                disabled={disabled}
              />
            </div>
            {!disabled && (
              <button
                type="button"
                onClick={() => removeColor(index)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Formulaire d'ajout */}
      {!disabled && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          {!showAddForm ? (
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="w-full flex items-center justify-center space-x-2 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Plus size={20} />
              <span>Ajouter une couleur</span>
            </button>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-8 h-8 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: newColor.hex }}
                />
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newColor.name}
                    onChange={(e) => setNewColor({ ...newColor, name: e.target.value })}
                    placeholder="Nom de la couleur"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="color"
                    value={newColor.hex}
                    onChange={(e) => setNewColor({ ...newColor, hex: e.target.value })}
                    className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={addColor}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus size={16} />
                  <span>Ajouter</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setNewColor({ name: '', hex: '#8B5CF6' })
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {colors.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Palette size={48} className="mx-auto mb-2 text-gray-300" />
          <p>Aucune couleur définie</p>
          <p className="text-sm">Ajoutez des couleurs personnalisées pour ce produit</p>
        </div>
      )}
    </div>
  )
}

export default ColorPicker

