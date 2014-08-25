/**
 * crud相关方法
 * 1.crud
 * 2.index
 */
define(function(require, exports){
	var $ = require('jquery');
	var qiao = require('qiao');
	var qiaobs = require('qiaobs');
	
	exports.url = '';
	exports.crud = function(){
		// menu click
		qiao.on('.menus', 'click', function(){
			var url = $(this).qdata().url;
			if(url){
				$(this).siblings().removeClass('active').end().addClass('active');
				
				exports.url = url;
				exports.list();
			}
		});
		
		// check
		qiao.on('.allcheck', 'change', function(){
			$('.onecheck').prop('checked',$(this).prop('checked'));
		});
		
		// add
		qiao.on('.addBtn', 'click', function(){exports.savep('添加')});
		// edit
		qiao.on('.editbtn','click', function(){exports.savep('修改',$(this).parents('tr').qdata().id)});
		// search
		qiao.on('.queBtn', 'click', function(){exports.savep('查询')});
		qiao.on('.relBtn', 'click', function(){exports.list();});
		// del
		qiao.on('.delBtn', 'click', function(){exports.del();});
		qiao.on('.delbtn', 'click', function(){exports.del($(this).parents('tr').qdata().id);});
	};
	exports.list = function(data){
		var opt = {url:exports.url + 'index'};
		if(data) opt.data = data;
		
		qiao.html(opt);
	};
	exports.savep = function(title, id){
		if(title == '查询'){
			qiaobs.dialog({title:title,url:exports.url + 'savep'}, function(){
				exports.list($('#bsmodal').find('form').qser());	
			});
		}else{
			var url = id ? (exports.url + 'savep?id=' + id) : (exports.url + 'savep');
			qiaobs.dialog({title:title,url:url}, function(){
				exports.save();
			});
		}
	};
	exports.save = function(){
		var res = qiao.ajax({url:exports.url+'save',data:$('#bsmodal').find('form').qser()});
		qiaobs.msg(res.msg);
		exports.list();
	};
	exports.del = function(id){
		var ids = [];
		
		if(id){
			ids.push(id);
		}else{
			$('.onecheck').each(function(){
				if($(this).prop('checked')){
					ids.push($(this).parents('tr').qdata().id);
				}
			});
		}
		
		if(!ids.length){
			qiaobs.alert('请选择要删除的记录！');
		}else{
			qiaobs.confirm('确认要删除所选记录吗？',function(){
				var res = qiao.ajax({url:exports.url+'del',data:{ids:ids.join(',')}});
				qiaobs.msg(res.msg);
				exports.list();
			});
		}
	};
});