'use client'

import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'

interface ColorSelectorProps {
  selectedColors: string[]
  onColorsChange: (colors: string[]) => void
  disabled?: boolean
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ 
  selectedColors, 
  onColorsChange, 
  disabled = false 
}) => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newColorName, setNewColorName] = useState('')

  // Couleurs prédéfinies
  const predefinedColors = [
    { value: 'blanc', label: 'Blanc', color: '#FFFFFF' },
    { value: 'noir', label: 'Noir', color: '#000000' },
    { value: 'beige', label: 'Beige', color: '#F5F5DC' },
    { value: 'marron', label: 'Marron', color: '#8B4513' },
    { value: 'gris', label: 'Gris', color: '#808080' },
    { value: 'bleu', label: 'Bleu', color: '#0000FF' },
    { value: 'vert', label: 'Vert', color: '#008000' },
    { value: 'rouge', label: 'Rouge', color: '#FF0000' },
    { value: 'jaune', label: 'Jaune', color: '#FFFF00' },
    { value: 'orange', label: 'Orange', color: '#FFA500' },
    { value: 'violet', label: 'Violet', color: '#8B5CF6' },
    { value: 'rose', label: 'Rose', color: '#FFC0CB' }
  ]

  const toggleColor = (colorValue: string) => {
    if (disabled) return
    
    const newColors = selectedColors.includes(colorValue)
      ? selectedColors.filter(c => c !== colorValue)
      : [...selectedColors, colorValue]
    
    onColorsChange(newColors)
  }

  const addCustomColor = () => {
    if (newColorName.trim() && !selectedColors.includes(newColorName.trim().toLowerCase())) {
      onColorsChange([...selectedColors, newColorName.trim().toLowerCase()])
      setNewColorName('')
      setShowAddForm(false)
    }
  }

  const removeColor = (colorValue: string) => {
    if (disabled) return
    onColorsChange(selectedColors.filter(c => c !== colorValue))
  }

  const getColorDisplay = (colorValue: string) => {
    const predefined = predefinedColors.find(c => c.value === colorValue)
    if (predefined) {
      return {
        label: predefined.label,
        color: predefined.color
      }
    }
    return {
      label: colorValue.charAt(0).toUpperCase() + colorValue.slice(1),
      color: '#8B5CF6' // Couleur par défaut pour les couleurs personnalisées
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-300">
          Couleurs disponibles
        </label>
        <span className="text-sm text-gray-500">
          {selectedColors.length} couleur{selectedColors.length !== 1 ? 's' : ''} sélectionnée{selectedColors.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Couleurs prédéfinies */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-300">Couleurs prédéfinies</h4>
        <div className="flex flex-wrap gap-2">
          {predefinedColors.map(color => (
            <button
              key={color.value}
              type="button"
              onClick={() => toggleColor(color.value)}
              disabled={disabled}
              className={`px-3 py-2 rounded-lg border-2 transition-all flex items-center space-x-2 ${
                selectedColors.includes(color.value)
                  ? 'bg-white text-black border-white'
                  : 'bg-gray-700 text-white border-gray-600 hover:border-gray-400'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div 
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color.color }}
              />
              <span>{color.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Couleurs personnalisées */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-300">Couleurs personnalisées</h4>
          {!disabled && (
            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1"
            >
              <Plus size={14} />
              <span>{showAddForm ? 'Annuler' : 'Ajouter'}</span>
            </button>
          )}
        </div>

        {/* Formulaire d'ajout */}
        {showAddForm && !disabled && (
          <div className="flex items-center space-x-2 p-3 bg-gray-700 rounded-lg">
            <input
              type="text"
              value={newColorName}
              onChange={(e) => setNewColorName(e.target.value)}
              placeholder="Nom de la couleur (ex: Turquoise)"
              className="flex-1 px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={addCustomColor}
              disabled={!newColorName.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <Plus size={14} />
              <span>Ajouter</span>
            </button>
          </div>
        )}

        {/* Couleurs personnalisées sélectionnées */}
        {selectedColors.filter(color => !predefinedColors.find(c => c.value === color)).length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedColors
              .filter(color => !predefinedColors.find(c => c.value === color))
              .map(color => {
                const display = getColorDisplay(color)
                return (
                  <div
                    key={color}
                    className="px-3 py-2 rounded-lg border-2 border-white bg-white text-black flex items-center space-x-2"
                  >
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: display.color }}
                    />
                    <span>{display.label}</span>
                    {!disabled && (
                      <button
                        type="button"
                        onClick={() => removeColor(color)}
                        className="ml-1 text-red-500 hover:text-red-700"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                )
              })}
          </div>
        )}
      </div>

      {selectedColors.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          <p>Aucune couleur sélectionnée</p>
          <p className="text-sm">Sélectionnez des couleurs prédéfinies ou créez des couleurs personnalisées</p>
        </div>
      )}
    </div>
  )
}

export default ColorSelector

