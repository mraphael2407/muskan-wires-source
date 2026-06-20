import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const edgeFnHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${supabaseAnonKey}`,
};

async function callEdgeFunction(path: string, payload: Record<string, unknown>) {
  const res = await fetch(`${supabaseUrl}/functions/v1/submit-forms/${path}`, {
    method: 'POST',
    headers: edgeFnHeaders,
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok || json.error) throw new Error(json.error ?? `Request failed (${res.status})`);
  return json.data;
}

export async function submitLead(leadData: {
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
}) {
  return callEdgeFunction('lead', leadData);
}

export async function submitQuoteRequest(quoteData: {
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
}) {
  return callEdgeFunction('quote', quoteData);
}

export async function submitDealerApplication(appData: {
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
}) {
  return callEdgeFunction('dealer', appData);
}

export async function submitContactMessage(msgData: {
  name: string;
  phone: string;
  email: string;
  subject?: string;
  message: string;
}) {
  return callEdgeFunction('contact', msgData);
}

export async function subscribeToNewsletter(email: string) {
  return callEdgeFunction('newsletter', { email });
}

export async function getMarketTrends() {
  const { data, error } = await supabase
    .from('market_trends')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6);
  if (error) throw error;
  return data;
}
