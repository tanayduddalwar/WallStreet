const express = require('express');
const { addOrder } = require('../controllers/orderController');
const router = express.Router();

router.post('/add', addOrder);
module.exports = router;