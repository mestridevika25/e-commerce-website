import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto max-w-3xl px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-balance">Frequently Asked Questions</h1>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Answers to common questions about our Carry, Adorn, and Decor collections.
          </p>
        </header>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="shipping-times">
            <AccordionTrigger>What are your shipping times?</AccordionTrigger>
            <AccordionContent className="leading-relaxed">
              Most in-stock items ship within 2-3 business days. Made-to-order pieces may require additional processing
              time, which is indicated on the product page. You’ll receive a tracking email as soon as your order ships.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="order-status">
            <AccordionTrigger>How do I check my order status?</AccordionTrigger>
            <AccordionContent className="leading-relaxed">
              You can view your order status from your account dashboard under Orders. If you checked out as a guest,
              use your tracking email. Still need help?{" "}
              <Link href="/contact" className="underline underline-offset-4">
                Contact us
              </Link>
              .
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="returns">
            <AccordionTrigger>What is your return policy?</AccordionTrigger>
            <AccordionContent className="leading-relaxed">
              We accept returns within 14 days of delivery on eligible items in new, unused condition. See full details
              on our{" "}
              <Link href="/returns" className="underline underline-offset-4">
                Returns page
              </Link>
              .
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="exchanges">
            <AccordionTrigger>Do you offer exchanges?</AccordionTrigger>
            <AccordionContent className="leading-relaxed">
              Yes, exchanges are available for different sizes or variants if the item is in stock. Start with our{" "}
              <Link href="/returns" className="underline underline-offset-4">
                Returns process
              </Link>{" "}
              and choose “Exchange” when prompted.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="care">
            <AccordionTrigger>How do I care for Carry, Adorn, and Decor items?</AccordionTrigger>
            <AccordionContent className="leading-relaxed">
              - Carry: Spot clean with a damp cloth; avoid harsh detergents. <br />- Adorn: Store jewelry in a dry
              pouch; keep away from moisture and chemicals. <br />- Decor: Dust gently; follow any special care
              instructions on the product page.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="materials">
            <AccordionTrigger>What materials do you use?</AccordionTrigger>
            <AccordionContent className="leading-relaxed">
              Materials vary by collection and are listed on each product page. We carefully select durable, quality
              materials for long-lasting pieces across Carry, Adorn, and Decor.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="international">
            <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
            <AccordionContent className="leading-relaxed">
              We currently ship to select regions. Shipping fees and delivery estimates are shown at checkout.
              Duties/taxes may apply depending on your country’s regulations.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="gifting">
            <AccordionTrigger>Can I add a gift note or gift wrap?</AccordionTrigger>
            <AccordionContent className="leading-relaxed">
              Yes! Add a gift note in your cart before checkout. Gift wrapping is available on most items for an
              additional fee.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="changes-cancellations">
            <AccordionTrigger>Can I change or cancel my order?</AccordionTrigger>
            <AccordionContent className="leading-relaxed">
              If your order has not shipped, we’ll do our best to accommodate changes or cancellations. Please reach out
              via{" "}
              <Link href="/contact" className="underline underline-offset-4">
                Contact
              </Link>{" "}
              as soon as possible.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="payments">
            <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
            <AccordionContent className="leading-relaxed">
              We accept major credit cards and supported digital wallets. All transactions are secured.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="warranty">
            <AccordionTrigger>Is there a warranty?</AccordionTrigger>
            <AccordionContent className="leading-relaxed">
              We stand by the craftsmanship of our products. If you experience an issue with normal use, please{" "}
              <Link href="/contact" className="underline underline-offset-4">
                contact us
              </Link>{" "}
              with your order number and photos; we’ll make it right.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </main>
  )
}
