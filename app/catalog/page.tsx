"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { QuickViewModal } from "@/components/quick-view-modal"
import { useShopStore } from "@/lib/shop-store"
import { useSearchParams } from "next/navigation"

// Mock product data
const mockProducts = [
  {
    id: "1",
    name: "Handwoven Leather Tote Bag",
    price: 89,
    originalPrice: 120,
    image: "/placeholder.svg?height=300&width=300&text=Leather+Tote",
    category: "bags",
    rating: 4.8,
    reviews: 24,
    isNew: true,
    discount: 26,
    inStock: true,
  },
  {
    id: "2",
    name: "Abstract Canvas Painting",
    price: 150,
    image: "/placeholder.svg?height=300&width=300&text=Abstract+Art",
    category: "paintings",
    rating: 4.9,
    reviews: 18,
    inStock: true,
    description: "Original abstract painting on canvas with vibrant colors.",
  },
  {
    id: "3",
    name: "Bohemian Crossbody Bag",
    price: 65,
    originalPrice: 85,
    image: "/placeholder.svg?height=300&width=300&text=Crossbody+Bag",
    category: "bags",
    rating: 4.6,
    reviews: 32,
    discount: 24,
    inStock: true,
    lowStock: true,
    description: "Stylish bohemian crossbody bag perfect for everyday use.",
  },
  {
    id: "4",
    name: "Handmade Silver Earrings",
    price: 45,
    image: "/placeholder.svg?height=300&width=300&text=Silver+Earrings",
    category: "accessories",
    rating: 4.7,
    reviews: 15,
    inStock: false,
    description: "Elegant handmade silver earrings with intricate design.",
  },
  {
    id: "5",
    name: "Vintage Canvas Tote",
    price: 55,
    image: "/placeholder.svg?height=300&width=300&text=Canvas+Tote",
    category: "totes",
    rating: 4.5,
    reviews: 28,
    inStock: true,
    description: "Durable vintage-style canvas tote bag for daily adventures.",
  },
  {
    id: "6",
    name: "Watercolor Landscape",
    price: 200,
    image: "/placeholder.svg?height=300&width=300&text=Watercolor+Art",
    category: "paintings",
    rating: 4.9,
    reviews: 12,
    isNew: true,
    inStock: true,
    description: "Beautiful watercolor landscape painting by local artist.",
  },
]

export default function CatalogPage() {
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 500] as [number, number],
    inStock: false,
    onSale: false,
    rating: 0,
  })
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null)

  const addToCart = useShopStore((s) => s.addToCart)
  const addToWishlist = useShopStore((s) => s.addToWishlist)

  const searchParams = useSearchParams()
  const q = (searchParams.get("q") || "").trim().toLowerCase()

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = mockProducts.filter((product) => {
      if (q && !(product.name.toLowerCase().includes(q) || product.category.toLowerCase().includes(q))) {
        return false
      }

      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false
      }

      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      if (filters.inStock && !product.inStock) {
        return false
      }

      if (filters.onSale && !product.originalPrice) {
        return false
      }

      if (filters.rating > 0 && product.rating < filters.rating) {
        return false
      }

      return true
    })

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
      default:
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
    }

    return filtered
  }, [filters, sortBy, q])

  const handleQuickView = (product: any) => {
    setQuickViewProduct(product)
  }

  const handleAddToWishlist = (productId: string) => {
    const p = mockProducts.find((x) => x.id === productId)
    if (!p) return
    addToWishlist({
      id: p.id,
      name: p.name,
      price: p.price,
      originalPrice: p.originalPrice,
      image: p.image,
      category: p.category,
      rating: p.rating ?? 0,
      reviews: p.reviews ?? 0,
      inStock: p.inStock,
      lowStock: p.lowStock,
    })
  }

  const handleAddToCart = (productId: string, quantity = 1) => {
    const p = mockProducts.find((x) => x.id === productId)
    if (!p) return
    addToCart(
      {
        id: p.id,
        name: p.name,
        price: p.price,
        originalPrice: p.originalPrice,
        image: p.image,
        category: p.category,
        inStock: p.inStock,
        lowStock: p.lowStock,
      },
      quantity,
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              isOpen={filtersOpen}
              onToggle={() => setFiltersOpen(!filtersOpen)}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-primary mb-2">Product Catalog</h1>
                {q ? (
                  <p className="text-muted-foreground">
                    Showing {filteredProducts.length} result{filteredProducts.length === 1 ? "" : "s"} for "{q}"
                  </p>
                ) : (
                  <p className="text-muted-foreground">
                    Showing {filteredProducts.length} of {mockProducts.length} products
                  </p>
                )}
              </div>

              {/* Sort and View Controls */}
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">New Arrivals</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    className="rounded-r-none"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    className="rounded-l-none"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <motion.div
              layout
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={handleQuickView}
                  onAddToWishlist={handleAddToWishlist}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </motion.div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  {q ? `No products found for "${q}".` : "No products found matching your criteria"}
                </p>
                <Button
                  onClick={() =>
                    setFilters({
                      categories: [],
                      priceRange: [0, 500],
                      inStock: false,
                      onSale: false,
                      rating: 0,
                    })
                  }
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />
    </div>
  )
}
