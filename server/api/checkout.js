const router = require('express').Router();
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("sk_test_3QhEihBTFPH2y1upqPcZgpf9");

router.post('/save-stripe-token', (req, res, next) => {
    console.log('body',req.body)
    stripe.charges.create({
        amount: 10000000000,
        currency: 'usd',
        description: 'Example charge',
        source: req.body.id
      })
      .then(charge => console.log('CHARGE',charge))
    res.status(200).send()
})

module.exports = router;



