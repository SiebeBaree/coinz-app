import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/Statistic.module.css';

export default function Statistic({ icon, title, value }) {
    return (
        <div className={`${styles.statistic} d-flex align-items-center gap-4`}>
            <FontAwesomeIcon icon={icon} className={styles.icon} />
            <div className={styles.statText}>
                <h3>{value}</h3>
                <p className="fw-bold">{title}</p>
            </div>
        </div>
    );
}