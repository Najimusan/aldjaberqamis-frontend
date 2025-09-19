'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import Image from 'next/image'

interface ProductImageGalleryProps {
  images: string[]
  productName: string
  className?: string
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
  className = ''
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className={`bg-gray-800 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-400">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
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

  return (
    <>
      {/* Galerie principale */}
      <div className={`space-y-4 ${className}`}>
        {/* Image principale */}
        <div className="relative group">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => openModal(0)}
          >
            <Image
              src={images[0]}
              alt={productName}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Overlay avec icône zoom */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
              <ZoomIn className="w-8 h-8 text-white" />
            </motion.div>

            {/* Badge nombre d'images */}
            {images.length > 1 && (
              <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                +{images.length - 1}
              </div>
            )}
          </motion.div>
        </div>

        {/* Miniatures */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {images.slice(1, 5).map((image, index) => (
              <motion.div
                key={index + 1}
                whileHover={{ scale: 1.05 }}
                className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => openModal(index + 1)}
              >
                <Image
                  src={image}
                  alt={`${productName} ${index + 2}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay pour les images supplémentaires */}
                {index === 3 && images.length > 5 && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <span className="text-white text-xs font-medium">
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
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bouton fermer */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Image principale */}
              <div className="relative">
                <Image
                  src={images[currentIndex]}
                  alt={`${productName} ${currentIndex + 1}`}
                  width={800}
                  height={600}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />

                {/* Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Indicateur de position */}
              {images.length > 1 && (
                <div className="text-center mt-4 text-white">
                  <span className="text-sm">
                    {currentIndex + 1} / {images.length}
                  </span>
                </div>
              )}

              {/* Miniatures en bas */}
              {images.length > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentIndex
                          ? 'border-white'
                          : 'border-transparent hover:border-gray-400'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${productName} ${index + 1}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ProductImageGallery

