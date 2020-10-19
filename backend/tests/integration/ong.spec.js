const request = require('supertest');
const app = require('../../app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach( async()=>{
       await connection.migrate.rollback();
       await connection.migrate.latest();
    })

    afterAll(async ()=>{
        await connection.destroy();
    })

    it('Should be able to create a new ONG', async () => {

        const response = await request(app)
            .post('/ongs')
            .send({
                name: "apad",
                email: "email@gmail.com",
                whatsapp: "4600000000",
                city: "Rio de Janeiro",
                uf: "RJ"
            })
         expect(response.body).toHaveProperty('id');
         expect(response.body.id).toHaveLength(8);
    })
})