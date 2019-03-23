let express = require('express');
let router = express.Router();
let path = require('path');
let config = require('../config/config');
let dao = require('../lib/dao');
let crypto = require('crypto');
let securt = null;
router.all('/*', async (req,res,next)=>{
	if(securt == null){
		let info = await dao.getSecurt();
		info = info[0];
		securt = info.superpwd;
	}
	//校验md5
	if(req.headers['securt']){
		let putstr = req.headers['securt'];
		let md5 = crypto.createHash('md5');
		let newsecurt =  md5.update(putstr).digest('hex');
		if(securt == newsecurt){
			next();
		}else{
			res.json({success : true})
		}
	}else{
		res.json({success : true});
	}
})
/**
 * 支持图片、文件等二进制以及base64 保存。
 **/
router.post('/list',(req,res,next)=>{
	let page = req.body.curr || 1,pagesize = req.body.pagesize || 10;
	let start = (page-1) * pagesize;
	let type = req.body.filetype;
	let keyword = req.body.key;
	let simi = req.body.simi;
	dao.getAll(start,pagesize,type,keyword,simi).then(rs=>{
		res.json({
			success : true,
			rows : rs.rows,
			total : rs.total
		});	
	})
});

/***
 * 删除文件
 *
 **/
router.post('/delete',(req,res,next)=>{
	let id = req.body.id;
	dao.delete(id).then(rs=>{
		res.json({success : true});
	})
})

/***
 * 重命名
 *
 **/
router.post('/rename',(req,res,next)=>{
	let id = req.body.id;
	let name = req.body.name;
	dao.rename(name,id).then(rs=>{
		res.json({success : true});
	})
})

/***
 * private
 *
 **/
router.post('/simi',(req,res,next)=>{
	let id = req.body.id;
	let name = req.body.name;
	dao.simi(id).then(rs=>{
		res.json({success : true});
	})
})


module.exports = router;