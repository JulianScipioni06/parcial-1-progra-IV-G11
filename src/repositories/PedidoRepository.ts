import { Database } from 'better-sqlite3';
import { Pedido } from '../models/Pedido';

export class PedidoRepository {
    constructor(private db: Database) {}

    guardar(pedido: Pedido): void {
        const insertPedido = this.db.prepare(`
            INSERT INTO pedidos (id, estado) VALUES (?, ?)
        `);
        
        const insertItem = this.db.prepare(`
            INSERT INTO pedido_items (pedido_id, producto_id, cantidad) 
            VALUES (?, ?, ?)
        `);

        const transaction = this.db.transaction(() => {
            insertPedido.run(pedido.id, pedido.estado);

            for (const item of pedido.items) {
                insertItem.run(pedido.id, item.producto.id, item.cantidad);
            }
        });

        transaction();
    }

    actualizarEstado(id: string, nuevoEstado: string): void {
        const stmt = this.db.prepare('UPDATE pedidos SET estado = ? WHERE id = ?');
        stmt.run(nuevoEstado, id);
    }
}