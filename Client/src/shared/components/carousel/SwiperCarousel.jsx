
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import "./SwiperCarousel.css";
import { carouselConfig } from "../../config/carouselConfig.js";

import {
    carousel1,
    carousel2
} from "../../images/images.js"


export default function SwiperCarousel() {
    return (
        <>
            <Swiper
                className="mySwiper"
                modules={[Autoplay, Pagination]}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                // pagination={{
                //     clickable: true,
                // }}
                loop={true}
            >
                {carouselConfig?.map((carouselItem) => {
                    const { id, src, alt, text } = carouselItem
                    return (
                        <SwiperSlide key={id}>
                            <div className="home-carousel-container">
                                <img src={src} alt={alt} />
                                <div className="carousel-text">
                                    <h2>{text}</h2>
                                </div>

                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    );
};