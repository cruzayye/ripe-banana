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
  })

  .get('/', (req, res) => {
    Film.find((err, films) => {
      res.send(films);
    });
  })

  .get('/:id', (req, res) => {
    const _id = req.params.id;
    Film
      .findById(_id)
      .then(foundFilm => {
        res.send(foundFilm);
      });
  })

  .delete('/:id', (req, res) => {
    const _id = req.params.id;
    Film
      .findByIdAndDelete(_id)
      .then(() => {
        res.send({ deleted: 1 });
      });
  });


