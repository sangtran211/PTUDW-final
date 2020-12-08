const express = require('express');
const router = express.Router();

/* GET checkout page. */
router.get('/', function(req, res, next) {
  res.render('./checkout/checkout');
});

module.exports = router;