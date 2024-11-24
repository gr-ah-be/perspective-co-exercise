import { Schema, model } from 'mongoose';

interface CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true, unique: true },
    },
    { timestamps: true },
);

const User = model<IUser>('User', UserSchema);

export { User, IUser, CreateUserDto };
