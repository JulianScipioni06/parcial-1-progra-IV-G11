import express, {Express} from 'express';
import { createDb, seedDb } from './db/connection';
// Más adelante acá importaremos las rutas y los repositorios

export function makeApp(dbPath?: string): Express {
    const app = express();
    app.use(express.json());

    // Si estamos testeando usamos la RAM, si no, creamos un archivo físico como en el TP2
    const resolvedPath = dbPath ?? (process.env.NODE_ENV === 'test' ? ':memory:' : 'data/origen.sqlite');
    
    // 1. Creamos la base de datos y las tablas
    const db = createDb(resolvedPath);
    
    // 2. La llenamos con los cafés y pastelería del parcial
    seedDb(db);

    // Endpoint de prueba para ver que el server anda
    app.get('/health', (_req, res) => res.json({ status: 'ok', message: 'API Cafetería Origen lista' }));

    // En el próximo paso conectaremos acá los endpoints:
    // app.use('/productos', makeProductosRouter(...));
    // app.use('/pedidos', makePedidosRouter(...));

    return app;
}