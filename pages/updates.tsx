import ReactMarkdown from 'react-markdown';
import styles from '../styles/updates.module.css';

interface Update {
    version: string;
    name: string;
    timestamp: number;
    log: string;
}

export async function getStaticProps() {
    const data = await import('../lib/data/updates.json', { assert: { type: 'json' } });

    // sort data by timestamp
    data.default.sort((a: Update, b: Update) => b.timestamp - a.timestamp);

    return {
        props: { updates: data.default },
    };
}

export default function Updates({ updates }: { updates: Update[] }) {
    return (
        <div className="page-content container">
            <section className="text-white d-flex flex-column align-items-center my-5">
                <h1>Updates</h1>
                <p className="text-muted">Know what&apos;s changed in the latest Coinz update.</p>
            </section>

            <section id={styles.updates} className="text-white">
                {updates.map(({ version, name, timestamp, log }, index: number) => (
                    <div key={index} id={`v${version}`} className={`${styles.card} card mb-3`}>
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h3 className="card-title">{name} - Coinz</h3>
                            <h3 className='text-muted'>v{version}</h3>
                        </div>
                        <div className="card-body">
                            {log.split('\n').map((line: string, i: number) => (
                                <ReactMarkdown key={i}>{line}</ReactMarkdown>
                            ))}
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Update posted on: {new Date(timestamp * 1000).toDateString()}</small>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}