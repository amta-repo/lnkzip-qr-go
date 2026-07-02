import React from 'react';
import { Helmet } from 'react-helmet';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

/**
 * About page. Establishes entity/E-E-A-T signals for search and LLM
 * retrieval systems: real product description, real ownership,
 * consistent NAP with homepage and footer.
 */
export default function About() {
  return (
    <>
      <Helmet>
        <title>About lnkzip — Free URL Shortener Built by AMTECH-BJ</title>
        <meta name="description" content="lnkzip is a free URL shortener and QR code generator built by AMTECH-BJ. Learn who we are, how the service works, and how we handle your links." />
        <link rel="canonical" href="https://lnkzip.com/about" />
        <meta property="og:title" content="About lnkzip — Free URL Shortener Built by AMTECH-BJ" />
        <meta property="og:url" content="https://lnkzip.com/about" />
        <meta property="og:description" content="Meet the team behind lnkzip, a free URL shortener and QR code generator with a public API." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About lnkzip',
          url: 'https://lnkzip.com/about',
          mainEntity: {
            '@type': 'Organization',
            name: 'lnkzip',
            url: 'https://lnkzip.com',
            logo: 'https://lnkzip.com/favicon.png',
            founder: 'AMTECH-BJ',
            description: 'lnkzip is a free URL shortener and QR code generator with a public API.'
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lnkzip.com/' },
            { '@type': 'ListItem', position: 2, name: 'About', item: 'https://lnkzip.com/about' }
          ]
        })}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <a href="/" className="hover:text-primary">Home</a> <span>/</span> <span className="text-foreground">About</span>
          </nav>

          <article>
            <h1 className="text-4xl font-bold mb-4">About lnkzip</h1>
            <p className="text-lg text-muted-foreground mb-8">
              lnkzip is a free URL shortener and QR code generator with a public HTTP API, built and maintained by AMTECH-BJ.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">What lnkzip does</h2>
            <p className="mb-4">
              lnkzip turns long URLs into short, shareable links — with an optional custom alias — and generates a downloadable QR code for every link. Each short URL comes with click tracking so you can see how your links perform.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">Who runs it</h2>
            <p className="mb-4">
              lnkzip is developed by <strong>AMTECH-BJ</strong>, an independent software team focused on lightweight developer tools. Reach us any time through the <a href="/contact" className="text-primary hover:underline">contact page</a>.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">How it works</h2>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Shortening is powered by a Supabase Postgres database and Edge Functions.</li>
              <li>Redirects are served through globally distributed serverless functions.</li>
              <li>QR codes are generated on demand and cached for fast download.</li>
              <li>Click analytics are aggregated per link — no third-party tracking cookies.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-3">Our commitment</h2>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Free tier stays free for basic shortening and QR generation.</li>
              <li>No sign-up required to create a short link.</li>
              <li>We do not sell your data.</li>
            </ul>

            <p className="mt-8 text-sm text-muted-foreground">Last updated: October 2, 2025</p>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
