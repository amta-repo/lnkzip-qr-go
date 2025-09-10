import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Copy, ExternalLink, QrCode, Download, TrendingUp, Calendar, Eye } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface URLRecord {
  id: string;
  original_url: string;
  short_url: string;
  short_code: string;
  qr_code_url: string;
  title: string;
  click_count: number;
  created_at: string;
  is_active: boolean;
}

export const URLHistory: React.FC = () => {
  const { session } = useAuth();
  const [urls, setUrls] = useState<URLRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      fetchUserUrls();
    }
  }, [session]);

  const fetchUserUrls = async () => {
    if (!session?.user) return;
    
    try {
      const { data, error } = await supabase
        .from('urls')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUrls(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load URL history",
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
      description: "URL copied to clipboard"
    });
  };

  const downloadQR = (qrUrl: string, shortCode: string) => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `${shortCode}-qr.png`;
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

  if (!session?.user) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Eye className="h-12 w-12 text-muted-foreground mx-auto" />
            <div>
              <h3 className="text-lg font-semibold">Sign in to view history</h3>
              <p className="text-muted-foreground">
                Create an account to track your shortened URLs and analytics
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-muted rounded-lg" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (urls.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto" />
            <div>
              <h3 className="text-lg font-semibold">No URLs yet</h3>
              <p className="text-muted-foreground">
                Start shortening URLs to see your history here
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">URL History</h2>
        <Badge variant="secondary">{urls.length} URLs</Badge>
      </div>
      
      <div className="space-y-4">
        {urls.map((url) => (
          <Card key={url.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm truncate">
                      {url.title}
                    </h3>
                    <Badge 
                      variant={url.is_active ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {url.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground truncate">
                      Original: {url.original_url}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-primary">
                        {url.short_url}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(url.short_url)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openInNewTab(url.short_url)}
                        className="h-6 w-6 p-0"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-2 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {url.click_count}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    clicks
                  </div>
                </div>
                
                <div className="lg:col-span-2 text-center">
                  <div className="flex items-center justify-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDistanceToNow(new Date(url.created_at), { addSuffix: true })}
                  </div>
                </div>
                
                <div className="lg:col-span-2 flex justify-center">
                  <div className="flex items-center gap-2">
                    <img
                      src={url.qr_code_url}
                      alt="QR Code"
                      className="w-8 h-8"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadQR(url.qr_code_url, url.short_code)}
                      className="h-8"
                    >
                      <QrCode className="h-3 w-3 mr-1" />
                      QR
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};