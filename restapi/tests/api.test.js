const request = require('supertest');
const app = require('./server-for-tests')
const api = require('./../api') 

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
    await database.off() //finish the DB
})

/**
 * Product test suite.
 */
describe('anadirUsuario ', () => {
    /**
     * Test that we can list users without any error.
     */
    it('can be listed',async () => {
        const response = await request(app).get("/api/users/list");
        expect(response.statusCode).toBe(200);
    });

    /**
     * Tests that a user can be created through the productService without throwing any errors.
     */
    it('can be created correctly', async () => {
        username = 'Pablo'
        email = 'pablo@uniovi.es'
        const response = await request(app).post('/api/users/add').send({name: username,email: email}).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(username);
        expect(response.body.email).toBe(email);
    });
});