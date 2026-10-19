import {Producto} from './Producto';
import {PedidoItem} from './PedidoItem';

export type EstadoPedido = 'pendiente' | 'entregado';

export class Pedido{
    public id: number;
    public items: PedidoItem[];
    public estado: EstadoPedido;

    constructor(
        id: number = 0,
        items: PedidoItem[] = [],
        estado: EstadoPedido = 'pendiente'
    ){
        this.id = id;
        this.items = items;
        this.estado = estado;
    }

    public agregarItem(producto: Producto, cantidad: number): void{
        if (this.estado !== 'pendiente') {
            throw new Error("El pedido ya fue entregado");
        }
        if (!producto || !Number.isInteger(cantidad) || cantidad <= 0) {
            throw new Error("Producto inválido o cantidad no válida");
        }

        const itemExistente = this.items.find(
            (item) => item.productoId === producto.id
        );

        if (itemExistente) {
            itemExistente.sumarCantidad(cantidad);
        }else{
            const nuevoItem = new PedidoItem(producto, cantidad);
            this.items.push(nuevoItem);
        }
    }
    public calcularTotal(): number{
        return this.items.reduce((total, item) => total + item.calcularSubtotal(), 0);
    }

    public cambiarEstado(nuevoEstado: EstadoPedido): void{
        if (this.estado !== 'pendiente' ) {
            throw new Error("No se puede cambiar el estado de un pedido pendiente");
        }
        if (this.items.length === 0) {
            throw new Error("No se puede cambiar el estado de un pedido sin items");
        }
        this.estado = nuevoEstado;
    }
}