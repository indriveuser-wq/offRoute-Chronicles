import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '../api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowUpRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '../Components/ui/input';

const categories = [
  { value: 'all', label: 'All Stories' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'culture', label: 'Culture' },
  { value: 'food', label: 'Food' },
  { value: 'nature', label: 'Nature' },
  { value: 'city', label: 'City' },
  { value: 'beach', label: 'Beach' },
  { value: 'mountains', label: 'Mountains' },
];

const categoryColors = {
  adventure: 'bg-orange-500',
  culture: 'bg-purple-500',
  food: 'bg-red-500',
  nature: 'bg-green-500',
  city: 'bg-blue-500',
  beach: 'bg-cyan-500',
  mountains: 'bg-slate-600',
};

export default function Stories() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: () => base44.entities.BlogPost.list('-created_date'),
  });

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#faf9f7] pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a2e] mb-4">
            Travel <span className="text-[#c17f59]">Stories</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover inspiring travel stories from around the world
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <Input
                placeholder="Search stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeCategory === cat.value
                    ? 'bg-[#c17f59] text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#c17f59]'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <AnimatePresence>
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/blog/${post.id}`}>
                  <motion.div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-all h-full cursor-pointer flex flex-col">
                    <div className="w-full h-64 bg-gray-200 overflow-hidden flex-shrink-0 relative group">
                      <img
                        src={post.image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=350&fit=crop'}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=350&fit=crop';
                        }}
                      />
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${categoryColors[post.category] || 'bg-gray-500'}`}>
                          {post.category}
                        </span>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock size={14} className="mr-1" />
                          {post.author}
                        </div>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-[#1a1a2e] mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-[#c17f59] font-semibold">
                        Read More <ArrowUpRight size={16} className="ml-2" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No stories found. Try adjusting your search or filters.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
 