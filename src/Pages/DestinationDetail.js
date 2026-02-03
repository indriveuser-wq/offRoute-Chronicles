import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '../api/base44Client';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export default function DestinationDetail() {
  const { id } = useParams();

  const { data: destination, isLoading } = useQuery({
    queryKey: ['destination', id],
    queryFn: () => base44.entities.Destination.get(id),
    enabled: !!id,
  });

  const { data: posts = [] } = useQuery({
    queryKey: ['postsByDestination', id],
    queryFn: () => base44.entities.BlogPost.listByDestination(id),
    enabled: !!id,
  });

  if (isLoading) return null;
  if (!destination) return (
    <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
      <div>
        <h2 className="text-2xl">Destination not found</h2>
        <Link to="/destinations" className="text-[#c17f59] hover:underline">Back to destinations</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/40 to-transparent" />

        <Link to="/destinations" className="absolute top-24 left-4 md:left-8 z-20 text-white/80 hover:text-white">
          <motion.div whileHover={{ x: -5 }} className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Destinations</span>
          </motion.div>
        </Link>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-4xl mx-auto text-white">
            <div className="flex items-center gap-4 mb-4">
              <Compass className="w-5 h-5" />
              <span className="uppercase text-sm tracking-wider text-[#c17f59]">{destination.country}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-light">{destination.name}</h1>
            {destination.description && <p className="mt-4 max-w-3xl text-white/80">{destination.description}</p>}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-light mb-6">Stories & Posts about {destination.name}</h2>
          {posts.length === 0 ? (
            <p className="text-sm text-[#1a1a2e]/60">No posts found for this destination.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map(p => (
                <Link to={`/blog/${p.id}`} key={p.id} className="group">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img src={p.image} alt={p.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
                    <div className="p-4 bg-white">
                      <h3 className="text-xl font-light mb-2">{p.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{p.excerpt}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}