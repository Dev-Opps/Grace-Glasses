const router = require('express').Router();
const { Review } = require('../db/models');

// /api/users/:userId/reviews
// /api/glasses/:glassesId/reviews
router.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next);
});

//CAN WE WRITE A REVIEW AS A NON LOGGED IN USER?
router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(reviews => res.json(reviews))
    .catch(next);
});

//YOU NEED TO BE LOGGED IN
//YOU NEED TO BE THE CREATOR OF THE REVIEW
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
