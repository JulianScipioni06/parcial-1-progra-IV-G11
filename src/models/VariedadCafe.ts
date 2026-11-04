export class VariedadCafe {
    constructor(
        public nombre: string,
        public descripcion: string,
        public precioPorGramo: number
    ) {}
}

export const VARIEDAD_BRASIL = new VariedadCafe('Brasil', 'Acidez baja, cuerpo denso y notas de avellana', 140);
export const VARIEDAD_COLOMBIA = new VariedadCafe('Colombia', 'Acidez media, notas cítricas y florales', 180);
export const VARIEDAD_ETIOPIA = new VariedadCafe('Etiopía', 'Acidez muy viva, notas frutales', 240);