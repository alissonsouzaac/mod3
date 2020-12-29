import request from 'supertest';
import app from '../../modulo11/server/src/app';


describe('User', () => {
    it('should be able to register', () => {
        const responde = await request(app)
            .post('/users')
            .send({ 
                name: 'Alisson Costa',
                email: 'alisson@hotmail.com',
                password_hash: '123456',
            });

        expect(response.body).toHaveProperty('id');    
    });
});