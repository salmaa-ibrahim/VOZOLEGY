import { supabase } from "../lib/supabase";

export const searchProducts = async (query) => {
  const search = query.trim();

  if (!search) {
    return [];
  }

  const { data, error } = await supabase
    .from("products")
    .select("id, name, price, flavor, available, image_url")
    .or(`name.ilike.%${search}%,flavor.ilike.%${search}%`)
    .eq("available", true)
    .order("name", { ascending: true })
    .limit(8);

  if (error) {
    console.error("Search products error:", error);
    throw error;
  }

  return data || [];
};