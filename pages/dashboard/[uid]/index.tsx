/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { getGuilds, getPremiumGuilds, isAuthorized } from "../../../lib/api"
import styles from "../../../styles/dashboard.module.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Guild, GuildResponds } from "../../../lib/types"

export default function UserDashboard() {
    const router = useRouter();
    const { uid } = router.query;

    const userRef = useRef(null);
    const [guilds, setGuilds] = useState([]);
    const tickets = "Coming Soon";

    const [error, setError] = useState(0);

    useEffect(() => {
        userRef.current = `${sessionStorage.getItem('user_username')}#${sessionStorage.getItem('user_discriminator')}`;

        isAuthorized().then(async () => {
            const cachedGuilds = sessionStorage.getItem('guilds');

            if (cachedGuilds === null || cachedGuilds === "[]") {
                const allGuilds = await getGuilds().catch(() => {
                    setError(1);
                });

                if (error) return;
                const validGuilds = allGuilds.filter((guild: GuildResponds) => guild.owner === true || (guild.permissions & 0x8) === 0x8);

                const premiumCachedGuilds: string | null = sessionStorage.getItem('premium_guilds');
                let premiumGuilds = [];

                if (premiumCachedGuilds === null || premiumCachedGuilds === "{}") {
                    premiumGuilds = await getPremiumGuilds(validGuilds.map((guild: GuildResponds) => guild.id));
                    sessionStorage.setItem('premium_guilds', JSON.stringify(premiumGuilds));
                } else {
                    premiumGuilds = JSON.parse(premiumCachedGuilds);
                }

                const guildKeys = Object.keys(premiumGuilds);
                const guildObjects: Guild[] = validGuilds.map((guild: GuildResponds) => {
                    return {
                        id: guild.id,
                        name: guild.name,
                        icon: guild.icon,
                        permissions: guild.permissions,
                        isPremium: guildKeys.includes(guild.id) ? premiumGuilds[guild.id] : null
                    }
                });
                sessionStorage.setItem('guilds', JSON.stringify(guildObjects));
                setGuilds(guildObjects);
            } else {
                setGuilds(JSON.parse(cachedGuilds));
            }
        }).catch(() => {
            setError(2);
        });
    }, []);

    return (
        <div className="page-content container">
            <section ref={userRef} id={styles.profile} className="text-white d-flex justify-content-center">
                <img className={`${styles.profilePicture} ${styles.roundImg}`} src="https://cdn.discordapp.com/avatars/643072638075273248/32edb848e9f83f67be8dcdb86912acf1.png?size=128" alt="test" height="128" width="128" />
                <div className={`${styles.profileContent} d-flex flex-column justify-content-center`}>
                    <h1>{userRef.current}</h1>
                    <div className="d-flex align-items-center">
                        <img src="https://cdn.discordapp.com/emojis/1032669959161122976.png?size=96" alt="test2" height="64" width="64" />
                        <h2 className="my-auto">{tickets}</h2>
                    </div>
                </div>
            </section>

            {error === 0 ?
                <section id={styles.guilds} className="text-white d-flex justify-content-between flex-wrap">
                    {guilds.map((guild: Guild) => <Card key={guild.id} userId={uid} guildId={guild.id} guildIcon={guild.icon} guildName={guild.name} isPremium={guild.isPremium} />)}
                </section> :
                <section className='text-center'>
                    {error === 1 && <h1 className='text-danger'>Could not load servers. Please reload the page.</h1>}
                    {error === 2 && <h1 className='text-danger'>Could not verify authentication status...</h1>}
                    <p className='text-white display-6'>If the issue keeps occuring, please contact <code className='text-info'>Siebe#0001</code> on Discord.</p>
                </section>
            }
        </div>
    )
}

function Card({ userId, guildId, guildIcon, guildName, isPremium }) {
    return (
        <div className={`${styles.guildCard} ${isPremium === true ? styles.premium : ""} d-flex`}>
            <img className={styles.roundImg} src={guildIcon === null ?
                "https://cdn.discordapp.com/embed/avatars/1.png" :
                `https://cdn.discordapp.com/icons/${guildId}/${guildIcon}.webp?size=128`} alt="test3" width="156" height="156" />
            <div className={`${styles.cardContent} d-flex flex-column justify-content-center w-100`}>
                <h3>{guildName}</h3>
                <div className="d-flex justify-content-between align-items-baseline">
                    <p>Tier: {isPremium === null ? "NOT INVITED" : (isPremium === true ? "PREMIUM" : "FREE")}</p>
                    <Link href={isPremium === null ?
                        `/invite?id=${guildId}` :
                        `/dashboard/${userId}/${guildId}`
                    }><button className="gradient-button">{isPremium === null ? "Invite" : "Dashboard"} <FontAwesomeIcon icon={faChevronRight} className='align-middle' /></button></Link>
                </div>
            </div>
        </div>
    )
}