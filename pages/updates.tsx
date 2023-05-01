import { useEffect } from 'react';
import styles from '../styles/Updates.module.css';
import ReactMarkdown from 'react-markdown';

interface Update {
    version: string;
    name: string;
    timestamp: number;
    log: string;
}

export async function getStaticProps() {
    const data = await import('../lib/data/updates.json', { assert: { type: 'json' } });
    data.default.sort((a: Update, b: Update) => b.timestamp - a.timestamp);

    return {
        props: { updates: data.default },
    };
}

export default function UpdatesPage({ updates }: { updates: Update[] }) {
    useEffect(() => {
        const codeElements = document.querySelectorAll('code');

        codeElements.forEach(element => {
            element.addEventListener('click', () => {
                navigator.clipboard.writeText(element.textContent).then(() => {
                    element.setAttribute('data-tooltip', 'Copied!');
                });
            });

            element.addEventListener('mouseout', () => {
                element.setAttribute('data-tooltip', 'Click to copy');
            });
        });
    }, []);

    return (
        <div className="page-content">
            <div className="container">
                <div className="page-title">
                    <h1 className="watermark">Updates</h1>
                    <h1>Updates</h1>
                    <p>Don&apos;t miss out on the latest updates. Stay informed about new features and bug fixes. If you
                        have a question about a certain update, contact us. We&apos;re here to help!</p>
                </div>

                <div id={styles.updates} className="text-white mb-5">
                    {updates.map(({ version, name, timestamp, log }, index: number) => (
                        <div key={index} id={`v${version}`} className={`${styles.card} card mb-3`}>
                            <div
                                className="card-header d-flex justify-content-between align-items-center bg-transparent">
                                <h3 className="card-title">{name} - Coinz</h3>
                                <h3 className="text-muted">v{version}</h3>
                            </div>
                            <div className="card-body">
                                {log.split('\n').map((line: string, i: number) => (
                                    <ReactMarkdown key={i}>{line}</ReactMarkdown>
                                ))}
                            </div>
                            <div className="card-footer bg-transparent">
                                <small className="text-muted">Update posted
                                    on: {new Date(timestamp * 1000).toDateString()}</small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}