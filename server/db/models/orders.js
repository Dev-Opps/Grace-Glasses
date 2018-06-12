const db = require('../db.js');
const Sequelize = require('sequelize');
const {Glasses} = require('./')

const Orders = db.define('orders', {
  orderNumber: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true
  },
  totalPrice: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.ENUM('UNPAID', 'PAID', 'SHIPPED', 'DELIVERED'),
    defaultValue: 'UNPAID'
  }
});

Orders.beforeValidate(order => {
  return (order.orderNumber = '' + order.userId + Date.parse(new Date()));
});

// Orders.beforeValidate(order => {
//   const total = OrdersProducts.find({
//     where : {

//     }
//   })
// })


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
}
);

module.exports = {
  Orders,
  OrdersProducts
};
