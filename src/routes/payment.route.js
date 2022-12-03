const express = require('express');
const router = express.Router();

const { createPayment } = require('../controllers/payment.controller');
const { verifyTokenAndAuthorization } = require('../middlewares/verifyToken');

router.route('/').post(verifyTokenAndAuthorization, createPayment)

module.exports = router;
