import { Request, Response } from 'express';
import { PedidoRepository } from '../repositories/PedidoRepository';
import { ProductoRepository } from '../repositories/ProductoRepository';
import { Pedido } from '../models/Pedido';

export class PedidoController {
    // Inyectamos los dos repositorios
    constructor(
        private readonly pedidoRepo: PedidoRepository,
        private readonly productoRepo: ProductoRepository
    ) {}

    crear = (req: Request, res: Response) => {
        const { items } = req.body;
        if (!items || !items.length) return res.status(400).json({ error: 'Faltan items' });
        
        try {
            const nuevoPedido = new Pedido();

            for (const item of items) {
                const productoReal = this.productoRepo.obtenerPorId(Number(item.productoId));
                if (!productoReal) {
                    return res.status(404).json({ error: `Producto ${item.productoId} no existe` });
                }
                nuevoPedido.agregarItem(productoReal, item.cantidad);
            }

            this.pedidoRepo.guardar(nuevoPedido);
            
            res.status(201).json({
                pedido: nuevoPedido,
                total: nuevoPedido.calcularTotal() 
            });
        } catch (error) {
            if (error instanceof Error){
                return res.status(400).json({ error: error.message });
            }
            return res.status(400).json({ error: 'Error desconocido' });
        }
    };

    listar = (req: Request, res: Response) => {
        // Asumiendo que armaste un obtenerTodos() en tu PedidoRepository
        res.status(200).json(this.pedidoRepo.obtenerTodos());
    };

    obtenerPorId = (req: Request, res: Response) => {
        const id = Number(req.params.id);
        // Asumiendo que armaste un obtenerPorId() en tu PedidoRepository
        const pedido = this.pedidoRepo.obtenerPorId(id);
        if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
        res.status(200).json(pedido);
    };

        facturacion = (req: Request, res: Response) => {
        const pedidos = this.pedidoRepo.obtenerTodos();
        let total = 0;

        for (const pedido of pedidos) {
            for (const item of pedido.items) {
                const producto = this.productoRepo.obtenerPorId(Number(item.producto_id));
                if (producto) {
                    total += producto.calcularPrecio() * item.cantidad;
                }
            }
        }

        res.status(200).json({ facturacionTotal: total });
    };

    masVendido = (req: Request, res: Response) => {
        const producto = this.pedidoRepo.obtenerProductoMasVendido();
        if (!producto) return res.status(404).json({ error: 'Sin ventas' });
        res.status(200).json(producto);
    };
}