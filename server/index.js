import mongoose from 'mongoose'
import { config } from "dotenv"
config();

// Initialize Stripe
// import Stripe from 'stripe';
// export const stripe = new Stripe(process.env.STRIPE_SECRET, {
//     apiVersion: '2022-08-01',
// });

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URI, {
    dbName: process.env.NODE_ENV === 'production' ? 'coinz' : 'coinz_beta',
    useNewUrlParser: true,
    maxPoolSize: 100,
    minPoolSize: 5,
    family: 4,
    heartbeatFrequencyMS: 30000,
    keepAlive: true,
    keepAliveInitialDelay: 300000
}).then(() => console.log('Connected to MongoDB'));

// Start the API with Express
import { app } from './routes.js';
const port = process.env.PORT || 3300;
app.listen(port, () => console.log(`API available on http://localhost:${port}`));