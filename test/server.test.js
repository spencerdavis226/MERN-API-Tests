const request = require('supertest'); // Simulates HTTP requests
const chai = require('chai'); // Used for assertions (checking response status and JSON return matches)
const expect = chai.expect;
const app = require('../server');

describe('GET /', () => {
  it('should return a JSON message confirming the API is working', async () => {
    const res = await request(app).get('/');
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({ message: 'API is working' });
  });
});
