import { Request, Response } from 'express';

export class PedidoController {
    constructor(private readonly pedidoRepo: any) {}

    crear = (req: Request, res: Response) => {
    const { items } = req.body;
    if (!items || !items.length) return res.status(400).json({ error: 'Faltan items' });
    
    try {
        const nuevo = this.pedidoRepo.crear(items);
        res.status(201).json(nuevo);
    } catch (error) {
        if (error instanceof Error){
            return res.status(400).json({ error: error.message });
        }
        return res.status(400).json({ error: 'Error desconocido' });
    }
};

    listar = (req: Request, res: Response) => {
    res.status(200).json(this.pedidoRepo.findAll());
};

    obtenerPorId = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const pedido = this.pedidoRepo.findById(id);
    if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.status(200).json(pedido);
};

    facturacion = (req: Request, res: Response) => {
    res.status(200).json({ facturacionTotal: this.pedidoRepo.calcularFacturacionTotal() });
};

    masVendido = (req: Request, res: Response) => {
    const producto = this.pedidoRepo.obtenerProductoMasVendido();
    if (!producto) return res.status(404).json({ error: 'Sin ventas' });
    res.status(200).json(producto);
    };
}