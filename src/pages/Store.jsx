import './style/Store.css'

import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCartShopping, faBan } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import { isLoggedIn } from './helpers.js';

function Store() {
    const premiumPerks = {
        botPerks: [
            [
                'Access to /monthly & /weekly',
                'All 5-second cooldowns are 1 second',
                '30-minute cooldown on airdrops',
                'Premium Achievement + Badge',
                'Buy up to 15 plots instead of 9',
                'Get a lucky wheel spin with /daily',
                'Increased /daily limit to 200',
                'Ability to open loot boxes',
                'All votes count double',
                'Increased betting limit (10.000) in all games',
                'Ability to change profile color'
            ],
            [
                'All perks from Supporter (only for you)',
                'You can activate all the perks for 1 server',
                'Apply to everyone in the server',
                'Change airdrop cooldown',
                'All 5-second cooldowns are 3 seconds',
                'Ability to host own airdrops (like giveaways)',
                'SOON: Ability to change embed colors',
                'SOON: Ability to change coin emote'
            ],
            [
                'All perks from Supporter (only for you)',
                'You can activate all the perks for 3 servers',
                'Apply to everyone in the server',
                'Change airdrop cooldown',
                'All 5-second cooldowns are 3 seconds',
                'Ability to host own airdrops (like giveaways)',
                'SOON: Ability to change embed colors',
                'SOON: Ability to change coin emote'
            ]
        ],
        serverPerks: [
            [
                'Premium role',
                'Access to an exclusive channel',
                'Ability to use Coinz Beta'
            ],
            [
                'Premium role',
                'Access to an exclusive channel',
                'Ability to use Coinz Beta',
                'Promote your server in #premium'
            ],
            [
                'Premium role',
                'Access to an exclusive channel',
                'Ability to use Coinz Beta',
                'Promote your server in #premium'
            ]
        ]
    };

    const lootboxes = {
        "Tools Loot Box-0.30": [
            {
                name: "Coins",
                amount: 320,
                emoteId: "987800268223709254"
            },
            {
                name: "Tickets",
                amount: 20,
                emoteId: "1032669959161122976"
            },
            {
                name: "Shovel",
                amount: 2,
                emoteId: "956861323352883230"
            },
            {
                name: "Fishing Rod",
                amount: 2,
                emoteId: "956861323617107968"
            },
            {
                name: "Hunting Rifle",
                amount: 1,
                emoteId: "987701755770994718"
            },
            {
                name: "Axe",
                amount: 3,
                emoteId: "1013473902778908694"
            },
            {
                name: "Bag",
                amount: 4,
                emoteId: "1013473900123926618"
            }
        ],
        "Random Loot Box-0.70": [
            {
                name: "Coins",
                amount: 600,
                emoteId: "987800268223709254"
            },
            {
                name: "Tickets",
                amount: 50,
                emoteId: "1032669959161122976"
            },
            {
                name: "Shoe",
                amount: 10,
                emoteId: "956916922572763166"
            },
            {
                name: "Playstation",
                amount: 1,
                emoteId: "956917165250990091"
            },
            {
                name: "Book",
                amount: 35,
                emoteId: "956916922837000293"
            },
            {
                name: "Tree",
                amount: 3,
                emoteId: "956916922623094834"
            },
            {
                name: "Lamp",
                amount: 6,
                emoteId: "956917165959815238"
            },
            {
                name: "Pocket Watch",
                amount: 5,
                emoteId: "1003948943027220520"
            },
            {
                name: "Television",
                amount: 2,
                emoteId: "1003948945359245323"
            },
            {
                name: "Smartphone",
                amount: 1,
                emoteId: "1013474375275663530"
            },
            {
                name: "Crown",
                amount: 1,
                emoteId: "956919874494533642"
            }
        ],
        "Pirates Loot Box-1": [
            {
                name: "Coins",
                amount: 750,
                emoteId: "987800268223709254"
            },
            {
                name: "Tickets",
                amount: 70,
                emoteId: "1032669959161122976"
            },
            {
                name: "Gold",
                amount: 1,
                emoteId: "956920061191393280"
            },
            {
                name: "Oil",
                amount: 1,
                emoteId: "956920061178835004"
            },
            {
                name: "Christmas Tree",
                amount: 1,
                emoteId: "956919874653933568"
            },
            {
                name: "Toilet Paper",
                amount: 1,
                emoteId: "1003949881746006066"
            },
            {
                name: "Ring",
                amount: 1,
                emoteId: "1003949880466751508"
            },
            {
                name: "Book",
                amount: 40,
                emoteId: "956916922837000293"
            },
            {
                name: "Potato",
                amount: 30,
                emoteId: "956643928013152306"
            },
            {
                name: "Playstation",
                amount: 1,
                emoteId: "956917165250990091"
            },
            {
                name: "Trash",
                amount: 23,
                emoteId: "956916922610507777"
            }
        ]
    };

    const [isFromBannedCountry, setIsFromBannedCountry] = useState(false);
    const bannedCountryCodes = ["JP", "CN", "NL", "BE"];

    useEffect(() => {
        if (!isLoggedIn()) document.location.href = "/login";

        document.getElementById('cards').onmousemove = e => {
            for (const card of document.getElementsByClassName('row-card')) {
                const rect = card.getBoundingClientRect(),
                    x = e.clientX - rect.left,
                    y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            }
        }

        for (const card of document.getElementsByClassName('row-card')) {
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
        <Container>
            <div className="page-title d-flex justify-content-between">
                <h1>Store</h1>

                <button className="shopping-cart gradient-button">
                    <FontAwesomeIcon icon={faCartShopping} className='align-middle' />
                    Shopping Cart
                </button>
            </div>

            <div>
                <h2 className='section-title text-center'>Coinz Premium</h2>
                <p className='section-description text-center'>Get access to premium features and support the development of Coinz!</p>

                <div id='cards' className='d-flex justify-content-around flex-wrap'>
                    <SubscriptionCard title="Supporter" price="1" botPerks={premiumPerks.botPerks[0]} serverPerks={premiumPerks.serverPerks[0]} subscribeUrl="#" />
                    <SubscriptionCard title="Server Tier I" price="3" botPerks={premiumPerks.botPerks[1]} serverPerks={premiumPerks.serverPerks[1]} subscribeUrl="#" />
                    <SubscriptionCard title="Server Tier II" price="5" botPerks={premiumPerks.botPerks[2]} serverPerks={premiumPerks.serverPerks[2]} subscribeUrl="https://google.com/" />
                </div>
            </div>

            <div>
                <h2 className='section-title text-center'>Tickets</h2>
                <p className='section-description text-center'>Tickets are the premium currency in Coinz. Use them to buy exclusive items.</p>
                <div id="tickets" className='d-flex justify-content-between align-items-center'>
                    <div className="ticket-text">
                        <h1>Tickets</h1>
                        <p><b>Select the amount of tickets you want</b></p>
                    </div>
                    <div className="ticket-options d-flex">
                        <button className="ticket-option gradient-button">
                            <h4><img src="https://cdn.discordapp.com/emojis/1032669959161122976.png?size=24" alt="Ticket icon" loading='lazy' /> 100</h4>
                            <h2>$1</h2>
                        </button>

                        <button className="ticket-option gradient-button">
                            <h4><img src="https://cdn.discordapp.com/emojis/1032669959161122976.png?size=24" alt="Ticket icon" loading='lazy' /> 300</h4>
                            <h2>$3</h2>
                        </button>

                        <button className="ticket-option gradient-button">
                            <h4><img src="https://cdn.discordapp.com/emojis/1032669959161122976.png?size=24" alt="Ticket icon" loading='lazy' /> 500</h4>
                            <h2>$5</h2>
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <h2 className='section-title text-center'>Loot Boxes</h2>
                <p className='section-description text-center'>Open loot boxes to get random items!</p>
                <LootboxSection isFromBannedCountry={isFromBannedCountry} lootboxes={lootboxes} />
            </div>
        </Container>
    )
}

function SubscriptionCard({ title, price, botPerks, serverPerks, subscribeUrl = "#" }) {
    return (
        // eslint-disable-next-line react/no-unknown-property
        <div className='row-card d-flex flex-column' redirect-to={subscribeUrl}>
            <div className="card-content d-flex flex-column justify-content-between">
                <div className="head">
                    <header className='text-center'>
                        <h3 className='magic-text'>{title}</h3>
                        <div className='pricing d-flex align-items-baseline justify-content-center'>
                            <h1>${price}</h1>
                            <h6>/MONTH</h6>
                        </div>
                    </header>
                    <div className='middle-card'>
                        <p><b>Perks in Coinz:</b></p>
                        <ul className='fa-ul'>
                            {botPerks.map((perk, index) => <li key={index}>
                                <FontAwesomeIcon icon={faCheck} listItem />
                                {perk}
                            </li>)}
                        </ul>

                        <p><b>Perks in the Support Server:</b></p>
                        <ul className='fa-ul'>
                            {serverPerks.map((perk, index) => <li key={index}>
                                <FontAwesomeIcon icon={faCheck} listItem />
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

SubscriptionCard.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    botPerks: PropTypes.array.isRequired,
    serverPerks: PropTypes.array.isRequired,
    subscribeUrl: PropTypes.string
}

function LootboxSection({ isFromBannedCountry, lootboxes }) {
    if (isFromBannedCountry) {
        return (
            <div className='section-banned d-flex flex-column justify-content-center'>
                <FontAwesomeIcon icon={faBan} className='text-danger' />
                <h3 className='text-center'>You cannot buy loot boxes in your country.</h3>
            </div>
        )
    } else {
        return (
            <div id="lootboxes" className='d-flex justify-content-around flex-wrap'>
                {Object.keys(lootboxes).map((lootbox, index) => <LootBoxCard key={index} title={lootbox} items={lootboxes[lootbox]} />)}
            </div>
        )
    }
}

LootboxSection.propTypes = {
    isFromBannedCountry: PropTypes.bool.isRequired,
    lootboxes: PropTypes.object.isRequired
}

function LootBoxCard({ title, items }) {
    return (
        <div className='lootbox-card d-flex flex-column'>
            <div className="card-content d-flex flex-column justify-content-between">
                <div className="head">
                    <header className='text-center'>
                        <h3>{title.split('-')[0]}</h3>
                        <h1>${title.split('-')[1]}</h1>
                    </header>
                    <div className='middle-card'>
                        <p><b>Possible Loot:</b></p>
                        <ul className='list-unstyled'>
                            {items.map(({ name, amount, emoteId }) => <li key={name}><img src={`https://cdn.discordapp.com/emojis/${emoteId}.png?size=24`} alt="Icon for loot item" loading='lazy' /><b>{amount}{name !== "Coins" ? `x` : ``}</b> {name}</li>)}
                        </ul>
                    </div>
                </div>
                <a href="#" className='btn w-100'><button className='gradient-button'><FontAwesomeIcon icon={faCartShopping} className='align-middle' />Buy</button></a>
            </div>
        </div>
    )
}

LootBoxCard.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
}

export default Store