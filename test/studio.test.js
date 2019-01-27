require('dotenv').config();
require('../lib/utils/connect')();

const request = require('supertest');
const Studio = require('../lib/models/Studio');
const mongoose = require('mongoose');
const app = require('../lib/app');

describe('Studio app', () => {

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
  
  it('validates a good model', () => {
    const studio = new Studio({
      name: 'Universal',
      address: {
        city: 'Los Angeles',
        state: 'CA',
        county: 'LA County'
      }
    });
    expect(studio.toJSON()).toEqual({
      
      name: 'Universal',
      address: {
        city: 'Los Angeles',
        state: 'CA',
        county: 'LA County'
      },
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
  it.only('gets studio by id', () => {
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
});
