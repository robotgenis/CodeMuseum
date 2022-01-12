var express = require('express');
const path = require('path');
const fs = require('fs');
var router = express.Router();

/* GET library listing. */
router.get('/', function(req, res, next) {
  let used = req.query.used;

  let ignore = [];

  if(used){
    ignore = JSON.parse(used);
  }

  if(ignore.length == 0){
    res.render('main/start_panel');
  }else{
    fs.readdir(path.join(__dirname + "/../views/library/"), function(err, files){
      console.log(files);

      for(let i = 0; i < files.length; i++){
        if(ignore.includes(files[i].split(".")[0])){
          files.splice(i, 1);
          i--;
        }
      }

      if(files.length != 0){
        let r = Math.floor(Math.random()  * files.length);

        res.render('library/' + files[r].split(".")[0]);
      }else{
        res.render('main/end_panel');
      }
    });
  }
});

module.exports = router;
