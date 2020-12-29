import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../modulo11/server/src/app';

import User from '../../modulo11/server/src/app/models/User';
import truncate from '../Util/truncate';


describe('User', () => {
    beforeEach(() => {
        await truncate();
    });

    it('should encrypt user password when new user created', async () => {
        const user = await User.create({
            name: 'Alisson Costa',
            email: 'alisson@hotmail.com',
            password: '123456',
        });

        const compareHash = await bcrypt.compare('123456', user.password_hash);

        expect(compareHash).toBe(true);
    });

    it('should be able to register', () => {
        const responde = await request(app)
            .post('/users')
            .send({ 
                name: 'Alisson Costa',
                email: 'alisson@hotmail.com',
                password: '123456',
            });

        expect(response.body).toHaveProperty('id');    
    });

    it('should not able to register with duplicated email', async () => {
        await request(app)
            .post('/users')
            .send({
                name: 'Alisson Costa',
                email: 'alisson@hotmail.com',
                password: '123456',
            });
        
        const response = await request(app)
            .post('/users')
            .send({
                name: 'Alisson Costa',
                email: 'alisson@hotmail.com',
                password: '123456',
            });
            
        expect(response.status).toBe(400);    
    });
});