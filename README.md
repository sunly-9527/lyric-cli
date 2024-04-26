### 1、脚手架相关命令
- 初始化项目：lyric init <project-name> --template <template-name> -> 包含：vue2、vue3、vue2-ts、vue3-ts、react、react-ts
- 获取版本：lyric -version/--version
- 模板列表：lyric list
- 帮助：lyric -h/--help

### 2、本地开发调试
- npm link命令创建了一个全局链接和本地项目的符号链接，用于在本地开发阶段模拟全局安装某个包的效果。如果您想要撤销 npm link 建立的链接
可以通过 npm unlink -g xxx 解除
- 更换命令则需要把之前的命令删除，rm /Users/yonghualiu/.nvm/versions/node/v16.14.0/bin/xxx 

### 3、所需要三方插件支持
- inquirer@8.2.6：用于命令行交互
- chalk@4.1.2：用于命令行美化
- commander@12.0.0：用于命令行解析
- download-git-repo@3.0.2：用于模板下载
- handlebars@4.7.8：模板引擎
- validate-npm-package-name@5.0.0：用来校验输入的项目名称

