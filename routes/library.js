var express = require('express');
var router = express.Router();

/* GET library listing. */
router.get('/', function(req, res, next) {
  console.log(req.params);
  res.render('library/c64maze');
});

module.exports = router;
