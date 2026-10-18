import { describe, it, expect, beforeEach } from 'vitest';
import { Pedido } from '../src/models/Pedido'; 
import { Filtrado } from '../src/models/Filtrado';
import { Pasteleria } from '../src/models/Pasteleria';

describe('Pedido', () => {
    let pedido: Pedido;
    let filtrado: Filtrado;
    let pasteleria: Pasteleria;

    beforeEach(() => {
        pedido = new Pedido(); 
        filtrado = new Filtrado(9, 'Filtrado', 3200, 'Taza grande', 25, 'Etiopía');
        pasteleria = new Pasteleria(2, 'Torta selva negra', 4200); 
    });

    it('debería inicializar un pedido pendiente sin ítems por defecto', () => {
        expect(pedido.estado).toBe('pendiente');
        expect(pedido.items.length).toBe(0);
    });

    it('debería agregar un nuevo ítem (Café Filtrado Etiopía) correctamente', () => {
        pedido.agregarItem(filtrado, 1);
        expect(pedido.items.length).toBe(1);
        expect(pedido.items[0]!.productoId).toBe(9);
        expect(pedido.items[0]!.cantidad).toBe(1);
    });

    it('debería sumar a la cantidad si se agrega un producto que ya existe en el pedido', () => {
        pedido.agregarItem(pasteleria, 2); 
        pedido.agregarItem(pasteleria, 3); 
        
        expect(pedido.items.length).toBe(1);
        expect(pedido.items[0]!.cantidad).toBe(5);
    });

    it('debería lanzar un error si se intenta agregar un ítem y el estado no es pendiente', () => {
        pedido.agregarItem(filtrado, 1);
        pedido.cambiarEstado('entregado'); 
        
        expect(() => pedido.agregarItem(pasteleria, 1))
            .toThrow('El pedido ya fue entregado');
    });

    it('debería calcular el total correctamente basado en las últimas filas de la tabla', () => {
        pedido.agregarItem(filtrado, 1); 
        pedido.agregarItem(pasteleria, 2); 
        
        expect(pedido.calcularTotal()).toBe(17600); 
    });

    it('debería cambiar el estado correctamente a entregado', () => {
        pedido.agregarItem(filtrado, 1);
        pedido.cambiarEstado('entregado');
        expect(pedido.estado).toBe('entregado');
    });

    it('debería lanzar un error si se intenta cambiar el estado y el pedido ya no está pendiente', () => {
        pedido.agregarItem(filtrado, 1);
        pedido.estado = 'entregado'; 
        
        expect(() => pedido.cambiarEstado('pendiente'))
            .toThrow('No se puede cambiar el estado de un pedido pendiente'); 
    });
});