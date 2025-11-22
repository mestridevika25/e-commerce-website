import { Navigation } from "@/components/navigation"
import { OrderHistory } from "@/components/order-history"

// Keeping mock data local to this page to avoid editing other files
const orders = [
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

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <OrderHistory orders={orders} />
      </main>
    </div>
  )
}
