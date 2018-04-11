var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
function guid(prefix){
    var counter = 0;
    return (function( prefix ) {
        var guid = (+new Date()).toString( 32 ),i = 0;
        for ( ; i < 5; i++ ) {
            guid += Math.floor( Math.random() * 65535 ).toString( 32 );
        }
        return (prefix || 'byy_') + guid + (counter++).toString( 32 );
    })( prefix )
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//图片上传
router.post('/upload', function(req, res,next){
    var imgData = req.body.img;
    //过滤data:URL
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    var nowDir = path.dirname(__dirname);
    var imgname = guid();
    imgname = imgname + '.png';
    var folder = path.join(nowDir,'public','pic',imgname)
    if(!fs.existsSync(path.dirname(folder))){
    	fs.mkdirSync(path.dirname(folder));
    }
    var imgpath = '/pic/'+imgname;
    fs.writeFile(folder, dataBuffer, function(err) {
        if(err){
          next(err);
        }else{
          res.end(imgpath);
        }
    });
});

//获得路径下的所有图片信息分页展示
router.get('/list',function( req, res, next){
    var dest = path.join(path.dirname(__dirname),'public','pic');
    //获得文件信息
    var page = req.query.curr || 1,pagesize = req.query.pagesize || 10;
    fs.readdir(dest,function(err,files){
        if(err){
            next(err);
        }else{
            var total = files.length;
            var arr = files.splice( (page-1)*pagesize,pagesize);
            if(arr){
                arr = arr.map(function(t){
                    return '/pic/'+t;
                });
            }
            var rs = {
                total : total,
                curr : page,
                pagesize : pagesize,
                rows : arr
            };
            var str = JSON.stringify(rs);
            res.end(str);
        }
    })
});

module.exports = router;
