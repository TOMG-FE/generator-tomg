/**
省市区数据
@example
var $area = require('comp/model/area');

$area.ready(function(){
	console.info('province list:', $area.getProvinceList());
	console.info('province 4 city list:', $area.getCityList('4'));
	console.info('province 54 city list is empty:', $area.getCityList('54'));
	console.info('city 54 area list:', $area.getAreaList('54'));
	console.info('city 4 area list is empty:', $area.getAreaList('4'));
	console.info('province 4:', $area.getProvince('4'));
	console.info('province 54 is null:', $area.getProvince('54'));
	console.info('city 54:', $area.getCity('54'));
	console.info('city 513 is null:', $area.getCity('513'));
	console.info('area 513:', $area.getArea('513'));
	console.info('area 4 is null:', $area.getArea('4'));
});

**/

var $ = require('../../lib');
var $loadScript = require('../../lib/kit/io/loadScript');
var $makeReady = require('../../lib/kit/util/makeReady');

var allAreaData = null;
var AREA_DATA_ADDRESS = 'http://mat1.gtimg.com/auto/js/ecar_comp/area.js';

var localData = $makeReady();

var cacheMap = {};

var buildCache = function(){
	var traverse = function(list){
		$.each(list, function(intex, item){
			var id = item.id;
			cacheMap[id] = item;
			if(Array.isArray(item.children)){
				traverse(item.children);
			}
		});
	};
	traverse(allAreaData);
};

var findItem = function(type){
	return function(id){
		if(!allAreaData){return null;}
		var item = cacheMap[id];
		if(item && item.type === type){
			var copy = $.extend({}, item);
			delete copy.children;
			return copy;
		}else{
			return null;
		}
	};
};

var copyList = function(list){
	return list.map(function(item){
		item = $.extend({},item);
		delete item.children;
		return item;
	}).sort(function(item1, item2){
		var isCode1 = parseInt(item1.is_code, 10) || 0;
		var isCode2 = parseInt(item2.is_code, 10) || 0;
		return isCode1 - isCode2;
	});
};

var AreaData = {
	ready : function(fn){
		localData.ready(fn);
		if(!localData.requesting){
			localData.requesting = true;
			$loadScript({
				url : AREA_DATA_ADDRESS,
				onLoad : function(){
					allAreaData = window.AREA_DATA;
					buildCache();
					localData.setReady();
				}
			});
		}
	},
	getProvince : findItem('1'),
	getCity : findItem('2'),
	getArea : findItem('3'),
	getProvinceList : function(){
		if(!allAreaData){return [];}
		return copyList(allAreaData);
	},
	getCityList : function(id){
		if(!allAreaData){return [];}
		var list = [];
		var province = cacheMap[id];
		if(province.type === '1' && Array.isArray(province.children)){
			list = copyList(province.children);
		}
		return list;
	},
	getAreaList : function(id){
		if(!allAreaData){return [];}
		var list = [];
		var city = cacheMap[id];
		if(city.type === '2' && Array.isArray(city.children)){
			list = copyList(city.children);
		}
		return list;
	}
};

module.exports = AreaData;


