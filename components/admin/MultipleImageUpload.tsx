'use client'

import React, { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Image as ImageIcon, AlertCircle, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface MultipleImageUploadProps {
  selectedImages: File[]
  setSelectedImages: (images: File[]) => void
  imagePreview: string[]
  setImagePreview: (previews: string[]) => void
  maxImages?: number
  maxSizeInMB?: number
  acceptedTypes?: string[]
}

const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
  selectedImages,
  setSelectedImages,
  imagePreview,
  setImagePreview,
  maxImages = 5,
  maxSizeInMB = 5,
  acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
}) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Validation des fichiers
  const validateFile = (file: File): boolean => {
    // Vérifier le type
    if (!acceptedTypes.includes(file.type)) {
      toast.error(`Type de fichier non supporté: ${file.type}`)
      return false
    }

    // Vérifier la taille
    if (file.size > maxSizeInMB * 1024 * 1024) {
      toast.error(`Fichier trop volumineux. Taille max: ${maxSizeInMB}MB`)
      return false
    }

    return true
  }

  // Gestion de la sélection de fichiers
  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return

    const newFiles: File[] = []
    const newPreviews: string[] = []

    // Vérifier le nombre maximum d'images
    if (selectedImages.length + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images autorisées`)
      return
    }

    Array.from(files).forEach(file => {
      if (validateFile(file)) {
        newFiles.push(file)
        const preview = URL.createObjectURL(file)
        newPreviews.push(preview)
      }
    })

    if (newFiles.length > 0) {
      setSelectedImages([...selectedImages, ...newFiles])
      setImagePreview([...imagePreview, ...newPreviews])
      toast.success(`${newFiles.length} image(s) ajoutée(s)`)
    }
  }, [selectedImages, imagePreview, maxImages, maxSizeInMB, acceptedTypes])

  // Gestion du drag & drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }, [handleFileSelect])

  // Supprimer une image
  const removeImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index)
    const newPreviews = imagePreview.filter((_, i) => i !== index)
    
    // Libérer l'URL de l'objet
    URL.revokeObjectURL(imagePreview[index])
    
    setSelectedImages(newImages)
    setImagePreview(newPreviews)
    toast.success('Image supprimée')
  }

  // Upload des images vers le serveur
  const uploadImages = async (): Promise<string[]> => {
    if (selectedImages.length === 0) return []

    setUploading(true)
    try {
      const formData = new FormData()
      selectedImages.forEach((file, index) => {
        formData.append('images', file)
      })

      const token = localStorage.getItem('adminToken')
      const response = await fetch('http://localhost:5000/api/upload/images', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'upload')
      }

      const result = await response.json()
      return result.data.images
    } catch (error) {
      console.error('Erreur upload:', error)
      toast.error('Erreur lors de l\'upload des images')
      return []
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Zone de drop */}
      <motion.div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
          ${isDragOver 
            ? 'border-blue-400 bg-blue-50/10' 
            : 'border-gray-600 hover:border-gray-500'
          }
          ${selectedImages.length >= maxImages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => {
          if (selectedImages.length < maxImages) {
            document.getElementById('file-input')?.click()
          }
        }}
        whileHover={{ scale: selectedImages.length >= maxImages ? 1 : 1.02 }}
        whileTap={{ scale: selectedImages.length >= maxImages ? 1 : 0.98 }}
      >
        <input
          id="file-input"
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          disabled={selectedImages.length >= maxImages}
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="mx-auto w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-gray-400" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {selectedImages.length >= maxImages ? 'Maximum atteint' : 'Glissez vos images ici'}
            </h3>
            <p className="text-gray-400 text-sm">
              ou cliquez pour sélectionner des fichiers
            </p>
            <p className="text-gray-500 text-xs mt-2">
              {selectedImages.length}/{maxImages} images • Max {maxSizeInMB}MB par image
            </p>
          </div>

          {selectedImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center space-x-2 text-green-400"
            >
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">
                {selectedImages.length} image(s) sélectionnée(s)
              </span>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Galerie de prévisualisation */}
      <AnimatePresence>
        {imagePreview.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {imagePreview.map((preview, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group"
              >
                <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay avec bouton de suppression */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeImage(index)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                </div>

                {/* Indicateur de statut */}
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-gray-400 truncate">
                    {selectedImages[index]?.name || `Image ${index + 1}`}
                  </span>
                  <div className="flex items-center space-x-1 text-green-400">
                    <CheckCircle className="w-3 h-3" />
                    <span>Prêt</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Informations de validation */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-300">
            <p className="font-medium mb-2">Formats acceptés :</p>
            <ul className="space-y-1 text-gray-400">
              <li>• JPG, JPEG, PNG, WebP</li>
              <li>• Taille maximale : {maxSizeInMB}MB par image</li>
              <li>• Maximum : {maxImages} images par produit</li>
              <li>• Résolution recommandée : 800x800px minimum</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MultipleImageUpload

