/***
 * 首页处理
 * @author chrunlee
 ***/
let express = require('express');
let router = express.Router();
let path = require('path');


router.get('/', (req,res,next)=> {
  res.end('私人图床');
});


module.exports = router;