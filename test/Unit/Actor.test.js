require('dotenv').config();
require('../../lib/utils/connect')();

const Actor = require('../../lib/models/Actor');
const mongoose = require('mongoose');

describe('Actor Model test', () => {

  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  it('validates a good model', () => {
    const actor = new Actor({
      name: 'John Wick'
    });
    expect(actor.toJSON()).toEqual({
      name: 'John Wick',
      _id: expect.any(mongoose.Types.ObjectId) 
    });
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  }); 
});
