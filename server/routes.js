import express from 'express';
export const app = express();

import cors from 'cors';
import bodyParser from 'body-parser';
import { exchangeCode, getUser, refreshToken, revokeToken } from './oauth.js';
import { authorizeWebUser } from './database.js';

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
    '/api/discord/refresh',
    runAsync(async (req, res) => {
        const { token } = req.body;
        if (!token) return res.status(400).send('No code provided');
        const data = await refreshToken(token);
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
    '/api/discord/user/autorized/:token',
    runAsync(async (req, res) => {
        const { token } = req.params;
        const { id } = await getUser(token);
        const isAuthorized = await authorizeWebUser(token, id);
        isAuthorized ? res.send('Authorized') : res.status(401).send('Unauthorized');
    })
);