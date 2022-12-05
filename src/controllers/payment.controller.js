const { extractNum } = require('../utils/global.helper');
const stripe = require('stripe')(process.env.STRIPE_KEY)

const createPayment = async (req, res) => {
  try {
    const line_items = req.body.cartItems.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.img],
          description: item.desc,
          metadata: {
            id: item._id,
            size: item.selectedSize,
            color: item.selectedColor,
          }
        },
        unit_amount: extractNum(item.price) * 100
      },
      quantity: item?.selectedQuantity || 1,
    }))

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`
    })
    res.status(200).send({ url: session.url })
  } catch (err) {
    res.status(500).json({ errMsg: err });
  }
}

module.exports = {
  createPayment
}