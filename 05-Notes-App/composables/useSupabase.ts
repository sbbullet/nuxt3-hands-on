import { createClient } from "@supabase/supabase-js";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNraWJiYmJyaGF4anpsdHNwZHlsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2MDMxMzgyMiwiZXhwIjoxOTc1ODg5ODIyfQ.mxpn9fYWDaGZFI_9MyK3PDzBQNQGktREJJXmA_xGgq4";
const SUPABASE_URL = "https://skibbbbrhaxjzltspdyl.supabase.co";

export function useSupabase() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  return { supabase };
}
