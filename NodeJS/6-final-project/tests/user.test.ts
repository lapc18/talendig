import request from 'supertest';
import { app } from '../src/app';
describe('[Test]: user domain', () => {
    it('confirm user router works', async () => {
        const res = await request(app).get('/api/users/');
        expect(res.body).not.toBeNull();
    })
})