"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Package, Truck, CheckCircle, Clock, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

interface Order {
  id: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: {
    id: string
    name: string
    image: string
    price: number
    quantity: number
  }[]
  tracking?: string
  estimatedDelivery?: string
}

interface OrderHistoryProps {
  orders: Order[]
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "processing":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">Order History</h2>
        <p className="text-muted-foreground">Track and manage your orders</p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-4">Start shopping to see your orders here</p>
            <Button>Continue Shopping</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">Order #{order.id}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            <span className="capitalize">{order.status}</span>
                          </div>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                      <p className="font-medium">${order.total.toFixed(2)}</p>
                      {order.estimatedDelivery && (
                        <p className="text-sm text-muted-foreground">Estimated delivery: {order.estimatedDelivery}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {order.tracking && (
                        <Button variant="outline" size="sm">
                          Track Order
                        </Button>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Order Details - #{order.id}</DialogTitle>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-6">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm text-muted-foreground">Order Date</p>
                                  <p className="font-medium">{selectedOrder.date}</p>
                                </div>
                                <Badge className={getStatusColor(selectedOrder.status)}>
                                  <div className="flex items-center gap-1">
                                    {getStatusIcon(selectedOrder.status)}
                                    <span className="capitalize">{selectedOrder.status}</span>
                                  </div>
                                </Badge>
                              </div>

                              <Separator />

                              <div>
                                <h4 className="font-semibold mb-4">Items Ordered</h4>
                                <div className="space-y-4">
                                  {selectedOrder.items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                      <img
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-lg"
                                      />
                                      <div className="flex-1">
                                        <h5 className="font-medium">{item.name}</h5>
                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <Separator />

                              <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>${selectedOrder.total.toFixed(2)}</span>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex gap-2 overflow-x-auto">
                      {order.items.slice(0, 3).map((item) => (
                        <img
                          key={item.id}
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                        />
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
