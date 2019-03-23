//对文件进行保存和数据存储
//进度条?
let express = require('express');
let router = express.Router();
let path = require('path');
let upload = require('../lib/upload');
let config = require('../config/config');
let dao = require('../lib/dao');


/**
 * 支持图片、文件等二进制以及base64 保存。
 **/
router.post('/',upload('file',config.upload.prefix),function(req,res,next){
	if(req.file){
		//存储。
		dao.insert(req.file).then(rs=>{
			res.json({
				filepath : req.file.filepath,
				success : true
			});
		})
	}else{
		res.json({
			success : false,
			msg : '未上传文件'
		})
	}
});

module.exports = router;