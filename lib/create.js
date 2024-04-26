const path = require('path');
const fs = require('fs-extra');
const Inquirer = require('inquirer');
const ora = require('ora');

const Creator = require('./Creator');
const api = require('./api');

const cwd = process.cwd();

module.exports = async function(projectName, options) {
  
  const targetDirectory = path.join(cwd, projectName);

  const isOverwrite = await handleDirectory();
  if (isOverwrite) {
    await getCollectRepo();
  };

    // 处理是否有相同目录
    async function handleDirectory() {
        // 如果目录中存在了需要创建的目录
        if (fs.existsSync(targetDirectory)) {
            if (options.force) {
                await fs.remove(targetDirectory);
            } else {
                let { isOverwrite } = await new Inquirer.prompt([
                    {
                        name: 'isOverwrite',
                        type: 'list',
                        message: '是否强制覆盖已存在的同名目录？',
                        choices: [
                            {
                                name: '覆盖',
                                value: true
                            },
                            {
                                name: '不覆盖',
                                value: false
                            }
                        ]
                    }
                ]);
                if (isOverwrite) {
                    await fs.remove(targetDirectory);
                } else {
                    console.log(chalk.red.bold('不覆盖文件夹，创建终止'));
                    return false;
                }
            }
        };
        return true;
    }

    // 获取可拉取的仓库列表
    async function getCollectRepo() {
        const loading = ora('正在获取模版信息...');
        loading.start();
        const { data: list } = await api.getRepoList({ per_page: 100 });
        loading.succeed();
        const collectTemplateNameList = list.map(item => item.name);
        let { choiceTemplateName } = await new Inquirer.prompt([
            {
                name: 'choiceTemplateName',
                type: 'list',
                message: '请选择模版',
                choices: collectTemplateNameList
            }
        ]);
        const creator = new Creator(projectName, targetDirectory);
        creator.downloadTemplate(choiceTemplateName);
    }

    
    
}


// module.exports = async function (projectName, options) {
//     const creator = new Create(projectName, options);
//     await creator.init();
// }