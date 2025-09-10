import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const RedirectPage: React.FC = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (shortCode) {
      handleRedirect(shortCode);
    } else {
      setError('Invalid short code');
      setLoading(false);
    }
  }, [shortCode]);

  const handleRedirect = async (code: string) => {
    try {
      // Call the redirect function
      const response = await fetch(`${window.location.origin}/functions/v1/redirect-url/${code}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`
        }
      });

      if (response.redirected) {
        // If the response was redirected, follow it
        window.location.href = response.url;
        return;
      }

      if (response.status === 404) {
        setError('Short URL not found');
      } else if (response.status === 410) {
        setError('This URL is no longer active');
      } else if (!response.ok) {
        setError('Failed to redirect');
      }
    } catch (error) {
      console.error('Redirect error:', error);
      
      // Fallback: try to get URL from database directly
      try {
        const { data, error: dbError } = await supabase
          .from('urls')
          .select('original_url, is_active, click_count')
          .eq('short_code', code)
          .single();

        if (dbError || !data) {
          setError('Short URL not found');
          setLoading(false);
          return;
        }

        if (!data.is_active) {
          setError('This URL is no longer active');
          setLoading(false);
          return;
        }

        // Update click count
        await supabase
          .from('urls')
          .update({ 
            click_count: (data.click_count || 0) + 1,
            updated_at: new Date().toISOString()
          })
          .eq('short_code', code);

        // Set redirect URL for manual redirect
        setRedirectUrl(data.original_url);
        
        // Auto redirect after a short delay
        setTimeout(() => {
          window.location.href = data.original_url;
        }, 1000);

      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError);
        setError('Failed to redirect to the original URL');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <div className="text-center">
                <h3 className="text-lg font-semibold">Redirecting...</h3>
                <p className="text-muted-foreground">
                  Taking you to your destination
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
              <div className="text-center">
                <h3 className="text-lg font-semibold">Oops!</h3>
                <p className="text-muted-foreground mb-4">
                  {error}
                </p>
                <Button
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                >
                  Go to Homepage
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (redirectUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <ExternalLink className="h-8 w-8 text-primary" />
              <div className="text-center">
                <h3 className="text-lg font-semibold">Redirecting...</h3>
                <p className="text-muted-foreground mb-4">
                  If you're not redirected automatically, click below:
                </p>
                <Button
                  onClick={() => window.location.href = redirectUrl}
                  className="w-full"
                >
                  Continue to Destination
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};