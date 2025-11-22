"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export type CartItem = {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  quantity: number
  inStock?: boolean
  lowStock?: boolean
}

export type WishlistItem = {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  inStock?: boolean
  lowStock?: boolean
}

type ShopState = {
  cart: CartItem[]
  wishlist: WishlistItem[]
  // Selectors
  cartCount: () => number
  cartSubtotal: () => number
  // Cart actions
  addToCart: (product: Omit<CartItem, "quantity">, quantity?: number) => void
  updateQuantity: (id: string, quantity: number) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  // Wishlist actions
  addToWishlist: (
    item: Omit<WishlistItem, "rating" | "reviews"> & Partial<Pick<WishlistItem, "rating" | "reviews">>,
  ) => void
  removeFromWishlist: (id: string) => void
  // Move helpers
  moveCartToWishlist: (id: string) => void
  moveWishlistToCart: (id: string) => void
}

export const useShopStore = create<ShopState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],

      cartCount: () => get().cart.reduce((sum, it) => sum + it.quantity, 0),
      cartSubtotal: () => get().cart.reduce((sum, it) => sum + it.price * it.quantity, 0),

      addToCart: (product, quantity = 1) =>
        set((state) => {
          const idx = state.cart.findIndex((i) => i.id === product.id)
          if (idx >= 0) {
            const next = [...state.cart]
            next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity }
            return { cart: next }
          }
          return {
            cart: [
              ...state.cart,
              {
                ...product,
                quantity,
              },
            ],
          }
        }),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((it) => (it.id === id ? { ...it, quantity: Math.min(10, Math.max(1, quantity)) } : it)),
        })),

      removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((it) => it.id !== id) })),

      clearCart: () => set({ cart: [] }),

      addToWishlist: (itemInput) =>
        set((state) => {
          const exists = state.wishlist.some((it) => it.id === itemInput.id)
          if (exists) return state
          const item: WishlistItem = {
            rating: itemInput.rating ?? 0,
            reviews: itemInput.reviews ?? 0,
            ...itemInput,
          }
          return { wishlist: [...state.wishlist, item] }
        }),

      removeFromWishlist: (id) => set((state) => ({ wishlist: state.wishlist.filter((it) => it.id !== id) })),

      moveCartToWishlist: (id) =>
        set((state) => {
          const item = state.cart.find((it) => it.id === id)
          if (!item) return state
          const wishlistItem: WishlistItem = {
            id: item.id,
            name: item.name,
            price: item.price,
            originalPrice: item.originalPrice,
            image: item.image,
            category: item.category,
            rating: 0,
            reviews: 0,
            inStock: item.inStock,
            lowStock: item.lowStock,
          }
          return {
            cart: state.cart.filter((it) => it.id !== id),
            wishlist: state.wishlist.some((w) => w.id === id) ? state.wishlist : [...state.wishlist, wishlistItem],
          }
        }),

      moveWishlistToCart: (id) =>
        set((state) => {
          const item = state.wishlist.find((it) => it.id === id)
          if (!item) return state
          const exists = state.cart.find((c) => c.id === id)
          const nextCart = exists
            ? state.cart.map((c) => (c.id === id ? { ...c, quantity: Math.min(10, c.quantity + 1) } : c))
            : [
                ...state.cart,
                {
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  originalPrice: item.originalPrice,
                  image: item.image,
                  category: item.category,
                  quantity: 1,
                  inStock: item.inStock,
                  lowStock: item.lowStock,
                } as CartItem,
              ]
          return {
            cart: nextCart,
            wishlist: state.wishlist.filter((it) => it.id !== id),
          }
        }),
    }),
    {
      name: "shop-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart, wishlist: state.wishlist }),
    },
  ),
)
