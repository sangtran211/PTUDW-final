var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

/* GET shop page. */
// router.get('/', function(req, res, next) {
//   res.render('shop/shop', {active: {Shop: true}});
// });
router.get('/',productController.index);

router.get('/:id', productController.getProductById);

module.exports = router;
 