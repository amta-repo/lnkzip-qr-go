import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Free URL shortener and QR code generator. Custom short links, click analytics, public API — no sign-up required.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">URL Shortener</Link></li>
              <li><Link to="/qr-code-generator" className="hover:text-primary">QR Code Generator</Link></li>
              <li><Link to="/api" className="hover:text-primary">API Documentation</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
              <li><a href="/rss.xml" className="hover:text-primary">RSS Feed</a></li>
              <li><a href="/sitemap.xml" className="hover:text-primary">Sitemap</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary">About</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-sm text-muted-foreground">© 2026 lnkzip. All rights reserved.</p>
          <p className="text-sm text-muted-foreground">Developed by AMTECH-BJ</p>
        </div>
      </div>
    </footer>
  );
};
