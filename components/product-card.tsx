"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Eye, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  isNew?: boolean
  discount?: number
  inStock: boolean
  lowStock?: boolean
}

interface ProductCardProps {
  product: Product
  onQuickView: (product: Product) => void
  onAddToWishlist: (productId: string) => void
  onAddToCart: (productId: string) => void
}

export function ProductCard({ product, onQuickView, onAddToWishlist, onAddToCart }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    onAddToWishlist(product.id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="overflow-hidden border-border hover:shadow-lg transition-all duration-300">
        <div className="relative overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <Badge className="bg-secondary text-secondary-foreground">New</Badge>}
            {product.discount && <Badge variant="destructive">{product.discount}% Off</Badge>}
            {product.lowStock && (
              <Badge variant="outline" className="bg-background/90 text-destructive border-destructive">
                Low Stock
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button size="icon" variant="secondary" className="h-8 w-8" onClick={handleWishlist}>
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
            </Button>
            <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => onQuickView(product)}>
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Add to Cart */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              onClick={() => onAddToCart(product.id)}
              disabled={!product.inStock}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>

          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-primary hover:text-secondary transition-colors mb-2 line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-muted-foreground mb-3 capitalize">{product.category}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
