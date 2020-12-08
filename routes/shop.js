const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/* GET shop page. */
router.get('/', productController.index);

router.get('/:id', productController.getProductById);

module.exports = router;
