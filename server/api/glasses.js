const router = require('express').Router();
const { Glasses } = require('../db/models');

router.get('/', (req, res, next) => {
  Glasses.findAll()
    .then(glasses => res.json(glasses))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Glasses.create(req.body)
    .then(glasses => {
      console.log(glasses);
      res.json(glasses);
    })
    .catch(next);
});

router.put('/cart-info', (req, res, next) => {
  Glasses.updateCartInfo(req.body)
  .then(items => res.json(items))
  .catch(next)
  //we should receive an array of ids, etc
  // call class method to find all glasses that match to ids
  // in given array and return array back
});

// this will work for all routes, which contain id "param", like '/api/glasses/:id'
router.param('id', (req, res, next, id) => {
  Glasses.findById(id)
    .then(glass => {
      if (!glass) {
        next(new Error('Product is not found'));
      } else {
        // we attach product if it's found to the request, so it will be available for the other routes
        req.glass = glass;
        next();
      }
    })
    .catch(next);
});

router
  .route('/:id')
  .get((req, res, next) => {
    res.json(req.glass);
  })
  .put((req, res, next) => {
    req.glass.update(req.body).then(updatedGlass => {
      res.status(201).json(updatedGlass);
    });
  })
  .delete((req, res, next) => {
    req.glass.destroy().then(() => {
      res.status(204).send();
    });
  });

module.exports = router;
