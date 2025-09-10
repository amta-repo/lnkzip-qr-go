import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SHORTEN-URL] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const { originalUrl, customCode } = await req.json();
    
    if (!originalUrl) {
      throw new Error("Original URL is required");
    }

    // Validate URL format
    try {
      new URL(originalUrl);
    } catch {
      throw new Error("Invalid URL format");
    }

    logStep("URL validated", { originalUrl });

    // Get user if authenticated
    let userId = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      try {
        const token = authHeader.replace("Bearer ", "");
        const { data: userData } = await supabaseClient.auth.getUser(token);
        userId = userData.user?.id || null;
        logStep("User authenticated", { userId });
      } catch (error) {
        logStep("Authentication failed, proceeding as anonymous", { error: error.message });
      }
    }

    // Generate or use custom short code
    let shortCode = customCode;
    let attempts = 0;
    const maxAttempts = 10;

    while (!shortCode && attempts < maxAttempts) {
      const { data, error } = await supabaseClient.rpc('generate_short_code');
      if (error) throw error;
      
      // Check if code already exists
      const { data: existing } = await supabaseClient
        .from('urls')
        .select('id')
        .eq('short_code', data)
        .single();
      
      if (!existing) {
        shortCode = data;
      }
      attempts++;
    }

    if (!shortCode) {
      throw new Error("Failed to generate unique short code");
    }

    logStep("Short code generated", { shortCode });

    // Fetch page title (optional)
    let title = originalUrl;
    try {
      const response = await fetch(originalUrl, { 
        method: 'GET',
        signal: AbortSignal.timeout(5000)
      });
      const html = await response.text();
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      if (titleMatch) {
        title = titleMatch[1].trim();
      }
    } catch (error) {
      logStep("Failed to fetch page title", { error: error.message });
    }

    const baseUrl = req.headers.get("origin") || "https://lnkzip.com";
    const shortUrl = `${baseUrl}/${shortCode}`;

    // Generate QR code URL using QR Server API
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shortUrl)}`;

    // Insert into database
    const { data: urlData, error: insertError } = await supabaseClient
      .from('urls')
      .insert({
        user_id: userId,
        original_url: originalUrl,
        short_code: shortCode,
        short_url: shortUrl,
        qr_code_url: qrCodeUrl,
        title: title
      })
      .select()
      .single();

    if (insertError) {
      logStep("Database insert failed", { error: insertError });
      throw insertError;
    }

    logStep("URL shortened successfully", { 
      shortCode, 
      shortUrl,
      userId: userId || 'anonymous'
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          id: urlData.id,
          originalUrl: originalUrl,
          shortUrl: shortUrl,
          shortCode: shortCode,
          qrCodeUrl: qrCodeUrl,
          title: title,
          clickCount: 0
        }
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in shorten-url", { message: errorMessage });
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});