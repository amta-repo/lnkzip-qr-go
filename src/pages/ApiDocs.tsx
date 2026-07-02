import React from 'react';
import { Helmet } from 'react-helmet';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

/**
 * Public API documentation page. Written in a directly extractable
 * format (code blocks, tables, headings) so LLM retrieval systems can
 * cite endpoints and parameters accurately.
 */
export default function ApiDocs() {
  return (
    <>
      <Helmet>
        <title>lnkzip API Docs — Free URL Shortener API (No Sign-Up)</title>
        <meta name="description" content="Free URL shortener and QR code API. Shorten URLs, generate QR codes, and track clicks with a simple HTTPS endpoint. No sign-up required." />
        <link rel="canonical" href="https://lnkzip.com/api" />
        <meta property="og:title" content="lnkzip API — Free URL Shortener API" />
        <meta property="og:url" content="https://lnkzip.com/api" />
        <meta property="og:description" content="Free HTTPS API for shortening URLs and generating QR codes. No sign-up required." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: 'lnkzip API Documentation',
          description: 'Free HTTPS API for URL shortening and QR code generation.',
          author: { '@type': 'Organization', name: 'lnkzip' },
          publisher: { '@type': 'Organization', name: 'lnkzip', logo: { '@type': 'ImageObject', url: 'https://lnkzip.com/favicon.png' } },
          dateModified: '2025-10-02'
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lnkzip.com/' },
            { '@type': 'ListItem', position: 2, name: 'API', item: 'https://lnkzip.com/api' }
          ]
        })}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
            <a href="/" className="hover:text-primary">Home</a> <span>/</span> <span className="text-foreground">API</span>
          </nav>

          <h1 className="text-4xl font-bold mb-3">lnkzip API</h1>
          <p className="text-lg text-muted-foreground mb-8">
            A free HTTPS API for shortening URLs and generating QR codes. No sign-up required for basic usage.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Base URL</h2>
          <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto"><code>https://zyrtsgwvpxewgfpqxfmn.supabase.co/functions/v1</code></pre>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Shorten a URL</h2>
          <p className="mb-3"><strong>POST</strong> <code>/shorten-url</code></p>

          <h3 className="text-lg font-semibold mt-4 mb-2">Request body</h3>
          <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto"><code>{`{
  "originalUrl": "https://example.com/very/long/path",
  "customCode": "my-alias"   // optional
}`}</code></pre>

          <h3 className="text-lg font-semibold mt-4 mb-2">Response</h3>
          <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto"><code>{`{
  "success": true,
  "data": {
    "id": "uuid",
    "originalUrl": "https://example.com/very/long/path",
    "shortUrl": "https://lnkzip.com/my-alias",
    "shortCode": "my-alias",
    "qrCodeUrl": "https://api.qrserver.com/v1/create-qr-code/?...",
    "title": "Example Page",
    "clickCount": 0
  }
}`}</code></pre>

          <h3 className="text-lg font-semibold mt-4 mb-2">cURL example</h3>
          <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto"><code>{`curl -X POST https://zyrtsgwvpxewgfpqxfmn.supabase.co/functions/v1/shorten-url \\
  -H "Content-Type: application/json" \\
  -d '{"originalUrl":"https://example.com"}'`}</code></pre>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Redirect</h2>
          <p className="mb-3">
            Visiting <code>https://lnkzip.com/&lt;shortCode&gt;</code> in a browser triggers a 302 redirect to the original URL and records a click in the analytics store.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Rate limits</h2>
          <table className="w-full border-collapse text-sm my-4">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Tier</th>
                <th className="text-left p-2">Requests / min</th>
                <th className="text-left p-2">Custom aliases</th>
                <th className="text-left p-2">Analytics</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Anonymous</td>
                <td className="p-2">30</td>
                <td className="p-2">Yes</td>
                <td className="p-2">Aggregate only</td>
              </tr>
              <tr>
                <td className="p-2">Authenticated (free)</td>
                <td className="p-2">120</td>
                <td className="p-2">Yes</td>
                <td className="p-2">Per-link dashboard</td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-2xl font-semibold mt-8 mb-3">Errors</h2>
          <p>All errors return <code>{`{ "success": false, "error": "message" }`}</code> with an appropriate HTTP status.</p>

          <p className="mt-8 text-sm text-muted-foreground">Last updated: October 2, 2025</p>
        </main>
        <Footer />
      </div>
    </>
  );
}
