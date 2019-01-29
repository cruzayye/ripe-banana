require('dotenv').config();
require('../lib/utils/connect')();
const request = require('supertest');
const Studio = require('../lib/models/Actor');
const mongoose = require('mongoose');
const app = require('../lib/app');

describe('Actors', () => {
  const createActor = (name, dob, pob) => {
    return request(app)
      .post('/studios')
      .send({
        name: name,
        dob: dob,
        pob:pob
      })
      .then(res => res.body);
  };

  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });
  it.only('validates a good model', () => {
    const Actor = new Studio({
      name: 'John Wick'
    });
    expect(Actor.toJSON()).toEqual({
      name: 'John Wick',
      _id: expect.any(mongoose.Types.ObjectId) 
    });
  });

  it('creates a new studio', () => {
    return request(app)
      .post('/studios')
      .send({
        name: 'Universal',
        address: {
          city: 'Los Angeles',
          state: 'CA',
          county: 'LA County'
        } 
      })
      .then(res => {
        console.log(res.body);
        expect(res.body).toEqual({
          name: 'Universal',
          address: {
            city: 'Los Angeles',
            state: 'CA',
            county: 'LA County'
          }, _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets list of studios', () => {
    return Promise.all(['Universal', 'Fox', 'Disney'].map(studio => {
      return createStudio(studio);
    }))
      .then(() => {
        return request(app)
          .get('/studios');
      })
      .then(res => {
        expect(res.body).toHaveLength(3);
      });
  });
  it('gets studio by id', () => {
    return createStudio('New Studio')
      .then(createStudio => {
        return Promise.all([
          Promise.resolve(createStudio.id),
          request(app)
            .get(`/studios/${createStudio._id}`)
        ])
          .then(([_id, res]) => {
            expect(res.body).toEqual({
              name: 'New Studio',
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });
  it('finds by Id and patches', ()=> {
    return createStudio('univershal')
      .then(mispelledStudio => {
        return Promise.all([
          Promise.resolve(createStudio.id),
          request(app)
            .patch(`/studios/${mispelledStudio._id}`)
            .send({ name: 'Universal' })
        ])
          .then(([_id, res])=> {
            expect(res.body).toEqual({
              name: 'Universal',
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });

  it('finds by ID and deletes', ()=> {
    return createStudio('Disney Studio')
      .then(studio2Delete => {
        return request(app)
          .delete(`/studios/${studio2Delete._id}`)
          .send({ deleted: 1 });
      })
      .then(res => {
        expect(res.body).toEqual({ deleted: 1 });
      });
  });
});
