# 简化版Ant Design Pro

## 简化内容

在原始的`ant-design-pro 2.0.0 beta1`版本上：

1. 去掉了多余的页面，model，mock，只保留一个列表页面和登录页面，登录页面逻辑100%完整。列表页面重点保留了如何生成大批量mock数据，如何在修改和删除了单个数据后，对列表进行局部更新。

2. 将根目录下的多余配置文件删除，将package.json中不用到的库删除。

3. 将.webpackrc.js中的publicPath做了开发运行时和生成运行时的配置，以免每次打包部署版本时要手动修改。

4. 网站的标题、版权等信息做了配置，每次项目开发的时候统一进行修改。

## 使用环境

为了统一开发环境，请遵照下面条件准备开发环境
### vscode
安装以下扩展
+ editorConfig for VS Code 才能使根目录下的`.editorconfig`生效，避免团队的回车符和缩进不统一。
+ ESLint 对代码的ES6风格进行检查，代码中凡是被它标红的部分都必须修改到位。
+ Prettier - Code formatter 对代码的格式化统一用这个插件来实现，根目录下的`.prettierrc`配置了格式化规则，避免团队在代码格式上的不统一。 

### yarn

统一使用yarn进行依赖包的管理，避免使用npm或cnpm

## 每次项目必须修改部分

+ `src/index.ejs` 必须将title修改为项目的名称
+ `src/utils/config.js` 必须将appName和appCopyright修改为项目的信息
+ `.webpackrc.js` 中的`publicPath`必须修改为实际用来做CDN的目录

## 其他使用规则，与官方版本完全一致
