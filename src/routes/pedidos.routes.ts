import { Router } from 'express';
import { PedidoController } from '../controllers/pedido.controller';

export function makePedidosRouter(pedidoRepo: any, productoRepo: any): Router {
    const router = Router();
    const controller = new PedidoController(pedidoRepo,productoRepo);

    router.post('/', controller.crear);
    router.get('/', controller.listar);
    router.get('/:id', controller.obtenerPorId);

    return router;
}