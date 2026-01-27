import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Camera, Heart, Globe, Mail, Instagram, Twitter, Youtube } from 'lucide-react';
import Newsletter from '../Components/travel/Newsletter';

const stats = [
  { icon: Globe, value: '45+', label: 'Countries Explored' },
  { icon: Camera, value: '200+', label: 'Stories Shared' },
  { icon: Heart, value: '50K+', label: 'Community Members' },
  { icon: MapPin, value: '150+', label: 'Destinations Documented' },
];

const timeline = [
  { year: '2018', title: 'The Beginning', description: 'Started documenting travels with a simple blog and a camera.' },
  { year: '2019', title: 'First Viral Story', description: 'Our piece on hidden gems in Portugal reached millions of readers.' },
  { year: '2020', title: 'Community Growth', description: 'Built a community of passionate travelers during challenging times.' },
  { year: '2022', title: 'Global Recognition', description: 'Featured in major travel publications worldwide.' },
  { year: '2024', title: 'New Chapter', description: 'Launching interactive travel guides and local experiences.' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden bg-[#1a1a2e]">
        <div className="absolute inset-0 grid grid-cols-3">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
              alt="Nature"
              className="w-full h-full object-cover opacity-60"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80'; }}
            />
          </motion.div>
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&q=80"
              alt="Beach"
              className="w-full h-full object-cover opacity-60"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80'; }}
            />
          </motion.div>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
              alt="Mountains"
              className="w-full h-full object-cover opacity-60"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80'; }}
            />
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-[#1a1a2e]/70" />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#c17f59] text-sm tracking-[0.3em] uppercase mb-4"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-light text-white mb-6"
          >
            About <span className="italic font-serif text-[#c17f59]">offRoute</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-xl text-lg"
          >
            The story behind the stories that inspire your adventures
          </motion.p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/ddmleagbc/image/upload/v1769514555/IMG-20251220-WA0071_manhwg.jpg"
                  alt="Traveler"
                  className="w-full h-[500px] object-cover rounded-3xl"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80'; }}
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-6 -right-6 w-32 h-32 border-2 border-[#c17f59]/30 rounded-full"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-6 -left-6 bg-[#c17f59] text-white p-6 rounded-2xl"
                >
                  <p className="text-3xl font-light">6+</p>
                  <p className="text-sm opacity-80">Years of Adventures</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <span className="text-[#c17f59] text-sm tracking-[0.3em] uppercase">The Journey</span>
              <h2 className="text-4xl font-light text-[#1a1a2e]">
                From a Passion to a <span className="italic font-serif text-[#c17f59]">Movement</span>
              </h2>
              <p className="text-[#1a1a2e]/70 leading-relaxed">
                offRoute Chronicles started as a simple travel diary back in 2018. What began as personal 
                notes and photographs from solo adventures has evolved into a thriving community of passionate 
                travelers from around the globe.
              </p>
              <p className="text-[#1a1a2e]/70 leading-relaxed">
                Our mission is simple: to inspire authentic travel experiences through genuine storytelling. 
                We believe every destination has a unique story waiting to be told, and every traveler has 
                the potential to discover extraordinary moments in ordinary places.
              </p>
              <p className="text-[#1a1a2e]/70 leading-relaxed">
                Today, we're proud to share stories from over 45 countries, guide curious explorers to 
                hidden gems, and build a community that values sustainable and meaningful travel.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 md:px-8 bg-[#1a1a2e]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#c17f59]/20 flex items-center justify-center mb-4">
                  <stat.icon className="w-7 h-7 text-[#c17f59]" />
                </div>
                <p className="text-3xl md:text-4xl font-light text-white mb-2">{stat.value}</p>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#c17f59] text-sm tracking-[0.3em] uppercase">Our Journey</span>
            <h2 className="text-4xl font-light text-[#1a1a2e] mt-4">
              The <span className="italic font-serif text-[#c17f59]">Timeline</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[#c17f59]/20 transform md:-translate-x-1/2" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-[#c17f59] rounded-full transform -translate-x-1/2 z-10" />
                
                {/* Content */}
                <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <span className="text-[#c17f59] font-light text-xl">{item.year}</span>
                  <h3 className="text-xl text-[#1a1a2e] font-medium mt-1">{item.title}</h3>
                  <p className="text-[#1a1a2e]/60 mt-2">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 md:px-8 bg-[#f4e8d8]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#c17f59] text-sm tracking-[0.3em] uppercase">What We Stand For</span>
            <h2 className="text-4xl font-light text-[#1a1a2e] mt-4">
              Our <span className="italic font-serif text-[#c17f59]">Values</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Authentic Stories',
                description: 'We share real experiences, not sponsored content. Every story comes from genuine exploration.',
                icon: '✨'
              },
              {
                title: 'Sustainable Travel',
                description: 'We promote responsible tourism that respects local communities and preserves natural beauty.',
                icon: '🌱'
              },
              {
                title: 'Community First',
                description: 'We build connections between travelers who share the same passion for discovery.',
                icon: '❤️'
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <span className="text-4xl mb-4 block">{value.icon}</span>
                <h3 className="text-xl text-[#1a1a2e] mb-3">{value.title}</h3>
                <p className="text-[#1a1a2e]/60">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 px-4 md:px-8 bg-[#1a1a2e]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#c17f59] text-sm tracking-[0.3em] uppercase">Get in Touch</span>
            <h2 className="text-4xl font-light text-white mt-4 mb-8">
              Let's <span className="italic font-serif text-[#c17f59]">Connect</span>
            </h2>
            <p className="text-white/60 mb-10 max-w-xl mx-auto">
              Have a question, collaboration idea, or just want to say hello? 
              We'd love to hear from you.
            </p>

            <div className="flex justify-center gap-6 mb-12">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Youtube, label: 'YouTube' },
                { icon: Mail, label: 'Email' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c17f59] transition-colors"
                >
                  <social.icon className="w-5 h-5 text-white" />
                </motion.a>
              ))}
            </div>

            <a 
              href="mailto:contacttosubham@gmail.com"
              className="inline-flex items-center gap-2 text-white/80 hover:text-[#c17f59] transition-colors"
            >
              <Mail className="w-5 h-5" />
              contacttosubham@gmail.com
            </a>
          </motion.div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}