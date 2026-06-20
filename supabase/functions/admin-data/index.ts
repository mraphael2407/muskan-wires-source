import { createClient } from "npm:@supabase/supabase-js@2.47.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function badRequest(msg: string): Response {
  return jsonResponse({ error: msg }, 400);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname.replace(/\/$/, "");

    // GET /admin-data/leads, /admin-data/quotes, /admin-data/dealers, /admin-data/contacts, /admin-data/newsletter
    if (req.method === "GET") {
      if (path === "/admin-data/leads") {
        const { data, error } = await supabase
          .from("leads")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw new Error(error.message);
        return jsonResponse({ data });
      }
      if (path === "/admin-data/quotes") {
        const { data, error } = await supabase
          .from("quote_requests")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw new Error(error.message);
        return jsonResponse({ data });
      }
      if (path === "/admin-data/dealers") {
        const { data, error } = await supabase
          .from("dealer_applications")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw new Error(error.message);
        return jsonResponse({ data });
      }
      if (path === "/admin-data/contacts") {
        const { data, error } = await supabase
          .from("contact_messages")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw new Error(error.message);
        return jsonResponse({ data });
      }
      if (path === "/admin-data/newsletter") {
        const { data, error } = await supabase
          .from("newsletter_subscribers")
          .select("*")
          .order("subscribed_at", { ascending: false });
        if (error) throw new Error(error.message);
        return jsonResponse({ data });
      }
      return badRequest("Unknown endpoint");
    }

    // PUT /admin-data/leads/:id, /admin-data/quotes/:id, /admin-data/dealers/:id, /admin-data/contacts/:id
    if (req.method === "PUT") {
      const segments = path.split("/");
      if (segments.length < 4) return badRequest("Missing ID");

      const table = segments[2];
      const id = segments[3];
      let tableName: string;

      if (table === "leads") tableName = "leads";
      else if (table === "quotes") tableName = "quote_requests";
      else if (table === "dealers") tableName = "dealer_applications";
      else if (table === "contacts") tableName = "contact_messages";
      else return badRequest("Unknown table");

      const body = await req.json();
      const { status } = body;
      if (!status) return badRequest("Status is required");

      const { data, error } = await supabase
        .from(tableName)
        .update({ status })
        .eq("id", id)
        .select();

      if (error) throw new Error(error.message);
      return jsonResponse({ data });
    }

    return badRequest("Method not allowed");
  } catch (err) {
    console.error("admin-data error:", err);
    return jsonResponse(
      { error: err instanceof Error ? err.message : "Unknown error" },
      500
    );
  }
});
