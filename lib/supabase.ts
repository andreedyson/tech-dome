import { SUPABASE_KEY, SUPABASE_URL } from "@/constants";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = SUPABASE_URL as string;
const supabaseKey = SUPABASE_KEY as string;

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);
const supabaseClient = supabase.storage.from("deal-dome-image");

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

  await supabaseClient.upload(`/public/${path}/${fileName}`, file, {
    cacheControl: "3600",
    upsert: false,
  });

  return fileName;
};

export const updateFile = async (
  prevFile: File,
  newFile: File,
  path: "brands" | "products" = "brands",
) => {
  const fileType = newFile.type.split("/")[1];
  const newFilename = `${path}-${Date.now()}.${fileType}`;
  const prevFilePath = `public/${path}/${prevFile.name}`;
  const filePath = `public/${path}/${newFilename}`;

  // Delete the old file if it exists
  if (prevFile.name) {
    await supabaseClient.remove([prevFilePath]);
  }

  await supabaseClient.upload(filePath, newFile, {
    cacheControl: "3600",
    upsert: true,
  });

  return newFilename;
};
