var mongoose = require("mongoose"); //引用mongoose
// // 连接字符串格式为mongodb://主机/数据库名
// mongoose.connect('mongodb://localhost/uimanage');

// //定义Projects
var ProjectSchema = new mongoose.Schema({
      projectname : { type:String },
      user_id : { type:String },
      state:{type:String},//状态 0为进行时 1为完成
      desc: { type:String },
      created_time : { type:Date, default:Date.now }
});

var Project = mongoose.model('Project', ProjectSchema);
//倒出模型
module.exports = Project

