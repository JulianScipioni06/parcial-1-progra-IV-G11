import { Router } from 'express';
import { seedDb } from '../db/connection';

export function makeTestRouter(db: any): Router {
    const router = Router();

    // Middleware de seguridad exclusivo para estas rutas
    router.use((req, res, next) => {
        if (process.env.NODE_ENV !== 'test') {
            return res.status(404).json({ error: 'Ruta no permitida fuera del entorno de pruebas' });
        }
        next();
    });

    router.post('/reset', (req, res) => {
        try {
            db.exec(`
                DELETE FROM pedido_items;
                DELETE FROM pedidos;
                DELETE FROM productos;
            `);
            res.status(200).json({ mensaje: 'Base de datos reiniciada' });
        } catch (error) {
            res.status(500).json({ error: 'Error al reiniciar la base de datos' });
        }
    });

    router.post('/seed', (req, res) => {
        try {
            seedDb(db);
            res.status(200).json({ mensaje: 'Datos precargados' });
        } catch (error) {
            res.status(500).json({ error: 'Error al precargar los datos' });
        }
    });

    return router;
}