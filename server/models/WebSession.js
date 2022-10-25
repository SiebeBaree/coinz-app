import mongoose from 'mongoose';

const WebSession = mongoose.Schema({
    id: { type: String, required: true, index: true },
    sessionId: { type: String, required: true, unique: true, index: true },
    token: { type: String, required: true, unique: true, index: true },
    expireAt: { type: Number, default: Date.now() + 604800 }
});

export default mongoose.model('WebSession', WebSession, 'websessions');