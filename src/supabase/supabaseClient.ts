// @ts-nocheck
import { createClient } from "@supabase/supabase-js";


const SUPABASE_URL = "https://qcdmlllkzdjajrdtmthk.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZG1sbGxremRqYWpyZHRtdGhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwNDc4NDYsImV4cCI6MjAyNjYyMzg0Nn0.GoF1Ppedn6Yyxxr3tjvSzugQECmt6DRJemrLdf9HVLw";

export const SUPABASE_CLIENT = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true, // This is generally true for web to handle OAuth redirects
  },
});


export const supabase = SUPABASE_CLIENT;