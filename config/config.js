module.exports = {
	//db 配置
	mysql : {
		host : 'localhost',
		port : '3306',
		user : 'root',
		password : 'root',
		database : 'items'
	},
	//上传设置
	upload : {
		//上传的前缀路径
		prefix : '/data/easypic'

	},
	//显示设置
	site : {
		port : 6001,
		//域名,后面不带/
		host : 'http://res.chrunlee.cn',
		hostPrefix : '',
		//路由
		route : '/static'
		//文件完整路径:http://www.byyui.com/static/2019/03/timestamp_random.extname
	}
}