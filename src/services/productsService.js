import { supabase } from "../lib/supabase";

/**
 * Get all available products.
 */
export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("available", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

  return data ?? [];
};

/**
 * Get available products belonging to a specific category.
 */
export const getProductsByCategory = async (categoryId) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId)
    .eq("available", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }

  return data ?? [];
};

/**
 * Get one product by its ID.
 */
export const getProductById = async (productId) => {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        id,
        name,
        slug
      )
    `)
    .eq("id", productId)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    throw error;
  }

  return data;
};