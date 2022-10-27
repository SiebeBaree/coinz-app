import styles from '../styles/faq.module.css'
import { useState } from 'react'
import faqData from '../lib/data/faq.json'

export default function Faq() {
    return (
        <div id={styles.faq} className='container'>
            <div id={styles.pageTitle}>
                <h2>Frequently Asked Questions</h2>
                <p>Check this page first before asking a question in our support server. Your question might already be answered here!</p>
            </div>

            <div>
                {faqData.items.map(({ title, description }, index) =>
                    <FaqItem key={index} title={title} description={description} />
                )}
            </div>
        </div>
    )
}

function FaqItem({ title, description }) {
    const [state, setState] = useState(false);

    return (
        <div className={`${styles.faqItem} ${state ? styles.itemExpanded : ""}`} onClick={() => setState(state => !state)}>
            <h4>{title}</h4>
            {state ? <p dangerouslySetInnerHTML={{ __html: description }}></p> : null}
        </div>
    )
}