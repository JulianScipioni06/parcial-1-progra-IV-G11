import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { makeApp } from '../../src/app';
import type { Server } from 'http';

describe('GET /pedidos/:id (Seguimiento)', () => {
    let server: Server;
    let baseUrl: string;

    beforeAll(() => {
        // levantamos la app en memoria para aislar los tests
        const app = makeApp(':memory:');
        server = app.listen(0);
        const address = server.address() as any;
        baseUrl = `http://localhost:${address.port}`;
    });

    afterAll(() => {
        server.close();
    });

    it('GET /pedidos/:id debe devolver el pedido completo con estado, items y total', async () => {
        // creamos un pedido previo para poder consultarlo
        const postRes = await fetch(`${baseUrl}/pedidos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mesaId: 2,
                items: [{ productoId: 1, cantidad: 2 }] // 2 Muffins de chocolate ($2500 c/u = $5000)
            })
        });
        const pedidoCreado = await postRes.json();

        // consultamos el endpoint por ID
        const response = await fetch(`${baseUrl}/pedidos/${pedidoCreado.id}`);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data).toHaveProperty('id', pedidoCreado.id);
        expect(data).toHaveProperty('estado', 'pendiente');
        expect(Array.isArray(data.items)).toBe(true);
        expect(data.items.length).toBe(1);
        expect(data).toHaveProperty('total', 5000);
    });
});