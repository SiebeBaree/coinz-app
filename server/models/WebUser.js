import mongoose from 'mongoose';

const WebUser = mongoose.Schema({
    token: { type: String, required: true, unique: true, index: true },
    id: { type: String, required: true, index: true },
    createdAt: { type: Date, default: Date.now, expires: 604800 }
});

export default mongoose.model('WebUser', WebUser, 'webusers');