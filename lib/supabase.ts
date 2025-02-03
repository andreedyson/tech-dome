import { SUPABASE_KEY, SUPABASE_URL } from "@/constants";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = SUPABASE_URL as string;
const supabaseKey = SUPABASE_KEY as string;

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);

export const getImageUrl = (name: string) => {
  const { data } = supabase.storage
    .from("deal-dome-image")
    .getPublicUrl(`/public/brands/${name}`);

  return data.publicUrl;
};

export const uploadFile = async (
  file: File,
  path: "brands" | "products" = "brands",
) => {
  const fileType = file.type.split("/")[1];
  const fileName = `${path}-${Date.now()}.${fileType}`;

  await supabase.storage
    .from("deal-dome-image")
    .upload(`/public/${path}/${fileName}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  return fileName;
};
