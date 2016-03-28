var generators = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var wiredep = require('wiredep');
var mkdirp = require('mkdirp');
var _s = require('underscore.string');

module.exports = generators.Base.extend({
    // 初始化
    initializing: function() {
        this.pkg = require('../../package.json');
    },
    //提供使用者选项
    prompting: function() {
        var done = this.async();

        if (!this.options['skip-welcome-message']) {
            this.log(yosay(
                '\'hello \'! Out of the box I include  a gulpfile to build your app.'
            ));
        }

        //测试例子，目前未安装Sass或者Less
        /*
        var prompts = [{
            type: 'checkbox',
            name: 'features',
            message: '以下框架可供选择?',
            choices: [{
                name: 'Sass',
                value: 'includeSass',
                checked: false
            }, {
                name: 'Less',
                value: 'includeLess',
                checked: false
            }]
        }];

        this.prompt(prompts, function(answers) {
            var features = answers.features;

            function hasFeature(feat) {
                return features && features.indexOf(feat) !== -1;
            };
            this.includeSass = hasFeature('includeSass');
            this.includeLess = hasFeature('includeLess');
            done();
        }.bind(this));
        */
    },
    
    //拷贝templates文件夹下的文件或文件夹到项目路径
    writing: {
        gulpfile: function() {
            this.fs.copyTpl(
                this.templatePath('gulpfile.js'),
                this.destinationPath('gulpfile.js'), {
                    name: this.pkg.name,
                    version: this.pkg.version
                }
            );
        },
        gruntfile: function() {
            this.fs.copyTpl(
                this.templatePath('gruntfile.js'),
                this.destinationPath('gruntfile.js')
            );
        },
        packageJSON: function() {
            this.fs.copyTpl(
                this.templatePath('package.json'),
                this.destinationPath('package.json')
            );
        },
        jshintrcfile: function() {
            this.fs.copyTpl(
                this.templatePath('.jshintrc'),
                this.destinationPath('.jshintrc')
            );
        },
        webpackfile: function() {
            this.fs.copyTpl(
                this.templatePath('webpack.config.js'),
                this.destinationPath('webpack.config.js')
            );
        },
        readmefile: function() {
            this.fs.copyTpl(
                this.templatePath('README.md'),
                this.destinationPath('README.md')
            );
        }
    }
});
