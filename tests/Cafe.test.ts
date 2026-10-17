
import { describe, it, expect } from 'vitest';
import { Cafe } from '../src/models/Cafe';

describe('Cafe', () => {
    it('calcula el precio de un expreso pocillo de Brasil', () => {
        const cafe = new Cafe(
        '3',
        'Expreso',
        2500,
        'Pocillo',
        18,
        'Brasil'
        );

        expect(cafe.calcularPrecio()).toBe(5020);
    });

    it('calcula el precio de un expreso pocillo de Colombia', () => {
        const cafe = new Cafe(
        '4',
        'Expreso',
        2500,
        'Pocillo',
        18,
        'Colombia'
        );

        expect(cafe.calcularPrecio()).toBe(5740);
    });

    it('calcula el precio de un expreso pocillo de Etiopía', () => {
        const cafe = new Cafe(
        '5',
        'Expreso',
        2500,
        'Pocillo',
        18,
        'Etiopía'
        );

        expect(cafe.calcularPrecio()).toBe(6820);
    });

    it('calcula el precio de un filtrado mediano de Colombia', () => {
        const cafe = new Cafe(
        '8',
        'Filtrado',
        3200,
        'Mediano',
        15,
        'Colombia'
        );

        expect(cafe.calcularPrecio()).toBe(5900);
    });

    it('calcula el precio de un filtrado taza grande de Etiopía', () => {
        const cafe = new Cafe(
        '9',
        'Filtrado',
        3200,
        'Taza grande',
        25,
        'Etiopía'
        );

        expect(cafe.calcularPrecio()).toBe(9200);
    });
});
