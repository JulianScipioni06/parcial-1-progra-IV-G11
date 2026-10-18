import { describe, it, expect } from 'vitest';
import { Filtrado } from '../src/models/Filtrado';

describe('Filtrado', () => {
    it('calcula el precio de un filtrado mediano de Colombia', () => {
        const filtrado = new Filtrado(8, 'Filtrado', 3200, 'Mediano', 15, 'Colombia');
        expect(filtrado.calcularPrecio()).toBe(5900);
    });

    it('calcula el precio de un filtrado taza grande de Etiopía', () => {
        const filtrado = new Filtrado(9, 'Filtrado', 3200, 'Taza grande', 25, 'Etiopía');
        expect(filtrado.calcularPrecio()).toBe(9200);
    });
});