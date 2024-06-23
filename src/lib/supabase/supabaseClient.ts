// @ts-nocheck

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://qcdmlllkzdjajrdtmthk.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZG1sbGxremRqYWpyZHRtdGhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwNDc4NDYsImV4cCI6MjAyNjYyMzg0Nn0.GoF1Ppedn6Yyxxr3tjvSzugQECmt6DRJemrLdf9HVLw";

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true, // This is generally true for web to handle OAuth redirects
  },
});
