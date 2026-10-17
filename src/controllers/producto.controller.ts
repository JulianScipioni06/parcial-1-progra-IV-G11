import { Request, Response } from 'express';

export class ProductoController {
    constructor(private readonly productoRepo: any) {}

    listar = (req: Request, res: Response) => {
    res.status(200).json(this.productoRepo.findAll());
};

    obtenerPorId = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const producto = this.productoRepo.findById(id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(200).json(producto);
    };
}