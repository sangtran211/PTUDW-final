var express = require('express');
var router = express.Router();

/* GET blog page. */
router.get('/', function(req, res, next) {
  res.render('blog/blog', {active: {Blog: true}});
});

module.exports = router;
