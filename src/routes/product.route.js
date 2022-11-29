const express = require('express');
const router = express.Router();

const { getAllProducts, createProduct, updateProduct, deleteProduct, getProduct } = require('../controllers/product.controller');
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');

router.route('/').get(getAllProducts).post(verifyTokenAndAdmin, createProduct );
router.route('/:id').get(getProduct).patch(verifyTokenAndAdmin, updateProduct ).delete(verifyTokenAndAdmin, deleteProduct );

module.exports = router;
