var express = require('express');
var router = express.Router();

/* GET shop page. */
router.get('/', function(req, res, next) {
  res.render('shop/shop', {active: {Shop: true}});
});

router.get('/product/:id', async(req,res,next)=>{
  res.render('shop/product-details');
});

module.exports = router;
