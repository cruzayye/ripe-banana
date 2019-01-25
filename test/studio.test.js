require('dotenv').config();

const request = require('supertest');
const Studio = require('../lib/models/Studio');
const mongoose = require('mongoose');
const app = require('../lib/app');

describe('Studio app', () => {
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
});
