"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { Banner } from "@prisma/client";

type CarouselSwiperProps = {
  slides: Banner[];
};

export function CarouselSwiper({ slides }: CarouselSwiperProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      className="w-full"
      loop={true}
      spaceBetween={20}
      breakpoints={{
        1000: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 2,
        },
        0: {
          slidesPerView: 1,
        },
      }}
    >
      {slides.map((image, index) => (
        <SwiperSlide key={index} className="flex items-center justify-center">
          <div className="relative w-full h-[400px]">
            <Image
              src={image.imagePath}
              alt={`Carousel Image ${index}`}
              className="object-contain"
              fill
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
