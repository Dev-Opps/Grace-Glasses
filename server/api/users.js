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
          return Orders.create({
            userId: req.session.passport.user
          })
            .then(createdOrder => {
              return (
                OrdersProducts.create({
                  orderId: createdOrder.id,
                  glassId: id,
                  productPrice: price,
                  upc: upc
                })
                  // do we need to send it???
                  .then(orderProductsRow => {
                    res.status(201).send();
                  })
              );
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
              return OrdersProducts.create({
                orderId: order.id,
                glassId: id,
                productPrice: price,
                upc: upc
              })
                .then(orderProductsRow => {
                  res.status(201).send();
                })
                .catch(next);
            } else {
              productInCart.increment('quantity');
              res.status(201).send();
            }
          });
        }
      })
      .catch(next);
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
      res.json(mergeCart(cart));
    }
  });
});

router.delete('/:userId/delete-from-cart/:itemId', (req, res, next) => {
  Orders.findOne({
    where: {
      userId: req.params.userId,
      status: 'UNPAID'
    }
  }).then(cart => {
    OrdersProducts.find({
      where: {
        orderId: cart.id,
        glassId: req.params.itemId
      }
    })
      .then(itemToDelete => {
        return itemToDelete.destroy();
      })
      .then(destroyedItem => {
        res.status(204).send();
      })
      .catch(next);
  });
});

router.post('/:userId/sync-local-storage-with-db/', (req, res, next) => {
  console.log(req.body);
  const cartFromLS = req.body;
  // assume user does not have a cart in db
  if (cartFromLS.length) {
    Orders.findOne({
      where: {
        userId: req.session.passport.user,
        status: 'UNPAID'
      }
    })
      .then(backendCart => {
        if(backendCart) return backendCart.destroy();
        else return
      })
      .then(deleted => {
        return Orders.create({
          userId: req.session.passport.user
        });
      })
      .then(createdOrder => {
        Promise.all(
          cartFromLS.map(item => {
            return Glasses.findById(item.id).then(oneItem => {
              return OrdersProducts.create({
                orderId: createdOrder.id,
                glassId: item.id,
                productPrice: oneItem.price,
                upc: oneItem.upc
              });
            });
          })
        )
          .then(updatedCart => {
            console.log(updatedCart[0].get({ plain: true }));
            res.status(200).send();
          })
          .catch(next);
      });
  }
});

// will go to utils or smth
const mergeCart = cart => {
  return cart.glasses.map(item => {
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
};
