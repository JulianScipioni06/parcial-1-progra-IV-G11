
import { describe, it, expect } from 'vitest';
import { Pasteleria } from '../src/models/Pasteleria';

describe('Pasteleria', () => {
    it('calcula el precio de un muffin de chocolate', () => {
        const muffin = new Pasteleria(
        1,
        'Muffin de chocolate',
        2500
        );

        expect(muffin.calcularPrecio()).toBe(2500);
    });

    it('calcula el precio de una torta selva negra', () => {
        const torta = new Pasteleria(
        2,
        'Torta selva negra',
        4200
        );

        expect(torta.calcularPrecio()).toBe(4200);
    });
});
