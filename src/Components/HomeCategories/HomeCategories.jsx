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
      desc: "Dive into timeless stories that take you through emotions, imagination, and unforgettable journeys across different cultures and eras."
    },
    {
      name: "Thriller",
      icon: <Star size={32} />,
      desc: "Edge of the seat suspense with unexpected twists, mysteries, and gripping narratives that will keep your heart racing till the last page."
    },
    {
      name: "History",
      icon: <Clock size={32} />,
      desc: "Learn from the past by exploring significant events, great personalities, and timeless lessons that shaped our world and civilizations."
    },
    {
      name: "Sci-Fi",
      icon: <Rocket size={32} />,
      desc: "Explore futuristic worlds filled with technology, space adventures, and imaginative possibilities that expand the limits of human thought."
    }
  ];

  return (
    <div className='mb-20'>
      <h1 className='text-5xl font-bold text-center mb-18 text-[#1a4137]'>Book Categories</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            className="group relative overflow-hidden border border-gray-400 rounded-xl bg-white font-semibold shadow-md p-8 min-h-[280px] transition-all duration-500 hover:shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#1a4137] to-[#c6d936]
               translate-y-full group-hover:translate-y-0
               transition-transform duration-500 ease-in-out"
            ></div>
            <div className='relative z-10'>
              <div
                className="flex  mb-4 text-[#1a4137] group-hover:text-white transition-colors duration-500"
              >
                {cat.icon}
              </div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-white transition-colors duration-300">{cat.name}</h2>
              <p className=" dark:text-gray-600  mb-4 group-hover:text-white/90 transition-colors duration-500 line-clamp-3">
                {cat.desc}
              </p>
              <Link
                to={`/category/${cat.name}`}
                className="mt-2 inline-flex  justify-center items-center  gap-1.5 px-4 py-2 text-[#1a4137] rounded-lg group-hover:text-white transition-colors duration-500"
              >View Books <FaArrowRightLong />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
