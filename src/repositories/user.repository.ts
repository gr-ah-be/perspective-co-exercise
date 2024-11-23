import { Model } from 'mongoose';
import { CreateUserDto, IUser, User } from '../models/user.model';

const fieldsToExclude = ['__v'];

export interface IUserRepository {
    create(user: IUser): Promise<IUser>;
    findAll(skip: number, limit: number, createdAtSortOrder: 'asc' | 'desc'): Promise<IUser[]>;
}

export class UserRepository implements IUserRepository {
    private readonly model: Model<IUser>;

    constructor() {
        this.model = User;
    }

    async create(user: CreateUserDto): Promise<IUser> {
        const savedUser = await this.model.create(user);
        return savedUser.toObject() as IUser;
    }

    async findAll(skip = 0, limit = 10, createdAtSortOrder: 'asc' | 'desc'): Promise<IUser[]> {
        return this.model
            .find()
            .sort({ createdAt: createdAtSortOrder })
            .limit(limit)
            .skip(skip)
            .select(`-${fieldsToExclude.join(' -')}`)
            .lean();
    }
}
