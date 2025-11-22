"use client"

import { motion } from "framer-motion"
import { ArrowRight, Star, Truck, Shield, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import Link from "next/link"

export default function HomePage() {
  const featuredCategories = [
    {
      name: "Carry",
      description: "Handcrafted bags and carriers for every journey",
      image: "/handcrafted-carry-collection.jpg",
      href: "/category/carry",
    },
    {
      name: "Adorn",
      description: "Beautiful jewelry and accessories to elevate your style",
      image: "/artisan-adorn-jewelry.jpg",
      href: "/category/adorn",
    },
    {
      name: "Decor",
      description: "Art and home accents to brighten your space",
      image: "/artisan-home-decor.jpg",
      href: "/category/decor",
    },
  ]

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $75",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure transactions",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Dedicated customer service",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative h-[70vh] flex items-center justify-center bg-gradient-to-r from-muted to-card"
        >
          <div className="absolute inset-0 bg-black/20" />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/placeholder-598k5.png')",
            }}
          />
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              Handcrafted with
              <span className="text-secondary"> Love</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-pretty opacity-90">
              Discover unique, artisan-made bags, paintings, and accessories that tell a story
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">Featured Collections</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully curated selection of handmade treasures
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="overflow-hidden border-border hover:shadow-lg transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-2">{category.name}</h3>
                    <p className="text-muted-foreground mb-4">{category.description}</p>
                    <Link href={category.href}>
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors bg-transparent"
                      >
                        Explore
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Promotion */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-secondary to-secondary/80 rounded-2xl p-8 md:p-12 text-center text-secondary-foreground"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Winter Collection</h2>
            <p className="text-lg md:text-xl mb-6 opacity-90">Cozy up with our handcrafted winter essentials</p>
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="text-2xl font-bold">Up to 30% Off</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
            </div>
            <Button size="lg" variant="secondary" className="bg-white text-secondary hover:bg-white/90">
              Shop Winter Sale
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
                  <feature.icon className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">IndieCraft</h3>
              <p className="text-primary-foreground/80">
                Handcrafted treasures made with love and attention to detail.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <Link href="/category/carry" className="hover:text-primary-foreground transition-colors">
                    Carry
                  </Link>
                </li>
                <li>
                  <Link href="/category/adorn" className="hover:text-primary-foreground transition-colors">
                    Adorn
                  </Link>
                </li>
                <li>
                  <Link href="/category/decor" className="hover:text-primary-foreground transition-colors">
                    Decor
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <Link href="/contact" className="hover:text-primary-foreground transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-primary-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-primary-foreground transition-colors">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Instagram</h4>
              <p className="text-primary-foreground/80 mb-2">Follow us for new drops and behind-the-scenes.</p>
              <a
                href="https://instagram.com/yourbrand"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-foreground underline underline-offset-4 hover:no-underline"
                aria-label="Visit our Instagram profile @yourbrand"
              >
                @indiecraft
              </a>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2025 IndieCraft. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
