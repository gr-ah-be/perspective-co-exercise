import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals';
import request from 'supertest';
import { buildApplication } from '../app';
import { logger } from '../config/logger';
import * as http from 'http';
import { setup, destroy, clearData, insertData } from './database-test';
let app;
let server: http.Server;

describe.only('User API Endpoints', () => {
    beforeAll(async () => {
        app = buildApplication(logger);
        server = app.listen(3000);
        await setup();
    });

    afterAll(async () => {
        await destroy();
        await server.close();
    });

    describe('POST /users', () => {
        afterEach(async () => {
            await clearData();
        });

        it('should create a new user successfully', async () => {
            const response = await request(server).post('/users').send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '+491516644904',
            });
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('_id');
            expect(response.body.email).toBe('john.doe@example.com');
        });

        it('should return validation error for missing fields', async () => {
            const response = await request(server).post('/users').send({});
            expect(response.status).toBe(400);
        });

        it('should fail when email format is invalid', async () => {
            const response = await request(server).post('/users').send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'invalid-email',
                phone: '1234567890',
            });
            expect(response.status).toBe(400);
            expect(response.body).toMatchObject({
                errors: [
                    {
                        validation: 'email',
                        code: 'invalid_string',
                        message: 'Invalid email format',
                        path: ['email'],
                    },
                ],
            });
        });

        it('should return error when creating a user with a duplicate email', async () => {
            const response = await request(server).post('/users').send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '+491516644904',
            });

            expect(response.status).toBe(201);

            // Attempt to create another user with the same email
            const duplicateResponse = await request(server).post('/users').send({
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '+331516644902',
            });

            expect(duplicateResponse.status).toBe(400);
            expect(duplicateResponse.body).toMatchObject({
                message: 'User with provided email already exists',
                errors: [
                    {
                        field: 'email',
                        value: 'john.doe@example.com',
                        message: 'User with provided email already exists',
                        code: 'DUPLICATE',
                    },
                ],
            });
        });

        it('should return error when creating a user with a duplicate phone', async () => {
            const response = await request(server).post('/users').send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '+491516644904',
            });

            expect(response.status).toBe(201);

            // Attempt to create another user with the same phone
            const duplicateResponse = await request(server).post('/users').send({
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane.doe@example.com',
                phone: '+491516644904',
            });

            expect(duplicateResponse.status).toBe(400);
            expect(duplicateResponse.body).toMatchObject({
                message: 'User with provided phone already exists',
                errors: [
                    {
                        field: 'phone',
                        value: '+491516644904',
                        message: 'User with provided phone already exists',
                        code: 'DUPLICATE',
                    },
                ],
            });
        });
    });

    describe('GET /users', () => {
        beforeAll(async () => {
            await insertData();
        });

        it('should retrieve all users with default pagination', async () => {
            const response = await request(server).get('/users');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('should retrieve users sorted by creation date descending', async () => {
            const response = await request(server).get('/users?created=desc');
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body).toMatchSnapshot();
        });

        it('should retrieve users sorted by creation date ascending', async () => {
            const response = await request(server).get('/users?created=asc');
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body).toMatchSnapshot();
        });
    });
});
