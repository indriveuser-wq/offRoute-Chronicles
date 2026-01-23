// Mock API client for Base44 (replace with your actual API)
// This is a placeholder that returns mock data

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
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 300));
          
          // Return mock blog posts
          if (sort === '-created_date') {
            return [...mockBlogPosts].sort((a, b) => b.created_date - a.created_date);
          }
          return mockBlogPosts;
        },
        get: async (id) => {
          await new Promise(resolve => setTimeout(resolve, 200));
          return mockBlogPosts.find(post => post.id === id) || {
            id,
            title: 'Blog Post Not Found',
            content: 'This blog post does not exist',
            author: 'Unknown',
            created_date: new Date(),
          };
        },
      },
      Destination: {
        list: async () => {
          await new Promise(resolve => setTimeout(resolve, 300));
          return [
            {
              id: '1',
              name: 'Tokyo, Japan',
              description: 'A vibrant metropolis blending tradition and modernity',
              image: 'https://images.unsplash.com/photo-1540959375944-7049f642e9d5?w=500&h=350&fit=crop',
              rating: 4.8,
            },
            {
              id: '2',
              name: 'Bangkok, Thailand',
              description: 'The city of angels with stunning temples and markets',
              image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=350&fit=crop',
              rating: 4.6,
            },
            {
              id: '3',
              name: 'Paris, France',
              description: 'The city of love and art',
              image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&h=350&fit=crop',
              rating: 4.9,
            },
            {
              id: '4',
              name: 'Bali, Indonesia',
              description: 'Tropical paradise with temples and beaches',
              image: 'https://images.unsplash.com/photo-1537225228614-b4fad34a0b60?w=500&h=350&fit=crop',
              rating: 4.7,
            },
            {
              id: '5',
              name: 'Kathmandu, Nepal',
              description: 'Gateway to the Himalayas with rich culture',
              image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=350&fit=crop',
              rating: 4.5,
            },
            {
              id: '6',
              name: 'Maldives',
              description: 'Island nation with crystal clear waters',
              image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=500&h=350&fit=crop',
              rating: 4.9,
            },
          ];
        },
      },
    };
  }
}

export const base44 = new Base44Client();
