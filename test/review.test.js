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
  
  const createFilm = ((title, studio, released) => {
    return Film.create({ title, studio, released })
      .then(film => ({ ...film, _id: film._id.toString() }));
  });


  const CreateReview = ((review, rating, reviewer, film, createdAt, updatedAt) => {
    const ReviewerOjb = createReviewer('johnny', 'productions');
    const filmObj = createFilm('Titanic', 'Universal', '10-12-1996');
    return Promise.all([ Promise.resolve(ReviewerOjb, filmObj)])
    // return Promise.all([createReviewer('johnny', 'jcProductions'), createFilm('Titanic', 'universal', '10-10-1996')])
      
  });
  // const CreateReview = (( review, rating, reviewer, film, createdAt, updatedAt) => {
  //   return createReviewer('johnny', 'jcProductions')
  //     .then(() => {
  //       return createFilm( 'Titanic', 'Universal', '10-12-1996', )
  //     })

  // })
  return createActor('Brad Pitt')
  .then(createdActor => {
    return Promise.all([
      Promise.resolve(createdActor.id),
      request(app)
        .get(`/actors/${createdActor._id}`)
    ])
   
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  }); 

});
