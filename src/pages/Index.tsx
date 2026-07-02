import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { URLShortener } from '@/components/URLShortener';
import { URLHistory } from '@/components/URLHistory';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link2, Zap, BarChart3, QrCode, Shield, Globe, Sparkles } from 'lucide-react';

// FAQ content lives once and is rendered both visibly and as JSON-LD
// so the two never drift out of sync.
const FAQ = [
  {
    q: 'What is lnkzip?',
    a: 'lnkzip is a free URL shortener and QR code generator with a public HTTP API. It turns long URLs into short, shareable links and generates a downloadable QR code for every link.'
  },
  {
    q: 'Is lnkzip free?',
    a: 'Yes. Shortening URLs, generating QR codes, and basic click tracking are free with no sign-up required. Creating a free account unlocks link history and per-link analytics.'
  },
  {
    q: 'Do I need to sign up to shorten a URL?',
    a: 'No. You can shorten a URL and download its QR code without creating an account.'
  },
  {
    q: 'Can I use custom short link names?',
    a: 'Yes. You can specify a custom alias (for example, lnkzip.com/my-campaign) when creating a short link, subject to availability.'
  },
  {
    q: 'Does lnkzip have an API?',
    a: 'Yes. lnkzip exposes a free HTTPS API for shortening URLs and generating QR codes. See the API documentation for endpoints and examples.'
  },
  {
    q: 'How does click tracking work?',
    a: 'Each redirect through a lnkzip short link records aggregate click data — total clicks, device type, and referrer. Signed-in users see per-link analytics in their dashboard.'
  }
];

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>lnkzip — Free URL Shortener & QR Code Generator API</title>
        <meta name="description" content="Free URL shortener and QR code generator. Create custom short links, download QR codes, and track clicks with a public API. No sign-up required." />
        <link rel="canonical" href="https://lnkzip.com/" />
        <meta property="og:title" content="lnkzip — Free URL Shortener & QR Code Generator API" />
        <meta property="og:url" content="https://lnkzip.com/" />
        <meta property="og:description" content="Free URL shortener and QR code generator with a public API. No sign-up required." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'lnkzip',
          url: 'https://lnkzip.com',
          applicationCategory: 'UtilityApplication',
          operatingSystem: 'Web',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          aggregateRating: undefined,
          description: 'Free URL shortener and QR code generator with a public HTTP API.'
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a }
          }))
        })}</script>
      </Helmet>

      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-primary py-16 md:py-24 lg:py-32">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8 animate-fade-in">
              <Badge className="mb-4 text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 bg-secondary/90 text-secondary-foreground hover:bg-secondary border-0">
                <Sparkles className="h-3 w-3 md:h-4 md:w-4 mr-1.5 inline" />
                Free API • No Sign-Up Required
              </Badge>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight px-4">
                Free URL Shortener<br />
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">with QR Code Generator</span>
              </h1>

              {/* Quotable one-sentence definition for LLM extraction */}
              <p className="text-base md:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed px-4">
                lnkzip is a free URL shortener and QR code generator with a public API — create custom short links, download QR codes, and track clicks without signing up.
              </p>
            </div>
          </div>
        </section>

        {/* Shortener */}
        <section className="py-12 md:py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4">
            <URLShortener />
          </div>
        </section>

        {/* Features */}
        <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary">What lnkzip does</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Everything you need for URL shortening, QR codes, and link analytics — in one free tool.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {[
                { icon: Zap, title: 'Free URL Shortener API', body: 'Public HTTPS endpoint for shortening URLs. No sign-up required for basic usage.', href: '/api' },
                { icon: QrCode, title: 'Link to QR Code Generator', body: 'Every short link comes with a downloadable PNG QR code. Perfect for print, packaging, and signage.', href: '/qr-code-generator' },
                { icon: BarChart3, title: 'Click Tracking', body: 'Aggregate click counts on every short link. Signed-in users get per-link analytics with device and referrer breakdowns.', href: '/blog/url-analytics-tracking' },
                { icon: Link2, title: 'Custom Short Aliases', body: 'Pick your own memorable slug (e.g. lnkzip.com/launch) instead of a random string.', href: '/blog/custom-url-shortener-benefits' },
                { icon: Shield, title: 'No Sign-Up Required', body: 'Shorten a link and download its QR code in seconds. Accounts are optional and only add link history.', href: '/blog/free-url-shortener-no-signup' },
                { icon: Globe, title: 'Fast Global Redirects', body: 'Redirects served through serverless edge functions for low latency worldwide.', href: '/api' }
              ].map((f, i) => {
                const Icon = f.icon;
                return (
                  <Card key={i} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 border border-border/50 hover:border-primary/50 bg-card">
                    <CardContent className="p-5 md:p-6 space-y-3 md:space-y-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-button">
                        <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-foreground">
                        <Link to={f.href} className="hover:text-primary">{f.title}</Link>
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{f.body}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Frequently asked questions</h2>
            <dl className="space-y-6">
              {FAQ.map(({ q, a }, i) => (
                <div key={i} className="border-b border-border pb-6">
                  <dt className="text-lg font-semibold mb-2">{q}</dt>
                  <dd className="text-muted-foreground">{a}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-sm text-muted-foreground text-center">
              More questions? See the <Link to="/api" className="text-primary hover:underline">API documentation</Link>, browse the <Link to="/blog" className="text-primary hover:underline">blog</Link>, or <Link to="/contact" className="text-primary hover:underline">contact us</Link>.
            </p>
          </div>
        </section>

        {user && (
          <section className="py-12 md:py-16 bg-muted/20">
            <div className="container mx-auto px-4">
              <URLHistory />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
