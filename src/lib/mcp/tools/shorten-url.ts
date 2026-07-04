import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
}

export default defineTool({
  name: "shorten_url",
  title: "Shorten URL",
  description:
    "Create a shortened URL (with QR code) for the signed-in user. Optionally provide a custom short code.",
  inputSchema: {
    originalUrl: z.string().url().describe("The long URL to shorten."),
    customCode: z
      .string()
      .trim()
      .min(1)
      .max(20)
      .regex(/^[a-z0-9-]+$/i)
      .optional()
      .describe("Optional custom short code (letters, numbers, hyphens)."),
  },
  annotations: { readOnlyHint: false, openWorldHint: true },
  handler: async ({ originalUrl, customCode }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return {
        content: [{ type: "text", text: "Not authenticated" }],
        isError: true,
      };
    }

    const supabase = supabaseForUser(ctx);
    const userId = ctx.getUserId();

    let shortCode = customCode;
    if (!shortCode) {
      for (let i = 0; i < 10 && !shortCode; i++) {
        const { data, error } = await supabase.rpc("generate_short_code");
        if (error) {
          return {
            content: [{ type: "text", text: error.message }],
            isError: true,
          };
        }
        const { data: existing } = await supabase
          .from("urls")
          .select("id")
          .eq("short_code", data)
          .maybeSingle();
        if (!existing) shortCode = data as string;
      }
    }
    if (!shortCode) {
      return {
        content: [{ type: "text", text: "Failed to generate unique short code" }],
        isError: true,
      };
    }

    const baseUrl = "https://lnkzip.com";
    const shortUrl = `${baseUrl}/${shortCode}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shortUrl)}`;

    const { data: row, error: insertError } = await supabase
      .from("urls")
      .insert({
        user_id: userId,
        original_url: originalUrl,
        short_code: shortCode,
        short_url: shortUrl,
        qr_code_url: qrCodeUrl,
        title: originalUrl,
      })
      .select()
      .single();

    if (insertError) {
      return {
        content: [{ type: "text", text: insertError.message }],
        isError: true,
      };
    }

    return {
      content: [
        {
          type: "text",
          text: `Shortened: ${shortUrl}\nQR: ${qrCodeUrl}`,
        },
      ],
      structuredContent: {
        id: row.id,
        shortCode,
        shortUrl,
        qrCodeUrl,
        originalUrl,
      },
    };
  },
});
