import { GetServerSidePropsContext } from 'next';
import config from './data/config.json';
import { validateCookies } from './helpers';
import { User, Member, Premium } from './types';

export const fetchUser = async (context: GetServerSidePropsContext) => {
    const headers = validateCookies(context);
    if (!headers) return { redirect: config.API_URL + '/auth/login' };

    try {
        const res1 = await fetch(config.API_URL + '/discord/user', { headers });
        const user = await res1.json();
        if (user.error) throw new Error('Error fetching user');

        const res2 = await fetch(config.API_URL + '/discord/member', { headers });
        const member = await res2.json();
        if (member.error) throw new Error('Error fetching member');

        const res3 = await fetch(config.API_URL + '/discord/premium', { headers });
        const premium = await res3.json();
        if (premium.error) throw new Error('Error fetching premium');

        return {
            props: {
                user: user as User,
                member: member as Member,
                premium: premium as Premium,
            },
        };
    } catch {
        return {
            redirect: {
                destination: config.API_URL + '/auth/login',
                permanent: false,
            },
            props: {},
        };
    }
};

export const fetchPremium = async (context: GetServerSidePropsContext) => {
    const headers = validateCookies(context);
    if (!headers) return { redirect: config.API_URL + '/auth/login' };

    try {
        const res = await fetch(config.API_URL + '/discord/premium', { headers });
        const premium = await res.json();
        if (premium.error) throw new Error('Error fetching premium');

        return {
            props: {
                premium: premium as Premium,
            },
        };
    } catch {
        return {
            redirect: {
                destination: config.API_URL + '/auth/login',
                permanent: false,
            },
            props: {},
        };
    }
};