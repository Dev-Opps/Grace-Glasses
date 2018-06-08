const db = require("../db.js");
const Sequelize = require("sequelize");

const Review = db.define('review', {

  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      isMinLength(body) {
        if (body.length < 5) throw new Error('A review must be at least five characters!')
      }
    }
  }

})

module.exports = Review;
