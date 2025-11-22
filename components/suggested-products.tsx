"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { useState } from "react"

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

interface SuggestedProductsProps {
  products: Product[]
  title?: string
  onQuickView: (product: Product) => void
  onAddToWishlist: (productId: string) => void
  onAddToCart: (productId: string) => void
}

export function SuggestedProducts({
  products,
  title = "You May Also Like",
  onQuickView,
  onAddToWishlist,
  onAddToCart,
}: SuggestedProductsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 4

  const canScrollLeft = currentIndex > 0
  const canScrollRight = currentIndex < products.length - itemsPerView

  const scrollLeft = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1))
  }

  const scrollRight = () => {
    setCurrentIndex(Math.min(products.length - itemsPerView, currentIndex + 1))
  }

  if (products.length === 0) return null

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-primary">{title}</h2>

        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className="h-10 w-10 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollRight}
            disabled={!canScrollRight}
            className="h-10 w-10 bg-transparent"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Products Carousel */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{
            x: `-${currentIndex * (100 / itemsPerView)}%`,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ width: `${(products.length / itemsPerView) * 100}%` }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0" style={{ width: `${100 / products.length}%` }}>
              <ProductCard
                product={product}
                onQuickView={onQuickView}
                onAddToWishlist={onAddToWishlist}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile Scroll Indicators */}
      <div className="flex justify-center mt-6 gap-2 md:hidden">
        {Array.from({ length: Math.ceil(products.length / itemsPerView) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              Math.floor(currentIndex / itemsPerView) === index ? "bg-secondary" : "bg-border"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
