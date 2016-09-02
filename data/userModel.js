var mongoose = require("mongoose"); //引用mongoose
// 连接字符串格式为mongodb://主机/数据库名
mongoose.connect('mongodb://localhost/uimanage');

//定义users
var UserSchema = new mongoose.Schema({
      username : { type:String },
      password : { type:String },
      email: { type:String },
      limit:{type:String,default:'user'},//user or admin
      created_time : { type:Date, default:Date.now },
      invitedcode  : { type:String},//邀请码
      avatar : { type:String } //头像地址
      // lastlogin_time : { type:Date, default:Date.now }, 如果需要监控用户最近登录时间可以添加
});

var User = mongoose.model('User', UserSchema);
//倒出模型
module.exports = User

