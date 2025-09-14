import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[REDIRECT-URL] ${step}${detailsStr}`);
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

    let shortCode: string;
    
    if (req.method === "POST") {
      const body = await req.json();
      shortCode = body.shortCode;
    } else {
      const url = new URL(req.url);
      shortCode = url.pathname.split('/').pop() || "";
    }
    
    if (!shortCode) {
      throw new Error("Short code is required");
    }

    logStep("Processing redirect", { shortCode });

    // Get URL data
    const { data: urlData, error: selectError } = await supabaseClient
      .from('urls')
      .select('id, original_url, is_active, click_count')
      .eq('short_code', shortCode)
      .single();

    if (selectError || !urlData) {
      logStep("URL not found", { shortCode, error: selectError });
      return new Response("URL not found", { status: 404 });
    }

    if (!urlData.is_active) {
      logStep("URL is inactive", { shortCode });
      return new Response("URL is no longer active", { status: 410 });
    }

    logStep("URL found, redirecting", { 
      shortCode, 
      originalUrl: urlData.original_url,
      currentClicks: urlData.click_count
    });

    // Update click count
    const { error: updateError } = await supabaseClient
      .from('urls')
      .update({ 
        click_count: (urlData.click_count || 0) + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', urlData.id);

    if (updateError) {
      logStep("Failed to update click count", { error: updateError });
    }

    // Extract analytics data
    const userAgent = req.headers.get("User-Agent") || "";
    const referer = req.headers.get("Referer") || "";
    const forwardedFor = req.headers.get("X-Forwarded-For");
    const realIP = req.headers.get("X-Real-IP");
    const ipAddress = forwardedFor?.split(',')[0] || realIP || "unknown";

    // Simple device type detection
    let deviceType = "desktop";
    if (userAgent.toLowerCase().includes("mobile")) {
      deviceType = "mobile";
    } else if (userAgent.toLowerCase().includes("tablet")) {
      deviceType = "tablet";
    }

    // Insert analytics data (fire and forget)
    supabaseClient
      .from('url_analytics')
      .insert({
        url_id: urlData.id,
        user_agent: userAgent,
        ip_address: ipAddress,
        referer: referer,
        device_type: deviceType
      })
      .then(({ error }) => {
        if (error) {
          logStep("Failed to insert analytics", { error });
        } else {
          logStep("Analytics recorded successfully");
        }
      });

    // Return the redirect URL as JSON for function calls, or redirect for direct access
    if (req.method === "POST") {
      return new Response(JSON.stringify({ redirectUrl: urlData.original_url }), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    } else {
      // Direct URL access - redirect
      return new Response(null, {
        status: 302,
        headers: {
          Location: urlData.original_url,
          ...corsHeaders
        }
      });
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in redirect-url", { message: errorMessage });
    
    return new Response("Internal Server Error", {
      status: 500,
      headers: corsHeaders
    });
  }
});