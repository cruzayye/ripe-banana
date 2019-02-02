const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .post('/', (req, res) => {
    const { name, company } = req.body;
    Reviewer.create({ name, company }, (err, createdReviewer) => {
      res.send(createdReviewer);
    });
  })

  .get('/', (req, res) => {
    Reviewer.find((err, reviewers) => {
      res.send(reviewers);
    }); 
  })

  .get('/:id', (req, res) => {
    const _id = req.params.id;
    Reviewer
      .findById(_id)
      .then(foundReviewer => {
        res.send(foundReviewer);
      });

  })

  .patch('/:id', (req, res) => {
    const _id = req.params.id;
    Reviewer
      .findByIdAndUpdate(_id, req.body, {
        new: true
      })
      .then(fixedName => {
        res.send(fixedName);
      });
  })

  .delete('/:id', (req, res) => {
    const _id = req.params.id;
    Reviewer
      .findByIdAndDelete(_id)
      .then(() => {
        res.send({ deleted: 1 });
      });
  });
  

