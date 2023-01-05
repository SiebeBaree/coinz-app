import styles from '../../styles/store.module.css';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// import config from '../../lib/data/config.json' assert { type: 'json' };

// export async function getStaticProps() {
//     const responds = await fetch(config.API_URI + '/store/all');
//     const storeData = await responds.json();
//     return { props: { storeData } };
// }

export default function Store() {
    const [tickets, setTickets] = useState(100);

    const changeQuantity = (amount: number) => {
        if (tickets + amount < 100 || tickets + amount > 1500) return;
        setTickets(tickets + amount);
    };

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
        };
    }, []);

    return (
        <div id={styles.storePage} className='container'>
            <div className={`${styles.pageTitle} d-flex justify-content-between`}>
                <h1>Store</h1>
            </div>

            <div>
                <h2 className={`${styles.sectionTitle} text-center`}>Coinz Premium</h2>
                <p className={`${styles.sectionDescription} text-center`}>Get access to premium features and support the development of Coinz!</p>

                <div id={`${styles.cards}`} className='d-flex justify-content-around flex-wrap'>
                    {/* {storeData.tiers.map((tier: PremiumTier, index: number) => <SubscriptionCard key={index} tier={tier} />)} */}
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
                    <div className={`${styles.ticketOptions} d-flex align-items-center justify-content-center`}>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <h1 className='my-auto'><Image src="https://cdn.discordapp.com/emojis/1032669959161122976.png?size=48" alt="Ticket icon" loading='lazy' width="48" height="48" /> {tickets}</h1>

                            <div className='d-flex justify-content-around gap-1 w-100 mt-2'>
                                <button className={`${styles.ticketOption} gradient-button`} onClick={() => changeQuantity(-100)}>-</button>
                                <button className={`${styles.ticketOption} gradient-button`} onClick={() => changeQuantity(100)}>+</button>
                            </div>
                        </div>

                        {/* <button className={`${styles.ticketOption} ms-4 gradient-button d-flex justify-content-center align-items-center`}
                            onClick={buyTickets}
                            style={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                            }}>
                            Buy for ${parseFloat(((tickets * storeData.ticketPrice) / 100).toFixed(2))}
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

// function SubscriptionCard({ tier }: { tier: PremiumTier }) {
//     return (
//         <div className={`${styles.rowCard} d-flex flex-column`}>
//             <div className={`${styles.cardContent} d-flex flex-column justify-content-between`}>
//                 <div>
//                     <header className='text-center'>
//                         <h3 className='magic-text'>{tier.name}</h3>
//                         <div className={`${styles.pricing} d-flex align-items-baseline justify-content-center`}>
//                             <h1>${parseFloat((tier.price / 100).toFixed(2))}</h1>
//                             <h6>/MONTH</h6>
//                         </div>
//                     </header>
//                     <div className={styles.middleCard}>
//                         <p><b>Perks in Coinz:</b></p>
//                         <ul className='fa-ul'>
//                             {tier.botperks.map((perk: string, index: number) => <li key={index}>
//                                 {perk}
//                             </li>)}
//                         </ul>

//                         <p><b>Perks in the Support Server:</b></p>
//                         <ul className='fa-ul'>
//                             {tier.serverperks.map((perk: string, index: number) => <li key={index}>
//                                 {perk}
//                             </li>)}
//                         </ul>
//                     </div>
//                 </div>
//                 <a className='btn w-100 gradient-button'>Subscribe</a>
//             </div>
//         </div>
//     );
// }
