"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, MapPin, Home, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Address {
  id: string
  type: "home" | "work" | "other"
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

interface AddressFormProps {
  addresses: Address[]
  selectedAddress: string
  onSelectAddress: (addressId: string) => void
  onAddAddress: (address: Omit<Address, "id">) => void
}

export function AddressForm({ addresses, selectedAddress, onSelectAddress, onAddAddress }: AddressFormProps) {
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newAddress, setNewAddress] = useState({
    type: "home" as const,
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    isDefault: false,
  })

  const handleAddAddress = () => {
    onAddAddress(newAddress)
    setNewAddress({
      type: "home",
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      isDefault: false,
    })
    setIsAddingNew(false)
  }

  const getAddressIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="h-4 w-4" />
      case "work":
        return <Building className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Delivery Address</h3>
        <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="addressType">Address Type</Label>
                <RadioGroup
                  value={newAddress.type}
                  onValueChange={(value) => setNewAddress({ ...newAddress, type: value as any })}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="home" id="home" />
                    <Label htmlFor="home">Home</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="work" id="work" />
                    <Label htmlFor="work">Work</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <Label htmlFor="street">Street Address</Label>
                <Textarea
                  id="street"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                  placeholder="123 Main Street, Apt 4B"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    placeholder="New York"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    placeholder="NY"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={newAddress.zipCode}
                  onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                  placeholder="10001"
                />
              </div>

              <Button onClick={handleAddAddress} className="w-full">
                Add Address
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <RadioGroup value={selectedAddress} onValueChange={onSelectAddress}>
        <div className="space-y-3">
          {addresses.map((address, index) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer transition-colors ${
                  selectedAddress === address.id ? "border-secondary bg-secondary/5" : "hover:border-secondary/50"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getAddressIcon(address.type)}
                        <span className="font-medium capitalize">{address.type}</span>
                        {address.isDefault && (
                          <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-full">Default</span>
                        )}
                      </div>
                      <p className="font-medium">{address.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {address.street}
                        <br />
                        {address.city}, {address.state} {address.zipCode}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}
