const router = require('express').Router();
const { User, Orders, OrdersProducts, Glasses } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
  .then(foundUser => foundUser.update(req.body))
  .then(editedUser => res.json(editedUser))
  .catch(next)
})

router.delete('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(foundUser => foundUser.destroy())
    .then(deletedUser => res.json(deletedUser))
    .catch(next)
})

router.get('/:email', (req, res, next) => {
  User.findByEmail(req.params.email)
  .then(foundUser => res.json(foundUser))
  .catch(next)
})

router.post('/:id/add-to-cart', (req, res, next) => {
  const { id, price, upc } = req.body;
  if (req.session.passport.user == req.params.id) {
    Orders.find({
      where: {
        userId: req.params.id,
        status: 'UNPAID'
      }
    })
      .then(order => {
        if (!order) {
          // want to create an order and add item
          Orders.create({
            userId: req.session.passport.user
          })
            .then(createdOrder => {
              OrdersProducts.create({
                orderId: createdOrder.id,
                glassId: id,
                productPrice: price,
                upc: upc
              })
                // do we need to send it???
                .then(orderProductsRow => {})
                .catch(err => console.log(err));
            })
            .catch(next);
        } else {
          //want to update an order with an item
          //found order with status status unpaid and userid
          OrdersProducts.findOne({
            where: {
              orderId: order.id,
              glassId: id
            }
          }).then(productInCart => {
            if (!productInCart) {
              OrdersProducts.create({
                orderId: order.id,
                glassId: id,
                productPrice: price,
                upc: upc
              })
                .then(orderProductsRow => {})
                .catch(next);
            } else {
              productInCart.increment('quantity');
            }
          });
        }
      })
      .catch(next);
    res.status(201).send('something');
  }
});

router.get('/:id/sync-cart', (req, res, next) => {
  Orders.findOne({
    where: {
      userId: req.params.id,
      status: 'UNPAID'
    },
    include: [{ model: Glasses }]
  }).then(cart => {
    if (cart) {
      let itemsInCart = cart.glasses.map(item => {
        const {
          id,
          title,
          description,
          price,
          imageUrl,
          upc,
          shape,
          category
        } = item;
        const { quantity } = item.OrdersProducts;
        return Object.assign(
          {},
          {
            id,
            title,
            description,
            price,
            imageUrl,
            upc,
            shape,
            category,
            quantity
          }
        );
      });
      res.json(itemsInCart);
    }
  });
});
