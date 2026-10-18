import { describe, it, expect } from 'vitest';
import { Expreso } from '../src/models/Expreso';

describe('Expreso', () => {
    it('calcula el precio de un expreso pocillo de Brasil', () => {
        const expreso = new Expreso(3, 'Expreso', 2500, 'Pocillo', 18, 'Brasil');
        expect(expreso.calcularPrecio()).toBe(5020);
    });

    it('calcula el precio de un expreso pocillo de Colombia', () => {
        const expreso = new Expreso(4, 'Expreso', 2500, 'Pocillo', 18, 'Colombia');
        expect(expreso.calcularPrecio()).toBe(5740);
    });

    it('calcula el precio de un expreso pocillo de Etiopía', () => {
        const expreso = new Expreso(5, 'Expreso', 2500, 'Pocillo', 18, 'Etiopía');
        expect(expreso.calcularPrecio()).toBe(6820);
    });
});