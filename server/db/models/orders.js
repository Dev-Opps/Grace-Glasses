const db = require('../db.js');
const Sequelize = require('sequelize');
const { Glasses } = require('./');

const Orders = db.define('orders', {
  orderNumber: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true
  },
  totalPrice: {
    type: Sequelize.VIRTUAL,
    get() {
      OrdersProducts.findAll({
        where: {
          orderId: this.id
        }
      })
      .then(products => {
        var totalPriceCalculator = products.reduce((prev, current) => {
          return prev + current.quantity * current.productPrice;
        }, 0);
        console.log('please', totalPriceCalculator);
        return totalPriceCalculator
      });
    }
  },
  status: {
    type: Sequelize.ENUM('UNPAID', 'PAID', 'SHIPPED', 'DELIVERED'),
    defaultValue: 'UNPAID'
  }
});

Orders.beforeValidate(order => {
  return (order.orderNumber = '' + order.userId + Date.parse(new Date()));
});

const OrdersProducts = db.define('OrdersProducts', {
  productPrice: {
    type: Sequelize.INTEGER
  },
  upc: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
});

module.exports = {
  Orders,
  OrdersProducts
};
