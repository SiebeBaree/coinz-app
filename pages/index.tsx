import Statistic from '../components/Statistic';
import { faServer, faUsers, faTerminal } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Index.module.css';
import HeroImg from '../public/hero.png';
import Image from 'next/image';
import Discord from '../public/discord.svg';

export default function IndexPage() {
    return (
        <>
            <div className="page-content">
                <div className={`${styles.hero} d-flex justify-content-between align-items-center container`}>
                    <div className={`${styles.heroText} d-flex flex-column justify-content-center`}>
                        <h1 className={styles.watermark}>Coinz</h1>
                        <h2 className="fw-bold">The Ultimate Economy Discord Bot</h2>
                        <p className={styles.description}>
                            Join over 330,000 users and compete to be the wealthiest person
                            on Coinz with our entertaining commands.
                        </p>

                        <div className={`${styles.ctaButtons} d-flex gap-4 mt-4`}>
                            <a className={`${styles.ctaButton} d-flex align-items-center gap-2 fw-bold`}>
                                <Image src={Discord} alt="Discord Logo"/>
                                Add To Discord
                                <div className={`${styles.ctaButtonInner} w-100 h-100`}/>
                            </a>
                            <span className={`${styles.ctaText} my-auto`}>or <a className="text-decoration-underline">get help using Coinz</a></span>
                        </div>
                    </div>

                    <div>
                        <Image src={HeroImg} alt="Hero Image" className={styles.heroImg}/>

                        {/* <ReviewCard key={1} image="https://cdn.discordapp.com/avatars/513020026488619012/8af02ef19f09e7065d643d095d3d6115.webp?size=48" review="Never gets boring, a fun way to kill time"/> */}
                        {/* <ReviewCard key={1} image="https://cdn.discordapp.com/avatars/513020026488619012/8af02ef19f09e7065d643d095d3d6115.webp?size=48" review="Never gets boring, a fun way to kill time"/> */}
                        {/* <ReviewCard key={1} image="https://cdn.discordapp.com/avatars/513020026488619012/8af02ef19f09e7065d643d095d3d6115.webp?size=48" review="Never gets boring, a fun way to kill time"/> */}
                    </div>
                </div>
            </div>

            <div className={`${styles.statistics}`}>
                <div className="container d-flex justify-content-around align-items-center h-100 flex-wrap gap-4 py-3">
                    <Statistic icon={faServer} title="Servers" value="2900" suffix="+"/>
                    <Statistic icon={faUsers} title="Users" value="330" suffix="k+"/>
                    <Statistic icon={faTerminal} title="Commands" value="41"/>
                </div>
            </div>

            <div className="container my-5">
                <div className={`${styles.featuresTitle} mb-5`}>
                    <h2>Features</h2>
                </div>

                <div className={styles.features}>
                    <div className={`${styles.feature} d-flex justify-content-between gap-5`}>
                        <Image src="/investing.webp" alt="A picture of discord that shows the games category of Coinz."
                               width={600} height={400}/>

                        <div className="d-flex flex-column justify-content-center">
                            <h1 className="mb-3 fw-bold">Buy, hold and sell stocks</h1>
                            <p>Enhance your knowledge of the stock and crypto market by buying, holding and selling
                                stocks and crypto within Coinz. All prices are updated regularly. Coinz currently has 30
                                stocks and 27 crypto currencies.</p>
                        </div>
                    </div>

                    <div className={`${styles.feature} d-flex justify-content-between gap-5`}>
                        <Image src="/company.webp" alt="A picture of discord that shows the games category of Coinz."
                               width={600} height={400}/>

                        <div className="d-flex flex-column justify-content-center">
                            <h1 className="mb-3 fw-bold">Start your own business</h1>
                            <p>Create your own business, buy factories and produce items that you can sell for a big
                                profit. Repeat this step over and over and become richer than Elon Musk! Did I mention
                                that you can employ real users?!</p>
                        </div>
                    </div>

                    <div className={`${styles.feature} d-flex justify-content-between gap-5`}>
                        <Image src="/games.webp" alt="A picture of discord that shows the games category of Coinz."
                               width={600} height={400}/>

                        <div className="d-flex flex-column justify-content-center">
                            <h1 className="mb-3 fw-bold">Play more than 15 games</h1>
                            <p>Play all sorts of minigames inside of discord! You will never get bored when playing
                                these minigames. We plan to release a lot more minigames in the future. Some examples
                                are: Blackjack, Poker, Roulette, Crash, ...</p>
                        </div>
                    </div>

                    <div className={`${styles.feature} d-flex justify-content-between gap-5`}>
                        <Image src="/farming.webp" alt="A picture of discord that shows the games category of Coinz."
                               width={600} height={400}/>

                        <div className="d-flex flex-column justify-content-center">
                            <h1 className="mb-3 fw-bold">Grow your own crops</h1>
                            <p>Buy farmland to grow crops on and live a peaceful live. Buy up to 9 plots to grow crops
                                on. With premium you can buy up to 15 plots! Each crop has a different grow time,
                                don&apos;t let your crops grow rotten!</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function ReviewCard({ image, review }) {
    return (
        <div className={`${styles.reviewCard}`}>
            <Image src={image} alt="Reviewer Profile Picture" width={42} height={42} className="me-auto"/>
            <p>{review}</p>
        </div>
    );
}