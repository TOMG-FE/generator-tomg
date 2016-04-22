var $webpack = require('webpack');
var $path = require('path');
var $fs = require('fs');

var CommonsChunkPlugin = $webpack.optimize.CommonsChunkPlugin;

var entries = {};
var includes = [];

(function() {

	var isFile = function(path){
		return $fs.existsSync(path) && $fs.statSync(path).isFile();
	};

	var isDir = function(path){  
		return $fs.existsSync(path) && $fs.statSync(path).isDirectory();  
	};

	var walkSync = function(dirPath){
		var dirs = [];
		var output = [];
		dirs.push(dirPath);

		var walk = function(path){
			var files = $fs.readdirSync(path);
			files.forEach(function(file){
				var filePath = $path.resolve(path, file);
				if(isDir(filePath)){
					dirs.push(filePath);
				}else if(isFile(filePath)){
					output.push(filePath);
				}
			});
		};

		while(dirs.length){
			walk(dirs.pop());
		}

		return output;
	};

	var targetPath = $path.resolve(__dirname, './src/js/entry/');
	var files = walkSync(targetPath);

	var getEntryKey = function(path){
		var extname = $path.extname(path);
		var key = $path.relative(targetPath, path);
		key = key.replace(new RegExp(extname + '$'), '');
		key = key.replace(/\\+/g, '/');
		return key;
	};

	var getEntryVal = function(path){
		var extname = $path.extname(path);
		var val = $path.relative(__dirname, path);
		val = val.replace(new RegExp(extname + '$'), '');
		val = val.replace(/\\+/g, '/');
		return './' + val;
	};

	var getEntryType = function(path){
		var key = getEntryKey(path);
		var arr = key.split(/[\/\\]/);
		if(arr.length > 1){
			return arr[0];
		}else{
			return '';
		}
	};

	var includesTypes = ['module', 'page'];
	files.forEach(function(path){
		var key = getEntryKey(path);
		var val = getEntryVal(path);
		var type = getEntryType(path);
		if(!type){return;}
		if(includesTypes.indexOf(type) >= 0){
			includes.push(key);
		}
		entries[key] = val;
	});

})();

module.exports = {
	entry: entries,
	output: {
		filename: '[name].js'
	},
	devtool: 'source-map',
	module: {
		loaders: [{
			test: /\.tpl$/,
			loader: 'html'
		}]
	},
	plugins: [
		new CommonsChunkPlugin('global.js', includes)
	]
};

