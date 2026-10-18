import {Producto} from "./Producto";

export class PedidoItem{
    public productoId: number;
    public cantidad: number;
    public producto: Producto;

    constructor(producto: Producto, cantidad: number){
    if(!producto || !Number.isInteger(cantidad) || cantidad <= 0){
        throw new Error("Producto inválido o cantidad no válida");
    }
        this.productoId = producto.id;
        this.cantidad = cantidad;
        this.producto = producto;
    }

    public calcularSubtotal(): number{
        return this.producto.calcularPrecio() * this.cantidad;
    }

    public sumarCantidad(cantidadAdicional: number): void{
        if(!Number.isInteger(cantidadAdicional) || cantidadAdicional <= 0){
            throw new Error("Cantidad adicional no válida");
        }
        this.cantidad += cantidadAdicional;
    }
}

