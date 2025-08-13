import React, { useState } from 'react';
import banner1 from '../../assets/banner1.jpg';
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const libraryBanners = [
  {
    image: banner1,
    title: "Discover Your Next Great Read",
    description: "Browse thousands of books across genres and authors, all at your fingertips.",
    btn1: "Explore Books",
    btn2: "Join Now"
  },
  {
    image: banner2,
    title: "Borrow & Return Effortlessly",
    description: "Manage your borrowed books easily with our seamless borrowing and return system.",
    btn1: "View Borrowed Books",
    btn2: "Learn How It Works"
  },
  {
    image: banner3,
    title: "Add & Manage Books with Ease",
    description: "Contribute to our growing collection by adding new books and updating details anytime.",
    btn1: "Add a Book",
    btn2: "See Library Rules"
  }
];

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full h-[600px] mt-5 mb-32 overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className="h-full"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {libraryBanners.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-opacity-40"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-start px-10 md:px-20 text-white max-w-2xl ">
               <div className='border p-7 backdrop-blur-xs'>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg ">
                  {slide.title}
                </h2>
                <p className="mb-6 text-lg md:text-xl drop-shadow-lg">
                  {slide.description}
                </p>
                <div className="space-x-4">
                  <button className="bg-[#c6d936] text-[#1a4137] font-semibold px-6 py-2 rounded shadow hover:bg-[#b0c42d] transition">
                    {slide.btn1}
                  </button>
                  <button className="bg-transparent border border-white text-white font-semibold px-6 py-2 rounded hover:bg-white hover:text-[#1a4137] transition">
                    {slide.btn2}
                  </button></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
