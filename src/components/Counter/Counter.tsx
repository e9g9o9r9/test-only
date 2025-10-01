import styles from "./styles.module.scss"

interface Props {
    currentPeriod: string,
    allPeriods: string,
}

const Counter = () => {
    return (
        <div className={styles.wrapper}>
            <span className={styles.counter}>01/01</span>
            <div className={styles.buttons}>
                <button className={styles.button}><img src="./arrowLeft.svg" alt="" /></button>
                <button className={styles.button}><img src="./arrowRight.svg" alt="" /></button>
            </div>
        </div>
    )
}

export default Counter