const downloadGitRepo = require("download-git-repo");
const figlet = require('figlet');
const ora = require('ora');
const chalk= require('chalk');

const util = require('util');

class Creator {
    constructor(name, target){
        this.name = name;
        this.target = target;
        // 转化为 promise 方法
        this.downloadGitRepo = util.promisify(downloadGitRepo);
    }

    // 下载模板
    async downloadTemplate(choiceTemplateName){
        this.downloadGitRepo = util.promisify(downloadGitRepo);
        const templateUrl = `sunly-9527/${choiceTemplateName}`;
        const loading = ora('正在拉取模版...');
        loading.start();
        try {
            await this.downloadGitRepo(templateUrl, this.target);
        }catch (err){
            console.error(err)
            loading.clear()
        }
        loading.succeed();
        this.showTemplateHelp();
    }

    // 模版使用提示
    showTemplateHelp() {
        console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
        console.log(`\r\n  cd ${chalk.cyan(this.name)}\r\n`);
        console.log("  npm install");
        console.log("  npm run dev\r\n");
        console.log(`
            \r\n
            ${chalk.green.bold(
                figlet.textSync("lyric", {
                    font: "isometric4",
                    horizontalLayout: "default",
                    verticalLayout: "default",
                    width: 80,
                    whitespaceBreak: true,
                  })
            )}
        `)
    }
}

module.exports = Creator;