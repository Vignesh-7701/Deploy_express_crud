const request = require('supertest');
const app = require('../app');
const db = require('../db');

// This tells Jest to intercept any calls to our db.js file
jest.mock('../db', () => ({
    query: jest.fn()
}));

describe('Express CRUD Application Tests', () => {
    
    it('GET / should return 200 and render HTML with user data', async () => {
        // We fake the database returning one user
        db.query.mockResolvedValue([[{ id: 1, name: 'Vignesh', email: 'vignesh@test.com' }]]);
        
        const res = await request(app).get('/');
        
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Vignesh'); // Checks if the fake name is in the HTML
    });

    it('POST /add should save user and redirect to home', async () => {
        // We fake a successful insert
        db.query.mockResolvedValue([{}]); 
        
        const res = await request(app)
            .post('/add')
            .type('form')
            .send({ name: 'New User', email: 'new@test.com' });
            
        expect(res.statusCode).toEqual(302); // 302 is the HTTP code for a redirect
        expect(res.header.location).toBe('/');
    });
});