"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Filter, Grid, List, Star, Heart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import Link from "next/link"

export default function CarryCategoryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("popularity")

  const products = [
    {
      id: 7,
      name: "Handwoven Tote Bag",
      price: 85,
      originalPrice: 110,
      image: "/handwoven-tote-bag.jpg",
      rating: 4.9,
      reviews: 234,
      isNew: true,
      category: "Tote Bags",
    },
    {
      id: 8,
      name: "Leather Crossbody Bag",
      price: 120,
      image: "/leather-crossbody-bag.png",
      rating: 4.8,
      reviews: 189,
      category: "Crossbody",
    },
    {
      id: 9,
      name: "Canvas Messenger Bag",
      price: 95,
      image: "/canvas-messenger-bag.jpg",
      rating: 4.7,
      reviews: 156,
      category: "Messenger",
    },
    {
      id: 10,
      name: "Vintage Leather Satchel",
      price: 145,
      originalPrice: 180,
      image: "/vintage-leather-satchel.jpg",
      rating: 4.9,
      reviews: 298,
      category: "Satchel",
    },
    {
      id: 11,
      name: "Woven Basket Bag",
      price: 68,
      image: "/woven-basket-bag.jpg",
      rating: 4.6,
      reviews: 123,
      isNew: true,
      category: "Basket Bags",
    },
    {
      id: 12,
      name: "Embroidered Clutch",
      price: 55,
      image: "/embroidered-clutch.jpg",
      rating: 4.8,
      reviews: 87,
      category: "Clutch",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Category Header */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Carry</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handcrafted bags and carriers for every journey and occasion
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <span className="text-sm text-muted-foreground">{products.length} products</span>
            </div>

            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border border-border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`grid gap-6 ${
              viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            }`}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Card className="overflow-hidden border-border hover:shadow-lg transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && <Badge className="bg-secondary text-secondary-foreground">New</Badge>}
                      {product.originalPrice && (
                        <Badge variant="destructive">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="secondary" className="h-8 w-8">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
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

                    <h3 className="font-semibold text-primary mb-2 line-clamp-2">{product.name}</h3>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/product/${product.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          View Details
                        </Button>
                      </Link>
                      <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                        <ShoppingBag className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
