import { Producto } from './Producto';
import { VariedadCafe, TamanioCafe } from './Expreso';

export class Filtrado extends Producto {
    constructor(
        id: string, 
        nombre: string, 
        precioBase: number, 
        public tamanio: TamanioCafe, 
        public gramos: number, 
        public variedad: VariedadCafe
    ) {
        super(id, nombre, precioBase);
    }

    calcularPrecio(): number {
        const preciosPorGramo: Record<VariedadCafe, number> = {
            Brasil: 140,
            Colombia: 180,
            'Etiopía': 240
        };
        // Agregamos el "!" al final de los corchetes
        return this.precioBase + (this.gramos * preciosPorGramo[this.variedad]!);
    }
}