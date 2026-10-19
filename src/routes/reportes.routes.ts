import { Router } from 'express';
import { PedidoController } from '../controllers/pedido.controller';

export function makeReportesRouter(pedidoRepo: any, productoRepo: any): Router {
    const router = Router();
    const controller = new PedidoController(pedidoRepo, productoRepo);

    router.get('/facturacion', controller.facturacion);
    router.get('/mas-vendido', controller.masVendido);

    return router;
}