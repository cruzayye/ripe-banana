require('dotenv').config();
require('../../lib/utils/connect')();

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../lib/app');

describe('Actor routes tests', () => {

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
  
  it('creates a new actor', () => {
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
    return Promise.all(['John Wick', 'Keanu Reeves', 'Denzel'].map(actor => {
      return createActor(actor);
    }))
      .then(() => {
        return request(app)
          .get('/actors/');
      })
      .then(res=> {
        expect(res.body).toHaveLength(3);
      });

  });
  it('gets an actor by id', () => {
    return createActor('Brad Pitt')
      .then(createdActor => {
        return Promise.all([
          Promise.resolve(createdActor.id),
          request(app)
            .get(`/actors/${createdActor._id}`)
        ])
        /* eslint-disable-next-line*/
          .then(([_id, res]) => {
            expect(res.body).toEqual({
              name: 'Brad Pitt',
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });
  it('gets an actor by id and patches it', ()=> {
    return createActor('Angelina Holy')
      .then(wrongName => {
        return Promise.all([
          Promise.resolve(wrongName.id),
          request(app)
            .patch(`/actors/${wrongName._id}`)
            .send({ name: 'Angelina Jolie' })
        ])
        /* eslint-disable-next-line*/
          .then(([_id, res])=> {
            expect(res.body).toEqual({
              name: 'Angelina Jolie',
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });

  it('get and actor by id and deletes it', ()=> {
    return createActor('Tony Montana')
      .then(deleteActor => {
        return request(app)
          .delete(`/actors/${deleteActor._id}`)
          .send({ deleted: 1 });
      })
      .then(res => {
        expect(res.body).toEqual({ deleted: 1 });
      });
  });
});
