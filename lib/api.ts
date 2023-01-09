import { GetServerSidePropsContext } from 'next';
import config from './data/config.json';
import { validateCookies } from './helpers';
import { User } from './types';

export const fetchUser = async (context: GetServerSidePropsContext) => {
    const headers = validateCookies(context);
    if (!headers) return { redirect: config.API_URL + '/auth/login' };

    try {
        const res = await fetch(config.API_URL + '/discord/user', {
            headers,
        });
        const user = await res.json();

        if (user.error) {
            return {
                redirect: {
                    destination: config.API_URL + '/auth/login',
                    permanent: false,
                },
                props: {},
            };
        }

        return {
            props: {
                user: user as User,
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