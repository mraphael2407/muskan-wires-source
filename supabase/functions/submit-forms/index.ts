import { createClient } from "npm:@supabase/supabase-js@2.47.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  company?: string;
  city?: string;
  product_interest?: string[];
  project_type?: string;
  quantity?: string;
  timeline?: string;
  budget?: string;
  specifications?: string;
  additional_info?: string;
  source?: string;
}

interface QuotePayload {
  name: string;
  phone: string;
  email: string;
  company?: string;
  city: string;
  products: string[];
  project_type?: string;
  quantity?: string;
  timeline?: string;
  budget?: string;
  specifications?: string;
  additional_info?: string;
}

interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  subject?: string;
  message: string;
}

interface DealerPayload {
  name: string;
  phone: string;
  email: string;
  business_name: string;
  business_type?: string;
  city: string;
  state: string;
  experience?: string;
  investment_capacity?: string;
  storage_capacity?: string;
  message?: string;
}

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  return /^[\d\s\-\+\(\)]{6,20}$/.test(phone);
}

function badRequest(msg: string): Response {
  return new Response(
    JSON.stringify({ error: msg }),
    { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

function successResponse(data: unknown): Response {
  return new Response(
    JSON.stringify({ success: true, data }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

function errorResponse(err: Error): Response {
  return new Response(
    JSON.stringify({ error: err.message }),
    { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return badRequest("Only POST requests are accepted");
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname.replace(/\/$/, "");

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return badRequest("Invalid JSON body");
    }

    // Handle form submission types
    if (path === "/submit-forms/lead" || path === "/submit-forms/leads") {
      const payload = body as LeadPayload;
      if (!payload.name || !payload.name.trim()) return badRequest("Name is required");
      if (!payload.phone || !payload.phone.trim()) return badRequest("Phone is required");
      if (!validatePhone(payload.phone)) return badRequest("Invalid phone number");
      if (payload.email && !validateEmail(payload.email)) return badRequest("Invalid email");

      const { data, error } = await supabase
        .from("leads")
        .insert([{
          name: payload.name.trim(),
          phone: payload.phone.trim(),
          email: payload.email?.trim() || null,
          company: payload.company?.trim() || null,
          city: payload.city?.trim() || null,
          product_interest: payload.product_interest || null,
          project_type: payload.project_type?.trim() || null,
          quantity: payload.quantity?.trim() || null,
          timeline: payload.timeline?.trim() || null,
          budget: payload.budget?.trim() || null,
          specifications: payload.specifications?.trim() || null,
          additional_info: payload.additional_info?.trim() || null,
          source: payload.source?.trim() || "website",
        }])
        .select();

      if (error) throw new Error(error.message);
      return successResponse(data);
    }

    if (path === "/submit-forms/quote" || path === "/submit-forms/quote-request") {
      const payload = body as QuotePayload;
      if (!payload.name || !payload.name.trim()) return badRequest("Name is required");
      if (!payload.phone || !payload.phone.trim()) return badRequest("Phone is required");
      if (!validatePhone(payload.phone)) return badRequest("Invalid phone number");
      if (!payload.email || !payload.email.trim()) return badRequest("Email is required");
      if (!validateEmail(payload.email)) return badRequest("Invalid email");
      if (!payload.city || !payload.city.trim()) return badRequest("City is required");
      if (!payload.products || !Array.isArray(payload.products) || payload.products.length === 0) {
        return badRequest("At least one product is required");
      }

      const { data, error } = await supabase
        .from("quote_requests")
        .insert([{
          name: payload.name.trim(),
          phone: payload.phone.trim(),
          email: payload.email.trim(),
          company: payload.company?.trim() || null,
          city: payload.city.trim(),
          products: payload.products,
          project_type: payload.project_type?.trim() || null,
          quantity: payload.quantity?.trim() || null,
          timeline: payload.timeline?.trim() || null,
          budget: payload.budget?.trim() || null,
          specifications: payload.specifications?.trim() || null,
          additional_info: payload.additional_info?.trim() || null,
        }])
        .select();

      if (error) throw new Error(error.message);
      return successResponse(data);
    }

    if (path === "/submit-forms/contact" || path === "/submit-forms/contact-message") {
      const payload = body as ContactPayload;
      if (!payload.name || !payload.name.trim()) return badRequest("Name is required");
      if (!payload.phone || !payload.phone.trim()) return badRequest("Phone is required");
      if (!validatePhone(payload.phone)) return badRequest("Invalid phone number");
      if (!payload.email || !payload.email.trim()) return badRequest("Email is required");
      if (!validateEmail(payload.email)) return badRequest("Invalid email");
      if (!payload.message || !payload.message.trim()) return badRequest("Message is required");

      const { data, error } = await supabase
        .from("contact_messages")
        .insert([{
          name: payload.name.trim(),
          phone: payload.phone.trim(),
          email: payload.email.trim(),
          subject: payload.subject?.trim() || null,
          message: payload.message.trim(),
        }])
        .select();

      if (error) throw new Error(error.message);
      return successResponse(data);
    }

    if (path === "/submit-forms/dealer" || path === "/submit-forms/dealer-application") {
      const payload = body as DealerPayload;
      if (!payload.name || !payload.name.trim()) return badRequest("Name is required");
      if (!payload.phone || !payload.phone.trim()) return badRequest("Phone is required");
      if (!validatePhone(payload.phone)) return badRequest("Invalid phone number");
      if (!payload.email || !payload.email.trim()) return badRequest("Email is required");
      if (!validateEmail(payload.email)) return badRequest("Invalid email");
      if (!payload.business_name || !payload.business_name.trim()) return badRequest("Business name is required");
      if (!payload.city || !payload.city.trim()) return badRequest("City is required");
      if (!payload.state || !payload.state.trim()) return badRequest("State is required");

      const { data, error } = await supabase
        .from("dealer_applications")
        .insert([{
          name: payload.name.trim(),
          phone: payload.phone.trim(),
          email: payload.email.trim(),
          business_name: payload.business_name.trim(),
          business_type: payload.business_type?.trim() || null,
          city: payload.city.trim(),
          state: payload.state.trim(),
          experience: payload.experience?.trim() || null,
          investment_capacity: payload.investment_capacity?.trim() || null,
          storage_capacity: payload.storage_capacity?.trim() || null,
          message: payload.message?.trim() || null,
        }])
        .select();

      if (error) throw new Error(error.message);
      return successResponse(data);
    }

    if (path === "/submit-forms/newsletter" || path === "/submit-forms/newsletter-subscribe") {
      const email = body.email as string;
      if (!email || !email.trim()) return badRequest("Email is required");
      if (!validateEmail(email)) return badRequest("Invalid email");

      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email: email.trim() }])
        .select();

      if (error) {
        // Duplicate email is a 409 conflict
        if (error.message?.includes("duplicate") || error.code === "23505") {
          return new Response(
            JSON.stringify({ success: true, message: "Already subscribed" }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        throw new Error(error.message);
      }

      return successResponse(data);
    }

    return badRequest(`Unknown endpoint: ${path}`);
  } catch (err) {
    console.error("submit-forms error:", err);
    return errorResponse(err instanceof Error ? err : new Error("Unknown error"));
  }
});
