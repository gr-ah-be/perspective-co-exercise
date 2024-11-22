import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logger } from './logger';

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/backend-test';

logger.info(`MongoDB URI: ${mongoUri}`); // TODO: remove

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri);
        logger.info('Database connection established successfully.');
        mongoose.connection.on('disconnected', () => {
            logger.info('Disconnected from database');
        });
    } catch (error) {
        logger.error('Failed to connect to MongoDB:', error);
    }
};

export const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        logger.info('Disconnected from database');
    } catch (error) {
        logger.error('Failed to disconnect from MongoDB:', error);
    }
};
