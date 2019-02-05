require('dotenv').config();
require('../../lib/utils/connect')();

const Studio = require('../../lib/models/Studio');
const mongoose = require('mongoose');

describe('Studio Model test', () => {

  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  }); 
  
  it('validates a good model', () => {
    const studio = new Studio({
      name: 'Universal',
      address: {
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA'
      }
    });
    expect(studio.toJSON()).toEqual({
      
      name: 'Universal',
      address: {
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA'
      },
      _id: expect.any(mongoose.Types.ObjectId)
     
    });
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  }); 
});
