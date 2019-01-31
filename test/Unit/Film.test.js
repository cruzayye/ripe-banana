require('dotenv').config();
require('../../lib/utils/connect');

const Film = require('../../lib/models/Film');
const mongoose = require('mongoose');

describe('Film Model Test', () => {

  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  it('validates a good model', () => {
    const film = new Film({
      title: 'The Matrix',
      studio: mongoose.Types.ObjectId(),
      released: 1994,
      cast: [{
        role: 'Neo',
        actor: mongoose.Types.ObjectId()
      }]
    });
    expect(film.toJSON).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      title: 'The Matrix',
      studio: mongoose.Types.ObjectId(),
      released: 1994,
      cast: [{
        role: 'Neo',
        actor: mongoose.Types.ObjectId()
      }]
    });
  }); 
});

