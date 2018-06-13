/* global describe beforeEach it */

const { expec t} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(() => {
        return User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
          .then(user => {
            cody = user
          })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')

  describe('Model fields', () => {

    let exampleUser

    beforeEach(() => {
      return User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'example@example.com',
        isAdmin: false,
        address: '5 Hanover Square',
        phoneNumber: '1-888-888-8888',
        paymentToken: 'randompaymenttoken',
        password: 'tabasco',
        salt: 'pepper',
        googleId: '888tabasco888'
      })
      .then(builtUser => exampleUser = builtUser)
    })

    it('the firstName field is a string with the proper first name', () => {
      expect(exampleUser.firstName).to.be.a('string')
      expect(exampleUser.firstName).to.equal('John')
    })

    it('the lastName field is a string with the proper last name', () => {
      expect(exampleUser.lastName).to.be.a('string')
      expect(exampleUser.lastName).to.equal('Doe')
    })

    it('the email field is a string with the proper email', () => {
      expect(exampleUser.email).to.be.a('string')
      expect(exampleUser.email).to.equal('example@example.com')
    })

    it('the isAdmin field is a boolean', () => {
      expect(exampleUser.isAdmin).to.be.a('boolean')
      expect(exampleUser.isAdmin).to.equal(false)
    })

    it('the address field is a string with the proper address', () => {
      expect(exampleUser.address).to.be.a('string')
      expect(exampleUser.address).to.equal('5 Hanover Square')
    })

    it('the phoneNumber field is a string with the proper phone number', () => {
      expect(exampleUser.phoneNumber).to.be.a('string')
      expect(exampleUser.phoneNumber).to.equal('1-888-888-8888')
    })

    it('requires a firstName', () => {
      expect(exampleUser.firstName).to.not.be.null
    })

    it('requires a lastName', () => {
      expect(exampleUser.lastName).to.not.be.null
    })

    it('requires an email', () => {
      expect(exampleUser.email).to.not.be.null
    })

  })
}) // end describe('User model')
