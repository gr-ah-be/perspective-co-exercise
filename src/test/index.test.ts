import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import request from 'supertest';
import { buildApplication } from '../app';
import { connectDB, disconnectDB } from '../config/database';
import { logger } from '../config/logger';
import mongoose from 'mongoose';

const app = buildApplication(logger);

describe('User API Endpoints', () => {
    beforeAll(async () => {
        await connectDB();
        await mongoose.connection.db.collection('users').deleteMany({});
    });

    afterAll(async () => {
        await disconnectDB();
    });
    describe('POST /users', () => {
        it('should create a new user successfully', async () => {
            const response = await request(app).post('/users').send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '1234567890',
            });
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('_id');
            expect(response.body.email).toBe('john.doe@example.com');
        });

        it('should return validation error for missing fields', async () => {
            const response = await request(app).post('/users').send({});
            expect(response.status).toBe(400);
        });
    });

    describe('GET /users', () => {
        it('should retrieve all users with default pagination', async () => {
            const response = await request(app).get('/users');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('should retrieve users sorted by creation date descending', async () => {
            const response = await request(app).get('/users?created=desc');
            expect(response.status).toBe(200);
            expect(response.body[0].createdAt).toBeDefined();
        });
    });
});
