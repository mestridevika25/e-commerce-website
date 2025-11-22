"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/product-card"

interface WishlistItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  inStock: boolean
  lowStock?: boolean
}

interface WishlistManagementProps {
  items: WishlistItem[]
  onRemoveItem: (id: string) => void
  onAddToCart: (id: string) => void
}

export function WishlistManagement({ items, onRemoveItem, onAddToCart }: WishlistManagementProps) {
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set())

  const handleRemove = (id: string) => {
    setRemovingItems(new Set([...removingItems, id]))
    setTimeout(() => {
      onRemoveItem(id)
      setRemovingItems(new Set([...removingItems].filter((item) => item !== id)))
    }, 300)
  }

  const handleAddToCart = (id: string) => {
    onAddToCart(id)
    handleRemove(id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">My Wishlist</h2>
          <p className="text-muted-foreground">{items.length} items saved for later</p>
        </div>
        {items.length > 0 && (
          <Button
            variant="outline"
            onClick={() => items.forEach((item) => handleAddToCart(item.id))}
            className="bg-transparent"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add All to Cart
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
            <p className="text-muted-foreground mb-4">Save items you love to buy them later</p>
            <Button>Continue Shopping</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 1, scale: 1 }}
              animate={{
                opacity: removingItems.has(item.id) ? 0 : 1,
                scale: removingItems.has(item.id) ? 0.8 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative group">
                <ProductCard
                  product={item}
                  onQuickView={() => {}}
                  onAddToWishlist={() => handleRemove(item.id)}
                  onAddToCart={() => handleAddToCart(item.id)}
                />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                  onClick={() => handleRemove(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
