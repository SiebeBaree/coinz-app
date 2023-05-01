import styles from '../styles/Faq.module.css';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export async function getStaticProps() {
    const data = await import('../lib/data/faq.json', { assert: { type: 'json' } });

    return {
        props: {
            items: data.default.items,
        },
    };
}

export default function FaqPage({ items }) {
    return (
        <div className="page-content">
            <div className="container">
                <div className="page-title">
                    <h1 className="watermark">Questions</h1>
                    <h1>Frequently Asked Questions</h1>
                    <p>Find quick answers to your questions about Coinz. Your question might already be answered here!
                        If you can&apos;t find what you&apos;re looking for, contact us. We&apos;re here to help!</p>
                </div>

                <div className={`${styles.faq} d-flex flex-column gap-3 mb-5`}>
                    {items.map((item) => (
                        <FaqCard key={item.title.toLowerCase().replace(' ', '_')} title={item.title}
                                 description={item.description}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function FaqCard({ title, description }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`${styles.faqCard} d-flex flex-column gap-3`} data-isopen={isOpen}
             onClick={() => setIsOpen(!isOpen)}>
            <div className="d-flex justify-content-between">
                <h4 className="fw-bold">{title}</h4>
                <FontAwesomeIcon icon={faChevronDown} className={styles.faqIcon}/>
            </div>
            {isOpen ?
                <div className={styles.faqDescription}>{description.split('\n').map((line: string, index: number) =>
                    <ReactMarkdown key={index}>{line}</ReactMarkdown>)}</div> : null}
        </div>
    );
}