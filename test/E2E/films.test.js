require('dotenv').config();
require('../../lib/utils/connect')();

const request = require('supertest');
const Studio = require('../../lib/models/Studio');
const Actor = require('../../lib/models/Actor');
const mongoose = require('mongoose');
const app = require('../../lib/app');

describe('Film routes tests', () => {

  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  it('creates a film', () => {
    return Studio.create({
      name: 'Universal',
      address: {
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA' } })
      .then(studio => {
        console.log('Studio: ', studio);
        return Actor.create({
          name: 'Keanu Reeves',
          dob: '1970-01-01',
          pob: 'Beverly Hills'
        })
          .then(actor => {
            console.log('Actor: ', actor);
            return request(app)
              .post('/films')
              .send({
                title: 'The Matrix',
                studio: studio._id,
                released: 1994,
                cast: [{
                  role: 'Neo',
                  actor: actor._id,
                }]
              })
              .then(res => {
                console.log('Res body: ', res.body);
                expect(res.body).toEqual({ __v: 0,
                  _id: expect.any(String),
                  title: 'The Matrix',
                  studio: expect.any(String),
                  released: 1994,
                  cast: [{
                    _id: expect.any(String),
                    role: 'Neo',
                    actor: expect.any(String)
                  }]
                });
              });
          });

      });
  });
});
