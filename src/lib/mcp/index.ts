import { auth, defineMcp } from "@lovable.dev/mcp-js";
import shortenUrlTool from "./tools/shorten-url";
import listUrlsTool from "./tools/list-urls";

const projectRef =
  import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "lnkzip-mcp",
  title: "lnkzip MCP",
  version: "0.1.0",
  instructions:
    "Tools for lnkzip URL shortener. Use `shorten_url` to create a new short link (with QR code) and `list_urls` to fetch the signed-in user's links with click counts.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [shortenUrlTool, listUrlsTool],
});
