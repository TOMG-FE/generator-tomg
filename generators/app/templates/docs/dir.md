# 目录文件说明

## 项目基本目录文件

- online 最终上线文件目录
- dist 本地调试部署目录
- src 源文件目录
- docs 项目文档目录
- .jshintrc 代码质量控制工具 jshint 的配置文件
- gruntfile.js grunt 构建工具配置脚本，用于配置串行任务
- gulpfile.js gulp 构建工具配置脚本，用于配置开发环境实时构建并行任务
- index.html 项目页面列表，需要手工维护
- package.json npm 环境配置文件
- webpack.config.js JS 打包工具 webpack 配置文件

## html 目录说明

src/html 目录为前端html源文件存放位置

- common 公共html模块
- mods 业务模块
- pages 页面文件

## images 目录说明

src/images 目录为前端images源文件存放位置

- sprite 用于 grunt sprity 脚本合成 sprite 图片的小图片资源目录
- temp 存放项目中使用的临时图片

## css 目录说明

src/css 目录为前端css源文件存放位置

- common 公共css，一般用于存放 reset 样式和各个页面的公共样式
- mods 模块css，用于存放各个业务模块的样式
- pages 

## JS 目录说明

src/js 目录为前端JS源文件存放位置

#### entry 业务入口文件

- entry/page 页面入口文件
- entry/module 独立加载的模块
- entry/static 其他静态脚本,例如统计等
- entry/global.js 公共组件

#### lib 和业务无关的公共组件

- lib/core 项目构建骨架
- lib/kit 各类工具函数
- lib/more 项目支撑模块
- lib/mvc 用于支持MVC设计模式的组件

#### comp 可在其他项目复用的业务组件，使用时还需根据项目环境配置

- comp/channel 可复用广播
- comp/common 可复用项目公共组件
- comp/model 可复用数据模型
- comp/tpl 可复用模板
- comp/ui 有固定交互方式的组件

#### mods 不易在其他项目复用的组件

- mods/channel 业务广播
- mods/model 可复用数据模型
- mods/layer 各种浮层 
- mods/pl 页面业务模块，取自 pagelet
- mods/tpl 业务组件所需模板
- mods/trans 统一定义业务所需接口
- mods/view 页面业务模块需要复用的交互逻辑

#### plugin 采用的JS库的插件

#### vendor 采用的第三方库

