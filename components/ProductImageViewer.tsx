'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, Download, Share2 } from 'lucide-react'
import Image from 'next/image'
import ProductPlaceholder from './ProductPlaceholder'
import { getImageUrl } from '@/lib/api'

interface ProductImageViewerProps {
  images: string[]
  productName: string
  className?: string
}

const ProductImageViewer: React.FC<ProductImageViewerProps> = ({
  images,
  productName,
  className = ''
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())

  // Gestion du clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return

      switch (e.key) {
        case 'Escape':
          setSelectedImage(null)
          break
        case 'ArrowLeft':
          e.preventDefault()
          setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
          break
        case 'ArrowRight':
          e.preventDefault()
          setCurrentIndex((prev) => (prev + 1) % images.length)
          break
      }
    }

    if (selectedImage !== null) {
      document.addEventListener('keydown', handleKeyDown)
      // Empêcher le scroll de la page
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage, images.length])

  if (!images || images.length === 0) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-500">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
            <ZoomIn className="w-8 h-8" />
          </div>
          <p className="text-sm">Aucune image disponible</p>
        </div>
      </div>
    )
  }

  const openModal = (index: number) => {
    setSelectedImage(index)
    setCurrentIndex(index)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const downloadImage = () => {
    const link = document.createElement('a')
    link.href = images[currentIndex]
    link.download = `${productName}-${currentIndex + 1}.jpg`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const shareImage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: `Découvrez ce produit: ${productName}`,
          url: window.location.href
        })
      } catch (error) {
        console.log('Erreur lors du partage:', error)
      }
    } else {
      // Fallback: copier l'URL dans le presse-papiers
      navigator.clipboard.writeText(window.location.href)
      alert('Lien copié dans le presse-papiers!')
    }
  }

  return (
    <>
      {/* Galerie principale */}
      <div className={`space-y-4 ${className}`}>
        {/* Image principale */}
        <div className="relative group">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer shadow-lg"
            onClick={() => openModal(0)}
          >
            {!imageErrors.has(0) ? (
              <Image
                src={getImageUrl(images[0])}
                alt={productName}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
                onError={() => setImageErrors(prev => new Set(prev).add(0))}
                unoptimized
              />
            ) : (
              <ProductPlaceholder 
                width={400} 
                height={400} 
                className="w-full h-full"
                text={productName}
              />
            )}
            
            {/* Overlay avec icône zoom */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-black/40 flex items-center justify-center"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                <ZoomIn className="w-6 h-6 text-gray-800" />
              </div>
            </motion.div>

            {/* Badge nombre d'images */}
            {images.length > 1 && (
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-3 py-1 rounded-full font-medium">
                +{images.length - 1} photos
              </div>
            )}

            {/* Indicateur de qualité */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-2 py-1 rounded-full">
              Cliquez pour agrandir
            </div>
          </motion.div>
        </div>

        {/* Miniatures */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {images.slice(1, 5).map((image, index) => (
              <motion.div
                key={index + 1}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer shadow-md"
                onClick={() => openModal(index + 1)}
              >
                {!imageErrors.has(index + 1) ? (
                  <Image
                    src={getImageUrl(image)}
                    alt={`${productName} ${index + 2}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    onError={() => setImageErrors(prev => new Set(prev).add(index + 1))}
                    unoptimized
                  />
                ) : (
                  <ProductPlaceholder 
                    width={100} 
                    height={100} 
                    className="w-full h-full"
                    text={`${index + 2}`}
                  />
                )}
                
                {/* Overlay pour les images supplémentaires */}
                {index === 3 && images.length > 5 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      +{images.length - 5}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de visualisation */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl max-h-full w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header avec contrôles */}
              <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div className="text-white">
                    <h3 className="text-lg font-semibold">{productName}</h3>
                    <p className="text-sm text-gray-300">
                      {currentIndex + 1} / {images.length}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={shareImage}
                      className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors"
                      title="Partager"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={downloadImage}
                      className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors"
                      title="Télécharger"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button
                      onClick={closeModal}
                      className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors"
                      title="Fermer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Image principale */}
              <div className="relative flex items-center justify-center min-h-[60vh]">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative max-w-full max-h-full"
                >
                  {!imageErrors.has(currentIndex) ? (
                    <Image
                      src={getImageUrl(images[currentIndex])}
                      alt={`${productName} ${currentIndex + 1}`}
                      width={800}
                      height={600}
                      className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                      onError={() => setImageErrors(prev => new Set(prev).add(currentIndex))}
                      unoptimized
                    />
                  ) : (
                    <ProductPlaceholder 
                      width={800} 
                      height={600} 
                      className="max-w-full max-h-[70vh] rounded-lg shadow-2xl"
                      text={productName}
                    />
                  )}
                </motion.div>

                {/* Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 group"
                      title="Image précédente"
                    >
                      <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 group"
                      title="Image suivante"
                    >
                      <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </button>
                  </>
                )}
              </div>

              {/* Miniatures en bas */}
              {images.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                          index === currentIndex
                            ? 'border-white scale-110'
                            : 'border-white/30 hover:border-white/60 hover:scale-105'
                        }`}
                      >
                        {!imageErrors.has(index) ? (
                          <Image
                            src={getImageUrl(image)}
                            alt={`${productName} ${index + 1}`}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                            onError={() => setImageErrors(prev => new Set(prev).add(index))}
                            unoptimized
                          />
                        ) : (
                          <ProductPlaceholder 
                            width={64} 
                            height={64} 
                            className="w-full h-full"
                            text={`${index + 1}`}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
                <p>Utilisez les flèches du clavier ou les boutons pour naviguer</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ProductImageViewer

