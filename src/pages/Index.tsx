import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { URLShortener } from '@/components/URLShortener';
import { URLHistory } from '@/components/URLHistory';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link2, Zap, BarChart3, QrCode, Shield, Globe, Sparkles } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-primary py-16 md:py-24 lg:py-32">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8 animate-fade-in">
              <Badge className="mb-4 text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 bg-secondary/90 text-secondary-foreground hover:bg-secondary border-0">
                <Sparkles className="h-3 w-3 md:h-4 md:w-4 mr-1.5 inline" />
                Free URL Shortener API • No Sign Up Required
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight px-4">
                Free URL Shortener<br />
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">with QR Code Generator</span>
              </h1>
              
              <p className="text-base md:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed px-4">
                Create <span className="font-bold text-secondary">custom short URLs</span> with tracking, 
                convert <span className="font-bold text-secondary">links to QR codes</span>, 
                and analyze performance.
              </p>
              
              <p className="text-sm md:text-base lg:text-lg font-semibold text-secondary px-4">
                🎯 Best free URL shortener with custom names
              </p>
            </div>
          </div>
        </section>

        {/* URL Shortener Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4">
            <URLShortener />

          </div>
        </section>

        {/* Features Grid */}
        <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary">
                Powerful Features
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Everything you need for professional URL shortening
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              <Card className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 border border-border/50 hover:border-primary/50 bg-card">
                <CardContent className="p-5 md:p-6 space-y-3 md:space-y-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-button">
                    <Zap className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">Free URL Shortener API</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Access our powerful URL shortening API completely free. No sign up required, no limits on basic usage.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 border border-border/50 hover:border-primary/50 bg-card">
                <CardContent className="p-5 md:p-6 space-y-3 md:space-y-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform shadow-button">
                    <QrCode className="h-5 w-5 md:h-6 md:w-6 text-secondary-foreground" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">Link to QR Code Generator</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Convert any link to QR code instantly. Best free QR generator with high-resolution downloads.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 border border-border/50 hover:border-primary/50 bg-card">
                <CardContent className="p-5 md:p-6 space-y-3 md:space-y-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-accent flex items-center justify-center group-hover:scale-110 transition-transform shadow-button">
                    <BarChart3 className="h-5 w-5 md:h-6 md:w-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">Free URL Shortener with Tracking</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Track clicks, analyze sources, and monitor performance with advanced analytics at no cost.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 border border-border/50 hover:border-primary/50 bg-card">
                <CardContent className="p-5 md:p-6 space-y-3 md:space-y-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-button">
                    <Link2 className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">Custom URL Shortener Free</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Create custom short URLs with your preferred names. URL shortener with custom name feature included free.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 border border-border/50 hover:border-primary/50 bg-card">
                <CardContent className="p-5 md:p-6 space-y-3 md:space-y-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform shadow-button">
                    <Shield className="h-5 w-5 md:h-6 md:w-6 text-secondary-foreground" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">No Sign Up Required</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Start shortening URLs immediately. No registration, no email verification, no waiting.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 border border-border/50 hover:border-primary/50 bg-card">
                <CardContent className="p-5 md:p-6 space-y-3 md:space-y-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-accent flex items-center justify-center group-hover:scale-110 transition-transform shadow-button">
                    <Globe className="h-5 w-5 md:h-6 md:w-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">Link to QR Converter</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Convert links to QR codes with our advanced converter. Generate, customize, and download instantly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* URL History Section */}
        {user && (
          <section className="py-12 md:py-16 bg-muted/20">
            <div className="container mx-auto px-4">
              <URLHistory />
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 md:py-20 lg:py-24 bg-gradient-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[radial-gradient(circle,#ffffff33_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-white px-4">
              Start Using the Best Free URL Shortener
            </h2>
            <p className="text-base md:text-xl text-white/95 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              Join thousands who trust lnkzip for free URL shortening with custom names, 
              QR code generation, and advanced tracking. No sign up required!
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-xs md:text-sm text-white/90 px-4">
              <span className="bg-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-sm border border-white/20">✨ Free URL Shortener API</span>
              <span className="bg-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-sm border border-white/20">🔗 Custom Short URLs</span>
              <span className="bg-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-sm border border-white/20">📱 Link to QR Code</span>
              <span className="bg-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-sm border border-white/20">📊 Free Tracking</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
