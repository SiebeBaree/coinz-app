import styles from '../styles/store.module.css'

import { useEffect } from 'react'
import Image from 'next/image'

import config from "../../lib/data/config.json" assert { type: "json" }

interface StoreItems {
    tiers: PremiumTier[];
    tickets: Ticket[];
    lastUpdated?: number;
}

interface PremiumTier {
    name: string;
    price: number;
    botperks: string[];
    serverperks: string[];
    subscribeURL: string;
}

interface Ticket {
    amount: number;
    price: number;
    subscribeURL: string;
}

export async function getStaticProps() {
    const responds = await fetch(config.API_URI + "/store/all");
    const storeData = await responds.json();
    return { props: { storeData } }
}

export default function Store({ storeData }: { storeData: StoreItems }) {
    useEffect(() => {
        document.getElementById(styles.cards).onmousemove = e => {
            for (const card of document.getElementsByClassName(styles.rowCard)) {
                const rect = card.getBoundingClientRect(),
                    x = e.clientX - rect.left,
                    y = e.clientY - rect.top;

                if (card instanceof HTMLElement) {
                    card.style.setProperty('--mouse-x', `${x}px`);
                    card.style.setProperty('--mouse-y', `${y}px`);
                }
            }
        }

        for (const card of document.getElementsByClassName(styles.rowCard)) {
            if (card instanceof HTMLElement) card.onclick = () => window.location.href = card.getAttribute('redirect-to');
        }
    });

    return (
        <div id={styles.storePage} className='container'>
            <div className={`${styles.pageTitle} d-flex justify-content-between`}>
                <h1>Store</h1>
            </div>

            <div>
                <h2 className={`${styles.sectionTitle} text-center`}>Coinz Premium</h2>
                <p className={`${styles.sectionDescription} text-center`}>Get access to premium features and support the development of Coinz!</p>

                <div id={`${styles.cards}`} className='d-flex justify-content-around flex-wrap'>
                    {storeData.tiers.map((tier: PremiumTier, index: number) => <SubscriptionCard key={index} tier={tier} />)}
                </div>
            </div>

            <div>
                <h2 className={`${styles.sectionTitle} text-center`}>Tickets</h2>
                <p className={`${styles.sectionDescription} text-center`}>Tickets are the premium currency in Coinz. Use them to buy exclusive items.</p>
                <div id={styles.tickets} className='d-flex justify-content-between align-items-center'>
                    <div className={styles.ticketText}>
                        <h1>Tickets</h1>
                        <p><b>Select the amount of tickets you want</b></p>
                    </div>
                    <div className={`${styles.ticketOptions} d-flex`}>
                        {storeData.tickets.map((ticket: Ticket, index: number) => {
                            return (
                                <a key={index} href={ticket.subscribeURL}>
                                    <button className={`${styles.ticketOption} gradient-button`}>
                                        <h4><Image src="https://cdn.discordapp.com/emojis/1032669959161122976.png?size=24" alt="Ticket icon" loading='lazy' width="24" height="24" /> {ticket.amount}</h4>
                                        <h2>${parseFloat((ticket.price / 100).toFixed(2))}</h2>
                                    </button>
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

function SubscriptionCard({ tier }: { tier: PremiumTier }) {
    return (
        <div className={`${styles.rowCard} d-flex flex-column`} redirect-to={tier.subscribeURL}>
            <div className={`${styles.cardContent} d-flex flex-column justify-content-between`}>
                <div>
                    <header className='text-center'>
                        <h3 className='magic-text'>{tier.name}</h3>
                        <div className={`${styles.pricing} d-flex align-items-baseline justify-content-center`}>
                            <h1>${parseFloat((tier.price / 100).toFixed(2))}</h1>
                            <h6>/MONTH</h6>
                        </div>
                    </header>
                    <div className={styles.middleCard}>
                        <p><b>Perks in Coinz:</b></p>
                        <ul className='fa-ul'>
                            {tier.botperks.map((perk: string, index: number) => <li key={index}>
                                {perk}
                            </li>)}
                        </ul>

                        <p><b>Perks in the Support Server:</b></p>
                        <ul className='fa-ul'>
                            {tier.serverperks.map((perk: string, index: number) => <li key={index}>
                                {perk}
                            </li>)}
                        </ul>
                    </div>
                </div>
                <a href={tier.subscribeURL} className='btn w-100 gradient-button'>Subscribe</a>
            </div>
        </div>
    )
}
