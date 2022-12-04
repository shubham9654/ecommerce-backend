const stripe = require('stripe')(process.env.STRIPE_KEY)

const createPayment = async (req, res) => {
  console.log(process.env.STRIPE_KEY);
  try {
    stripe.paymentIntents.create({
      // source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
      payment_method_types: ['card'],
    }, (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json({ errMsg: stripeErr });
      } else {
        res.status(200).json(stripeRes);
      }
    })
  } catch (err) {
    res.status(500).json({ errMsg: err });
  }
}

module.exports = {
  createPayment
}