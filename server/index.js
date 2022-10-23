// Environment Variables (Stripe API Key)
import { config } from "dotenv"
if (process.env.NODE_ENV !== 'production') {
    config();
}

// Initialize Stripe
// import Stripe from 'stripe';
// export const stripe = new Stripe(process.env.STRIPE_SECRET, {
//     apiVersion: '2022-08-01',
// });

// Start the API with Express
import { app } from './routes.js';
const port = process.env.PORT || 3300;
app.listen(port, () => console.log(`API available on http://localhost:${port}`));