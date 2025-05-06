'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const countries = [
  {
    title: 'BRAZIL',
    description: 'Brazil is the largest country in South America...',
    image: '/images/brazil.jpg',
  },
  {
    title: 'INDIA',
    description: 'Discover the unique land of India...',
    image: '/images/india.jpg',
  },
  {
    title: 'EGYPT',
    description: 'Discover the best of Egypt...',
    image: '/images/egypt.jpg',
  },
  {
    title: 'PHILIPPINES',
    description: 'Welcome to Philippines...',
    image: '/images/philip.jpg',
  },
  {
    title: 'CANADA',
    description: 'Canada is the second-largest country...',
    image: '/images/canada.jpg',
  },
];

const CountrySlider = () => {
  return (
    <div className="bg-white py-10">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        className="w-[90%] mx-auto"
      >
        {countries.map((country, index) => (
          <SwiperSlide key={index}>
            <div
              className="rounded-xl overflow-hidden shadow-lg relative"
              style={{
                backgroundImage: `url(${country.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '250px',
              }}
            >
              <div className="bg-black bg-opacity-40 h-full p-6 flex flex-col justify-end text-white">
                <h2 className="text-2xl font-bold">{country.title}</h2>
                <p className="text-sm mt-2">{country.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CountrySlider;
