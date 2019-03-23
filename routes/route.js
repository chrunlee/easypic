let config = require('../config/config');

module.exports = function(app){


	//首页
	app.use(config.site.hostPrefix+'/',require('./index'));

	//提供上传接口
	app.use(config.site.hostPrefix+'/upload',require('./upload'));
	//提供获取列表的接口

	app.use(config.site.hostPrefix+'/api',require('./api'));
	//提供分页查找

	//提供关键字查询

	//提供类别查询

	//提供下载功能

	//提供远程下载

	//提供后端任务下载

	//提供首页数据统计

	//提供单文件信息查看



}