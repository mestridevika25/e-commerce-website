"use client"

import { useState } from "react"
import { Navigation }  from "@/components/navigation" 
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Phone, Calendar, Edit, Save, X } from "lucide-react"

type UserInfo = {
  name: string
  email: string
  phone: string
  avatar?: string
  joinDate: string
}

const initialUser: UserInfo = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "/user-avatar.png",
  joinDate: "January 2023",
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUser)
  const [editedInfo, setEditedInfo] = useState<UserInfo>(initialUser)

  const handleSave = () => {
    setUserInfo(editedInfo)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedInfo(userInfo)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2 text-balance">Profile</h1>
          <p className="text-muted-foreground">View and update your personal information</p>
        </header>

        <section aria-labelledby="profile-info">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 id="profile-info" className="text-2xl font-bold text-primary mb-2">
                Profile Information
              </h2>
              <p className="text-muted-foreground">Manage your personal information</p>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSave} size="sm" variant="secondary">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>

          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="sr-only">Profile details</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Avatar */}
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={userInfo.avatar || "/placeholder.svg?height=100&width=100&query=User+Avatar"}
                      alt="Profile avatar"
                    />
                    <AvatarFallback className="text-lg">
                      {userInfo.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="ghost" size="sm">
                      Change Photo
                    </Button>
                  )}
                </div>

                {/* User Fields */}
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
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

                    {/* Email */}
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

                    {/* Phone */}
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

                    {/* Join Date */}
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
        </section>
      </main>
    </div>
  )
}
