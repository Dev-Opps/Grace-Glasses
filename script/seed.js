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
const cat = ["Men", "Women", "Kids"]

async function seed () {
  await db.sync({force: true})
  console.log('dropping old table')

  const users = await Promise.all([
    User.create({email: 'admin@gg.com', password: '123', isAdmin:true}),
    User.create({email: 'admin@gmail.com', password: '123', isAdmin: true }),
    User.create({email: 'corey@fs.com', password: 'password', isAdmin: false })
  ])
  const glasses = await Promise.all([
    Glasses.create({
      title: 'Aviator Gaze', 
      description: 'Stylish and compelling', 
      price: Math.floor(Math.random() * Math.floor(10000)),
      quantity: Math.floor(Math.random() * Math.floor(100)),
      upc: Math.floor(Math.random() * Math.floor(99999)),
      category: cat[Math.floor(Math.random() * Math.floor(3))]
    }),
    Glasses.create({
      title: 'Erika Optics', 
      description: 'put the sass in sassy', 
      price: Math.floor(Math.random() * Math.floor(10000)),
      quantity: Math.floor(Math.random() * Math.floor(100)),
      upc: Math.floor(Math.random() * Math.floor(99999)), 
      category: cat[Math.floor(Math.random() * Math.floor(3))]
    }),
    Glasses.create({
      title: 'Santos De Cartier', 
      description: 'When boujee isn\'t good enough', 
      price: 99999,
      quantity: Math.floor(Math.random() * Math.floor(100)),
      upc: Math.floor(Math.random() * Math.floor(99999)),
      category: cat[Math.floor(Math.random() * Math.floor(3))],
      
    }),
    Glasses.create({
      title: 'Panthere de Cartier', 
      description: 'Metal Sunglasses with a smooth gold finish', 
      price: Math.floor(Math.random() * Math.floor(10000)),
      quantity: Math.floor(Math.random() * Math.floor(100)),
      upc: Math.floor(Math.random() * Math.floor(99999)),
      category: cat[Math.floor(Math.random() * Math.floor(3))],
    }),
    Glasses.create({
      title: 'Warby Barker', 
      description: 'We did not steal this' , 
      price: Math.floor(Math.random() * Math.floor(10000)),
      quantity: Math.floor(Math.random() * Math.floor(100)),
      upc: Math.floor(Math.random() * Math.floor(99999)),
      category: cat[Math.floor(Math.random() * Math.floor(3))]
    }),
    Glasses.create({
      title: 'DG3282', 
      description: 'Luxury at it\'s finest' , 
      price: Math.floor(Math.random() * Math.floor(10000)),
      quantity: Math.floor(Math.random() * Math.floor(100)),
      upc: Math.floor(Math.random() * Math.floor(99999)),
      category: cat[Math.floor(Math.random() * Math.floor(3))],
    }),
    Glasses.create({
      title: 'DG3333', 
      description: 'If Supreme made glasses this would be it' , 
      price: Math.floor(Math.random() * Math.floor(10000)),
      quantity: Math.floor(Math.random() * Math.floor(100)),
      upc: Math.floor(Math.random() * Math.floor(99999)),
      category: cat[Math.floor(Math.random() * Math.floor(3))],
    }),
    Glasses.create({
      title: 'Wilkie Frames', 
      description: 'Straight out of Williamsburg so you know it\'s hiptser' , 
      price: Math.floor(Math.random() * Math.floor(10000)),
      quantity: Math.floor(Math.random() * Math.floor(100)),
      upc: Math.floor(Math.random() * Math.floor(99999)),
      category: cat[Math.floor(Math.random() * Math.floor(3))],
    }),
    Glasses.create({
      title: 'Chamberlian Frames', 
      description: 'They say the man makes the glasses, this begs to differ' , 
      price: Math.floor(Math.random() * Math.floor(10000)),
      quantity: Math.floor(Math.random() * Math.floor(100)),
      upc: Math.floor(Math.random() * Math.floor(99999)),
      category: cat[Math.floor(Math.random() * Math.floor(3))],
    }),
    Glasses.create({
      title: 'The Tin Can', 
      description: 'Because nobody wants to spend more than 10 dollars on Frames' , 
      price: 9,
      quantity: Math.floor(Math.random() * Math.floor(100)),
      upc: Math.floor(Math.random() * Math.floor(99999)),
      category: cat[Math.floor(Math.random() * Math.floor(3))],
    }),
    Glasses.create({
      title: 'Dino Frames', 
      description: 'All the kids want them but your child has em' , 
      price: Math.floor(Math.random() * Math.floor(10000)),
      quantity: Math.floor(Math.random() * Math.floor(100)),
      upc: Math.floor(Math.random() * Math.floor(99999)),
      category: cat[Math.floor(Math.random() * Math.floor(3))],
    }),
  ])
}
  console.log('seeding...')
  const exit = () => process.exit(0)
const die = err => {
    console.error(err)
    process.exit(1)
}

if (module === require.main)
    seed().then(exit, die)


// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed



// function usersPromises() {
//   let arr = []
//   for (let i =0; i < 1; i++) {
//     arr.push(User.create({
//       email: 'admin@gmail.com', 
//       password: '123',
//       isAdmin : true
//     }))
//   }
//   return arr
// }

// const adj = () => {
//   let description = ''
//   let count = 5;
//   while( count > 0) {
//     description += faker.commerce.productAdjective() + ' ' + faker.commerce.productName()
//     count--
//   }
//   return description;
// }

// const cats = ['Men', 'Women', 'Kids']

// function glassesPromises() {
//   let arr = []
//   for (let i =0; i < 30; i++) {
//     arr.push(Glasses.create({
//       title: faker.commerce.productAdjective() + ' ' + faker.commerce.productName(), 
//       description: adj(),
//       price : Math.floor(Math.random()*10000 + 50),
//       quantity : Math.floor(Math.random()*1000),
//       upc: `GL_${Math.floor(Math.random()*10000)}`,
//       shape: faker.commerce.productMaterial(),
//       category: cats[Math.floor(Math.random()*3)],
//     })
//     .catch(err => console.error(err))
//   )
//   }
//   return arr
// }

// async function seed () {
//   await db.sync({force: true})
//   console.log('db synced!')
//   // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
//   // executed until that promise resolves!
//   const users = await Promise.all(usersPromises())
//   const glasses = await Promise.all(glassesPromises())


//   // Wowzers! We can even `await` on the right-hand side of the assignment operator
//   // and store the result that the promise resolves to in a variable! This is nice!
//   console.log(`seeded ${users.length} users`)
//   console.log(`seeded ${glasses.length} products`)
//   console.log(`seeded successfully`)
// }

// // Execute the `seed` function, IF we ran this module directly (`node seed`).
// // `Async` functions always return a promise, so we can use `catch` to handle
// // any errors that might occur inside of `seed`.
// // if (module === require.main) {
//   seed()
// //   .catch(err => {
// //     console.error(err)
// //     process.exitCode = 1
// //   })
// //   .finally(() => { // `finally` is like then + catch. It runs no matter what.
// //     console.log('closing db connection')
// //     db.close()
// //     console.log('db connection closed')
// //   })
//   /*
//    * note: everything outside of the async function is totally synchronous
//    * The console.log below will occur before any of the logs that occur inside
//    * of the async function
//    */
//   console.log('seeding...')
// // }
