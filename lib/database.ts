import { connect, set } from 'mongoose';

const connectToDatabase = async () => {
    set('strictQuery', false);

    return connect(process.env.DATABASE_URI ?? '', {
        maxPoolSize: 100,
        minPoolSize: 5,
        family: 4,
        heartbeatFrequencyMS: 30000,
    })
        .then(() => console.log('Connected to MongoDB'))
        .catch(console.error);
};

export default connectToDatabase;