const express = require('express');
const { createCart, updateCart, deleteCart, getCart, getAllCarts } = require('../controllers/cart.controller');
const router = express.Router();

const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require('../middlewares/verifyToken');

router.route('/').get(verifyTokenAndAdmin, getAllCarts).post(verifyToken, createCart );
router.route('/:id').get(verifyTokenAndAuthorization, getCart).patch(verifyTokenAndAuthorization, updateCart).delete(verifyTokenAndAuthorization, deleteCart );

module.exports = router;
