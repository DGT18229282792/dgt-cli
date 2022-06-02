// 用户交互-->获取vue版本
const Inquirer = require("inquirer"); //用户交互
const chalk = require("chalk"); // 输出美化
module.exports = async function(){
    let { vue_version } =  await new Inquirer.prompt([
        // 返回值为promise
        {
          name: "vue_version", // 与返回值对应
          type: "list", // list 类型
          message: "please select a vue version",
          choices: [
            { name: "V2", value: 'v2' },
            { name: "V3", value: 'v3' },
          ],
        },
      ]);
            console.log(``)
            console.log(`${chalk.green(`你选择了vue ${vue_version}版本`)}`)
            console.log(``)
      return Promise.resolve(vue_version)
}
