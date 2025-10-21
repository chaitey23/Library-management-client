import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Rocket, Star } from 'lucide-react';
import { Link } from 'react-router';
import { FaArrowRightLong } from 'react-icons/fa6';

const HomeCategories = () => {
  const categories = [
    {
      name: "Novel",
      icon: <BookOpen size={32} />,
      desc: "Dive into timeless stories that take you through emotions, imagination, and unforgettable journeys across different cultures and eras.",

    },
    {
      name: "Thriller",
      icon: <Star size={32} />,
      desc: "Edge of the seat suspense with unexpected twists, mysteries, and gripping narratives that will keep your heart racing till the last page.",

    },
    {
      name: "History",
      icon: <Clock size={32} />,
      desc: "Learn from the past by exploring significant events, great personalities, and timeless lessons that shaped our world and civilizations.",

    },
    {
      name: "Sci-Fi",
      icon: <Rocket size={32} />,
      desc: "Explore futuristic worlds filled with technology, space adventures, and imaginative possibilities that expand the limits of human thought.",

    }
  ];

  return (
    <div className='mb-20 px-4 sm:px-6 lg:px-8'>
      {/* Header improvement */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className='text-4xl sm:text-5xl font-bold mb-4 text-[#1a4137]'>
          Explore Book Categories
        </h1>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
          Discover books from various genres that match your reading preferences and interests
        </p>
      </motion.div>

      {/* Categories Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            className="group relative overflow-hidden border border-gray-200 rounded-2xl bg-white font-semibold shadow-lg p-6 min-h-[320px] transition-all duration-500 hover:shadow-2xl hover:border-transparent"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Gradient Background */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#1a4137] to-[#c6d936] translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500 ease-in-out"
            ></div>

            <div className='relative z-10 h-full flex flex-col'>
              <div className="flex mb-4 text-white md:text-[#1a4137] group-hover:text-white transition-colors duration-500">
                {cat.icon}
              </div>

              <h2 className="text-xl font-bold mb-2 text-white md:text-[#1a4137] group-hover:text-white transition-colors duration-300">
                {cat.name}
              </h2>

              <p className="text-white md:text-gray-600 mb-4 group-hover:text-white/90 transition-colors duration-500 line-clamp-3 flex-grow">
                {cat.desc}
              </p>



              {/* View Books Link */}
              <Link
                to={`/category/${cat.name}`}
                className="mt-auto inline-flex items-center gap-2 px-4 py-2 text-white md:text-[#1a4137] rounded-lg group-hover:text-white transition-all duration-300 group-hover:bg-white/20 hover:gap-3"
              >
                View Books
                <FaArrowRightLong className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Categories Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center mt-12"
      >
        <Link
          to="/all-books"
          className="inline-flex items-center gap-2 bg-[#1a4137] text-white px-8 py-3 rounded-lg hover:bg-[#2a5c4f] transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          View All Categories
          <FaArrowRightLong />
        </Link>
      </motion.div>
    </div>
  );
};

export default HomeCategories;