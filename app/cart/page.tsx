"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { CartItem } from "@/components/cart-item"
import { CartSummary } from "@/components/cart-summary"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useShopStore } from "@/lib/shop-store"

export default function CartPage() {
  const cart = useShopStore((s) => s.cart)
  const updateQuantity = useShopStore((s) => s.updateQuantity)
  const removeFromCart = useShopStore((s) => s.removeFromCart)
  const moveCartToWishlist = useShopStore((s) => s.moveCartToWishlist)
  const cartSubtotal = useShopStore((s) => s.cartSubtotal)
  const [discount, setDiscount] = useState(0)
  const router = useRouter()

  const subtotal = cartSubtotal()
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const shipping = subtotal >= 75 ? 0 : 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax - discount

  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateQuantity(id, quantity)
  }

  const handleRemoveItem = (id: string) => {
    removeFromCart(id)
  }

  const handleMoveToWishlist = (id: string) => {
    moveCartToWishlist(id)
  }

  const handleApplyDiscount = (code: string) => {
    const discountCodes: Record<string, number> = {
      SAVE10: subtotal * 0.1,
      WELCOME20: subtotal * 0.2,
      FREESHIP: shipping,
    }

    const discountAmount = discountCodes[code.toUpperCase()] || 0
    setDiscount(discountAmount)
  }

  const handleCheckout = () => {
    router.push("/checkout")
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-primary mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/catalog">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-8"
        >
          <Link href="/catalog">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-primary">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <CartItem
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                    onMoveToWishlist={handleMoveToWishlist}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Continue Shopping */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4"
            >
              <Link href="/catalog">
                <Button variant="outline" className="bg-transparent">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Cart Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24">
              <CartSummary
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                discount={discount}
                total={total}
                itemCount={itemCount}
                onApplyDiscount={handleApplyDiscount}
                onCheckout={handleCheckout}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
