import express from 'express';
export const app = express();

import cors from 'cors';
import bodyParser from 'body-parser';
import { exchangeCode, getGuilds, getUser, revokeToken } from './oauth.js';

app.use(cors({ origin: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function runAsync(callback) {
    return (req, res, next) => {
        callback(req, res, next).catch(next);
    };
}

/**
 * Discord API
 */
app.post(
    '/api/discord/callback',
    runAsync(async (req, res) => {
        const { code } = req.body;
        if (!code) return res.status(400).send('No code provided');
        const data = await exchangeCode(code);
        if (data.code === 50035) return res.status(401).send('Invalid code');
        res.send(data);
    })
);

app.post(
    '/api/discord/revoke',
    runAsync(async (req, res) => {
        const { code } = req.body;
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

app.get(
    '/api/discord/guilds',
    runAsync(async (req, res) => {
        const { code } = req.query;
        if (!code) return res.status(400).send('No code provided');
        const data = await getGuilds(code);
        res.send(data);
    })
);