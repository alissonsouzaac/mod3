import request from 'supertest';
import app from '../../modulo11/server/src/app';


import truncate from '../Util/truncate';


describe('User', () => {
    beforeEach(() => {
        await truncate();
    });

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

    it('should not able to register with duplicated email', async () => {
        await request(app)
            .post('/users')
            .send({
                name: 'Alisson Costa',
                email: 'alisson@hotmail.com',
                password_hash: '123456',
            });
        
        const response = await request(app)
            .post('/users')
            .send({
                name: 'Alisson Costa',
                email: 'alisson@hotmail.com',
                password_hash: '123456',
            });
            
        expect(response.status).toBe(400);    
    });
});