import express, { Express } from 'express';
import { createDb, seedDb } from './db/connection';

import { ProductoRepository } from './repositories/ProductoRepository';
import { PedidoRepository } from './repositories/PedidoRepository';

import { makeProductosRouter } from './routes/productos.routes';
import { makePedidosRouter } from './routes/pedidos.routes';
import { makeReportesRouter } from './routes/reportes.routes';

export function makeApp(dbPath?: string): Express {
    const app = express();
    app.use(express.json());

    // Si estamos testeando usamos la RAM, si no, creamos un archivo físico
    const resolvedPath = dbPath ?? (process.env.NODE_ENV === 'test' ? ':memory:' : 'data/origen.sqlite');
    
    // Creamos la base de datos y la llenamos
    const db = createDb(resolvedPath);
    seedDb(db);

    const productoRepo = new ProductoRepository(db);
    const pedidoRepo = new PedidoRepository(db);

    // Endpoint de prueba
    app.get('/health', (_req, res) => res.json({ status: 'ok', message: 'API Cafetería Origen lista' }));

    // 4. Conectamos todas las rutas inyectando los repositorios correctos
    app.use('/productos', makeProductosRouter(productoRepo));
    
    app.use('/pedidos', makePedidosRouter(pedidoRepo, productoRepo));
    app.use('/reportes', makeReportesRouter(pedidoRepo, productoRepo));


    const testRouter = express.Router();

    // Middleware de seguridad: bloquea el acceso si no estamos en test
    testRouter.use((req, res, next) => {
        if (process.env.NODE_ENV !== 'test') {
            return res.status(404).json({ error: 'Ruta no permitida fuera del entorno de pruebas' });
        }
        next();
    });

    // Ruta Reset: Vacía las tablas de la base de datos
    testRouter.post('/reset', (req, res) => {
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

    // Ruta Seed: Vuelve a llenar la base de datos con los productos
    testRouter.post('/seed', (req, res) => {
        try {
            seedDb(db); 
            res.status(200).json({ mensaje: 'Datos precargados' });
        } catch (error) {
            res.status(500).json({ error: 'Error al precargar los datos' });
        }
    });

    app.use('/__test__', testRouter);

    return app;
}