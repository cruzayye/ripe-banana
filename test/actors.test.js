require('dotenv').config();
require('../lib/utils/connect')();
const request = require('supertest');
const Actor = require('../lib/models/Actor');
const mongoose = require('mongoose');
const app = require('../lib/app');

describe('Actors', () => {
  const createActor = (name, dob, pob) => {
    return request(app)
      .post('/actors')
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
  it('validates a good model', () => {
    const Actor = new Studio({
      name: 'John Wick'
    });
    expect(Actor.toJSON()).toEqual({
      name: 'John Wick',
      _id: expect.any(mongoose.Types.ObjectId) 
    });
  });

  it('Creates a new Actor', () => {
    return createActor('John Wick')
      .then(createdUser => {
        return request(app)
          .post('/actors')
          .send(createdUser);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'John Wick',
          _id: expect.any(String),
          __v: 0

        });
      });
  });

  it('gets list of actors', () => {
    return Promise.all(['john Wick', 'Keanu Reeves', 'Denzel'].map(createActor))
      .then(createdTweets => {
        return request(app)
          .get('/actors/');
      })
      .then(res=> {
        expect(res.body).toHaveLength(3);
      });

  });
  it.only('gets Actor by id', () => {
    return createActor('Brad Pitt')
      .then(createdActor => {
        return Promise.all([
          Promise.resolve(createdActor.id),
          request(app)
            .get(`/actors/${createdActor._id}`)
        ])
          .then(([_id, res]) => {
            expect(res.body).toEqual({
              name: 'Brad Pitt',
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
