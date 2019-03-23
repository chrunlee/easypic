/***
 * 项目中通用的函数包
 * @author chrunlee
 ***/

let path = require('path');

let fs = require('fs');
let mkdir = function(dirpath){
	if (!fs.existsSync(dirpath)) {
        var pathtmp;
        dirpath.split(/[/\\]/).forEach(function (dirname) {
            pathtmp ? pathtmp = path.join(pathtmp, dirname) : pathtmp = dirname;
            if (!fs.existsSync(pathtmp)) {
            	fs.mkdirSync(pathtmp, mode)
            }
        });
    }
}
module.exports = {
	//guid

	//生成路径

	//获取文件

	//文件基本信息
	mkdir : mkdir,
	//根据文件夹地址，创建一个目标路径，并创建对应的文件夹
	getRealPath : function(folderPath,fileName){
		//创建规则: 2019/03/timestamp_xxx.extname
		let timeStamp = +new Date();
		let randomStr = Math.floor(Math.random() * 10000)+'';
		let extname = path.extname(fileName);
		let d = new Date();
		let folder = path.join(''+d.getFullYear(),''+(d.getMonth()+1));
		let newFolder = path.join(folderPath,folder);
		let realPath = '/'+d.getFullYear()+'/'+(d.getMonth()+1)+'/'+timeStamp + '' + randomStr + extname;
		console.log(newFolder);
		mkdir(newFolder);
		return realPath;
	},
	//复制文件到目标地址
	copyFile : function(from,target){
		let readStream = fs.createReadStream(from);
		let writeStream =fs.createWriteStream(target);
		readStream.pipe(writeStream);
		return true;
	},
	//格式化文件大小
	formatSize : function(  size, pointLength, units ){
		var unit;
        units = units || [ 'B', 'KB', 'M', 'G', 'TB' ];

        while ( (unit = units.shift()) && size > 1024 ) {
            size = size / 1024;
        }
        return (unit === 'B' ? size : size.toFixed( pointLength || 2 )) + unit;
	},
	//返回文档类型
	getFileType : function(fileName){
		let filetype = '文件';
		let extname = path.extname(fileName);
		extname = extname.toLowerCase();
		let map = {
			'.txt' : '文档',
			'.doc' : '文档',
			'.docx' : '文档',
			'.xls' : '文档',
			'.xlsx' : '文档',
			'.ppt' : '文档',
			'.pptx' : '文档',
			'.pdf' : '文档',
			'.jpg' : '图片',
			'.bmp' : '图片',
			'.png' : '图片',
			'.gif' : '图片',
			'.jpeg' : '图片',
			'.mp4' : '视频',
			'.mov' : '视频',
			'.avi' : '视频',
			'.mpeg' : '视频',
			'.mp3' : '音频',
			'.rar' : '压缩文件',
			'.zip' : '压缩文件',

			'.js' : '代码',
			'.html' : '代码',
			'.jsp' : '代码',
			'.css' : '代码',
			'.java' : '代码',
			'.class' : '代码'

		};
		return map[extname] || filetype;
	}
}