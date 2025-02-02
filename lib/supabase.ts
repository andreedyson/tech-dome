import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);

export const getImageUrl = (name: string) => {
  const { data } = supabase.storage
    .from("deal-dome-image")
    .getPublicUrl(`public/assets/brands/${name}`);

  return data.publicUrl;
};
