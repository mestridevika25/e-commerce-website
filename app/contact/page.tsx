"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle")

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // In a real app, submit to an API route or server action
    setStatus("submitted")
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-2 text-balance">Contact Us</h1>
          <p className="text-muted-foreground mb-8">
            Have questions or custom requests? Send us a message and we’ll get back to you.
          </p>

          <Card className="border-border">
            <CardContent className="p-6">
              {status === "submitted" ? (
                <div role="status" aria-live="polite" className="text-center py-6">
                  <h2 className="text-2xl font-semibold text-primary mb-2">Thanks for reaching out!</h2>
                  <p className="text-muted-foreground">We’ll reply to your message as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6" aria-label="Contact form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" required placeholder="Your full name" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required placeholder="you@example.com" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Tell us how we can help"
                      className="min-h-[160px]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Prefer socials? DM us on{" "}
                      <a
                        href="https://instagram.com/yourbrand"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 hover:no-underline"
                        aria-label="Visit our Instagram profile @yourbrand"
                      >
                        @yourbrand
                      </a>
                      .
                    </p>
                    <Button type="submit">Send message</Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="mt-10">
            <Link href="/" className="text-primary underline underline-offset-4 hover:no-underline">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
