//用于过滤上传文件进行处理

let formidable = require('formidable');
let path = require('path');

let util = require('./util');

let isFormdata = function(req){
  let type = req.headers['content-type'] || '';
  return -1 < type.indexOf('multipart/form-data');
};

let upload = function(fileName,folderPath){
	//创建目录
	let tempPath =  path.join(folderPath,'tmp');
	util.mkdir(tempPath);
	return function(req,res,next){
		if(isFormdata(req)){
	      let form = formidable.IncomingForm();
	      form.uploadDir = tempPath;
	      form.parse(req,function(err,fileds,files){
	      	let file = files[fileName];//上传的文件
	      	if(file){
	      		//对文件进行重新调整，然后复制
	      		let realPath = util.getRealPath(folderPath,file.name);
	      		//然后将文件复制到对应目录下
	      		util.copyFile(file.path,path.join(folderPath,realPath))
	      		let sizeStr = util.formatSize(file.size);
	      		req.file = {
	      			filename : file.name,
	      			filepath : realPath,
	      			filesize : sizeStr,
	      			extname : path.extname(file.name),
	      			filetype : util.getFileType(file.name),
	      			createtime : new Date()
	      		};
	      		next();
	      	}else{
	      		next();
	      	}
	      });
	    }else{
	        next();
	    }
		
	}
}

module.exports = upload;