"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Minus, Trash2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface CartItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  quantity: number
  inStock: boolean
  lowStock?: boolean
}

interface CartItemProps {
  item: CartItem
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
  onMoveToWishlist: (id: string) => void
}

export function CartItem({ item, onUpdateQuantity, onRemove, onMoveToWishlist }: CartItemProps) {
  const [isRemoving, setIsRemoving] = useState(false)

  const handleRemove = () => {
    setIsRemoving(true)
    setTimeout(() => onRemove(item.id), 300)
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      onUpdateQuantity(item.id, newQuantity)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        opacity: isRemoving ? 0 : 1,
        scale: isRemoving ? 0.8 : 1,
        x: isRemoving ? -100 : 0,
      }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Product Image */}
            <div className="flex-shrink-0">
              <Link href={`/product/${item.id}`}>
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg hover:opacity-80 transition-opacity"
                />
              </Link>
            </div>

            {/* Product Details */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <Link href={`/product/${item.id}`}>
                    <h3 className="font-semibold text-primary hover:text-secondary transition-colors line-clamp-2">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground capitalize">{item.category}</p>

                  {/* Stock Status */}
                  <div className="mt-1">
                    {item.inStock ? (
                      <span className="text-sm text-green-600">
                        ✓ In Stock
                        {item.lowStock && " - Only a few left!"}
                      </span>
                    ) : (
                      <span className="text-sm text-red-600">✗ Out of Stock</span>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-lg font-bold text-primary">${item.price}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                {/* Quantity Selector */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">Qty:</span>
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="px-3 py-1 min-w-[2.5rem] text-center text-sm">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(item.quantity + 1)}
                      disabled={item.quantity >= 10}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onMoveToWishlist(item.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Heart className="h-4 w-4 mr-1" />
                    Save for Later
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemove}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
