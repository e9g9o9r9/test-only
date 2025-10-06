import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useState, useEffect } from 'react';
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import { Event } from '../../types/types';
import styles from './styles.module.scss';
import { useScreenWidth } from '../../hooks/useScreenWidth';

interface Props {
    events: Event[];
}

const Carousel = ({ events }: Props) => {
    const swiperRef = useRef<SwiperType | null>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [currentEvents, setCurrentEvents] = useState<Event[]>(events);

    const screenWidth = useScreenWidth();
    const isMobile = screenWidth < 480;

    useEffect(() => {
        setIsVisible(false);

        const timer = setTimeout(() => {
            setCurrentEvents(events);
            setIsVisible(true);
        }, 300);

        return () => clearTimeout(timer);
    }, [events]);

    const goToStart = (): void => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(0);
        }
    };

    const goToEnd = (): void => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(currentEvents.length - 1);
        }
    };

    return (
        <div
            className={`${styles.carouselContainer} ${isVisible ? styles.visible : styles.hidden}`}
        >
            {!isMobile && (
                <button
                    className={styles.navButton}
                    onClick={goToStart}
                    aria-label="Go to first slide"
                >
                    <img src="./arrowLeft.svg" alt="First" />
                </button>
            )}

            <Swiper
                spaceBetween={50}
                slidesPerView={isMobile ? 2 : 3}
                onSwiper={(swiper: SwiperType) => {
                    swiperRef.current = swiper;
                }}
                className={styles.carousel}
                key={currentEvents.length}
            >
                {currentEvents.map((event, index) => (
                    <SwiperSlide key={`${event.year}-${index}`} className={styles.slide}>
                        <div className={styles.event}>
                            <h3 className={styles.year}>{event.year}</h3>
                            <p className={styles.description}>{event.description}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {!isMobile && (
                <button
                    className={styles.navButton}
                    onClick={goToEnd}
                    aria-label="Go to last slide"
                >
                    <img src="./arrowRight.svg" alt="Last" />
                </button>
            )}
        </div>
    );
};

export default Carousel;