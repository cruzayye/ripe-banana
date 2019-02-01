require('dotenv').config();
require('../../lib/utils/connect')();

const request = require('supertest');
// const Studio = require('../../lib/models/Studio');
const mongoose = require('mongoose');
const app = require('../../lib/app');

describe('studios tests', () => {

  const createStudio = (name, address) => {
    return request(app)
      .post('/studios')
      .send({
        name: name,
        address: address
      })
      .then(res => res.body);
  };

  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  }); 
  
  it('creates a new studio', () => {
    return request(app)
      .post('/studios')
      .send({
        name: 'Universal',
        address: {
          city: 'Los Angeles',
          state: 'CA',
          country: 'USA'
        } 
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Universal',
          address: {
            city: 'Los Angeles',
            state: 'CA',
            country: 'USA'
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
        // eslint-disable-next-line no-unused-vars
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
        // eslint-disable-next-line no-unused-vars
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
