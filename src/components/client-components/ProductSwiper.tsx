"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Product } from "@prisma/client";
import { ProductCard } from "./ProductCard";

type ProductSwiperProps = {
  products: Product[];
  id: string;
};

export function ProductSwiper({ products, id }: ProductSwiperProps) {
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
        769: {
          slidesPerView: 2,
        },
        0: {
          slidesPerView: 1,
        },
      }}
    >
      {products.map((product) => {
        if (product.stock === 0) return null;
        if (product.id === id) {
          return null;
        }
        return (
          <SwiperSlide key={product.id}>
            <ProductCard key={product.id} {...product} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
