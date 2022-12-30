/* eslint-disable react-hooks/exhaustive-deps */
import styles from '../styles/status.module.css'

import { useEffect, useState } from "react";
import config from "../lib/data/config.json" assert { type: "json" };

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

interface Shard {
    id: number;
    ping: number;
    guildcount: number;
    cpu: number;
    ram: {
        heapUsed: number;
        rss: number;
    };
}

interface Cluster {
    id: number;
    shards: Shard[];
}

export async function getStaticProps() {
    const clusters = await getStatus();

    return {
        props: { clusters },
        revalidate: 30
    }
}

async function getStatus(): Promise<Cluster[]> {
    try {
        const status = await fetch(config.API_URI + "/status");
        const json = await status.json();
        return json;
    } catch {
        return [];
    }
}

function StatusPage({ clusters }) {
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
            }).catch(() => setError(true));
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
        <div className="container">
            <div className="d-flex flex-column align-items-center mt-5 text-color">
                <h1>Coinz Status</h1>
                <h4 className='text-muted'>Updated every {UPDATE_INTERVAL} seconds</h4>
            </div>

            <div className={`${styles.clusterCards} d-flex justify-content-center my-5 flex-wrap`}>
                {error && <h1 className="text-danger">Could not get the status of Coinz, please try again.</h1>}
                {!error && status.map((cluster: Cluster, index: number) => <ClusterCard key={index} cluster={cluster} />)}
            </div>
        </div>
    )
}

function ClusterCard({ cluster }) {
    const averagePing = cluster.shards.reduce((acc: number, shard: Shard) => acc + (shard.ping >= 0 ? shard.ping : 0), 0) /
        cluster.shards.filter((shard: Shard) => shard.ping >= 0).length || -1;

    return (
        <div className={`${styles.clusterCard} card d-flex`} style={{
            borderLeft: `7px solid ${getColor(averagePing)}`,
        }}>
            <div className={`${styles.clusterCardBody} card-body`}>
                <span>
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip>
                                <h5>Cluster #{cluster.id}</h5>
                                <b>Total Guilds:</b> {cluster.shards.reduce((total: number, shard: Shard) => total + shard.guildcount, 0)}<br />
                                <b>Average Ping:</b> {averagePing} ms<br />
                                <b>Total RAM:</b> {cluster.shards.reduce((total: number, shard: Shard) => total + shard.ram.heapUsed, 0).toFixed(2)} MB
                            </Tooltip>
                        }
                    >
                        <FontAwesomeIcon icon={faCircleInfo} />
                    </OverlayTrigger>


                </span>

                <h3 className={`card-title text-center text-color`}>Cluster #{cluster.id}</h3>
                <div className={`${styles.shardCards} d-flex justify-content-center flex-wrap`}>
                    {(cluster.shards).map((shard: Shard, index: number) => <ShardCard key={index} shard={shard} />)}
                </div>
            </div>
        </div>
    )
}

function ShardCard({ shard }) {
    const status = shard.ping === -1
        ? "Shard is offline"
        : shard.ping > 300
            ? "Shard is responding slowly"
            : "Shard is fully operational";

    return (
        <OverlayTrigger
            placement="top"
            overlay={
                <Tooltip>
                    <b>{status}</b>
                    {shard.ping >= 0 && <>
                        <br /><br />
                        <b>Ping:</b> {shard.ping} ms<br />
                        <b>Guilds:</b> {shard.guildcount}<br />
                        <b>CPU:</b> {shard.cpu.toFixed(2)} %<br />
                        <b>RAM:</b> {shard.ram.heapUsed.toFixed(2)} MB
                    </>}
                </Tooltip>
            }
        >
            <div className={`${styles.shardCard} d-flex justify-content-center align-items-center`} style={{
                backgroundColor: getColor(shard.ping),
            }}>
                <h5 className='my-auto'>#{shard.id}</h5>
            </div >
        </OverlayTrigger>
    )
}

function getColor(ping: number): string {
    return ping === -1
        ? "#DA3F40"
        : ping > 300
            ? "#FAA61A"
            : "#44B581";
}

export default StatusPage;