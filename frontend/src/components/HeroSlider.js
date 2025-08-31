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
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };

    const slides = [
        { id: 1, image: "/slide1.jpg", text: "Quality Seeds for a Bountiful Harvest" },
        { id: 2, image: "/slide2.jpg", text: "Advanced Fertilizers for Healthy Growth" },
        { id: 3, image: "/slide3.jpg", text: "Effective Solutions for Pest Control" },
    ];

    return (
        <div className="w-full mb-16">
            <Slider {...settings}>
                {slides.map((slide) => (
                    // This div is crucial: it sets the relative context for the Image component
                    <div key={slide.id} className="relative h-96 w-full">
                        <Image
                            src={slide.image}
                            alt={slide.text}
                            fill // Using fill to cover the parent div
                            className="object-cover"
                            // Added sizes to optimize image loading, adjust if needed
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                        />
                        {/* The overlay for better text readability */}
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <h2 className="text-white text-4xl md:text-5xl font-bold text-center drop-shadow-lg px-4">
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