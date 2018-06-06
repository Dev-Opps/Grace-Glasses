const router = require('express').Router();
const { Glasses } = require('../db/models');

router.get('/', (req, res, next) => {
  Glasses.findAll()
  .then(glasses => res.json(glasses))
  .catch(next);
});

router.param('id', (req, res, next, id) => {
  Glasses.findById(id)
  .then(glass => {
    console.log(glass);
    if (!glass){
      next(new Error('product is not found'));
    }
    else {
      req.glass = glass
      next();
    }
  })
  .catch(next);
})

router.get('/:id', (req, res, next) => {
  res.json(req.glass);
})

module.exports = router;
