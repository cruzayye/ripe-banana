require('dotenv').config();
require('../lib/utils/connect')();
const mongoose = require('mongoose');
const Reviewer = require('../lib/models/Reviewer');
const app = require('../lib/app');
const request = require('supertest');

describe('Reviewer tests', () => {
  const createReviewer = ((name, company) => {
    return request(app)
      .post('/reviewers')
      .send({
        name,
        company
      })
      .then(res => res.body);
  });
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  }); 

  it('validates a good model', () => {
    const studio = new Reviewer({
      name: 'earl',
      company: 'criticsRus'
    });
    expect(studio.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'earl',
      company: 'criticsRus'
    });
  });

  it('posts a reviewer', () => {
    return createReviewer('Fred')
      .then((reviewer) => {
        return request(app)
          .post('/reviewers')
          .send({
            name: 'Fred',
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Fred',
          _id: expect.any(String),
          __v: 0
        });
      }); 

  });

  it('gets a list of reviewers', () => {
    return Promise.all(['one', 'tow', 'three'].map(review => {
      return createReviewer(review);
    }))
      .then(() => {
        return request(app)
          .get('/reviewers');
      })
      .then(res => {
        expect(res.body).toHaveLength(3);
      });
  });

  it('gets reviewer by ID', () => {
    return createReviewer('this guy')
      .then(createdCritic => {
        return request(app)
          .get(`/reviewers/${createdCritic._id}`)
          .then(res => {
            expect(res.body).toEqual({
              name: 'this guy',
              _id: expect.any(String),
              __v:0
            });
          });
      });
  });

  it('finds by id and patches', () => {
    return createReviewer('updateme')
      .then(mispelled => {
        return Promise.all([
          Promise.resolve(mispelled._id),
          request(app)
            .patch(`/reviewers/${mispelled._id}`)
            .send({ name: 'new name' })
        ]);
      })
      .then(([_id]) => {
        return request(app)
          .get(`/reviewers/${_id}`)
          .then((res => {
            expect(res.body.name).toEqual('new name');
          }));
      });

  });

  it('deletes a tweet by id', () => {
    return createReviewer('james')
      .then(deleteme => {
        return request(app)
          .delete(`/reviewers/${deleteme._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ deleted: 1 });
      });
  });

});
