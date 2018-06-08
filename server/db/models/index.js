const User = require('./user');
const Glasses = require('./glasses');
const Review = require('./review');

User.hasMany(Review);
User.hasMany(Order);

Review.belongsTo(User);
Review.belongsTo(Glasses);

Glasses.belongsToMany(Order, {through: "Glasses_Order"});
Glasses.hasMany(Review);

Order.belongsTo(User);
Order.hasMany(Glasses);

module.exports = {
  User,
  Glasses,
  Review
}
