import { GetServerSidePropsContext } from 'next';
import { useEffect } from 'react';
import { fetchUser } from '../../lib/api';
import { User } from '../../lib/types';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return await fetchUser(context);
}

export default function Dashboard({ user }: { user: User }) {
    useEffect(() => {
        sessionStorage.setItem('user_id', user.id);
        sessionStorage.setItem('user_username', user.username);
        sessionStorage.setItem('user_discriminator', user.discriminator);
        sessionStorage.setItem('user_avatar', user.avatar);
    });

    return (
        <>
            <h1>Dashboard</h1>
            <p>Welcome {user.username}#{user.discriminator}!</p>
            <p>{user.id}</p>
        </>
    );
}