/* global describe beforeEach it */

const { expect, assert } = require('chai')
const db = require('../index')
const Review = db.model('review')

describe('Review model', () => {

  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Model fields', () => {
    let exampleReview

    beforeEach(() => {
      return Review.create({
        body: 'These were an amazing pair of glasses! Glad I purchased them!',
        rating: 7
      })
      .then(newReview => {
        exampleReview = newReview
      })
    })

    it('the body field is a string', () => {
      expect(exampleReview.body).to.be.a('string')
    })

    it('the body field is required', () => {
      exampleReview.body = null;

      return exampleReview.validate()
      .then(function () {
        throw new Error('Validation should fail when content is null');
      },
      function(result) {
        expect(result).to.be.an.instanceOf(Error);
      });
    })

    it('the review should be at least five characters long', () => {
      exampleReview.body = "hey"

      return exampleReview.validate()
      .then(function () {
        throw new Error('Validation should fail when review is less than 5 characters long');
      },
      function(result) {
        expect(result).to.be.an.instanceOf(Error);
      });
    })

    it('the rating should be a value from 0 up to and including 10', () => {
      assert.isAtLeast(exampleReview.rating, 0);
      assert.isAtMost(exampleReview.rating, 10);
    })

  }) // end describe('Model fields')
}) // end describe('Review model')
