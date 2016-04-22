var $path = require('path');

module.exports = function(grunt) {

	var timeStamp = Date.now();

	grunt.initConfig({
		projectDir : $path.resolve(__dirname, 'test'),
		timeStamp : timeStamp,
		clean : {

		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			client : {
				src : [
					'src/js/lib/kit/**/*.js',
					'src/js/entry/module/**/*.js',
					'src/js/entry/page/**/*.js',
					'src/js/entry/*.js',
					'src/js/comp/**/*.js',
					'src/js/mods/**/*.js'
				]
			}
		},
		copy : {
			//sprity 替换 px 单位为rem
			sprity_rem : {
				expand : true,
				cwd : 'src/css/common/',
				src : 'sprite.css',
				dest : 'src/css/common/',
				options: {
					process: function (content, srcpath) {
						return content.replace(
							/([\d\.-]+)px/mg,
							function(word, num){
								num = parseFloat(num);
								num = (num / 100);
								return num + 'rem';
							}
						);
					}
				}
			}
		},
		sprity : {
			options : {
				cssPath : '../images',
				margin : 4,
				dimension : [{
					ratio : 1, dpi: 72
				}, {
					ratio : 2, dpi: 192
				}]
			},
			sprite : {
				options : {
					'style' : '../../css/common/sprite.css'
				},
				src : [
					'src/images/sprite/*'
				],
				dest : 'src/images/sprite-output/sprite'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-sprity');

	grunt.registerTask('sprity-rem', [
		'sprity',
		'copy:sprity_rem'
	]);

	grunt.registerTask('test', [
		'jshint'
	]);

	// By default, lint and run all tests.
	grunt.registerTask('default', [
		'test'
	]);

};


