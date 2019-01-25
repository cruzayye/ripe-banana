const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()
  .get('/', (req, res) => {
    Studio.find((err, studios) => {
      res.sendStatus(studios);
    });
  });

