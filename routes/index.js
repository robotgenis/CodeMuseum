var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log("sending");
  let s = path.join(__dirname + '/../views/index.html');
  console.log(s);
  res.sendFile(s);
});

module.exports = router;
