import { Router } from 'express';
import { PedidoController } from '../controllers/pedido.controller';

export function makeReportesRouter(pedidoRepo: any): Router {
    const router = Router();
    const controller = new PedidoController(pedidoRepo);

    router.get('/facturacion', controller.facturacion);
    router.get('/mas-vendido', controller.masVendido);

    return router;
}