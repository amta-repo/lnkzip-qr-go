import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[GET-ANALYTICS] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    logStep("Function started");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Authentication required");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user) {
      throw new Error("Invalid authentication");
    }

    const userId = userData.user.id;
    logStep("User authenticated", { userId });

    const url = new URL(req.url);
    const urlId = url.searchParams.get('urlId');
    const days = parseInt(url.searchParams.get('days') || '30');

    if (!urlId) {
      throw new Error("URL ID is required");
    }

    // Verify user owns this URL
    const { data: urlData, error: urlError } = await supabaseClient
      .from('urls')
      .select('id, user_id')
      .eq('id', urlId)
      .eq('user_id', userId)
      .single();

    if (urlError || !urlData) {
      throw new Error("URL not found or access denied");
    }

    logStep("URL ownership verified", { urlId });

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get analytics data
    const { data: analytics, error: analyticsError } = await supabaseClient
      .from('url_analytics')
      .select('clicked_at, device_type, country, referer')
      .eq('url_id', urlId)
      .gte('clicked_at', startDate.toISOString())
      .order('clicked_at', { ascending: false });

    if (analyticsError) {
      logStep("Failed to fetch analytics", { error: analyticsError });
      throw analyticsError;
    }

    // Process analytics data
    const clicksByDay: { [key: string]: number } = {};
    const deviceTypes: { [key: string]: number } = {};
    const countries: { [key: string]: number } = {};
    const referrers: { [key: string]: number } = {};

    analytics?.forEach((record) => {
      const day = new Date(record.clicked_at).toISOString().split('T')[0];
      clicksByDay[day] = (clicksByDay[day] || 0) + 1;

      if (record.device_type) {
        deviceTypes[record.device_type] = (deviceTypes[record.device_type] || 0) + 1;
      }

      if (record.country) {
        countries[record.country] = (countries[record.country] || 0) + 1;
      }

      if (record.referer && record.referer !== "") {
        try {
          const refererDomain = new URL(record.referer).hostname;
          referrers[refererDomain] = (referrers[refererDomain] || 0) + 1;
        } catch {
          referrers["Direct"] = (referrers["Direct"] || 0) + 1;
        }
      } else {
        referrers["Direct"] = (referrers["Direct"] || 0) + 1;
      }
    });

    const totalClicks = analytics?.length || 0;

    logStep("Analytics processed", { 
      urlId, 
      totalClicks,
      daysAnalyzed: days
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          totalClicks,
          clicksByDay,
          deviceTypes,
          countries,
          referrers,
          recentClicks: analytics?.slice(0, 10) || []
        }
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in get-analytics", { message: errorMessage });
    
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