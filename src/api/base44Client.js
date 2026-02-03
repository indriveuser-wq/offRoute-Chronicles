// API Client for Base44 - Supports both Mock and Supabase
// Set USE_SUPABASE = true to use real database
// Set USE_SUPABASE = false to use mock data

console.log('🔍 Base44 Client Loading...');
console.log('REACT_APP_SUPABASE_URL:', process.env.REACT_APP_SUPABASE_URL ? '✅ Set' : '❌ Not set');
console.log('REACT_APP_SUPABASE_ANON_KEY:', process.env.REACT_APP_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Not set');

const USE_SUPABASE = process.env.REACT_APP_SUPABASE_URL ? true : false;
console.log('USE_SUPABASE:', USE_SUPABASE);

let supabaseClient = null;
let supabasePromise = null;

// Initialize Supabase if credentials are provided
function initializeSupabase() {
  console.log('🚀 Initializing Supabase...');
  if (supabasePromise || !USE_SUPABASE) {
    console.log('⏭️ Supabase already initializing or not needed');
    return Promise.resolve(null);
  }
  
  supabasePromise = (async () => {
    try {
      console.log('📦 Importing @supabase/supabase-js...');
      const { createClient } = await import('@supabase/supabase-js');
      console.log('✅ Supabase module imported');
      
      supabaseClient = createClient(
        process.env.REACT_APP_SUPABASE_URL,
        process.env.REACT_APP_SUPABASE_ANON_KEY
      );
      console.log('✅ Supabase client created successfully!');
      return supabaseClient;
    } catch (error) {
      console.error('❌ Supabase initialization failed:', error);
      return null;
    }
  })();
  
  return supabasePromise;
}

// Start initialization immediately
console.log('🎯 Starting Supabase initialization...');
initializeSupabase();

const mockBlogPosts = [
  {
    id: '1',
    title: 'Discovering Hidden Gems in Tokyo',
    excerpt: 'Explore the lesser-known attractions of Tokyo that most tourists miss',
    content: '# Discovering Hidden Gems in Tokyo\n\nTokyo is one of the most visited cities in the world, but there are so many hidden gems that tourists often miss. In this guide, we\'ll explore some of the best lesser-known attractions that will make your Tokyo experience truly unforgettable.\n\n## Off the Beaten Path\n\nWhile most tourists flock to Shibuya Crossing and Senso-ji Temple, savvy travelers know that the real Tokyo lies in its quiet neighborhoods and local establishments.\n\n## Local Markets\n\nVisit the local markets early in the morning to experience the authentic Tokyo. The Toyosu Market is a great place to see fresh fish and local produce.\n\n## Conclusion\n\nTokyo has so much to offer beyond the typical tourist trail. Take time to explore, wander, and discover your own hidden gems!',
    author: 'John Doe',
    created_date: new Date('2024-01-15'),
    image: 'https://images.unsplash.com/photo-1540959375944-7049f642e9d5?w=500&h=350&fit=crop',
    category: 'adventure',
    featured: true,
  },
  {
    id: '2',
    title: 'Street Food Adventures in Bangkok',
    excerpt: 'A culinary journey through Bangkok streets and local markets',
    content: '# Street Food Adventures in Bangkok\n\nBangkok is the street food capital of Southeast Asia. Walk through any street and you\'ll find vendors preparing delicious dishes right before your eyes.\n\n## Must-Try Street Foods\n\n- Pad Thai - The iconic Thai noodle dish\n- Mango Sticky Rice - A sweet dessert\n- Som Tam - Spicy papaya salad\n- Satay - Grilled meat skewers\n\n## Best Street Food Markets\n\nThe night markets of Bangkok are legendary. Start at Yaowarat for seafood, then head to Chatuchak Weekend Market for fresh produce and local delicacies.\n\n## Tips for Street Food\n\nAlways eat where locals eat, and don\'t be afraid to try something new. The best food experiences come from taking risks!',
    author: 'Jane Smith',
    created_date: new Date('2024-01-10'),
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=350&fit=crop',
    category: 'food',
    featured: true,
  },
  {
    id: '3',
    title: 'Culture and Temples of Bali',
    excerpt: 'Immerse yourself in the rich cultural heritage of Bali',
    content: '# Culture and Temples of Bali\n\nBali is more than just beaches. This Indonesian island is home to a rich spiritual and cultural heritage that has captivated visitors for centuries.\n\n## Sacred Temples\n\n- Tanah Lot Temple - Built on a rock formation\n- Tirta Empul - Water temple with healing pools\n- Besakih Temple - Mother temple of Bali\n\n## Local Traditions\n\nBali\'s culture is deeply rooted in Hinduism, unlike the rest of Muslim-majority Indonesia. You\'ll see colorful ceremonies and rituals throughout the island.\n\n## Visiting Tips\n\nDress respectfully when visiting temples, and always ask permission before taking photographs. Show respect for local customs and traditions.',
    author: 'Maria Garcia',
    created_date: new Date('2024-01-12'),
    image: 'https://images.unsplash.com/photo-1537225228614-b4fad34a0b60?w=500&h=350&fit=crop',
    category: 'culture',
    featured: true,
  },
  {
    id: '4',
    title: 'Mountain Trekking in Nepal',
    excerpt: 'Challenge yourself with breathtaking himalayan mountain trails',
    content: '# Mountain Trekking in Nepal\n\nNepal offers some of the most stunning trekking routes in the world. Whether you\'re a beginner or an experienced hiker, there\'s something for everyone.\n\n## Popular Trekking Routes\n\n1. **Everest Base Camp Trek** - The most famous trek, reaching the base camp of Mount Everest\n2. **Annapurna Circuit** - A diverse trek through various ecosystems\n3. **Langtang Valley** - Perfect for shorter treks\n\n## What to Expect\n\nHigh altitude, thin air, and stunning vistas. The trekking season is September to October and March to April.\n\n## Preparation\n\nPhysical fitness is important, but determination is more crucial. Start with smaller treks to acclimatize.',
    author: 'Alex Turner',
    created_date: new Date('2024-01-08'),
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=350&fit=crop',
    category: 'nature',
    featured: false,
  },
  {
    id: '5',
    title: 'Beach Hopping in Maldives',
    excerpt: 'Paradise islands with crystal clear waters and pristine beaches',
    content: '# Beach Hopping in Maldives\n\nThe Maldives is the ultimate beach destination. With over 1,000 islands, each with its own unique charm, beach hopping is an adventure in itself.\n\n## Best Islands to Visit\n\n- Malé - Capital island with culture and history\n- Kaafu Atoll - Close to the capital, perfect for quick trips\n- Ari Atoll - World-class diving and water sports\n- South Malé Atoll - Beautiful resorts and clear waters\n\n## Water Activities\n\n- Snorkeling and diving\n- Surfing\n- Windsurfing\n- Fishing\n\n## Best Time to Visit\n\nNovember to April is the dry season and the best time to visit the Maldives.',
    author: 'Emma Wilson',
    created_date: new Date('2024-01-05'),
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=500&h=350&fit=crop',
    category: 'beach',
    featured: false,
  },
  {
    id: '6',
    title: 'Urban Exploration in New York',
    excerpt: 'The city that never sleeps - art, food, and endless experiences',
    content: '# Urban Exploration in New York\n\nNew York City is a living, breathing organism of culture, art, food, and history. Every corner has a story to tell.\n\n## Iconic Neighborhoods\n\n- Times Square - The heart of the city\n- Greenwich Village - Artsy and bohemian\n- Chinatown - Authentic cuisine and culture\n- Brooklyn - Hipster haven with great music scene\n\n## Museums and Culture\n\nNYC has world-class museums including:\n- Metropolitan Museum of Art\n- MoMA\n- Natural History Museum\n\n## Foodie Paradise\n\nFrom street hot dogs to Michelin-starred restaurants, NYC has it all. Don\'t miss the pizza!',
    author: 'David Lee',
    created_date: new Date('2024-01-01'),
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500&h=350&fit=crop',
    category: 'city',
    featured: false,
  },
];

class Base44Client {
  constructor() {
    this.entities = {
      BlogPost: {
        list: async (sort) => {
          console.log('📋 BlogPost.list() called with sort:', sort);
          
          // Wait for Supabase to initialize
          if (USE_SUPABASE) {
            console.log('⏳ Waiting for Supabase to initialize...');
            await supabasePromise;
            console.log('✅ Supabase initialization complete, supabaseClient is:', supabaseClient ? 'Connected' : 'null');
          }
          
          // Use Supabase if available
          if (supabaseClient) {
            try {
              console.log('🔄 Fetching posts from Supabase...');
              let query = supabaseClient
                .from('blog_posts')
                .select('*');
              
              if (sort === '-created_date') {
                query = query.order('created_date', { ascending: false });
              }
              
              const { data, error } = await query;
              
              if (error) {
                console.error('❌ Supabase error:', error);
                throw error;
              }
              console.log('✅ Fetched from Supabase:', data?.length || 0, 'posts');
              return data || mockBlogPosts;
            } catch (error) {
              console.error('❌ Error fetching from Supabase:', error.message);
              console.log('📦 Falling back to mock data');
              return mockBlogPosts;
            }
          }
          
          // Fall back to mock data
          console.log('📦 Using mock data (', mockBlogPosts.length, 'posts)');
          if (sort === '-created_date') {
            return [...mockBlogPosts].sort((a, b) => b.created_date - a.created_date);
          }
          return mockBlogPosts;
        },
        get: async (id) => {
          // Wait for Supabase to initialize
          if (USE_SUPABASE) {
            await supabasePromise;
          }
          
          // Use Supabase if available
          if (supabaseClient) {
            try {
              const { data, error } = await supabaseClient
                .from('blog_posts')
                .select('*')
                .eq('id', id)
                .single();
              
              if (error) throw error;
              return data || mockBlogPosts.find(post => post.id === id);
            } catch (error) {
              console.error('Supabase error:', error);
              return mockBlogPosts.find(post => post.id === id);
            }
          }
          
          // Fall back to mock data
          return mockBlogPosts.find(post => post.id === id) || {
            id,
            title: 'Blog Post Not Found',
            content: 'This blog post does not exist',
            author: 'Unknown',
            created_date: new Date(),
          };
        },
        // Fetch posts for a specific destination (by id or name)
        listByDestination: async (destinationIdOrName) => {
          if (USE_SUPABASE) {
            await supabasePromise;
          }

          if (supabaseClient) {
            try {
              // First try by destination_id
              let { data, error } = await supabaseClient
                .from('blog_posts')
                .select('*')
                .eq('destination_id', destinationIdOrName)
                .order('created_date', { ascending: false });

              if (error) throw error;
              if (data && data.length > 0) return data;

              // Fall back to matching by destination name
              const { data: dataByName, error: nameErr } = await supabaseClient
                .from('blog_posts')
                .select('*')
                .eq('destination', destinationIdOrName)
                .order('created_date', { ascending: false });

              if (nameErr) throw nameErr;
              return dataByName || [];
            } catch (error) {
              console.error('Supabase error:', error);
              return [];
            }
          }

          // Fall back to mock data matching destination name
          return mockBlogPosts.filter(p => p.destination === destinationIdOrName);
        },
      },
      GalleryImage: {
        list: async (postId) => {
          // Wait for Supabase to initialize
          if (USE_SUPABASE) {
            await supabasePromise;
          }
          
          // Use Supabase if available
          if (supabaseClient) {
            try {
              const { data, error } = await supabaseClient
                .from('gallery_images')
                .select('*')
                .eq('post_id', postId)
                .order('created_date', { ascending: true });
              
              if (error) throw error;
              return data || [];
            } catch (error) {
              console.error('Supabase error:', error);
              return [];
            }
          }
          
          // Fall back to empty array for mock data
          return [];
        },
      },
      Destination: {
        list: async () => {
          // Wait for Supabase to initialize
          if (USE_SUPABASE) {
            await supabasePromise;
          }
          
          // Use Supabase if available
          if (supabaseClient) {
            try {
              const { data, error } = await supabaseClient
                .from('destinations')
                .select('*');
              
              if (error) throw error;
              if (data && data.length > 0) {
                console.log('📦 Fetched from Supabase:', data.length, 'destinations');
                return data;
              }
            } catch (error) {
              console.error('Supabase error:', error);
            }
          }
          
          // Fall back to mock data (default destinations)
          return [
            {
              id: '1',
              name: 'Tokyo, Japan',
              country: 'Japan',
              description: 'A vibrant metropolis blending tradition and modernity',
              image: 'https://images.unsplash.com/photo-1540959375944-7049f642e9d5?w=500&h=350&fit=crop',
              category: 'city',
              featured: true,
            },
            {
              id: '2',
              name: 'Bangkok, Thailand',
              country: 'Thailand',
              description: 'The city of angels with stunning temples and markets',
              image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=350&fit=crop',
              category: 'food_cafe',
              featured: true,
            },
            {
              id: '3',
              name: 'Paris, France',
              country: 'France',
              description: 'The city of love and art',
              image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&h=350&fit=crop',
              category: 'city',
              featured: true,
            },
            {
              id: '4',
              name: 'Bali, Indonesia',
              country: 'Indonesia',
              description: 'Tropical paradise with temples and beaches',
              image: 'https://images.unsplash.com/photo-1537225228614-b4fad34a0b60?w=500&h=350&fit=crop',
              category: 'adventure',
              featured: false,
            },
            {
              id: '5',
              name: 'Kathmandu, Nepal',
              country: 'Nepal',
              description: 'Gateway to the Himalayas with rich culture',
              image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=350&fit=crop',
              category: 'heritage',
              featured: false,
            },
            {
              id: '6',
              name: 'Maldives',
              country: 'Maldives',
              description: 'Island nation with crystal clear waters',
              image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=500&h=350&fit=crop',
              category: 'adventure',
              featured: false,
            },
          ];
        },
        get: async (id) => {
          if (USE_SUPABASE) {
            await supabasePromise;
          }

          if (supabaseClient) {
            try {
              const { data, error } = await supabaseClient
                .from('destinations')
                .select('*')
                .eq('id', id)
                .single();

              if (error) throw error;
              return data || null;
            } catch (error) {
              console.error('Supabase error:', error);
              return null;
            }
          }

          // Fall back to mock data
          const mock = [
            {
              id: '1',
              name: 'Tokyo, Japan',
              country: 'Japan',
              description: 'A vibrant metropolis blending tradition and modernity',
              image: 'https://images.unsplash.com/photo-1540959375944-7049f642e9d5?w=500&h=350&fit=crop',
              category: 'city',
              featured: true,
            }
          ];

          return mock.find(d => d.id === id) || null;
        },
      },
      Comment: {
        filter: async (filters = {}) => {
          if (USE_SUPABASE) {
            await supabasePromise;
          }

          if (supabaseClient) {
            try {
              let query = supabaseClient.from('comments').select('*');
              
              if (filters.post_id) {
                query = query.eq('post_id', filters.post_id);
              }
              
              const { data, error } = await query.order('created_date', { ascending: false });
              
              if (error) throw error;
              return data || [];
            } catch (error) {
              console.error('Supabase error:', error);
              return [];
            }
          }

          return [];
        },
        create: async (commentData) => {
          if (USE_SUPABASE) {
            await supabasePromise;
          }

          if (supabaseClient) {
            try {
              const { data, error } = await supabaseClient
                .from('comments')
                .insert([{
                  post_id: commentData.post_id,
                  author_name: commentData.author_name,
                  author_email: commentData.author_email,
                  content: commentData.content,
                  parent_id: commentData.parent_id || null,
                  created_date: new Date().toISOString(),
                }])
                .select();
              
              if (error) throw error;
              return data?.[0] || null;
            } catch (error) {
              console.error('Supabase error:', error);
              return null;
            }
          }

          return null;
        },
      },
      Reaction: {
        filter: async (filters = {}) => {
          if (USE_SUPABASE) {
            await supabasePromise;
          }

          if (supabaseClient) {
            try {
              let query = supabaseClient.from('reactions').select('*');
              
              if (filters.entity_type) {
                query = query.eq('entity_type', filters.entity_type);
              }
              if (filters.entity_id) {
                query = query.eq('entity_id', filters.entity_id);
              }
              if (filters.user_identifier) {
                query = query.eq('user_identifier', filters.user_identifier);
              }
              
              const { data, error } = await query;
              
              if (error) throw error;
              return data || [];
            } catch (error) {
              console.error('Supabase error:', error);
              return [];
            }
          }

          return [];
        },
        create: async (reactionData) => {
          if (USE_SUPABASE) {
            await supabasePromise;
          }

          if (supabaseClient) {
            try {
              const { data, error } = await supabaseClient
                .from('reactions')
                .insert([{
                  entity_type: reactionData.entity_type,
                  entity_id: reactionData.entity_id,
                  reaction_type: reactionData.reaction_type,
                  user_identifier: reactionData.user_identifier,
                  created_date: new Date().toISOString(),
                }])
                .select();
              
              if (error) throw error;
              return data?.[0] || null;
            } catch (error) {
              console.error('Supabase error:', error);
              return null;
            }
          }

          return null;
        },
        delete: async (reactionId) => {
          if (USE_SUPABASE) {
            await supabasePromise;
          }

          if (supabaseClient) {
            try {
              const { error } = await supabaseClient
                .from('reactions')
                .delete()
                .eq('id', reactionId);
              
              if (error) throw error;
              return true;
            } catch (error) {
              console.error('Supabase error:', error);
              return false;
            }
          }

          return false;
        },
      },
      Subscriber: {
        create: async (subscriberData) => {
          if (USE_SUPABASE) {
            await supabasePromise;
          }

          if (supabaseClient) {
            try {
              const { data, error } = await supabaseClient
                .from('subscribers')
                .insert([{
                  email: subscriberData.email,
                  created_date: new Date().toISOString(),
                }])
                .select();
              
              if (error) throw error;
              return data?.[0] || null;
            } catch (error) {
              console.error('Supabase error:', error);
              return null;
            }
          }

          return null;
        },
      },
    };
  }
}

export const base44 = new Base44Client();
