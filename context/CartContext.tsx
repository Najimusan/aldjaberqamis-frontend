'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { CartItem, Product } from '@/types'

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number; selectedSize: string; selectedColor: string } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; selectedSize: string; selectedColor: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; selectedSize: string; selectedColor: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
  addToCart: (product: Product, quantity: number, selectedSize: string, selectedColor: string) => void
  removeFromCart: (productId: string, selectedSize: string, selectedColor: string) => void
  updateQuantity: (productId: string, selectedSize: string, selectedColor: string, quantity: number) => void
  clearCart: () => void
} | null>(null)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity, selectedSize, selectedColor } = action.payload
      const existingItemIndex = state.items.findIndex(
        item => 
          item.product && item.product._id === product._id && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor
      )

      let newItems
      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        newItems = [...state.items, { product, quantity, selectedSize, selectedColor }]
      }

      return {
        ...state,
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.product ? item.product.price * item.quantity : 0), 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0)
      }
    }

    case 'REMOVE_ITEM': {
      const { productId, selectedSize, selectedColor } = action.payload
      const newItems = state.items.filter(
        item => 
          !(item.product && item.product._id === productId && 
            item.selectedSize === selectedSize && 
            item.selectedColor === selectedColor)
      )

      return {
        ...state,
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.product ? item.product.price * item.quantity : 0), 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0)
      }
    }

    case 'UPDATE_QUANTITY': {
      const { productId, selectedSize, selectedColor, quantity } = action.payload
      const newItems = state.items.map(item =>
        item.product && item.product._id === productId && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0)

      return {
        ...state,
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.product ? item.product.price * item.quantity : 0), 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0)
      }
    }

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        itemCount: 0
      }

    case 'LOAD_CART':
      const items = action.payload
      return {
        items,
        total: items.reduce((sum, item) => sum + (item.product ? item.product.price * item.quantity : 0), 0),
        itemCount: items.reduce((sum, item) => sum + item.quantity, 0)
      }

    default:
      return state
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0
  })

  // Charger le panier depuis localStorage au montage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: cartItems })
      } catch (error) {
        console.error('Erreur lors du chargement du panier:', error)
      }
    }
  }, [])

  // Sauvegarder le panier dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items))
  }, [state.items])

  const addToCart = (product: Product, quantity: number, selectedSize: string, selectedColor: string) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { product, quantity, selectedSize, selectedColor }
    })
  }

  const removeFromCart = (productId: string, selectedSize: string, selectedColor: string) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { productId, selectedSize, selectedColor }
    })
  }

  const updateQuantity = (productId: string, selectedSize: string, selectedColor: string, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, selectedSize, selectedColor, quantity }
    })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <CartContext.Provider value={{
      state,
      dispatch,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart doit être utilisé dans un CartProvider')
  }
  return context
}





