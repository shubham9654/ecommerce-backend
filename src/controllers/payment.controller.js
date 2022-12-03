const stripe = require('stripe')(process.env.STRIPE_KEY)

const createPayment = async (req, res) => {
  try {
    stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd"
    }, (err, res) => {
      if (err) {
        res.status(500).json({ errMsg: err });
      } else {
        res.status(200).json(res)
      }
    })
  } catch (err) {
    res.status(500).json({ errMsg: err });
  }
}

module.exports = {
  createPayment
}