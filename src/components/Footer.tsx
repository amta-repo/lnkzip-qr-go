import React from 'react';
import { Link2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Link2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                lnkzip
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              The fastest and most reliable URL shortener with advanced analytics and QR code generation.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>URL Shortener</div>
              <div>QR Code Generator</div>
              <div>Analytics Dashboard</div>
              <div>Custom Links</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>API Documentation</div>
              <div>Help Center</div>
              <div>Status Page</div>
              <div>Blog</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>About Us</div>
              <div>Privacy Policy</div>
              <div>Terms of Service</div>
              <div>Contact</div>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 lnkzip. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Developed by AMTECH-BJ
          </p>
        </div>
      </div>
    </footer>
  );
};