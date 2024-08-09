// src/stores/cart.js

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([])

  const addToCart = (product) => {
    const existingItem = cartItems.value.find((item) => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cartItems.value.push({ ...product, quantity: 1 })
    }
    console.log('Adding product to cart:', product)
    console.log('Current cart items:', cartItems.value)
  }

  const removeFromCart = (productId) => {
    cartItems.value = cartItems.value.filter((item) => item.id !== productId)
    console.log('Product removed, current cart items:', cartItems.value)
  }

  const clearCart = () => {
    cartItems.value = []
    console.log('Cart cleared, current cart items:', cartItems.value)
  }

  const updateCartItem = (updatedItem) => {
    const item = cartItems.value.find((item) => item.id === updatedItem.id)
    if (item) {
      item.quantity = updatedItem.quantity
      console.log('Updated cart item:', item)
    }
  }

  const totalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
  })

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    updateCartItem,
    totalPrice
  }
})
