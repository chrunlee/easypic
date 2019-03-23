//存储+API
let query = require('sqlquery-tool');
let config = require('../config/config');
query.query(config.mysql);
query.config.sql = true;//打印sql
/***
 * 插入附件数据
 **/
function add (obj){
	return query.search('user_attach').insert(obj);
}

function getAll(start,rows,filetype,keyword,simi){
	let whereObj = {simi : 0};
	if(filetype){
		whereObj.filetype = filetype;
	}
	if(null != keyword && undefined != keyword){
		whereObj.filename = {
			like : true,
			value : '%'+keyword+'%'
		};
	}
	if(simi == '1'){
		whereObj.simi = 1;
	}
	let count = 0;
	return query.search('user_attach').where(whereObj).count()
		.then(c=>{
			count = c;
			console.log(c);
			return query.search('user_attach').where(whereObj).limit(start,rows).order({column : 'createtime',order : 'desc'}).list();
		}).then(rs=>{
			return {
				rows : rs,
				total : count
			}
		})
}
function deleteById(id){
	return query.search('user_attach').where({id : id}).delete();
}
function rename(name,id){
	return query.search('user_attach').where({id : id}).update({filename : name});
}
function simi(id){
	return query.search('user_attach').where({id : id}).update({simi : 1});
}
function getSecurt (){
	return query.search('site').list();
}
module.exports = {
	insert : add,
	getAll : getAll,
	delete : deleteById,
	rename : rename,
	simi : simi,
	getSecurt : getSecurt
};