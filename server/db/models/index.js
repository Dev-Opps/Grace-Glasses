const User = require('./user');
const Glasses = require('./glasses');
const Review = require('./review');
const { Orders, OrdersProducts } = require('./orders');

User.hasMany(Review);
// User.hasMany(Order);

Review.belongsTo(User);
Review.belongsTo(Glasses);

// Glasses.belongsToMany(Order, {through: "Glasses_Order"});
Glasses.hasMany(Review);

Orders.belongsTo(User);
User.hasMany(Orders);

Glasses.belongsToMany(Orders, { through: OrdersProducts });
OrdersProducts.hasMany(Glasses);
Orders.belongsToMany(Glasses, { through: OrdersProducts });

module.exports = {
  User,
  Glasses,
  Review,
  Orders,
  OrdersProducts
};
