# 调试环境启动说明

- 安装 node, npm
- 安装 svn命令行
- 安装 grunt-cli
	- 运行 `grunt --version` 检查 grunt-cli 是否已安装。
	- 运行 `npm install grunt-cli -g` 安装，unix环境可能需要 sudo 权限。
- 安装 gulp-cli
	- 运行 `gulp --version` 检查 gulp-cli 是否已安装。
	- 运行 `npm install gulp-cli -g` 安装，unix环境可能需要 sudo 权限。
- 安装项目依赖文件
	- 运行 `npm install`
- 运行 `gulp` 启动开发环境

## 持续构建说明

- src 目录下的文件会被持续构建到 dist 目录和 online 目录
- JS打包使用的是 webpack
- 如果发现有些文件未及时同步到 dist 或者 online 目录，尝试停止持续构建任务，然后重新执行 `gulp` 。
- js 入口文件都要放在 src/js/entry/ 目录下，如果要添加新的打包输出JS文件，需要配置webpack.config.js 。

## gulp 任务说明

- 项目使用 gulp 执行持续构建任务
- 如果还未使用过 gulp，请参考下列资料：
- [gulp](http://gulpjs.com/)
- [gulp简体中文文档](https://github.com/lisposter/gulp-docs-zh-cn)

### 本项目使用的 gulp 命令列表：

#### gulp serve
- 这是默认任务，直接执行 `gulp` 即可执行。
- 该任务启动一个服务器，访问其首页，静态文件更新时会自动刷新页面

#### gulp clean
- 删除持续构建任务生成的文件，online 目录和 dist 目录都会被完全移除。

## grunt 任务说明

- 项目使用 grunt 执行分步骤构建任务
- 如果还未使用过 grunt，请参考下列资料：
- [gruntjs](http://www.gruntjs.net/)

### 本项目使用的 grunt 命令列表：

#### grunt test
- 这是默认任务，直接执行 `grunt` 即可执行。
- 依据 .jshintrc 检查代码规范。

#### grunt sprity
- 生成 sprite 图片和对应 css
- 如果调试环境已启动, sprity 样式会自动 copy 到 dist 和 online 目录。
- sprity 插件在 windows 环境安装会出现报错，解决方案参考: [node-gyp](https://github.com/nodejs/node-gyp#installation)

#### grunt publish
- 如果项目文件需要发布到CDN服务器，执行 grunt publish 发布 online 目录下的文件到线上。




