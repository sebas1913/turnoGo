"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import styles from './slider.module.scss';
import Title from '@/UI/atoms/title/Title';

const Slider = () => {
    return (
        <div className={styles.sliderContainer}>

            <Title level={2} className={styles.title}>Nuestros servicios</Title>

            <Swiper
                spaceBetween={30}
                slidesPerView={3}
                centeredSlides={false}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}

                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1440: { slidesPerView: 4 },
                }}
            >
                <SwiperSlide>
                    <div className={styles.cardContainer}>
                        <img src="/assets/images/corte2.jpg" alt="Top 1 en cortes" className={styles.image} />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.cardContainer}>
                        <img src="/assets/images/corte4.jpg" alt="Top 1 en cortes" className={styles.image} />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.cardContainer}>
                        <img src="/assets/images/corte5.jpg" alt="Top 1 en cortes" className={styles.image} />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.cardContainer}>
                        <img src="/assets/images/corte6.jpg" alt="Top 1 en cortes" className={styles.image} />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.cardContainer}>
                        <img src="/assets/images/corte1.jpg" alt="Top 1 en cortes" className={styles.image} />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.cardContainer}>
                        <img src="/assets/images/corte3.jpg" alt="Top 1 en cortes" className={styles.image} />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;