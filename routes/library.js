var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.params);
  res.render('library/jsf');
});

module.exports = router;
