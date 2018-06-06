const router = require('express').Router();
const { Glasses } = require('../db/models');

router.get('/', (req, res, next) => {
  Glasses.findAll()
  .then(glasses => res.json(glasses))
  .catch(next);
});

router.get('/:category', (req, res, next) => {
  Glasses.findAll({
    where: {
      category: req.params.category
    }
  })
  .then(glasses => res.json(glasses))
  .catch(next);
});

module.exports = router;
