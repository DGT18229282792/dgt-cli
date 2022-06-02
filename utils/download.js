// 工具类抽离
const download = require("download-git-repo"); //下载仓库代码
const oraClass = require("./oraClass"); // 封装ora动画
let loadObj = new oraClass();
// 加载类
/*
*@Description: 封装下载仓库方法
*@MethodAuthor:  DGT
*@ param: {projectName：项目名字；
   repurl: 仓库地址 格式：`github:${github用户名}/${仓库名字}`}
*@ Date: @Date:2022-06-01 09:24:01
*/
module.exports = function downloadFun(repurl, projectName,cb) {
  loadObj.start("downloading the template...");
  download(repurl, `${projectName}/`, function (err) {
    console.log(err);
    console.log(err ? "Error" : "Success");
    if (err) {
      loadObj.error("Error");
    } else {
      loadObj.sucess("download sucess!");
      return cb(projectName)
    }
  });
}
