import mongoose from 'mongoose';

const User = mongoose.Schema({
    id: { type: String, required: true, index: true },
    premiumType: { type: Number, default: 0 },
    premiumSince: { type: Number, default: parseInt(Date.now() / 1000) },
    premiumExpire: { type: Number, default: 0 },
    premiumGuilds: { type: [String], default: [] },
    premiumGuildsLimit: { type: Number, default: 0 }
});

export default mongoose.model('User', User, 'users');