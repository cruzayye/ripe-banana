const { Router } = require('express');
const Actor = require('../models/Actor');

module.exports = Router()
  
  .post('/', (req, res) => {
    const {
      name, dob, pob
    } = req.body;
    console.log('req body', req.body);
    Actor.create({
      name, dob, pob
    }, (err, createdActor) => {
      res.send(createdActor);
    });
  })

  .get('/', (req, res) => {
    Actor.find((err, actors) => {
      res.send(actors);
    });
  })

  .get('/:id', (req, res) => {
    const _id = req.params.id;
    Actor
      .findById(_id)
      .then(foundActor => {
        res.send(foundActor);
      });

  })

  .patch('/:id', (req, res) => {
    const _id = req.params.id;
    Actor
      .findByIdAndUpdate(_id, req.body, { new: true })
      .then(fixActorName => {
        res.send(fixActorName);
      });
  })

  .delete('/:id', (req, res) => {
    const _id = req.params.id;
    Actor
      .findByIdAndDelete(_id)
      .then(() => {
        res.send({ deleted: 1 });
      });
  });

