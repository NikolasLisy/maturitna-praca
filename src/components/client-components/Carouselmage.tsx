"use client";

import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Slide = {
  id: string;
  imagePath: string;
};

interface CarouselImageProps {
  slides: Slide[];
}

export function CarouselImage({ slides }: CarouselImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="h-[200px] md:h-[300px] l:h-[400px] w-full m-auto py-16 px-4 relative group bg-white">
      <div className="w-full h-full rounded-2xl bg-center">
        {slides.length > 0 && (
          <Image
            key={slides[currentIndex].id}
            src={slides[currentIndex].imagePath}
            fill
            alt="CarouselSlideShow"
            className="object-contain"
          />
        )}
      </div>
      <div className="block md:hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl p-2 text-black cursor-pointer">
        <CircleChevronLeft onClick={nextSlide} size={40} />
      </div>
      <div className="block md:hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl p-2 text-black cursor-pointer">
        <CircleChevronRight onClick={prevSlide} size={40} />
      </div>
    </div>
  );
}
