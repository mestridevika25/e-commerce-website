"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tag, Truck, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface CartSummaryProps {
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  itemCount: number
  onApplyDiscount: (code: string) => void
  onCheckout: () => void
}

export function CartSummary({
  subtotal,
  shipping,
  tax,
  discount,
  total,
  itemCount,
  onApplyDiscount,
  onCheckout,
}: CartSummaryProps) {
  const [discountCode, setDiscountCode] = useState("")
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false)

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return

    setIsApplyingDiscount(true)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    onApplyDiscount(discountCode)
    setIsApplyingDiscount(false)
  }

  const freeShippingThreshold = 75
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)

  return (
    <div className="space-y-6">
      {/* Free Shipping Progress */}
      {remainingForFreeShipping > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary/10 border border-secondary/20 rounded-lg p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Truck className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium">Free Shipping Available!</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Add ${remainingForFreeShipping.toFixed(2)} more to qualify for free shipping
          </p>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-secondary h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
            />
          </div>
        </motion.div>
      )}

      {/* Discount Code */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Discount Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleApplyDiscount}
              disabled={!discountCode.trim() || isApplyingDiscount}
              className="bg-secondary hover:bg-secondary/90"
            >
              {isApplyingDiscount ? "Applying..." : "Apply"}
            </Button>
          </div>
          {discount > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Discount Applied: -${discount.toFixed(2)}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal ({itemCount} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Button
            size="lg"
            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            onClick={onCheckout}
          >
            Proceed to Checkout
          </Button>

          {/* Estimated Delivery */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
            <Clock className="h-4 w-4" />
            <span>Estimated delivery: 3-5 business days</span>
          </div>
        </CardContent>
      </Card>

      {/* Security Badge */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
          <span>Secure checkout with SSL encryption</span>
        </div>
      </div>
    </div>
  )
}
