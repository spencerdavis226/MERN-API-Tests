const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server'); // Runs a temporary in-memory database in lieu of a real MongoDB
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../server');
const User = require('../models/User');

let mongoServer;

// Before all tests, start the in-memory MongoDB and connect it to mongoose
before(async function() {
  this.timeout(10000); // Increase timeout for starting MongoMemoryServer
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

// After all tests, disconnect Mongoose and stop the in-memory MongoDB
after(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

// Clear the database before each test
beforeEach(async () => {
  await User.deleteMany({});
});

describe('User API', () => {
  // Test creating a new user
  it('should create a new user on POST /users', async () => {
    const res = await request(app).post('/users').send({ name: 'Jim' });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('_id');
    expect(res.body.name).to.equal('Jim');
  });

  // Test retrieving all users
  it('should retrieve all user on GET /users', async () => {
    // Add new user directly to DB for testing
    await new User({ name: 'Randy' }).save();

    const res = await request(app).get('/users');
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(1);
    expect(res.body[0].name).to.equal('Randy');
  });
});
