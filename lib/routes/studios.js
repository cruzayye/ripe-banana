const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()
  
  .post('/', (req, res) => {
    const {
      name, address
    } = req.body;
    console.log('req body', req.body);
    Studio.create({
      name, address
    }, (err, studioCreated) => {
      res.send(studioCreated);
    });
  })

  .get('/', (req, res) => {
    Studio.find((err, studios) => {
      res.send(studios);
    });
  })

  .get('/:id', (req, res) => {
    const _id = req.params.id;
    Studio
      .findById(_id)
      .then(foundStudio => {
        res.send(foundStudio);
      });

  });

