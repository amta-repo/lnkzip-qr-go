import React from 'react';
import { Helmet } from 'react-helmet';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'why-use-url-shortener',
    title: 'Why Your Business Needs a Free URL Shortener in 2025',
    excerpt: 'Discover how free URL shorteners can boost your marketing ROI, improve tracking, and enhance brand recognition with custom short links.',
    date: '2025-01-15',
    author: 'MikeGPT',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format',
    category: 'Marketing'
  },
  {
    id: '2',
    slug: 'qr-code-generator-guide',
    title: 'Complete Guide to QR Code Generation for Link Management',
    excerpt: 'Learn how to create QR codes from links, best practices for QR code marketing, and how link to QR conversion can boost offline campaigns.',
    date: '2025-01-10',
    author: 'MikeGPT',
    image: 'https://images.unsplash.com/photo-1617817546014-e1fe5b65e633?w=800&auto=format',
    category: 'Technology'
  },
  {
    id: '3',
    slug: 'custom-url-shortener-benefits',
    title: 'Custom URL Shortener: Build Trust with Branded Links',
    excerpt: 'Why custom short URLs matter for branding, how to create memorable short links with custom names, and tips for effective link management.',
    date: '2025-01-05',
    author: 'MikeGPT',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format',
    category: 'Business'
  },
  {
    id: '4',
    slug: 'url-analytics-tracking',
    title: 'Master URL Analytics: Track and Optimize Your Links',
    excerpt: 'Comprehensive guide to URL tracking, understanding click analytics, geographic data, and using insights to improve your marketing campaigns.',
    date: '2024-12-28',
    author: 'MikeGPT',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format',
    category: 'Analytics'
  },
  {
    id: '5',
    slug: 'free-url-shortener-no-signup',
    title: 'Best Free URL Shortener with No Sign Up Required',
    excerpt: 'Compare free URL shorteners, discover why no registration services are perfect for quick campaigns, and learn about API access options.',
    date: '2024-12-20',
    author: 'MikeGPT',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format',
    category: 'Tools'
  },
  {
    id: '6',
    slug: 'link-to-qr-code-converter',
    title: 'Link to QR Code: Converting URLs for Physical Marketing',
    excerpt: 'How to convert links to QR codes, best practices for print materials, and creative ways to use QR codes in your marketing strategy.',
    date: '2024-12-15',
    author: 'MikeGPT',
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&auto=format',
    category: 'Marketing'
  }
];

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>Blog - Free URL Shortener Tips & QR Code Marketing | lnkzip</title>
        <meta name="description" content="Expert insights on URL shortening, QR code generation, link tracking, and digital marketing strategies. Learn how to maximize your link management with lnkzip." />
        <meta name="keywords" content="url shortener blog, qr code marketing, link tracking tips, custom short links, branded urls, link management" />
        <link rel="canonical" href="https://lnkzip.com/blog" />
        <meta property="og:title" content="Blog - Free URL Shortener & Marketing Tips" />
        <meta property="og:description" content="Expert insights on URL shortening, QR codes, and link management strategies." />
        <meta property="og:url" content="https://lnkzip.com/blog" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/5">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                lnkzip Blog
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Expert insights on URL shortening, QR code generation, link analytics, and digital marketing strategies
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                  <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </span>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                      <span className="inline-block mt-4 text-primary font-medium group-hover:underline">
                        Read more →
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}