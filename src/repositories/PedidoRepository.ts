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
    
    obtenerTodos(): any[] {
        const stmt = this.db.prepare('SELECT * FROM pedidos');
        const pedidos = stmt.all();
        
        const stmtItems = this.db.prepare('SELECT * FROM pedido_items WHERE pedido_id = ?');
        
        return pedidos.map((p: any) => ({
            ...p,
            items: stmtItems.all(p.id)
        }));
    }

    obtenerPorId(id: number): any {
        const stmt = this.db.prepare('SELECT * FROM pedidos WHERE id = ?');
        const pedido = stmt.get(id);
        if (!pedido) return null;

        const stmtItems = this.db.prepare('SELECT * FROM pedido_items WHERE pedido_id = ?');
        return {
            ...pedido,
            items: stmtItems.all(id)
        };
    }

    calcularFacturacionTotal(): number {
        return 0; 
    }

    obtenerProductoMasVendido(): any {
        const stmt = this.db.prepare(`
            SELECT p.nombre, SUM(pi.cantidad) as cantidadTotal
            FROM pedido_items pi
            JOIN productos p ON pi.producto_id = p.id
            GROUP BY pi.producto_id
            ORDER BY cantidadTotal DESC
            LIMIT 1
        `);
        return stmt.get();
    }
}