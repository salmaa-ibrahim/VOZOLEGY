import { supabase } from "../lib/supabase";

/**
 * Get categories that are active and featured on homepage
 * Used by: CategoryShowcase
 */
export const getFeaturedCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("active", true)
    .eq("featured_on_home", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching featured categories:", error);
    throw error;
  }

  console.log("Featured Categories from Supabase:", data);

  return data || [];
};

/**
 * Get all active categories
 * Used by: MobileMenu, Footer, Categories page, etc.
 */
export const getAllCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching all categories:", error);
    throw error;
  }

  console.log("All Categories from Supabase:", data);

  return data || [];
};
