import { Producto } from './Producto';

export type VariedadCafe = 'Brasil' | 'Colombia' | 'Etiopía';
export type TamanioCafe = 'Pocillo' | 'Mediano' | 'Taza grande';

export class Expreso extends Producto {
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
        const preciosPorGramo: Record<VariedadCafe, number> = {
            Brasil: 140,
            Colombia: 180,
            'Etiopía': 240
        };
        
        return this.precioBase + (this.gramos * preciosPorGramo[this.variedad]!);
    }
}