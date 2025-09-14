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
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        <div className="absolute inset-0 opacity-50">
          <div className="w-full h-full bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 animate-pulse"></div>
        </div>
      </div>

      <Navbar />
      
      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 relative">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-8 mb-16 animate-fade-in">
              <Badge variant="secondary" className="mb-6 text-sm px-4 py-2 bg-gradient-card shadow-subtle animate-glow">
                ⚡ Free URL Shortener API • No Sign Up Required
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent leading-tight">
                Free URL Shortener<br />
                <span className="text-4xl lg:text-5xl">with QR Code Generator</span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Create <span className="font-semibold text-primary">custom short URLs</span> with tracking, 
                convert <span className="font-semibold text-secondary">links to QR codes</span>, 
                and analyze performance.
                <span className="block mt-2 font-bold text-foreground text-lg">🎯 Best free URL shortener with custom names</span>
              </p>
            </div>

            {/* URL Shortener Component */}
            <URLShortener />

            {/* Features Grid */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
              <Card className="group border-0 bg-gradient-card hover:shadow-glow transition-all duration-500 hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <CardContent className="pt-8 relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors shadow-button">
                      <Zap className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Free URL Shortener API</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Access our powerful URL shortening API completely free. No sign up required, no limits on basic usage.
                  </p>
                </CardContent>
              </Card>

              <Card className="group border-0 bg-gradient-card hover:shadow-glow transition-all duration-500 hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <CardContent className="pt-8 relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-secondary/10 rounded-xl group-hover:bg-secondary/20 transition-colors shadow-button">
                      <QrCode className="h-7 w-7 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold">Link to QR Code Generator</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Convert any link to QR code instantly. Best free QR generator with high-resolution downloads for print and digital use.
                  </p>
                </CardContent>
              </Card>

              <Card className="group border-0 bg-gradient-card hover:shadow-glow transition-all duration-500 hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <CardContent className="pt-8 relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-accent/20 rounded-xl group-hover:bg-accent/30 transition-colors shadow-button">
                      <BarChart3 className="h-7 w-7 text-accent-foreground" />
                    </div>
                    <h3 className="text-xl font-bold">Free URL Shortener with Tracking</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Track clicks, analyze sources, and monitor performance. Advanced analytics for your shortened URLs at no cost.
                  </p>
                </CardContent>
              </Card>

              <Card className="group border-0 bg-gradient-card hover:shadow-glow transition-all duration-500 hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <CardContent className="pt-8 relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors shadow-button">
                      <Link2 className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Custom URL Shortener Free</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Create custom short URLs with your preferred names. URL shortener with custom name feature included free.
                  </p>
                </CardContent>
              </Card>

              <Card className="group border-0 bg-gradient-card hover:shadow-glow transition-all duration-500 hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <CardContent className="pt-8 relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-secondary/10 rounded-xl group-hover:bg-secondary/20 transition-colors shadow-button">
                      <Shield className="h-7 w-7 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold">No Sign Up Required</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Start shortening URLs immediately. No registration, no email verification, no waiting time required.
                  </p>
                </CardContent>
              </Card>

              <Card className="group border-0 bg-gradient-card hover:shadow-glow transition-all duration-500 hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <CardContent className="pt-8 relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-accent/20 rounded-xl group-hover:bg-accent/30 transition-colors shadow-button">
                      <Globe className="h-7 w-7 text-accent-foreground" />
                    </div>
                    <h3 className="text-xl font-bold">Link to QR Converter</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Convert links to QR codes with our advanced QR converter. Generate, customize, and download QR codes instantly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* URL History Section */}
        {user && (
          <section className="py-16 bg-gradient-subtle/50 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <URLHistory />
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-24 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-r from-white/10 via-transparent to-white/10 animate-pulse"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white">
              Start Using the Best Free URL Shortener
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands who trust lnkzip for free URL shortening with custom names, 
              QR code generation, and advanced tracking. No sign up required!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
              <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">✨ Free URL Shortener API</span>
              <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">🔗 Custom Short URLs</span>
              <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">📱 Link to QR Code</span>
              <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">📊 Free Tracking</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
