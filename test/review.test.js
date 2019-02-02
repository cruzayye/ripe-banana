require('dotenv').config();
require('../lib/utils/connect')();
const mongoose = require('mongoose');
const Review = require('../lib/models/Review');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
const app = require('../lib/app');
const request = require('supertest');


describe('Review tests', () => {
  const createReviewer = ((name, company) => {
    return Reviewer.create({ name, company })
      .then(reviewer => ({ ...reviewer, _id: reviewer._id.toString() })); 
  });
  
  const createFilm = ((title, studio, released, cast) => {
    return Film.create({ title, studio, released, cast })
      .then(film => ({ ...film, _id: film._id.toString() }));
  });

  const CreateReview = (( review, rating, reviewer, film, createdAt, updatedAt) => {
    return
  
  })
   
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  }); 

});
