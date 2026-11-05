import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { makeApp } from '../../src/app';
import type { Server } from 'http';

describe('Endpoints de Pedidos (Integración)', () => {
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

    it('POST /pedidos debe aceptar mesaId opcional y devolver el pedido con su total', async () => {
        const payload = {
            mesaId: 4,
            items: [{ productoId: 3, cantidad: 2 }] // 2 expresos pocillo brasil
        };

        const response = await fetch(`${baseUrl}/pedidos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        expect(response.status).toBe(201);
        expect(data).toHaveProperty('mesaId', 4); 
        expect(data).toHaveProperty('estado', 'pendiente');
        expect(data).toHaveProperty('total');
    });
});