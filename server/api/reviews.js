const router = require('express').Router();
const { Review } = require('../db/models');

router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(reviews => res.json(reviews))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Review.findById(req.params.id)
    .then(foundReview => {
      foundReview.update(req.body);
    })
    .then(updatedReview => res.status(201).json(updatedReview));
});

router.delete('/:id', (req, res, next) => {
  Review.destroy({
    where: {
      id: req.params.id
    }
  }).then( () => {
    res.status(204).send();
  });
});

module.exports = router;
