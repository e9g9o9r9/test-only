import styles from "./styles.module.scss"
import { FC } from 'react'

interface Props {
    fromYear: string
    toYear: string
}

const Interval: FC<Props> = ({ fromYear, toYear }) => {
    return (
        <div className={styles.wrapper}>
            <span className={styles.year} style={{color: "#EF5DA8"}}>{fromYear}</span>
            <span className={styles.year} style={{color: "#5D5FEF"}}>{toYear}</span>
        </div>
    )
}

export default Interval