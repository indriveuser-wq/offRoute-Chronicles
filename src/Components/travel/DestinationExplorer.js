import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import ReactionButtons from '../blog/ReactionButtons';

const continentLabels = {
  europe: 'Europe',
  asia: 'Asia',
  africa: 'Africa',
  north_america: 'North America',
  south_america: 'South America',
  oceania: 'Oceania',
};

export default function DestinationExplorer({ destinations }) {
  const [activeContinent, setActiveContinent] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  const continents = ['all', ...new Set(destinations?.map(d => d.continent).filter(Boolean))];
  
  const filteredDestinations = activeContinent === 'all' 
    ? destinations 
    : destinations?.filter(d => d.continent === activeContinent);

  return (
    <section className="py-24 px-4 md:px-8 bg-[#1a1a2e] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c17f59]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#87a878]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 text-[#c17f59] mb-4">
            <Compass className="w-5 h-5" />
            <span className="text-sm tracking-[0.3em] uppercase">Explore Destinations</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-white">
            Where Will Your <span className="italic font-serif text-[#c17f59]">Journey</span> Take You?
          </h2>
        </motion.div>

        {/* Continent Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {continents.map((continent) => (
            <button
              key={continent}
              onClick={() => setActiveContinent(continent)}
              className={`px-6 py-2 rounded-full text-sm transition-all duration-300 ${
                activeContinent === continent
                  ? 'bg-[#c17f59] text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {continent === 'all' ? 'All' : continentLabels[continent] || continent}
            </button>
          ))}
        </motion.div>

        {/* Destinations Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredDestinations?.slice(0, 6).map((destination, index) => (
              <motion.div
                key={destination.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCard(destination.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative"
              >
                <div 
                  className="relative h-80 rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    transform: hoveredCard === destination.id 
                      ? 'perspective(1000px) rotateY(5deg) rotateX(5deg)' 
                      : 'perspective(1000px) rotateY(0deg) rotateX(0deg)',
                    transition: 'transform 0.5s ease-out',
                  }}
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=350&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent opacity-80" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-[#c17f59] text-xs tracking-wider uppercase">
                      {destination.country}
                    </span>
                    <h3 className="text-2xl text-white font-light mt-1 mb-2">
                      {destination.name}
                    </h3>
                    <p className="text-white/60 text-sm line-clamp-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {destination.description}
                    </p>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: hoveredCard === destination.id ? 1 : 0
                      }}
                      className="mb-3"
                    >
                      <ReactionButtons 
                        entityType="destination" 
                        entityId={destination.id} 
                        variant="compact"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: hoveredCard === destination.id ? 1 : 0,
                        y: hoveredCard === destination.id ? 0 : 20
                      }}
                      className="flex items-center gap-2 text-[#c17f59]"
                    >
                      <span className="text-sm">Explore</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>

                  {/* Highlight Border on Hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-[#c17f59] pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === destination.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}