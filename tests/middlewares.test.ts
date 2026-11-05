import { describe, it, expect } from 'vitest';
import  request  from 'supertest';
import express , { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import {notFoundMiddleware, globalErrorHandler , AppError} from '../src/middlewares/errorHandler'; 

const testApp = express();
testApp.use(cors());

// Middleware para manejar errores
testApp.get('/ruta-provocada', (req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Fallo provocado')  as AppError;
    error.status = 400;
    next(error);
});

testApp.use(notFoundMiddleware);
testApp.use(globalErrorHandler);

describe('Middlewares Globales y CORS',() => {
    it('Debe incluir el middleware de CORS', async () => {
        const res = await request(testApp).get('/ruta-erronea');
        expect(res.headers['access-control-allow-origin']).toBe('*');
    });

    it ('Debe devolver 404 y formato { error: mensaje } para rutas no encontradas', async () => {
        const res = await request(testApp).get('/ruta-inexistente');
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ error: 'Ruta no encontrada' });
    });

    it ('Debe devolver formato { error: mensaje } ante una exepcion 400', async () => {
        const res = await request(testApp).get('/ruta-provocada');
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Fallo provocado' });
    });
})
