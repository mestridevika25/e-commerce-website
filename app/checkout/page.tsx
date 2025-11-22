"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Lock, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Navigation } from "@/components/navigation"
import { CheckoutSteps } from "@/components/checkout-steps"
import { AddressForm } from "@/components/address-form"
import { PaymentForm } from "@/components/payment-form"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock data
const mockCartItems = [
  {
    id: "1",
    name: "Handwoven Leather Tote Bag",
    price: 89,
    image: "/placeholder.svg?height=80&width=80&text=Tote",
    quantity: 2,
  },
  {
    id: "2",
    name: "Abstract Canvas Painting",
    price: 150,
    image: "/placeholder.svg?height=80&width=80&text=Art",
    quantity: 1,
  },
]

const mockAddresses = [
  {
    id: "1",
    type: "home" as const,
    name: "John Doe",
    street: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    isDefault: true,
  },
  {
    id: "2",
    type: "work" as const,
    name: "John Doe",
    street: "456 Business Ave, Suite 200",
    city: "New York",
    state: "NY",
    zipCode: "10002",
    country: "United States",
    isDefault: false,
  },
]

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isGuest, setIsGuest] = useState(true)
  const [addresses, setAddresses] = useState(mockAddresses)
  const [selectedAddress, setSelectedAddress] = useState("1")
  const [selectedPayment, setSelectedPayment] = useState("card")
  const [selectedDelivery, setSelectedDelivery] = useState("standard")
  const [paymentDetails, setPaymentDetails] = useState({})
  const router = useRouter()

  const steps = ["Information", "Delivery", "Payment", "Review"]
  const subtotal = mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = selectedDelivery === "express" ? 15 : subtotal >= 75 ? 0 : 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const deliveryOptions = [
    {
      id: "standard",
      name: "Standard Delivery",
      description: "5-7 business days",
      price: subtotal >= 75 ? 0 : 10,
    },
    {
      id: "express",
      name: "Express Delivery",
      description: "2-3 business days",
      price: 15,
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePlaceOrder = () => {
    const orderId = Date.now().toString()
    const order = {
      id: orderId,
      items: mockCartItems,
      address: addresses.find((a) => a.id === selectedAddress),
      payment: selectedPayment,
      delivery: selectedDelivery,
      total,
      placedAt: new Date().toISOString(),
    }

    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("lastOrder", JSON.stringify(order))
      }
    } catch (err) {
      // Optional: swallow storage errors in constrained environments
    }

    router.push(`/order-confirmation?orderId=${orderId}`)
  }

  const handleAddAddress = (newAddress: any) => {
    const address = {
      ...newAddress,
      id: Date.now().toString(),
    }
    setAddresses([...addresses, address])
    setSelectedAddress(address.id)
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
          <Link href="/cart">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-primary">Checkout</h1>
            <p className="text-muted-foreground">Complete your purchase securely</p>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <CheckoutSteps currentStep={currentStep} steps={steps} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 0: Information */}
              {currentStep === 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex gap-4">
                      <Button
                        variant={isGuest ? "default" : "outline"}
                        onClick={() => setIsGuest(true)}
                        className="flex-1"
                      >
                        Continue as Guest
                      </Button>
                      <Button
                        variant={!isGuest ? "default" : "outline"}
                        onClick={() => setIsGuest(false)}
                        className="flex-1"
                      >
                        Sign In
                      </Button>
                    </div>

                    {isGuest ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <input
                            id="email"
                            type="email"
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <input
                            id="phone"
                            type="tel"
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">Sign in to your account to continue</p>
                        <Button className="bg-secondary hover:bg-secondary/90">Sign In</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Step 1: Delivery */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Delivery Options</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup value={selectedDelivery} onValueChange={setSelectedDelivery}>
                        <div className="space-y-3">
                          {deliveryOptions.map((option) => (
                            <Card
                              key={option.id}
                              className={`cursor-pointer transition-colors ${
                                selectedDelivery === option.id
                                  ? "border-secondary bg-secondary/5"
                                  : "hover:border-secondary/50"
                              }`}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <RadioGroupItem value={option.id} id={option.id} />
                                    <div>
                                      <p className="font-medium">{option.name}</p>
                                      <p className="text-sm text-muted-foreground">{option.description}</p>
                                    </div>
                                  </div>
                                  <span className="font-medium">
                                    {option.price === 0 ? "Free" : `$${option.price}`}
                                  </span>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </RadioGroup>
                    </CardContent>
                  </Card>

                  <AddressForm
                    addresses={addresses}
                    selectedAddress={selectedAddress}
                    onSelectAddress={setSelectedAddress}
                    onAddAddress={handleAddAddress}
                  />
                </div>
              )}

              {/* Step 2: Payment */}
              {currentStep === 2 && (
                <PaymentForm
                  selectedPayment={selectedPayment}
                  onSelectPayment={setSelectedPayment}
                  onPaymentDetailsChange={setPaymentDetails}
                />
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Review</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Delivery Address</h4>
                        {(() => {
                          const address = addresses.find((a) => a.id === selectedAddress)
                          return address ? (
                            <div className="text-sm text-muted-foreground">
                              <p>{address.name}</p>
                              <p>{address.street}</p>
                              <p>
                                {address.city}, {address.state} {address.zipCode}
                              </p>
                            </div>
                          ) : null
                        })()}
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-medium mb-2">Payment Method</h4>
                        <p className="text-sm text-muted-foreground capitalize">{selectedPayment}</p>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-medium mb-2">Delivery Method</h4>
                        <p className="text-sm text-muted-foreground">
                          {deliveryOptions.find((d) => d.id === selectedDelivery)?.name}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handleBack} disabled={currentStep === 0} className="bg-transparent">
                  Back
                </Button>
                {currentStep < steps.length - 1 ? (
                  <Button onClick={handleNext} className="bg-secondary hover:bg-secondary/90">
                    Continue
                  </Button>
                ) : (
                  <Button onClick={handlePlaceOrder} className="bg-secondary hover:bg-secondary/90">
                    <Lock className="h-4 w-4 mr-2" />
                    Place Order
                  </Button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {mockCartItems.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
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
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Estimated Delivery */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Estimated delivery: {selectedDelivery === "express" ? "2-3" : "5-7"} business days</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
