// 工具类抽离
const ora = require("ora"); // ora用来定义加载动画
// 加载类

module.exports = class LoadingClass{
    // 构造器
    constructor(sStr,eStr){
        this.startStr = sStr || '加载中...'
        this.endStr = eStr || '加载完成'
        this.spinner = ora("下载中...")
    }
    start(text){
        this.spinner.text = text || this.startStr;
        this.spinner.color = "blue";
        this.spinner.start();
    }
    sucess(text){
        this.spinner.text = text || this.endStr;
        this.spinner.color = "green";
        this.spinner.succeed();
    }
    error(text){
        this.spinner.text = text || `加载错误:${text}`;
        this.spinner.color = "red";
        this.spinner.fail();
    }
}