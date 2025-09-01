// frontend/src/components/HeroSlider.js
"use client";

import Slider from "react-slick";
import Image from "next/image";

// We need to import the CSS files for react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000, 
        pauseOnHover: true,
        accessibility: true,
        focusOnSelect: true,
    };

    const slides = [
        { id: 1, image: "/slide1.jpg", text: "Quality Seeds for a Bountiful Harvest" },
        { id: 2, image: "/slide2.jpg", text: "Advanced Fertilizers for Healthy Growth" },
        { id: 3, image: "/slide3.jpg", text: "Effective Solutions for Pest Control" },
    ];

    return (
        <div className="relative h-96 w-full mb-12">
            <Slider {...settings}>
                {slides.map((slide) => (
                    <div key={slide.id} className="relative h-80 w-full">
                         <Image
                            src={slide.image}
                            alt={slide.text}
                            fill // Use the modern 'fill' prop
                            className="object-cover" // Use Tailwind for object-fit
                            sizes="100vw" // Good practice for performance with 'fill'
                            priority={slide.id === 1} // Prioritize loading the first image
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h2 className="text-white text-4xl font-bold text-center drop-shadow-lg">
                                {slide.text}
                            </h2>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HeroSlider;
