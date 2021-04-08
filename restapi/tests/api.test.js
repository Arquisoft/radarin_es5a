const request = require('supertest');
const server = require('./server-for-tests')

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await server.startdb()
    app = await server.startserver()
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
    await server.closeServer() //finish the server
    await server.closeDB()
})

/**
 * Product test suite.
 */
describe('Anadir Nuevo Usuario ', () => {
    /**
     * Tests that a user can be created through the productService without throwing any errors.
     */
    it('enviar datos a Api', async () => {
        nombre = 'German'
        ubicacion = 'Oviedo'
        const response = await request(app).post('/test/update').send({name: nombre,ubicacion: ubicacion}).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
    });
});