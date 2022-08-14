import { createClient } from "@supabase/supabase-js";
const SUPABASE_KEY =
  "your_supabase_key";
const SUPABASE_URL = "your_supabase_url";

export function useSupabase() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  return { supabase };
}
