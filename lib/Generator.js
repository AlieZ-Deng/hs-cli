const util = require("util");
const downloadGitRepo = require("download-git-repo");
const ora = require("ora");
const chalk = require("chalk");
const path = require("path");
const execa = require("execa");

// 添加加载动画
async function wrapLoading(fn, message, ...args) {
  // 使用 ora 初始化，传入提示信息 message
  const spinner = ora(message);
  // 开始加载动画
  spinner.start();

  try {
    // 执行传入方法 fn
    const result = await fn(...args);
    // 状态为修改为成功
    spinner.succeed();
    return result;
  } catch (error) {
    // 状态为修改为失败
    spinner.fail("Request failed, refetch ...");
  }
}

class Generator {
  constructor(name, targetDir) {
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;

    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  async download() {
    // 1）拼接下载地址
    const requestUrl = "github:AlieZ-Deng/res#feature_hmr";
    // 2）调用下载方法
    await wrapLoading(
      this.downloadGitRepo, // 远程下载方法
      "waiting download template", // 加载提示信息
      // 参数1: 下载地址
      requestUrl,
      // 参数2: 创建位置
      path.resolve(process.cwd(), this.targetDir)
    );
  }

  async install() {
    await execa("npm install", {
      cwd: path.resolve(process.cwd(), this.targetDir),
      stdio: [2, 2, 2],
    });

    // 使用提示
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
    console.log("\r\n  npm run dev\r\n");
  }

  // 核心创建逻辑
  async create() {
    console.log(
      `\r\n${chalk.redBright.bold.bgCyan("Welcome and now start")}\r\n`
    );
    await this.download();
    await this.install();
  }
}

module.exports = Generator;
