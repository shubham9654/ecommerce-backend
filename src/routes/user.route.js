const express = require('express');
const router = express.Router();

const { updateUser, deleteUser, getUser, getAllUsers, getUserStatus } = require('../controllers/user.controller');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/verifyToken');

router.route('/status').get(verifyTokenAndAdmin, getUserStatus);
router.route('/').get(verifyTokenAndAdmin, getAllUsers);
router.route('/:id').get(verifyTokenAndAdmin, getUser);
router.route('/:id').patch(verifyTokenAndAuthorization, updateUser).delete(verifyTokenAndAuthorization, deleteUser);

module.exports = router;
