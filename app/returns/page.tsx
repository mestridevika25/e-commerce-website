import Link from "next/link"

export default function ReturnsPage() {
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/yourbrand"

  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto max-w-3xl px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-balance">Returns & Exchanges</h1>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            We want you to love your purchase. If something isn’t quite right, our returns and exchanges process is
            designed to help.
          </p>
        </header>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-medium">Return Window</h2>
            <p className="mt-2 leading-relaxed">
              Returns are accepted within 14 days of delivery for eligible items in new, unused condition with original
              tags and packaging.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium">Eligibility</h2>
            <ul className="mt-2 list-disc pl-5 leading-relaxed">
              <li>Items must be unused and in original condition.</li>
              <li>Include all original packaging, tags, and any accessories.</li>
              <li>Custom, final sale, or made-to-order items may not be eligible unless defective.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium">How to Start a Return</h2>
            <ol className="mt-2 list-decimal pl-5 leading-relaxed">
              <li>
                Visit our{" "}
                <Link href="/contact" className="underline underline-offset-4">
                  Contact
                </Link>{" "}
                page and include your order number and reason for return.
              </li>
              <li>We’ll reply with next steps and a return authorization if eligible.</li>
              <li>Pack items securely and ship using the provided instructions.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-medium">Exchanges</h2>
            <p className="mt-2 leading-relaxed">
              Exchanges are available for size or variant changes when in stock. Start the process using the same steps
              as a return and request an exchange.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium">Refunds</h2>
            <p className="mt-2 leading-relaxed">
              Once we receive and inspect your return, approved refunds are issued to the original payment method.
              Please allow 5–10 business days for processing, which can vary by provider.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium">Damaged or Defective Items</h2>
            <p className="mt-2 leading-relaxed">
              If your item arrived damaged or you found a defect,{" "}
              <Link href="/contact" className="underline underline-offset-4">
                contact us
              </Link>{" "}
              within 7 days of delivery with photos and your order number so we can assist quickly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium">Non-returnable Items</h2>
            <ul className="mt-2 list-disc pl-5 leading-relaxed">
              <li>Final sale items</li>
              <li>Certain made-to-order pieces (see product page)</li>
              <li>Gift cards</li>
              <li>Personalized or customized items unless defective</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium">Shipping for Returns</h2>
            <p className="mt-2 leading-relaxed">
              Return shipping costs may be deducted from your refund unless the return is due to our error (e.g., wrong
              or defective item).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium">Need Help?</h2>
            <p className="mt-2 leading-relaxed">
              We’re here to help. Reach us via our{" "}
              <Link href="/contact" className="underline underline-offset-4">
                Contact
              </Link>{" "}
              page or message us on Instagram:&nbsp;
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                {instagramUrl.replace("https://instagram.com/", "@")}
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}
