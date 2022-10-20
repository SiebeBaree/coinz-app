import express from 'express';
import cors from 'cors';
import { faker } from '@faker-js/faker';

const app = express();
app.use(cors());
app.use(express.json());

const members = [...Array(1024).keys()].map(id => {
    return {
        id: faker.random.numeric(10),
        name: `${faker.name.firstName().toLowerCase()}#${faker.random.numeric(4)}`,
        email: faker.internet.email()
    }
});

app.get('/members', (req, res) => {
    const q = req.query.q?.toLowerCase() || '';
    const results = members.filter(member => member.name.toLowerCase().includes(q.toLowerCase()));
    res.send(results);
});

app.listen(3000);