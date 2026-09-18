import { supabase } from '../lib/supabase';

// NOTE: In a real environment, this fetches from Supabase.
// For the current build, we return mock data to match the UI.
export const getFeaturedCategories = async () => {
  // return await supabase.from('categories').select('*').eq('active', true).eq('featured_on_home', true).order('display_order');
  
  // MOCK DATA FOR DEVELOPMENT
  return [
    {
      id: 1,
      name: 'VOZOL GEAR',
      puffs: '50000 puffs',
      slug: 'vozol-gear-50k',
      image_url: '/images/categories/vozol-gear-50k-category-img.png',
      featured_on_home: true,
      active: true,
      display_order: 1
    },
    {
      id: 2,
      name: 'VOZOL STAR',
      puffs: '40000 puffs',
      slug: 'vozol-star-40k',
      image_url: '/images/categories/vozol-star-40k-category-img.png',
      featured_on_home: true,
      active: true,
      display_order: 2
    },
    {
      id: 3,
      name: 'VOZOL HOOKAH',
      puffs: '40000 puffs',
      slug: 'vozol-hookah-40k',
      image_url: '/images/categories/vozol-shisha-40k-category-img.png',
      featured_on_home: true,
      active: true,
      display_order: 3
    }
  ];
};