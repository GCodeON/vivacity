import request from 'supertest';
import app from '../src/app';


describe('API Tests', () => {
    let createdUserId: string;

    test('GET / returns default awesome applicant data', async () => {
        const response = await request(app).get('/awesome/applicant');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('email','gcodeondev@gmail.com'
        );
    });

    test('POST /users creates a new user', async () => {
        const newUser = { 
            name: 'example', 
            email: 'test@example.com', 
            age: '99', 
            education: 'Higher Learning Institution',
            location: 'Planet Earth',
            description: 'Test User Description'
        };

        const response = await request(app)
            .post('/users')
            .send(newUser);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(newUser);

        createdUserId = response.body.id;
    });

    test('GET /users returns a list of users', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('GET /users/:id returns a specific user', async () => {

        expect(createdUserId).toBeDefined();

        const response = await request(app).get(`/users/${createdUserId}`);
        expect(response.status).toBe(200);
    });

    test('PUT /users/:id updates a specific user', async () => {

        expect(createdUserId).toBeDefined();

        const updatedUserData = { name: 'updated user name', description: 'user updated description' };

        const response = await request(app)
            .put(`/users/${createdUserId}`)
            .send(updatedUserData);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(updatedUserData);
    });

    test('DELETE /users/:id deletes a specific user', async () => {

        expect(createdUserId).toBeDefined();

        const response = await request(app).delete(`/users/${createdUserId}`);
        expect(response.status).toBe(200);
    });

});