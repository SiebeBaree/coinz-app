import styles from '../../styles/store.module.css';

import { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { fetchPremium } from '../../lib/api';
import { Premium } from '../../lib/types';
import { GetServerSidePropsContext } from 'next';
// import products from '../../lib/data/products.json';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return await fetchPremium(context);
}

export default function Store({ premium }: { premium: Premium }) {
    const accountUrl = 'https://billing.stripe.com/p/login/28o14Tb34gqB8EM7ss';
    const [tickets, setTickets] = useState(200);
    const [servers, setServers] = useState(1);

    const changeTickets = (amount: number) => {
        if (tickets + amount < 200 || tickets + amount > 1200) return;
        setTickets(tickets + amount);
    };

    const changeServers = (amount: number) => {
        if (servers + amount < 1 || servers + amount > 7) return;
        setServers(servers + amount);
    };

    const getServerPrice = () => {
        return servers * 3;
    };

    // const addProductToCart = (id: string, quantity = 1) => {
    //     if (!localStorage.getItem('cart')) {
    //         localStorage.setItem('cart', JSON.stringify([]));
    //     }

    //     const cart = JSON.parse(localStorage.getItem('cart')) as Cart[];
    //     const cartItem = cart.find(p => p.id === id);
    //     const product = Object.values(products).find(p => p.id === id);

    //     for (const cartItems of cart) {
    //         const productItem = Object.values(products).find(p => p.id === cartItems.id);

    //         if (productItem.incompatible.includes(product.id)) {
    //             alert(`You can't buy ${product.name} and ${productItem.name} at the same time!\n\nRemove ${productItem.name} from your cart to continue.`);
    //             return;
    //         }
    //     }

    //     if (cartItem) {
    //         if (cartItem.quantity + quantity > product.maxQuantity) quantity = product.maxQuantity;
    //         cartItem.quantity = quantity;
    //     } else {
    //         cart.push({ id, quantity });
    //     }

    //     localStorage.setItem('cart', JSON.stringify(cart));
    // };

    return (
        <div id={styles.storePage} className='container'>
            <div className={`${styles.pageTitle} d-flex justify-content-between`}>
                <h1>Store</h1>

                {/* <div className={styles.shoppingCart}>
                    <Link href='/store/cart' className='d-flex align-items-center justify-content-center gradient-button h-100'>
                        <FontAwesomeIcon icon={faCartShopping} className='me-3 text-color' />
                        <h5 className='my-auto'>Shopping Cart</h5>
                    </Link>
                </div> */}
            </div>

            <div>
                <h2 className={`${styles.sectionTitle} text-center`}>Coinz Premium</h2>
                <p className={`${styles.sectionDescription} text-center`}>Get access to premium features and support the development of Coinz! Only applies to your account.</p>

                <div id={`${styles.cards}`} className='d-flex justify-content-around flex-wrap'>
                    <div className={`${styles.rowCard} d-flex flex-column`}>
                        <div className={`${styles.cardContent} d-flex flex-column justify-content-between`}>
                            <div>
                                <header className='text-center'>
                                    <h3 className='magic-text'>Supporter</h3>
                                    <div className={`${styles.pricing} d-flex align-items-baseline justify-content-center`}>
                                        <h1>$2</h1>
                                        <h6>/MONTH</h6>
                                    </div>
                                </header>
                                <div className={styles.middleCard}>
                                    <p><b>Perks in Coinz:</b></p>
                                    <ul className='fa-ul'>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> All 5s cooldowns are reduced to 1s</li>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> Able to buy up to 15 farming plots</li>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> Change your profile color</li>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> Add your age and a bio to your profile</li>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> Get an exclusive badge for your profile</li>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> Unlock /weekly</li>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> Earn up to 🪙 260/day with /daily (default: 🪙 160/day)</li>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> Gamble limit increased to 🪙 10,000</li>
                                    </ul>

                                    <p><b>Perks in the Support Server:</b></p>
                                    <ul className='fa-ul'>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> Get a special role</li>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> Gain access to an exclusive Premium channel</li>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> Able to test upcoming features in Coinz Beta</li>
                                    </ul>
                                </div>
                            </div>
                            { premium.userTier === 0 && <a className='btn w-100 gradient-button' href={`https://buy.stripe.com/00g6pO9KT9BsfqE3ce?client_reference_id=${premium.id}`}><b>Become a Supporter</b></a>}
                            { premium.userTier !== 0 && <a className='btn w-100 gradient-button' href={accountUrl} target="_blank" rel='noreferrer'><b>Change your subscription</b></a>}
                        </div>
                    </div>
                    <div className={`${styles.rowCard} d-flex flex-column`}>
                        <div className={`${styles.cardContent} d-flex flex-column justify-content-between`}>
                            <div>
                                <header className='text-center'>
                                    <h3 className='magic-text'>Benefactor</h3>
                                    <div className={`${styles.pricing} d-flex align-items-baseline justify-content-center`}>
                                        <h1>$5</h1>
                                        <h6>/MONTH</h6>
                                    </div>
                                </header>
                                <div className={styles.middleCard}>
                                    <p><b>Perks in Coinz:</b></p>
                                    <ul className='fa-ul'>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> All perks from Supporter</li>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> Unlock /monthly</li>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> Votes count double every weekend</li>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> Get a lucky wheel spin with /daily</li>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> Gamble limit increased to 🪙 15,000</li>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> Earn double experience from all gamble commands</li>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> Gamble commands cooldown is reduced to 4 minutes (default: 7 min)</li>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> 10% extra steal protection</li>
                                    </ul>

                                    <p><b>Perks in the Support Server:</b></p>
                                    <ul className='fa-ul'>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> Get a special role</li>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> Gain access to an exclusive Premium channel</li>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> Able to test upcoming features in Coinz Beta</li>
                                    </ul>
                                </div>
                            </div>
                            { premium.userTier === 0 && <a className='btn w-100 gradient-button' href={`https://buy.stripe.com/eVadSgg9h9Bsces4gj?client_reference_id=${premium.id}`}><b>Become a Benefactor</b></a>}
                            { premium.userTier !== 0 && <a className='btn w-100 gradient-button' href={accountUrl} target="_blank" rel='noreferrer'><b>Change your subscription</b></a>}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h2 className={`${styles.sectionTitle} text-center`}>Coinz Premium for Servers</h2>
                <p className={`${styles.sectionDescription} text-center`}>Run a community? Great, you can activate Coinz Premium for your entire server!</p>

                <div id={`${styles.cards}`} className='d-flex justify-content-around flex-wrap'>
                    <div className={`${styles.rowCard} ${styles.wideRowCard} d-flex flex-column`}>
                        <div className={`${styles.cardContent} d-flex flex-column justify-content-between`}>
                            <div>
                                <header className='text-center'>
                                    <h3 className='magic-text'>Community</h3>
                                    <div className={`${styles.pricing} d-flex align-items-baseline justify-content-center`}>
                                        <h1>${getServerPrice()}</h1>
                                        <h6>/MONTH PER SERVER</h6>
                                    </div>
                                </header>
                                <div className={styles.middleCard}>
                                    <p><b>Perks in Coinz:</b></p>
                                    <ul className='fa-ul'>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> Gamble limit increased to 🪙 10,000</li>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> Earn double experience from all gamble commands</li>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> Gamble commands cooldown is reduced to 4 minutes (default: 7 min)</li>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> Everyone unlocks /weekly</li>
                                        <li><FontAwesomeIcon icon={faCheck} listItem /> Coming Soon: Ability to earn some 🪙 by chatting in your server</li>
                                    </ul>
                                </div>
                            </div>
                            {/* <div className='d-flex justify-content-center my-3 pb-3 align-items-center'>
                                <a className={`btn gradient-button ${styles.changeQuantityButton}`} onClick={() => changeServers(-1)}><b>-</b></a>
                                <h5 className='mx-5 my-auto'>{servers} SERVER{servers === 1 ? '' : 'S'}</h5>
                                <a className={`${styles.changeQuantityButton} btn gradient-button`} onClick={() => changeServers(1)}><b>+</b></a>
                            </div> */}
                            { premium.guildTier === 0 && <a className='btn w-100 gradient-button' href={`https://buy.stripe.com/bIY4hG0ajbJAfqE8wA?client_reference_id=${premium.id}`}><b>Subscribe</b></a>}
                            { premium.guildTier !== 0 && <a className='btn w-100 gradient-button' href={accountUrl} target="_blank" rel='noreferrer'><b>Change your subscription</b></a>}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h2 className={`${styles.sectionTitle} text-center`}>Tickets</h2>
                <p className={`${styles.sectionDescription} text-center`}>Tickets are the premium currency in Coinz. Use them to buy wheel spins or premium subscriptions.</p>
                <div id={styles.tickets} className='d-flex justify-content-between align-items-center'>
                    <div className={styles.ticketText}>
                        <h1>Tickets</h1>
                        <p><b>Select the amount of tickets you want</b></p>
                    </div>
                    <div className={`${styles.ticketOptions} d-flex align-items-center justify-content-center`}>
                        <div className={`${styles.ticketMenu} d-flex justify-content-between align-items-center`}>
                            <div className='d-flex justify-content-between align-items-center gap-5'>
                                <div className='my-auto d-flex align-items-center gap-2'>
                                    <Image src="https://cdn.discordapp.com/emojis/1032669959161122976.png?size=48" alt="Ticket icon" loading='lazy' width="48" height="48" />
                                    <h1 className='my-auto'>{tickets}</h1> <h4 className='my-auto text-muted'>for ${tickets * 0.01}</h4>
                                </div>

                                <div className='d-flex flex-column justify-content-around gap-2'>
                                    <button className={`${styles.ticketOption} gradient-button`} onClick={() => changeTickets(100)}><b>+</b></button>
                                    <button className={`${styles.ticketOption} gradient-button`} onClick={() => changeTickets(-100)}><b>-</b></button>
                                </div>
                            </div>

                            <a className='btn gradient-button mx-5' href={''}><b>Buy</b></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
