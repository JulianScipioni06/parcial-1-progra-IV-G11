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
    it('debe tener tipo expreso y recibir una variedad estructurada', () => {
        // Inventamos el objeto como queremos que sea en el futuro
        const variedadPrueba = { 
            nombre: 'Brasil', 
            descripcion: 'Acidez baja, cuerpo denso y notas de avellana',
            precioPorGramo: 140
        };
        
        // Acá TypeScript va a chillar porque Expreso espera un string
        const expreso = new Expreso(3, 'Expreso', 2500, 'Pocillo', 18, variedadPrueba as any);
        
        expect(expreso.tipo).toBe('expreso');
        expect(expreso.variedad.descripcion).toBe('Acidez baja, cuerpo denso y notas de avellana');
    });
});