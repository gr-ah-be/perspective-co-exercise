import { NextFunction, Request, Response } from 'express';
import { logger } from '../../config/logger';

// Global error handler
export const errorHandler = (
    err: Error & { statusCode?: number },
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Log the error for debugging
    logger.error(`[Error] ${err.stack}`);

    res.status(statusCode).send({
        status: 'error',
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Include stack trace in development mode
    });
};
