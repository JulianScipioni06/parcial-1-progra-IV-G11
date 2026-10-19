import { describe, it, expect, beforeEach } from 'vitest';
import { PedidoItem } from '../src/models/PedidoItem'; 
import { Filtrado } from '../src/models/Filtrado';
import { Pasteleria } from '../src/models/Pasteleria';

describe('PedidoItem', () => {
    let filtrado: Filtrado;
    let pasteleria: Pasteleria;

    beforeEach(() => {
        filtrado = new Filtrado(9, 'Filtrado', 3200, 'Taza grande', 25, 'Etiopía'); 
        pasteleria = new Pasteleria(2, 'Torta selva negra', 4200);
    });

    it('debería crear un PedidoItem correctamente con datos válidos', () => {
        const item = new PedidoItem(filtrado, 2); 
        expect(item.productoId).toBe(9); 
        expect(item.cantidad).toBe(2); 
        expect(item.producto).toBe(filtrado); 
    });

    it('debería lanzar un error si el producto no es válido', () => {
        expect(() => new PedidoItem(null as any, 2)).toThrow('Producto inválido o cantidad no válida'); 
    });

    it('debería calcular el subtotal correctamente según los datos de la tabla', () => {
        const itemCafe = new PedidoItem(filtrado, 2); 
        expect(itemCafe.calcularSubtotal()).toBe(18400); 

        const itemPasteleria = new PedidoItem(pasteleria, 3); 
        expect(itemPasteleria.calcularSubtotal()).toBe(12600); 
    });

    it('debería sumar cantidad adicional correctamente', () => {
        const item = new PedidoItem(filtrado, 2); 
        item.sumarCantidad(3); 
        expect(item.cantidad).toBe(5); 
    });
});