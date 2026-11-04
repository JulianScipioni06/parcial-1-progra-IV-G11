import { describe, it, expect } from 'vitest';
import { Filtrado } from '../src/models/Filtrado';

describe('Filtrado', () => {
    it('calcula el precio de un filtrado mediano de Colombia', () => {
        const variedadColombia = { nombre: 'Colombia', descripcion: 'Acidez media', precioPorGramo: 180};
        const filtrado = new Filtrado(8, 'Filtrado', 3200, 'Mediano', 15, variedadColombia);
        expect(filtrado.calcularPrecio()).toBe(5900);
    });

    it('calcula el precio de un filtrado taza grande de Etiopía', () => {
        const variedadEtiopia = { nombre: 'Etiopía', descripcion: 'Acidez muy viva', precioPorGramo: 240};
        const filtrado = new Filtrado(9, 'Filtrado', 3200, 'Taza grande', 25, variedadEtiopia);
        expect(filtrado.calcularPrecio()).toBe(9200);
    });

    it('debe tener tipo filtrado y recibir una variedad estructurada', () => {
        const variedadPrueba = { 
            nombre: 'Colombia', 
            descripcion: 'Acidez media, notas cítricas y florales',
            precioPorGramo: 180
        };
        
        const filtrado = new Filtrado(10, 'Filtrado', 3200, 'Mediano', 15, variedadPrueba as any);
        
        expect(filtrado.tipo).toBe('filtrado');
        expect(filtrado.variedad.descripcion).toBe('Acidez media, notas cítricas y florales');
    });
});