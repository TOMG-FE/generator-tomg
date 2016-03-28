var $gulp = require('gulp');
var $browserSync = require('browser-sync');
var $postcss = require('gulp-postcss');
var $autoprefixer = require('autoprefixer');
var $fileinclude = require('gulp-file-include');
var $gulpif = require('gulp-if');
var $del = require('del');
var $cssmin = require('gulp-cssmin');
var $webpack = require('gulp-webpack');
var $uglify = require('gulp-uglify');
var $rename = require('gulp-rename');
var $replace = require('gulp-replace');

//清理文件
$gulp.task('clean', function(){
	$del('./dist/');
	$del('./online/');
});

//js webpack
$gulp.task('webpack', function(){
	return $gulp.src('')
		.pipe($webpack(
			require('./webpack.config.js')
		))
		.pipe($gulp.dest('./dist/js/entry/'));
});

//复制图片
$gulp.task('copy-images', function(){
	$gulp.src('./src/images/*.*')
		.pipe($gulp.dest('./dist/images/'));
	$gulp.src('./src/images/temp/**/*')
		.pipe($gulp.dest('./dist/images/temp/'));
	$gulp.src('./src/images/*.*')
		.pipe($gulp.dest('./online/images/'));
});

//sprites文件更名，带有@符号的文件无法通过CMS上传
$gulp.task('copy-sprites', function(){
	$gulp.src('./src/images/sprite-output/sprite.png')
		.pipe($gulp.dest('./src/images/'))
		.pipe($gulp.dest('./dist/images/'))
		.pipe($gulp.dest('./online/images/'));

	$gulp.src('./src/images/sprite-output/sprite@2x.png')
		.pipe($rename('sprite-2x.png'))
		.pipe($gulp.dest('./src/images/'))
		.pipe($gulp.dest('./dist/images/'))
		.pipe($gulp.dest('./online/images/'));
});

//使用file-include实现html的include功能
$gulp.task('html-include', function(){
	$gulp.src('src/html/pages/*.html')
		.pipe($fileinclude())
		.pipe($gulp.dest('dist/pages/'));
});

//使用file-include实现css的include功能
//使用postcss自动添加CSS前缀
$gulp.task('postcss', function(){
	return $gulp.src('src/css/pages/*.css')
		.pipe($fileinclude())
		.pipe($postcss([
			$autoprefixer
		]))
		//sprite图片更名
		.pipe($replace(/sprite\@2x\.png/g, 'sprite-2x.png'))
		.pipe($gulp.dest('dist/css/'))
		//压缩CSS
		.pipe($cssmin({
			compatibility : 'ie7'
		}))
		.pipe($gulp.dest('online/css/'));
});

//js压缩
$gulp.task('js-compress', ['webpack'], function(){
	return $gulp.src('dist/js/**/*.js')
		.pipe($uglify())
		.pipe($gulp.dest('online/js/'));
});

// 监视文件改动并重新载入
$gulp.task('serve', [
	'copy-images',
	'copy-sprites',
	'postcss',
	'html-include',
	'js-compress'
], function() {
	$browserSync({
		server: {
			baseDir: './'
		}
	});

	$gulp.watch(['./src/images/*.*', 'images/temp/*.*'], ['copy-images']);
	$gulp.watch(['./src/html/**/*.html'], ['html-include']);
	$gulp.watch(['./src/css/**/*.css'], ['postcss']);
	$gulp.watch(['./src/images/sprite_output/*'], ['copy-sprites']);

	$gulp.watch(['./src/js/**/*'], ['js-compress']);
	$gulp.watch(['./dist/**/*'], $browserSync.reload);

});

$gulp.task('default', [
	'serve'
]);
