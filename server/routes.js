import express from 'express';
export const app = express();

import cors from 'cors';
import { exchangeCode, getUser, revokeToken } from './oauth.js';

app.use(cors({ origin: true }));
app.use(express.json());

function runAsync(callback) {
    return (req, res, next) => {
        callback(req, res, next).catch(next);
    };
}

/**
 * Discord API
 */
app.get(
    '/api/discord/callback',
    runAsync(async (req, res) => {
        const { code } = req.query;
        if (!code) return res.status(400).send('No code provided');
        const data = await exchangeCode(code);
        if (data.code === 50035) return res.status(401).send('Invalid code');
        res.send(data);
    })
);

app.get(
    '/api/discord/revoke',
    runAsync(async (req, res) => {
        const { code } = req.query;
        if (!code) return res.status(400).send('No code provided');
        const data = await revokeToken(code);
        res.send(data);
    })
);

app.get(
    '/api/discord/user',
    runAsync(async (req, res) => {
        const { code } = req.query;
        if (!code) return res.status(400).send('No code provided');
        const data = await getUser(code);
        res.send(data);
    })
);