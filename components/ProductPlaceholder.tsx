'use client'

import React from 'react'

interface ProductPlaceholderProps {
  width?: number
  height?: number
  className?: string
  text?: string
}

const ProductPlaceholder: React.FC<ProductPlaceholderProps> = ({ 
  width = 400, 
  height = 400, 
  className = '',
  text = 'Produit'
}) => {
  return (
    <div 
      className={`bg-gray-200 flex items-center justify-center text-gray-500 ${className}`}
      style={{ width, height }}
    >
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
          <svg 
            className="w-8 h-8 text-gray-400" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-sm font-medium">{text}</p>
      </div>
    </div>
  )
}

export default ProductPlaceholder

