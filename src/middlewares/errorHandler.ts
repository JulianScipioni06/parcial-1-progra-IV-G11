import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
    status?: number;
}

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
}

export const globalErrorHandler =(
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = err.status || 400;
    const message = err.message || 'Error interno del servidor';
    
    res.status(status).json({ error: message });
}