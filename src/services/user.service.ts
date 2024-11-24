import { logger } from '../config/logger';
import { IUser, CreateUserDto } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { MongooseError } from 'mongoose';
import { DatabaseError } from '../errors';
import { MongoServerError } from 'mongodb';

const userRepository = new UserRepository();

export const createUser = async (user: CreateUserDto): Promise<IUser> => {
    try {
        return await userRepository.create(user);
    } catch (error) {
        if (error instanceof MongooseError) {
            logger.error(error, 'Error occured while creating user');
            throw new DatabaseError('Error occured while creating user');
        }
        if (error instanceof MongoServerError) {
            if (error.code === 11000) {
                // error thrown when duplicate key is found for a field set as unique.
                logger.error(error, 'Duplicate key error');
                const duplicatedField = Object.keys(error.keyValue)[0];
                throw new DatabaseError(
                    `User with provided ${duplicatedField} already exists`,
                    400,
                    [
                        {
                            field: duplicatedField,
                            value: error.keyValue[duplicatedField],
                            message: `User with provided ${duplicatedField} already exists`,
                            code: 'DUPLICATE',
                        },
                    ],
                );
            }
            logger.error(error, 'Error occured while creating user');
            throw new DatabaseError('Error occured while creating user');
        }
        throw error;
    }
};

export const getAllUsers = async (
    skip: number,
    limit: number,
    createdAtSortOrder: 'asc' | 'desc',
): Promise<IUser[]> => {
    try {
        return await userRepository.findAll(skip, limit, createdAtSortOrder);
    } catch (error) {
        if (error instanceof MongooseError || error instanceof MongoServerError) {
            logger.error(error, 'Error occured while getting users');
            throw new DatabaseError('Error occured while getting users');
        }
        throw error;
    }
};
