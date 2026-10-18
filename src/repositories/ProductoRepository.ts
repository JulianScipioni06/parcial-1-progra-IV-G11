import { Database } from 'better-sqlite3';
import { Producto } from '../models/Producto';
import { Pasteleria } from '../models/Pasteleria';
import { Expreso } from '../models/Expreso';
import { Filtrado } from '../models/Filtrado';

export class ProductoRepository {
    constructor(private db: Database) {}

    private mapRowToProducto(row: any): Producto {
        switch (row.tipo) {
            case 'Pasteleria':
                return new Pasteleria(row.id, row.nombre, row.precioBase);
            case 'Expreso':
                return new Expreso(row.id, row.nombre, row.precioBase, row.tamanio, row.gramos, row.variedad);
            case 'Filtrado':
                return new Filtrado(row.id, row.nombre, row.precioBase, row.tamanio, row.gramos, row.variedad);
            default:
                throw new Error(`Tipo de producto desconocido en la BD: ${row.tipo}`);
        }
    }

    obtenerTodos(): Producto[] {
        const stmt = this.db.prepare('SELECT * FROM productos');
        const rows = stmt.all();
        return rows.map(row => this.mapRowToProducto(row));
    }

    obtenerPorId(id: number): Producto | null {
        const stmt = this.db.prepare('SELECT * FROM productos WHERE id = ?');
        const row = stmt.get(id);
        if (!row) return null;
        return this.mapRowToProducto(row);
    }
}