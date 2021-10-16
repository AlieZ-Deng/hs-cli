#! /usr/bin/env node
// npm link npm root -g

const program = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");

program
  // 定义命令和参数
  .command("create <app-name>")
  .description("create a new project")
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option("-f, --force", "overwrite target directory if it exist")
  .action((name, options) => {
    // 在 create.js 中执行创建任务
    require("../lib/create.js")(name, options);
  });

// 配置 config 命令
program
  .command("config [value]")
  .description("inspect and modify the config")
  .option("-g, --get <path>", "get value from option")
  .option("-s, --set <path> <value>")
  .option("-d, --delete <path>", "delete option from config")
  .action((value, options) => {
    console.log(value, options);
  });

program
  // 监听 --help 执行
  .on("--help", () => {
    console.log(
      "\r\n\n" +
        figlet.textSync("H-S", {
          font: "Ghost",
          horizontalLayout: "default",
          verticalLayout: "default",
          width: 80,
          whitespaceBreak: true,
        })
    );

    // 新增说明信息
    console.log(
      `\r\n\nRun ${chalk.cyan(
        `hs <command> --help`
      )} for detailed usage of given command\r\n`
    );
  });

program
  // 配置版本号信息
  .version(`v${require("../package.json").version}`)
  .usage("<command> [option]");

// 解析用户执行命令传入参数
program.parse(process.argv);
