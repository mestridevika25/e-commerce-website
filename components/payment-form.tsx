"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, Smartphone, Building, Truck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PaymentFormProps {
  selectedPayment: string
  onSelectPayment: (method: string) => void
  onPaymentDetailsChange: (details: any) => void
}

export function PaymentForm({ selectedPayment, onSelectPayment, onPaymentDetailsChange }: PaymentFormProps) {
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Visa, Mastercard, American Express",
    },
    {
      id: "upi",
      name: "UPI",
      icon: <Smartphone className="h-5 w-5" />,
      description: "Pay using UPI ID or QR code",
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: <Building className="h-5 w-5" />,
      description: "All major banks supported",
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: <Truck className="h-5 w-5" />,
      description: "Pay when you receive",
    },
  ]

  const handleCardDetailsChange = (field: string, value: string) => {
    const newDetails = { ...cardDetails, [field]: value }
    setCardDetails(newDetails)
    onPaymentDetailsChange(newDetails)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Payment Method</h3>

      <RadioGroup value={selectedPayment} onValueChange={onSelectPayment}>
        <div className="space-y-3">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer transition-colors ${
                  selectedPayment === method.id ? "border-secondary bg-secondary/5" : "hover:border-secondary/50"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <div className="flex items-center gap-3 flex-1">
                      <div className="text-secondary">{method.icon}</div>
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </RadioGroup>

      {/* Card Details Form */}
      {selectedPayment === "card" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Card Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  value={cardDetails.name}
                  onChange={(e) => handleCardDetailsChange("name", e.target.value)}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={cardDetails.number}
                  onChange={(e) => handleCardDetailsChange("number", e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    value={cardDetails.expiry}
                    onChange={(e) => handleCardDetailsChange("expiry", e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={cardDetails.cvv}
                    onChange={(e) => handleCardDetailsChange("cvv", e.target.value)}
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* UPI Form */}
      {selectedPayment === "upi" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">UPI Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="upiId">UPI ID</Label>
                <Input
                  id="upiId"
                  placeholder="yourname@paytm"
                  onChange={(e) => onPaymentDetailsChange({ upiId: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Net Banking Form */}
      {selectedPayment === "netbanking" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select Your Bank</CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={(value) => onPaymentDetailsChange({ bank: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sbi">State Bank of India</SelectItem>
                  <SelectItem value="hdfc">HDFC Bank</SelectItem>
                  <SelectItem value="icici">ICICI Bank</SelectItem>
                  <SelectItem value="axis">Axis Bank</SelectItem>
                  <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
