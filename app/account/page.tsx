"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Phone, Calendar, Edit, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navigation } from "@/components/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { OrderHistory } from "@/components/order-history"
import { WishlistManagement } from "@/components/wishlist-management"

// Mock data
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "/placeholder.svg?height=100&width=100&text=JD",
  joinDate: "January 2023",
}

const mockOrders = [
  {
    id: "ORD-001",
    date: "March 15, 2024",
    status: "delivered" as const,
    total: 328,
    items: [
      {
        id: "1",
        name: "Handwoven Leather Tote Bag",
        image: "/placeholder.svg?height=80&width=80&text=Tote",
        price: 89,
        quantity: 2,
      },
      {
        id: "2",
        name: "Abstract Canvas Painting",
        image: "/placeholder.svg?height=80&width=80&text=Art",
        price: 150,
        quantity: 1,
      },
    ],
    tracking: "TRK123456789",
  },
  {
    id: "ORD-002",
    date: "March 10, 2024",
    status: "shipped" as const,
    total: 65,
    items: [
      {
        id: "3",
        name: "Bohemian Crossbody Bag",
        image: "/placeholder.svg?height=80&width=80&text=Crossbody",
        price: 65,
        quantity: 1,
      },
    ],
    tracking: "TRK987654321",
    estimatedDelivery: "March 18, 2024",
  },
]

const mockWishlistItems = [
  {
    id: "4",
    name: "Handmade Silver Earrings",
    price: 45,
    image: "/placeholder.svg?height=300&width=300&text=Silver+Earrings",
    category: "accessories",
    rating: 4.7,
    reviews: 15,
    inStock: true,
  },
  {
    id: "5",
    name: "Watercolor Landscape",
    price: 200,
    image: "/placeholder.svg?height=300&width=300&text=Watercolor+Art",
    category: "paintings",
    rating: 4.9,
    reviews: 12,
    inStock: true,
  },
]

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState(mockUser)
  const [editedInfo, setEditedInfo] = useState(mockUser)
  const [orders] = useState(mockOrders)
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems)

  const handleSave = () => {
    setUserInfo(editedInfo)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedInfo(userInfo)
    setIsEditing(false)
  }

  const handleRemoveFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
  }

  const handleAddToCart = (id: string) => {
    console.log("Added to cart:", id)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">Profile Information</h2>
                <p className="text-muted-foreground">Manage your personal information</p>
              </div>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant="outline" className="bg-transparent">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSave} size="sm" className="bg-secondary hover:bg-secondary/90">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm" className="bg-transparent">
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Avatar */}
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={userInfo.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-lg">{userInfo.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Change Photo
                      </Button>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        {isEditing ? (
                          <Input
                            id="name"
                            value={editedInfo.name}
                            onChange={(e) => setEditedInfo({ ...editedInfo, name: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center gap-2 mt-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{userInfo.name}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        {isEditing ? (
                          <Input
                            id="email"
                            type="email"
                            value={editedInfo.email}
                            onChange={(e) => setEditedInfo({ ...editedInfo, email: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center gap-2 mt-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{userInfo.email}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        {isEditing ? (
                          <Input
                            id="phone"
                            value={editedInfo.phone}
                            onChange={(e) => setEditedInfo({ ...editedInfo, phone: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center gap-2 mt-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{userInfo.phone}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label>Member Since</Label>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{userInfo.joinDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold text-primary">{orders.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Wishlist Items</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold text-primary">{wishlistItems.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold text-primary">
                    ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "orders":
        return <OrderHistory orders={orders} />

      case "wishlist":
        return (
          <WishlistManagement
            items={wishlistItems}
            onRemoveItem={handleRemoveFromWishlist}
            onAddToCart={handleAddToCart}
          />
        )

      case "addresses":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">Saved Addresses</h2>
              <p className="text-muted-foreground">Manage your delivery addresses</p>
            </div>
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">Address management coming soon...</p>
              </CardContent>
            </Card>
          </div>
        )

      case "payments":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">Payment Methods</h2>
              <p className="text-muted-foreground">Manage your saved payment methods</p>
            </div>
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">Payment methods management coming soon...</p>
              </CardContent>
            </Card>
          </div>
        )

      case "settings":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">Account Settings</h2>
              <p className="text-muted-foreground">Manage your account preferences</p>
            </div>
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">Settings management coming soon...</p>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-primary mb-2">My Account</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} user={userInfo} />
          </div>

          {/* Main Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-3"
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
