import styles from '../styles/Status.module.css';
import type { Cluster, Shard } from '../lib/types';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useEffect, useState } from 'react';

export async function getStaticProps() {
    const clusters = await getStatus();

    return {
        props: { clusters },
        revalidate: 30,
    };
}

async function getStatus(): Promise<Cluster[]> {
    try {
        const status = await fetch('https://api.coinzbot.xyz/status');
        return await status.json();
    } catch {
        return [];
    }
}

export default function StatusPage({ clusters }: { clusters: Cluster[] }) {
    const [status, setStatus] = useState(clusters);
    const [tries, setTries] = useState(0);
    const [error, setError] = useState(clusters.length === 0);
    const UPDATE_INTERVAL = 30;

    const updateData = setTimeout(() => {
        getStatus()
            .then((data) => {
                if (data.length === 0) {
                    setError(true);
                } else {
                    setStatus(data);
                    setError(false);
                }
            }).catch((e) => {
                console.log(e);
            setError(true);
        });
    }, UPDATE_INTERVAL * 1000);

    useEffect(() => {
        if (error) {
            if (tries < 3) {
                setTries((prev) => prev + 1);
            } else {
                clearTimeout(updateData);
            }
        }
    }, [error, tries]);

    return (
        <div className="page-content">
            <div className="container">
                <div className="page-title">
                    <h1 className="watermark">Status</h1>
                    <h1>Status</h1>
                    <p>Here, you&apos;ll find all the information you need to stay up to date with the status of our
                        bot. This page is updated every {UPDATE_INTERVAL} seconds.</p>
                </div>

                <div className="d-flex flex-wrap justify-content-between gap-5">
                    {error && <h1 className="text-danger my-5">Could not get the status of Coinz, please try again.</h1>}
                    {!error && status.map((cluster: Cluster) => <ClusterCard key={`Cluster#${cluster.id}`} cluster={cluster}/>)}
                </div>
            </div>
        </div>
    );
}

function ClusterCard({ cluster }: { cluster: Cluster }) {
    const averagePing = Math.round(cluster.shards.reduce((acc: number, shard: Shard) =>
            acc + (shard.ping >= 0 ? shard.ping : 0), 0) /
        cluster.shards.filter((shard: Shard) => shard.ping >= 0).length || -1);

    return (
        <div className={styles.statusCard}>
            <h1 className={styles.custerId}>#{cluster.id}</h1>

            <div className={`${styles.statusContainer} d-flex justify-content-between align-items-center px-4`}>
                <div className={`${styles.status} d-flex flex-column align-items-center`}>
                    <p>{cluster.shards.reduce((total: number, shard: Shard) => total + shard.guildcount, 0)}</p>
                    <h6>Total Guilds</h6>
                </div>
                <div className={`${styles.status} d-flex flex-column align-items-center`}>
                    <p>{averagePing} ms</p>
                    <h6>Average Ping</h6>
                </div>
            </div>

            <div className={`${styles.shardContainer} d-flex flex-wrap justify-content-center px-3`}>
                {cluster.shards.map((shard) => <ShardCard key={`Shard#${shard.id}`} shard={shard}/>)}
            </div>
        </div>
    );
}

function ShardCard({ shard }: { shard: Shard }) {
    const status = shard.ping === -1
        ? 'offline'
        : shard.ping > 300
            ? 'slow'
            : 'online';

    return (
        <OverlayTrigger
            placement="top"
            overlay={
                <Tooltip>
                    <b>{status.toUpperCase()}</b>
                    {shard.ping >= 0 && <>
                        <br/>
                        <b>Ping:</b> {shard.ping} ms<br/>
                        <b>Guilds:</b> {shard.guildcount}
                    </>}
                </Tooltip>
            }
        >
            <div className={styles.shardCard} data-status={status}>
                <h5 className={styles.shardId}>#{shard.id}</h5>
            </div>
        </OverlayTrigger>
    );
}