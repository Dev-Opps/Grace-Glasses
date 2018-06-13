/* global describe beforeEach it */

const { expect, assert } = require('chai')
const db = require('../index')
const Glasses = db.model('glasses')

describe('Glasses model', () => {

  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Model fields', () => {
    let exampleGlasses

    beforeEach(() => {
      return Glasses.create({
        title: "Hello World Glasses",
        description: "This is a description",
        price: 967.37333,
        quantity: 17,
        imageUrl: "https://static.zennioptical.com/marketing/campaign/premium-sunglasses/Premium-Sunglasses-Men/premium-sunglasses-plp-men-md.jpg",
        upc: "qwerty12345",
        shape: "Square",
        category: "Men"
      })
      .then(newGlasses => {
        exampleGlasses = newGlasses
      })
    })

    it('the title field is a string', () => {
      expect(exampleGlasses.title).to.be.a('string')
    })

    it('the description field is a string', () => {
      expect(exampleGlasses.description).to.be.a('string')
    })

    it('the price field is a float', () => {
      expect(exampleGlasses.price).to.be.a('number')
    })

    it('the quantity field is an integer', () => {
      expect(exampleGlasses.quantity).to.be.a('number')
    })

    it('the iamgeUrl field is a string', () => {
      expect(exampleGlasses.imageUrl).to.be.a('string')
    })

    it('the upc field is a string', () => {
      expect(exampleGlasses.upc).to.be.a('string')
    })

    it('the shape field is a string', () => {
      expect(exampleGlasses.shape).to.be.a('string')
    })

    it('the category field is a string', () => {
      expect(exampleGlasses.category).to.be.a('string')
    })

    it('the quantity should be at least 0', () => {
      assert.isAtLeast(exampleGlasses.quantity, 0);
    })

    it('the category can only be one of the three selected choices', () => {
      let categories = ["Men", "Women", "Kids"];
      let selection = exampleGlasses.category;
      assert.include(categories, selection);
    })

    it('the price should be rounded to the nearest hundredth', () => {
      let originalPrice = 967.37333;
      expect(exampleGlasses.price).to.equal(967.37);
    })

  }) // end describe('Model fields')
}) // end describe('Glasses model')
