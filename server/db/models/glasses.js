const db = require("../db/db.js");
const Sequelize = require("sequelize");

const Glasses = db.define('glasses', {

  title: {
    type: Sequelize.STRING,
    allowNull: false
  },

  description: {
    type: Sequelize.TEXT
  },

  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      isNumeric: true
    }
  },

  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
    validate: {
      min: 0,
      isNumeric: true
    }
  },

  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://static.zennioptical.com/marketing/campaign/premium-sunglasses/Premium-Sunglasses-Men/premium-sunglasses-plp-men-md.jpg",
    validate: {
      isUrl: true
    }
  },

  upc: {
    type: Sequelize.STRING,
    allowNull: false
  },

  shape: {
    type: Sequelize.STRING
  },

  category: {
    type: Sequelize.ENUM('Men', 'Women', 'Kids')
  }

})

module.exports = Glasses;
