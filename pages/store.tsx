import styles from '../styles/store.module.css'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import config from "../lib/data/config.json" assert { type: "json" }
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faBan } from '@fortawesome/free-solid-svg-icons'

interface StoreItems {
    tiers: PremiumTier[];
    tickets: Ticket[];
    lootboxes: Lootbox[];
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

interface Lootbox {
    id: string;
    name: string;
    price: number;
    loot: Loot[];
    subscribeURL: string;
}

interface Loot {
    name: string;
    amount: number;
    emoteId: string;
}

export async function getStaticProps() {
    const responds = await fetch(config.API_URI + "/store/all");
    const storeData = await responds.json();
    return { props: { storeData } }
}

export default function Store({ storeData }: { storeData: StoreItems }) {
    const [isFromBannedCountry, setIsFromBannedCountry] = useState(false);
    const bannedCountryCodes = ["JP", "CN", "NL", "BE"];

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

        fetch("http://ip-api.com/json").then(response => response.json()).then(data => {
            if (data.status === 'success') {
                if (bannedCountryCodes.includes(data.countryCode)) {
                    setIsFromBannedCountry(true);
                }
            }
        });
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

            <div>
                <h2 className={`${styles.sectionTitle} text-center`}>Loot Boxes</h2>
                <p className={`${styles.sectionDescription} text-center`}>Open loot boxes to get random items!</p>
                <LootboxSection isFromBannedCountry={isFromBannedCountry} lootboxes={storeData.lootboxes} />
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

function LootboxSection({ isFromBannedCountry, lootboxes }: { isFromBannedCountry: boolean, lootboxes: Lootbox[] }) {
    if (isFromBannedCountry) {
        return (
            <div className={`${styles.sectionBanned} d-flex flex-column justify-content-center`}>
                <FontAwesomeIcon icon={faBan} className='text-danger' />
                <h3 className='text-center'>You cannot buy loot boxes in your country.</h3>
            </div>
        )
    } else {
        return (
            <div id={styles.lootboxes} className='d-flex justify-content-around flex-wrap'>
                {lootboxes.map((lootbox: Lootbox, index: number) =>
                    <LootBoxCard key={index} lootbox={lootbox} />)}
            </div>
        )
    }
}

function LootBoxCard({ lootbox }: { lootbox: Lootbox }) {
    return (
        <div className={`${styles.lootboxCard} d-flex flex-column`}>
            <div className={`${styles.cardContent} d-flex flex-column justify-content-between`}>
                <div>
                    <header className='text-center'>
                        <h3>{lootbox.name}</h3>
                        <h1>${parseFloat((lootbox.price / 100).toFixed(2))}</h1>
                    </header>
                    <div className={styles.middleCard}>
                        <p><b>Possible Loot:</b></p>
                        <ul className='list-unstyled'>
                            {lootbox.loot.map((loot: Loot) => <li key={loot.name}><Image src={`https://cdn.discordapp.com/emojis/${loot.emoteId}.png?size=24`} alt="Icon for loot item" loading='lazy' width="24" height="24" /><b>{loot.amount}{loot.name !== "Coins" ? `x` : ``}</b> {loot.name}</li>)}
                        </ul>
                    </div>
                </div>
                <a href={lootbox.subscribeURL} className='btn w-100'><button className='gradient-button'><FontAwesomeIcon icon={faCartShopping} className='align-middle' />Buy</button></a>
            </div>
        </div>
    )
}