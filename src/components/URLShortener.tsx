import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2, Link2, Copy, Download, QrCode, ExternalLink } from 'lucide-react';

interface ShortenedURL {
  id: string;
  originalUrl: string;
  shortUrl: string;
  shortCode: string;
  qrCodeUrl: string;
  title: string;
  clickCount: number;
}

export const URLShortener: React.FC = () => {
  const { session } = useAuth();
  const [originalUrl, setOriginalUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState<ShortenedURL | null>(null);

  const validateUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!originalUrl.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a URL to shorten",
        variant: "destructive"
      });
      return;
    }

    if (!validateUrl(originalUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('shorten-url', {
        body: {
          originalUrl: originalUrl.trim(),
          customCode: customCode.trim() || undefined
        },
        headers: session ? {
          Authorization: `Bearer ${session.access_token}`
        } : {}
      });

      if (error) throw error;

      if (data.success) {
        setShortenedUrl(data.data);
        toast({
          title: "URL Shortened Successfully!",
          description: "Your short URL is ready to use"
        });
      } else {
        throw new Error(data.error || 'Unknown error occurred');
      }
    } catch (error: any) {
      console.error('Error shortening URL:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to shorten URL. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Short URL copied to clipboard"
    });
  };

  const downloadQR = (qrUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `${filename}-qr.png`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "QR Code Downloaded",
      description: "QR code saved to your downloads"
    });
  };

  const openInNewTab = (url: string) => {
    window.open(url, '_blank');
  };

  const resetForm = () => {
    setOriginalUrl('');
    setCustomCode('');
    setShortenedUrl(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="border-0 bg-gradient-to-br from-card to-accent/10 shadow-xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <Link2 className="h-6 w-6 text-primary" />
            Shorten Your URL
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleShorten} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="original-url">Enter your long URL</Label>
              <Input
                id="original-url"
                type="url"
                placeholder="https://example.com/very/long/url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="text-base"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="custom-code">Custom short code (optional)</Label>
              <Input
                id="custom-code"
                type="text"
                placeholder="my-custom-link"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                maxLength={20}
              />
              <p className="text-xs text-muted-foreground">
                Leave empty for auto-generated code. Only letters, numbers, and hyphens allowed.
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Shortening...' : 'Shorten URL'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {shortenedUrl && (
        <Card className="border-0 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center text-primary">
              Your Short URL is Ready! 🎉
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Original URL</Label>
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm text-muted-foreground truncate flex-1">
                    {shortenedUrl.originalUrl}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openInNewTab(shortenedUrl.originalUrl)}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Short URL</Label>
                <div className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <span className="font-mono text-primary flex-1 break-all">
                    {shortenedUrl.shortUrl}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(shortenedUrl.shortUrl)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openInNewTab(shortenedUrl.shortUrl)}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  QR Code
                </Label>
                <div className="flex flex-col items-center p-4 bg-background rounded-lg border">
                  <img
                    src={shortenedUrl.qrCodeUrl}
                    alt="QR Code"
                    className="w-32 h-32 mb-3"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadQR(shortenedUrl.qrCodeUrl, shortenedUrl.shortCode)}
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download QR
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Page Title</Label>
                  <p className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-lg">
                    {shortenedUrl.title}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Click Count</Label>
                  <div className="text-2xl font-bold text-primary p-3 bg-primary/5 rounded-lg text-center">
                    {shortenedUrl.clickCount}
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={resetForm}
              className="w-full"
            >
              Create Another Short URL
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};