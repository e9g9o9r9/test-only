import { useEffect, useState, useRef } from 'react';
import styles from "./styles.module.scss";

interface Props {
    fromYear: string;
    toYear: string;
}

const Interval = ({ fromYear, toYear }: Props) => {
    const [animatedFromYear, setAnimatedFromYear] = useState(fromYear);
    const [animatedToYear, setAnimatedToYear] = useState(toYear);
    const prevFromYearRef = useRef(fromYear);
    const prevToYearRef = useRef(toYear);

    useEffect(() => {
        if (fromYear !== prevFromYearRef.current) {
            animateValue(
                parseInt(prevFromYearRef.current),
                parseInt(fromYear),
                300,
                (value) => setAnimatedFromYear(value.toString())
            );
            prevFromYearRef.current = fromYear;
        }

        if (toYear !== prevToYearRef.current) {
            animateValue(
                parseInt(prevToYearRef.current),
                parseInt(toYear),
                300,
                (value) => setAnimatedToYear(value.toString())
            );
            prevToYearRef.current = toYear;
        }
    }, [fromYear, toYear]);

    const animateValue = (start: number, end: number, duration: number, callback: (value: number) => void) => {
        const startTime = performance.now();
        const range = end - start;

        const updateValue = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOutQuart = 1 - Math.pow(1 - progress, 4);

            const currentValue = Math.floor(start + range * easeOutQuart);
            callback(currentValue);

            if (progress < 1) {
                requestAnimationFrame(updateValue);
            } else {
                callback(end);
            }
        };

        requestAnimationFrame(updateValue);
    };

    return (
        <div className={styles.wrapper}>
            <span className={styles.year} style={{ color: "#5D5FEF" }}>{animatedFromYear}</span>
            <span className={styles.year} style={{ color: "#EF5DA8" }}>{animatedToYear}</span>
        </div>
    );
};

export default Interval;