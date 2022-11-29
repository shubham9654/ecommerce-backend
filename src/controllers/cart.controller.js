const Cart = require("../models/cart.model");

const getCart = async (req, res) => {
  try {
    const userId = req.params.id
    const cart = await Cart.findOne({ userId });
    if (cart) {
      res.status(200).json({ status: "success", cart });
    } else {
      res.status(404).json({ status: "fail", msg: "cart not found!" });
    }
  } catch (err) {
    console.lo
    res.status(500).json({ errMsg: err });
  }
}

const getAllCarts = async (req, res) => {
  try {
    const getNewCart = req.query.new
    const carts = getNewCart ? await Cart.find().sort({ _id: -1 }).limit(1) : await Cart.find().limit(20);
    if (carts) {
      res.status(200).json({ status: "success", carts });
    } else {
      res.status(404).json({ errMsg: 'carts not found' });
    }
  } catch (err) {
    res.status(500).json({ errMsg: err });
  }
}

const createCart = async (req, res) => {
  try {
    const cart = await Cart.create(req.body);
    if (cart) {
      res.status(200).json({ status: "success", cart });
    }
  } catch (err) {
    res.status(500).json({ errMsg: err });
  }
};

const updateCart = async (req, res) => {
  try {
    const cartId = req.query.cartId
    const cart = await Cart.findByIdAndUpdate(cartId, {
      $set: req.body
    }, { new: true });
    if (cart) {
      res.status(200).json({ status: "success", cart });
    } else {
      res.status(400).json({ status: "fail", msg: "cart not found!" });
    }
  } catch (err) {
    res.status(500).json({ errMsg: err });
  }
};

const deleteCart = async (req, res) => {
  try {
    const cartId = req.query.cartId
    const cart = await Cart.findByIdAndDelete(cartId)
    if (cart) {
      res.status(200).json({ status: "success", msg: "cart deleted successfully!", cart });
    } else {
      res.status(400).json({ status: "fail", msg: "cart not found!" });
    }
  } catch (err) {
    res.status(500).json({ errMsg: err });
  }
};

module.exports = {
  getCart,
  getAllCarts,
  createCart,
  updateCart,
  deleteCart
}