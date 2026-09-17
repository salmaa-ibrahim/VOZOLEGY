import { supabase } from '../lib/supabase';

export const getProductsByCategory = async (categoryId) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .eq('available', true)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getProductBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('slug', slug)
    .single();
  if (error) throw error;
  return data;
};

// Mock data for initial dev without Supabase
export const getMockProduct = (slug) => ({
  id: 1,
  name: 'VOZOL GEAR 50K PUFFS',
  slug: slug,
  flavor: 'Watermelon Ice',
  price: 999,
  compare_at_price: 1200,
  image_url: '/images/products/vozol-gear-watermelon.webp',
  description: 'Premium VOZOL GEAR 50K flavor with a refreshing watermelon ice taste.',
  available: true,
  category: { name: 'VOZOL GEAR', slug: 'vozol-gear' }
});