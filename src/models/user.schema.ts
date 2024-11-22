import { z } from 'zod';

export const createUserSchema = z.object({
    firstName: z.string().min(1, 'firstName field is required'),
    lastName: z.string().min(1, 'lastName field is required'),
    email: z.string().email('email field is required'),
    phone: z.string().min(1, 'phone field is required'),
});

export const getUsersQuerySchema = z.object({
    skip: z.coerce.number().optional().default(0), // Converts strings to numbers
    limit: z.coerce.number().optional().default(10),
    created: z.enum(['asc', 'desc']).optional().default('desc'),
});

export type GetUsersQuery = z.infer<typeof getUsersQuerySchema>;
export type CreateUserDto = z.infer<typeof createUserSchema>;
