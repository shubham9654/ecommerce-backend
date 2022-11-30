const express = require('express');
const { createOrder, updateOrder, deleteOrder, getOrder, getAllOrders, monthlyIncome } = require('../controllers/order.controller');
const router = express.Router();

const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require('../middlewares/verifyToken');

router.route('/').get(verifyTokenAndAdmin, getAllOrders).post(verifyToken, createOrder);
router.route('/income').get(verifyTokenAndAdmin, monthlyIncome);
router.route('/:id').get(verifyTokenAndAuthorization, getOrder).patch(verifyTokenAndAdmin, updateOrder).delete(verifyTokenAndAdmin, deleteOrder );

module.exports = router;
