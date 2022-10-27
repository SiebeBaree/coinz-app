import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import styles from '../styles/Home.module.css'

import CompanyImg from '../public/company.webp'
import FarmingImg from '../public/farming.webp'
import GamesImg from '../public/games.webp'
import InvestingImg from '../public/investing.webp'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faUsers, faServer, faTerminal, faCode, faCheckToSlot } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <div className="page-content">
      <div id={styles.hero} className='d-flex flex-column'>
        <div className={`${styles.heroContent} container d-flex flex-row justify-content-center`}>
          <div className="d-flex flex-column justify-content-center text-center">
            <h2 className="magic-text">Coinz is the only economy discord bot you need</h2>
            <p className="text-color">Compete against 250k+ users to be the richest person on Coinz. With loads of fun commands to keep you and your server entertained.</p>
            <div>
              <Link href="/invite" target="_blank"><button className='gradient-button'>Add To Your Server <FontAwesomeIcon icon={faChevronRight} className='align-middle' /></button></Link>
            </div>
          </div>
        </div>
      </div>

      <div id={styles.statistics} className="container d-flex justify-content-around flex-wrap">
        <StatCounter key="servers" icon={faServer} count="1100" name="Servers" suffix="+" />
        <StatCounter key="users" icon={faUsers} count="250" name="Users" suffix="k+" />
        <StatCounter key="cmds" icon={faCode} count="45" name="Commands" />
        <StatCounter key="dailycmds" icon={faTerminal} count="3500" name="Daily Commands" suffix="+" />
      </div>

      <div id={styles.vote} className="container text-center d-flex flex-column justify-content-center">
        <FontAwesomeIcon icon={faCheckToSlot} className={styles.headerIcon} />
        <h1>Vote to get awesome rewards</h1>
        <h2 className={styles.voteDescription}>Check the rewards using /vote</h2>

        <div className={`${styles.voteBtns} d-flex flex-row justify-content-center`}>
          <a href="https://top.gg/bot/938771676433362955/vote" target="_blank" rel="noreferrer"><button className='gradient-button'>Vote on Top.gg  <FontAwesomeIcon icon={faChevronRight} className='align-middle' /></button></a>
          <a href="https://discordbotlist.com/bots/coinz/upvote" target="_blank" rel="noreferrer"><button className='gradient-button'>Vote on Discordbotlist  <FontAwesomeIcon icon={faChevronRight} className='align-middle' /></button></a>
        </div>
      </div>

      <div id={styles.features} className='container'>
        <FeatureComponent image={InvestingImg} imageAlt="Feature: Stocks and Crypto">
          <h3>Buy, hold and sell stocks</h3>
          <p>Enhance your knowledge of the stock and crypto market by buying, holding and selling stocks and crypto within Coinz. All prices are updated regularly. Coinz currently has 30 stocks and 27 crypto currencies.</p>
        </FeatureComponent>

        <FeatureComponent image={CompanyImg} imageAlt="Feature: Own a Company">
          <h3>Start your own company</h3>
          <p>Create your own company, buy factories and produce items that you can sell for a big profit. Repeat this step over and over and become richer than Elon Musk! Did I mention that you can employ real users?!</p>
        </FeatureComponent>

        <FeatureComponent image={GamesImg} imageAlt="Feature: Play some Minigames">
          <h3>Play more than 15 games</h3>
          <p>Play all sorts of minigames inside of discord! You will never get bored when playing these minigames. We plan to release a lot more minigames in the future. Some examples are: Blackjack, Poker, Roulette, Crash, ...</p>
        </FeatureComponent>

        <FeatureComponent image={FarmingImg} imageAlt="Feature: Grow your own crops">
          <h3>Grow your own crops</h3>
          <p>Buy farmland to grow crops on and live a peaceful live. Buy up to 9 plots to grow crops on. With premium you can buy up to 15 plots! Each crop has a different grow time, don&apos;t let your crops grow . Don&apos;t forget to water your crops once in a while!</p>
        </FeatureComponent>
      </div>
    </div>
  )
}

function StatCounter({ icon, count, name, suffix = "", delay = "3" }) {
  count = parseInt(count);
  const totalDelay = Math.floor(parseInt(delay) * 1000);
  const incrementValue = Math.ceil(count * 20 / totalDelay);
  const [state, setState] = useState(0);
  let isVisible = false;

  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isVisible = entries[0].isIntersecting;
    });

    observer.observe(ref.current);

    const interval = setInterval(() => {
      if (isVisible === true) {
        if (state < count) setState(state => state + incrementValue);
        else if (state >= count) setState(count);
      }
    }, 10);

    return () => clearInterval(interval)
  }, [state, count])

  return (
    <div ref={ref} className={`${styles.stat} d-flex flex-column align-items-center`}>
      <header><FontAwesomeIcon icon={icon} /></header>
      <div className={styles.countNumber}>{state}{suffix}</div>
      <p className={`${styles.statName} text-center`}>{name}</p>
    </div>
  )
}

function FeatureComponent({ image, imageAlt, children }) {
  return (
    <div className={`${styles.featureRow} d-flex justify-content-between`}>
      <div className={styles.featureImg}>
        <Image src={image} alt={imageAlt} loading="lazy" />
      </div>
      <div className={`${styles.featureText} my-auto`}>
        {children}
      </div>
    </div>
  )
}