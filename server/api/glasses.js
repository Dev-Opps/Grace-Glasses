const router = require('express').Router();
const { Glasses, Review } = require('../db/models');

function secure(req, res) {
  console.log(req.session.user);
  const isUser = req.hasOwnProperty('user')
  const isAdmin = isUser ? req.user.dataValues.isAdmin : false;
  const allowed = isUser && isAdmin;

  if (!allowed) return res.status(403).send('FORBIDDEN')
}

router.get('/', (req, res, next) => {
  Glasses.findAll()
    .then(glasses => res.json(glasses))
    .catch(next);
});

router.post('/', (req, res, next) => {
  secure(req, res);
  Glasses.create(req.body)
    .then(glasses => {
      res.json(glasses);
    })
    .catch(next);
});

router.put('/cart-info', (req, res, next) => {
  Glasses.updateCartInfo(req.body)
  .then(items => res.json(items))
  .catch(next)
});

// this will work for all routes, which contain id "param", like '/api/glasses/:id'
router.param('id', (req, res, next, id) => {
  Glasses.findById(id, {include: [Review]})
    .then(glass => {
      if (!glass) {
        next(new Error('Product is not found'));
      } else {
        // we attach product if it's found to the request,
        // so it will be available for the other routes
        req.glasses = glass;
        next();
      }
    })
    .catch(next);
});

router
  .route('/:id')
  .get((req, res, next) => {
    res.json(req.glasses);
  })
  .put((req, res, next) => {
    secure(req, res);
    req.glasses.update(req.body).then(updatedGlasses => {
      res.status(201).json(updatedGlasses);
    });
  })
  .delete((req, res, next) => {
    secure(req, res);
    req.glasses.destroy().then(() => {
      res.status(204).send();
    });
  });

module.exports = router;
