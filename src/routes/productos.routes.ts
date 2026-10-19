import { Router } from 'express';
import { ProductoController } from '../controllers/producto.controller';

export function makeProductosRouter(productoRepo: any): Router {
  const router = Router();
  const controller = new ProductoController(productoRepo);

  router.get('/', controller.listar);
  router.get('/:id', controller.obtenerPorId);

  return router;
}