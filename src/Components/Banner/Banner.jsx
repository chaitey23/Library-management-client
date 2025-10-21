import React, { useState } from 'react';
import { useNavigate } from 'react-router';
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
    btn1Path: "/all-books",
    btn2: "Join Now",
    btn2Path: "/register"
  },
  {
    image: banner2,
    title: "Borrow & Return Effortlessly",
    description: "Manage your borrowed books easily with our seamless borrowing and return system.",
    btn1: "View Borrowed Books",
    btn1Path: "/borrowed-books",
    btn2: "Learn How It Works",
    btn2Path: "/contact"
  },
  {
    image: banner3,
    title: "Add & Manage Books with Ease",
    description: "Contribute to our growing collection by adding new books and updating details anytime.",
    btn1: "Add a Book",
    btn1Path: "/add-book",
    btn2: "See Library Rules",
    btn2Path: "/contact"
  }
];

const Banner = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] mb-16 overflow-hidden mt-14">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        navigation
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        speed={800}
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
                className="w-full h-full object-cover brightness-75"
                loading='lazy'
              />

              <div className="absolute inset-0 bg-black/30"></div>

              <div className="absolute inset-0 flex flex-col justify-center items-start px-4 sm:px-10 md:px-20 text-white">
                <div className='backdrop-blur-sm bg-black/20 p-6 sm:p-8 rounded-lg border border-white/20 max-w-2xl'>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="mb-4 sm:mb-6 text-sm sm:text-lg md:text-xl leading-relaxed">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                      onClick={() => handleButtonClick(slide.btn1Path)}
                      className="btn bg-[#c6d936] hover:bg-[#b0c42d] text-[#1a4137] font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      {slide.btn1}
                    </button>
                    <button
                      onClick={() => handleButtonClick(slide.btn2Path)}
                      className="btn btn-outline border-2 border-white text-white hover:bg-white hover:text-[#1a4137] font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                    >
                      {slide.btn2}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Optional: Progress indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {libraryBanners.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === activeIndex ? 'bg-[#c6d936]' : 'bg-white/50'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
