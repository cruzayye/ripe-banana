const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()
  .get('/', (req, res) => {
    Studio.find((err, studios) => {
      res.send(studios);
    });
  })
  .post('/', (req, res) => {
    const {
      name, address
    } = req.body;
    Studio.create({
      name, address
    }, (err, studioCreated) => {
      res.send(studioCreated);
    });
  });

