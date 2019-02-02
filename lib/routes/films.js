const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { title, studio, released, cast } = req.body;
    Film
      .create({
        title, studio, released, cast
      })
      .then(film => {
        console.log('film: ', film);
        res.send(film);
      })
      .catch(next);
  });

