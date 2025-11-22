"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type LastOrder = {
  id: string
  items: { id: string; name: string; price: number; image?: string; quantity: number }[]
  address?: {
    id: string
    type: "home" | "work"
    name: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
    isDefault?: boolean
  }
  payment: string
  delivery: string
  total: number
  placedAt: string
}

export default function OrderConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderIdFromUrl = searchParams.get("orderId") || undefined

  const [order, setOrder] = useState<LastOrder | null>(null)

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? sessionStorage.getItem("lastOrder") : null
      if (raw) {
        const parsed = JSON.parse(raw) as LastOrder
        setOrder(parsed)
      }
    } catch {
      // ignore parse/storage errors
    }
  }, [])

  const total = useMemo(() => (order ? order.total : 0), [order])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="h-7 w-7 text-primary" aria-hidden="true" />
            <h1 className="text-3xl font-bold text-primary text-balance">Thank you for your order</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            {orderIdFromUrl
              ? `Your order #${orderIdFromUrl} has been placed successfully. A confirmation email will be sent shortly.`
              : "Your order has been placed successfully. A confirmation email will be sent shortly."}
          </p>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items */}
              <div className="space-y-3">
                {order?.items?.length ? (
                  order.items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image || "/placeholder.svg?height=64&width=64&query=product image"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    We couldn't load your items. You can still view them in your orders page.
                  </p>
                )}
              </div>

              <Separator />

              {/* Delivery and Payment */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium mb-1">Delivery</h4>
                  <p className="text-sm text-muted-foreground capitalize">{order?.delivery ?? "—"}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Payment</h4>
                  <p className="text-sm text-muted-foreground capitalize">{order?.payment ?? "—"}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Total</h4>
                  <p className="text-sm font-semibold">${total.toFixed(2)}</p>
                </div>
              </div>

              <Separator />

              {/* Address */}
              <div>
                <h4 className="font-medium mb-1">Shipping Address</h4>
                {order?.address ? (
                  <div className="text-sm text-muted-foreground">
                    <p>{order.address.name}</p>
                    <p>{order.address.street}</p>
                    <p>
                      {order.address.city}, {order.address.state} {order.address.zipCode}
                    </p>
                    <p>{order.address.country}</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">—</p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => router.push("/orders")} className="bg-secondary hover:bg-secondary/90">
              View Orders
            </Button>
            <Button variant="outline" onClick={() => router.push("/")} className="bg-transparent">
              Continue Shopping
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
