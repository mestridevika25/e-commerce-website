"use client"

import { Navigation } from "@/components/navigation"
import { WishlistManagement } from "@/components/wishlist-management"
import { useShopStore } from "@/lib/shop-store"

export default function WishlistPage() {
  const wishlist = useShopStore((s) => s.wishlist)
  const removeFromWishlist = useShopStore((s) => s.removeFromWishlist)
  const moveWishlistToCart = useShopStore((s) => s.moveWishlistToCart)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WishlistManagement items={wishlist} onRemoveItem={removeFromWishlist} onAddToCart={moveWishlistToCart} />
      </div>
    </div>
  )
}
