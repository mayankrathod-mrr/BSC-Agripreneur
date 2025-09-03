// frontend/src/components/HeroSlider.js
"use client";

import Slider from "react-slick";
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    fade: true,
  };

  const slides = [
    { id: 1, image: "/slide1.jpg", text: "🌱 Quality Seeds for a Bountiful Harvest" },
    { id: 2, image: "/slide2.jpg", text: "🌾 Advanced Fertilizers for Healthy Growth" },
    { id: 3, image: "/slide3.jpg", text: "🛡 Effective Solutions for Pest Control" },
  ];

  return (
    <div className="relative h-[28rem] w-full mb-12">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-[28rem] w-full">
            <Image
              src={slide.image}
              alt={slide.text}
              fill
              className="object-cover"
              sizes="150vw"
              priority={slide.id === 1}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-900/50 to-black/40" />
            {/* Text */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold text-center drop-shadow-lg leading-snug">
                {slide.text}
              </h2>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom Dots */}
      <style jsx global>{`
        .slick-dots li button:before {
          font-size: 12px;
          color: white;
          opacity: 0.6;
        }
        .slick-dots li.slick-active button:before {
          color: #16a34a; /* Tailwind green-600 */
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
