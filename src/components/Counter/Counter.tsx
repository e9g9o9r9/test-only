import styles from "./styles.module.scss"

interface Props {
    currentPeriod: string;
    allPeriods: string;
    onNext: () => void;
    onPrev: () => void;
}

const Counter = ({ currentPeriod, allPeriods, onNext, onPrev }: Props) => {

    const current = parseInt(currentPeriod);
    const total = parseInt(allPeriods);

    const isPrevDisabled = current === 1;
    const isNextDisabled = current === total;

    return (
        <div className={styles.wrapper}>
            <span className={styles.counter}>{currentPeriod}/{allPeriods}</span>
            <div className={styles.buttons}>
                <button
                    className={`${styles.button} ${isPrevDisabled ? styles.disabled : ''}`}
                    onClick={onPrev}
                    disabled={isPrevDisabled}
                >
                    <img src="./arrowLeft.svg" alt="Previous" className={styles.arrow} />
                </button>
                <button
                    className={`${styles.button} ${isNextDisabled ? styles.disabled : ''}`}
                    onClick={onNext}
                    disabled={isNextDisabled}
                >
                    <img src="./arrowRight.svg" alt="Next" className={styles.arrow} />
                </button>
            </div>
        </div>
    )
}

export default Counter