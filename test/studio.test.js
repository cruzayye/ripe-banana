require('dotenv').config();

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
      .then(res => console.log(res.body));
  };
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

  it('gets list of studios', () => {
    return Promise.all(['Universal', 'Fox', 'Disney'].map(studio => {
      createStudio(studio);
    }))
      .then(() => {
        return request(app)
          .get('/studios');
      })
      .then(res => {
        expect(res.body).toHaveLength(3);
      });
  });
});
