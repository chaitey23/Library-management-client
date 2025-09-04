import React from 'react';
import { motion } from 'framer-motion';

const AboutLibrary = () => {
    return (
        <section className=" px-4 py-16">
            <div className="flex flex-col md:flex-row items-center gap-8  shadow-2xl rounded-2xl px-2 md:px-0">
                <motion.div initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }} className="flex-1 h-90 md:h-[700px]">
                    <img
                        src="https://i.ibb.co.com/RL6qF9W/library.jpg"
                        alt="About Library"
                        className="w-full h-full rounded-xl shadow-lg object-cover"
                    />
                </motion.div>

               
                < motion.div initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }} className="flex-1">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1a4137] ">About <span className='text-[#c6d936]'>The</span> Library</h2>
                    <p className="text-gray-500 mb-6 text-[16px] md:text-[18px] leading-relaxed">
                        Welcome to our library, a haven for readers, learners, and knowledge seekers of all ages. From timeless classics to contemporary bestsellers, our diverse collection caters to every taste and interest. Enjoy a peaceful environment perfect for study, research, or leisure reading. Our library also hosts community events, workshops, and interactive sessions that foster curiosity and lifelong learning.
                    </p>

                    <button className="px-6 py-3 bg-gradient-to-r from-[#c6d936] to-[#6dd36d] text-white font-semibold rounded-3xl  transition">
                        Explore Books
                    </button>
                </motion.div>

            </div>
        </section>

    );
};

export default AboutLibrary;
