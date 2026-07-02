import React from 'react';
import { Helmet } from 'react-helmet';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { URLShortener } from '@/components/URLShortener';

/**
 * Dedicated QR code generator page. Reuses the URLShortener component
 * (which returns a QR code for every shortened link) but ships its own
 * unique title, description, canonical, and schema so the route stands
 * on its own in search and LLM citations.
 */
export default function QRGenerator() {
  return (
    <>
      <Helmet>
        <title>Free Link to QR Code Generator — lnkzip</title>
        <meta name="description" content="Convert any link into a scannable QR code for free. Paste a URL, get a downloadable PNG QR code plus a short link. No sign-up required." />
        <link rel="canonical" href="https://lnkzip.com/qr-code-generator" />
        <meta property="og:title" content="Free Link to QR Code Generator — lnkzip" />
        <meta property="og:url" content="https://lnkzip.com/qr-code-generator" />
        <meta property="og:description" content="Paste a URL, download a QR code. Free, instant, no sign-up." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'lnkzip QR Code Generator',
          url: 'https://lnkzip.com/qr-code-generator',
          applicationCategory: 'UtilityApplication',
          operatingSystem: 'Web',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lnkzip.com/' },
            { '@type': 'ListItem', position: 2, name: 'QR Code Generator', item: 'https://lnkzip.com/qr-code-generator' }
          ]
        })}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <a href="/" className="hover:text-primary">Home</a> <span>/</span> <span className="text-foreground">QR Code Generator</span>
          </nav>

          <h1 className="text-4xl font-bold mb-3">Free Link to QR Code Generator</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Paste any URL, get a scannable QR code and a short link — free, instant, no sign-up.
          </p>

          <URLShortener />

          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-3">How to convert a link to a QR code</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Paste your long URL in the field above.</li>
              <li>Optionally set a custom short alias.</li>
              <li>Click <strong>Shorten</strong>. lnkzip returns a short link and a QR code.</li>
              <li>Download the QR code as a PNG and use it in print, packaging, or signage.</li>
            </ol>

            <p className="mt-6 text-sm text-muted-foreground">
              Related reading: <a href="/blog/qr-code-generator-guide" className="text-primary hover:underline">Complete Guide to QR Code Generation</a> · <a href="/blog/link-to-qr-code-converter" className="text-primary hover:underline">Link to QR Code Converter</a> · <a href="/api" className="text-primary hover:underline">API documentation</a>
            </p>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
