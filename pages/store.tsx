import styles from '../styles/store.module.css'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import storeData from '../lib/data/store.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faBan } from '@fortawesome/free-solid-svg-icons'

export default function Store() {
    const [isFromBannedCountry, setIsFromBannedCountry] = useState(false);
    const bannedCountryCodes = ["JP", "CN", "NL", "BE"];

    useEffect(() => {
        document.getElementById(styles.cards).onmousemove = e => {
            for (const card of document.getElementsByClassName(styles.rowCard)) {
                const rect = card.getBoundingClientRect(),
                    x = e.clientX - rect.left,
                    y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            }
        }

        for (const card of document.getElementsByClassName(styles.rowCard)) {
            card.onclick = () => window.location.href = card.getAttribute('redirect-to');
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

                <button className={`${styles.shoppingCart} gradient-button`}>
                    <FontAwesomeIcon icon={faCartShopping} className='align-middle' />
                    Shopping Cart
                </button>
            </div>

            <div>
                <h2 className={`${styles.sectionTitle} text-center`}>Coinz Premium</h2>
                <p className={`${styles.sectionDescription} text-center`}>Get access to premium features and support the development of Coinz!</p>

                <div id={`${styles.cards}`} className='d-flex justify-content-around flex-wrap'>
                    <SubscriptionCard title="Supporter" price="1" botPerks={storeData.subscriptions.botperks[1]} serverPerks={storeData.subscriptions.serverperks[0]} subscribeUrl="#" />
                    <SubscriptionCard title="Server Tier I" price="3" botPerks={storeData.subscriptions.botperks[1]} serverPerks={storeData.subscriptions.serverperks[1]} subscribeUrl="#" />
                    <SubscriptionCard title="Server Tier II" price="5" botPerks={storeData.subscriptions.botperks[2]} serverPerks={storeData.subscriptions.serverperks[2]} subscribeUrl="https://google.com/" />
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
                        <button className={`${styles.ticketOption} gradient-button`}>
                            <h4><Image src="https://cdn.discordapp.com/emojis/1032669959161122976.png?size=24" alt="Ticket icon" loading='lazy' width="24" height="24" /> 100</h4>
                            <h2>$1</h2>
                        </button>

                        <button className={`${styles.ticketOption} gradient-button`}>
                            <h4><Image src="https://cdn.discordapp.com/emojis/1032669959161122976.png?size=24" alt="Ticket icon" loading='lazy' width="24" height="24" /> 300</h4>
                            <h2>$3</h2>
                        </button>

                        <button className={`${styles.ticketOption} gradient-button`}>
                            <h4><Image src="https://cdn.discordapp.com/emojis/1032669959161122976.png?size=24" alt="Ticket icon" loading='lazy' width="24" height="24" /> 500</h4>
                            <h2>$5</h2>
                        </button>
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

function SubscriptionCard({ title, price, botPerks, serverPerks, subscribeUrl = "#" }) {
    return (
        <div className={`${styles.rowCard} d-flex flex-column`} redirect-to={subscribeUrl}>
            <div className={`${styles.cardContent} d-flex flex-column justify-content-between`}>
                <div>
                    <header className='text-center'>
                        <h3 className='magic-text'>{title}</h3>
                        <div className={`${styles.pricing} d-flex align-items-baseline justify-content-center`}>
                            <h1>${price}</h1>
                            <h6>/MONTH</h6>
                        </div>
                    </header>
                    <div className={styles.middleCard}>
                        <p><b>Perks in Coinz:</b></p>
                        <ul className='fa-ul'>
                            {botPerks.map((perk: string, index: number) => <li key={index}>
                                {perk}
                            </li>)}
                        </ul>

                        <p><b>Perks in the Support Server:</b></p>
                        <ul className='fa-ul'>
                            {serverPerks.map((perk: string, index: number) => <li key={index}>
                                {perk}
                            </li>)}
                        </ul>
                    </div>
                </div>
                <a href={subscribeUrl} className='btn w-100 gradient-button'>Subscribe</a>
            </div>
        </div>
    )
}

function LootboxSection({ isFromBannedCountry, lootboxes }) {
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
                {Object.keys(lootboxes).map((lootbox: string, index: number) =>
                    <LootBoxCard key={index} name={lootboxes[lootbox].name} price={lootboxes[lootbox].price} items={lootboxes[lootbox].loot} />)}
            </div>
        )
    }
}

function LootBoxCard({ name, price, items }) {
    return (
        <div className={`${styles.lootboxCard} d-flex flex-column`}>
            <div className={`${styles.cardContent} d-flex flex-column justify-content-between`}>
                <div>
                    <header className='text-center'>
                        <h3>{name}</h3>
                        <h1>${price}</h1>
                    </header>
                    <div className={styles.middleCard}>
                        <p><b>Possible Loot:</b></p>
                        <ul className='list-unstyled'>
                            {items.map(({ name, amount, emoteId }) => <li key={name}><Image src={`https://cdn.discordapp.com/emojis/${emoteId}.png?size=24`} alt="Icon for loot item" loading='lazy' width="24" height="24" /><b>{amount}{name !== "Coins" ? `x` : ``}</b> {name}</li>)}
                        </ul>
                    </div>
                </div>
                <a href="#" className='btn w-100'><button className='gradient-button'><FontAwesomeIcon icon={faCartShopping} className='align-middle' />Buy</button></a>
            </div>
        </div>
    )
}