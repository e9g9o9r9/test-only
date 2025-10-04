import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef } from 'react';
import 'swiper/css';
import { Event } from '../../types/types';
import styles from './styles.module.scss';

interface Props {
    events: Event[];
}

const Carousel = ({ events }: Props) => {
    const swiperRef = useRef<any>(null);

    const goToStart = () => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(0);
        }
    };

    const goToEnd = () => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(events.length - 1);
        }
    };

    return (
        <div className={styles.carouselContainer}>

            <button
                className={styles.navButton}
                onClick={goToStart}
                aria-label="Go to first slide"
            >
                <img src="./arrowLeft.svg" alt="First" />
            </button>
            <Swiper
                spaceBetween={50}
                slidesPerView={3}
                onSwiper={(swiper: any) => {
                    swiperRef.current = swiper;
                }}
                className={styles.carousel}
            >
                {events.map((event, index) => (
                    <SwiperSlide key={index} className={styles.slide}>
                        <div className={styles.event}>
                            <h3 className={styles.year}>{event.year}</h3>
                            <p className={styles.description}>{event.description}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <button
                className={styles.navButton}
                onClick={goToEnd}
                aria-label="Go to last slide"
            >
                <img src="./arrowRight.svg" alt="Last" />
            </button>
        </div>
    );
};

export default Carousel;