import { Producto } from './Producto';
import { VariedadCafe } from './VariedadCafe';

export type TamanioCafe = 'Pocillo' | 'Mediano' | 'Taza grande';

export class Expreso extends Producto {
    public tipo = 'expreso';
    constructor(
        id: number, 
        nombre: string, 
        precioBase: number, 
        public tamanio: TamanioCafe, 
        public gramos: number, 
        public variedad: VariedadCafe
    ) {
        super(id, nombre, precioBase);
    }

    calcularPrecio(): number {
        return this.precioBase + (this.gramos * this.variedad.precioPorGramo);
    }
}