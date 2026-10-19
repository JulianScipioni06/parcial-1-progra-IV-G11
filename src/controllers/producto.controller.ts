import { Request, Response } from 'express';
import { ProductoRepository } from '../repositories/ProductoRepository';

export class ProductoController {
    constructor(private readonly productoRepo: ProductoRepository) {}

    listar = (req: Request, res: Response) => {
        res.status(200).json(this.productoRepo.obtenerTodos());
    };

    obtenerPorId = (req: Request, res: Response) => {
        const id = Number(req.params.id); 
        const producto = this.productoRepo.obtenerPorId(id);
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
        res.status(200).json(producto);
    };
}