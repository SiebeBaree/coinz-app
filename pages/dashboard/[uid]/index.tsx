import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import styles from "../../../styles/dashboard.module.css"

export default function UserDashboard() {
    const userName = useRef(null);
    const [userProfile, setUserProfile] = useState("https://cdn.discordapp.com/embed/avatars/0.png");

    useEffect(() => {
        userName.current = `${sessionStorage.getItem('user_username')}#${sessionStorage.getItem('user_discriminator')}`;
        setUserProfile(`https://cdn.discordapp.com/avatars/${sessionStorage.getItem('user_id')}/${sessionStorage.getItem('user_avatar')}.png?size=128`);
    }, []);

    return (
        <div className="page-content container">
            <section ref={userName} id={styles.profile} className="text-white d-flex justify-content-center">
                <Image src={userProfile} className={`${styles.profilePicture} ${styles.roundImg}`} height="128" width="128" alt="Discord Profile Picture" loading="lazy" />
                <div className={`${styles.profileContent} d-flex flex-column justify-content-center`}>
                    <h1>{userName.current}</h1>
                </div>
            </section>
        </div>
    )
}