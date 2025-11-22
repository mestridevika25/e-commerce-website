"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, Star, Plus, Minus, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { ProductReviews } from "@/components/product-reviews"
import { SuggestedProducts } from "@/components/suggested-products"
import { QuickViewModal } from "@/components/quick-view-modal"
import { useShopStore } from "@/lib/shop-store"

// Mock product data
const mockProduct = {
  id: "1",
  name: "Handwoven Leather Tote Bag",
  price: 89,
  originalPrice: 120,
  images: [
    "/placeholder.svg?height=600&width=600&text=Leather+Tote+1",
    "/placeholder.svg?height=600&width=600&text=Leather+Tote+2",
    "/placeholder.svg?height=600&width=600&text=Leather+Tote+3",
    "/placeholder.svg?height=600&width=600&text=Leather+Tote+4",
  ],
  category: "Handmade Bags",
  rating: 4.8,
  reviews: 24,
  isNew: true,
  discount: 26,
  inStock: true,
  lowStock: true,
  description:
    "This beautiful handwoven leather tote bag is crafted by skilled artisans using traditional techniques passed down through generations. Made from premium full-grain leather, this bag develops a beautiful patina over time, making each piece unique. Perfect for everyday use, work, or travel.",
  features: [
    "100% genuine full-grain leather",
    "Handwoven by skilled artisans",
    "Spacious main compartment",
    "Interior zip pocket",
    "Comfortable leather handles",
    'Dimensions: 15" x 12" x 5"',
  ],
  materials: "Premium full-grain leather, cotton lining, brass hardware",
  care: "Clean with a soft, dry cloth. Apply leather conditioner monthly. Avoid exposure to excessive moisture.",
}

const mockReviews = [
  {
    id: "1",
    author: "Sarah Johnson",
    rating: 5,
    date: "2024-01-15",
    title: "Absolutely beautiful bag!",
    content:
      "This bag exceeded my expectations. The leather quality is outstanding and the craftsmanship is evident in every detail. I've been using it daily for 3 months and it's aging beautifully.",
    helpful: 12,
    notHelpful: 1,
    verified: true,
  },
  {
    id: "2",
    author: "Michael Chen",
    rating: 4,
    date: "2024-01-10",
    title: "Great quality, perfect size",
    content:
      "Bought this as a gift for my wife and she loves it. The size is perfect for daily use and the leather feels premium. Only minor complaint is that it took a while to break in.",
    helpful: 8,
    notHelpful: 0,
    verified: true,
  },
  {
    id: "3",
    author: "Emma Wilson",
    rating: 5,
    date: "2024-01-05",
    title: "Worth every penny",
    content:
      "I was hesitant about the price at first, but this bag is definitely worth it. The attention to detail is incredible and I know it will last for years.",
    helpful: 15,
    notHelpful: 2,
    verified: true,
  },
]

const suggestedProducts = [
  {
    id: "2",
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
  },
  {
    id: "3",
    name: "Vintage Canvas Tote",
    price: 55,
    image: "/placeholder.svg?height=300&width=300&text=Canvas+Tote",
    category: "totes",
    rating: 4.5,
    reviews: 28,
    inStock: true,
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
  },
  {
    id: "5",
    name: "Leather Messenger Bag",
    price: 120,
    image: "/placeholder.svg?height=300&width=300&text=Messenger+Bag",
    category: "bags",
    rating: 4.9,
    reviews: 18,
    isNew: true,
    inStock: true,
  },
]

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null)
  const addToCart = useShopStore((s) => s.addToCart)
  const addToWishlist = useShopStore((s) => s.addToWishlist)

  const handleAddToCart = () => {
    addToCart(
      {
        id: mockProduct.id,
        name: mockProduct.name,
        price: mockProduct.price,
        originalPrice: mockProduct.originalPrice,
        image: mockProduct.images[0],
        category: mockProduct.category,
        inStock: mockProduct.inStock,
        lowStock: mockProduct.lowStock,
      },
      quantity,
    )
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    addToWishlist({
      id: mockProduct.id,
      name: mockProduct.name,
      price: mockProduct.price,
      originalPrice: mockProduct.originalPrice,
      image: mockProduct.images[0],
      category: mockProduct.category,
      rating: mockProduct.rating ?? 0,
      reviews: mockProduct.reviews ?? 0,
      inStock: mockProduct.inStock,
      lowStock: mockProduct.lowStock,
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mockProduct.name,
        text: mockProduct.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <ProductImageGallery images={mockProduct.images} productName={mockProduct.name} />
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Breadcrumb */}
            <nav className="text-sm text-muted-foreground">
              <span>Home</span> / <span>Bags</span> / <span className="text-foreground">{mockProduct.name}</span>
            </nav>

            {/* Product Info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {mockProduct.isNew && <Badge className="bg-secondary text-secondary-foreground">New</Badge>}
                {mockProduct.discount && <Badge variant="destructive">{mockProduct.discount}% Off</Badge>}
                {mockProduct.lowStock && (
                  <Badge variant="outline" className="text-destructive border-destructive">
                    Only a few left!
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold text-primary mb-4">{mockProduct.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(mockProduct.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {mockProduct.rating} ({mockProduct.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-primary">${mockProduct.price}</span>
                {mockProduct.originalPrice && (
                  <span className="text-2xl text-muted-foreground line-through">${mockProduct.originalPrice}</span>
                )}
                {mockProduct.discount && (
                  <Badge variant="destructive" className="text-lg px-3 py-1">
                    Save ${mockProduct.originalPrice! - mockProduct.price}
                  </Badge>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-muted-foreground leading-relaxed">{mockProduct.description}</p>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-6 py-3 min-w-[4rem] text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= 10}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  onClick={handleAddToCart}
                  disabled={!mockProduct.inStock}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  {mockProduct.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleWishlist}
                  className={isWishlisted ? "text-red-500 border-red-500" : ""}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
                <Button size="lg" variant="outline" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-secondary" />
                    <div>
                      <p className="font-medium">Free Shipping</p>
                      <p className="text-sm text-muted-foreground">On orders over $75</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-secondary" />
                    <div>
                      <p className="font-medium">Secure Payment</p>
                      <p className="text-sm text-muted-foreground">100% secure</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="h-5 w-5 text-secondary" />
                    <div>
                      <p className="font-medium">Easy Returns</p>
                      <p className="text-sm text-muted-foreground">30-day policy</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({mockProduct.reviews})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{mockProduct.description}</p>

                  <h4 className="font-semibold mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {mockProduct.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6">Specifications</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Materials</h4>
                        <p className="text-muted-foreground">{mockProduct.materials}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Dimensions</h4>
                        <p className="text-muted-foreground">15" x 12" x 5"</p>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">Care Instructions</h4>
                      <p className="text-muted-foreground">{mockProduct.care}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <ProductReviews
                reviews={mockReviews}
                averageRating={mockProduct.rating}
                totalReviews={mockProduct.reviews}
              />
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Suggested Products */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <SuggestedProducts
            products={suggestedProducts}
            onQuickView={setQuickViewProduct}
            onAddToWishlist={(id) => {
              const p = suggestedProducts.find((sp) => sp.id === id)
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
            }}
            onAddToCart={(id) => {
              const p = suggestedProducts.find((sp) => sp.id === id)
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
                1,
              )
            }}
          />
        </motion.div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(id, qty) => {
          const p = suggestedProducts.find((sp) => sp.id === id)
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
            qty,
          )
        }}
        onAddToWishlist={(id) => {
          const p = suggestedProducts.find((sp) => sp.id === id)
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
        }}
      />
    </div>
  )
}
