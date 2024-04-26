#! /usr/bin/env node
const { Command } = require('commander');
const inquirer = require('inquirer');
const validateNpmPackageName = require('validate-npm-package-name');
const handlebars = require('handlebars');
const ora = require('ora');
const downloadGitRepo = require('download-git-repo');
const chalk = require('chalk');
const fs = require('fs-extra'); 
const path = require('path'); 

const program = new Command();

async function init({ projectName }){

  const spinner = ora('Creating project...').start();
  try {
    const projectPath = path.join(process.cwd(), projectName);
    await fs.ensureDir(projectPath);
    await fs.writeFile(path.join(projectPath, 'index.html'), '<h1>Hello Vue!</h1>');
    spinner.succeed('Project created successfully!');
    console.log(`\nNavigate to your project by running: ${chalk.cyan(`cd ${projectName}`)}`);
    console.log(`Run your project with: ${chalk.cyan('npm run serve')}\n`);
  } catch (error) {
    spinner.fail('Failed to create project');
    console.error(chalk.red(error));
  }
}

// 获取配置参数
async function getDeploy(){
  const answer = await inquirer.prompt([
    {
      name: 'frame',
      type: "list", 
      message: 'Select a frame template',
      choices: [
        {
          name: 'react',
          description: 'react is frame.',
        },
        {
          name: 'vue',
          description: 'vue is frame.', 
        },
        new inquirer.Separator(),
        {
          name: 'angular',
          value: 'angular',
          disabled: '(angular is not available)', // 不可选
        },
      ],
    },
    {
      name: "depend",
      type: "checkbox",
      message: "Check the features needed for your project:",
      choices: [
        {
          name: "Babel",
          checked: true,
        },
        {
          name: "TypeScript",
        },
        {
          name: "Router",
        },
      ],
    },
    // {
    //   name: 'projectName',
    //   type: 'input',
    //   message: 'What is the name of your project?',
    //   validate: input => {
    //     const validatePackageResult = validateNpmPackageName(input);
    //     if (validatePackageResult.validForNewPackages){
    //       return true;
    //     } else {
    //       return 'Invalid project name. Please choose another one.';
    //     }
    //   },
    //   default: 'bs-init-project'
    // }
  ]);
  console.log(answer)
}

// 获取版本
program
  .name("lyric")
  .usage(`<command> [option]`)
  .version('0.0.1', '-v, --version')

// 初始化项目模板
program
  .command('create <project-name>') // .command('init <project-name>') 
  .description("初始化项目模板")
  .option("-f, --force", "overwrite target directory if it exists") // 强制覆盖
  .action(async (projectName, cmd) => {
    // getDeploy();
    require("../lib/create")(projectName, cmd);
  })

program
  .command("config [value]") // config 命令
  .description("inspect and modify the config")
  .option("-g, --get <key>", "get value by key")
  .option("-s, --set <key> <value>", "set option[key] is value")
  .option("-d, --delete <key>", "delete option by key")
  .action((value, keys) => {
    // value 可以取到 [value] 值，keys会获取到命令参数
    console.log(value, keys);
  });

// 获取模板列表
program
  .command('list')
  .description("模板列表...")
  .action(() => {})

program.parse(process.argv);
