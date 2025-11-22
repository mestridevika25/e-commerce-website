"use client"
import { motion } from "framer-motion"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"

interface FilterState {
  categories: string[]
  priceRange: [number, number]
  inStock: boolean
  onSale: boolean
  rating: number
}

interface ProductFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  isOpen: boolean
  onToggle: () => void
}

export function ProductFilters({ filters, onFiltersChange, isOpen, onToggle }: ProductFiltersProps) {
  const categories = [
    { id: "bags", label: "Handmade Bags", count: 24 },
    { id: "totes", label: "Tote Bags", count: 18 },
    { id: "paintings", label: "Paintings", count: 32 },
    { id: "accessories", label: "Accessories", count: 15 },
  ]

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter((id) => id !== categoryId)

    onFiltersChange({ ...filters, categories: newCategories })
  }

  const handlePriceChange = (value: [number, number]) => {
    onFiltersChange({ ...filters, priceRange: value })
  }

  const clearFilters = () => {
    onFiltersChange({
      categories: [],
      priceRange: [0, 500],
      inStock: false,
      onSale: false,
      rating: 0,
    })
  }

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button variant="outline" onClick={onToggle} className="w-full justify-center bg-transparent">
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {isOpen && <X className="h-4 w-4 ml-2" />}
        </Button>
      </div>

      {/* Filter Panel */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className={`lg:block ${isOpen ? "block" : "hidden lg:block"} overflow-hidden`}
      >
        <Card className="sticky top-24">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Filters</CardTitle>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={category.id}
                      checked={filters.categories.includes(category.id)}
                      onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                    />
                    <Label htmlFor={category.id} className="flex-1 cursor-pointer flex items-center justify-between">
                      <span>{category.label}</span>
                      <span className="text-sm text-muted-foreground">({category.count})</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Price Range */}
            <div>
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="px-2">
                <Slider
                  value={filters.priceRange}
                  onValueChange={handlePriceChange}
                  max={500}
                  min={0}
                  step={10}
                  className="mb-4"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Availability */}
            <div>
              <h3 className="font-semibold mb-3">Availability</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inStock"
                    checked={filters.inStock}
                    onCheckedChange={(checked) => onFiltersChange({ ...filters, inStock: checked as boolean })}
                  />
                  <Label htmlFor="inStock" className="cursor-pointer">
                    In Stock Only
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="onSale"
                    checked={filters.onSale}
                    onCheckedChange={(checked) => onFiltersChange({ ...filters, onSale: checked as boolean })}
                  />
                  <Label htmlFor="onSale" className="cursor-pointer">
                    On Sale
                  </Label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Rating */}
            <div>
              <h3 className="font-semibold mb-3">Minimum Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={filters.rating === rating}
                      onCheckedChange={(checked) =>
                        onFiltersChange({
                          ...filters,
                          rating: checked ? rating : 0,
                        })
                      }
                    />
                    <Label htmlFor={`rating-${rating}`} className="cursor-pointer flex items-center">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-sm ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>
                            ★
                          </span>
                        ))}
                      </div>
                      & Up
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  )
}
