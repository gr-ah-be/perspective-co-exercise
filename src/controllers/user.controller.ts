import { Request, Response } from 'express';
import { createUser, getAllUsers } from '../services/user.service';
import { DatabaseError } from '../errors';
import { createUserSchema, getUsersQuerySchema } from '../models/user.schema';

export const createUserHandler = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, phone } = createUserSchema.parse(req.body);

        const createdUser = await createUser({
            firstName,
            lastName,
            email,
            phone,
        });
        res.status(201).send(createdUser);
    } catch (error) {
        if (error instanceof DatabaseError) {
            return res
                .status(error.statusCode)
                .send({ message: error.message, errors: error.errors });
        }
        throw error;
    }
};

export const getUsersHandler = async (req: Request, res: Response) => {
    try {
        const validatedQuery = getUsersQuerySchema.parse(req.query);

        const users = await getAllUsers(
            validatedQuery.skip,
            validatedQuery.limit,
            validatedQuery.created,
        );
        res.send(users);
    } catch (error) {
        if (error instanceof DatabaseError) {
            res.status(500).send({ message: error.message });
        }
        throw error;
    }
};
