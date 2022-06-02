// 用户交互-->获取是否覆盖同名文件
const Inquirer = require("inquirer"); //用户交互
const chalk = require("chalk"); // 输出美化
module.exports = async function(){
    let { isOverwrite } =  await new Inquirer.prompt([
        // 返回值为promise
        {
            name: "isOverwrite", // 与返回值对应
            type: "list", // list 类型
            message: "Target directory exists, Please choose an action",
            choices: [
              { name: "Overwrite", value: true },
              { name: "Cancel", value: false },
            ],
          },
      ]);
    return Promise.resolve(isOverwrite)
}
