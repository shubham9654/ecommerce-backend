const Product = require("../models/product.model");

const getProduct = async (req, res) => {
  try {
    const productId = req.params.id
    const product = await Product.findById(productId);
    if (product) {
      res.status(200).json({ status: "success", product });
    } else {
      res.status(404).json({ status: "fail", msg: "product not found!" });
    }
  } catch (err) {
    res.status(500).json({ errMsg: err });
  }
}

const getAllProducts = async (req, res) => {
  try {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    const skip = req.query.skip;
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(2).skip(skip | 0);
    } else if (qCategory) {
      products = await Product.find({ categories: { $in: [qCategory]}}).limit(20).skip(skip | 0);
    } else {
      products = await Product.find().limit(20).skip(skip | 0);
    }
    if (products.length > 0 ) {
      res.status(200).json({ status: "success", products });
    } else {
      res.status(404).json({ status: "success", msg: "product not found!" });
    }
  } catch (err) {
    res.status(500).json({ errMsg: err });
  }
}

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (product) {
      res.status(200).json({ status: "success", product });
    }
  } catch (err) {
    res.status(500).json({ errMsg: err });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id
    const product = await Product.findByIdAndUpdate(productId, {
      $set: req.body
    }, { new: true });
    if (product) {
      res.status(200).json({ status: "success", product });
    }
  } catch (err) {
    res.status(500).json({ errMsg: err });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id
    await Product.findByIdAndDelete(productId)
    res.status(200).json({ status: "success", msg: "product deleted successfully!" });
  } catch (err) {
    res.status(500).json({ errMsg: err });
  }
};

module.exports = {
  getProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
}