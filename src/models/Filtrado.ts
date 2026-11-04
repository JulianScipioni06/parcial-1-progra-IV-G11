import { Producto } from './Producto';
import { TamanioCafe } from './Expreso';

export class Filtrado extends Producto {
    public tipo = 'filtrado'

    constructor(
        id: number, 
        nombre: string, 
        precioBase: number, 
        public tamanio: TamanioCafe, 
        public gramos: number, 
        public variedad: any
    ) {
        super(id, nombre, precioBase);
    }

    calcularPrecio(): number {
        return this.precioBase + (this.gramos * this.variedad.precioPorGramo);
    }
}