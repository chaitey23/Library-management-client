import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const LibraryStats = () => {
  const stats = [
    { number: 10000, label: 'Books Available' },
    { number: 5000, label: 'Members' },
    { number: 120, label: 'Events Hosted' },
  ];

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="bg-[#f5f5f5] py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-[#1a4137] mb-12">Library Statistics</h2>
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <h3 className="text-5xl font-extrabold text-[#c6d936] mb-2">
                {inView ? <CountUp end={stat.number} duration={2} separator="," /> : 0}
                {stat.label.includes('Books') || stat.label.includes('Members') ? '+' : ''}
              </h3>
              <p className="text-gray-600 text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LibraryStats;
