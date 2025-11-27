'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CarouselItem {
  id: number;
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  items: CarouselItem[];
  fullHeight?: boolean;
}

export default function ImageCarousel({ items, fullHeight = false }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [items.length]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={`relative w-full overflow-hidden ${fullHeight ? 'h-screen' : 'h-96'}`}>
      {/* Carousel Images */}
      <div className="absolute inset-0 w-full h-full">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>


      {/* Hero Text Content - Center */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
        <div className="backdrop-blur-lg bg-white bg-opacity-10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 max-w-2xl shadow-2xl border border-white border-opacity-50 animate-fade-in">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-black mb-4 sm:mb-6 leading-tight animate-fade-in">
              Our Institution.<br />Our Future.<br />Our Fight.
            </h1>
            <p className="text-xs sm:text-base lg:text-lg text-gray-900 mb-4 sm:mb-6 leading-relaxed animate-fade-in-delay">
              Education is not a commodity to be sold.
              <br />
              <span className="font-semibold">SBRR Mahajanas belongs to the people—not the profit seekers.</span>
            </p>
            <p className="text-xs sm:text-sm lg:text-base text-gray-800 mb-6 sm:mb-8 animate-fade-in-delay-2">
              Stand with us. Sign the petition. Preserve public education.
            </p>
            <button
              onClick={() => {
                const petitionElement = document.getElementById('petition-section');
                if (petitionElement) {
                  petitionElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-4 sm:px-8 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs sm:text-base transition transform hover:scale-105 cursor-pointer"
            >
              Add Your Signature Now
            </button>
          </div>
        </div>
      </div>

      {/* Indicators at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {items.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition ${
              index === currentIndex ? 'bg-white w-8' : 'bg-white bg-opacity-50 w-2'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
