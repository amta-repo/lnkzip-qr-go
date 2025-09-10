import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { URLShortener } from '@/components/URLShortener';
import { URLHistory } from '@/components/URLHistory';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link2, Zap, BarChart3, QrCode, Shield, Globe } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-accent/5 to-primary/5">
      {/* SEO Meta Tags */}
      <head>
        <title>lnkzip - Free URL Shortener with QR Codes & Analytics</title>
        <meta name="description" content="Shorten URLs, generate QR codes, and track clicks with lnkzip - the fastest free URL shortener with advanced analytics and custom links." />
        <meta name="keywords" content="url shortener, link shortener, qr code generator, url analytics, custom links, free url shortener" />
        <link rel="canonical" href="https://lnkzip.com" />
      </head>

      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 mb-12">
              <Badge variant="secondary" className="mb-4">
                🚀 Free URL Shortener & QR Generator
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Shorten. Track. Analyze.
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Transform long URLs into powerful short links with QR codes, 
                detailed analytics, and professional branding. 
                <span className="font-semibold text-foreground"> Free forever.</span>
              </p>
            </div>

            {/* URL Shortener Component */}
            <URLShortener />

            {/* Features Grid */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 bg-gradient-to-br from-card to-primary/5 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Lightning Fast</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Create short URLs instantly with our optimized infrastructure. No delays, no waiting.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-card to-secondary/5 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <QrCode className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="text-lg font-semibold">QR Code Generator</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Automatically generate high-quality QR codes for every shortened URL. Perfect for print and digital.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-card to-accent/20 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">Advanced Analytics</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Track clicks, analyze traffic sources, and understand your audience with detailed insights.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-card to-primary/5 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Link2 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Custom Links</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Create branded short links with custom aliases that match your brand identity.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-card to-secondary/5 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <Shield className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="text-lg font-semibold">Enterprise Security</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Bank-level security with SSL encryption, spam protection, and malware detection.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-card to-accent/20 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Globe className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">Global CDN</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Lightning-fast redirects worldwide with our global content delivery network.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* URL History Section */}
        {user && (
          <section className="py-12 bg-muted/20">
            <div className="container mx-auto px-4">
              <URLHistory />
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust lnkzip for their URL shortening needs.
              Start creating powerful short links today.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
