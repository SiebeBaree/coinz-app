import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Statistic.module.css';

export default function Statistic({ icon, title, value, suffix = '' }) {
    value = parseInt(value);
    const incrementValue = Math.ceil(value / (2000 / 10));
    const [state, setState] = useState(0);
    let isVisible = false;

    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            isVisible = entries[0].isIntersecting;
        });

        observer.observe(ref.current);

        const interval = setInterval(() => {
            if (isVisible === true) {
                if (state < value) setState(state + incrementValue);
                else if (state >= value) setState(value);
            }
        }, 10);

        return () => clearInterval(interval);
    }, [state, value]);

    return (
        <div ref={ref} className={`${styles.statistic} d-flex align-items-center gap-4`}>
            <FontAwesomeIcon icon={icon} className={styles.icon} />
            <div className={styles.statText}>
                <h3>{state}{suffix}</h3>
                <p className="fw-bold">{title}</p>
            </div>
        </div>
    );
}