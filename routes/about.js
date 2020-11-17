var express = require('express');
var router = express.Router();

/* GET shop page. */
router.get('/', function(req, res, next) {
  res.render('about/about',{
    active: {About:true}
  });
});



module.exports = router;
