import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useEffect } from 'react';
import { fetchUser } from '../../lib/api';
import { Member, User, Premium } from '../../lib/types';
import styles from '../../styles/dashboard.module.css';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return await fetchUser(context);
}

export default function Dashboard({ user, member, premium }: { user: User, member: Member, premium: Premium }) {
    useEffect(() => {
        sessionStorage.setItem('user_id', user.id);
        sessionStorage.setItem('user_username', user.username);
        sessionStorage.setItem('user_discriminator', user.discriminator);
        sessionStorage.setItem('user_avatar', user.avatar);
    });

    return (
        <div className='container text-color'>
            <div className='mt-5 text-center'>
                <div id={styles.profile} className="d-flex justify-content-center align-items-center">
                    <Image className={`${styles.roundImg} ${styles.profilePicture}`}
                        style={{
                            background: member.profileColor,
                            border: `3px solid ${member.profileColor}`,
                            boxShadow: `0px 0px 30px 0px ${member.profileColor}70`,
                        }}
                        src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`} alt="" width={128} height={128} />

                    <div className={styles.profileContent}>
                        <h1>{user.username}#{user.discriminator}</h1>
                        <div className='d-flex align-items-center'>
                            <Image className='mb-2' src={'https://cdn.discordapp.com/emojis/1032669959161122976.png?size=64'} alt="" height={42} width={42} />
                            <h3 className='my-auto'>{member.tickets} Tickets</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-5 text-center'>
                <h2>Active Subscriptions</h2>

                <div className='d-flex justify-content-around align-items-center flex-wrap'>
                    {
                        premium.userTier === 0 && premium.guildTier === 0 ?
                            <h4 className={`${styles.card} d-flex justify-content-center align-items-center my-3 p-4`}>
                                You have no active subscriptions.
                            </h4> :
                            <>
                                {premium.userTier > 0 && <PremiumCard premium={premium} isUser />}
                                {premium.guildTier > 0 && <PremiumCard premium={premium} isUser={false} />}
                            </>
                    }
                </div>
            </div>

            <div className='mt-5 text-center'>
                <h2>Coinz Statistics</h2>

                <div className='d-flex align-items-baseline justify-content-center'>
                    <label className='me-3' htmlFor="progress"><h4>Progress:</h4></label>
                    <progress id="progress" value={member.experience % 100} max="100" />
                    <h5 className='ms-3'>(Level {Math.floor(member.experience / 100)})</h5>
                </div>

                <div className='d-flex align-items-center justify-content-center'>
                    <h4 className='my-auto me-3'>Wallet:</h4>
                    <Image src={'https://cdn.discordapp.com/emojis/987800268223709254.png?size=32'} alt="" height={24} width={24} />
                    <h5 className='my-auto ms-2'>{member.wallet}</h5>
                </div>

                <div className='d-flex align-items-center justify-content-center'>
                    <h4 className='my-auto me-3'>Bank:</h4>
                    <Image src={'https://cdn.discordapp.com/emojis/987800268223709254.png?size=32'} alt="" height={24} width={24} />
                    <h5 className='my-auto ms-2'>{member.bank} / {member.bankLimit}</h5>
                </div>
            </div>
        </div>
    );
}

const PremiumCard = ({ premium, isUser = true }: { premium: Premium, isUser: boolean }) => {
    const getExpired = (timestamp: number): string => {
        const date = new Date(timestamp * 1000);
        const now = new Date();

        const diff = date.getTime() - now.getTime();
        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (months > 0) {
            return `in ${months} month${months > 1 ? 's' : ''}`;
        } else if (days > 0) {
            return `in ${days} day${days > 1 ? 's' : ''}`;
        } else {
            return 'today';
        }
    };

    const name = isUser ? (premium.userTier === 2 ? 'Benefactor' : 'Supporter') : 'Community';
    const expires = isUser ? premium.userExpires : premium.guildExpires;

    return (
        <div className={`${styles.card} d-flex justify-content-between my-3 p-4`}>
            <div className='d-flex flex-column align-items-start'>
                <h3>{name}</h3>
                {
                    expires > Math.floor(Date.now() / 1000) ?
                        <h5>Expires in {getExpired(expires)}</h5> :
                        <h5>Expired</h5>
                }
            </div>
            <a className='btn gradient-button my-auto' href='https://billing.stripe.com/p/login/28o14Tb34gqB8EM7ss'>Cancel Subscription</a>
        </div>
    );
};