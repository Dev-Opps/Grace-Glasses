const router = require('express').Router();
const { Review } = require('../db/models');

router.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Review.findById(req.params.id)
    .then(reviews => res.json(reviews))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(review => {
      //important
      review.setUser(req.user)
      res.json(review)
    })
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  let idOfUser = req.user.id;

  Review.findById(req.params.id)
    .then(foundReview => {
      if (foundReview.userId === idOfUser){
        foundReview.update(req.body)
          .then(updatedReview => res.status(201).json(updatedReview));
      } else {
        res.status(403).send('Forbidden');
      }
    })
    .catch(next)
});

router.delete('/:id', (req, res, next) => {
  let idOfUser = req.user.id;

  Review.findById(req.params.id)
    .then(foundReview => {
      if (foundReview.userId === idOfUser){
        foundReview.destroy(req.body)
          .then(destroyedReview => res.status(201).json(destroyedReview));
      } else {
        res.status(403).send('Forbidden');
      }
    })
    .catch(next)
});

module.exports = router;
