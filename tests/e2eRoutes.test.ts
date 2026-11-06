import { describe, it, expect, afterEach } from 'vitest';
import request from 'supertest';
import { makeApp } from '../src/app'; 

const app = makeApp(); 

describe('Rutas Especiales para Testing (E2E)', () => {
  const originalEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  it('Debe arrojar error si se intenta usar POST /__test__/reset fuera del entorno test', async () => {
    process.env.NODE_ENV = 'development';
    
    const response = await request(app).post('/__test__/reset');
    
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error'); 
    expect(typeof response.body.error).toBe('string');
  });

  it('Debe devolver un código exitoso en POST /__test__/reset si NODE_ENV=test', async () => {
    process.env.NODE_ENV = 'test';
    
    const response = await request(app).post('/__test__/reset');
    
    expect(response.status).toBe(200);
  });

  it('Debe devolver un código exitoso en POST /__test__/seed si NODE_ENV=test', async () => {
    process.env.NODE_ENV = 'test';
    
    const response = await request(app).post('/__test__/seed');
    
    expect(response.status).toBe(200);
  });
});