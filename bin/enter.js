#! /usr/bin/env node
// 表明当前环境是在node环境下运行
const program = require("commander"); // commander 来实现脚手架命令的配置
const chalk = require("chalk"); // chalk用美化终端命令的样式

program.name("dgt-cli").usage(`<command> [option]`);
program.version(`dgt-cli ${require("../package.json").version}`);
program
  .command("create <project-name>") // 增加创建指令
  .description("use dgt-cli create ** to create a new program") // 添加描述信息
  .option(
    "-f, --force",
    "overwrite target directory if it exists(如果目录存在，强制删除)"
  ) // 强制覆盖
  .action((projectName, cmd) => {
    // 处理用户输入create 指令附加的参数
    require("../lib/create")(projectName, cmd);
  });
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
// 监听 --help 指令
program.on("--help", function () {
  // 前后两个空行调整格式，更舒适
  console.log();
  console.log(
    ` Run ${chalk.green(
      "dgt-cli <command> --help"
    )} for detailed usage of given command.`
  );
  console.log();
});

program.parse(process.argv); // process.argv 是 nodejs 提供的属性
