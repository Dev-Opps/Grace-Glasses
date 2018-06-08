'use strict'

const db = require('../server/db')
const {User, Glasses} = require('../server/db/models')
var faker = require('faker');

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
function usersPromises() {
  let arr = []
  for (let i =0; i < 10; i++) {
    arr.push(User.create({
      email: faker.internet.email(), 
      password: faker.internet.password()
    }))
  }
  return arr
}


var cats = ['Men', 'Women', 'Kids']
function glassesPromises() {
  let arr = []
  for (let i =0; i < 30; i++) {
    arr.push(Glasses.create({
      title: faker.commerce.productName(), 
      description: faker.commerce.productAdjective(),
      price : faker.random.number(),
      quantity : faker.random.number(),
      upc: faker.commerce.product(),
      shape: faker.commerce.productMaterial(),
      category: cats[Math.floor(Math.random()*3)],
    }))
  }
  return arr
}

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const users = await Promise.all(usersPromises())
  const glasses = await Promise.all(glassesPromises())


  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${glasses.length} products`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
// if (module === require.main) {
  seed()
//   .catch(err => {
//     console.error(err)
//     process.exitCode = 1
//   })
//   .finally(() => { // `finally` is like then + catch. It runs no matter what.
//     console.log('closing db connection')
//     db.close()
//     console.log('db connection closed')
//   })
  /*
   * note: everything outside of the async function is totally synchronous
   * The console.log below will occur before any of the logs that occur inside
   * of the async function
   */
  console.log('seeding...')
// }

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
