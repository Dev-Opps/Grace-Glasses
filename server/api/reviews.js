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
  //we should only be able to edit a review of we're the author of this review;
  //the way to confirm that is by comparing the userId on the review with the user who is making the request;
  // let idOfUser = req.user.id;
  // let idOfReview = req.params.id;
  // if (idOfUser !== idOfReview){
  //   res.status(403).send('Forbidden');
  // }

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
