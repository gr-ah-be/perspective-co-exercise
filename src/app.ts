import express, { Express, Request, Response, NextFunction } from 'express';
import { userRouter } from './routers/user.router';
import * as dotenv from 'dotenv';
import cors from 'cors';
import pinoHttp from 'pino-http';
import pino from 'pino';

dotenv.config();

export const buildApplication = (logger: pino.Logger | typeof console): express.Express => {
    const app: Express = express();

    app.use(pinoHttp({ logger: logger as pino.Logger }));
    app.use(cors()).use(express.json()).options('*', cors());

    app.use('/users', userRouter);

    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
        logger.error(err, 'Error occured');
        res.status(500).send({ message: 'Internal Server Error' });
    });

    app.get('/health', (_req: Request, res: Response) => {
        res.status(200).send({ status: 'UP' });
    });

    return app;
};
