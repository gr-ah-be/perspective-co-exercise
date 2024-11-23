import { logger } from '../config/logger';
import { connectDB, disconnectDB } from '../config/database';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;

export const setup = async () => {
    mongoServer = await MongoMemoryServer.create({
        instance: {
            dbName: 'backend-test',
        },
    });
    logger.info(`MongoDB URI: ${mongoServer.getUri()}`);
    await connectDB(mongoServer.getUri());
};

export const clearData = async () => {
    logger.info('Clearing database...');
    await mongoose.connection.db.collection('users').deleteMany({});
};

export const destroy = async () => {
    await mongoose.connection.db.collection('users').deleteMany({});
    await disconnectDB();
    await mongoServer.stop();
};

export const insertData = async () => {
    await mongoose.connection.db.collection('users').insertMany([
        {
            _id: new mongoose.Types.ObjectId('674211b69b10137e588d07e3'),
            firstName: 'Rosa',
            lastName: 'King',
            email: 'rosa.king@example.com',
            phone: '+491516644904',
            createdAt: '2021-09-23T19:20:56.138Z',
            updatedAt: '2021-09-23T19:20:56.138Z',
        },
        {
            _id: new mongoose.Types.ObjectId('674211b69b10137e588d07e4'),
            firstName: 'Samir',
            lastName: 'Rice',
            email: 'samir.rice@example.com',
            phone: '+4916014501635',
            createdAt: '2022-09-28T16:16:46.185Z',
            updatedAt: '2022-09-28T16:16:46.185Z',
        },
        {
            _id: new mongoose.Types.ObjectId('674211b69b10137e588d07e5'),
            firstName: 'Carmine',
            lastName: 'Von',
            email: 'carmine.von@example.com',
            phone: '+491787079926',
            createdAt: '2020-12-15T18:45:43.068Z',
            updatedAt: '2020-12-15T18:45:43.068Z',
        },
        {
            _id: new mongoose.Types.ObjectId('674211b69b10137e588d07e6'),
            firstName: 'Mervin',
            lastName: 'Halvorson',
            email: 'mervin.halvorson@example.com',
            phone: '+493246425099',
            createdAt: '2024-01-05T18:27:03.667Z',
            updatedAt: '2024-01-05T18:27:03.667Z',
        },
        {
            _id: new mongoose.Types.ObjectId('674211b69b10137e588d07e7'),
            firstName: 'Haskell',
            lastName: 'Lesch',
            email: 'haskell.lesch@example.com',
            phone: '+496392900348',
            createdAt: '2023-01-20T06:19:54.933Z',
            updatedAt: '2023-01-20T06:19:54.933Z',
        },
        {
            _id: new mongoose.Types.ObjectId('674211b69b10137e588d07e8'),
            firstName: 'Dylan',
            lastName: 'McDermott',
            email: 'dylan.mcdermott@example.com',
            phone: '+495245424569',
            createdAt: '2021-03-14T16:56:29.915Z',
            updatedAt: '2021-03-14T16:56:29.915Z',
        },
        {
            _id: new mongoose.Types.ObjectId('674211b69b10137e588d07e9'),
            firstName: 'Kasandra',
            lastName: 'Pagac',
            email: 'kasandra.pagac@example.com',
            phone: '+492594137122',
            createdAt: '2020-07-04T17:00:39.515Z',
            updatedAt: '2020-07-04T17:00:39.515Z',
        },
        {
            _id: new mongoose.Types.ObjectId('674211b69b10137e588d07ea'),
            firstName: 'Johnny',
            lastName: 'Kris',
            email: 'johnny.kris@example.com',
            phone: '+493965439731',
            createdAt: '2020-05-29T04:11:00.469Z',
            updatedAt: '2020-05-29T04:11:00.469Z',
        },
        {
            _id: new mongoose.Types.ObjectId('674211b69b10137e588d07eb'),
            firstName: 'Chance',
            lastName: 'Langosh',
            email: 'chance.langosh@example.com',
            phone: '+497186844543',
            createdAt: '2022-06-20T07:01:55.040Z',
            updatedAt: '2022-06-20T07:01:55.040Z',
        },
        {
            _id: new mongoose.Types.ObjectId('674211b69b10137e588d07ec'),
            firstName: 'Angela',
            lastName: 'Luettgen',
            email: 'angela.luettgen@example.com',
            phone: '+497263931334',
            createdAt: '2018-02-25T00:15:04.327Z',
            updatedAt: '2018-02-25T00:15:04.327Z',
        },
        {
            _id: new mongoose.Types.ObjectId('674211b69b10137e588d07ed'),
            firstName: 'Ella',
            lastName: 'Brock',
            email: 'ella.brock@example.com',
            phone: '+495164731932',
            createdAt: '2022-01-14T08:00:54.327Z',
            updatedAt: '2022-01-14T08:00:54.327Z',
        },
        {
            _id: new mongoose.Types.ObjectId('674211b69b10137e588d07ee'),
            firstName: 'Maxwell',
            lastName: 'Smith',
            email: 'maxwell.smith@example.com',
            phone: '+499034728209',
            createdAt: '2023-03-22T14:02:03.327Z',
            updatedAt: '2023-03-22T14:02:03.327Z',
        },
        {
            _id: new mongoose.Types.ObjectId('674211b69b10137e588d07ef'),
            firstName: 'Olivia',
            lastName: 'Thompson',
            email: 'olivia.thompson@example.com',
            phone: '+492345849133',
            createdAt: '2022-07-12T18:00:24.327Z',
            updatedAt: '2022-07-12T18:00:24.327Z',
        },
        {
            _id: new mongoose.Types.ObjectId('674211b69b10137e588d07f0'),
            firstName: 'Ethan',
            lastName: 'Brown',
            email: 'ethan.brown@example.com',
            phone: '+494569138220',
            createdAt: '2021-11-09T12:40:54.327Z',
            updatedAt: '2021-11-09T12:40:54.327Z',
        },
        {
            _id: new mongoose.Types.ObjectId('674211b69b10137e588d07f1'),
            firstName: 'Sophia',
            lastName: 'Garcia',
            email: 'sophia.garcia@example.com',
            phone: '+496374811198',
            createdAt: '2023-05-30T09:20:14.327Z',
            updatedAt: '2023-05-30T09:20:14.327Z',
        },
        {
            _id: new mongoose.Types.ObjectId('674211b69b10137e588d07f2'),
            firstName: 'Lucas',
            lastName: 'Rodriguez',
            email: 'lucas.rodriguez@example.com',
            phone: '+499824017728',
            createdAt: '2020-09-21T07:15:24.327Z',
            updatedAt: '2020-09-21T07:15:24.327Z',
        },
        {
            _id: new mongoose.Types.ObjectId('674211b69b10137e588d07f3'),
            firstName: 'Isabella',
            lastName: 'Martinez',
            email: 'isabella.martinez@example.com',
            phone: '+497822143294',
            createdAt: '2019-02-18T15:40:54.327Z',
            updatedAt: '2019-02-18T15:40:54.327Z',
        },
        {
            _id: new mongoose.Types.ObjectId('674211b69b10137e588d07f4'),
            firstName: 'Aiden',
            lastName: 'Hernandez',
            email: 'aiden.hernandez@example.com',
            phone: '+494632950153',
            createdAt: '2022-10-05T22:30:34.327Z',
            updatedAt: '2022-10-05T22:30:34.327Z',
        },
        {
            _id: new mongoose.Types.ObjectId('674211b69b10137e588d07f5'),
            firstName: 'Mia',
            lastName: 'Lopez',
            email: 'mia.lopez@example.com',
            phone: '+495108401092',
            createdAt: '2021-06-17T16:50:44.327Z',
            updatedAt: '2021-06-17T16:50:44.327Z',
        },
        {
            _id: new mongoose.Types.ObjectId('674211b69b10137e588d07f6'),
            firstName: 'Liam',
            lastName: 'Clark',
            email: 'liam.clark@example.com',
            phone: '+498534214391',
            createdAt: '2023-04-09T10:05:14.327Z',
            updatedAt: '2023-04-09T10:05:14.327Z',
        },
    ]);
};
