/*
*@Description: 创建项目的方法
*@MethodAuthor:  DGT
*@ param: {
    programeName：项目名称,
    cmd:用户口令对象
}
*@ Date: @Date:2022-05-31 20:06:35
*/
const path = require("path"); // 路径模块
const fs = require("fs-extra"); // 文件读取操作
const chalk = require("chalk"); // 输出美化
const download = require("../utils/download"); //下载仓库代码
const oraClass = require("../utils/oraClass"); // 封装ora动画

const isOverwriteFun = require("../interactives/isOverWrite"); // 获取是否覆盖同名文件交互
const selectVueTypeFun = require("../interactives/selectVueType"); // 获取选择下载的对应的vue2还是vue3的模板仓库

const loadObj = new oraClass();
module.exports = async function (projectName, options) {
  // 获取当前工作目录
  const cwd = process.cwd();
  // 拼接得到项目目录
  const targetDirectory = path.join(cwd, projectName);
  // 判断目录是否存在
  if (fs.existsSync(targetDirectory)) {
    // 判断是否使用 --force 参数
    if (options.force) {
      // 删除重名目录(remove是个异步方法)
      await fs.remove(targetDirectory);
    } else {
      let isOverwrite = await isOverwriteFun();
      // 选择 Cancel
      if (!isOverwrite) {
        console.log("Cancel");
        return;
      } else {
        // 选择 Overwirte ，先删除掉原有重名目录
        loadObj.start("removing origin file...");
        await fs.remove(targetDirectory);
        loadObj.sucess("removing origin file success!");
      }
    }
  }
  let vue_version = await selectVueTypeFun(); // 获取对应的仓库模板
  download(`${returnRightUrl(vue_version)}`, projectName,tips);
};
/*
 *@Description: 根据用户输入返回对应的项目模板地址
 *@MethodAuthor:  DGT
 *@ param: {type:vue版本}
 *@ Date: @Date:2022-06-01 15:24:46
 */
const returnRightUrl = (type) => {
  const urlMap = new Map();
  urlMap
    .set("v2", "github:DGT18229282792/npm-auto-loader")
    .set("v3", "github:DGT18229282792/monitor-sdk");
  return urlMap.get(type);
}
/*
*@Description: 下载成功提示开启项目
*@MethodAuthor:  DGT
*@ param: {}
*@ Date: @Date:2022-06-02 23:22:27
*/
const tips = (projectName) =>{
  console.log(``)
  console.log(`${chalk.green(`cd ${projectName}`)}`)
  console.log(`${chalk.green(`npm install`)}`)
  console.log(`${chalk.green(`npm run serve`)}`)
  console.log(``)
}