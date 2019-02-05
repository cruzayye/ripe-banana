require('dotenv').config();
require('../../lib/utils/connect')();

const Film = require('../../lib/models/Film');
const Studio = require('../../lib/models/Studio');
const Actor = require('../../lib/models/Actor');
const mongoose = require('mongoose');

describe('Film Model Test', () => {

  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
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

    const actor = new Actor({
      name: 'Keanu Reeves',
      dob: '1970-01-01',
      pob: 'Beverly Hills'
    });

    const film = new Film({
      title: 'The Matrix',
      studio: studio._id,
      released: 1994,
      cast: [{
        role: 'Neo',
        actor: actor._id,
      }]
    });
    expect(film.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      title: 'The Matrix',
      studio: expect.any(mongoose.Types.ObjectId),
      released: 1994,
      cast: [{
        _id: expect.any(mongoose.Types.ObjectId),
        role: 'Neo',
        actor: expect.any(mongoose.Types.ObjectId)
      }]
    });
  }); 

  afterAll((done) => {
    mongoose.disconnect(done);
  }); 
});

