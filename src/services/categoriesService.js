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
      image_url: '/images/categories/gear-50kk.webp',
      featured_on_home: true,
      active: true,
      display_order: 1
    },
    {
      id: 2,
      name: 'VOZOL STAR',
      puffs: '40000 puffs',
      slug: 'vozol-star-40k',
      image_url: '/images/categories/star-40kk.webp',
      featured_on_home: true,
      active: true,
      display_order: 2
    },
    {
      id: 3,
      name: 'VOZOL HOOKAH',
      puffs: '40000 puffs',
      slug: 'vozol-hookah-40k',
      image_url: '/images/categories/hookah-40k.webp',
      featured_on_home: true,
      active: true,
      display_order: 3
    }
  ];
};